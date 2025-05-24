import {
    Alert,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField
} from "@mui/material";
import {useSnackbar} from "notistack";
import {Dispatch, useState} from "react";

import {useEditProject} from "@services/projects";

export default function EditProjectDialog(props: { projectId: number, open: boolean, setOpen: Dispatch<boolean> }) {

    const editProjectMutation = useEditProject(props.projectId)

    const [name, setName] = useState("")

    const {enqueueSnackbar} = useSnackbar();

    const handleClose = () => props.setOpen(false);

    if (editProjectMutation.isError) {
        enqueueSnackbar(editProjectMutation.error?.message, {variant: "error"})
    }

    return (
        <Dialog open={props.open} onClose={handleClose}>
            {editProjectMutation.isLoading ? <CircularProgress sx={{margin: 8}}/> : <>
                <DialogTitle>Edit project</DialogTitle>
                <DialogContent>
                    <TextField sx={{width: "100%"}} inputMode="text" placeholder="New project name" onChange={
                        (event) => setName(event.target.value)
                    }/>
                    <Alert sx={{marginTop: 1}} variant="outlined" severity="warning">
                        This project is for <b>mod developers</b>, <b>not</b> for <b>server owners</b>!!!
                    </Alert>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button disabled={name.trim().length <= 0} variant="contained" onClick={() => {
                        if (name.trim().length <= 0) {
                            enqueueSnackbar("Project name can't be blank", {variant: "warning"})
                            return
                        }

                        editProjectMutation.mutate({name: name,}, {
                            onSuccess: () => enqueueSnackbar("Project created", {variant: "success"}),
                            onSettled: () => handleClose()
                        })
                    }} autoFocus>Rename</Button>
                </DialogActions>
            </>}
        </Dialog>
    )
}
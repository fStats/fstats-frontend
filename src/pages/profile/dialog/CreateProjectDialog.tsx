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

import {useCreateProject} from "@services/fstats/projects";

export default function CreateProjectDialog(props: { open: boolean, setOpen: Dispatch<boolean> }) {

    const createProjectMutation = useCreateProject();

    const [name, setName] = useState("");

    const {enqueueSnackbar} = useSnackbar();

    const handleClose = () => props.setOpen(false);

    if (createProjectMutation.isError) {
        enqueueSnackbar(createProjectMutation.error?.message, {variant: "error"});
    }

    return (
        <Dialog open={props.open} onClose={handleClose}>
            {createProjectMutation.isPending ? <CircularProgress sx={{margin: 8}}/> : <>
                <DialogTitle>Create new project</DialogTitle>
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
                    <Button variant="contained" onClick={() => {
                        if (name.trim().length <= 0) {
                            enqueueSnackbar("Project name can't be blank", {variant: "warning"});
                            return;
                        }

                        createProjectMutation.mutate({name: name,}, {
                            onSuccess: () => enqueueSnackbar("Project created", {variant: "success"}),
                            onSettled: () => handleClose()
                        });
                    }} autoFocus>Create</Button>
                </DialogActions>
            </>}
        </Dialog>
    );
}
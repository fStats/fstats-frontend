import {Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import React, {Dispatch, useState} from "react";
import {useCreateProject} from "../../services/projects";
import {useSnackbar} from "notistack";

export default function CreateProjectDialog(props: { open: boolean, setOpen: Dispatch<boolean> }) {

    const createProjectMutation = useCreateProject()

    const [name, setName] = useState("")

    const {enqueueSnackbar} = useSnackbar();

    const handleClickOpen = () => props.setOpen(true);

    const handleClose = () => props.setOpen(false);

    if (createProjectMutation.isError) {
        enqueueSnackbar(createProjectMutation.error?.message, {variant: "error"})
    }

    return (
        <Dialog open={props.open} onClose={handleClose}>
            {createProjectMutation.isLoading ? <CircularProgress sx={{margin: 8}}/> : <>
                <DialogTitle>Create new project</DialogTitle>
                <DialogContent>
                    <TextField sx={{width: "100%"}} inputMode="text" placeholder="New project name" onChange={
                        (event) => setName(event.target.value)
                    }/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button variant="contained" onClick={() => {
                        if (name.trim().length <= 0) {
                            enqueueSnackbar("Project name can't be blank", {variant: "warning"})
                            return
                        }

                        createProjectMutation.mutate({name: name,}, {
                            onSuccess: () => enqueueSnackbar("Project created", {variant: "success"}),
                            onSettled: () => handleClose()
                        })
                    }} autoFocus>Create</Button>
                </DialogActions>
            </>}
        </Dialog>
    )
}
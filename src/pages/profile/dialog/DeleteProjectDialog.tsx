import {Button, CircularProgress, Dialog, DialogActions, DialogTitle} from "@mui/material";
import {Dispatch} from "react";
import {useDeleteProject} from "../../../services/projects.ts";
import {useSnackbar} from "notistack";

export default function DeleteProjectDialog(props: { projectId: number, open: boolean, setOpen: Dispatch<boolean> }) {

    const deleteProjectMutation = useDeleteProject()

    const {enqueueSnackbar} = useSnackbar();

    const handleClose = () => props.setOpen(false);

    if (deleteProjectMutation.isError) {
        enqueueSnackbar(deleteProjectMutation.error?.message, {variant: "error"})
    }

    return (
        <Dialog open={props.open} onClose={handleClose}>
            {deleteProjectMutation.isLoading ? <CircularProgress sx={{margin: 8}}/> : <>
                <DialogTitle>Are you sure you want to delete the project?</DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button variant="contained" color="error" onClick={() => {
                        deleteProjectMutation.mutate((props.projectId), {
                            onSuccess: () => enqueueSnackbar("Project deleted", {variant: "success"}),
                            onSettled: () => handleClose()
                        })
                    }} autoFocus>Delete</Button>
                </DialogActions>
            </>}
        </Dialog>
    )
}
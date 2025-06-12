import {Button, CircularProgress, Dialog, DialogActions, DialogTitle} from "@mui/material";
import {useSnackbar} from "notistack";
import {Dispatch} from "react";
import {useTranslation} from "react-i18next";

import {getTranslateKey} from "@services/fstats/i18n/serverMessages";
import {useDeleteProject} from "@services/fstats/projects";

export default function DeleteProjectDialog(props: { projectId: number, open: boolean, setOpen: Dispatch<boolean> }) {

    const {t} = useTranslation("profile");
    
    const deleteProjectMutation = useDeleteProject();

    const {enqueueSnackbar} = useSnackbar();

    const handleClose = () => props.setOpen(false);

    if (deleteProjectMutation.isError) {
        enqueueSnackbar(getTranslateKey(deleteProjectMutation.error?.message), {variant: "error"});
    }

    return (
        <Dialog open={props.open} onClose={handleClose}>
            {deleteProjectMutation.isPending ? <CircularProgress sx={{margin: 8}}/> : <>
                <DialogTitle>{t("dialog.delete.title")}</DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose}>{t("dialog.cancel")}</Button>
                    <Button variant="contained" color="error" onClick={() => {
                        deleteProjectMutation.mutate((props.projectId), {
                            onSuccess: () => enqueueSnackbar(t("dialog.delete.deleted"), {variant: "success"}),
                            onSettled: () => handleClose()
                        });
                    }} autoFocus>
                        {t("dialog.delete.delete")}
                    </Button>
                </DialogActions>
            </>}
        </Dialog>
    );
}
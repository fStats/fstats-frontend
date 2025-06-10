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
import {t} from "i18next";
import {useSnackbar} from "notistack";
import {Dispatch, useState} from "react";
import {Trans} from "react-i18next";

import {getTranslateKey} from "@services/fstats/i18n/serverMessages";
import {useEditProject} from "@services/fstats/projects";

export default function EditProjectDialog(props: { projectId: number, open: boolean, setOpen: Dispatch<boolean> }) {

    const editProjectMutation = useEditProject(props.projectId);

    const [name, setName] = useState("");

    const {enqueueSnackbar} = useSnackbar();

    const handleClose = () => props.setOpen(false);

    if (editProjectMutation.isError) {
        enqueueSnackbar(getTranslateKey(editProjectMutation.error?.message), {variant: "error"});
    }

    return (
        <Dialog open={props.open} onClose={handleClose}>
            {editProjectMutation.isPending ? <CircularProgress sx={{margin: 8}}/> : <>
                <DialogTitle>
                    {t("page.profile.dialog.edit.title")}
                </DialogTitle>
                <DialogContent>
                    <TextField sx={{width: "100%"}} inputMode="text" placeholder={t("page.profile.dialog.edit.field")} onChange={
                        (event) => setName(event.target.value)
                    }/>
                    <Alert sx={{marginTop: 1}} variant="outlined" severity="warning">
                        <Trans i18nKey="page.profile.dialog.edit.alert" components={{
                            b: <b/>
                        }}/>
                    </Alert>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>
                        {t("page.profile.dialog.cancel")}
                    </Button>
                    <Button disabled={name.trim().length <= 0} variant="contained" onClick={() => {
                        if (name.trim().length <= 0) {
                            enqueueSnackbar(t("page.profile.dialog.edit.blank"), {variant: "warning"});
                            return;
                        }

                        editProjectMutation.mutate({name: name}, {
                            onSuccess: () => enqueueSnackbar(t("page.profile.dialog.edit.updated"), {variant: "success"}),
                            onSettled: () => handleClose()
                        });
                    }} autoFocus>
                        {t("page.profile.dialog.edit.rename")}
                    </Button>
                </DialogActions>
            </>}
        </Dialog>
    );
}
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
import { t } from "i18next";
import {useSnackbar} from "notistack";
import {Dispatch, useState} from "react";
import {Trans} from "react-i18next";

import {getTranslateKey} from "@services/fstats/i18n/serverMessages";
import {useCreateProject} from "@services/fstats/projects";

export default function CreateProjectDialog(props: { open: boolean, setOpen: Dispatch<boolean> }) {

    const createProjectMutation = useCreateProject();

    const [name, setName] = useState("");

    const {enqueueSnackbar} = useSnackbar();

    const handleClose = () => props.setOpen(false);

    if (createProjectMutation.isError) {
        enqueueSnackbar(getTranslateKey(createProjectMutation.error?.message), {variant: "error"});
    }

    return (
        <Dialog open={props.open} onClose={handleClose}>
            {createProjectMutation.isPending ? <CircularProgress sx={{margin: 8}}/> : <>
                <DialogTitle>
                    {t("page.profile.dialog.create.title")}
                </DialogTitle>
                <DialogContent>
                    <TextField sx={{width: "100%"}} inputMode="text" placeholder={t("page.profile.dialog.create.field")} onChange={
                        (event) => setName(event.target.value)
                    }/>
                    <Alert sx={{marginTop: 1}} variant="outlined" severity="warning">
                        <Trans i18nKey="page.profile.dialog.create.alert" components={{
                            b: <b/>
                        }}/>
                    </Alert>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>{t("page.profile.dialog.cancel")}</Button>
                    <Button variant="contained" onClick={() => {
                        if (name.trim().length <= 0) {
                            enqueueSnackbar(t("page.profile.dialog.create.blank"), {variant: "warning"});
                            return;
                        }

                        createProjectMutation.mutate({name: name,}, {
                            onSuccess: () => enqueueSnackbar(t("page.profile.dialog.create.created"), {variant: "success"}),
                            onSettled: () => handleClose()
                        });
                    }} autoFocus>
                        {t("page.profile.dialog.create.create")}
                    </Button>
                </DialogActions>
            </>}
        </Dialog>
    );
}
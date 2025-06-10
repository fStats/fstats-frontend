import {
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    TextField
} from "@mui/material";
import {t} from "i18next";
import {useSnackbar} from "notistack";
import {Dispatch, useState} from "react";

import {useAuth} from "@hooks/useAuth";
import {getTranslateKey} from "@services/fstats/i18n/serverMessages";
import {useUserPatch} from "@services/fstats/users";

export default function EditUserDialog(props: { open: boolean, setOpen: Dispatch<boolean> }) {

    const {enqueueSnackbar} = useSnackbar();
    const {token, setToken} = useAuth();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const patchUserMutation = useUserPatch(token);

    const handleClose = () => {
        setUsername("");
        setPassword("");
        props.setOpen(false);
    };

    if (patchUserMutation.isError) {
        enqueueSnackbar(getTranslateKey(patchUserMutation.error?.message), {variant: "error"});
    }

    return (
        <Dialog open={props.open} onClose={handleClose}>
            {patchUserMutation.isPending ? <CircularProgress sx={{margin: 8}}/> : <>
                <DialogTitle>
                    {t("page.profile.dialog.user.edit.title")}
                </DialogTitle>
                <DialogContent>
                    <Stack spacing={2} paddingY={1}>
                        <TextField variant="outlined" label={t("page.profile.dialog.user.edit.username")} value={username}
                                   onChange={(event) => setUsername(event.target.value)}></TextField>
                        <TextField variant="outlined" label={t("page.profile.dialog.user.edit.password")} value={password}
                                   onChange={(event) => setPassword(event.target.value)} type="password"></TextField>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>{t("page.profile.dialog.cancel")}</Button>
                    <Button variant="contained" disabled={username.trim().length <= 0 && password.trim().length <= 0}
                            onClick={() => {
                                if (username.trim().length <= 0 && password.trim().length <= 0) {
                                    enqueueSnackbar(t("page.profile.dialog.user.edit.empty"), {variant: "warning"});
                                    return;
                                }
                                patchUserMutation.mutate({
                                    username: username,
                                    password: password
                                }, {
                                    onSuccess: () => {
                                        setToken("");
                                        localStorage.removeItem("token");
                                        return enqueueSnackbar(t("page.profile.dialog.user.edit.alert"), {variant: "success"});
                                    },
                                    onSettled: () => handleClose()
                                });
                            }} autoFocus>
                        {t("page.profile.dialog.user.edit.edit")}
                    </Button>
                </DialogActions>
            </>}
        </Dialog>
    );
}
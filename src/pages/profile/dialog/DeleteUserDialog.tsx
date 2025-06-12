import {
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import {useSnackbar} from "notistack";
import {Dispatch, useState} from "react";
import { useTranslation } from "react-i18next";

import {useAuth} from "@hooks/useAuth";
import {User} from "@services/fstats/types";
import {useUserDelete} from "@services/fstats/users";
import {getUserFromJWT} from "@utils/decoders/jwt";

export default function DeleteUserDialog(props: { open: boolean, setOpen: Dispatch<boolean> }) {

    const {t} = useTranslation("profile");
    
    const {enqueueSnackbar} = useSnackbar();
    const {token, setToken} = useAuth();

    const user: User = getUserFromJWT(token);

    const [username, setUsername] = useState("");

    const deleteUserMutation = useUserDelete(token);

    const handleClose = () => {
        setUsername("");
        props.setOpen(false);
    };

    if (deleteUserMutation.isError) {
        enqueueSnackbar(deleteUserMutation.error?.message, {variant: "error"});
    }

    return (
        <Dialog open={props.open}>
            {deleteUserMutation.isPending ? <CircularProgress sx={{margin: 8}}/> : <>
                <DialogTitle>
                    {t("dialog.user.delete.title")}
                </DialogTitle>
                <DialogContent>
                    <Stack spacing={2} paddingY={1}>
                        <Typography>
                            {t("dialog.user.delete.description")}
                        </Typography>
                        <TextField required variant="outlined" label={t("dialog.user.delete.field")}
                                   value={username}
                                   onChange={(event) => setUsername(event.target.value)}></TextField>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>
                        {t("dialog.cancel")}
                    </Button>
                    <Button disabled={username !== user.username} variant="contained"
                            onClick={() => {
                                if (username.trim().length <= 0) {
                                    enqueueSnackbar(t("dialog.user.delete.both"), {variant: "warning"});
                                    return;
                                }
                                deleteUserMutation.mutate(undefined, {
                                    onSuccess: () => {
                                        setToken("");
                                        localStorage.removeItem("token");
                                        return enqueueSnackbar(t("dialog.user.delete.alert"), {variant: "success"});
                                    },
                                    onSettled: () => handleClose()
                                });
                            }} autoFocus>
                        {t("dialog.user.delete.delete")}
                    </Button>
                </DialogActions>
            </>}
        </Dialog>
    );
}
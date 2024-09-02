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
import {Dispatch, useState} from "react";
import {useSnackbar} from "notistack";
import {useUserPatch} from "../../../services/users.ts";
import {useAuth} from "../../../hooks/useAuth.tsx";

export default function EditUserDialog(props: { open: boolean, setOpen: Dispatch<boolean> }) {

    const {enqueueSnackbar} = useSnackbar();
    const {token, setToken} = useAuth()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const patchUserMutation = useUserPatch(token)

    const handleClose = () => {
        setUsername("")
        setPassword("")
        props.setOpen(false);
    };

    if (patchUserMutation.isError) {
        enqueueSnackbar(patchUserMutation.error?.message, {variant: "error"})
    }

    return (
        <Dialog open={props.open} onClose={handleClose}>
            {patchUserMutation.isLoading ? <CircularProgress sx={{margin: 8}}/> : <>
                <DialogTitle>Are you sure you want to delete the project?</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} paddingY={1}>
                        <TextField variant="outlined" label="Username" value={username}
                                   onChange={(event) => setUsername(event.target.value)}></TextField>
                        <TextField variant="outlined" label="Password" value={password}
                                   onChange={(event) => setPassword(event.target.value)} type="password"></TextField>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button variant="contained" onClick={() => {
                        if (username.trim().length <= 0 && password.trim().length <= 0) {
                            enqueueSnackbar("At least one field should be filled", {variant: "warning"})
                            return
                        }
                        patchUserMutation.mutate({
                            username: username,
                            password: password
                        }, {
                            onSuccess: () => {
                                setToken("")
                                localStorage.removeItem("token")
                                return enqueueSnackbar("User data updated, please re-login", {variant: "success"});
                            },
                            onSettled: () => handleClose()
                        })
                    }} autoFocus>Edit</Button>
                </DialogActions>
            </>}
        </Dialog>
    )
}
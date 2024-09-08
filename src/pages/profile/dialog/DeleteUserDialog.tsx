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
import {Dispatch, useState} from "react";
import {useSnackbar} from "notistack";
import {useUserDelete} from "../../../services/users.ts";
import {useAuth} from "../../../hooks/useAuth.tsx";
import {User} from "../../../services/types.ts";

export default function DeleteUserDialog(props: { open: boolean, setOpen: Dispatch<boolean> }) {

    const {enqueueSnackbar} = useSnackbar();
    const {token, setToken} = useAuth()

    const user: User = getUserFromJWT(token)

    const [username, setUsername] = useState("")

    const deleteUserMutation = useUserDelete(token)

    const handleClose = () => {
        setUsername("")
        props.setOpen(false);
    };

    if (deleteUserMutation.isError) {
        enqueueSnackbar(deleteUserMutation.error?.message, {variant: "error"})
    }

    return (
        <Dialog open={props.open}>
            {deleteUserMutation.isLoading ? <CircularProgress sx={{margin: 8}}/> : <>
                <DialogTitle>Are you sure you want to delete the project?</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} paddingY={1}>
                        <Typography>
                            Verify account and projects deletion by typing current username and password!
                        </Typography>
                        <TextField required variant="outlined" label="Username" value={username}
                                   onChange={(event) => setUsername(event.target.value)}></TextField>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button disabled={username !== user.username} variant="contained"
                            onClick={() => {
                                if (username.trim().length <= 0) {
                                    enqueueSnackbar("Both field required", {variant: "warning"})
                                    return
                                }
                                deleteUserMutation.mutate(undefined, {
                                    onSuccess: () => {
                                        setToken("")
                                        localStorage.removeItem("token")
                                        return enqueueSnackbar("User and projects deleted. Thanks for using fStats", {variant: "success"});
                                    },
                                    onSettled: () => handleClose()
                                })
                            }} autoFocus>Delete user and projects</Button>
                </DialogActions>
            </>}
        </Dialog>
    )
}
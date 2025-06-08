import {Button, Card, Container, Divider, Stack, Typography} from "@mui/material";
import TextField from "@mui/material/TextField";
import {useSnackbar} from "notistack";
import {useEffect, useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";

import {Loader} from "@components/Loader";
import {useAuth} from "@hooks/useAuth";
import {useLabel} from "@hooks/useLabel";
import {useLogin} from "@services/fstats/auth";
import {User} from "@services/fstats/types";

export function LoginPage() {
    const navigate = useNavigate();

    const {state} = useLocation();
    const {enqueueSnackbar} = useSnackbar();
    const {setToken, isAuthorized} = useAuth()!;
    if (isAuthorized) navigate("/profile");

    const [username, setUsername] = useState<string>(state?.username || "");
    const [password, setPassword] = useState<string>("");
    const [user, setUser] = useState<User>();

    const {data, status, error} = useLogin(user);

    const {setLabel} = useLabel();

    useEffect(() => setLabel("Authorization"), [setLabel]);

    if (status === "pending" && user) return (<Loader/>);

    if (status === "error" && user) {
        enqueueSnackbar(error?.message, {variant: "error"});
        setUser(undefined);
    }

    if (status === "success" && user) {
        setToken(data.token);
        localStorage.setItem("token", data.token);
        setUser(undefined);
        enqueueSnackbar(`Welcome back ${user.username}`, {variant: "info"});
        navigate("/profile");
    }

    function loginUser(username: string, password: string) {
        if (username.trim() === "" || password.trim() === "") {
            enqueueSnackbar("Some fields is empty", {variant: "warning"});
            return;
        }

        setUser({
            username: username,
            password: password
        });
    }

    return (
        <Container maxWidth="xs">
            <Card>
                <Stack padding={2} spacing={2}>
                    <Typography variant="h4" align="center">Log In</Typography>
                    <TextField label="Username" variant="outlined" type="text" defaultValue={state?.username || ""}
                               onChange={(event) => setUsername(event.target.value)}/>
                    <TextField label="Password" variant="outlined" type="password"
                               onChange={(event) => setPassword(event.target.value)}/>
                    <Stack direction="row" divider={<Divider orientation="vertical" flexItem/>} spacing={2}>
                        <Button color="inherit" variant="contained" sx={{flexGrow: 9}}
                                onClick={() => loginUser(username, password)}>Login</Button>
                        <Button color="inherit" variant="outlined" sx={{flexGrow: 1}} component={Link}
                                to="/register">Register</Button>
                    </Stack>
                </Stack>
            </Card>
        </Container>
    );
}
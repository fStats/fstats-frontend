import TextField from '@mui/material/TextField';
import {Button, Card, CircularProgress, Container, Divider, Stack, Typography} from "@mui/material";
import React, {useState} from "react";
import {Link, Navigate} from "react-router-dom";
import {User} from "../services/types";
import {useLogin} from "../services/auth";
import {useSnackbar} from "notistack";
import {useAuth} from "../hooks/useAuth";

export function LoginPage() {

    const {enqueueSnackbar} = useSnackbar();

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [user, setUser] = useState<User>()

    const {data, status, error} = useLogin(user)

    const {setToken} = useAuth()!!

    if (status === "error" && user) {
        enqueueSnackbar(error?.message, {variant: "error"})
        setUser(undefined)
    }

    if (status === "loading" && user) {
        return (
            <Container maxWidth="xs" style={{padding: 16}}>
                <CircularProgress/>
            </Container>
        )
    }

    if (status === "success" && user) {
        setToken(data.token)
        localStorage.setItem("token", data.token);
        setUser(undefined)
        return <Navigate to="/"/>
    }

    function loginUser(username: string, password: string) {
        setUser({
            username: username,
            password: password
        })
    }

    return (
        <Container maxWidth="xs" style={{padding: 16}}>
            <br/>
            <Card>
                <Stack padding={2} spacing={2}>
                    <Typography variant="h4" align="center">Log In</Typography>
                    <TextField label="Username" variant="outlined" type="text" onChange={(event) => {
                        setUsername(event.target.value)
                    }}/>
                    <TextField label="Password" variant="outlined" type="password" onChange={(event) => {
                        setPassword(event.target.value)
                    }}/>
                    <Stack direction="row" divider={<Divider orientation="vertical" flexItem/>} spacing={2}>
                        <Button variant="contained" sx={{flexGrow: 9}}
                                onClick={() => loginUser(username, password)}>Login</Button>
                        <Button variant="outlined" sx={{flexGrow: 1}} component={Link}
                                to="/register">Register</Button>
                    </Stack>
                </Stack>
            </Card>
        </Container>
    )
}
import {Button, Card, CircularProgress, Container, Divider, Stack, TextField, Typography} from "@mui/material";
import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useRegistration} from "../services/auth";
import {User} from "../services/types";
import {useSnackbar} from "notistack";
import {CenteredContainer} from "../components/CenteredContainer";

export default function RegisterPage() {

    const navigate = useNavigate()
    const {enqueueSnackbar} = useSnackbar();

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [passwordRepeat, setPasswordRepeat] = useState("")

    const [user, setUser] = useState<User>()

    const {data, status, error} = useRegistration(user)

    if (status === "error" && user) {
        enqueueSnackbar(error?.message, {variant: "error"})
        setUser(undefined)
    }

    if (status === "loading" && user) {
        return (
            <CenteredContainer>
                <CircularProgress/>
            </CenteredContainer>
        )
    }

    if (status === "success" && user) {
        if (data.code !== 201) {
            enqueueSnackbar(data.message, {variant: "warning"});
        } else {
            enqueueSnackbar(data.message, {variant: "success"})
            navigate("/login", {state: {username: username}})
        }
        setUser(undefined)
    }

    function registerUser(username: string, password: string, passwordRepeat: string) {
        if (password !== passwordRepeat) return alert("Password doesn't match")
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
                    <Typography variant="h4" align="center">Register</Typography>
                    <TextField label="Username" variant="outlined" type="text"
                               onChange={event => setUsername(event.target.value)}/>
                    <TextField label="Password" variant="outlined" type="password"
                               onChange={event => setPassword(event.target.value)}/>
                    <TextField label="Password repeat" variant="outlined" type="password"
                               onChange={event => setPasswordRepeat(event.target.value)}/>
                    <Stack direction="row" divider={<Divider orientation="vertical" flexItem/>} spacing={2}>
                        <Button variant="contained" sx={{flexGrow: 9}} onClick={() => {
                            registerUser(username, password, passwordRepeat)
                        }}>Register</Button>
                        <Button variant="outlined" sx={{flexGrow: 1}} component={Link} to="/login">Login</Button>
                    </Stack>
                </Stack>
            </Card>
        </Container>
    )
}
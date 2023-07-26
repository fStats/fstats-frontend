import {Button, Card, Container, Divider, Stack, TextField, Typography} from "@mui/material";
import React, {useState} from "react";
import {Link} from "react-router-dom";

export default function RegisterPage() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [passwordRepeat, setPasswordRepeat] = useState("")

    function registerUser(username: string, password: string, passwordRepeat: string) {
        if (password !== passwordRepeat) return alert("Password doesn't match")

        //Registration
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
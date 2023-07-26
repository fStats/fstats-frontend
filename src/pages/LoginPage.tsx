import TextField from '@mui/material/TextField';
import {Button, Card, Container, Divider, Stack, Typography} from "@mui/material";
import React from "react";
import {Link} from "react-router-dom";

export function LoginPage() {
    return (
        <Container maxWidth="xs" style={{padding: 16}}>
            <br/>
            <Card>
                <Stack padding={2} spacing={2}>
                    <Typography variant="h4" align="center">Log In</Typography>
                    <TextField label="Username" variant="outlined" type="text"/>
                    <TextField label="Password" variant="outlined" type="password"/>
                    <Stack direction="row" divider={<Divider orientation="vertical" flexItem/>} spacing={2}>
                        <Button variant="contained" sx={{flexGrow: 9}}>Login</Button>
                        <Button variant="outlined" sx={{flexGrow: 1}} component={Link}
                                to="/register">Register</Button>
                    </Stack>
                </Stack>
            </Card>
        </Container>
    )
}
import TextField from '@mui/material/TextField';
import {Card, Container, Stack} from "@mui/material";
import React from "react";

export function LoginPage() {
    return (
        <Container maxWidth="xs" style={{padding: 16}}>
            <br/>
            <Card>
                <Stack padding={2} spacing={2}>
                    <TextField label="Username" variant="outlined" type="text"/>
                    <TextField label="Password" variant="outlined" type="password"/>
                </Stack>
            </Card>
        </Container>
    )
}
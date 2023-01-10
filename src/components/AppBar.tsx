import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AccountCircle from '@mui/icons-material/AccountCircle';
import {Button, Container} from "@mui/material";
import {StylelessLink} from "./StylelessLink";
import {Login} from "@mui/icons-material";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

export default function PrimaryAppBar() {

    const [isLogged, setLogged] = useState(false);
    const navigate = useNavigate()

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <StylelessLink to={"/"}>
                            <Typography
                                variant="h6"
                                noWrap
                                component="div"
                                sx={{display: {xs: 'none', sm: 'block'}}}>
                                Fabric Stats
                            </Typography>
                        </StylelessLink>
                        <Box sx={{flexGrow: 1}}/>
                        <StylelessLink to={"/random"}>
                            <Button key={1} sx={{my: 2, color: 'white', display: 'block'}}>Random mod</Button>
                        </StylelessLink>
                        <StylelessLink to={"/mods"}>
                            <Button key={1} sx={{my: 2, color: 'white', display: 'block'}}>Mods list</Button>
                        </StylelessLink>
                        <StylelessLink to={"/global"}>
                            <Button key={1} sx={{my: 2, color: 'white', display: 'block'}}>Global stats</Button>
                        </StylelessLink>
                        {isLogged ?
                            <StylelessLink to={"/profile"}>
                                <IconButton
                                    size="large"
                                    edge="end"
                                    aria-haspopup="true"
                                    color="inherit">
                                    <AccountCircle/>
                                </IconButton>
                            </StylelessLink>
                            :
                            <IconButton onClick={() => {
                                navigate("//./login")
                            }}
                                        size="large"
                                        edge="end"
                                        aria-haspopup="true"
                                        color="inherit">
                                <Login/>
                            </IconButton>
                        }
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    );
}
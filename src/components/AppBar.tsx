import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import {Button, Container, Fab} from "@mui/material";
import {AccountCircle, Add, Login} from "@mui/icons-material";
import {Link} from "react-router-dom";
import {useAuth} from "../hooks/useAuth";

export default function PrimaryAppBar() {

    const {isAuthorized} = useAuth()!!

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar>
                        <Typography variant="h5" noWrap color={"inherit"} component={Link} to="/"
                                    sx={{display: {xs: 'none', sm: 'block'}, textDecoration: "none"}}>
                            Fabric Stats
                        </Typography>
                        <Typography variant="caption" paddingTop={3}
                                    sx={{display: {xs: 'none', sm: 'block'}}}>ALPHA</Typography>
                        <Box sx={{flexGrow: 1}}/>
                        <Button key={1} sx={{my: 2, color: 'white', display: 'block'}} component={Link} to={"/random"}>
                            Random mod
                        </Button>
                        <Button key={1} sx={{my: 2, color: 'white', display: 'block'}} component={Link} to={"/mods"}>
                            Mods list
                        </Button>
                        <Button key={1} sx={{my: 2, color: 'white', display: 'block'}} component={Link} to={"/global"}>
                            Global stats
                        </Button>
                        {isAuthorized
                            ? <IconButton size="large" aria-haspopup="true" color="inherit" component={Link}
                                          to={"/profile"}>
                                <AccountCircle/>
                            </IconButton>
                            : <IconButton size="large" edge="end" aria-haspopup="false" color="inherit" component={Link}
                                          to={"/login"}>
                                <Login/>
                            </IconButton>
                        }
                    </Toolbar>
                </Container>
            </AppBar>
            {isAuthorized ?
                <Fab color="primary" component={Link} to="/create" sx={{position: 'absolute', bottom: 16, right: 16}}>
                    <Add/>
                </Fab> : null}
        </Box>
    );
}
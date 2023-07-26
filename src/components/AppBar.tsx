import * as React from 'react';
import {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AccountCircle from '@mui/icons-material/AccountCircle';
import {Button, Container} from "@mui/material";
import {Login} from "@mui/icons-material";
import {Link, useNavigate} from "react-router-dom";

export default function PrimaryAppBar() {

    const [isLogged, setLogged] = useState(false);
    const navigate = useNavigate()

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar>
                        <Typography
                            variant="h5"
                            noWrap
                            color={"inherit"}
                            component={Link}
                            to="/"
                            sx={{display: {xs: 'none', sm: 'block'}, textDecoration: "none"}}>
                            Fabric Stats
                        </Typography>
                        <Box sx={{flexGrow: 1}}/>
                        <Button key={1} sx={{my: 2, color: 'white', display: 'block'}} component={Link} to={"/random"}>Random
                            mod</Button>
                        <Button key={1} sx={{my: 2, color: 'white', display: 'block'}} component={Link} to={"/mods"}>Mods
                            list</Button>
                        <Button key={1} sx={{my: 2, color: 'white', display: 'block'}} component={Link} to={"/global"}>Global
                            stats</Button>
                        {isLogged ?
                            <IconButton
                                size="large"
                                edge="end"
                                aria-haspopup="true"
                                color="inherit"
                                component={Link}
                                to={"/profile"}>
                                <AccountCircle/>
                            </IconButton>
                            :
                            <IconButton
                                size="large"
                                edge="end"
                                aria-haspopup="true"
                                color="inherit"
                                component={Link}
                                to={"/login"}>
                                <Login/>
                            </IconButton>
                        }
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    );
}
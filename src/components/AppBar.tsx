import * as React from 'react';
import {styled, alpha} from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import AccountCircle from '@mui/icons-material/AccountCircle';
import {Button, Container} from "@mui/material";
import {Link} from "react-router-dom";

const linkStyle = {
    color: `inherit`,
    textDecoration: 'none'
}

export default function PrimaryAppBar() {
    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Link to={"/"} style={linkStyle}>
                            <Typography
                                variant="h6"
                                noWrap
                                component="div"
                                sx={{display: {xs: 'none', sm: 'block'}}}>
                                Fabric Stats
                            </Typography>
                        </Link>
                        <Box sx={{flexGrow: 1}}/>
                        <Link to={"/random"} style={linkStyle}>
                            <Button key={1} sx={{my: 2, color: 'white', display: 'block'}}>Random mod</Button>
                        </Link>
                        <Link to={"/mods"} style={linkStyle}>
                            <Button key={1} sx={{my: 2, color: 'white', display: 'block'}}>Mods list</Button>
                        </Link>
                        <Link to={"/global"} style={linkStyle}>
                            <Button key={1} sx={{my: 2, color: 'white', display: 'block'}}>Global stats</Button>
                        </Link>
                        <Box sx={{display: {xs: 'none', md: 'flex'}}}>
                            <Link to={"/profile"} style={linkStyle}>
                                <IconButton
                                    size="large"
                                    edge="end"
                                    aria-haspopup="true"
                                    color="inherit">
                                    <AccountCircle/>
                                </IconButton>
                            </Link>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    );
}
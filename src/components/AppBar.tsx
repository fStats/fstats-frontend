import * as React from 'react';
import {styled, alpha} from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import {Button, Container} from "@mui/material";
import {Link} from "react-router-dom";

const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {width: '20ch'},
    },
}));

const linkStyle = {
    color: `inherit`,
    textDecoration: 'none'
}

export default function PrimarySearchAppBar() {
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
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon/>
                            </SearchIconWrapper>
                            <StyledInputBase placeholder="Search…" inputProps={{'aria-label': 'search'}}/>
                        </Search>
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
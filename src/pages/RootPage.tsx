import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {Button, Container, CssBaseline, ListSubheader, Menu, MenuItem} from "@mui/material";
import {Link, Outlet, useNavigate} from "react-router-dom";
import {DrawerProps} from "./types";
import {AccountCircle, FormatListBulleted, Home, MenuBook, QuestionAnswer, Star} from "@mui/icons-material";
import {useLabel} from "../hooks/useLabel";
import {useAuth} from "../hooks/useAuth";
import {useSnackbar} from "notistack";
import {useUserFavorites} from "../services/users";
import {User} from "../services/types";

export const drawerWidth = 240;

export default function RootPage(props: DrawerProps) {

    const {window} = props;

    const navigate = useNavigate()

    const [mobileOpen, setMobileOpen] = React.useState(false);

    const {isAuthorized, setToken, token} = useAuth()!!

    let user: User
    if (isAuthorized) user = JSON.parse(atob(token.split('.')[1]))

    const id = (isAuthorized && user!!.id) || NaN

    const {data} = useUserFavorites(id, token)

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const {enqueueSnackbar} = useSnackbar()

    const handleClose = () => {
        setAnchorEl(null);
    };

    const {label} = useLabel()!!

    const publicItems = [
        {
            label: "Home",
            route: "/",
            icon: <Home/>
        },
        {
            label: "How to start",
            route: "how-to-start",
            icon: <MenuBook/>
        },
        {
            label: "Projects catalogue",
            route: "projects",
            icon: <FormatListBulleted/>
        },
        {
            label: "FAQ",
            route: "faq",
            icon: <QuestionAnswer/>
        }
    ]

    const drawer = (
        <div>
            <Toolbar>
                <Typography variant="h5">fStats</Typography>
            </Toolbar>
            <Divider/>
            <List>
                {publicItems.map(item =>
                    <ListItem disablePadding>
                        <ListItemButton component={Link} to={item.route}>
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.label}/>
                        </ListItemButton>
                    </ListItem>
                )}
            </List>
            <Divider/>
            {isAuthorized && data && data.length > 0 ? <List subheader={<ListSubheader>Favorites</ListSubheader>}>
                {data.map(project => {
                    return <ListItem disablePadding>
                        <ListItemButton component={Link} to={`project/${project.id}`}>
                            <ListItemIcon>
                                <Star/>
                            </ListItemIcon>
                            <ListItemText primary={
                                <Typography overflow="hidden" textOverflow="ellipsis">
                                    {project.name}
                                </Typography>
                            }/>
                        </ListItemButton>
                    </ListItem>
                })}
            </List> : null}
        </div>
    );

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <AppBar position="fixed" sx={{width: {sm: `calc(100% - ${drawerWidth}px)`}, ml: {sm: `${drawerWidth}px`},}}>
                <Toolbar>
                    <IconButton color="inherit" aria-label="open drawer" edge="start"
                                onClick={() => setMobileOpen(!mobileOpen)}
                                sx={{mr: 2, display: {sm: 'none'}}}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" sx={{flexGrow: 1}}>{label}</Typography>
                    {isAuthorized ? <div>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={(event) => setAnchorEl(event.currentTarget)}
                                color="inherit"
                            >
                                <AccountCircle/>
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{vertical: 'top', horizontal: 'right',}}
                                keepMounted
                                transformOrigin={{vertical: 'top', horizontal: 'right',}}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={() => {
                                    setAnchorEl(null)
                                    navigate("/profile");
                                }}>Profile</MenuItem>
                                <MenuItem onClick={() => {
                                    setAnchorEl(null)
                                    setToken("")
                                    localStorage.setItem("token", "");
                                    enqueueSnackbar("Have a nice day :)", {variant: "info"})
                                }}>Logout</MenuItem>
                            </Menu>
                        </div>
                        : <Button color="inherit" component={Link} to="login">Login</Button>}
                </Toolbar>
            </AppBar>
            <Box component="nav" sx={{width: {sm: drawerWidth}, flexShrink: {sm: 0}}}>
                <Drawer
                    container={window !== undefined ? () => window().document.body : undefined}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={() => setMobileOpen(!mobileOpen)}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: {xs: 'block', sm: 'none'},
                        '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: {xs: 'none', sm: 'block'},
                        '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box component="main" sx={{flexGrow: 1, p: 3, width: {sm: `calc(100% - ${drawerWidth}px)`}}}>
                <Toolbar/>
                <Container maxWidth="xl">
                    <Outlet/>
                </Container>
            </Box>
        </Box>
    );
}
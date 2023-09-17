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
import {Container, CssBaseline, ListSubheader} from "@mui/material";
import {Link, Outlet} from "react-router-dom";
import {DrawerProps} from "./types";
import {FormatListBulleted, MenuBook, Star} from "@mui/icons-material";

export const drawerWidth = 240;

export default function RootPage(props: DrawerProps) {
    const {window} = props;

    const [mobileOpen, setMobileOpen] = React.useState(false);

    const publicItems = [
        {
            label: "How to start",
            route: "/how-to-start",
            icon: <MenuBook/>
        },
        {
            label: "Projects catalogue",
            route: "/projects",
            icon: <FormatListBulleted/>
        }
    ]

    const userFavorites = [
        {
            id: 1,
            name: "fStats"
        }
    ]

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

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
            {userFavorites.length > 0 ? <List subheader={
                <ListSubheader>Favorites</ListSubheader>
            }>
                {userFavorites.map(project => {
                    return <ListItem disablePadding>
                        <ListItemButton component={Link} to={`${project.id}`}>
                            <ListItemIcon>
                                <Star/>
                            </ListItemIcon>
                            <ListItemText primary={project.name}/>
                        </ListItemButton>
                    </ListItem>
                })}
            </List> : null}
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <AppBar
                position="fixed"
                sx={{
                    width: {sm: `calc(100% - ${drawerWidth}px)`},
                    ml: {sm: `${drawerWidth}px`},
                }}
            >
                <Toolbar>
                    <IconButton color="inherit" aria-label="open drawer" edge="start"
                                onClick={handleDrawerToggle}
                                sx={{mr: 2, display: {sm: 'none'}}}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">

                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{width: {sm: drawerWidth}, flexShrink: {sm: 0}}}
            >
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: {
                            xs: 'block',
                            sm: 'none'
                        },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth
                        },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: {
                            xs: 'none',
                            sm: 'block'
                        },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth
                        },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{flexGrow: 1, p: 3, width: {sm: `calc(100% - ${drawerWidth}px)`}}}
            >
                <Toolbar/>

                <Container maxWidth="xl">
                    <Outlet/>
                </Container>
            </Box>
        </Box>
    );
}
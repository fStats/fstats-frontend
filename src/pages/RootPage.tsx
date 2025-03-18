import {useState} from "react";
import {
    AppBar,
    Box,
    Button,
    Container,
    CssBaseline,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ListSubheader,
    Menu,
    MenuItem,
    Toolbar,
    Typography
} from '@mui/material';
import {Link, Outlet, useNavigate} from "react-router-dom";
import {AccountCircle, FormatListBulleted, Gavel, Home, MenuBook, QuestionAnswer, Star} from "@mui/icons-material";
import {useLabel} from "../hooks/useLabel";
import {useAuth} from "../hooks/useAuth";
import {useSnackbar} from "notistack";
import {useUserFavorites} from "../services/users";
import {User} from "../services/types";

export const drawerWidth = 240;

export default function RootPage() {

    const navigate = useNavigate()

    const {isAuthorized, setToken, token} = useAuth()!!

    let user: User
    if (isAuthorized) user = JSON.parse(atob(token.split('.')[1]))

    const id = (isAuthorized && user!!.id) || NaN

    const {data} = useUserFavorites(id, token)

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const {enqueueSnackbar} = useSnackbar()

    const handleClose = () => {
        setAnchorEl(null);
    };

    const {label} = useLabel()

    const publicItems = [
        {
            label: "Home",
            route: "/",
            icon: <Home/>
        },
        {
            label: "Getting started",
            route: "getting-started",
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
        },
        {
            label: "Terms & Policy",
            route: "terms-policy",
            icon: <Gavel/>
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
                    <ListItem disablePadding key={item.route}>
                        <ListItemButton component={Link} to={item.route} key={item.route}>
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
                {data.map(project =>
                    <ListItem disablePadding key={project.id}>
                        <ListItemButton component={Link} to={`project/${project.id}`}>
                            <ListItemIcon>
                                <Star/>
                            </ListItemIcon>
                            <ListItemText primary={
                                <Typography whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
                                    {project.name}
                                </Typography>
                            }/>
                        </ListItemButton>
                    </ListItem>)}
            </List> : null}
        </div>
    );

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <AppBar position="fixed" sx={{width: {sm: `calc(100% - ${drawerWidth}px)`}}}>
                <Toolbar>
                    <Typography variant="h6" noWrap component="div" sx={{flexGrow: 1}}>{label}</Typography>
                    {isAuthorized ? <div>
                            <IconButton size="large" color="inherit"
                                        onClick={(event) => setAnchorEl(event.currentTarget)}>
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
            <Box component="nav" sx={{width: {sm: drawerWidth}}}>
                <Drawer variant="permanent" sx={{'& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth}}}>
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

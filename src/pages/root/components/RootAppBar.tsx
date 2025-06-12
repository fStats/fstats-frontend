import { Menu } from "@mui/icons-material";
import {AppBar, Button, IconButton, Toolbar, Typography} from "@mui/material";
import {t} from "i18next";
import {Link} from "react-router-dom";

import {useAuth} from "@hooks/useAuth";
import {useLabel} from "@hooks/useLabel";
import UserMenu from "@pages/root/components/UserMenu";

import {drawerWidth} from "./RootDrawer";
import {DrawerStateProps} from "./types";

export default function RootAppBar(props: DrawerStateProps) {

    const {isAuthorized} = useAuth();
    const {label} = useLabel();

    const handleDrawerToggle = () => {
        if (!props.isClosing) {
            props.setMobileOpen(!props.mobileOpen);
        }
    };

    return (
        <AppBar position="fixed" sx={{
            width: { md: `calc(100% - ${drawerWidth}px)` },
            ml: { md: `${drawerWidth}px` },
        }}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { md: "none" } }}
                >
                    <Menu />
                </IconButton>
                <Typography variant="h6" noWrap component="div" sx={{flexGrow: 1}}>{label}</Typography>
                {isAuthorized ? <UserMenu/> : <Button color="inherit" component={Link} to="login">{t("root.menu.login")}</Button>}
            </Toolbar>
        </AppBar>
    );
} 
import {AppBar, Button, Toolbar, Typography} from "@mui/material";
import {Link} from "react-router-dom";

import {useAuth} from "@hooks/useAuth";
import {useLabel} from "@hooks/useLabel";
import UserMenu from "@pages/root/components/UserMenu";
import {drawerWidth} from "@pages/root/RootPage";

export default function RootAppBar() {

    const {isAuthorized} = useAuth()
    const {label} = useLabel()

    return (
        <AppBar position="fixed" sx={{width: {sm: `calc(100% - ${drawerWidth}px)`}}}>
            <Toolbar>
                <Typography variant="h6" noWrap component="div" sx={{flexGrow: 1}}>{label}</Typography>
                {isAuthorized ? <UserMenu/> : <Button color="inherit" component={Link} to="login">Login</Button>}
            </Toolbar>
        </AppBar>
    )
} 
import {
    Box,
    Container,
    CssBaseline,
    Toolbar,
} from "@mui/material";
import {Outlet} from "react-router-dom";

import RootAppBar from "@pages/root/components/RootAppBar";
import RootDrawer from "@pages/root/components/RootDrawer";

export const drawerWidth = 240;

export default function RootPage() {
    return (
        <Box sx={{display: "flex"}}>
            <CssBaseline/>
            <RootAppBar/>
            <Box component="nav" sx={{width: {sm: drawerWidth}}}>
                <RootDrawer/>
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
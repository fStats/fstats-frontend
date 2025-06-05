import {Box, CssBaseline, Toolbar} from "@mui/material";
import {useState} from "react";
import {Outlet} from "react-router-dom";

import RootAppBar from "@pages/root/components/RootAppBar";
import RootDrawer, {drawerWidth} from "@pages/root/components/RootDrawer";

export default function RootPage() {

    const [mobileOpen, setMobileOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    return (
        <Box sx={{display: "flex"}}>
            <CssBaseline/>
            <RootAppBar isClosing={isClosing} mobileOpen={mobileOpen}
                        setIsClosing={setIsClosing} setMobileOpen={setMobileOpen}/>
            <RootDrawer isClosing={isClosing} mobileOpen={mobileOpen}
                        setIsClosing={setIsClosing} setMobileOpen={setMobileOpen}/>
            <Box component="main" sx={{flexGrow: 1, p: 2, width: {sm: `calc(100% - ${drawerWidth}px)`}}}>
                <Toolbar/>
                <Outlet/>
            </Box>
        </Box>
    );
}
import {Box, Drawer} from "@mui/material";

import {DrawerContent} from "./DrawerContent";
import {DrawerStateProps} from "./types";

export const drawerWidth = 240;

export default function RootDrawer(props: DrawerStateProps) {

    const handleDrawerTransitionEnd = () => {
        props.setIsClosing(false);
    };

    const handleDrawerClose = () => {
        props.setIsClosing(true);
        props.setMobileOpen(false);
    };

    return (
        <Box
            component="nav"
            sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        >
            <Drawer
                variant="temporary"
                open={props.mobileOpen}
                onTransitionEnd={handleDrawerTransitionEnd}
                onClose={handleDrawerClose}
                sx={{
                    display: { xs: "block", md: "none" },
                    "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
                }}
                slotProps={{
                    root: {
                        keepMounted: true,
                    },
                }}
            >
                <DrawerContent handleDrawerClose={handleDrawerClose}/>
            </Drawer>
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: "none", md: "block" },
                    "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
                }}
                open
            >
                <DrawerContent handleDrawerClose={handleDrawerClose}/>
            </Drawer>
        </Box>
    );
}
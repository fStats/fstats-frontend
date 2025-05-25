import {
    Divider,
    Drawer as MUIDrawer,
    Toolbar,
    Typography
} from "@mui/material";

import FavoritesList from "@pages/root/components/FavoritesList";
import NavigationList from "@pages/root/components/NavigationList";
import {drawerWidth} from "@pages/root/RootPage";

export default function RootDrawer() {
    return (
        <MUIDrawer variant="permanent" sx={{"& .MuiDrawer-paper": {boxSizing: "border-box", width: drawerWidth}}}>
            <div>
                <Toolbar>
                    <Typography variant="h5">fStats</Typography>
                </Toolbar>
                <Divider/>
                <NavigationList/>
                <Divider/>
                <FavoritesList/>
            </div>
        </MUIDrawer>
    )
}
import {Divider, Toolbar, Typography} from "@mui/material";

import FavoritesList from "@pages/root/components/FavoritesList";
import NavigationList from "@pages/root/components/NavigationList";
import {DrawerCloseProps} from "@pages/root/components/types";

export const DrawerContent = (props: DrawerCloseProps) => {
    return <div>
        <Toolbar>
            <Typography variant="h5" flexGrow={1}>fStats</Typography>
        </Toolbar>
        <Divider/>
        <NavigationList handleDrawerClose={props.handleDrawerClose}/>
        <Divider/>
        <FavoritesList handleDrawerClose={props.handleDrawerClose}/>
    </div>;
};
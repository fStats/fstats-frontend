import {List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {Link} from "react-router-dom";

import {navigationRoutes} from "@pages/root/components/navigation";
import {DrawerCloseProps} from "@pages/root/components/types";

export default function NavigationList(props: DrawerCloseProps) {
    return (
        <List>
            {navigationRoutes.map(item =>
                <ListItem disablePadding key={item.route}>
                    <ListItemButton component={Link} to={item.route} key={item.route} onClick={props.handleDrawerClose}>
                        <ListItemIcon>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.label}/>
                    </ListItemButton>
                </ListItem>
            )}
        </List>
    )
}
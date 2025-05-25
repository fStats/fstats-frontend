import {List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {Link} from "react-router-dom";

import {navigationRoutes} from "@pages/root/components/navigation";

export default function NavigationList() {
    return (
        <List>
            {navigationRoutes.map(item =>
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
    )
}
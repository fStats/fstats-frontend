import {Star} from "@mui/icons-material";
import {List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Typography} from "@mui/material";
import {Link} from "react-router-dom";

import {useAuth} from "@hooks/useAuth";
import {DrawerCloseProps} from "@pages/root/components/types";
import {useUserFavorites} from "@services/fstats/users";

export default function FavoritesList(props: DrawerCloseProps) {

    const {isAuthorized, token} = useAuth();

    const userId = isAuthorized
        ? JSON.parse(atob(token.split(".")[1])).id
        : undefined;

    const {data: favorites = []} = useUserFavorites(userId, token);

    return (
        isAuthorized && favorites && favorites.length > 0 && <List subheader={<ListSubheader>Favorites</ListSubheader>}>
            {favorites.map(project =>
                <ListItem disablePadding key={project.id}>
                    <ListItemButton component={Link} to={`projects/${project.id}`} onClick={props.handleDrawerClose}>
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
        </List>
    );
}
import React from "react";
import {Card, CardActionArea, CardContent, Stack, Typography} from "@mui/material";
import Grid2 from '@mui/material/Unstable_Grid2';
import {useNavigate} from "react-router-dom";
import {useUserProjects} from "../../services/users";
import {useAuth} from "../../hooks/useAuth";
import {User} from "../../services/types";
import {Loader} from "../../components/Loader";
import {useSnackbar} from "notistack";

export function ProfilePage() {

    const {enqueueSnackbar} = useSnackbar();

    const navigate = useNavigate()
    const {token} = useAuth()!!
    const user: User = JSON.parse(atob(token.split('.')[1]))

    const {data, status, error} = useUserProjects(user.id!!)

    if (status === "loading") return (<Loader/>)

    if (status === "error") {
        enqueueSnackbar(error?.message, {variant: "error"})
        navigate('/')
        return <></>
    }

    return (
        <Grid2 container spacing={2} padding={4}>
            <Grid2 xs={2}>
                <Card>
                    <CardContent>
                        <Typography variant="h5" textAlign="center">{user.username}</Typography>
                    </CardContent>
                </Card>
            </Grid2>
            <Grid2 xs={10}>
                <Stack spacing={2}>
                    {(data.length > 0) ? data.map(project => (
                        <Card>
                            <CardActionArea onClick={() => navigate(`//./mods/${project.id}`)}>
                                <CardContent>
                                    {project.name}
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    )) : <Typography>No Project found</Typography>}
                </Stack>
            </Grid2>
        </Grid2>
    )
}
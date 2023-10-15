import {useNavigate, useParams} from "react-router-dom";
import {useSnackbar} from "notistack";
import Grid2 from "@mui/material/Unstable_Grid2";
import {CircularProgress, Fab, Typography} from "@mui/material";
import MetricCard from "./components/MetricCard";
import {useMetricCount} from "../../services/metrics";
import {useLabel} from "../../hooks/useLabel";
import {Loader} from "../../components/Loader";
import {DataValue, User} from "../../services/types";
import {Favorite, Remove} from "@mui/icons-material";
import {useUserFavorites} from "../../services/users";
import {useAuth} from "../../hooks/useAuth";
import {useAddProjectToFavorite, useRemoveProjectFromFavorite} from "../../services/projects";
import React, {useEffect, useState} from "react";

export default function ProjectPage() {

    const navigate = useNavigate()
    const {enqueueSnackbar} = useSnackbar();

    const projectId = Number.parseInt(useParams().id!!)
    const {data, status, error} = useMetricCount(projectId)

    const {token, isAuthorized} = useAuth()!!

    let user: User
    if (isAuthorized) user = JSON.parse(atob(token.split('.')[1]))

    const userId = (isAuthorized && user!!.id) || NaN

    const [isProjectFavorite, setProjectFavorite] = useState(false)

    const {data: userFavoriteData} = useUserFavorites(userId, token)

    const addProjectToFavorite = useAddProjectToFavorite()

    const removeProjectFromFavorite = useRemoveProjectFromFavorite()

    useLabel()?.setLabel(data?.project.name || "")

    useEffect(() => {
        setProjectFavorite(userFavoriteData?.some(project => project.id === projectId)!!)
    }, [userFavoriteData]);

    if (status === "loading") return (<Loader/>)

    if (status === "error") {
        enqueueSnackbar(error?.message, {variant: "error"})
        navigate('/not-found')
        return <></>
    }

    return (
        <>
            {Object.entries(data.metric_map).length > 0 ? <Grid2 container spacing={2} justifyContent="center">
                <Grid2>
                    <MetricCard title="Minecraft Version" metric={data.metric_map.minecraft_version}/>
                </Grid2>

                <Grid2>
                    <MetricCard title="Online Mode" metric={formatOnlineMode(data.metric_map.online_mode)}/>
                </Grid2>

                <Grid2>
                    <MetricCard title="Mod Version" metric={data.metric_map.mod_version}/>
                </Grid2>

                <Grid2>
                    <MetricCard title="Operation System" metric={formatOperationSystem(data.metric_map.os)}/>
                </Grid2>

                <Grid2>
                    <MetricCard title="Location" metric={data.metric_map.location}/>
                </Grid2>

                <Grid2>
                    <MetricCard title="Fabric API" metric={data.metric_map.fabric_api_version}/>
                </Grid2>
            </Grid2> : <Typography variant="h4" textAlign="center" paddingTop={4}>No data found</Typography>}
            {isAuthorized && <Fab color="primary" sx={{position: 'fixed', bottom: 16, right: 16}} onClick={() =>
                isProjectFavorite ? removeProjectFromFavorite.mutate((projectId), {
                    onSuccess: () => setProjectFavorite(userFavoriteData?.some(project => project.id === projectId)!!),
                    onError: (error) => enqueueSnackbar(error.message, {variant: "error"})
                }) : addProjectToFavorite.mutate((projectId), {
                    onSuccess: () => setProjectFavorite(userFavoriteData?.some(project => project.id === projectId)!!),
                    onError: (error) => enqueueSnackbar(error.message, {variant: "error"})
                })}>
                {(addProjectToFavorite.isLoading || removeProjectFromFavorite.isLoading) ?
                    <CircularProgress color="inherit"/> : isProjectFavorite ? <Remove/> : <Favorite/>}
            </Fab>}
        </>
    )
}

const formatOnlineMode = (data: DataValue) => (Object.fromEntries(
    Object.entries(data).map(([value, count]) => {
        if (value === 'true') value = 'Online';
        if (value === 'false') value = 'Offline';
        return [value, count];
    })
) as DataValue);

const formatOperationSystem = (data: DataValue) => (Object.fromEntries(
    Object.entries(data).map(([value, count]) => {
        if (value === 'l') value = 'Linux'
        if (value === 'm') value = 'MacOS'
        if (value === 'w') value = 'Windows'
        return [value, count];
    })
) as DataValue);
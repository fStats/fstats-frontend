import {useNavigate, useParams} from "react-router-dom";
import {useSnackbar} from "notistack";
import Grid2 from "@mui/material/Unstable_Grid2";
import {CircularProgress, Fab, Stack, Typography} from "@mui/material";
import MetricCard from "./components/MetricCard";
import {useLineMetric, usePieMetric} from "../../services/metrics";
import {useLabel} from "../../hooks/useLabel";
import {Loader} from "../../components/Loader";
import {DataValue, User} from "../../services/types";
import {Favorite, Remove} from "@mui/icons-material";
import {useUserFavorites} from "../../services/users";
import {useAuth} from "../../hooks/useAuth";
import {useAddProjectToFavorite, useRemoveProjectFromFavorite} from "../../services/projects";
import React, {useEffect, useState} from "react";
import TimelineCard from "./components/TimelineCard";
import CenteredContainer from "../../components/CenteredContainer";
import {Helmet} from "react-helmet";

export default function ProjectPage() {

    const navigate = useNavigate()
    const {enqueueSnackbar} = useSnackbar();

    const projectId = Number.parseInt(useParams().id!!)
    const {data, status, error} = usePieMetric(projectId)
    const {data: timeline, status: timeStatus, error: timeError} = useLineMetric(projectId)

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
        return () => setProjectFavorite(userFavoriteData?.some(project => project.id === projectId)!!)
    }, [userFavoriteData, projectId]);

    if (status === "loading" || timeStatus === "loading") return (<Loader/>)

    if (status === "error" || timeStatus === "error") {
        error && enqueueSnackbar(error?.message, {variant: "error"})
        timeError && enqueueSnackbar(timeError?.message, {variant: "error"})
        navigate('/not-found')
        return <></>
    }

    return (
        <>
            <Helmet>
                <meta property="og:image" content={`https://img.fstats.dev/timeline/${projectId}`}/>
            </Helmet>
            <Stack spacing={2}>
                {Object.entries(timeline).length > 0 && <TimelineCard data={timeline}/>}
                {Object.entries(data.metric_pie).length > 0 ? <Grid2 container spacing={2} justifyContent="center">
                    <Grid2>
                        <MetricCard title="Minecraft Version" metric={data.metric_pie.minecraft_version}/>
                    </Grid2>

                    <Grid2>
                        <MetricCard title="Online Mode" metric={formatOnlineMode(data.metric_pie.online_mode)}/>
                    </Grid2>

                    <Grid2>
                        <MetricCard title="Mod Version" metric={data.metric_pie.mod_version}/>
                    </Grid2>

                    <Grid2>
                        <MetricCard title="Operation System" metric={formatOperationSystem(data.metric_pie.os)}/>
                    </Grid2>

                    <Grid2>
                        <MetricCard title="Location" metric={data.metric_pie.location}/>
                    </Grid2>

                    <Grid2>
                        <MetricCard title="Fabric API" metric={data.metric_pie.fabric_api_version}/>
                    </Grid2>
                </Grid2> : <CenteredContainer>
                    <Typography variant="h4" textAlign="center">No data found :(</Typography>
                </CenteredContainer>}
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
            </Stack>
        </>
    )
}

const formatOnlineMode = (data: DataValue) => (Object.fromEntries(
    Object.entries(data).map(([value, count]) => {
        if (value === "true") value = "Online";
        if (value === "false") value = "Offline";
        return [value, count];
    })
) as DataValue);

const formatOperationSystem = (data: DataValue) => (Object.fromEntries(
    Object.entries(data).map(([value, count]) => {
        if (value === 'l') value = "Linux"
        if (value === 'm') value = "MacOS"
        if (value === 'w') value = "Windows"
        if (value === 'o') value = "Other"
        return [value, count];
    })
) as DataValue);
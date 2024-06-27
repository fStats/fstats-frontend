import {useNavigate, useParams} from "react-router-dom";
import {useSnackbar} from "notistack";
import Grid2 from "@mui/material/Unstable_Grid2";
import {CircularProgress, Fab, Stack} from "@mui/material";
import MetricCard from "./components/card/MetricCard.tsx";
import {usePieMetric} from "../../services/metrics";
import {useLabel} from "../../hooks/useLabel";
import {Loader} from "../../components/Loader";
import {User} from "../../services/types";
import {Favorite, Remove} from "@mui/icons-material";
import {useUserFavorites} from "../../services/users";
import {useAuth} from "../../hooks/useAuth";
import {useAddProjectToFavorite, useRemoveProjectFromFavorite} from "../../services/projects";
import {useEffect, useState} from "react";
import TimelineCard from "./components/card/TimelineCard.tsx";
import {WorldMapCard} from "./components/card/WorldMapCard.tsx";
import {formatOnlineMode} from "../../mics/formatter/onlineMode.ts";
import {formatOperationSystem} from "../../mics/formatter/operationSystem.ts";

export default function ProjectPage() {

    const navigate = useNavigate()
    const {enqueueSnackbar} = useSnackbar();

    const projectId = Number.parseInt(useParams().id!!)
    const {data, status, error} = usePieMetric(projectId)

    const {token, isAuthorized} = useAuth()!!

    let user: User
    if (isAuthorized) user = JSON.parse(atob(token.split('.')[1]))

    const userId = (isAuthorized && user!!.id) || NaN

    const [isProjectFavorite, setProjectFavorite] = useState(false)

    const {data: userFavoriteData} = useUserFavorites(userId, token)

    const addProjectToFavorite = useAddProjectToFavorite()

    const removeProjectFromFavorite = useRemoveProjectFromFavorite()

    useLabel()?.setLabel("Temporally unavailable :(")

    useEffect(() => {
        setProjectFavorite(userFavoriteData?.some(project => project.id === projectId)!!)
        return () => setProjectFavorite(userFavoriteData?.some(project => project.id === projectId)!!)
    }, [userFavoriteData, projectId]);

    if (status === "loading") return (<Loader/>)

    if (status === "error") {
        error && enqueueSnackbar(error?.message, {variant: "error"})
        navigate('/not-found')
        return <></>
    }

    return (
        <Stack spacing={2}>
            <TimelineCard projectId={projectId}/>
            <Grid2 container columnGap={2} rowGap={2} justifyContent="center">
                <Grid2 xs={6} sm={8} md={2.296}>
                    <MetricCard title="Minecraft Version" metric={data.minecraft_version ?? []}/>
                </Grid2>
                <Grid2 xs={6} sm={8} md={2.296}>
                    <MetricCard title="Online Mode" metric={formatOnlineMode(data.online_mode ?? [])}/>
                </Grid2>
                <Grid2 xs={6} sm={8} md={2.296}>
                    <MetricCard title="Mod Version" metric={data.mod_version ?? []}/>
                </Grid2>
                <Grid2 xs={6} sm={8} md={2.296}>
                    <MetricCard title="Operation System" metric={formatOperationSystem(data.os ?? [])}/>
                </Grid2>
                <Grid2 xs={6} sm={8} md={2.296}>
                    <MetricCard title="Fabric API" metric={data.fabric_api_version ?? []}/>
                </Grid2>
            </Grid2>
            <WorldMapCard title="Location" metric={data.location ?? []}/>
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
    )
}
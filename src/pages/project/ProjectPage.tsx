import {Favorite, Remove, Warning} from "@mui/icons-material";
import {Alert, Box, Card, CardContent, CircularProgress, Fab, Stack, Tab, Tabs, Typography} from "@mui/material";
import {useSnackbar} from "notistack";
import {useEffect, useMemo, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

import {Loader} from "@components/Loader";
import {useAuth} from "@hooks/useAuth";
import {useLabel} from "@hooks/useLabel";
import TimelineCard from "@pages/project/components/card/TimelineCard";
import {useLineMetricMutation, usePieMetric} from "@services/fstats/metrics";
import {useAddProjectToFavorite, useProject, useRemoveProjectFromFavorite} from "@services/fstats/projects";
import {User} from "@services/fstats/types";
import {useUserFavorites} from "@services/fstats/users";
import {getUserFromJWT} from "@utils/decoders/jwt";
import {decodeLineMetric} from "@utils/decoders/line";
import {mergeData} from "@utils/merge";

import {ChartsTab} from "./components/ChartsTab";
import {MetricTab, TimelineData} from "./components/types";

export function ProjectPage() {

    const navigate = useNavigate()
    const id = useParams().id!

    const projectId = Number.parseInt(id ?? navigate("projects"))
    const {enqueueSnackbar} = useSnackbar();

    const {isAuthorized, token} = useAuth()
    const user: User = getUserFromJWT(token)

    const {data: projectData} = useProject(projectId)

    const {
        data: serverData,
        status: serverStatus,
        error: serverError
    } = useLineMetricMutation(projectId, 0, "all", true)
    const {
        data: clientData,
        status: clientStatus,
        error: clientError
    } = useLineMetricMutation(projectId, 0, "all", false)

    const {data: serverPieData, status: serverPieStatus, error: serverPieError} = usePieMetric(projectId, true)
    const {data: clientPieData, status: clientPieStatus, error: clientPieError} = usePieMetric(projectId, false)

    const {data: rawUserFavorites} = useUserFavorites(user.id || NaN, token);
    const userFavoriteData = useMemo(() => rawUserFavorites ?? [], [rawUserFavorites]);

    const addProjectToFavorite = useAddProjectToFavorite()
    const removeProjectFromFavorite = useRemoveProjectFromFavorite()

    const [isProjectFavorite, setProjectFavorite] = useState(false)
    const [tab, setTab] = useState(MetricTab.Mixed)

    const clientNotExist = Object.entries(clientPieData?.mod_version ?? 0).length <= 0
    const serverNotExist = Object.entries(serverPieData?.mod_version ?? 0).length <= 0

    const {setLabel} = useLabel()

    useEffect(() => {
        if (projectId <= 0) return navigate("projects")
    }, [navigate, projectId]);

    useEffect(() => {
        if (clientNotExist && serverNotExist) setTab(MetricTab.Mixed)
        else if (clientNotExist) setTab(MetricTab.Server)
        else if (serverNotExist) setTab(MetricTab.Client)
        setLabel(projectData?.name ?? "")
    }, [projectId, clientNotExist, serverNotExist, setLabel, projectData?.name]);

    useEffect(() => {
        setProjectFavorite(userFavoriteData?.some(project => project.id === projectId))
        return () => setProjectFavorite(userFavoriteData?.some(project => project.id === projectId))
    }, [userFavoriteData, projectId]);

    if (serverStatus === "pending" || clientStatus === "pending" || serverPieStatus === "pending" || clientPieStatus === "pending") return (
        <Loader/>)

    if (serverStatus === "error" || clientStatus === "error" || serverPieStatus === "error" || clientPieStatus === "error") {
        if (serverError) enqueueSnackbar(serverError?.message, {variant: "error"})
        if (clientError) enqueueSnackbar(clientError?.message, {variant: "error"})
        if (serverPieError) enqueueSnackbar(serverPieError?.message, {variant: "error"})
        if (clientPieError) enqueueSnackbar(clientPieError?.message, {variant: "error"})
        navigate("/not-found")
        return <></>
    }

    const serverDecodedData = decodeLineMetric(serverData)
    const clientDecodedData = decodeLineMetric(clientData)
    const mergedDecodedData = mergeData(clientDecodedData, serverDecodedData)

    const findMaxClientX = (): TimelineData => clientDecodedData.slice(1).reduce((max, item) => (item.y > max.y ? item : max), clientDecodedData[0])
    const findMaxServerX = (): TimelineData => serverDecodedData.slice(1).reduce((max, item) => (item.y > max.y ? item : max), serverDecodedData[0])
    const findMaxMixedX = (): TimelineData => mergedDecodedData.slice(1).reduce((max, item) => (item.y > max.y ? item : max), mergedDecodedData[0])

    return (
        <Stack spacing={2}>
            {projectData && projectData.is_hidden &&
                <Alert variant="outlined" color="warning" icon={<Warning/>}>{projectData.hiding_reason}</Alert>}
            <Stack direction="row" spacing={2}>
                <TimelineCard projectId={projectId}/>
                <Stack spacing={2}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" align="center" fontWeight="bold">Client</Typography>
                            <Typography variant="h6">Last
                                Count: {clientDecodedData[clientDecodedData.length - 1]?.y ?? 0}</Typography>
                            <Typography variant="h6">Last
                                Date: {new Date(clientDecodedData[clientDecodedData.length - 1]?.x).toLocaleString()}</Typography>
                            <Typography variant="h6">Peak Count: {findMaxClientX()?.y ?? 0}</Typography>
                            <Typography variant="h6">Peak
                                Date: {new Date(findMaxClientX()?.x).toLocaleString()}</Typography>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" align="center" fontWeight="bold">Server</Typography>
                            <Typography variant="h6">Last
                                Count: {serverDecodedData[serverDecodedData.length - 1]?.y ?? 0}</Typography>
                            <Typography variant="h6">Last
                                Date: {new Date(serverDecodedData[serverDecodedData.length - 1]?.x).toLocaleString()}</Typography>
                            <Typography variant="h6">Peak Count: {findMaxServerX()?.y ?? 0}</Typography>
                            <Typography variant="h6">Peak
                                Date: {new Date(findMaxServerX()?.x).toLocaleString()}</Typography>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" align="center" fontWeight="bold">Mixed</Typography>
                            <Typography variant="h6">Last
                                Count: {mergedDecodedData[mergedDecodedData.length - 1]?.y ?? 0}</Typography>
                            <Typography variant="h6">Last
                                Date: {new Date(mergedDecodedData[mergedDecodedData.length - 1]?.x).toLocaleString()}</Typography>
                            <Typography variant="h6">Peak Count: {findMaxMixedX()?.y ?? 0}</Typography>
                            <Typography variant="h6">Peak
                                Date: {new Date(findMaxMixedX()?.x).toLocaleString()}</Typography>
                        </CardContent>
                    </Card>
                </Stack>
            </Stack>
            <Box sx={{borderBottom: 1, borderColor: "divider"}}>
                <Tabs value={tab} onChange={(_, newValue) => setTab(newValue)} variant="fullWidth">
                    <Tab label="Client" disabled={clientNotExist}/>
                    <Tab label="Mixed"/>
                    <Tab label="Server" disabled={serverNotExist}/>
                </Tabs>
            </Box>
            <ChartsTab value={tab} clientPieData={clientPieData} serverPieData={serverPieData}/>
            {isAuthorized && <Fab color="primary" sx={{position: "fixed", bottom: 16, right: 16}} onClick={() =>
                isProjectFavorite ? removeProjectFromFavorite.mutate((projectId), {
                    onSuccess: () => setProjectFavorite(userFavoriteData?.some(project => project.id === projectId)),
                    onError: (error) => enqueueSnackbar(error.message, {variant: "error"})
                }) : addProjectToFavorite.mutate((projectId), {
                    onSuccess: () => setProjectFavorite(userFavoriteData?.some(project => project.id === projectId)),
                    onError: (error) => enqueueSnackbar(error.message, {variant: "error"})
                })}>
                {(addProjectToFavorite.isPending || removeProjectFromFavorite.isPending) ?
                    <CircularProgress color="inherit"/> : isProjectFavorite ? <Remove/> : <Favorite/>}
            </Fab>}
        </Stack>
    )
}

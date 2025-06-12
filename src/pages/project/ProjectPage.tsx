import {Favorite, Remove, Warning} from "@mui/icons-material";
import {
    Alert,
    Box,
    CircularProgress,
    Fab,
    Grid,
    Stack,
    Tab,
    Tabs,
    Tooltip,
    Typography
} from "@mui/material";
import { t as tc} from "i18next";
import {useSnackbar} from "notistack";
import {useEffect, useMemo, useState} from "react";
import {useTranslation} from "react-i18next";
import {useNavigate, useParams} from "react-router-dom";

import {Loader} from "@components/Loader";
import {useAuth} from "@hooks/useAuth";
import {useLabel} from "@hooks/useLabel";
import {useSettings} from "@hooks/useSettings";
import TimelineCard from "@pages/project/components/card/TimelineCard";
import {ChartsTab} from "@pages/project/components/ChartsTab";
import {getTranslateKey} from "@services/fstats/i18n/serverMessages";
import {useLineMetricMutation, usePieMetric} from "@services/fstats/metrics";
import {useAddProjectToFavorite, useProject, useRemoveProjectFromFavorite} from "@services/fstats/projects";
import {User} from "@services/fstats/types";
import {useUserFavorites} from "@services/fstats/users";
import {getUserFromJWT} from "@utils/decoders/jwt";
import {decodeLineMetric} from "@utils/decoders/line";
import {mergeData} from "@utils/merge";

import {MetricTab, TimelineData} from "./components/types";

export function ProjectPage() {

    const {t} = useTranslation("project");

    const navigate = useNavigate();
    const id = useParams().id!;

    const projectId = Number.parseInt(id ?? navigate("projects"));
    const {enqueueSnackbar} = useSnackbar();

    const {isAuthorized, token} = useAuth();
    const user: User = getUserFromJWT(token);

    const {data: projectData} = useProject(projectId);

    const {
        data: serverData,
        status: serverStatus,
        error: serverError
    } = useLineMetricMutation(projectId, 0, "all", true);
    const {
        data: clientData,
        status: clientStatus,
        error: clientError
    } = useLineMetricMutation(projectId, 0, "all", false);

    const {data: serverPieData, status: serverPieStatus, error: serverPieError} = usePieMetric(projectId, true);
    const {data: clientPieData, status: clientPieStatus, error: clientPieError} = usePieMetric(projectId, false);

    const {data: rawUserFavorites} = useUserFavorites(user.id || NaN, token);
    const userFavoriteData = useMemo(() => rawUserFavorites ?? [], [rawUserFavorites]);

    const addProjectToFavorite = useAddProjectToFavorite();
    const removeProjectFromFavorite = useRemoveProjectFromFavorite();

    const [isProjectFavorite, setProjectFavorite] = useState(false);
    const [tab, setTab] = useState(MetricTab.Mixed);

    const clientNotExist = Object.entries(clientPieData?.mod_version ?? 0).length <= 0;
    const serverNotExist = Object.entries(serverPieData?.mod_version ?? 0).length <= 0;

    const {setLabel} = useLabel();
    const {colors} = useSettings();

    useEffect(() => {
        if (projectId <= 0) return navigate("projects");
    }, [navigate, projectId]);

    useEffect(() => {
        if (clientNotExist && serverNotExist) setTab(MetricTab.Mixed);
        else if (clientNotExist) setTab(MetricTab.Server);
        else if (serverNotExist) setTab(MetricTab.Client);
    }, [projectId, clientNotExist, serverNotExist, setLabel, projectData?.name]);

    useEffect(() => setLabel(projectData?.name ?? ""), [projectData?.name, setLabel]);

    useEffect(() => {
        setProjectFavorite(userFavoriteData?.some(project => project.id === projectId));
        return () => setProjectFavorite(userFavoriteData?.some(project => project.id === projectId));
    }, [userFavoriteData, projectId]);

    if (serverStatus === "pending" || clientStatus === "pending" || serverPieStatus === "pending" || clientPieStatus === "pending")
        return (<Loader/>);

    if (serverStatus === "error" || clientStatus === "error" || serverPieStatus === "error" || clientPieStatus === "error") {
        if (serverError) enqueueSnackbar(getTranslateKey(serverError?.message), {variant: "error"});
        if (clientError) enqueueSnackbar(getTranslateKey(clientError?.message), {variant: "error"});
        if (serverPieError) enqueueSnackbar(getTranslateKey(serverPieError?.message), {variant: "error"});
        if (clientPieError) enqueueSnackbar(getTranslateKey(clientPieError?.message), {variant: "error"});
        navigate("/not-found");
        return <></>;
    }

    const serverDecodedData = decodeLineMetric(serverData);
    const clientDecodedData = decodeLineMetric(clientData);
    const mergedDecodedData = mergeData(clientDecodedData, serverDecodedData);

    const findMaxClientX = (): TimelineData => clientDecodedData
        .slice(1)
        .reduce((max, item) => (item.y > max.y ? item : max), clientDecodedData[0]);
    const findMaxServerX = (): TimelineData => serverDecodedData
        .slice(1)
        .reduce((max, item) => (item.y > max.y ? item : max), serverDecodedData[0]);
    const findMaxMixedX = (): TimelineData => mergedDecodedData
        .slice(1)
        .reduce((max, item) => (item.y > max.y ? item : max), mergedDecodedData[0]);

    return (
        <Stack spacing={2}>
            {projectData && projectData.is_hidden && <Alert variant="outlined" color="warning" icon={<Warning/>}>
                {projectData.hiding_reason}
            </Alert>}
            <Grid container spacing={2} direction="row" justifyContent="space-evenly">
                <Tooltip title={t("peek") + `: ${new Date(findMaxClientX()?.x).toLocaleString()}`}>
                    <Stack direction="row" spacing={1}>
                        <Box sx={{
                            backgroundColor: colors[1].color,
                            height: 24,
                            width: 24,
                            borderRadius: 1,
                            border: 1,
                            borderColor: "divider"
                        }}/>
                        <Typography variant="button">
                            {tc("chart.client")} {clientDecodedData[clientDecodedData.length - 1]?.y ?? 0} / {findMaxClientX()?.y ?? 0}
                        </Typography>
                    </Stack>
                </Tooltip>
                <Tooltip title={t("peek") + `: ${new Date(findMaxMixedX()?.x).toLocaleString()}`}>
                    <Stack direction="row" spacing={1}>
                        <Box sx={{
                            backgroundColor: colors[2].color,
                            height: 24,
                            width: 24,
                            borderRadius: 1,
                            border: 1,
                            borderColor: "divider"
                        }}/>
                        <Typography variant="button">
                            {tc("chart.mixed")} {mergedDecodedData[serverDecodedData.length - 1]?.y ?? 0} / {findMaxMixedX()?.y ?? 0}
                        </Typography>
                    </Stack>
                </Tooltip>
                <Tooltip title={t("peek") + `: ${new Date(findMaxServerX()?.x).toLocaleString()}`}>
                    <Stack direction="row" spacing={1}>
                        <Box sx={{
                            backgroundColor: colors[0].color,
                            height: 24,
                            width: 24,
                            borderRadius: 1,
                            border: 1,
                            borderColor: "divider"
                        }}/>
                        <Typography variant="button">
                            {tc("chart.server")} {serverDecodedData[serverDecodedData.length - 1]?.y ?? 0} / {findMaxServerX()?.y ?? 0}
                        </Typography>
                    </Stack>
                </Tooltip>
            </Grid>
            <TimelineCard projectId={projectId}/>
            <Box sx={{borderBottom: 1, borderColor: "divider"}}>
                <Tabs value={tab} onChange={(_, newValue) => setTab(newValue)} variant="fullWidth">
                    <Tab label={tc("chart.client")} disabled={clientNotExist}/>
                    <Tab label={tc("chart.mixed")}/>
                    <Tab label={tc("chart.server")} disabled={serverNotExist}/>
                </Tabs>
            </Box>
            <ChartsTab value={tab} clientPieData={clientPieData} serverPieData={serverPieData}/>
            {isAuthorized && <Fab color="primary" sx={{position: "fixed", bottom: 16, right: 16}} onClick={() =>
                isProjectFavorite ? removeProjectFromFavorite.mutate((projectId), {
                    onSuccess: () => setProjectFavorite(userFavoriteData?.some(project => project.id === projectId)),
                    onError: (error) => enqueueSnackbar(getTranslateKey(error.message), {variant: "error"})
                }) : addProjectToFavorite.mutate((projectId), {
                    onSuccess: () => setProjectFavorite(userFavoriteData?.some(project => project.id === projectId)),
                    onError: (error) => enqueueSnackbar(getTranslateKey(error.message), {variant: "error"})
                })}>
                {(addProjectToFavorite.isPending || removeProjectFromFavorite.isPending) ?
                    <CircularProgress color="inherit"/> : isProjectFavorite ? <Remove/> : <Favorite/>}
            </Fab>}
        </Stack>
    );
}

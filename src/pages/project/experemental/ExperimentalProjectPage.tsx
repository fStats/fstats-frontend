import {useEffect, useState} from "react";
import {Alert, Box, Card, CardContent, Stack, Tab, Tabs, Typography} from "@mui/material";
import TimelineCard from "../components/card/TimelineCard.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {useLineMetricMutation, usePieMetric} from "../../../services/metrics.ts";
import {useSnackbar} from "notistack";
import {decodeLineMetric} from "../../../mics/decoder/line.ts";
import {Loader} from "../../../components/Loader.tsx";
import {mergeData} from "../../../mics/merge.ts";
import {ChartsTab} from "./ChartsTab.tsx";
import {MetricTab, TimelineData} from "./types.ts";
import {useLabel} from "../../../hooks/useLabel.tsx";
import {useProject} from "../../../services/projects.ts";
import {Warning} from "@mui/icons-material";

export function ExperimentalProjectPage() {

    const projectId = Number.parseInt(useParams().id!!)

    const navigate = useNavigate()
    const {enqueueSnackbar} = useSnackbar();

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

    const [tab, setTab] = useState(MetricTab.Mixed)

    const clientNotExist = Object.entries(clientPieData?.mod_version ?? 0).length <= 0
    const serverNotExist = Object.entries(serverPieData?.mod_version ?? 0).length <= 0

    const {setLabel} = useLabel()

    useEffect(() => {
        if (clientNotExist && serverNotExist) setTab(MetricTab.Mixed)
        else if (clientNotExist) setTab(MetricTab.Server)
        else if (serverNotExist) setTab(MetricTab.Client)
        setLabel(projectData?.name ?? "")
    }, [projectId, clientNotExist, serverNotExist]);

    if (serverStatus === "loading" || clientStatus === "loading" || serverPieStatus === "loading" || clientPieStatus === "loading") return (
        <Loader/>)

    if (serverStatus === "error" || clientStatus === "error" || serverPieStatus === "error" || clientPieStatus === "error") {
        serverError && enqueueSnackbar(serverError?.message, {variant: "error"})
        clientError && enqueueSnackbar(clientError?.message, {variant: "error"})
        serverPieError && enqueueSnackbar(serverPieError?.message, {variant: "error"})
        clientPieError && enqueueSnackbar(clientPieError?.message, {variant: "error"})
        navigate('/not-found')
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
            {projectData && !projectData.is_visible &&
                <Alert variant="outlined" color="warning" icon={<Warning/>}>Your project is hidded. Please rename or
                    delete project!</Alert>}
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
            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                <Tabs value={tab} onChange={(_, newValue) => setTab(newValue)} variant="fullWidth">
                    <Tab label="Client" disabled={clientNotExist}/>
                    <Tab label="Mixed"/>
                    <Tab label="Server" disabled={serverNotExist}/>
                </Tabs>
            </Box>
            <ChartsTab value={tab} clientPieData={clientPieData} serverPieData={serverPieData}/>
        </Stack>
    )
}
import {Card, CardContent, Stack, Typography} from "@mui/material";
import TimelineCard from "../components/card/TimelineCard.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {useLineMetricMutation, usePieMetric} from "../../../services/metrics.ts";
import {useSnackbar} from "notistack";
import {TimelineData} from "../components/types.ts";
import {decodeLineMetric} from "../../../mics/decoder/line.ts";
import {WorldMapCard} from "../components/card/WorldMapCard.tsx";
import {Loader} from "../../../components/Loader.tsx";
import {Bar} from "react-chartjs-2";
import {DataValue} from "../../../services/types.ts";
import {colors} from "../components/colors.ts";
import MetricCard from "../components/card/MetricCard.tsx";
import {formatOnlineMode} from "../../../mics/formatter/onlineMode.ts";
import {formatOperationSystem} from "../../../mics/formatter/operationSystem.ts";

interface GroupedDataValue {
    [group: string]: DataValue;
}

export function ExperimentalProjectPage() {

    const projectId = Number.parseInt(useParams().id!!)

    const navigate = useNavigate()
    const {enqueueSnackbar} = useSnackbar();

    const {data, status, error} = useLineMetricMutation(projectId, 0, "all")
    const {data: pieData, status: pieStatus} = usePieMetric(projectId)
    const decodedData = decodeLineMetric(data)

    if (status === "loading" || pieStatus === "loading") return (<Loader/>)

    if (status === "error" || pieStatus === "error") {
        error && enqueueSnackbar(error?.message, {variant: "error"})
        navigate('/not-found')
        return <></>
    }

    const findMaxX = (): TimelineData => decodedData.slice(1).reduce((max, item) => (item.y > max.y ? item : max), decodedData[0])

    const groupByFirstTwoElements = (data: DataValue): GroupedDataValue => Object.entries(data).sort().reduce((acc, [key, value]) => {
        const groupKey = key.split('.').slice(0, 2).join('.');
        if (!acc[groupKey]) acc[groupKey] = {};
        acc[groupKey][key] = value;
        return acc;
    }, {} as GroupedDataValue);

    const groupedData: GroupedDataValue = groupByFirstTwoElements(pieData.fabric_api_version);

    const labels = Object.keys(groupedData);
    const versionKeys = new Set<string>();
    labels.forEach(label => {
        Object.keys(groupedData[label]).forEach(version => {
            versionKeys.add(version);
        });
    });

    return (
        <Stack spacing={2}>
            <Stack direction="row" spacing={2}>
                <TimelineCard projectId={projectId}/>
                <Stack spacing={2}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" align="center" fontWeight="bold">Client</Typography>
                            <Typography variant="h6">Peak Count: {findMaxX()?.y}</Typography>
                            <Typography variant="h6">Peak Date: {new Date(findMaxX()?.x).toLocaleString()}</Typography>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" align="center" fontWeight="bold">Server</Typography>
                            <Typography variant="h6">Peak Count: {findMaxX()?.y}</Typography>
                            <Typography variant="h6">Peak Date: {new Date(findMaxX()?.x).toLocaleString()}</Typography>
                        </CardContent>
                    </Card>
                </Stack>
            </Stack>
            <Stack direction="row" spacing={2}>
                <Stack sx={{flexGrow: 1}} spacing={2}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" align="center">Fabric API</Typography>
                            <Bar data={{
                                labels: labels,
                                datasets: Array.from(versionKeys).map((version, index) => ({
                                    label: version,
                                    data: labels.map(label => groupedData[label][version] || 0),
                                    backgroundColor: colors[index % colors.length]
                                }))
                            }} options={{
                                plugins: {
                                    datalabels: {
                                        display: false
                                    },
                                    zoom: {
                                        zoom: {
                                            wheel: {enabled: true},
                                            drag: {
                                                enabled: true,
                                            },
                                            mode: "y",
                                        }
                                    }
                                },
                                indexAxis: 'y',
                                scales: {
                                    x: {
                                        stacked: true
                                    },
                                    y: {
                                        stacked: true,
                                    }
                                }
                            }}/>
                        </CardContent>
                    </Card>
                    <WorldMapCard title="Location" metric={pieData.location ?? []}/>
                </Stack>
                <Stack spacing={2}>
                    <Stack direction="row" spacing={2}>
                        <MetricCard title="Minecraft Version" metric={pieData.minecraft_version ?? []}/>
                        <MetricCard title="Online Mode" metric={formatOnlineMode(pieData.online_mode ?? [])}/>
                    </Stack>
                    <Stack direction="row" spacing={2}>
                        <MetricCard title="Mod Version" metric={pieData.mod_version ?? []}/>
                        <MetricCard title="Operation System" metric={formatOperationSystem(pieData.os ?? [])}/>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    )
}
import {
    Card,
    CardActions,
    CardContent,
    FormControl,
    MenuItem,
    Select,
    SelectChangeEvent,
    Typography
} from "@mui/material";
import {useSnackbar} from "notistack";
import {useState} from "react";
import {Line} from "react-chartjs-2";
import {useNavigate} from "react-router-dom";

import {useSettings} from "@hooks/useSettings";
import {useLineMetricMutation} from "@services/metrics";
import {decodeLineMetric} from "@utils/decoders/line";
import {mergeData} from "@utils/merge";

import {TimelineCardProps} from "./types";

import "chartjs-adapter-date-fns";

export type Mode = "week" | "month" | "quarter" | "all";

export default function TimelineCard(props: TimelineCardProps) {

    const navigate = useNavigate()
    const {enqueueSnackbar} = useSnackbar();
    const {colors} = useSettings()

    const [mode, setMode] = useState<Mode>("month")

    const {
        data: serverData,
        status: serverStatus,
        error: serverError
    } = useLineMetricMutation(props.projectId, getTimestamp(mode), mode, true)
    const {
        data: clientData,
        status: clientStatus,
        error: clientError
    } = useLineMetricMutation(props.projectId, getTimestamp(mode), mode, false)

    const serverDecodedData = decodeLineMetric(serverData)
    const clientDecodedData = decodeLineMetric(clientData)

    const mergedDecodedData = mergeData(clientDecodedData, serverDecodedData)

    if (serverStatus === "error" || clientStatus === "error") {
        if (serverError) enqueueSnackbar(serverError?.message, {variant: "error"})
        if (clientError) enqueueSnackbar(clientError?.message, {variant: "error"})
        navigate("/not-found")
        return <></>
    }

    return (
        <Card sx={{flexGrow: 1}}>
            <CardActions sx={{paddingX: 2}}>
                <Typography variant="h6" marginRight="auto" textAlign="center">Online</Typography>
                <FormControl>
                    <Select variant="standard" value={mode}
                            onChange={(event: SelectChangeEvent<Mode>) => setMode(event.target.value as Mode)}>
                        <MenuItem value="week">Last week</MenuItem>
                        <MenuItem value="month">Last month</MenuItem>
                        <MenuItem value="quarter">Last quarter</MenuItem>
                        <MenuItem value="all">All</MenuItem>
                    </Select>
                </FormControl>
            </CardActions>
            <CardContent>
                <Line data={{
                    datasets: [
                        {
                            data: serverDecodedData,
                            label: "Server",
                            borderColor: colors[0],
                            backgroundColor: colors[0],
                            pointStyle: false,
                            spanGaps: 1800000,
                            parsing: false
                        },
                        {
                            data: clientDecodedData,
                            label: "Client",
                            borderColor: colors[1],
                            backgroundColor: colors[1],
                            pointStyle: false,
                            spanGaps: 1800000,
                            parsing: false
                        },
                        {
                            data: mergedDecodedData,
                            label: "Mixed",
                            borderColor: colors[2],
                            backgroundColor: colors[2],
                            pointStyle: false,
                            spanGaps: 1800000,
                            parsing: false
                        }
                    ],
                }} options={{
                    interaction: {
                        mode: "nearest",
                        axis: "x",
                        intersect: false
                    },
                    plugins: {
                        legend: {
                            display: true,
                            position: "bottom",
                            labels: {
                                usePointStyle: true,
                                pointStyle: "circle",
                            }
                        },
                        decimation: {
                            enabled: true
                        },
                        datalabels: {
                            display: false
                        },
                        zoom: {
                            limits: {
                                x: {
                                    max: Date.now(),
                                    minRange: 14400000,
                                    min: Math.min(...mergedDecodedData.map(value => value.x))
                                }
                            },
                            zoom: {
                                wheel: {enabled: true},
                                drag: {
                                    enabled: true,
                                },
                                mode: "x",
                            }
                        }
                    },
                    scales: {
                        x: {
                            type: "time",
                            time: {
                                minUnit: "hour",
                            },
                            max: Date.now(),
                        },
                        y: {
                            type: "linear",
                            ticks: {
                                precision: 0
                            },
                            min: 0
                        }
                    },
                    transitions: {
                        zoom: {
                            animation: {
                                duration: 0
                            }
                        }
                    }
                }}/>
            </CardContent>
        </Card>
    )
}

const getTimestamp = (mode: Mode): number => {
    const now = new Date();
    now.setMinutes(now.getMinutes() < 30 ? 0 : 30, 0, 0);

    switch (mode) {
        case "week":
            now.setDate(now.getDate() - 7);
            return now.getTime();
        case "month":
            now.setMonth(now.getMonth() - 1);
            return now.getTime();
        case "quarter":
            now.setMonth(now.getMonth() - 3);
            return now.getTime();
        case "all":
            return 0
    }
}

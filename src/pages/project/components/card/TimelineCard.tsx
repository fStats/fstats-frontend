import {
    Button,
    ButtonGroup,
    Card,
    CardActions,
    CardContent,
    Paper,
    Typography, useMediaQuery,
    useTheme
} from "@mui/material";
import {useSnackbar} from "notistack";
import {useState} from "react";
import {Line} from "react-chartjs-2";
import {useNavigate} from "react-router-dom";

import {useSettings} from "@hooks/useSettings";
import {useLineMetricMutation} from "@services/fstats/metrics";
import {getTimestamp} from "@utils/convertors/timestamp";
import {decodeLineMetric} from "@utils/decoders/line";
import {mergeData} from "@utils/merge";

import {Mode, TimelineCardProps} from "./types";

import "chartjs-adapter-date-fns";

export default function TimelineCard(props: TimelineCardProps) {

    const navigate = useNavigate();
    const {enqueueSnackbar} = useSnackbar();
    const {colors} = useSettings();

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const aspectRatio = isSmallScreen ? 2 : 4;

    const [mode, setMode] = useState<Mode>("month");

    const {
        data: serverData,
        status: serverStatus,
        error: serverError
    } = useLineMetricMutation(props.projectId, getTimestamp(mode), mode, true);
    const {
        data: clientData,
        status: clientStatus,
        error: clientError
    } = useLineMetricMutation(props.projectId, getTimestamp(mode), mode, false);

    const serverDecodedData = decodeLineMetric(serverData);
    const clientDecodedData = decodeLineMetric(clientData);

    const mergedDecodedData = mergeData(clientDecodedData, serverDecodedData);

    if (serverStatus === "error" || clientStatus === "error") {
        if (serverError) enqueueSnackbar(serverError?.message, {variant: "error"});
        if (clientError) enqueueSnackbar(clientError?.message, {variant: "error"});
        navigate("/not-found");
        return <></>;
    }

    return (
        <Card sx={{flexGrow: 1}}>
            <CardActions sx={{paddingX: 2}}>
                <Typography variant="h6" marginRight="auto" textAlign="center">Online</Typography>
                <Paper variant="outlined">
                    <ButtonGroup size={isSmallScreen ? "small" : "medium"} onClick={(event) => setMode((event.target as HTMLButtonElement).value as Mode)}>
                        <Button variant={mode === "week" ? "contained" : "outlined"} value="week">Week</Button>
                        <Button variant={mode === "month" ? "contained" : "outlined"} value="month">Month</Button>
                        <Button variant={mode === "quarter" ? "contained" : "outlined"} value="quarter">Quarter</Button>
                        <Button variant={mode === "all" ? "contained" : "outlined"} value="all">All</Button>
                    </ButtonGroup>
                </Paper>
            </CardActions>
            <CardContent>
                <Line data={{
                    datasets: [
                        {
                            data: serverDecodedData,
                            label: "Server",
                            borderColor: colors[0].color,
                            backgroundColor: colors[0].color,
                            pointStyle: false,
                            spanGaps: 1800000,
                            parsing: false
                        },
                        {
                            data: clientDecodedData,
                            label: "Client",
                            borderColor: colors[1].color,
                            backgroundColor: colors[1].color,
                            pointStyle: false,
                            spanGaps: 1800000,
                            parsing: false
                        },
                        {
                            data: mergedDecodedData,
                            label: "Mixed",
                            borderColor: colors[2].color,
                            backgroundColor: colors[2].color,
                            pointStyle: false,
                            spanGaps: 1800000,
                            parsing: false
                        }
                    ],
                }} options={{
                    responsive: true,
                    aspectRatio: aspectRatio,
                    interaction: {
                        mode: "nearest",
                        axis: "x",
                        intersect: false
                    },
                    plugins: {
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
    );
}
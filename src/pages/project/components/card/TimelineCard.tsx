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
import { t as tc } from "i18next";
import {useSnackbar} from "notistack";
import {useState} from "react";
import {Line} from "react-chartjs-2";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";

import {useSettings} from "@hooks/useSettings";
import {getTranslateKey} from "@services/fstats/i18n/serverMessages";
import {useLineMetricMutation} from "@services/fstats/metrics";
import {getTimestamp} from "@utils/convertors/timestamp";
import {decodeLineMetric} from "@utils/decoders/line";
import {mergeData} from "@utils/merge";

import {Mode, TimelineCardProps} from "./types";

import "chartjs-adapter-date-fns";

export default function TimelineCard(props: TimelineCardProps) {

    const {t} = useTranslation("project");
    
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
        if (serverError) enqueueSnackbar(getTranslateKey(serverError?.message), {variant: "error"});
        if (clientError) enqueueSnackbar(getTranslateKey(clientError?.message), {variant: "error"});
        navigate("/not-found");
        return <></>;
    }

    return (
        <Card sx={{flexGrow: 1}}>
            <CardActions sx={{paddingX: 2}}>
                <Typography variant="h6" marginRight="auto" textAlign="center">
                    {t("cards.timeline")}
                </Typography>
                <Paper variant="outlined">
                    <ButtonGroup size={isSmallScreen ? "small" : "medium"} onClick={(event) => setMode((event.target as HTMLButtonElement).value as Mode)}>
                        <Button variant={mode === "week" ? "contained" : "outlined"} value="week">{t("time.week")}</Button>
                        <Button variant={mode === "month" ? "contained" : "outlined"} value="month">{t("time.month")}</Button>
                        <Button variant={mode === "quarter" ? "contained" : "outlined"} value="quarter">{t("time.quarter")}</Button>
                        <Button variant={mode === "all" ? "contained" : "outlined"} value="all">{t("time.all")}</Button>
                    </ButtonGroup>
                </Paper>
            </CardActions>
            <CardContent>
                <Line data={{
                    datasets: [
                        {
                            data: serverDecodedData,
                            label: tc("chart.server"),
                            borderColor: colors[0].color,
                            backgroundColor: colors[0].color,
                            pointStyle: false,
                            spanGaps: 1800000,
                            parsing: false
                        },
                        {
                            data: clientDecodedData,
                            label: tc("chart.client"),
                            borderColor: colors[1].color,
                            backgroundColor: colors[1].color,
                            pointStyle: false,
                            spanGaps: 1800000,
                            parsing: false
                        },
                        {
                            data: mergedDecodedData,
                            label: tc("chart.mixed"),
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
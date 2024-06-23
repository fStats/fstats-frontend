import {Button, Card, CardActions, CardContent, Typography} from "@mui/material";
import {Line} from "react-chartjs-2";
import {colors} from "./colors";
import {LineMetric} from "../../../services/types";
import {TimelineData} from "./types.ts";
import {useLineMetricMutation} from "../../../services/metrics.ts";
import {useNavigate} from "react-router-dom";
import {useSnackbar} from "notistack";
import {useEffect, useState} from "react";
import "chartjs-adapter-date-fns";

export default function TimelineCard(props: { projectId: number }) {

    const navigate = useNavigate()
    const {enqueueSnackbar} = useSnackbar();

    const [limit, setLimit] = useState<number>(0)

    const lineMetricMutation = useLineMetricMutation(props.projectId)

    useEffect(() => {
        const offset = offsetDate("month")
        lineMetricMutation.mutate(offset)
        setLimit(offset * 1000)
    }, [props.projectId]);

    // if (lineMetricMutation.status === "loading") return (<Loader/>)

    if (lineMetricMutation.status === "error") {
        lineMetricMutation.error && enqueueSnackbar(lineMetricMutation.error?.message, {variant: "error"})
        navigate('/not-found')
        return <></>
    }

    return (
        <Card>
            <CardActions>
                <Typography variant="h6" paddingLeft={1} marginRight="auto">Servers online</Typography>
                <Button variant="outlined" onClick={() => {
                    const offset = offsetDate("week")
                    lineMetricMutation.mutate(offset)
                    setLimit(offset * 1000)
                }}>
                    <Typography variant="body2">
                        Last Week
                    </Typography>
                </Button>
                <Button variant="outlined" onClick={() => {
                    const offset = offsetDate("month")
                    lineMetricMutation.mutate(offset)
                    setLimit(offset * 1000)
                }}>
                    <Typography variant="body2">
                        Last Month
                    </Typography>
                </Button>
                <Button variant="outlined" onClick={() => {
                    const offset = offsetDate("quarter")
                    lineMetricMutation.mutate(offset)
                    setLimit(offset * 1000)
                }}>
                    <Typography variant="body2">
                        Last Quarter
                    </Typography>
                </Button>
                <Button variant="outlined" onClick={() => {
                    lineMetricMutation.mutate(undefined)
                    setLimit(Date.now())
                }}>
                    <Typography variant="body2">
                        All
                    </Typography>
                </Button>
            </CardActions>
            <CardContent>
                <Line style={{height: 300}} data={{
                    datasets: [
                        {
                            data: decodeLineMetric(lineMetricMutation.data),
                            borderColor: colors[0],
                            backgroundColor: colors[0],
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
                    maintainAspectRatio: false,
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
                                    min: limit
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
                            type: 'linear',
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

function offsetDate(type: "week" | "month" | "quarter"): number {
    const currentDate = new Date(Date.now());
    switch (type) {
        case "week":
            currentDate.setDate(currentDate.getDate() - 7);
            break;
        case "month":
            currentDate.setMonth(currentDate.getMonth() - 1);
            break;
        case "quarter":
            currentDate.setMonth(currentDate.getMonth() - 3);
            break;
    }
    return Number.parseInt((currentDate.getTime() / 1000).toFixed())
}

function decodeLineMetric(encoded: LineMetric | undefined): TimelineData[] {
    if (encoded === undefined) return []

    let prevTimestamp = 0;
    let prevCount = 0;

    return encoded.timestamps.map((deltaTimestamp, index) => {
        prevTimestamp += deltaTimestamp;
        prevCount += encoded.counts[index];
        return {x: prevTimestamp * 1000, y: prevCount};
    });
}
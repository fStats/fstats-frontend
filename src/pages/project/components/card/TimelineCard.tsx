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
import {Line} from "react-chartjs-2";
import {colors} from "../colors.ts";
import {useLineMetricMutation} from "../../../../services/metrics.ts";
import {useNavigate} from "react-router-dom";
import {useSnackbar} from "notistack";
import {useState} from "react";
import {decodeLineMetric} from "../../../../mics/decoder/line.ts";
import {TimelineCardProps} from "./types.ts";
import "chartjs-adapter-date-fns";

export type Mode = "week" | "month" | "quarter" | "all";

export default function TimelineCard(props: TimelineCardProps) {

    const navigate = useNavigate()
    const {enqueueSnackbar} = useSnackbar();

    const [mode, setMode] = useState<Mode>("month")

    const {data, status, error} = useLineMetricMutation(props.projectId, getTimestamp(mode), mode)

    const decodedData = decodeLineMetric(data)

    if (status === "error") {
        error && enqueueSnackbar(error?.message, {variant: "error"})
        navigate('/not-found')
        return <></>
    }

    return (
        <Card sx={{flexGrow: 1}}>
            <CardActions sx={{paddingX: 2}}>
                <Typography variant="h6" marginRight="auto">Servers online</Typography>
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
                <Line style={{height: 300}} data={{
                    datasets: [
                        {
                            data: decodedData,
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
                                    min: Math.min(...decodedData.map(value => value.x))
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
import {Card, CardContent} from "@mui/material";
import {Line} from "react-chartjs-2";
import {colors} from "./colors";
import {LineMetric} from "../../../services/types";
import "chartjs-adapter-date-fns";
import {TimelineData} from "./types.ts";

export default function TimelineCard(props: { data: LineMetric }) {
    return (
        <Card>
            <CardContent>
                <Line style={{height: 300}} data={{
                    datasets: [
                        {
                            data: decodeLineMetric(props.data),
                            borderColor: colors[0],
                            backgroundColor: colors[0],
                            pointStyle: false,
                            spanGaps: 1000 * 60 * 30,
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
                                    minRange: 1000 * 60 * 60 * 4,
                                    min: 0
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

function decodeLineMetric(encoded: LineMetric): TimelineData[] {
    let prevTimestamp = 0;
    let prevCount = 0;

    return encoded.timestamps.map((deltaTimestamp, index) => {
        prevTimestamp += deltaTimestamp;
        prevCount += encoded.counts[index];
        return {x: prevTimestamp * 1000, y: prevCount};
    });
}
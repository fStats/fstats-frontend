import {Card, CardContent} from "@mui/material";
import {Line} from "react-chartjs-2";
import {colors} from "./colors";
import React from "react";
import {DataValue} from "../../../services/types";
import "chartjs-adapter-date-fns";

export default function TimelineCard(props: { data: DataValue }) {

    console.log(Object.entries(props.data))

    const list = Object.entries(props.data).map((value) => ({
        x: new Date(value[0]).valueOf(),
        y: value[1]
    }))

    console.log(list)

    return (
        <Card>
            <CardContent>
                <Line style={{height: 300}} data={{
                    datasets: [
                        {
                            data: list,
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
                        datalabels: {display: false},
                        zoom: {
                            limits: {
                                x: {
                                    max: Date.now(),
                                    minRange: 1000 * 60 * 60 * 4,
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
                            type: "time"
                        },
                        y: {
                            type: 'linear',
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
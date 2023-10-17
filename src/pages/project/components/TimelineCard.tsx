import {Card, CardContent} from "@mui/material";
import {Line} from "react-chartjs-2";
import {colors} from "./colors";
import React from "react";

export default function TimelineCard(props: { data: string[] }) {
    return (
        <Card>
            <CardContent>
                <Line style={{height: 300}} data={{
                    labels: props.data.map((label) => new Date(label).toLocaleDateString()),
                    datasets: [
                        {
                            data: props.data.map(() => Math.random()),
                            borderColor: colors[0],
                            backgroundColor: colors[0],
                            pointStyle: false,
                            tension: 0.4
                        }
                    ],
                }} options={{
                    maintainAspectRatio: false,
                    plugins: {
                        tooltip: {
                            callbacks: {
                                title(tooltipItems): string | string[] | void {
                                    const newArray: string[] = []
                                    tooltipItems.forEach((tooltipItem) => {
                                        newArray.push(new Date(props.data[tooltipItem.dataIndex]).toLocaleString())
                                    })

                                    return newArray
                                }
                            }
                        },
                        datalabels: {
                            display: false,
                        },
                        zoom: {
                            limits: {
                                x: {
                                    min: 'original',
                                    max: 'original',
                                    minRange: 2
                                },
                            },
                            zoom: {
                                wheel: {
                                    enabled: true,
                                },
                                drag: {
                                    enabled: true,
                                },
                                mode: "x",
                            }
                        }
                    },
                    interaction: {
                        mode: "nearest",
                        axis: "x",
                        intersect: false
                    }
                }}/>
            </CardContent>
        </Card>
    )
}
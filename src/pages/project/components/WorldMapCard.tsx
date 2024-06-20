import {Chart} from 'react-chartjs-2';
import {CardProps} from "./types.ts";
import {Feature} from "chartjs-chart-geo";
import {Card, CardContent, Typography} from "@mui/material";
import {DataValue} from "../../../services/types.ts";
import {iso2code} from "../../../mics/countryConvert.ts";
import {useWorldMap} from "../../../services/worldatlas/worldMap.ts";

export function WorldMapCard(props: CardProps) {

    const {data, status} = useWorldMap()
    const metric = (Object.fromEntries(Object.entries(props.metric).map(([value, count]) => [iso2code[value], count])) as DataValue)

    const values = Object.values(metric);
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);

    const map = (value: number, min: number, max: number) => (value - min) / (max - min);

    return (
        status === "success" && <Card>
            <CardContent>
                <Typography variant="h6" textAlign="center">{props.title}</Typography>
                <Chart
                    type="choropleth"
                    data={{
                        labels: (data as Feature[]).map((d) => {
                            return d.properties.name;
                        }),
                        datasets: [{
                            data: (data as Feature[]).map((d) => ({feature: d, value: metric[d.id] ?? 0})),
                            backgroundColor: (ctx, _) =>
                                gradientColor(map((ctx.chart.data.datasets[0].data[ctx.dataIndex] as {
                                    value: number
                                })?.value, minValue, maxValue)),
                        }]
                    }}
                    options={{
                        plugins: {
                            datalabels: {
                                display: false
                            }
                        },
                        scales: {
                            projection: {
                                axis: 'x',
                                projection: 'equalEarth'
                            },
                            color: {
                                interpolate: (v) => gradientColor(v),
                                max: maxValue,
                                axis: "x",
                                ticks: {
                                    precision: 0,
                                    count: 5,
                                },
                                beginAtZero: true
                            }
                        }
                    }}
                />
            </CardContent>
        </Card>
    )
}

const gradientColor = (offset: number): string => {
    const r = Math.round(18 + 28 * offset);
    const g = Math.round(18 + 186 * offset);
    const b = Math.round(18 + 95 * offset);

    return `rgb(${r}, ${g}, ${b})`;
}
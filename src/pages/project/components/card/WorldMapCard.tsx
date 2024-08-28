import {Chart} from 'react-chartjs-2';
import {Feature} from "chartjs-chart-geo";
import {Card, CardContent, Typography} from "@mui/material";
import {DataValue} from "../../../../services/types.ts";
import {useWorldMap} from "../../../../services/worldatlas/worldMap.ts";
import {CardProps} from "./types.ts";
import {iso2code} from "../../../../mics/convertor/country.ts";
import {mergeClientAndServerData} from "../../../../mics/merge.ts";

export function WorldMapCard(props: CardProps) {

    const {data, status} = useWorldMap()

    const metric = Object.fromEntries(Object.entries(
        mergeClientAndServerData(props.clientMetric, props.serverMetric)
    ).map(([value, count]) => [iso2code[value], count])) as DataValue

    const values = Object.values(metric);
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);

    const gradientColor = (value: number, skipOffset: boolean): string => {
        const offset = skipOffset ? value : Math.max(0, Math.min(1, (value - minValue) / (maxValue - minValue)));
        return `rgb(${Math.round(5 + 28 * offset)}, ${Math.round(5 + 186 * offset)}, ${Math.round(5 + 95 * offset)})`;
    };

    return (
        status === "success" && <Card>
            <CardContent>
                <Typography variant="h6" textAlign="center">{props.title}</Typography>
                <Chart
                    type="choropleth"
                    data={{
                        labels: (data as Feature[]).map(d => d.properties.name),
                        datasets: [{
                            data: (data as Feature[]).map(d => ({feature: d, value: metric[d.id] ?? 0})),
                            backgroundColor: (ctx, _) =>
                                gradientColor((ctx.chart.data.datasets[0].data[ctx.dataIndex] as {
                                    value: number
                                })?.value, false)
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
                                interpolate: (v) => gradientColor(v, true),
                                max: maxValue,
                                axis: "x",
                                ticks: {
                                    precision: 0,
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
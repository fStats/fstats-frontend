import {Chart} from 'react-chartjs-2';
import {Topology} from 'topojson-specification';
import {CardProps} from "./types.ts";
import {Feature, topojson} from "chartjs-chart-geo";
import {FeatureCollection} from 'geojson';
import {Card, CardContent, Typography} from "@mui/material";
import {useQuery} from "@tanstack/react-query";
import {ApiMessage, DataValue} from "../../../services/types.ts";
import {iso2code} from "../../../mics/countryConvert.ts";

const useWorldMap = () => useQuery<Feature[], Error>({
    queryKey: ["worldMap"],
    queryFn: () => getWorldMap().then(data => (topojson.feature(data, data.objects.countries) as FeatureCollection).features)
})

export const getWorldMap = async (): Promise<Topology> => {
    const response = await fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json")

    if (response.status !== 200) throw new Error((await response.json() as ApiMessage).message)

    return await response.json() as Topology
}

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
                            label: 'Countries',
                            data: (data as Feature[]).map((d) => ({feature: d, value: metric[d.id] ?? 0})),
                            // TODO Replace with HSL
                            backgroundColor: (ctx, _) => `rgba(46, 204, 113, ${map((ctx.chart.data.datasets[0].data[ctx.dataIndex] as {
                                value: number
                            })?.value ?? 0, minValue, maxValue)})`
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
                                // TODO Replace with HSL
                                interpolate: (v) => `rgba(46, 204, 113, ${v}`,
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
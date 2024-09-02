import {Card, CardContent, Typography} from "@mui/material";
import {Bar} from "react-chartjs-2";
import {GroupedDataValue} from "../../experemental/types.ts";
import {mergeClientAndServerData} from "../../../../mics/merge.ts";
import {CardProps} from "./types.ts";
import {useSettings} from "../../../../hooks/useSettings.tsx";

export function BarCard(props: CardProps) {

    const {colors} = useSettings()

    const groupedData: GroupedDataValue = Object.entries(mergeClientAndServerData(props.clientMetric, props.serverMetric) ?? []).sort().reduce((acc, [key, value]) => {
        const groupKey = key.split('.').slice(0, 2).join('.');
        if (!acc[groupKey]) acc[groupKey] = {};
        acc[groupKey][key] = value;
        return acc;
    }, {} as GroupedDataValue)

    const labels = Object.keys(groupedData);
    const versionKeys = new Set<string>();

    labels.forEach(label => Object.keys(groupedData[label]).forEach(version => versionKeys.add(version)));

    return (
        <Card>
            <CardContent>
                <Typography variant="h6" align="center">{props.title}</Typography>
                <Bar data={{
                    labels: labels,
                    datasets: Array.from(versionKeys).map((version, index) => ({
                        label: version,
                        data: labels.map(label => groupedData[label][version] ?? 0),
                        backgroundColor: colors[index % colors.length]
                    }))
                }} options={{
                    plugins: {
                        datalabels: {
                            display: false
                        },
                        zoom: {
                            zoom: {
                                wheel: {
                                    enabled: true
                                },
                                drag: {
                                    enabled: true,
                                },
                                mode: "y",
                            }
                        }
                    },
                    indexAxis: 'y',
                    scales: {
                        x: {
                            stacked: true
                        },
                        y: {
                            stacked: true,
                        }
                    }
                }}/>
            </CardContent>
        </Card>
    )
}
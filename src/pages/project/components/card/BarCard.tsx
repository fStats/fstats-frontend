import {Card, CardContent, Typography} from "@mui/material";
import {Bar} from "react-chartjs-2";

import {useSettings} from "@hooks/useSettings";
import {groupDataValues} from "@utils/group";
import {GroupedDataValue} from "@utils/types";

import {CardProps} from "./types";

export function BarCard(props: CardProps) {

    const {colors} = useSettings()

    const groupedData: GroupedDataValue = groupDataValues(props.clientMetric, props.serverMetric);

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
                        backgroundColor: colors.map(({color}) => color)[index % colors.length]
                    }))
                }} options={{
                    plugins: {
                        legend: {
                            display: false,
                        },
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
                    indexAxis: "y",
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

import {Bar} from "react-chartjs-2";

import {useSettings} from "@hooks/useSettings";
import {groupDataValues} from "@utils/group";
import {GroupedDataValue} from "@utils/types";

import {PreviewProps} from "./types";

export function BarPreview({previewData}: PreviewProps) {

    const {colors} = useSettings();

    const groupedData: GroupedDataValue = groupDataValues(previewData, {});

    const labels = Object.keys(groupedData);
    const versionKeys = new Set<string>();

    labels.forEach(label => Object.keys(groupedData[label]).forEach(version => versionKeys.add(version)));

    return (
        <Bar
            data={{
                labels: labels,
                datasets: Array.from(versionKeys).map((version, index) => ({
                    label: version,
                    data: labels.map(label => groupedData[label][version] ?? 0),
                    backgroundColor: colors.map(({color}) => color)[index % colors.length]
                }))
            }}
            options={{
                responsive: true,
                aspectRatio: 2,
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
    );
}
import {t} from "i18next";
import { Line } from "react-chartjs-2";

import {useSettings} from "@hooks/useSettings";
import {linePreviewData} from "@utils/dummyData";
import {mergeData} from "@utils/merge";

export function LinePreview() {

    const {colors} = useSettings();

    const clientPreviewData = linePreviewData();
    const serverPreviewData = linePreviewData();
    const mergedPreviewData = mergeData(clientPreviewData, serverPreviewData);

    return (
        <Line
            data={{
                datasets: [
                    {
                        data: clientPreviewData,
                        label: t("page.chart.server"),
                        borderColor: colors[0].color,
                        backgroundColor: colors[0].color,
                        pointStyle: false,
                        spanGaps: 1800000,
                        parsing: false
                    },
                    {
                        data: serverPreviewData,
                        label: t("page.chart.client"),
                        borderColor: colors[1].color,
                        backgroundColor: colors[1].color,
                        pointStyle: false,
                        spanGaps: 1800000,
                        parsing: false
                    },
                    {
                        data: mergedPreviewData,
                        label: t("page.chart.mixed"),
                        borderColor: colors[2].color,
                        backgroundColor: colors[2].color,
                        pointStyle: false,
                        spanGaps: 1800000,
                        parsing: false
                    }
                ],
            }}
            options={{
                responsive: true,
                aspectRatio: 2,
                interaction: {
                    mode: "nearest",
                    axis: "x",
                    intersect: false
                },
                plugins: {
                    legend: {
                        display: true,
                        position: "bottom",
                        labels: {
                            usePointStyle: true,
                            pointStyle: "circle",
                        }
                    },
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
                                min: Math.min(...mergedPreviewData.map(value => value.x))
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
                        type: "linear",
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
    );
}
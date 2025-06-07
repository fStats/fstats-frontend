import {Feature} from "chartjs-chart-geo";
import {Chart} from "react-chartjs-2";

import {DataValue} from "@services/fstats/types";
import {useWorldMap} from "@services/worldatlas/worldMap";
import {getGradientColor} from "@utils/color";
import {iso2code} from "@utils/convertors/country";
import {mergeClientAndServerData} from "@utils/merge";

import {PreviewProps} from "./types";

export function WorldMapPreview({previewData}: PreviewProps) {

    const {data, status} = useWorldMap();

    const metric = Object.fromEntries(Object.entries(
        mergeClientAndServerData(previewData, {})
    ).map(([value, count]) => [iso2code[value], count])) as DataValue;

    const values = Object.values(metric);
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);

    return (
        status === "success" && <Chart
            type="choropleth"
            data={{
                labels: (data as Feature[]).map(d => d.properties.name),
                datasets: [{
                    data: (data as Feature[]).map(d => ({
                        feature: d,
                        value: metric[d.id] ?? 0
                    })),
                    backgroundColor: (ctx) =>
                        getGradientColor((ctx.chart.data.datasets[0].data[ctx.dataIndex] as {
                            value: number
                        })?.value, minValue, maxValue, false)
                }]
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
                    }
                },
                scales: {
                    projection: {
                        axis: "x",
                        projection: "equalEarth"
                    },
                    color: {
                        interpolate: (v) => getGradientColor(v, minValue, maxValue, true),
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
    );
}
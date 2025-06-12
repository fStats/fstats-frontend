import {t} from "i18next";
import {Pie} from "react-chartjs-2";

import {useSettings} from "@hooks/useSettings";

import {PreviewProps} from "./types";

export function PiePreview({previewData}: PreviewProps) {

    const {colors} = useSettings();

    return (
        <Pie
            data={{
                datasets: [{
                    label: t("chart.count"),
                    data: Object.values(previewData) as number[],
                    borderWidth: 1,
                    backgroundColor: colors.map(({color}) => color),
                }],
                labels: Object.keys(previewData) as string[],
            }}
            options={{
                responsive: true,
                aspectRatio: 2,
                plugins: {
                    legend: {
                        display: false,
                    },
                    datalabels: {
                        align: "start",
                        anchor: "center",
                        textAlign: "center",
                        offset: -40,
                        backgroundColor: colors.map(({color}) => color),
                        borderRadius: 8,
                        borderColor: "white",
                        borderWidth: 2,
                        color: "white",
                        "formatter": (_, context) => context.chart.data.labels![context.dataIndex]
                    }
                }
            }}/>
    );
}
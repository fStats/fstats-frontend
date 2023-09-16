import {Pie} from "react-chartjs-2";
import {ChartProps} from "./types";

export default function ChartJsPie(props: ChartProps) {
    return (
        <>
            <Pie data={{
                datasets: [{
                    label: "Count",
                    data: Object.values(props.metric) as number[],
                    borderWidth: 1,
                    backgroundColor: [
                        "#e74c3c",
                        "#2ecc71",
                        "#3498db",
                        "#e67e22",
                        "#f1c40f",
                    ],
                }],
                labels: Object.keys(props.metric) as string[],
            }} options={{
                radius: "90%",
                plugins: {
                    datalabels: {
                        align: "start",
                        anchor: "center",
                        textAlign: "center",
                        offset: -40,
                        /**
                         * Enable on release
                         * display: "auto"
                         */
                        backgroundColor: [
                            "#e74c3c",
                            "#2ecc71",
                            "#3498db",
                            "#e67e22",
                            "#f1c40f",
                        ],
                        borderRadius: 8,
                        borderColor: "white",
                        borderWidth: 2,
                        color: "white",
                        "formatter": (_, context) => context.chart.data.labels!![context.dataIndex]
                    }
                }
            }}/>
        </>
    )
}
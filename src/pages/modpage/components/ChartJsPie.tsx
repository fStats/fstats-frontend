import {DataValue} from "../../../services/types";
import {Pie} from "react-chartjs-2";

interface ChartProps {
    readonly title: string
    readonly metric: DataValue
}

export default function ChartJsPie(props: ChartProps) {

    const values: string[] = []
    const counts: number[] = []

    Object.entries(props.metric).forEach(([value, count]) => {
        values.push(value)
        counts.push(count)
    })

    return (
        <>
            <Pie data={{
                datasets: [{
                    label: 'Count',
                    data: counts,
                    borderWidth: 1,
                    backgroundColor: [
                        "#e74c3c",
                        "#2ecc71",
                        "#3498db",
                        "#e67e22",
                        "#f1c40f",
                    ],
                }],
                labels: values,
            }} options={{
                radius: "90%",
                plugins: {
                    datalabels: {
                        align: "start",
                        anchor: "center",
                        textAlign: "center",
                        offset: -40,
                        // display: "auto",
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
                        formatter: function (value, context) {
                            return context.chart.data.labels!![context.dataIndex];
                        }
                    }
                }
            }}/>
        </>
    )
}
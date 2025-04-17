import {Card, CardContent, Typography} from "@mui/material";
import {Pie} from "react-chartjs-2";
import {mergeClientAndServerData} from "../../../../mics/merge.ts";
import {CardProps} from "./types.ts";
import {useSettings} from "../../../../hooks/useSettings.tsx";

export default function PieCard(props: CardProps) {

    const {colors} = useSettings()
    const metric = mergeClientAndServerData(props.clientMetric, props.serverMetric)

    return (
        <Card>
            <CardContent>
                <Typography variant="h6" textAlign="center">{props.title}</Typography>
                <Pie data={{
                    datasets: [{
                        label: "Count",
                        data: Object.values(metric) as number[],
                        borderWidth: 1,
                        backgroundColor: colors,
                    }],
                    labels: Object.keys(metric) as string[],
                }} options={{
                    radius: "90%",
                    plugins: {
                        legend: {
                            display: false,
                        },
                        datalabels: {
                            align: "start",
                            anchor: "center",
                            textAlign: "center",
                            offset: -40,
                            backgroundColor: colors,
                            borderRadius: 8,
                            borderColor: "white",
                            borderWidth: 2,
                            color: "white",
                            "formatter": (_, context) => context.chart.data.labels!![context.dataIndex]
                        }
                    }
                }}/>
            </CardContent>
        </Card>
    )
}

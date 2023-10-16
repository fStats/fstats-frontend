import {Card, CardContent, Typography} from "@mui/material";
import {CardProps} from "./types";
import {Pie} from "react-chartjs-2";
import {colors} from "./colors";

export default function MetricCard(props: CardProps) {
    return Object.keys(props.metric).length > 0 ? (
        <Card>
            <CardContent>
                <Typography variant="h6" textAlign="center">{props.title}</Typography>
                <Pie data={{
                    datasets: [{
                        label: 'Count',
                        data: Object.values(props.metric) as number[],
                        borderWidth: 1,
                        backgroundColor: colors,
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
                            // display: "auto",
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
    ) : null
}
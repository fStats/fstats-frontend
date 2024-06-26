import {Card, CardContent, Typography} from "@mui/material";
import {Pie} from "react-chartjs-2";
import {colors} from "../colors.ts";
import {DataValue} from "../../../../services/types.ts";
import {CardProps} from "./types.ts";
import {iso2name} from "../../../../mics/convertor/country.ts";

export default function MetricCard(props: CardProps) {

    let metric = props.metric

    if (props.title === "Location") {
        metric = (Object.fromEntries(Object.entries(metric).map(([value, count]) => [iso2name[value], count])) as DataValue)
    }

    return (
        <Card>
            <CardContent>
                <Typography variant="h6" textAlign="center">{props.title}</Typography>
                <Pie data={{
                    datasets: [{
                        label: 'Count',
                        data: Object.values(metric) as number[],
                        borderWidth: 1,
                        backgroundColor: colors,
                    }],
                    labels: Object.keys(metric) as string[],
                }} options={{
                    radius: "90%",
                    plugins: {
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
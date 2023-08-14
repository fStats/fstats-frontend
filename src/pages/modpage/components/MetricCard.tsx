import {Card, CardContent, Typography} from "@mui/material";
import {DataValue} from "../../../services/types";
import ChartJsPie from "./ChartJsPie";

interface CardProps {
    readonly title: string
    readonly metric: DataValue
}

export function MetricCard(props: CardProps) {
    return (
        <Card>
            <CardContent>
                <Typography variant="h6" textAlign="center">{props.title}</Typography>
                <ChartJsPie metric={props.metric} title={props.title}/>
            </CardContent>
        </Card>
    )
}
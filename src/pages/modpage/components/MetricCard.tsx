import {Card, CardContent, Typography} from "@mui/material";
import ChartJsPie from "./ChartJsPie";
import {CardProps} from "./types";

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
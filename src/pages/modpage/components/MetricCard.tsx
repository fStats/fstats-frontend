import {Card, CardContent, Typography} from "@mui/material";
import {MetricPie} from "./MetricPie";
import {ComponentProps} from "react";

export function MetricCard(props: ComponentProps<any>) {
    const {name, data} = props;

    return (
        <Card>
            <CardContent>
                <Typography variant="h6" textAlign="center">${name}</Typography>
                <MetricPie data={data}/>
            </CardContent>
        </Card>
    )
}
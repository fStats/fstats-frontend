import {useLoaderData} from "react-router-dom";
import {Metric} from "../dto/Metric";
import {Card, CardContent, Stack, Typography} from "@mui/material";

export function ModPage() {

    const metric = useLoaderData() as Array<Metric>

    return (
        <Stack spacing={2} padding={4}>
            {
                metric.map((data) => (
                    <Card>
                        <CardContent>
                            <Typography variant="body2">{data.timestampSeconds}</Typography>
                            <Typography variant="body2">{data.projectId}</Typography>
                            <Typography variant="body2">{data.isServer}</Typography>
                            <Typography variant="body2">{data.minecraftVersion}</Typography>
                            <Typography variant="body2">{data.modVersion}</Typography>
                            <Typography variant="body2">{data.os}</Typography>
                            <Typography variant="body2">{data.location}</Typography>
                        </CardContent>
                    </Card>
                ))
            }
        </Stack>
    )
}
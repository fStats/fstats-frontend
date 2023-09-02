import {Stack, Typography} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import {useMetricCount} from "../../services/metrics";
import React from "react";
import {MetricCard} from "./components/MetricCard";
import Grid2 from "@mui/material/Unstable_Grid2";
import {DataValue} from "../../services/types";
import {Loader} from "../../components/Loader";
import {useSnackbar} from "notistack";

export function ModPage() {
    const navigate = useNavigate()

    const {enqueueSnackbar} = useSnackbar();

    const {modId} = useParams();
    const {data: metrics, status: metricStatus, error} = useMetricCount(Number.parseInt(modId!!))

    const hasData = Object.entries(metrics!!.metric_map).length > 0 || false

    if (metricStatus === "loading") return (<Loader/>)

    if (metricStatus === "error") {
        enqueueSnackbar(error?.message, {variant: "error"})
        navigate("/not-found")
        return <></>
    }

    const formatted = (data: DataValue, valueMapping: Record<string, string>): DataValue => Object.fromEntries(
        Object.entries(data).map(([value, count]) => [valueMapping[value] || value, count])
    );

    return (
        <>
            <Stack direction="row" textAlign="center" paddingTop={2} alignItems="baseline" justifyContent="center">
                <Typography variant="h2">{metrics.project.name}</Typography>
                <span style={{padding: 4}}/>
                <Typography variant="h4">{`by ${metrics.project.owner?.username}`}</Typography>
            </Stack>
            {hasData ? <Grid2 container spacing={2} padding={4} justifyContent="center">
                <Grid2>
                    <MetricCard title="Minecraft Version" metric={metrics.metric_map.minecraft_version}/>
                </Grid2>

                <Grid2>
                    <MetricCard title="Online Mode" metric={
                        formatted(metrics.metric_map.online_mode, {
                            'true': 'Online',
                            'false': 'Offline',
                        })
                    }/>
                </Grid2>

                <Grid2>
                    <MetricCard title="Mod Version" metric={metrics.metric_map.mod_version}/>
                </Grid2>

                <Grid2>
                    <MetricCard title="Operation System" metric={
                        formatted(metrics.metric_map.os, {
                            'l': 'Linux',
                            'm': 'MacOS',
                            'w': 'Windows',
                        })
                    }/>
                </Grid2>

                <Grid2>
                    <MetricCard title="Location" metric={metrics.metric_map.location}/>
                </Grid2>

                <Grid2>
                    <MetricCard title="Fabric API" metric={metrics.metric_map.fabric_api_version}/>
                </Grid2>
            </Grid2> : <Typography variant="h4" textAlign="center" paddingTop={4}>No data found</Typography>}
        </>
    )
}
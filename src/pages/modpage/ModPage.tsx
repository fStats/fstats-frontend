import {Stack, Typography} from "@mui/material";
import {Navigate, useParams} from "react-router-dom";
import {useMetricCount} from "../../services/metrics";
import React from "react";
import {MetricCard} from "./components/MetricCard";
import Grid2 from "@mui/material/Unstable_Grid2";
import {DataValue} from "../../services/types";
import {useProject} from "../../services/projects";
import {Loader} from "../../components/Loader";
import {ErrorMessage} from "../../components/ErrorMessage";

export function ModPage() {
    const {modId} = useParams();
    const id = Number.parseInt(modId!!)

    const {data: metrics, status: metricStatus, error: metricError} = useMetricCount(id)
    const {data: project, status: projectStatus, error: projectError} = useProject(id)

    if (metricStatus === "loading" || projectStatus === "loading") return (<Loader/>)

    if (metricStatus === "error" || projectStatus === "error") return (
        <ErrorMessage message={metricError?.message || projectError?.message || "Unexpected error"}>
            <Navigate to="/not-found"/>
        </ErrorMessage>
    )

    return (
        <>
            <Stack direction="row" textAlign="center" paddingTop={2} alignItems="baseline" justifyContent="center">
                <Typography variant="h2">{project?.name}</Typography>
                <span style={{padding: 4}}/>
                <Typography variant="h4">{`by ${project?.owner.username}`}</Typography>
            </Stack>
            <Grid2 container spacing={2} padding={4} justifyContent="center">
                <Grid2>
                    <MetricCard title="Minecraft Version" metric={metrics.minecraft_version}/>
                </Grid2>

                <Grid2>
                    <MetricCard title="Online Mode" metric={formatOnlineMode(metrics.online_mode)}/>
                </Grid2>

                <Grid2>
                    <MetricCard title="Mod Version" metric={metrics.mod_version}/>
                </Grid2>

                <Grid2>
                    <MetricCard title="Operation System" metric={formatOperationSystem(metrics.os)}/>
                </Grid2>

                <Grid2>
                    <MetricCard title="Location" metric={metrics.location}/>
                </Grid2>

                <Grid2>
                    <MetricCard title="Fabric API" metric={metrics.fabric_api_version}/>
                </Grid2>
            </Grid2>
        </>
    )
}

function formatOnlineMode(data: DataValue) {
    return Object.fromEntries(
        Object.entries(data).map(([value, count]) => {
            if (value === 'true') value = 'Online';
            if (value === 'false') value = 'Offline';
            return [value, count];
        })
    ) as DataValue;
}

function formatOperationSystem(data: DataValue) {
    return Object.fromEntries(
        Object.entries(data).map(([value, count]) => {
            if (value === 'l') value = 'Linux'
            if (value === 'm') value = 'MacOS'
            if (value === 'w') value = 'Windows'
            return [value, count];
        })
    ) as DataValue;
}
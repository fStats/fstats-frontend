import {Typography} from "@mui/material";
import {useLocation, useParams} from "react-router-dom";
import {useMetricCount} from "../../services/metrics";
import React from "react";
import {MetricCard} from "./components/MetricCard";
import Grid2 from "@mui/material/Unstable_Grid2";

export function ModPage() {
    const {modId} = useParams();
    const {title} = useLocation().state
    const id = Number.parseInt(modId!!)

    const {data, status, error} = useMetricCount(id)

    if (status === "loading") return (
        <Typography variant="h4">Loading...</Typography>
    )

    if (status === "error") return (
        <Typography variant="h4">{`Error...${error}`}</Typography>
    )

    return (
        <>
            <Typography variant="h2" textAlign="center" paddingTop={2}>{title}</Typography>
            <Grid2 container spacing={2} padding={4}>
                <Grid2 xs={1} sm={2} md={4}>
                    <MetricCard title="Minecraft Version" metric={data.minecraft_version}/>
                </Grid2>

                <Grid2 xs={1} sm={2} md={4}>
                    <MetricCard title="Online Mode" metric={data.online_mode}/>
                </Grid2>

                <Grid2 xs={1} sm={2} md={4}>
                    <MetricCard title="Mod Version" metric={data.mod_version}/>
                </Grid2>

                <Grid2 xs={1} sm={2} md={4}>
                    <MetricCard title="Operation System" metric={data.os}/>
                </Grid2>

                <Grid2 xs={1} sm={2} md={4}>
                    <MetricCard title="Location" metric={data.location}/>
                </Grid2>
            </Grid2>
        </>
    )
}
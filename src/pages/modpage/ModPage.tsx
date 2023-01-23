import {Card, CardContent, Typography} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import {
    getLocationMetricById,
    getMinecraftVersionMetricById,
    getModVersionMetricById,
    getOnlineModeMetricById,
    getOperationSystemMetricById,
    getSideMetricById
} from "../../service/FStatsApi";
import {useEffect, useState} from "react";
import {MetricPie} from "./components/MetricPie";
import {useLocation, useParams} from "react-router-dom";
import {MetricCard} from "./components/MetricCard";

export function ModPage() {
    const [sides, setSides] = useState([]);
    const [mcVersions, setMcVersions] = useState([]);
    const [onlineModes, setOnlineModes] = useState([]);
    const [modVersions, setModVersions] = useState([]);
    const [oss, setOss] = useState([]);
    const [locations, setLocations] = useState([]);

    const {modId} = useParams();
    const {title} = useLocation().state
    const id = Number.parseInt(modId!!)

    useEffect(() => {
        getSideMetricById(id).then(data => setSides(data));
        getMinecraftVersionMetricById(id).then(data => setMcVersions(data));
        getOnlineModeMetricById(id).then(data => setOnlineModes(data));
        getModVersionMetricById(id).then(data => setModVersions(data));
        getOperationSystemMetricById(id).then(data => setOss(data));
        getLocationMetricById(id).then(data => setLocations(data));
    }, []);

    return (
        <>
            <Typography variant="h2" textAlign="center" paddingTop={2}>{title}</Typography>
            <Grid2 container spacing={2} padding={4}>
                <Grid2 xs={1} sm={2} md={4}>
                    <MetricCard name="Side" data={sides}/>
                </Grid2>

                <Grid2 xs={1} sm={2} md={4}>
                    <MetricCard name="Minecraft Version" data={mcVersions}/>
                </Grid2>

                <Grid2 xs={1} sm={2} md={4}>
                    <MetricCard name="Online Mode" data={onlineModes}/>
                </Grid2>

                <Grid2 xs={1} sm={2} md={4}>
                    <MetricCard name="Mod Version" data={modVersions}/>
                </Grid2>

                <Grid2 xs={1} sm={2} md={4}>
                    <MetricCard name="Operation System" data={oss}/>
                </Grid2>

                <Grid2 xs={1} sm={2} md={4}>
                    <MetricCard name="Location" data={locations}/>
                </Grid2>
            </Grid2>
        </>
    )
}
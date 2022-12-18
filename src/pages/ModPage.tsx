import {Card, CardContent, Typography} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import {
    getLocationMetricById,
    getMinecraftVersionMetricById, getModVersionMetricById,
    getOnlineModeMetricById, getOperationSystemMetricById,
    getSideMetricById
} from "../service/FStatsApi";
import {ComponentProps, useEffect, useState} from "react";
import {MetricPie} from "../components/MetricPie";
import {Params, useParams} from "react-router-dom";

export function ModPage() {
    const [sides, setSides] = useState([]);
    const [mcVersions, setMcVersions] = useState([]);
    const [onlineModes, setOnlineModes] = useState([]);
    const [modVersions, setModVersions] = useState([]);
    const [oss, setOss] = useState([]);
    const [locations, setLocations] = useState([]);

    const {modId} = useParams();
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
        <Grid2 container spacing={2} padding={4}>

            <Grid2 xs={1} sm={4} md={4}>
                <Card>
                    <CardContent>
                        <Typography variant="h6" textAlign="center">Side</Typography>
                        <MetricPie data={sides}/>
                    </CardContent>
                </Card>
            </Grid2>

            <Grid2 xs={1} sm={4} md={4}>
                <Card>
                    <CardContent>
                        <Typography variant="h6" textAlign="center">Minecraft Version</Typography>
                        <MetricPie data={mcVersions}/>
                    </CardContent>
                </Card>
            </Grid2>

            <Grid2 xs={1} sm={4} md={4}>
                <Card>
                    <CardContent>
                        <Typography variant="h6" textAlign="center">Online Mode</Typography>
                        <MetricPie data={onlineModes}/>
                    </CardContent>
                </Card>
            </Grid2>

            <Grid2 xs={1} sm={4} md={4}>
                <Card>
                    <CardContent>
                        <Typography variant="h6" textAlign="center">Mod Version</Typography>
                        <MetricPie data={modVersions}/>
                    </CardContent>
                </Card>
            </Grid2>

            <Grid2 xs={1} sm={4} md={4}>
                <Card>
                    <CardContent>
                        <Typography variant="h6" textAlign="center">Operation System</Typography>
                        <MetricPie data={oss}/>
                    </CardContent>
                </Card>
            </Grid2>

            <Grid2 xs={1} sm={4} md={4}>
                <Card>
                    <CardContent>
                        <Typography variant="h6" textAlign="center">Location</Typography>
                        <MetricPie data={locations}/>
                    </CardContent>
                </Card>
            </Grid2>

        </Grid2>
    )
}
import {useNavigate, useParams} from "react-router-dom";
import {useSnackbar} from "notistack";
import Grid2 from "@mui/material/Unstable_Grid2";
import {Typography} from "@mui/material";
import MetricCard from "./components/MetricCard";
import {useMetricCount} from "../../services/metrics";
import {useLabel} from "../../hooks/useLabel";
import {Loader} from "../../components/Loader";
import {DataValue} from "../../services/types";

export default function ProjectPage() {

    const navigate = useNavigate()
    const {enqueueSnackbar} = useSnackbar();

    const id = Number.parseInt(useParams().id!!)
    const {data, status, error} = useMetricCount(id)

    useLabel()?.setLabel(data?.project.name || "")

    if (status === "loading") return (<Loader/>)

    if (status === "error") {
        enqueueSnackbar(error?.message, {variant: "error"})
        navigate('/not-found')
        return <></>
    }

    return (
        <>
            {Object.entries(data.metric_map).length > 0 ? <Grid2 container spacing={2} justifyContent="center">
                <Grid2>
                    <MetricCard title="Minecraft Version" metric={data.metric_map.minecraft_version}/>
                </Grid2>

                <Grid2>
                    <MetricCard title="Online Mode" metric={formatOnlineMode(data.metric_map.online_mode)}/>
                </Grid2>

                <Grid2>
                    <MetricCard title="Mod Version" metric={data.metric_map.mod_version}/>
                </Grid2>

                <Grid2>
                    <MetricCard title="Operation System" metric={formatOperationSystem(data.metric_map.os)}/>
                </Grid2>

                <Grid2>
                    <MetricCard title="Location" metric={data.metric_map.location}/>
                </Grid2>

                <Grid2>
                    <MetricCard title="Fabric API" metric={data.metric_map.fabric_api_version}/>
                </Grid2>
            </Grid2> : <Typography variant="h4" textAlign="center" paddingTop={4}>No data found</Typography>}
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
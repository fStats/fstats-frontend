import {Stack} from "@mui/material";
import {WorldMapCard} from "../components/card/WorldMapCard.tsx";
import PieCard from "../components/card/PieCard.tsx";
import {ChartsTabProps, MetricTab} from "./types.ts";
import {formatOnlineMode} from "../../../mics/formatter/onlineMode.ts";
import {formatOperationSystem} from "../../../mics/formatter/operationSystem.ts";
import {BarCard} from "../components/card/BarCard.tsx";
import {DataValue} from "../../../services/types.ts";

export function ChartsTab(props: ChartsTabProps) {

    const clientPieData = props.value === MetricTab.Client || props.value === MetricTab.Mixed ? props.clientPieData : undefined
    const serverPieData = props.value === MetricTab.Server || props.value === MetricTab.Mixed ? props.serverPieData : undefined

    return (
        <Stack direction="row" spacing={2}>
            <Stack sx={{flexGrow: 1}} spacing={2}>
                <BarCard title="FabricAPI"
                         clientMetric={clientPieData?.fabric_api_version ?? [] as unknown as DataValue}
                         serverMetric={serverPieData?.fabric_api_version ?? [] as unknown as DataValue}/>
                <WorldMapCard title="Location"
                              clientMetric={clientPieData?.location ?? [] as unknown as DataValue}
                              serverMetric={serverPieData?.location ?? [] as unknown as DataValue}/>
            </Stack>
            <Stack spacing={2}>
                <Stack direction="row" spacing={2}>
                    <PieCard title="Minecraft Version"
                             clientMetric={clientPieData?.minecraft_version ?? [] as unknown as DataValue}
                             serverMetric={serverPieData?.minecraft_version ?? [] as unknown as DataValue}/>
                    <PieCard title="Online Mode"
                             clientMetric={formatOnlineMode(clientPieData?.online_mode ?? [] as unknown as DataValue)}
                             serverMetric={formatOnlineMode(serverPieData?.online_mode ?? [] as unknown as DataValue)}/>
                </Stack>
                <Stack direction="row" spacing={2}>
                    <PieCard title="Mod Version"
                             clientMetric={clientPieData?.mod_version ?? [] as unknown as DataValue}
                             serverMetric={serverPieData?.mod_version ?? [] as unknown as DataValue}/>
                    <PieCard title="Operation System"
                             clientMetric={formatOperationSystem(clientPieData?.os ?? [] as unknown as DataValue)}
                             serverMetric={formatOperationSystem(serverPieData?.os ?? [] as unknown as DataValue)}/>
                </Stack>
            </Stack>
        </Stack>
    )
}
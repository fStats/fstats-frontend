import {Grid} from "@mui/material";
import {t} from "i18next";

import {BarCard} from "@pages/project/components/card/BarCard";
import PieCard from "@pages/project/components/card/PieCard";
import {WorldMapCard} from "@pages/project/components/card/WorldMapCard";
import {formatOnlineMode} from "@utils/formatters/onlineMode";
import {formatOperationSystem} from "@utils/formatters/operationSystem";

import {ChartsTabProps, MetricTab} from "./types";

export function ChartsTab(props: ChartsTabProps) {

    const clientPieData = props.value === MetricTab.Client || props.value === MetricTab.Mixed ? props.clientPieData : undefined;
    const serverPieData = props.value === MetricTab.Server || props.value === MetricTab.Mixed ? props.serverPieData : undefined;

    return (
        <Grid container spacing={2}>
            <Grid size={{xs:12, md:6}} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <BarCard
                    title={t("page.project.cards.fabricapi")}
                    clientMetric={clientPieData?.fabric_api_version ?? {}}
                    serverMetric={serverPieData?.fabric_api_version ?? {}}
                />
                <WorldMapCard
                    title={t("page.project.cards.loc")}
                    clientMetric={clientPieData?.location ?? {}}
                    serverMetric={serverPieData?.location ?? {}}
                />
            </Grid>

            <Grid size={{xs:12, md:6}} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Grid container spacing={2}>
                    <Grid size={{xs:12, sm:6}}>
                        <PieCard
                            title={t("page.project.cards.mc")}
                            clientMetric={clientPieData?.minecraft_version ?? {}}
                            serverMetric={serverPieData?.minecraft_version ?? {}}
                        />
                    </Grid>
                    <Grid size={{xs:12, sm:6}}>
                        <PieCard
                            title={t("page.project.cards.mode")}
                            clientMetric={formatOnlineMode(clientPieData?.online_mode ?? {})}
                            serverMetric={formatOnlineMode(serverPieData?.online_mode ?? {})}
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={2}>
                    <Grid size={{xs:12, sm:6}}>
                        <PieCard
                            title={t("page.project.cards.mod")}
                            clientMetric={clientPieData?.mod_version ?? {}}
                            serverMetric={serverPieData?.mod_version ?? {}}
                        />
                    </Grid>
                    <Grid size={{xs:12, sm:6}}>
                        <PieCard
                            title={t("page.project.cards.os")}
                            clientMetric={formatOperationSystem(clientPieData?.os ?? {})}
                            serverMetric={formatOperationSystem(serverPieData?.os ?? {})}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}
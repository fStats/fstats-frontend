import {FormatListBulleted, Map} from "@mui/icons-material";
import {
    Avatar,
    Card,
    CardContent,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Stack,
    Typography
} from "@mui/material";
import {Feature} from "chartjs-chart-geo";
import {useState} from "react";
import {Chart} from "react-chartjs-2";

import {DataValue} from "@services/types";
import {useWorldMap} from "@services/worldatlas/worldMap";
import {code2shortIso, iso2code} from "@utils/convertors/country";
import {mergeClientAndServerData} from "@utils/merge";

import {CardProps} from "./types";


export function WorldMapCard(props: CardProps) {

    const [listMode, setListMode] = useState(false);

    const {data, status} = useWorldMap()

    const metric = Object.fromEntries(Object.entries(
        mergeClientAndServerData(props.clientMetric, props.serverMetric)
    ).map(([value, count]) => [iso2code[value], count])) as DataValue

    const values = Object.values(metric);
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);

    const gradientColor = (value: number, skipOffset: boolean): string => {
        const offset = skipOffset ? value : Math.max(0, Math.min(1, (value - minValue) / (maxValue - minValue)));
        return `rgb(${Math.round(5 + 28 * offset)}, ${Math.round(5 + 186 * offset)}, ${Math.round(5 + 95 * offset)})`;
    };

    return (
        status === "success" && <Card>
            <CardContent>
                <Stack direction="row" spacing={2}>
                    <Typography flexGrow={1} paddingLeft={8} variant="h6"
                                textAlign="center">{props.title}</Typography>
                    <IconButton onClick={() => setListMode((prev) => !prev)}>
                        {listMode ? <Map/> : <FormatListBulleted/>}
                    </IconButton>
                </Stack>
                {listMode ?
                    <List sx={{
                        overflow: "auto",
                        maxHeight: 380,
                        position: "relative",
                        "&::-webkit-scrollbar": {
                            width: 8,
                        },
                        "&::-webkit-scrollbar-track": {
                            backgroundColor: "transparent",
                        },
                        "&::-webkit-scrollbar-button": {
                            display: "none",
                            width: 0,
                            height: 0,
                        },
                        "&::-webkit-scrollbar-thumb": {
                            backgroundColor: (theme) =>
                                theme.palette.mode === "light"
                                    ? theme.palette.grey[400]
                                    : theme.palette.grey[700],
                            borderRadius: 4,
                        },
                        "&::-webkit-scrollbar-thumb:hover": {
                            backgroundColor: (theme) =>
                                theme.palette.mode === "light"
                                    ? theme.palette.grey[500]
                                    : theme.palette.grey[600],
                        },
                        scrollbarWidth: "thin",
                        scrollbarColor: (theme) => `${theme.palette.grey[500]} transparent`,
                    }}>
                        {(data as Feature[]).filter(d => metric[d.id])
                            .sort((a: Feature, b: Feature) => metric[b.id] - metric[a.id])
                            .map((d: Feature) =>
                                <ListItem disablePadding>
                                    <ListItemAvatar>
                                        <Avatar variant="square" alt={code2shortIso[d.id]}
                                                src={`https://flagsapi.com/${code2shortIso[d.id]}/flat/64.png`}/>
                                    </ListItemAvatar>
                                    <ListItemText primary={d.properties.name} secondary={metric[d.id]}/>
                                </ListItem>
                            )}
                    </List>
                    :
                    <Chart
                        type="choropleth"
                        data={{
                            labels: (data as Feature[]).map(d => d.properties.name),
                            datasets: [{
                                data: (data as Feature[]).map(d => ({feature: d, value: metric[d.id] ?? 0})),
                                backgroundColor: (ctx) =>
                                    gradientColor((ctx.chart.data.datasets[0].data[ctx.dataIndex] as {
                                        value: number
                                    })?.value, false)
                            }]
                        }}
                        options={{
                            plugins: {
                                legend: {
                                    display: false,
                                },
                                datalabels: {
                                    display: false
                                }
                            },
                            scales: {
                                projection: {
                                    axis: "x",
                                    projection: "equalEarth"
                                },
                                color: {
                                    interpolate: (v) => gradientColor(v, true),
                                    max: maxValue,
                                    axis: "x",
                                    ticks: {
                                        precision: 0,
                                    },
                                    beginAtZero: true
                                }
                            }
                        }}
                    />}
            </CardContent>
        </Card>
    )
}

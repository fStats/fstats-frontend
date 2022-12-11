import {useLoaderData} from "react-router-dom";
import {Card, CardContent} from "@mui/material";
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts'
import {Metrics} from "../dto/local/Metrics";
import Grid from "@mui/material/Unstable_Grid2";

export function ModPage() {

    const data = useLoaderData() as Metrics

    return (
        <Grid container spacing={2} padding={4}>

            <Grid xs={2} sm={4} md={4}>
                <Card>
                    <CardContent>
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={{
                                chart: {
                                    plotShadow: false,
                                    type: 'pie'
                                },
                                title: {
                                    text: 'Side'
                                },
                                accessibility: {
                                    point: {
                                        valueSuffix: '%'
                                    }
                                },
                                series: [{
                                    data: data.side
                                }]
                            }}
                        />
                    </CardContent>
                </Card>
            </Grid>

            <Grid xs={2} sm={4} md={4}>
                <Card>
                    <CardContent>
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={{
                                chart: {
                                    plotShadow: false,
                                    type: 'pie'
                                },
                                title: {
                                    text: 'Minecraft Version'
                                },
                                accessibility: {
                                    point: {
                                        valueSuffix: '%'
                                    }
                                },
                                series: [{
                                    data: data.mcversion
                                }]
                            }}
                        />
                    </CardContent>
                </Card>
            </Grid>

            <Grid xs={2} sm={4} md={4}>
                <Card>
                    <CardContent>
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={{
                                chart: {
                                    plotShadow: false,
                                    type: 'pie'
                                },
                                title: {
                                    text: 'Online Mode'
                                },
                                accessibility: {
                                    point: {
                                        valueSuffix: '%'
                                    }
                                },
                                series: [{
                                    data: data.onlinemode
                                }]
                            }}
                        />
                    </CardContent>
                </Card>
            </Grid>

            <Grid xs={2} sm={4} md={4}>
                <Card>
                    <CardContent>
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={{
                                chart: {
                                    plotShadow: false,
                                    type: 'pie'
                                },
                                title: {
                                    text: 'Mod Version'
                                },
                                accessibility: {
                                    point: {
                                        valueSuffix: '%'
                                    }
                                },
                                series: [{
                                    data: data.modversion
                                }]
                            }}
                        />
                    </CardContent>
                </Card>
            </Grid>

            <Grid xs={2} sm={4} md={4}>
                <Card>
                    <CardContent>
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={{
                                chart: {
                                    plotShadow: false,
                                    type: 'pie'
                                },
                                title: {
                                    text: 'Operation System'
                                },
                                accessibility: {
                                    point: {
                                        valueSuffix: '%'
                                    }
                                },
                                series: [{
                                    data: data.os
                                }]
                            }}
                        />
                    </CardContent>
                </Card>
            </Grid>

            <Grid xs={2} sm={4} md={4}>
                <Card>
                    <CardContent>
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={{
                                chart: {
                                    plotShadow: false,
                                    type: 'pie'
                                },
                                title: {
                                    text: 'Location'
                                },
                                accessibility: {
                                    point: {
                                        valueSuffix: '%'
                                    }
                                },
                                series: [{
                                    data: data.location
                                }]
                            }}
                        />
                    </CardContent>
                </Card>
            </Grid>

        </Grid>
    )
}
import {ArrowForward} from "@mui/icons-material";
import {Button, Card, CardActionArea, CardContent, Grid, Typography} from "@mui/material";
import {Link} from "react-router-dom";

import {useLabel} from "@hooks/useLabel";

export default function HomePage() {

    useLabel()?.setLabel("Home");

    const cards = [
        {
            title: "Fabric Metrics",
            description: (
                <>
                    fStats allows you to <b>collect usage data</b> of your mods.
                </>
            ),
            to: "project/1",
        },
        {
            title: "Open Source",
            description: (
                <>
                    fStats is <b>completely open source</b>! Feel free to check out our GitHub.
                </>
            ),
            to: "https://github.com/fStats",
        },
        {
            title: "Plug and Play",
            description: (
                <>
                    <b>Simple</b> to implement <b>into already done</b> project. Just embed it to mod and{" "}
                    <b>add 1 row into fabric.mod.json</b>.
                </>
            ),
            to: "getting-started",
        },
        {
            title: "OpenAPI",
            description: (
                <>
                    The <b>REST-Api</b> of fStats is very simple. It's meant to allow you to{" "}
                    <b>make your own service</b> based on fStats data.
                </>
            ),
            to: "https://api.fstats.dev/swagger",
        },
        {
            title: "Join our Discord",
            description: (
                <>
                    Keep <b>up-to-date</b> with the development of fStats, <b>get support</b> or{" "}
                    <b>just chat</b>.
                </>
            ),
            to: "https://discord.gg/pbwnMwnUD6",
        },
    ];

    return (
        <Grid container spacing={8} paddingTop={8} paddingX={{ xs: 2, md: 16 }} direction="column">
            <Grid>
                <Grid container direction="column" spacing={4} alignItems="center">
                    <Grid>
                        <Typography variant="h3" textAlign="center">
                            fStats - Fabric mods metric system
                        </Typography>
                    </Grid>
                    <Grid>
                        <Button
                            color="success"
                            variant="contained"
                            component={Link}
                            to="getting-started"
                            endIcon={<ArrowForward />}
                        >
                            Getting started
                        </Button>
                    </Grid>
                </Grid>
            </Grid>

            <Grid>
                <Grid container spacing={2} justifyContent="center">
                    {cards.map(card => (
                        <Grid size={{xs:12, sm:6, md:4}} key={card.title}>
                            <Card sx={{ height: "100%" }}>
                                <CardActionArea component={Link} to={card.to} sx={{ height: "100%" }}>
                                    <CardContent>
                                        <Typography variant="h5" textAlign="center" pb={1}>
                                            {card.title}
                                        </Typography>
                                        <Typography variant="body1">
                                            {card.description}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    );
}
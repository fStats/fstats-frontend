import {ArrowForward, Launch} from "@mui/icons-material";
import {Button, Card, CardActionArea, CardContent, Grid, Stack, Typography} from "@mui/material";
import {useEffect} from "react";
import {Trans, useTranslation} from "react-i18next";
import {Link} from "react-router-dom";

import {useLabel} from "@hooks/useLabel";

export default function HomePage() {

    const {setLabel} = useLabel();
    const {t} = useTranslation("home");

    useEffect(() => setLabel(t("label")), [setLabel, t]);

    const cards = [
        {
            title: t("card.about.title"),
            description: <Trans i18nKey="card.about.description" ns="home" components={{b: <b/>}}/>,
            to: "project/1",
        },
        {
            title: t("card.opensource.title"),
            description: <Trans i18nKey="card.opensource.description" ns="home" components={{b: <b/>}}/>,
            to: "https://github.com/fStats",
        },
        {
            title: t("card.plugandplay.title"),
            description: <Trans i18nKey="card.plugandplay.description" ns="home" components={{b: <b/>}}/>,
            to: "getting-started",
        },
        {
            title: t("card.openapi.title"),
            description: <Trans i18nKey="card.openapi.description" ns="home" components={{b: <b/>}}/>,
            to: "https://api.fstats.dev/swagger",
        },
        {
            title: t("card.discord.title"),
            description: <Trans i18nKey="card.discord.description" ns="home" components={{b: <b/>}}/>,
            to: "https://discord.gg/pbwnMwnUD6",
        },
    ];

    return (
        <Grid container spacing={8} paddingTop={8} paddingX={{xs: 2, md: 16}} direction="column">
            <Grid>
                <Grid container direction="column" spacing={4} alignItems="center">
                    <Grid>
                        <Typography variant="h3" textAlign="center">
                            {t("title")}
                        </Typography>
                    </Grid>
                    <Grid>
                        <Button
                            color="success"
                            variant="contained"
                            component={Link}
                            to="getting-started"
                            endIcon={<ArrowForward/>}
                        >
                            {t("start")}
                        </Button>
                    </Grid>
                </Grid>
            </Grid>

            <Grid>
                <Grid container spacing={2} justifyContent="center">
                    {cards.map(card => (
                        <Grid size={{xs: 12, sm: 6, md: 4}} key={card.title}>
                            <Card sx={{height: "100%"}}>
                                <CardActionArea component={Link} to={card.to} sx={{height: "100%"}}>
                                    <CardContent>
                                        <Stack direction="row" justifyContent="center">
                                            <Typography variant="h5" textAlign="center" pb={1}>
                                                {card.title}
                                            </Typography>
                                            {card.to.startsWith("http") && <>
                                                &nbsp;
                                                <Launch fontSize="inherit"/>
                                            </>}
                                        </Stack>
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
import {ArrowForward, Launch} from "@mui/icons-material";
import {Button, Card, CardActionArea, CardContent, Grid, Stack, Typography} from "@mui/material";
import {t} from "i18next";
import {useEffect} from "react";
import {Trans} from "react-i18next";
import {Link} from "react-router-dom";

import {useLabel} from "@hooks/useLabel";

export default function HomePage() {

    const {setLabel} = useLabel();

    useEffect(() => setLabel(t("page.home.label")), [setLabel]);

    const cards = [
        {
            title: t("page.home.card.about.title"),
            description: <Trans i18nKey="page.home.card.about.description" components={{b: <b/>}}/>,
            to: "project/1",
        },
        {
            title: t("page.home.card.opensource.title"),
            description: <Trans i18nKey="page.home.card.opensource.description" components={{b: <b/>}}/>,
            to: "https://github.com/fStats",
        },
        {
            title: t("page.home.card.plugandplay.title"),
            description: <Trans i18nKey="page.home.card.plugandplay.description" components={{b: <b/>}}/>,
            to: "getting-started",
        },
        {
            title: t("page.home.card.openapi.title"),
            description: <Trans i18nKey="page.home.card.openapi.description" components={{b: <b/>}}/>,
            to: "https://api.fstats.dev/swagger",
        },
        {
            title: t("page.home.card.discord.title"),
            description: <Trans i18nKey="page.home.card.discord.description" components={{b: <b/>}}/>,
            to: "https://discord.gg/pbwnMwnUD6",
        },
    ];

    return (
        <Grid container spacing={8} paddingTop={8} paddingX={{xs: 2, md: 16}} direction="column">
            <Grid>
                <Grid container direction="column" spacing={4} alignItems="center">
                    <Grid>
                        <Typography variant="h3" textAlign="center">
                            {t("page.home.title")}
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
                            {t("page.home.start")}
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
import {useLabel} from "../hooks/useLabel.tsx";
import {Button, Card, CardActionArea, CardContent, Stack, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {ArrowForward} from "@mui/icons-material";

export default function HomePage() {

    useLabel()?.setLabel("Home")

    return (
        <Stack spacing={8} paddingTop={8} paddingX={16}>

            <Stack alignItems="center" spacing={8}>
                <Typography variant="h3" textAlign="center">fStats - Fabric mods metric system</Typography>
                <Button color="success" variant="contained" component={Link} to="getting-started" endIcon={
                    <ArrowForward/>
                }>Getting start</Button>
            </Stack>

            <Stack spacing={2}>
                <Stack direction="row" spacing={2}>
                    <Card style={{flexBasis: "100%"}}>
                        <CardActionArea component={Link} to="project/1">
                            <CardContent>
                                <Typography variant="h5" textAlign="center" paddingBottom={1}>Fabric
                                    Metrics</Typography>
                                <Typography variant="body1">
                                    fStats allows you to <b>collect usage data</b> of your mods.
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                    <Card style={{flexBasis: "100%"}}>
                        <CardActionArea component={Link} to="https://github.com/fStats">
                            <CardContent>
                                <Typography variant="h5" textAlign="center" paddingBottom={1}>Open Source</Typography>
                                <Typography variant="body1">
                                    fStats is <b>completely open source</b>! Feel free to check out our GitHub.
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Stack>
                <Stack direction="row" spacing={2}>
                    <Card style={{flexBasis: "100%"}}>
                        <CardActionArea component={Link} to="getting-started">
                            <CardContent>
                                <Typography variant="h5" textAlign="center" paddingBottom={1}>Plug and Play</Typography>
                                <Typography variant="body1">
                                    <b>Simple</b> to implement <b>into already done</b> project.
                                    Just embed it to mod and <b>add 1 row into fabric.mod.json</b>.
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                    <Card style={{flexBasis: "100%"}}>
                        <CardActionArea component={Link} to="https://api.fstats.dev/swagger">
                            <CardContent>
                                <Typography variant="h5" textAlign="center" paddingBottom={1}>OpenAPI</Typography>
                                <Typography variant="body1">
                                    The <b>REST-Api</b> of fStats is very simple.
                                    It's meant to allow you to <b>make our own service</b> based on fStats data and
                                    etc.
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                    <Card style={{flexBasis: "100%"}}>
                        <CardActionArea component={Link} to="https://discord.gg/pbwnMwnUD6">
                            <CardContent>
                                <Typography variant="h5" textAlign="center" paddingBottom={1}>Join our
                                    Discord</Typography>
                                <Typography variant="body1">
                                    Keep <b>up-to-date</b> with the development of fStats,
                                    <b>get support</b> or <b>just chat</b>.
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Stack>
            </Stack>
        </Stack>
    )
}
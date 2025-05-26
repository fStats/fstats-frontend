import {Link as MUILink, Stack, Typography} from "@mui/material";
import {useEffect} from "react";
import {Link} from "react-router-dom";

import {useLabel} from "@hooks/useLabel";
import FabricJsonTabs from "@pages/gettingstarted/components/FabricJsonTabs";
import GradleCodeTabs from "@pages/gettingstarted/components/GradleCodeTabs";

export default function GettingStartedPage() {

    const {setLabel} = useLabel()

    useEffect(() => setLabel("Getting started"), [setLabel]);

    return (
        <Stack spacing={2}>
            <Typography variant="h5">
                1. <MUILink component={Link} underline="none" to="/register">Register account</MUILink>
            </Typography>

            <Typography variant="h5">
                2. <MUILink component={Link} underline="none" to="/profile">Create project</MUILink>
            </Typography>

            <Typography variant="h5">
                3. Add library to your project gradle
            </Typography>
            <GradleCodeTabs/>

            <Typography variant="h5">
                4. Added mod as dependency and projectId to your fabric.mod.json
            </Typography>
            <FabricJsonTabs/>

            <Typography variant="h5">
                5. When data come you can see it on your project page
            </Typography>
        </Stack>
    )
}
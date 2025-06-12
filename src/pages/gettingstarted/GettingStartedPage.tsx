import {Link as MUILink, Stack, Typography} from "@mui/material";
import {useEffect} from "react";
import {Trans, useTranslation} from "react-i18next";
import {Link} from "react-router-dom";

import {useLabel} from "@hooks/useLabel";
import FabricJsonTabs from "@pages/gettingstarted/components/FabricJsonTabs";
import GradleCodeTabs from "@pages/gettingstarted/components/GradleCodeTabs";

export default function GettingStartedPage() {

    const {setLabel} = useLabel();
    const {t} = useTranslation("gettingStarted");

    useEffect(() => setLabel(t("label")), [setLabel, t]);

    return (
        <Stack spacing={2}>
            <Typography variant="h5">
                1. <Trans i18nKey="steps.1" ns="gettingStarted" components={{
                    redirect: <MUILink component={Link} underline="none" to="/register"/>
                }}/>
            </Typography>

            <Typography variant="h5">
                2. <Trans i18nKey="steps.2" ns="gettingStarted" components={{
                    redirect: <MUILink component={Link} underline="none" to="/profile"/>
                }}/>
            </Typography>

            <Typography variant="h5">
                3. {t("steps.3")}
            </Typography>
            <GradleCodeTabs/>

            <Typography variant="h5">
                4. {t("steps.4")}
            </Typography>
            <FabricJsonTabs/>

            <Typography variant="h5">
                5. {t("steps.5")}
            </Typography>
        </Stack>
    );
}
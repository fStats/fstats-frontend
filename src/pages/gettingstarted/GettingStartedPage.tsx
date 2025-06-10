import {Link as MUILink, Stack, Typography} from "@mui/material";
import {t} from "i18next";
import {useEffect} from "react";
import {Trans} from "react-i18next";
import {Link} from "react-router-dom";

import {useLabel} from "@hooks/useLabel";
import FabricJsonTabs from "@pages/gettingstarted/components/FabricJsonTabs";
import GradleCodeTabs from "@pages/gettingstarted/components/GradleCodeTabs";

export default function GettingStartedPage() {

    const {setLabel} = useLabel();

    useEffect(() => setLabel(t("page.gettingstarted.label")), [setLabel]);

    return (
        <Stack spacing={2}>
            <Typography variant="h5">
                <Trans i18nKey="page.gettingstarted.1" components={{
                    redirect: <MUILink component={Link} underline="none" to="/register"/>
                }}/>
            </Typography>

            <Typography variant="h5">
                <Trans i18nKey="page.gettingstarted.2" components={{
                    redirect: <MUILink component={Link} underline="none" to="/profile"/>
                }}/>
            </Typography>

            <Typography variant="h5">
                {t("page.gettingstarted.3")}
            </Typography>
            <GradleCodeTabs/>

            <Typography variant="h5">
                {t("page.gettingstarted.4")}
            </Typography>
            <FabricJsonTabs/>

            <Typography variant="h5">
                {t("page.gettingstarted.5")}
            </Typography>
        </Stack>
    );
}
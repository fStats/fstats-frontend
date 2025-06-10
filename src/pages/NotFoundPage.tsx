import {Typography} from "@mui/material";
import {t} from "i18next";
import {useEffect} from "react";

import CenteredContainer from "@components/CenteredContainer";
import {useLabel} from "@hooks/useLabel";

export default function NotFoundPage() {

    const {setLabel} = useLabel();

    useEffect(() => setLabel(t("page.notfound.label")), [setLabel]);

    return (
        <CenteredContainer>
            <Typography variant="h1" paddingBottom={2}>
                {t("page.notfound.emoji")}
            </Typography>
            <Typography variant="h2">
                {t("page.notfound.message")}
            </Typography>
        </CenteredContainer>
    );
}
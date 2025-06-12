import {Typography} from "@mui/material";
import {useEffect} from "react";
import { useTranslation } from "react-i18next";

import CenteredContainer from "@components/CenteredContainer";
import {useLabel} from "@hooks/useLabel";

export default function NotFoundPage() {

    const {setLabel} = useLabel();
    const {t} = useTranslation("notfound");

    useEffect(() => setLabel(t("label")), [setLabel, t]);

    return (
        <CenteredContainer>
            <Typography variant="h1" paddingBottom={2}>
                {t("emoji")}
            </Typography>
            <Typography variant="h2">
                {t("message")}
            </Typography>
        </CenteredContainer>
    );
}
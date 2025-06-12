import {Mail, Person} from "@mui/icons-material";
import {Card, Divider, Link, Stack, Typography} from "@mui/material";
import {useEffect} from "react";
import {Trans, useTranslation} from "react-i18next";

import {useLabel} from "@hooks/useLabel";

export default function TermsPolicyPage() {

    const {setLabel} = useLabel();
    const {t} = useTranslation("terms");

    useEffect(() => setLabel(t("label")), [setLabel, t]);
    
    return (
        <Stack spacing={2}>
            <Typography variant="h4">
                {t("terms.title")}
            </Typography>
            <Divider/>
            <Card>
                <Stack spacing={2} padding={2}>
                    <Typography variant="h5">
                        {t("terms.1.title")}
                    </Typography>
                    <Divider/>
                    <Typography variant="body1">
                        <Trans i18nKey="terms.1.description" ns="terms" components={{
                            br: <><br/><br/></>
                        }}/>
                    </Typography>
                </Stack>
            </Card>
            <Card>
                <Stack spacing={2} padding={2}>
                    <Typography variant="h5">
                        {t("terms.2.title")}
                    </Typography>
                    <Divider/>
                    <Typography variant="body1">
                        <Trans i18nKey="terms.2.description" ns="terms" components={{
                            br: <><br/><br/></>
                        }}/>
                    </Typography>
                </Stack>
            </Card>
            <Card>
                <Stack spacing={2} padding={2}>
                    <Typography variant="h5">
                        {t("terms.3.title")}
                    </Typography>
                    <Divider/>
                    <Typography variant="body1">
                        <Trans i18nKey="terms.3.description" ns="terms" components={{
                            br: <><br/><br/></>
                        }}/>
                    </Typography>
                </Stack>
            </Card>
            <Card>
                <Stack spacing={2} padding={2}>
                    <Typography variant="h5">
                        {t("terms.4.title")}
                    </Typography>
                    <Divider/>
                    <Typography variant="body1">
                        <Trans i18nKey="terms.4.description" ns="terms" components={{
                            br: <><br/><br/></>
                        }}/>
                    </Typography>
                </Stack>
            </Card>
            <Typography variant="h4">
                {t("policy.title")}
            </Typography>
            <Divider/>
            <Card>
                <Stack spacing={2} padding={2}>
                    <Typography variant="h5">
                        {t("policy.1.title")}
                    </Typography>
                    <Divider/>
                    <Typography variant="body1">
                        <Trans i18nKey="policy.1.description" ns="terms" components={{
                            list: <ul></ul>,
                            item: <li></li>,
                            gray: <i style={{color: "gray"}}></i>
                        }}/>
                    </Typography>
                </Stack>
            </Card>
            <Card>
                <Stack spacing={2} padding={2}>
                    <Typography variant="h5">
                        {t("policy.2.title")}
                    </Typography>
                    <Divider/>
                    <Typography variant="body1">
                        {t("policy.2.description")}
                    </Typography>
                </Stack>
            </Card>
            <Typography variant="h4">
                {t("contact")}
            </Typography>
            <Divider/>
            <Card>
                <Stack spacing={2} padding={2}>
                    <Stack direction="row" spacing={2}>
                        <Person/>
                        <Link underline="none" href="https://www.linkedin.com/in/kit-lehto/">Kit Lehto</Link>
                    </Stack>
                    <Stack direction="row" spacing={2}>
                        <Mail/>
                        <Link underline="none" href="mailto:kit.lehto.d@gmail.com">kit.lehto.d@gmail.com</Link>
                    </Stack>
                </Stack>
            </Card>
        </Stack>
    );
}

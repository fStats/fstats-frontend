import {Mail, Person} from "@mui/icons-material";
import {Card, Divider, Link, Stack, Typography} from "@mui/material";
import { t } from "i18next";
import {useEffect} from "react";
import {Trans} from "react-i18next";

import {useLabel} from "@hooks/useLabel";

export default function TermsPolicyPage() {

    const {setLabel} = useLabel();

    useEffect(() => setLabel(t("page.terms.label")), [setLabel]);
    
    return (
        <Stack spacing={2}>
            <Typography variant="h4">
                {t("page.terms.terms.title")}
            </Typography>
            <Divider/>
            <Card>
                <Stack spacing={2} padding={2}>
                    <Typography variant="h5">
                        {t("page.terms.terms.1.title")}
                    </Typography>
                    <Divider/>
                    <Typography variant="body1">
                        <Trans i18nKey="page.terms.terms.1.description" components={{
                            br: <><br/><br/></>
                        }}/>
                    </Typography>
                </Stack>
            </Card>
            <Card>
                <Stack spacing={2} padding={2}>
                    <Typography variant="h5">
                        {t("page.terms.terms.2.title")}
                    </Typography>
                    <Divider/>
                    <Typography variant="body1">
                        <Trans i18nKey="page.terms.terms.2.description" components={{
                            br: <><br/><br/></>
                        }}/>
                    </Typography>
                </Stack>
            </Card>
            <Card>
                <Stack spacing={2} padding={2}>
                    <Typography variant="h5">
                        {t("page.terms.terms.3.title")}
                    </Typography>
                    <Divider/>
                    <Typography variant="body1">
                        <Trans i18nKey="page.terms.terms.3.description" components={{
                            br: <><br/><br/></>
                        }}/>
                    </Typography>
                </Stack>
            </Card>
            <Card>
                <Stack spacing={2} padding={2}>
                    <Typography variant="h5">
                        {t("page.terms.terms.4.title")}
                    </Typography>
                    <Divider/>
                    <Typography variant="body1">
                        <Trans i18nKey="page.terms.terms.4.description" components={{
                            br: <><br/><br/></>
                        }}/>
                    </Typography>
                </Stack>
            </Card>
            <Typography variant="h4">
                {t("page.terms.policy.title")}
            </Typography>
            <Divider/>
            <Card>
                <Stack spacing={2} padding={2}>
                    <Typography variant="h5">
                        {t("page.terms.policy.1.title")}
                    </Typography>
                    <Divider/>
                    <Typography variant="body1">
                        <Trans i18nKey="page.terms.policy.1.description" components={{
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
                        {t("page.terms.policy.2.title")}
                    </Typography>
                    <Divider/>
                    <Typography variant="body1">
                        {t("page.terms.policy.2.description")}
                    </Typography>
                </Stack>
            </Card>
            <Typography variant="h4">
                {t("page.terms.contact")}
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

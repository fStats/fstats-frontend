import {ExpandMore, Forum} from "@mui/icons-material";
import {Accordion, AccordionDetails, AccordionSummary, Card, Link as MUILink, Stack, Typography} from "@mui/material";
import {useEffect} from "react";
import {Trans, useTranslation} from "react-i18next";
import {Link} from "react-router-dom";

import {ExternalLink} from "@components/ExternalLink";
import {useLabel} from "@hooks/useLabel";

export default function FaqPage() {

    const {setLabel} = useLabel();
    const {t} = useTranslation("faq");

    useEffect(() => setLabel(t("label")), [setLabel, t]);

    const faq = [
        {
            question: "faq.1.question",
            answer: <Trans i18nKey="faq.1.answer" ns="faq" components={{
                redirect: <MUILink underline="none" component={Link} to="/terms-policy"/>
            }}/>,
        },
        {
            question: "faq.2.question",
            answer: <Trans i18nKey="faq.2.answer" ns="faq"/>
        },
        {
            question: "faq.3.question",
            answer: <Trans i18nKey="faq.3.answer" ns="faq" components={{
                redirect: <ExternalLink
                    underline="none"
                    href="https://fstats.github.io/fstats-image-generator-editor/"
                    target="_blank"
                    rel="noopener"
                />,
                note: <i style={{color: "gray"}}/>
            }}/>,
        }
    ];

    return (
        <Stack spacing={2}>
            {faq.map((faqItem) => (
                <Card key={faqItem.question}>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMore/>}>
                            <Stack spacing={2} direction="row" alignItems="center">
                                <Forum/>
                                <Typography variant="h5">{t(faqItem.question)}</Typography>
                            </Stack>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography variant="body1" paddingX={4}>
                                {faqItem.answer}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </Card>
            ))}
        </Stack>
    );
}
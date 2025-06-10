import {ExpandMore, Forum} from "@mui/icons-material";
import {Accordion, AccordionDetails, AccordionSummary, Card, Link as MUILink, Stack, Typography} from "@mui/material";
import {t} from "i18next";
import {useEffect} from "react";
import {Trans} from "react-i18next";
import {Link} from "react-router-dom";

import {ExternalLink} from "@components/ExternalLink";
import {useLabel} from "@hooks/useLabel";

export default function FaqPage() {

    const {setLabel} = useLabel();

    useEffect(() => setLabel(t("page.faq.label")), [setLabel]);

    const faq = [
        {
            question: "page.faq.1.question",
            answer: <Trans i18nKey="page.faq.1.answer" components={{
                redirect: <MUILink underline="none" component={Link} to="/terms-policy"/>
            }}/>,
        },
        {
            question: "page.faq.2.question",
            answer: <Trans i18nKey="page.faq.2.answer"/>
        },
        {
            question: "page.faq.3.question",
            answer: <Trans i18nKey="page.faq.3.answer" components={{
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
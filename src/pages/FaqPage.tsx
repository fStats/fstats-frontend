import {ExpandMore, Forum} from "@mui/icons-material";
import {Accordion, AccordionDetails, AccordionSummary, Card, Link as MUILink, Stack, Typography} from "@mui/material";
import { Link } from "react-router-dom";

import {useLabel} from "@hooks/useLabel";

export default function FaqPage() {

    useLabel()?.setLabel("Frequently asked questions")

    const faq = [
        {
            question: "What data is collected from the user?",
            answer: <MUILink underline="none" component={Link} to="/terms-policy">Terms & Policy</MUILink>
        },
        {
            question: "How to change or reset password?",
            answer: "There's no automatic option for that currently. Please contact me, so I can reset your password"
        },
        {
            question: "Where I can found SVG or PNG?",
            answer: <>
                Image can be generated using <MUILink underline="none"
                                                   href="https://fstats.github.io/fstats-image-generator-editor/">microservice</MUILink>. <i
                style={{color: "gray"}}>(Currently support only timeline chart)</i>
            </>
        }
    ]

    return (
        <Stack spacing={2}>
            {faq.map(faq =>
                <Card>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMore/>}>
                            <Stack spacing={2} direction="row" alignItems="center">
                                <Forum/>
                                <Typography variant="h5">{faq.question}</Typography>
                            </Stack>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography variant="body1" paddingX={4}>
                                {faq.answer}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </Card>
            )}
        </Stack>
    )
}

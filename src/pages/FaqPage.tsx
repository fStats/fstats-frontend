import {useLabel} from "../hooks/useLabel";
import {Accordion, AccordionDetails, AccordionSummary, Card, Link, Stack, Typography} from "@mui/material";
import {ExpandMore, Forum} from "@mui/icons-material";

export default function FaqPage() {

    useLabel()?.setLabel("Frequently asked questions")

    const faq = [
        {
            question: "What data is collected from the user?",
            answer: <Link underline="none" href="/terms-policy">Terms & Policy</Link>
        },
        {
            question: "How to change or reset password?",
            answer: "There's no automatic option for that currently. Please contact me, so I can reset your password"
        },
        {
            question: "Where I can found SVG or PNG?",
            answer: <>
                Image can be generated using <Link underline="none"
                                                   href="https://fstats.github.io/fstats-image-generator-editor/">microservice</Link>. <i
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

import {useLabel} from "../hooks/useLabel";
import {Accordion, AccordionDetails, AccordionSummary, Card, Stack, Typography} from "@mui/material";
import {ExpandMore, Forum} from "@mui/icons-material";

export default function FaqPage() {

    useLabel()?.setLabel("Frequently asked questions")

    const faq = [
        {
            question: "What data is collected from the user",
            answer: " - Minecraft Version\n" +
                " - Mod Version\n" +
                " - Operation System\n" +
                " - Location (no IP)\n" +
                " - FabricAPI Version (if mod use it)\n" +
                " - Online Mode"
        },
        {
            question: "How to change or reset password",
            answer: "There's no automatic option for that currently. Please contact me, so I can reset your password"
        }
    ]

    return (
        <Stack spacing={2}>
            {faq.map(faq =>
                <Card>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMore/>}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Stack spacing={2} direction="row" alignItems="center">
                                <Forum/>
                                <Typography variant="h5">{faq.question}</Typography>
                            </Stack>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography whiteSpace="pre-wrap" variant="h6" paddingX={6}>
                                {faq.answer}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </Card>
            )}
        </Stack>
    )
}
import {useLabel} from "../hooks/useLabel";
import {Accordion, AccordionDetails, AccordionSummary, Card, Stack, Typography} from "@mui/material";
import {ExpandMore} from "@mui/icons-material";

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
                            <Typography variant="h6">{faq.question}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography whiteSpace="pre-wrap" variant="h6">
                                {faq.answer}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </Card>
            )}
        </Stack>
    )
}
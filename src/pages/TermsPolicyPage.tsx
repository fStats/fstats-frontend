import {useLabel} from "../hooks/useLabel";
import {Stack, Typography} from "@mui/material";

export default function TermsPolicyPage() {

    useLabel()?.setLabel("Terms & Policy")

    return (
        <Stack spacing={2}>
            <Typography variant="h4">Terms of Use</Typography>
            <Typography variant="h4">Privacy Policy</Typography>
        </Stack>
    )
}
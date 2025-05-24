import {Typography} from "@mui/material";

import CenteredContainer from "@components/CenteredContainer";
import {useLabel} from "@hooks/useLabel";

export default function NotFoundPage() {

    useLabel().setLabel("Who is here O_o ?")

    return (
        <CenteredContainer>
            <Typography variant="h1">404</Typography>
            <Typography variant="h3">🦆 not found</Typography>
        </CenteredContainer>
    )
}
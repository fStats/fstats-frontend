import {Typography} from "@mui/material";
import {useEffect} from "react";

import CenteredContainer from "@components/CenteredContainer";
import {useLabel} from "@hooks/useLabel";

export default function NotFoundPage() {

    const {setLabel} = useLabel();

    useEffect(() => setLabel("Who is here O_o ?"), [setLabel]);

    return (
        <CenteredContainer>
            <Typography variant="h1" paddingBottom={2}>🦆</Typography>
            <Typography variant="h2">NOT FOUND</Typography>
        </CenteredContainer>
    );
}
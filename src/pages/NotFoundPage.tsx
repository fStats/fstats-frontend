import {Typography} from "@mui/material";
import React from "react";
import CenteredContainer from "@fstats/components/CenteredContainer";

export default function NotFoundPage() {
    return (
        <CenteredContainer>
            <Typography variant="h1">404</Typography>
            <Typography variant="h3">🦆 not found</Typography>
        </CenteredContainer>
    )
}
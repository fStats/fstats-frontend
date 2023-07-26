import {Typography} from "@mui/material";
import React from "react";
import {CenteredContainer} from "../components/CenteredContainer";

export function NotFoundPage() {
    return (
        <CenteredContainer>
            <Typography variant="h1">404</Typography>
            <Typography variant="h3">🦆 not found</Typography>
        </CenteredContainer>
    )
}
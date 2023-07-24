import {Typography} from "@mui/material";
import React from "react";
import Box from "@mui/material/Box";

export function NotFoundPage() {
    return (
        <Box style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center"
        }}>
            <Typography variant="h1">404</Typography>
            <Typography variant="h3">🦆 not found</Typography>
        </Box>
    )
}
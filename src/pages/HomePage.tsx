import {Button, Typography} from "@mui/material";
import React from "react";
import Grid2 from "@mui/material/Unstable_Grid2";
import {Link} from "react-router-dom";

export function HomePage() {
    return (
        <Grid2 container spacing={2} direction="column" alignItems="center" padding={12}>
            <Grid2>
                <Typography textAlign="center" variant="h1">Fabric Stats</Typography>
                <Typography textAlign="center" variant="h4">Minecraft metric mod for developers</Typography>
            </Grid2>
            <br/>
            <Grid2>
                <Button variant="contained" component={Link} to="/tutorial">Getting start</Button>
            </Grid2>
        </Grid2>
    )
}
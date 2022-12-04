import {Divider, Typography} from "@mui/material";

export function HomePage() {
    return (
        <div style={
            {
                textAlign: "center",
            }
        }>
                <Typography variant="h1">Fabric Stats</Typography>
                <Divider style={{margin: "16px"}}/>
                <Typography variant="h2">Minecraft metric mod for developers</Typography>
        </div>
    )
}
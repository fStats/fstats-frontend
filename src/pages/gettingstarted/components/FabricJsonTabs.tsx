import {Box, Card, Tab, Tabs, Typography} from "@mui/material";
import {SyntheticEvent, useState} from "react";
import {PrismLight as SyntaxHighlighter} from "react-syntax-highlighter";
import {materialDark} from "react-syntax-highlighter/dist/esm/styles/prism";

import {fabricJsonFull, fabricJsonMinimal} from "./codes";

export default function FabricJsonTabs() {

    const [page, setPage] = useState(0);

    const changeSize = (_: SyntheticEvent<Element, Event>, newSize: number) => setPage(newSize);

    return (
        <Card>
            <Box sx={{borderBottom: 1, borderColor: "divider"}}>
                <Tabs value={page} onChange={changeSize}>
                    <Tab label="Minimal"/>
                    <Tab label="Full"/>
                </Tabs>
            </Box>
            <Typography variant="h6" padding={2}>fabric.mod.json</Typography>
            <SyntaxHighlighter
                customStyle={{margin: 0}}
                language="json"
                style={materialDark}
            >
                {page === 0 ? fabricJsonMinimal : fabricJsonFull}
            </SyntaxHighlighter>
        </Card>
    );
}
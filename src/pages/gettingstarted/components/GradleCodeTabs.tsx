import {Box, Card, Tab, Tabs, Typography} from "@mui/material";
import {SyntheticEvent, useState} from "react";
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter"
import {materialDark} from "react-syntax-highlighter/dist/esm/styles/prism";

import {javaGradleCode, kotlinGradleCode} from "./codes";

export default function GradleCodeTabs() {

    const [page, setPage] = useState(0)

    const changePage = (_: SyntheticEvent<Element, Event>, newPage: number) => setPage(newPage)

    return (
        <Card>
            <Box sx={{borderBottom: 1, borderColor: "divider"}}>
                <Tabs value={page} onChange={changePage}>
                    <Tab label="Kotlin"/>
                    <Tab label="Java"/>
                </Tabs>
            </Box>
            {page === 0 && (
                <>
                    <Typography variant="h6" padding={2}>build.gradle.kts</Typography>
                    <SyntaxHighlighter customStyle={{margin: 0}} language="kts" style={materialDark}>
                        {kotlinGradleCode}
                    </SyntaxHighlighter>
                </>
            )}
            {page === 1 && (
                <>
                    <Typography variant="h6" padding={2}>build.gradle</Typography>
                    <SyntaxHighlighter customStyle={{margin: 0}} language="groovy" style={materialDark}>
                        {javaGradleCode}
                    </SyntaxHighlighter>
                </>
            )}
        </Card>
    );
}
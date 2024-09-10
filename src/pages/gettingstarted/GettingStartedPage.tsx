import {Prism as SyntaxHighlighter} from "react-syntax-highlighter"
import {useLabel} from "../../hooks/useLabel";
import {Box, Card, Link as MUILink, Stack, Tab, Tabs, Typography} from "@mui/material";
import {materialDark} from "react-syntax-highlighter/dist/esm/styles/prism";
import {fabricJsonSetup, fabricJsonSuggests, javaGradleCode, kotlinGradleCode} from "./codes";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

export default function GettingStartedPage() {

    const {setLabel} = useLabel()
    const [page, setPage] = useState(0)

    useEffect(() => setLabel("Getting started"), []);

    return (
        <Stack spacing={2}>
            <Typography variant="h4">
                The first thing that you need to do is <MUILink component={Link} underline="none"
                                                                to={"/register"}>register</MUILink>,
                then <MUILink component={Link} underline="none" to={"/profile"}>create</MUILink> a project and get it
                projectId
            </Typography>
            <Typography variant="h5">Adding library as/to dependency</Typography>
            <Card>
                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <Tabs value={page} onChange={(_, newPage) => setPage(newPage)}>
                        <Tab label="Kotlin"/>
                        <Tab label="Java"/>
                    </Tabs>
                </Box>
                {page === 0 ? <>
                    <Typography variant="h6" padding={2}>build.gradle.kts</Typography>
                    <SyntaxHighlighter customStyle={{margin: 0}} language="groovy" style={materialDark}>
                        {kotlinGradleCode}
                    </SyntaxHighlighter>
                </> : page === 1 ? <>
                    <Typography variant="h6" padding={2}>build.gradle</Typography>
                    <SyntaxHighlighter customStyle={{margin: 0}} language="groovy" style={materialDark}>
                        {javaGradleCode}
                    </SyntaxHighlighter>
                </> : null}
            </Card>
            <Card>
                <Typography variant="h6" padding={2}>fabric.mod.json</Typography>
                <SyntaxHighlighter customStyle={{margin: 0}} language="json" style={materialDark}>
                    {fabricJsonSuggests}
                </SyntaxHighlighter>
            </Card>
            <Typography variant="h5">Setup project</Typography>
            <Card>
                <Typography variant="h6" padding={2}>fabric.mod.json</Typography>
                <SyntaxHighlighter customStyle={{margin: 0}} language="json" style={materialDark}>
                    {fabricJsonSetup}
                </SyntaxHighlighter>
            </Card>
        </Stack>
    )
}
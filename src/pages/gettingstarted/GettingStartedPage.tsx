import {Box, Card, Link as MUILink, Stack, Tab, Tabs, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter"
import {materialDark} from "react-syntax-highlighter/dist/esm/styles/prism";

import {useLabel} from "@hooks/useLabel";

import {fabricJsonFull, fabricJsonMinimal, javaGradleCode, kotlinGradleCode} from "./codes";

export default function GettingStartedPage() {

    const {setLabel} = useLabel()
    const [lang, setLang] = useState(0)
    const [size, setSize] = useState(0)

    useEffect(() => setLabel("Getting started"), [setLabel]);

    return (
        <Stack spacing={2}>

            <Typography variant="h5">
                1. <MUILink component={Link} underline="none" to={"/register"}>Register account</MUILink>
            </Typography>

            <Typography variant="h5">
                2. <MUILink component={Link} underline="none" to={"/profile"}>Create project</MUILink>
            </Typography>

            <Typography variant="h5">
                3. Add library to your project gradle
            </Typography>
            <Card>
                <Box sx={{borderBottom: 1, borderColor: "divider"}}>
                    <Tabs value={lang} onChange={(_, newPage) => setLang(newPage)}>
                        <Tab label="Kotlin"/>
                        <Tab label="Java"/>
                    </Tabs>
                </Box>
                {lang === 0 && <>
                    <Typography variant="h6" padding={2}>build.gradle.kts</Typography>
                    <SyntaxHighlighter customStyle={{margin: 0}} language="groovy" style={materialDark}>
                        {kotlinGradleCode}
                    </SyntaxHighlighter>
                </>}
                {lang === 1 && <>
                    <Typography variant="h6" padding={2}>build.gradle</Typography>
                    <SyntaxHighlighter customStyle={{margin: 0}} language="groovy" style={materialDark}>
                        {javaGradleCode}
                    </SyntaxHighlighter>
                </>}
            </Card>

            <Typography variant="h5">
                4. Added mod as dependency and projectId to your fabric.mod.json
            </Typography>
            <Card>
                <Box sx={{borderBottom: 1, borderColor: "divider"}}>
                    <Tabs value={size} onChange={(_, newPage) => setSize(newPage)}>
                        <Tab label="Minimal"/>
                        <Tab label="Full"/>
                    </Tabs>
                </Box>
                <Typography variant="h6" padding={2}>fabric.mod.json</Typography>
                {size === 0 && <>
                    <SyntaxHighlighter customStyle={{margin: 0}} language="json" style={materialDark}>
                        {fabricJsonMinimal}
                    </SyntaxHighlighter>
                </>}
                {size === 1 && <SyntaxHighlighter customStyle={{margin: 0}} language="json" style={materialDark}>
                    {fabricJsonFull}
                </SyntaxHighlighter>}
            </Card>


            <Typography variant="h5">
                5. When data come you can see it on your project page
            </Typography>
        </Stack>
    )
}
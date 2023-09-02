import {Button, Card, Container, Stack, TextField, Typography} from "@mui/material";
import React, {useState} from "react";
import {useCreateProject} from "../services/projects";
import {useAuth} from "../hooks/useAuth";
import {Project} from "../services/types";
import {useSnackbar} from "notistack";
import {useNavigate} from "react-router-dom";
import {Loader} from "../components/Loader";

export function CreateProjectPage() {

    const {token} = useAuth()!!
    const {enqueueSnackbar} = useSnackbar()
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [project, setProject] = useState<Project>()

    const {data, status, error} = useCreateProject(project, token)

    const isNameInvalid = !(name.trim().length > 1 && name[0]?.trim()?.length !== 0)

    if (status === "loading" && project) return (<Loader/>)

    if (status === "error" && project) {
        enqueueSnackbar(error.message, {variant: "error"})
        setProject(undefined)
    }

    if (status === "success" && project) {
        enqueueSnackbar(data.message, {variant: "success"})
        setProject(undefined)
        navigate("/profile")
    }

    return <Container maxWidth="xs" sx={{padding: 4}}>
        <Card>
            <Stack padding={2} spacing={2}>
                <Typography variant="h4" align="center">Create new project</Typography>
                <TextField label="Name" variant="standard" onChange={(event) => setName(event.target.value)}/>
                <Button autoFocus disabled={isNameInvalid} onClick={() => setProject({name: name})}>Create</Button>
            </Stack>
        </Card>
    </Container>
}
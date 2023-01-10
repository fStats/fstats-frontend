import React, {useEffect, useState} from "react";
import {Card, CardContent, SpeedDial, Stack, Typography, CardActionArea} from "@mui/material";
import Grid2 from '@mui/material/Unstable_Grid2';
import {Add} from "@mui/icons-material";
import {ProfileImage} from "./components/ProfileImage";
import {useNavigate, useParams} from "react-router-dom";
import {getUserProjects} from "../../service/FStatsApi";
import {Project} from "../../dto/Project";

export function ProfilePage() {
    const [projects, setProjects] = useState([] as Array<Project>);

    const navigate = useNavigate()
    const {username} = useParams();

    useEffect(() => {
        if (username != null) {
            getUserProjects(username)
                .then(projects => setProjects(projects))
                .catch(() => {
                    navigate(`../notfound`)
                })
        }
    }, []);

    return (
        <Grid2 container spacing={2} padding={2}>
            <Grid2 xs={2}>
                <Card>
                    <ProfileImage/>
                    <CardContent>
                        <Typography variant="h5" textAlign="center">{username}</Typography>
                    </CardContent>
                </Card>
            </Grid2>
            <Grid2 xs={10}>
                <Stack spacing={2}>
                    {projects.map((project: Project) => (
                        <Card>
                            <CardActionArea onClick={() => navigate(`//./mods/${project.id}`, {
                                state: {
                                    title: project.name
                                }
                            })}>
                                <CardContent>
                                    {project.name}
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    ))}
                </Stack>
            </Grid2>
            <SpeedDial ariaLabel="Create project"
                       sx={{position: 'absolute', bottom: 16, right: 16}}
                       icon={<Add/>}/>
        </Grid2>
    )
}
import {Card, CardActionArea, CardContent, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2";
import {Project} from "../services/types";
import {useProjects} from "../services/projects";

export function ModsListPage() {
    const {data, status, error} = useProjects()
    const navigate = useNavigate()

    if (status === "loading") return (<></>)

    if (status === "error") return (<>{error}</>)

    return (
        <Grid container spacing={2} justifyContent="center" padding={4}>
            {
                data.map((project: Project) => (
                    <Grid xs={8} sm={6} md={4} xl={2}>
                        <Card>
                            <CardActionArea onClick={() => navigate(`${project.id}`, {
                                state: {
                                    title: project.name
                                }
                            })}>
                                <CardContent>
                                    <Typography>{project.name}</Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))
            }
        </Grid>
    )
}
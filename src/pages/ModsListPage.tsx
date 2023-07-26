import {Card, CardActionArea, CardContent, Typography} from "@mui/material";
import {useLoaderData, useNavigate} from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2";
import {Project} from "../services/types";

export function ModsListPage() {
    const mods = useLoaderData() as Project[]
    const navigate = useNavigate()

    return (
        <Grid container spacing={2} justifyContent="center" padding={4}>
            {
                mods.map((project: Project) => (
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
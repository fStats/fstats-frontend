import {Card, CardActionArea, CardContent, Typography} from "@mui/material";
import {useLoaderData, useNavigate} from "react-router-dom";
import {Project} from "../dto/Project";
import Grid from "@mui/material/Unstable_Grid2";

export function ModsListPage() {
    const mods = useLoaderData() as Array<Project>
    const navigate = useNavigate()

    return (
        <Grid container spacing={2} justifyContent="center" padding={4}>
            {
                mods.map((data) => (
                    <Grid xs={8} sm={6} md={4} xl={2}>
                        <Card>
                            <CardActionArea onClick = {() => navigate(`${data.id}`)}>
                                <CardContent>
                                    <Typography>{data.name}</Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))
            }
        </Grid>
    )
}
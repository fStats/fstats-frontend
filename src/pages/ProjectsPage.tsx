import {Card, CardActionArea, CardContent, Typography} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"
import {useProjects} from "../services/projects"
import {Loader} from "../components/Loader"
import {Project} from "../services/types";
import {useNavigate} from "react-router-dom";
import {useLabel} from "../hooks/useLabel";
import {useSnackbar} from "notistack";

export default function ProjectsPage() {

    useLabel()?.setLabel("Projects catalogue")

    const {data, status, error} = useProjects()
    const navigate = useNavigate()
    const {enqueueSnackbar} = useSnackbar();

    if (status === "loading") return <Loader/>

    if (status === "error") {
        enqueueSnackbar(error?.message, {variant: "error"})
        navigate('/not-found')
        return <></>
    }

    return (
        <>
            {data.length > 0 ? <Grid container spacing={2} justifyContent="center">
                {data.map((project: Project) => (
                    <Grid xs={8} sm={6} md={4} xl={2}>
                        <Card>
                            <CardActionArea onClick={() => navigate(`${project.id}`)}>
                                <CardContent>
                                    <Typography variant="body1" overflow="hidden"
                                                textOverflow="ellipsis"><b>{project.name}</b></Typography>
                                    <Typography variant="body2" overflow="hidden" textOverflow="ellipsis"
                                                textAlign="right">
                                        Owner by: <b>{project.owner?.username}</b>
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid> : <Typography variant="h4" textAlign="center">No project available</Typography>}
        </>
    )
}
import {useLabel} from "../../hooks/useLabel";
import {useAuth} from "../../hooks/useAuth";
import {Project, User} from "../../services/types";
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Fab,
    FormControl,
    Icon,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TextField,
    Tooltip,
    Typography
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useSnackbar} from "notistack";
import {useEffect, useState} from "react";
import {Loader} from "../../components/Loader";
import {useUserProjects} from "../../services/users";
import {Add, Delete, Edit} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import DeleteProjectDialog from "./dialog/DeleteProjectDialog.tsx";
import CreateProjectDialog from "./dialog/CreateProjectDialog.tsx";
import {useSettings} from "../../hooks/useSettings.tsx";
import EditUserDialog from "./dialog/EditUserDialog.tsx";
import DeleteUserDialog from "./dialog/DeleteUserDialog.tsx";
import {getUserFromJWT} from "../../mics/decoder/jwt.ts";

export default function ProfilePage() {

    const {token} = useAuth()

    const user: User = getUserFromJWT(token)

    const {setLabel} = useLabel()

    const {
        colors, setColors,
        language, setLanguage
    } = useSettings()

    const {data: projects, status, error} = useUserProjects(user.id!!)

    const [hidedProjectsCount, setHidedProjectsCount] = useState(0)

    const navigate = useNavigate()

    const {enqueueSnackbar} = useSnackbar();

    const [page, setPage] = useState(0);

    const [deleteOpen, setDeleteOpen] = useState(false);
    const [createOpen, setCreateOpen] = useState(false);
    const [editUserOpen, setEditUserOpen] = useState(false);
    const [removeUserOpen, setRemoveUserOpen] = useState(false);

    const [selectedProject, setSelectedProject] = useState<number>(0)

    useEffect(() => {
        projects && setHidedProjectsCount(projects.filter(project => !project.is_visible).length)
        projects && projects.sort((a, b) => {
            if (a.id === undefined) return 1;
            if (b.id === undefined) return -1;
            return a.id - b.id;
        });
        setLabel("Profile")
    }, [projects]);

    useEffect(() => {
        localStorage.setItem("settings", JSON.stringify({
            language: language,
            colors: colors
        }));
    }, [language, colors]);

    if (status === "loading") return <Loader/>

    if (status === "error") {
        enqueueSnackbar(error?.message, {variant: "error"})
        navigate("/not-found")
        return <></>
    }

    console.log(projects)

    const openProject = (id: number) => navigate(`/project/${id}`);

    return (
        <>
            <DeleteProjectDialog projectId={selectedProject} open={deleteOpen} setOpen={setDeleteOpen}/>
            <CreateProjectDialog open={createOpen} setOpen={setCreateOpen}/>
            <EditUserDialog open={editUserOpen} setOpen={setEditUserOpen}/>
            <DeleteUserDialog open={removeUserOpen} setOpen={setRemoveUserOpen}/>
            <Stack spacing={2}>
                <Stack direction="row" spacing={2}>
                    <Card sx={{minWidth: 300}}>
                        <CardContent>
                            <Stack spacing={2}>
                                <Stack spacing={2} direction="row">
                                    <Stack flexGrow={1}>
                                        <Typography variant="h5">Info</Typography>
                                        <Typography variant="h6"><b>{user.username}</b></Typography>
                                        <Typography><b>{projects.length}</b> projects</Typography>
                                        {hidedProjectsCount > 0 && <Typography color="#ffb74d">
                                            <b>{hidedProjectsCount}</b> hided projects
                                        </Typography>}
                                    </Stack>
                                </Stack>
                                <Stack spacing={2} direction="row">
                                    <Button sx={{flexGrow: 1}} variant="contained" startIcon={<Edit/>}
                                            onClick={() => setEditUserOpen(true)}>
                                        <Typography>Edit</Typography>
                                    </Button>
                                    <Button variant="contained" color="error" startIcon={<Delete/>}
                                            onClick={() => setRemoveUserOpen(true)}>
                                        <Typography>Delete</Typography>
                                    </Button>
                                </Stack>
                            </Stack>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent>
                            <Stack spacing={2} direction="row" alignItems="center">
                                <Stack spacing={2}>
                                    <Typography variant="h5">Settings</Typography>
                                    <Stack direction="row">
                                        <FormControl fullWidth>
                                            <InputLabel>Language</InputLabel>
                                            <Select disabled value={language} label="Language" variant="outlined"
                                                    onChange={event => setLanguage(event.target.value)}>
                                                <MenuItem value="en">
                                                    English (Additional languages will be available later)
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Stack>
                                    <Stack direction="row" spacing={2}>
                                        {colors.map((value, index) =>
                                            <Box sx={{display: 'flex', alignItems: 'flex-end'}} key={index}>
                                                <Icon sx={{mr: 1, my: 0.5, backgroundColor: value}}/>
                                                <TextField
                                                    fullWidth
                                                    label={`Color ${index + 1}`}
                                                    variant="standard"
                                                    value={value}
                                                    onChange={event =>
                                                        setColors(prevState => prevState.map(
                                                            (color, i) => i === index ? event.target.value : color
                                                        ))}
                                                    sx={{
                                                        '& .MuiInput-underline:before': {
                                                            borderBottomColor: value
                                                        },
                                                        '& .MuiInput-underline:hover:before': {
                                                            borderBottomColor: value
                                                        },
                                                        '& .MuiInput-underline:after': {
                                                            borderBottomColor: value
                                                        },
                                                        '& .MuiInputLabel-root': {
                                                            color: value
                                                        }
                                                    }}/>
                                            </Box>
                                        )}
                                    </Stack>
                                </Stack>
                            </Stack>
                        </CardContent>
                    </Card>
                </Stack>
                {projects.length > 0 ?
                    <Paper sx={{width: '100%', overflow: 'hidden'}}>
                        <TableContainer sx={{maxHeight: 600}}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ID</TableCell>
                                        <TableCell>Project name</TableCell>
                                        <TableCell>Project owner</TableCell>
                                        <TableCell align="center">Visible</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {projects.slice(page * 10, page * 10 + 10).map((row: Project) =>
                                        <TableRow hover tabIndex={-1} key={row.id}>
                                            <TableCell onClick={() => {
                                                navigator.clipboard.writeText(row.id!!.toString())
                                                enqueueSnackbar("Project ID copied to clipboard", {variant: "info"})
                                            }}>
                                                {row.id}
                                            </TableCell>
                                            <TableCell onClick={() => openProject(row.id!!)}>
                                                {row.name}
                                            </TableCell>
                                            <TableCell onClick={() => openProject(row.id!!)}>
                                                {row.owner?.username}
                                            </TableCell>
                                            <TableCell sx={{width: 200, p: 0}} onClick={() => openProject(row.id!!)}>
                                                {!row.is_visible &&
                                                    <Alert color="warning" icon={false} variant="outlined"
                                                           sx={{justifyContent: "center", p: 0}}>
                                                        Project hided
                                                    </Alert>}
                                            </TableCell>
                                            <TableCell align="right" sx={{width: 100}}>
                                                <Stack direction="row" spacing={2}>
                                                    <IconButton sx={{padding: 0}} onClick={() => {
                                                        setSelectedProject(row.id!!)
                                                    }}>
                                                        <Edit/>
                                                    </IconButton>
                                                    <IconButton sx={{padding: 0}} onClick={() => {
                                                        setSelectedProject(row.id!!)
                                                        setDeleteOpen(true)
                                                    }}>
                                                        <Delete color="error"/>
                                                    </IconButton>
                                                </Stack>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            component="div"
                            rowsPerPage={10}
                            count={projects.length}
                            page={page}
                            onPageChange={(_, newPage) => setPage(newPage)}
                            rowsPerPageOptions={[]}
                        />
                    </Paper> : <Typography variant="h4" textAlign="center">No project available</Typography>}
            </Stack>
            <Fab color="primary" sx={{position: 'fixed', bottom: 16, right: 16}} onClick={() => setCreateOpen(true)}>
                <Add/>
            </Fab>
        </>
    )
}
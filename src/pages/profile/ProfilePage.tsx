import {Add, Delete, Edit} from "@mui/icons-material";
import {
    Alert,
    Button,
    Card,
    CardContent,
    Fab,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Typography
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {useSnackbar} from "notistack";
import {useEffect, useMemo, useState} from "react";
import {useNavigate} from "react-router-dom";

import {Loader} from "@components/Loader";
import {useAuth} from "@hooks/useAuth";
import {useLabel} from "@hooks/useLabel";
import {Project, User} from "@services/fstats/types";
import {useUserProjects} from "@services/fstats/users";
import {getUserFromJWT} from "@utils/decoders/jwt";

import CreateProjectDialog from "./dialog/CreateProjectDialog";
import DeleteProjectDialog from "./dialog/DeleteProjectDialog";
import DeleteUserDialog from "./dialog/DeleteUserDialog";
import EditProjectDialog from "./dialog/EditProjectDialog";
import EditUserDialog from "./dialog/EditUserDialog";

export default function ProfilePage() {

    const {token} = useAuth();

    const user: User = getUserFromJWT(token);

    const {setLabel} = useLabel();

    const {data: projects, status, error} = useUserProjects(user.id || NaN);

    const [hidedProjectsCount, setHidedProjectsCount] = useState(0);

    const navigate = useNavigate();

    const {enqueueSnackbar} = useSnackbar();

    const [page, setPage] = useState(0);

    const [deleteOpen, setDeleteOpen] = useState(false);
    const [createOpen, setCreateOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [editUserOpen, setEditUserOpen] = useState(false);
    const [removeUserOpen, setRemoveUserOpen] = useState(false);

    const [selectedProject, setSelectedProject] = useState<number>(0);

    const sortedProjects = useMemo(() => projects ? [...projects].sort((a, b) => {
        if (a.id === undefined) return 1;
        if (b.id === undefined) return -1;
        return a.id - b.id;
    }) : [], [projects]);

    useEffect(() => sortedProjects && setHidedProjectsCount(sortedProjects.filter(project => project.is_hidden).length), [sortedProjects]);

    useEffect(() => setLabel("Profile"), [setLabel]);

    if (status === "pending") return <Loader/>;

    if (status === "error") {
        enqueueSnackbar(error?.message, {variant: "error"});
        navigate("/not-found");
        return <></>;
    }

    const openProject = (id: number) => navigate(`/projects/${id}`);

    return (
        <>
            <DeleteProjectDialog projectId={selectedProject} open={deleteOpen} setOpen={setDeleteOpen}/>
            <CreateProjectDialog open={createOpen} setOpen={setCreateOpen}/>
            <EditProjectDialog projectId={selectedProject} open={editOpen} setOpen={setEditOpen}/>
            <EditUserDialog open={editUserOpen} setOpen={setEditUserOpen}/>
            <DeleteUserDialog open={removeUserOpen} setOpen={setRemoveUserOpen}/>
            <Stack spacing={2}>
                <Stack direction="row" spacing={2}>
                    <Card sx={{minWidth: 300}}>
                        <CardContent>
                            <Stack spacing={2}>
                                <Stack spacing={2} direction="row">
                                    <Stack>
                                        <Typography variant="h6"><b>{user.username}</b></Typography>
                                        <Typography><b>{projects.length}</b> projects</Typography>
                                        {hidedProjectsCount > 0 && <Typography color="#ffb74d">
                                            <b>{hidedProjectsCount}</b> hided projects
                                        </Typography>}
                                    </Stack>
                                    <Stack spacing={2} direction="row">
                                        <Button variant="contained" startIcon={<Edit/>}
                                                onClick={() => setEditUserOpen(true)}>
                                            <Typography>Edit</Typography>
                                        </Button>
                                        <Button variant="contained" color="error" startIcon={<Delete/>}
                                                onClick={() => setRemoveUserOpen(true)}>
                                            <Typography>Delete</Typography>
                                        </Button>
                                    </Stack>
                                </Stack>
                            </Stack>
                        </CardContent>
                    </Card>
                </Stack>
                {sortedProjects.length > 0 ?
                    <Paper sx={{width: "100%", overflow: "hidden"}}>
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
                                    {sortedProjects.slice(page * 10, page * 10 + 10).map((row: Project) =>
                                        <TableRow hover tabIndex={-1} key={row.id}>
                                            <TableCell onClick={() => {
                                                navigator.clipboard.writeText(row.id!.toString()).then(() =>
                                                    enqueueSnackbar("Project ID copied to clipboard", {variant: "info"})
                                                );
                                            }}>
                                                {row.id}
                                            </TableCell>
                                            <TableCell onClick={() => openProject(row.id!)}>
                                                {row.name}
                                            </TableCell>
                                            <TableCell onClick={() => openProject(row.id!)}>
                                                {row.owner?.username}
                                            </TableCell>
                                            <TableCell sx={{paddingY: 0}} onClick={() => openProject(row.id!)}>
                                                {row.is_hidden &&
                                                    <Alert color="warning" icon={false} variant="outlined"
                                                           sx={{justifyContent: "center", p: 0}}>
                                                        {row.hiding_reason}
                                                    </Alert>}
                                            </TableCell>
                                            <TableCell align="right" sx={{width: 100}}>
                                                <Stack direction="row" spacing={2}>
                                                    <IconButton sx={{padding: 0}} onClick={() => {
                                                        setSelectedProject(row.id!);
                                                        setEditOpen(true);
                                                    }}>
                                                        <Edit/>
                                                    </IconButton>
                                                    <IconButton sx={{padding: 0}} onClick={() => {
                                                        setSelectedProject(row.id!);
                                                        setDeleteOpen(true);
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
                            count={sortedProjects.length}
                            page={page}
                            onPageChange={(_, newPage) => setPage(newPage)}
                            rowsPerPageOptions={[]}
                        />
                    </Paper> : <Typography variant="h4" textAlign="center">No project available</Typography>}
            </Stack>
            <Fab color="primary" sx={{position: "fixed", bottom: 16, right: 16}} onClick={() => setCreateOpen(true)}>
                <Add/>
            </Fab>
        </>
    );
}

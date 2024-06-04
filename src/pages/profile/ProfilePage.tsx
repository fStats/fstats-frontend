import {useLabel} from "../../hooks/useLabel";
import {useAuth} from "../../hooks/useAuth";
import {User} from "../../services/types";
import {
    Fab,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Typography
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useSnackbar} from "notistack";
import {useState} from "react";
import {Loader} from "../../components/Loader";
import {useUserProjects} from "../../services/users";
import {Add, Delete} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import DeleteProjectDialog from "../../components/dialogs/DeleteProjectDialog";
import CreateProjectDialog from "../../components/dialogs/CreateProjectDialog";

export default function ProfilePage() {

    const {token} = useAuth()!!

    let user: User = JSON.parse(atob(token.split('.')[1]))

    useLabel()?.setLabel(user.username)

    const {data: projects, status, error} = useUserProjects(user.id!!)

    const navigate = useNavigate()

    const {enqueueSnackbar} = useSnackbar();

    const [page, setPage] = useState(0);

    const [deleteOpen, setDeleteOpen] = useState(false);
    const [createOpen, setCreateOpen] = useState(false);

    const [selectedProject, setSelectedProject] = useState<number>(0)

    if (status === "loading") return <Loader/>

    if (status === "error") {
        enqueueSnackbar(error?.message, {variant: "error"})
        navigate("/not-found")
        return <></>
    }

    const openProject = (id: number) => navigate(`/project/${id}`);

    return (
        <>
            <DeleteProjectDialog projectId={selectedProject} open={deleteOpen} setOpen={setDeleteOpen}/>
            <CreateProjectDialog open={createOpen} setOpen={setCreateOpen}/>
            {projects.length > 0 ?
                <Paper sx={{width: '100%', overflow: 'hidden'}}>
                    <TableContainer sx={{maxHeight: 600}}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Project name</TableCell>
                                    <TableCell>Project owner</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {projects.slice(page * 10, page * 10 + 10).map((row) =>
                                    <TableRow hover tabIndex={-1} key={row.name}>
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
                                        <TableCell align="right" sx={{width: 100}}>
                                            <IconButton sx={{padding: 0}} onClick={() => {
                                                setSelectedProject(row.id!!)
                                                setDeleteOpen(true)
                                            }}>
                                                <Delete color="error"/>
                                            </IconButton>
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
            <Fab color="primary" sx={{position: 'fixed', bottom: 16, right: 16}} onClick={() => setCreateOpen(true)}>
                <Add/>
            </Fab>
        </>
    )
}
import {
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
import {useProjects} from "../services/projects"
import {Loader} from "../components/Loader"
import {useNavigate} from "react-router-dom";
import {useLabel} from "../hooks/useLabel";
import {useSnackbar} from "notistack";
import {useState} from "react";

export default function ProjectsPage() {

    useLabel()?.setLabel("Projects catalogue")

    const {data, status, error} = useProjects()
    const navigate = useNavigate()
    const {enqueueSnackbar} = useSnackbar();

    const [page, setPage] = useState(0);

    if (status === "loading") return <Loader/>

    if (status === "error") {
        enqueueSnackbar(error?.message, {variant: "error"})
        navigate('/not-found')
        return <></>
    }

    return (
        <>
            {data.length > 0 ?
                <Paper sx={{width: '100%', overflow: 'hidden'}}>
                    <TableContainer sx={{maxHeight: 600}}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        Project name
                                    </TableCell>
                                    <TableCell>
                                        Project owner
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.slice(page * 10, page * 10 + 10).map((row) =>
                                    <TableRow hover tabIndex={-1} key={row.name}
                                              onClick={() => navigate(`/project/${row.id}`)}>
                                        <TableCell>
                                            {row.name}
                                        </TableCell>
                                        <TableCell>
                                            {row.owner?.username}
                                        </TableCell>
                                    </TableRow>)}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        component="div"
                        rowsPerPage={10}
                        count={data.length}
                        page={page}
                        onPageChange={(_, newPage) => setPage(newPage)}
                        rowsPerPageOptions={[]}
                    />
                </Paper>
                : <Typography variant="h4" textAlign="center">No project available</Typography>}
        </>
    )
}
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TextField,
    Typography
} from "@mui/material";
import {useProjects} from "../services/projects"
import {Loader} from "../components/Loader"
import {useNavigate, useSearchParams} from "react-router-dom";
import {useLabel} from "../hooks/useLabel";
import {useSnackbar} from "notistack";
import {useState} from "react";
import {Project} from "../services/types.ts";

export default function ProjectsPage() {

    useLabel()?.setLabel("Projects catalogue")

    const [searchParams, setSearchParams] = useSearchParams();
    const [searchFilter, setSearchFilter] = useState("")
    const {data, status, error} = useProjects()
    const navigate = useNavigate()
    const {enqueueSnackbar} = useSnackbar();

    const page = Number.parseInt(searchParams.get('page') || "0") || 0;

    if (status === "loading") return <Loader/>

    if (status === "error") {
        enqueueSnackbar(error?.message, {variant: "error"})
        navigate('/not-found')
        return <></>
    }

    const filteredData = (): Project[] => searchFilter.length > 0 ? data.filter((value) => value.name.toLowerCase().includes(searchFilter.toLowerCase())) : data
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * 10 - (filteredData()?.length ?? 0)) : 0;

    return (
        <>
            <TextField sx={{flexGrow: 1, paddingBottom: 2}} fullWidth variant="outlined"
                       placeholder="Enter project name"
                       value={searchFilter}
                       onChange={event => {
                           setSearchFilter(event.target.value);
                           searchParams.set("page", "0")
                       }}/>
            {data.length > 0 ?
                <Paper sx={{width: '100%', overflow: 'hidden'}}>
                    <TableContainer>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Project name</TableCell>
                                    <TableCell>Project owner</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {(10 > 0 ? filteredData().slice(page * 10, page * 10 + 10) : filteredData()).map((row) => (
                                    <TableRow hover tabIndex={-1} key={row.name}
                                              onClick={() => navigate(`/project/${row.id}`)}>
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell>{row.owner?.username}</TableCell>
                                    </TableRow>
                                ))}
                                {emptyRows > 0 && (
                                    <TableRow style={{height: 53 * emptyRows}}>
                                        <TableCell colSpan={6}/>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                        <TablePagination
                            component="div"
                            rowsPerPage={10}
                            count={filteredData().length}
                            page={page}
                            onPageChange={(_, newPage) => setSearchParams({page: newPage.toString()})}
                            rowsPerPageOptions={[]}
                        />
                </Paper> : <Typography variant="h4" textAlign="center">No project available</Typography>}
        </>
    )
}
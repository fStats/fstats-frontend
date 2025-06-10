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
import {t} from "i18next";
import {useSnackbar} from "notistack";
import {useEffect, useMemo, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";

import {Loader} from "@components/Loader";
import {useLabel} from "@hooks/useLabel";
import {getTranslateKey} from "@services/fstats/i18n/serverMessages";
import {useProjects} from "@services/fstats/projects";

export default function ProjectsPage() {

    const {setLabel} = useLabel();

    const [searchParams, setSearchParams] = useSearchParams();
    const [searchFilter, setSearchFilter] = useState("");
    const {data, status, error} = useProjects();
    const navigate = useNavigate();
    const {enqueueSnackbar} = useSnackbar();

    const page = Number.parseInt(searchParams.get("page") || "0") || 0;

    useEffect(() => setLabel(t("page.projects.label")), [setLabel]);

    const filteredData = useMemo(() => data ? (searchFilter.length > 0
        ? data.filter((value) => !value.is_hidden && value.name.toLowerCase().includes(searchFilter.toLowerCase()))
        : data.filter((value) => !value.is_hidden)).sort((a, b) => {
        if (a.name === undefined) return 1;
        if (b.name === undefined) return -1;
        return a.name.toLowerCase().charCodeAt(0) - b.name.toLowerCase().charCodeAt(0);
    }) : [], [data, searchFilter]);

    if (status === "pending") return <Loader/>;

    if (status === "error") {
        enqueueSnackbar(getTranslateKey(error?.message), {variant: "error"});
        navigate("/not-found");
        return <></>;
    }

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * 10 - (filteredData.length ?? 0)) : 0;

    return (
        <>
            <TextField sx={{flexGrow: 1, paddingBottom: 2}} fullWidth variant="outlined"
                       placeholder={t("page.projects.field")}
                       value={searchFilter}
                       onChange={event => {
                           setSearchFilter(event.target.value);
                           searchParams.set("page", "0");
                       }}/>
            {data.length > 0 ?
                <Paper sx={{width: "100%", overflow: "hidden"}}>
                    <TableContainer>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>{t("page.projects.table.project")}</TableCell>
                                    <TableCell>{t("page.projects.table.owner")}</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredData.slice(page * 10, page * 10 + 10).map((row) => (
                                    <TableRow hover tabIndex={-1} key={row.id}
                                              onClick={() => navigate(`/projects/${row.id}`)}>
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
                        count={filteredData.length}
                        page={page}
                        onPageChange={(_, newPage) => setSearchParams({page: newPage.toString()})}
                        rowsPerPageOptions={[]}
                    />
                </Paper> : <Typography variant="h4" textAlign="center">{t("page.projects.empty")}</Typography>}
        </>
    );
}

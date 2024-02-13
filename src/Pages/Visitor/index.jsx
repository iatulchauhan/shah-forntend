import React, { useEffect, useState } from 'react'
import { styled } from "@mui/material/styles";
import { makeStyles } from "tss-react/mui";
import {
    Table,
    TableRow,
    TableHead,
    TableContainer,
    Box,
    Grid,
} from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import Assets from '../../Components/Common/ImageContainer';
import PaperContainer from '../../Components/Common/PaperContainer';
import TableHeading from '../../Components/Common/CommonTableHeading';
import CommonModal from '../../Components/Common/CommonModel';
import CommonPagination from '../../Components/Common/Pagination';
import { Regex } from '../../Utils/regex';
import { useAppContext } from '../../Context/context';
import axios from "../../APiSetUp/axios";
import swal from 'sweetalert';
import DataNotFound from '../../Components/Common/DataNotFound';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import AddVisitor from '../../Components/Visitor';
import { lightTheme } from '../../theme';
import { Roles } from '../../Utils/enum';
import WidgetLoader from '../../Components/Common/widgetLoader';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        fontWeight: 600,
        fontSize: 14,
        color: theme.palette.primary.main,
        fontFamily: "Poppins",
        padding: 5
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        fontFamily: "Poppins",
        fontWeight: 500,
        padding: '8px'
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

const useStyles = makeStyles()((theme) => {
    return {
        paddedRow: {
            padding: '15px 10px',
        },
    };
});

const Visitor = () => {
    const { classes } = useStyles();
    const { OnUpdateError, toggleLoader } = useAppContext();

    //States
    const [visitorDetails, setVisitorDetails] = useState([]); 
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);
    const [search, setSearch] = useState("");

    //Handler

    const handleChangePage = (newPage) => { setPage(newPage); };
    const handleChangeRowsPerPage = (value) => { setRowsPerPage(value); setPage(0); };

    const _getVisitor = () => {
        let body = {
            limit: rowsPerPage,
            page: page + 1,
            search: search || "",
            userType: [Roles.Visitor]
        }
        axios.post('/users', body).then((res) => {
            if (res?.data?.data) {
                setVisitorDetails(res?.data?.data)
            }
        }).catch((err) => {
            OnUpdateError(err.data.message);
        });
    }

    useEffect(() => {
        _getVisitor()
    }, [page, rowsPerPage, search]);

    return (
        <>
            <PaperContainer elevation={0} square={false}>
                <Grid container >
                    <Grid item xs={12}>
                        <TableHeading title="Visitor List" handleSearch={(value) => { setSearch(value); }} />
                    </Grid>
                    <Grid item xs={12}>
                        <TableContainer>
                            {visitorDetails?.response != undefined ?
                                <Table sx={{ minWidth: 600 }} aria-label="customized table">
                                    <TableHead >
                                        <TableRow>
                                            <StyledTableCell className={classes.paddedRow}>No.</StyledTableCell>
                                            <StyledTableCell align='center'>Name</StyledTableCell>
                                            <StyledTableCell align='center'>Address</StyledTableCell>
                                            <StyledTableCell align='center'>Contact No.</StyledTableCell>
                                            <StyledTableCell align='center'>Email Address</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {visitorDetails?.response?.length > 0 ? visitorDetails?.response?.map((row, index) => (
                                            <StyledTableRow key={index} >
                                                <StyledTableCell>{index + 1}</StyledTableCell>
                                                <StyledTableCell align='center' className={classes.paddedRow} >
                                                    {row.name}
                                                </StyledTableCell>
                                                <StyledTableCell align='center'>{row.address}</StyledTableCell>
                                                <StyledTableCell align='center'>{row.mobileNo}</StyledTableCell>
                                                <StyledTableCell align='center'>{row.email}</StyledTableCell>
                                            </StyledTableRow>
                                        )) :
                                            <TableRow>
                                                <TableCell colSpan={12}> <DataNotFound icon={<ErrorOutlineIcon color="primary" style={{ fontSize: "3rem" }} />} elevation={2} />
                                                </TableCell>
                                            </TableRow>}
                                    </TableBody>
                                </Table> :
                                <WidgetLoader />
                            }
                        </TableContainer>
                    </Grid>
                    {visitorDetails?.count > 0 && <Grid item xs={12}>
                        <CommonPagination
                            count={visitorDetails?.count}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            onPageChange={handleChangePage}
                        />
                    </Grid>}
                </Grid>
            </PaperContainer>
        </>
    )
}

export default Visitor
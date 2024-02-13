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
import PaperContainer from '../../Components/Common/PaperContainer';
import TableHeading from '../../Components/Common/CommonTableHeading';
import CommonPagination from '../../Components/Common/Pagination';
import { lightTheme } from '../../theme';
import { useAppContext } from '../../Context/context';
import axios from '../../APiSetUp/axios'
import DataNotFound from '../../Components/Common/DataNotFound';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
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
        writeBox: {
            borderRadius: "6px",
            padding: "8px",
            backgroundColor: lightTheme.palette.bgLightExtraPrimary.main,
            color: lightTheme.palette.primary.main,
            cursor: "pointer",
        },
        viewBox: {
            borderRadius: "6px",
            padding: "8px",
            color: lightTheme.palette.bgLightSuccess.main,
            backgroundColor: lightTheme.palette.bgLightExtraSuccess.main,
            cursor: "pointer",
        },
        deleteBox: {
            borderRadius: "6px",
            padding: "8px",
            color: lightTheme.palette.bgLightRed.main,
            backgroundColor: lightTheme.palette.bgLightExtraRed.main,
            cursor: "pointer",
        },
    };
});

const VisitorHistory = () => {
    const { classes } = useStyles();
    const { OnUpdateError, toggleLoader } = useAppContext();
    //States
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [visitorHistoryDetails, setVisitorHistoryDetails] = useState([]);
    const [page, setPage] = useState(0);
    const [search, setSearch] = useState("");
    const handleChangePage = (newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (value) => {
        setRowsPerPage(value);
        setPage(0);
    };

    const _getVisitorHistory = () => {
        let body = {
            limit: rowsPerPage,
            page: page + 1,
            search: search || "",
        }
        axios.post('/visitorHistory', body).then((res) => {
            if (res?.data?.data) {
                setVisitorHistoryDetails(res?.data?.data)
                console.log('res?.data?.data👌', res)
            }
        }).catch((err) => {
            OnUpdateError(err?.data?.message);
        }
        );
    }
    useEffect(() => {
        _getVisitorHistory()
    }, [page, rowsPerPage, search]);
    return (
        <>
            <PaperContainer elevation={0} square={false}>
                <Grid container >
                    <Grid item xs={12}>
                        <TableHeading title="Visitor History" handleSearch={(value) => { setSearch(value); }} />
                    </Grid>
                    <Grid item xs={12}>
                        <TableContainer>
                            {visitorHistoryDetails?.response != undefined ?
                                <Table sx={{ minWidth: 600 }} aria-label="customized table">
                                    <TableHead >
                                        <TableRow>
                                            <StyledTableCell className={classes.paddedRow}>#</StyledTableCell>
                                            <StyledTableCell>Name</StyledTableCell>
                                            <StyledTableCell>Visit Date</StyledTableCell>
                                            <StyledTableCell><Box width={'200px'}>
                                            </Box>Address</StyledTableCell>
                                            <StyledTableCell>Email Id</StyledTableCell>
                                            <StyledTableCell>Reason</StyledTableCell>
                                            <StyledTableCell>Reference</StyledTableCell>
                                            <StyledTableCell>Contact No.</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {visitorHistoryDetails?.response?.length > 0 ? visitorHistoryDetails?.response?.map((row, index) => (
                                            <StyledTableRow key={index} >
                                                <StyledTableCell>{index + 1 + page * rowsPerPage}</StyledTableCell>
                                                <StyledTableCell>{row?.userDetail?.name}</StyledTableCell>
                                                <StyledTableCell>{new Date(row?.createdAt).toDateString()}</StyledTableCell>
                                                <StyledTableCell><Box width={'200px'}>{row?.userDetail?.address}</Box></StyledTableCell>
                                                <StyledTableCell>{row?.userDetail?.email}</StyledTableCell>
                                                <StyledTableCell>{row?.reason}</StyledTableCell>
                                                <StyledTableCell>{row?.reference}</StyledTableCell>
                                                <StyledTableCell>{row?.userDetail?.mobileNo}</StyledTableCell>
                                            </StyledTableRow>
                                        )) : <TableRow>
                                            <TableCell colSpan={12}> <DataNotFound icon={<ErrorOutlineIcon color="primary" style={{ fontSize: "3rem" }} />} elevation={2} />
                                            </TableCell>
                                        </TableRow>}
                                    </TableBody>
                                </Table> :
                                <WidgetLoader />}
                        </TableContainer>
                    </Grid>
                    {visitorHistoryDetails?.count > 0 && <Grid item xs={12}>
                        <CommonPagination
                            count={visitorHistoryDetails?.count}
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

export default VisitorHistory
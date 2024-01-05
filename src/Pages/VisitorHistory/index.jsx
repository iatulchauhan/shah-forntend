import React, { useState } from 'react'
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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        fontWeight: 600,
        fontSize: 16,
        color: theme.palette.primary.main,
        fontFamily: "Poppins",
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
const rows = [
    {
        key: '1',
        name: "John Doe",
        contactNo: '+91 9865998545',
        emailId: 'johndoe@gmail.com',
        activePlan: 'Lorem ipsum',
        expiringPlan: '10 Days',
    },
    {
        key: '2',
        name: "John Doe",
        contactNo: '+91 9865998545',
        emailId: 'johndoe@gmail.com',
        activePlan: 'Lorem ipsum',
        expiringPlan: '10 Days',
    },


];
const VisitorHistory = () => {
    const { classes } = useStyles();
    const { OnUpdateError, toggleLoader } = useAppContext();
    //States
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [visitorHistoryDetails, setVisitorHistoryDetails] = useState([]);
    const [page, setPage] = React.useState(0);
    const handleChangePage = (newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (value) => {
        setRowsPerPage(value);
        setPage(0);
    };

    const _getVisitorHistory = () => {
        toggleLoader();
        let body = {
            limit: rowsPerPage,
            page: page + 1
        }
        axios.post('/visitorHistory', body).then((res) => {
            if (res?.data?.data) {
                setVisitorHistoryDetails(res?.data?.data)
                console.log('res?.data?.data👌', res)
            }
            toggleLoader();
        }).catch((err) => {
            toggleLoader();
            OnUpdateError(err?.data?.message);
        }
        );
    }
    React.useEffect(() => {
        _getVisitorHistory()
    }, [page, rowsPerPage])
    return (
        <>
            <PaperContainer elevation={0} square={false}>
                <Grid container >
                    <Grid item xs={12}>
                        <TableHeading title="Visitor History" />
                    </Grid>
                    <Grid item xs={12}>
                        <TableContainer>
                            <Table sx={{ minWidth: 600 }} aria-label="customized table">
                                <TableHead >
                                    <TableRow>
                                        <StyledTableCell className={classes.paddedRow}>#</StyledTableCell>
                                        <StyledTableCell>Name</StyledTableCell>
                                        <StyledTableCell>Address</StyledTableCell>
                                        <StyledTableCell>Email Id</StyledTableCell>
                                        <StyledTableCell>Contact No.</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {visitorHistoryDetails?.response
                                        ?.map((row, index) => (
                                            <StyledTableRow key={index} >
                                                <StyledTableCell>{index + 1}</StyledTableCell>
                                                <StyledTableCell>{row?.userDetail?.name}</StyledTableCell>
                                                <StyledTableCell>{row?.userDetail?.address}</StyledTableCell>
                                                <StyledTableCell>{row?.userDetail?.email}</StyledTableCell>
                                                <StyledTableCell>{row?.userDetail?.mobileNo}</StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
                <Box p={1}>
                    <CommonPagination
                        count={visitorHistoryDetails?.count}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        onPageChange={handleChangePage}
                    />
                </Box>
            </PaperContainer>
        </>
    )
}

export default VisitorHistory
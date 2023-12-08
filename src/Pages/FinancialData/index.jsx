import React from 'react'
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
import CommonPagination from '../../Components/Common/Pagination';
import Footer from '../../Components/Footer';

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
            width: "20px",
            height: "20px",
            borderRadius: "6px",
            padding: "8px",
            backgroundColor: "rgba(93, 95, 239, 0.2)",
            color: "#5D5FEF",
            cursor: "pointer",
        },
        viewBox: {
            width: "20px",
            height: "20px",
            borderRadius: "6px",
            padding: "8px",
            color: "#44B631",
            backgroundColor: "rgba(113, 239, 93, 0.2)",
            cursor: "pointer",
        },
        deleteBox: {
            width: "20px",
            height: "20px",
            borderRadius: "6px",
            padding: "8px",
            color: "#F14336",
            backgroundColor: "rgba(235, 87, 87, 0.2)",
            cursor: "pointer",
        },
    };
});
const rows = [
    {
        key: '1',
        name: "John Doe",
        investmentAmount: '$2000',
        closingDate: '30-10-2023',
        roi: '7%',
        totalBalance: '$22000',
    },
    {
        key: '2',
        name: "John Doe",
        investmentAmount: '$2000',
        closingDate: '30-10-2023',
        roi: '7%',
        totalBalance: '$22000',
    },
    
];
const FinancialData = () => {
    const { classes } = useStyles();
    //States
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [page, setPage] = React.useState(0);
    const handleChangePage = (newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (value) => {
        setRowsPerPage(value);
        setPage(0);
    };
 
    return (
        <>
            <PaperContainer elevation={0} square={false}>
                <Grid container >
                    <Grid item xs={12}>
                        <TableHeading title="Financial Data History"/>
                    </Grid>
                    <Grid item xs={12}>
                        <TableContainer>
                            <Table sx={{ minWidth: 600 }} aria-label="customized table">
                                <TableHead >
                                    <TableRow>
                                        <StyledTableCell className={classes.paddedRow}>#</StyledTableCell>
                                        <StyledTableCell>Name</StyledTableCell>
                                        <StyledTableCell>Investment Amount</StyledTableCell>
                                        <StyledTableCell>Closing Date</StyledTableCell>
                                        <StyledTableCell>ROI</StyledTableCell>
                                        <StyledTableCell>Total Balance</StyledTableCell>
                                        <StyledTableCell align="center">Action</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row, index) => (
                                        <StyledTableRow key={index} >
                                            <StyledTableCell>{row.key}</StyledTableCell>
                                            <StyledTableCell className={classes.paddedRow} component="th" scope="row">
                                                {row.name}
                                            </StyledTableCell>
                                            <StyledTableCell>{row.investmentAmount}</StyledTableCell>
                                            <StyledTableCell>{row.closingDate}</StyledTableCell>
                                            <StyledTableCell>{row.roi}</StyledTableCell>
                                            <StyledTableCell>{row.totalBalance}</StyledTableCell>
                                            <StyledTableCell>
                                                <Box display={"flex"} justifyContent={"center"} gap={1}>
                                                    <Assets
                                                        className={classes.writeBox}
                                                        src={"/assets/icons/write.svg"}
                                                        absolutePath={true}
                                                    />
                                                    <Assets
                                                        className={classes.deleteBox}
                                                        src={"/assets/icons/delete.svg"}
                                                        absolutePath={true}
                                                    />
                                                </Box>
                                            </StyledTableCell>

                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
                <Box p={1}>
                    <CommonPagination
                        count={100}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        onPageChange={handleChangePage}
                    />
                </Box>
            </PaperContainer>          
            <Footer />

        </>
    )
}

export default FinancialData
import React, { useEffect, useState } from 'react'
import { styled } from "@mui/material/styles";
import { makeStyles } from "tss-react/mui";
import { Table, TableRow, TableHead, TableContainer, Box, Grid, useTheme, } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import PaperContainer from '../../Components/Common/PaperContainer';
import TableHeading from '../../Components/Common/CommonTableHeading';
import CommonPagination from '../../Components/Common/Pagination';
import CommonButton from '../../Components/Common/Button/CommonButton';
import { useLocation } from 'react-router-dom';
import { useAppContext } from '../../Context/context';
import axios from "../../APiSetUp/axios";
import dayjs from "dayjs";
import { closeDate } from '../../Utils/helper';
import { globalAmountConfig } from '../../Utils/globalConfig';
import SettleUpModel from './settleUpModel';
import CommonModal from '../../Components/Common/CommonModel';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        fontWeight: 600,
        fontSize: 14,
        color: theme.palette.primary.main,
        fontFamily: "Poppins",
        padding: 5,
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

const Reminder = () => {
    const { classes } = useStyles();
    const { OnUpdateError, toggleLoader, menuList, user } = useAppContext();
    const location = useLocation();
    const { pathname } = location;
    const theme = useTheme()

    //States
    const [data, setData] = useState({})
    const [reminderList, setReminderList] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);
    const [search, setSearch] = useState("");
    const [selectedReminder, setSelectedReminder] = useState({})
    const [isSettleUpModelOpen, setIsSettleUpModelOpen] = useState(false)
    const [tab, setTab] = React.useState(0);
    const [error, setError] = useState({});

    console.log(tab, "tab")

    //Handler


    const handleTabChange = (event, newValue) => {
        setTab(newValue);
    };


    const handleChangePage = (newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (value) => {
        setRowsPerPage(value);
        setPage(0);
    };

    // const handleValidation = () => {
    //     let formIsValid = true;
    //     let errors = {};

    //     if (!data?.investment) {
    //         formIsValid = false;
    //         errors["investment"] = "* Please enter Investment.";
    //     }
    //     if (!data?.investmentDays) {
    //         formIsValid = false;
    //         errors["investmentDays"] = "* Please enter Investment Days.";
    //     }
    //     if (!data?.returnOfInvestment) {
    //         formIsValid = false;
    //         errors["returnOfInvestment"] = "* Please enter Return Of Investment.";
    //     }
    //     setError(errors);
    //     return formIsValid;
    // };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const submitForReturn = () => {
        // if (handleValidation()) {

        // }
    }


    const submitForInvestment = () => {
        // if (handleValidation()) {

        // }
    }
    const _getReminderList = () => {
        toggleLoader();
        let body = {
            limit: rowsPerPage,
            page: page + 1,
            search: search || "",
        };
        axios.post("/reminderPlanList", body)
            .then((res) => {
                if (res?.data?.data) {
                    setReminderList(res?.data?.data);
                }
                toggleLoader();
            })
            .catch((err) => {
                toggleLoader();
                OnUpdateError(err?.data?.message);
            });
    };

    const handleClear = () => {
        setIsSettleUpModelOpen(false);
        setSelectedReminder({})
        setData({})
        setError({})
        _getReminderList()
    };

    React.useEffect(() => {
        _getReminderList()
    }, [page, rowsPerPage, search]);

    return (
        <>
            <PaperContainer elevation={0} square={false}>
                <Grid container>
                    <Grid item xs={12}>
                        <TableHeading title="Reminder" handleSearch={(value) => { setSearch(value); }} />
                    </Grid>
                    <Grid item xs={12}>
                        <TableContainer>
                            <Table sx={{ minWidth: 600 }} aria-label="customized table">
                                <TableHead >
                                    <TableRow>
                                        <StyledTableCell className={classes.paddedRow}>#</StyledTableCell>
                                        <StyledTableCell>Name</StyledTableCell>
                                        <StyledTableCell>  Investment Date </StyledTableCell>
                                        <StyledTableCell > Closing Date</StyledTableCell>
                                        <StyledTableCell> Investment Amount </StyledTableCell>
                                        <StyledTableCell> Investment Days </StyledTableCell>
                                        <StyledTableCell> Return Amount Of Interest </StyledTableCell>
                                        {/* <StyledTableCell>  </StyledTableCell> */}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {reminderList?.response?.length > 0 ? reminderList?.response?.map((row, index) => (
                                        <StyledTableRow key={index} >
                                            <StyledTableCell>{index + 1 + page * rowsPerPage}</StyledTableCell>
                                            <StyledTableCell className={classes.paddedRow}>{row?.userDetails?.name}</StyledTableCell>
                                            <StyledTableCell>{dayjs(row?.createdAt).format("DD/MM/YYYY")}</StyledTableCell>
                                            <StyledTableCell>{closeDate(row?.createdAt, row?.investmentDays)}</StyledTableCell>
                                            <StyledTableCell>{globalAmountConfig(row?.investment)}</StyledTableCell>
                                            <StyledTableCell >{row?.investmentDays}</StyledTableCell>
                                            <StyledTableCell>{`${(row?.investment * row?.returnOfInvestment) / 100}(${row?.returnOfInvestment}%)`}</StyledTableCell>
                                            {/* <StyledTableCell>
                                                <Box display={"flex"} gap={1}>
                                                    <CommonButton
                                                        width={'90px'}
                                                        text={`Settle Up`}
                                                        padding={"2px 2px"}
                                                        fontSize='11px'
                                                        onClick={(e) => { setSelectedReminder(row); setIsSettleUpModelOpen(true) }}
                                                        background={theme.palette.error.main}
                                                    />
                                                </Box>
                                            </StyledTableCell> */}

                                        </StyledTableRow>
                                    )) : ""}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    {reminderList?.count > 0 && <Grid item xs={12}>
                        <CommonPagination
                            count={reminderList?.count}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            onPageChange={handleChangePage}
                        />
                    </Grid>}
                </Grid>
                {isSettleUpModelOpen && <CommonModal
                    maxWidth={'md'}
                    open={isSettleUpModelOpen}
                    onClose={handleClear}
                    title={`Settle Up For ${selectedReminder?.userDetails?.name}`}
                    content={<SettleUpModel handleChange={handleChange} data={data} tab={tab} selectedReminder={selectedReminder} handleTabChange={handleTabChange} submitForReturn={submitForReturn}
                        submitForInvestment={submitForInvestment} setError={setError} error={error} />}
                />}
            </PaperContainer >
        </>
    )
}

export default Reminder
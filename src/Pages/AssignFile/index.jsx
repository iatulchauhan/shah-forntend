import React, { useEffect, useState } from 'react'
import { alpha, styled } from "@mui/material/styles";
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
import TextLabel from '../../Components/Common/Fields/TextLabel';
import CommonTextField from '../../Components/Common/Fields/TextField';
import SelectDropDown from '../../Components/Common/SelectDropDown';
import CommonButton from '../../Components/Common/Button/CommonButton';
import { Regex } from '../../Utils/regex';
import CommonPagination from '../../Components/Common/Pagination';
import { lightTheme } from '../../theme';
import AutoCompleteSearch from '../../Components/Common/commonAutoComplete';

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
        contact: ' +91 9865998545',
        investmetAmount: '$2000',
        plan: 'Lorem ipsum',
        assignTo: 'William Danny',
    },
    {
        key: '2',
        name: "John Doe",
        contact: ' +91 9865998545',
        investmetAmount: '$2000',
        plan: 'Lorem ipsum',
        assignTo: 'William Danny',
    },
    {
        key: '3',
        name: "John Doe",
        contact: ' +91 9865998545',
        investmetAmount: '$2000',
        plan: 'Lorem ipsum',
        assignTo: 'William Danny',
    },
    {
        key: '4',
        name: "John Doe",
        contact: ' +91 9865998545',
        investmetAmount: '$2000',
        plan: 'Lorem ipsum',
        assignTo: 'William Danny',
    },

];
const AssignFile = () => {
    const { classes } = useStyles();

    //States
    const [model, setModel] = useState(false);
    const [data, setData] = useState({})
    const [error, setError] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [selectedUser, setSelectedUser] = useState("");
    const [page, setPage] = useState(0);
    const handleChangePage = (newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (value) => {
        setRowsPerPage(value);
        setPage(0);
    };

    //Validation
    const handleValidation = () => {
        let formIsValid = true
        let errors = {}
        if (!selectedUser) {
            formIsValid = false;
            errors["selectedUser"] = "*Please select user.";
        }
        if (!data?.investment) {
            formIsValid = false;
            errors["investment"] = "*Please enter Investment.";
        }
        if (!data?.investmentDays) {
            formIsValid = false;
            errors["investmentDays"] = "*Please enter Investment Days.";
        }
        if (!data?.returnOfInvestment) {
            formIsValid = false;
            errors["returnOfInvestment"] = "*Please enter Return Of Investment.";
        }
        setError(errors)
        return formIsValid
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setData((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }
    const handleLoginClick = () => {
        setIsSubmit(true)
        if (handleValidation()) {

        }
        console.log('data', data)
    }
    useEffect(() => {
        if (isSubmit) {
            handleValidation()
        }
    }, [data])
    return (
        <>
            <PaperContainer elevation={0} square={false}>
                <Grid container >
                    <Grid item xs={12}>
                        <TableHeading title="Assign File" buttonText={'Add New File'} onClick={() => setModel(true)} />
                    </Grid>
                    <Grid item xs={12}>
                        <TableContainer>
                            <Table sx={{ minWidth: 600 }} aria-label="customized table">
                                <TableHead >
                                    <TableRow>
                                        <StyledTableCell className={classes.paddedRow}>#</StyledTableCell>
                                        <StyledTableCell>Name</StyledTableCell>
                                        <StyledTableCell>Contact No.</StyledTableCell>
                                        <StyledTableCell>Investment Amount</StyledTableCell>
                                        <StyledTableCell>Plan</StyledTableCell>
                                        <StyledTableCell>Assign To</StyledTableCell>
                                        <StyledTableCell align="right">Action</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row, index) => (
                                        <StyledTableRow key={index} >
                                            <StyledTableCell>{row.key}</StyledTableCell>
                                            <StyledTableCell className={classes.paddedRow} component="th" scope="row">
                                                {row.name}
                                            </StyledTableCell>
                                            <StyledTableCell>{row.contact}</StyledTableCell>
                                            <StyledTableCell>{row.investmetAmount}</StyledTableCell>
                                            <StyledTableCell>{row.plan}</StyledTableCell>
                                            <StyledTableCell>{row.assignTo}</StyledTableCell>
                                            <StyledTableCell>
                                                <Box display={"flex"} justifyContent={"end"} gap={1}>
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

            <CommonModal open={model} onClose={() => setModel(false)} title={"Add New File"}
                content={
                    <Box>
                        <Grid container spacing={1} xs={12} md={12} lg={12} sm={12} p={2}>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <AutoCompleteSearch
                                    fullWidth
                                    backgroundColor="white"
                                    text="Select user"
                                    handleChange={(e, newValue) => setSelectedUser(newValue)}
                                    // options={visitorDetails?.map((e) => `${e?.name}  (${userType?.filter((type) => type?.id === e?.userType)[0]?.label})`) || []}
                                    options={[]}
                                    name="selectedUser"
                                    defaultValue={selectedUser || ""}
                                    freeSolo
                                    blurOnSelect
                                    placeholder={"Select User"}
                                />
                                <TextLabel fontSize={"12px"} color={"red"} fontWeight={"400"} title={!selectedUser ? error?.selectedUser : ""} />
                            </Grid>

                            <Grid item xs={12} sm={12} md={6} lg={4}>
                                <CommonTextField
                                    fontWeight={400}
                                    text={'Investment Amount'}
                                    placeholder={"Enter Investment"}
                                    type='number'
                                    name='investment'
                                    value={data?.investment}
                                    onChange={(e) => handleChange(e)}
                                />
                                <TextLabel fontSize={"12px"} color={"red"} fontWeight={"400"} title={!data?.investment ? error?.investment : ""} />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={4}>
                                <CommonTextField
                                    fontWeight={400}
                                    text={'Investment Days'}
                                    placeholder={"Enter Investment Days"}
                                    type='number'
                                    name='investmentDays'
                                    value={data?.investmentDays}
                                    onChange={(e) => handleChange(e)}
                                />
                                <TextLabel fontSize={"12px"} color={"red"} fontWeight={"400"} title={!data?.investmentDays ? error?.investmentDays : ""} />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={4}>
                                <CommonTextField
                                    fontWeight={400}
                                    text={'Return Of Investment (%)'}
                                    placeholder={"Enter Return Of Investment"}
                                    type='number'
                                    name='returnOfInvestment'
                                    value={data?.returnOfInvestment}
                                    onChange={(e) => handleChange(e)}
                                />
                                <TextLabel fontSize={"12px"} color={"red"} fontWeight={"400"} title={!data?.returnOfInvestment ? error?.returnOfInvestment : ""} />
                            </Grid>

                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <Box style={{ display: 'flex', justifyContent: 'center', marginTop: '35px' }}>
                                    <CommonButton
                                        width={'280px'}
                                        text="Login"
                                        type="submit"
                                        onClick={handleLoginClick}
                                    />
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                }
            />
        </>
    )
}

export default AssignFile
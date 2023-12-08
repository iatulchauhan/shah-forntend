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
import Footer from '../../Components/Footer';
import { lightTheme } from '../../theme';

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
            backgroundColor: lightTheme.palette.bgLightExtraPrimary.main,
            color: lightTheme.palette.primary.main,
            cursor: "pointer",
        },
        viewBox: {
            width: "20px",
            height: "20px",
            borderRadius: "6px",
            padding: "8px",
            color: lightTheme.palette.bgLightSuccess.main,
            backgroundColor: lightTheme.palette.bgLightExtraSuccess.main,
            cursor: "pointer",
        },
        deleteBox: {
            width: "20px",
            height: "20px",
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
    const state = ['Gujarat ', 'Gujarat']
    const city = ['Surat', 'Ahmadabad']
    const braches = ['Surat', 'Ahmadabad']
    const roles = ['Surat', 'Ahmadabad']
    const plan = ['Surat', 'Ahmadabad']

    //States
    const [model, setModel] = useState(false);
    const [data, setData] = useState({})
    const [error, setError] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const [page, setPage] = React.useState(0);
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
        if (!data?.name) {
            formIsValid = false
            errors['name'] = 'Please enter name.'
        }

        if (!data?.contactno) {
            formIsValid = false
            errors['contactno'] = 'Please enter Contact No.'
        }
        if (!data?.investmetAmount) {
            formIsValid = false;
            errors["investmetAmount"] = "please enter Investmet Amount";
        }
        if (!data?.plan) {
            formIsValid = false
            errors['plan'] = 'Please select plan.'
        }
        if (!data?.assignTo) {
            formIsValid = false
            errors['assignTo'] = 'Please select Assign.'
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
                                            <StyledTableCell>{row.contact}</StyledTableCell>
                                            <StyledTableCell>{row.investmetAmount}</StyledTableCell>
                                            <StyledTableCell>{row.plan}</StyledTableCell>
                                            <StyledTableCell>{row.assignTo}</StyledTableCell>
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

            <CommonModal open={model} onClose={() => setModel(false)} title={"Add New User"}
                content={
                    <Box>
                        <Grid container spacing={1} xs={12} md={12} lg={12} sm={12} p={2}>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <CommonTextField
                                    fontWeight={400}
                                    text={'Name'}
                                    placeholder={"Enter User Name"}
                                    type='text'
                                    name='name'
                                    value={data?.name}
                                    onChange={(e) => handleChange(e, false)}
                                />
                                <TextLabel fontSize={"12px"} color={"red"} fontWeight={"400"} title={!data?.name ? error?.name : ""} />
                            </Grid>

                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <CommonTextField
                                    fontWeight={400}
                                    text={'Contact No.'}
                                    placeholder={"Enter Contact No."}
                                    type='number'
                                    name='contactno'
                                    value={data?.contactno}
                                    onChange={(e) => handleChange(e, false)}
                                />
                                <TextLabel fontSize={"12px"} color={"red"} fontWeight={"400"} title={!data?.contactno ? error?.contactno : ""} />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <CommonTextField
                                    fontWeight={400}
                                    text={'Investment Amount'}
                                    placeholder={"Enter Amount"}
                                    type='text'
                                    name='email'
                                    value={data?.investmetAmount}
                                    onChange={(e) => handleChange(e, false)}
                                />
                                <TextLabel fontSize={"12px"} color={"red"} fontWeight={"400"} title={!data?.investmetAmount ? error?.investmetAmount : ""} />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <SelectDropDown
                                    fullWidth
                                    width={'100%'}
                                    values={braches || []}
                                    text="Plan"
                                    name="plan"
                                    value={data?.plan}
                                    onChange={(e) => {
                                        setData({ ...data, braches: e.target.value })
                                    }}
                                />
                                <TextLabel fontSize={"12px"} color={"red"} fontWeight={"400"} title={!data?.plan ? error?.plan : ""} />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <SelectDropDown
                                    fullWidth
                                    width={'100%'}
                                    values={roles || []}
                                    text="Assign To"
                                    name="assignTo"
                                    value={data?.assignTo}
                                    onChange={(e) => {
                                        setData({ ...data, roles: e.target.value })
                                    }}
                                />
                                <TextLabel fontSize={"12px"} color={"red"} fontWeight={"400"} title={!data?.assignTo ? error?.assignTo : ""} />
                            </Grid>

                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <Box style={{ display: 'flex', justifyContent: 'center', marginTop: '35px' }}>
                                    <CommonButton
                                        width={'60%'}
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
            <Footer />

        </>
    )
}

export default AssignFile
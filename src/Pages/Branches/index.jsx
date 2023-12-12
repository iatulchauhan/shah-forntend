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
            borderRadius: "6px",
            padding: "8px",
            backgroundColor: "rgba(93, 95, 239, 0.2)",
            color: "#5D5FEF",
            cursor: "pointer",
        },
        viewBox: {
            borderRadius: "6px",
            padding: "8px",
            color: "#44B631",
            backgroundColor: "rgba(113, 239, 93, 0.2)",
            cursor: "pointer",
        },
        deleteBox: {
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
        address: '121, Quicksand view, Lorem ipsum , India',
    },
    {
        key: '2',
        name: "John Doe",
        address: '121, Quicksand view, Lorem ipsum , India',
    },

];
const Branches = () => {
    const { classes } = useStyles();
    const state = ['Gujarat ', 'Gujarat']
    const city = ['Surat', 'Ahmadabad']

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
        if (!data?.address) {
            formIsValid = false
            errors['address'] = 'Please enter address.'
        }
        if (!data?.country) {
            formIsValid = false
            errors['country'] = 'Please enter country.'
        }
        if (!data?.state) {
            formIsValid = false
            errors['state'] = 'Please select state.'
        }
        if (!data?.city) {
            formIsValid = false
            errors['city'] = 'Please select city.'
        }
        if (!data?.code) {
            formIsValid = false
            errors['code'] = 'Please enter Postal Code.'
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
    const handleClick = () => {
        setIsSubmit(true)
        if (handleValidation()) {

        }
    }
    console.log("error", data, error)
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
                        <TableHeading title="Branch List" buttonText={'Add Branch'} onClick={() => setModel(true)} />
                    </Grid>
                    <Grid item xs={12}>
                        <TableContainer>
                            <Table sx={{ minWidth: 600 }} aria-label="customized table">
                                <TableHead >
                                    <TableRow>
                                        <StyledTableCell className={classes.paddedRow}>#</StyledTableCell>
                                        <StyledTableCell>Branch Name</StyledTableCell>
                                        <StyledTableCell>Address</StyledTableCell>
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
                                            <StyledTableCell>{row.address}</StyledTableCell>
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

            <CommonModal open={model} onClose={() => setModel(false)} title={"Add Branch"}
                content={
                    <Box>
                        <Grid container spacing={1} xs={12} md={12} lg={12} sm={12} p={2}>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <CommonTextField
                                    fontWeight={400}
                                    text={'Branch Name'}
                                    placeholder={"Enter Branch Name"}
                                    type='text'
                                    name='name'
                                    value={data?.name}
                                    onChange={(e) => handleChange(e, false)}
                                />
                                <TextLabel fontSize={"12px"} color={"red"} fontWeight={"400"} title={!data?.name ? error?.name : ""} />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <CommonTextField
                                    fontWeight={400}
                                    text={'Address'}
                                    placeholder={"Enter Address"}
                                    type='text'
                                    name='address'
                                    value={data?.address}
                                    onChange={(e) => handleChange(e, false)}
                                />
                                <TextLabel fontSize={"12px"} color={"red"} fontWeight={"400"} title={!data?.address ? error?.address : ""} />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <CommonTextField
                                    fontWeight={400}
                                    text={'Country'}
                                    placeholder={"Enter Country"}
                                    type='text'
                                    name='country'
                                    value={data?.country}
                                    onChange={(e) => handleChange(e, false)}
                                />
                                <TextLabel fontSize={"12px"} color={"red"} fontWeight={"400"} title={!data?.country ? error?.country : ""} />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <SelectDropDown
                                    fullWidth
                                    width={'100%'}
                                    values={state || []}
                                    value={data?.state}
                                    text="State"
                                    name="state"
                                    onChange={(e) => {
                                        setData({ ...data, state: e.target.value })
                                    }}
                                />
                                <TextLabel fontSize={"12px"} color={"red"} fontWeight={"400"} title={!data?.state ? error?.state : ""} />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <SelectDropDown
                                    fullWidth
                                    width={'100%'}
                                    values={city || []}
                                    value={data?.city}
                                    text="City"
                                    name="city"
                                    onChange={(e) => {
                                        setData({ ...data, city: e.target.value })
                                    }}
                                />
                                <TextLabel fontSize={"12px"} color={"red"} fontWeight={"400"} title={!data?.city ? error?.city : ""} />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <CommonTextField
                                    fontWeight={400}
                                    text={'Postal Code'}
                                    placeholder={"Enter Postal/Zip Code"}
                                    type='number'
                                    name='code'
                                    value={data?.code}
                                    onChange={(e) => handleChange(e, false)}
                                />
                                <TextLabel fontSize={"12px"} color={"red"} fontWeight={"400"} title={!data?.code ? error?.code : ""} />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <Box style={{ display: 'flex', justifyContent: 'center', marginTop: '35px' }}>
                                    <CommonButton
                                        width={'60%'}
                                        text="Create Branch"
                                        type="submit"
                                        onClick={handleClick}
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

export default Branches;
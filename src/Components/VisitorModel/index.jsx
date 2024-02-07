import React, { useEffect } from 'react'
import { Box, Button, Grid, Paper, Table, TableBody, TableContainer, TableHead, TableRow, } from "@mui/material";
import TextLabel from '../Common/Fields/TextLabel';
import CommonTextField from '../Common/Fields/TextField';
import CommonButton from '../Common/Button/CommonButton';
import { Regex } from '../../Utils/regex';
import AutoCompleteSearch from '../Common/commonAutoComplete';
import DataNotFound from '../Common/DataNotFound';
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { lightTheme } from '../../theme';
import dayjs from 'dayjs';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        fontWeight: 400,
        fontSize: 14,
        color: '#ffff',
        fontFamily: "Poppins",
        whiteSpace: 'nowrap',
        background: theme.palette.primary.main,
        padding: 5,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        fontFamily: "Poppins",
        fontWeight: 500,
        padding: '4px',
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.bgLightGray.main,
    },
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));
const VisitorModel = ({ data, branches, setSelectedBranch, selectedBranch, setSelectedState, selectedState, states, selectedCity, setSelectedCity, cities, error, handleChange, isEdit, onSubmit, setSelectedCountry, selectedCountry, countries }) => {

    useEffect(() => {
        const defaultCountry = "India";
        const defaultCountryObj = countries?.response?.find(country => country.name === defaultCountry);
        if (defaultCountryObj) {
          setSelectedCountry(defaultCountry);
        }
      }, [countries, setSelectedCountry]);

    return (
        <Grid container spacing={1} xs={12} md={12} lg={12} sm={12} p={2}>
            <Grid item xs={12} sm={12} md={6} lg={4}>
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
            <Grid item xs={12} sm={12} md={6} lg={4}>
                <CommonTextField
                    fontWeight={400}
                    text={'Email'}
                    placeholder={"Enter Email"}
                    type='text'
                    name='email'
                    value={data?.email}
                    onChange={(e) => handleChange(e, false)}
                />
                <TextLabel fontSize={"12px"} color={"red"} title={!data?.email ? error?.email : ""} />
                <TextLabel fontSize={"12px"} color={"red"} title={data?.email?.match(Regex.emailRegex) ? "" : error.invalidEmail} />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={4}>
                <CommonTextField
                    fontWeight={400}
                    text={'Contact No.'}
                    placeholder={"Enter Contact No."}
                    type='number'
                    name='mobileNo'
                    value={data?.mobileNo}
                    onChange={(e) => handleChange(e, false)}
                />
                <TextLabel fontSize={"12px"} color={"red"} fontWeight={"400"} title={!data?.mobileNo ? error?.mobileNo : ""} />
                <TextLabel fontSize={"12px"} color={"red"} title={data?.mobileNo?.match(Regex.mobileNumberRegex) ? "" : error.invalidMobile} />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={4}>
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
            <Grid item xs={12} sm={12} md={6} lg={4}>
                <CommonTextField
                    fontWeight={400}
                    text={'Postal Code'}
                    placeholder={"Enter Postal Code"}
                    type='number'
                    name='postalCode'
                    value={data?.postalCode}
                    onChange={(e) => handleChange(e, false)}
                />
                <TextLabel fontSize={"12px"} color={"red"} fontWeight={"400"} title={!data?.postalCode ? error?.postalCode : ""} />
                <TextLabel fontSize={"12px"} color={"red"} title={data?.postalCode?.match(Regex.pinCodeRegex) ? "" : error.invalidPostalCode} />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={4}>
                <AutoCompleteSearch
                    fullWidth
                    backgroundColor="white"
                    // width={"300px"}
                    text="Branch"
                    placeholder={"Select Branch"}
                    handleChange={(e, newValue) => setSelectedBranch(newValue)}
                    options={branches?.map((e) => e?.branchName) || []}
                    name="branchName"
                    defaultValue={selectedBranch || ""}
                    freeSolo
                    blurOnSelect
                />
                <TextLabel fontSize={"12px"} color={"red"} fontWeight={"400"} title={!selectedBranch?.branchName ? error?.branchName : ""} />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={4}>
                <AutoCompleteSearch
                    text="Country"
                    fullWidth
                    backgroundColor="white"
                    handleChange={(e, newValue) => {
                        setSelectedCountry(newValue)
                        if (isEdit && selectedCountry !== newValue) {
                            setSelectedCity("")
                            setSelectedState("")
                        }
                    }}
                    options={countries?.response?.map((e) => e?.name) || []}
                    name="label"
                    defaultValue={selectedCountry || ""}
                    freeSolo
                    blurOnSelect
                    placeholder={"Select Country"}
                />
                <TextLabel fontSize={"12px"} color={"red"} fontWeight={"400"} title={!selectedCountry ? error?.country : ""} />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={4}>
                <AutoCompleteSearch
                    text="State"
                    fullWidth
                    backgroundColor="white"
                    // width={"300px"}
                    handleChange={(e, newValue) => {
                        setSelectedState(newValue)
                        if (isEdit && selectedState !== newValue) {
                            setSelectedCity("")
                        }
                    }}
                    options={states?.response?.map((e) => e?.name) || []}
                    name="label"
                    defaultValue={selectedState || ""}
                    freeSolo
                    blurOnSelect
                    placeholder={"Select State"}
                />
                <TextLabel fontSize={"12px"} color={"red"} fontWeight={"400"} title={!selectedState ? error?.state : ""} />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={4}>
                <AutoCompleteSearch
                    text="City"
                    fullWidth
                    backgroundColor="white"
                    // width={"300px"}
                    handleChange={(e, newValue) => setSelectedCity(newValue)}
                    options={cities?.response?.map((e) => e?.name) || []}
                    name="label"
                    defaultValue={selectedCity || ""}
                    freeSolo
                    blurOnSelect
                    placeholder={"Select City"}
                />
                <TextLabel fontSize={"12px"} color={"red"} fontWeight={"400"} title={!selectedCity ? error?.city : ""} />
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6}>
                <CommonTextField
                    fontWeight={400}
                    text={'Reason'}
                    placeholder={"Please enter reason"}
                    type='text'
                    name='reason'
                    value={data?.reason}
                    onChange={(e) => handleChange(e, false)}
                // rows={5}
                // multiline
                />
                <TextLabel fontSize={"12px"} color={"red"} fontWeight={"400"} title={!data?.reason ? error?.reason : ""} />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
                <CommonTextField
                    fontWeight={400}
                    text={'Reference'}
                    placeholder={"Please enter reference name"}
                    type='text'
                    name='reference'
                    value={data?.reference}
                    onChange={(e) => handleChange(e, false)}
                // rows={5}
                // multiline
                />
                <TextLabel fontSize={"12px"} color={"red"} fontWeight={"400"} title={!data?.reference ? error?.reference : ""} />
            </Grid>
            {data?._id && <Grid item xs={12} sm={12} md={12} lg={12} sx={{ marginTop: 1 }}>
                <TextLabel fontSize={"15px"} fontWeight={"400"} color='#151D48' title={'Visit History'} />
                <TableContainer component={Paper} square style={{ marginTop: '5px' }}>
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>No</StyledTableCell>
                                <StyledTableCell align="center">Visit Date</StyledTableCell>
                                <StyledTableCell align="center">Visit Time</StyledTableCell>
                                <StyledTableCell align="center">Reason</StyledTableCell>
                                <StyledTableCell align="center">Reference</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data?.history?.map((row, index) => (
                                <StyledTableRow key={row.id}>
                                    <StyledTableCell style={{ paddingLeft: '10px' }}>{index + 1}</StyledTableCell>
                                    <StyledTableCell align="center">{dayjs(row.createdAt).format("DD/MM/YYYY")} </StyledTableCell>
                                    <StyledTableCell align="center">{dayjs(row.createdAt).format("hh:mm")} </StyledTableCell>
                                    <StyledTableCell align="center">{row?.reason}</StyledTableCell>
                                    <StyledTableCell align="center">{row?.reference} </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>}
            <Grid item xs={12} sm={12} md={12} lg={12}>
                <Box style={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
                    <CommonButton
                        width={'280px'}
                        text={`${isEdit ? "Update" : "Create"} Visitor`}
                        type="submit"
                        onClick={onSubmit}
                    />
                </Box>
            </Grid>
        </Grid>
    )
}

export default VisitorModel;
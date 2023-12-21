import React from 'react'
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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        fontWeight: 400,
        fontSize: 15,
        color: '#151D48',
        fontFamily: "Poppins",
        whiteSpace: 'nowrap',
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        fontFamily: "Poppins",
        fontWeight: 500,
        padding: '7px',
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));
const AddUser = ({ data, branches, roles, selectedRole, setSelectedRole, setSelectedBranch, selectedBranch,
    setSelectedState, selectedState, states, selectedCity, setSelectedCity, cities, error, handleChange, isEdit,
    onSubmit, setSelectedCountry, selectedCountry, countries, handleChangetable, addRow, tableData }) => {

    return (
        <Grid container spacing={1} xs={12} md={12} lg={12} sm={12} p={2}>
            <Grid item xs={12} sm={12} md={12} lg={4}>
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
            <Grid item xs={12} sm={12} md={12} lg={4}>
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
            <Grid item xs={12} sm={12} md={6} lg={4}>
                <AutoCompleteSearch
                    fullWidth
                    backgroundColor="white"
                    // width={"300px"}
                    text="User Type"
                    handleChange={(e, newValue) => setSelectedRole(newValue)}
                    options={roles?.map((e) => e?.label) || []}
                    name="label"
                    defaultValue={selectedRole || ""}
                    freeSolo
                    blurOnSelect
                    placeholder={"Select User Type"}
                />
                <TextLabel fontSize={"12px"} color={"red"} fontWeight={"400"} title={!selectedRole?.label ? error?.userType : ""} />
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
            {!data?._id &&
                <>
                    <Grid item xs={12} sm={12} md={6} lg={4}>
                        <CommonTextField
                            fontWeight={400}
                            placeholder={"Password"}
                            text={'Password'}
                            type="password"
                            name='password'
                            showPasswordToggle
                            value={data?.password}
                            onChange={(e) => handleChange(e, false)} />
                        <TextLabel fontSize={"12px"} color={"red"} fontWeight={"400"} title={!data?.password ? error?.password : ""} />
                        <TextLabel fontSize={"12px"} color={"red"} title={data?.password?.match(Regex.passwordRegex) ? "" : error.strongPassword} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={4}>
                        <CommonTextField
                            fontWeight={400}
                            text={'Confirm Password'}
                            placeholder={"Re-enter Password"}
                            type='password'
                            name='confirmPassword'
                            showPasswordToggle
                            value={data?.confirmPassword}
                            onChange={(e) => handleChange(e, false)}
                        />
                        <TextLabel fontSize={"12px"} color={"red"} title={!data?.confirmPassword ? error?.confirmPassword : ""} />
                        <TextLabel fontSize={"12px"} color={"red"} title={data?.email?.match(Regex.confirmPasswordRegex) ? "" : error.matchPassword} />
                    </Grid>
                </>
            }
            {selectedRole == "User" && (
                <>
                    <Grid item xs={12} sm={12} md={6} lg={4}>
                        <CommonTextField
                            fontWeight={400}
                            text={'Investment'}
                            placeholder={"Enter Investment"}
                            type='number'
                            name='investment'
                            value={data?.investment}
                            onChange={(e) => handleChange(e, false)}
                        />
                        <TextLabel fontSize={"12px"} color={"red"} fontWeight={"400"} title={!data?.investment ? error?.investment : ""} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={4}>
                        <CommonTextField
                            fontWeight={400}
                            text={'Investment Days'}
                            placeholder={"Enter investment days"}
                            type='number'
                            name='investmentDays'
                            value={data?.investmentDays}
                            onChange={(e) => handleChange(e, false)}
                        />
                        <TextLabel fontSize={"12px"} color={"red"} fontWeight={"400"} title={!data?.investmentDays ? error?.investmentDays : ""} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={4}>
                        <CommonTextField
                            fontWeight={400}
                            text={'Return Of Investment'}
                            placeholder={"Enter Return Of Investment"}
                            type='number'
                            name='returnOfInvestment'
                            value={data?.returnOfInvestment}
                            onChange={(e) => handleChange(e, false)}
                        />
                        <TextLabel fontSize={"12px"} color={"red"} fontWeight={"400"} title={!data?.returnOfInvestment ? error?.returnOfInvestment : ""} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={4}>
                        <CommonTextField
                            fontWeight={400}
                            text={'Meeting with'}
                            placeholder={"Meeting With"}
                            type='text'
                            name='meeting'
                            value={data?.meeting}
                            onChange={(e) => handleChange(e, false)}
                        />
                        <TextLabel fontSize={"12px"} color={"red"} fontWeight={"400"} title={!data?.meeting ? error?.meeting : ""} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={4}>
                        <CommonTextField
                            fontWeight={400}
                            text={'Reason'}
                            placeholder={"Enter Reason"}
                            type='text'
                            name='reason'
                            value={data?.reason}
                            onChange={(e) => handleChange(e, false)}
                        />
                        <TextLabel fontSize={"12px"} color={"red"} fontWeight={"400"} title={!data?.reason ? error?.reason : ""} />
                    </Grid>
                </>
            )}
            {/* {selectedRole === 'Visitor' && (
                <>
                    <Grid container spacing={1}>
                        <Grid item xs={12} marginTop={'15px'}>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 550 }} aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell>No</StyledTableCell>
                                            <StyledTableCell align="left">Reason</StyledTableCell>
                                            <StyledTableCell align="left">Meeting With</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {tableData.map((row) => (
                                            <StyledTableRow key={row.id}>
                                                <StyledTableCell>{row.id}</StyledTableCell>
                                                <StyledTableCell align="center">
                                                    <Grid item xs={12} sm={12} md={6} lg={6}>
                                                        <CommonTextField
                                                            border="1px solid #d6d6d6"
                                                            background='none'
                                                            fontWeight={400}
                                                            placeholder={'Enter Reason'}
                                                            type="text"
                                                            name={`reason-${row.id}`}
                                                            value={row.reason}
                                                            onChange={(e) => handleChangetable(e, row.id)}
                                                        />
                                                    </Grid>
                                                </StyledTableCell>
                                                <StyledTableCell align="center">
                                                    <Grid item xs={12} sm={12} md={6} lg={6}>
                                                        <CommonTextField
                                                            border="1px solid #d6d6d6"
                                                            background='none'
                                                            fontWeight={400}
                                                            placeholder={'Meeting With'}
                                                            type="text"
                                                            name={`meeting-${row.id}`}
                                                            value={row.meeting}
                                                            onChange={(e) => handleChangetable(e, row.id)}
                                                        />
                                                    </Grid>
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Box style={{ display: 'flex', justifyContent: 'end', marginTop: '5px' }}>
                                <CommonButton
                                    width={'10%'}
                                    text={"Add Row"}
                                    type="submit"
                                    onClick={addRow}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </>
            )} */}
            <Grid item xs={12} sm={12} md={12} lg={12}>
                <Box style={{ display: 'flex', justifyContent: 'center', marginTop: '35px' }}>
                    <CommonButton
                        width={'10%'}
                        text={`${isEdit ? "Update" : "Create"} User`}
                        type="submit"
                        onClick={onSubmit}
                    />
                </Box>
            </Grid>
        </Grid>
    )
}

export default AddUser;
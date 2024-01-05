import React from 'react'
import { Box, Button, Card, Divider, Fab, Grid, Paper, Table, TableBody, TableContainer, TableHead, TableRow, Typography, useTheme, } from "@mui/material";
import TextLabel from '../Common/Fields/TextLabel';
import CommonTextField from '../Common/Fields/TextField';
import CommonButton from '../Common/Button/CommonButton';
import { Regex } from '../../Utils/regex';
import AutoCompleteSearch from '../Common/commonAutoComplete';
import DataNotFound from '../Common/DataNotFound';
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import dayjs from 'dayjs';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        fontWeight: 400,
        fontSize: 15,
        color: '#000000',
        fontFamily: "Poppins",
        whiteSpace: 'nowrap',
        background: '#d6d7ff',
        padding: '5px',
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
        // backgroundColor: '#d6d7ff',

    },
}));
const CustomerModel = ({ data, branches, roles, selectedRole, setSelectedRole, setSelectedBranch, selectedBranch,
    setSelectedState, selectedState, states, selectedCity, setSelectedCity, cities, error, handleChange, isEdit,
    onSubmit, setSelectedCountry, selectedCountry, countries, handleChangetable, addRow, visitorHistory, setUserPurchasePlanDelete, setUserPurchasePlanAdd }) => {
    console.log(data, "dataaaa")
    const theme = useTheme()
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
            <Grid item xs={12} sm={12} md={6} lg={6} marginBottom={1}>
                <CommonTextField
                    fontWeight={400}
                    text={'Referance'}
                    placeholder={"Please enter reference name"}
                    type='text'
                    name='reference'
                    value={data?.reference}
                    onChange={(e) => handleChange(e, false)}
                />
                <TextLabel fontSize={"12px"} color={"red"} fontWeight={"400"} title={!data?.reference ? error?.reference : ""} />
            </Grid>
            <Divider />
            <Grid item xs={12} sm={12} md={12} lg={12} >
                <Box style={{ display: "flex", justifyContent: "space-between", alignItems: "center", }} >
                    <TextLabel fontSize={"16px"} fontWeight={"400"} title={'Enter Investment Details'} />
                    <Box display={'flex'} gap={2} alignItems={'center'} >
                        <CommonButton
                            width={'120px'}
                            text={'Add Plan'}
                            onClick={() => setUserPurchasePlanAdd()}
                            startIcon={<AddIcon />}
                        />
                    </Box>
                </Box>
            </Grid>
            {data?.userPurchasePlan?.map((e, i) => {
                console.log(e, "eee")
                return (
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Box bgcolor={theme.palette.bgLightExtraPrimary.main} width={'100%'} border={`1px solid ${theme.palette.bgLightExtraPrimary.main}`} borderRadius={"10px"}>
                            {i > 0 && (
                                <Box display={"flex"} sx={{ cursor: "pointer" }} margin={'4px 4px'} justifyContent={'end'} onClick={() => setUserPurchasePlanDelete(i)}>
                                    <CloseIcon sx={{ color: "#fff", borderRadius: 1, fontSize: "18px", marginRight: "1px", backgroundColor: "#F14336", }} />
                                </Box>
                            )}
                            <Grid container padding={'0px 15px 15px 15px'} spacing={2}>
                                <Grid item xs={12} sm={12} md={6} lg={4}>
                                    <CommonTextField
                                        fontWeight={400}
                                        text={'Investment Amount'}
                                        placeholder={"Enter Investment"}
                                        type='number'
                                        name='investment'
                                        value={e?.investment}
                                        onChange={(e) => handleChange(e, true, i)}
                                    />
                                    <TextLabel fontSize={"12px"} color={"red"} fontWeight={"400"} title={!e?.investment ? error?.investment : ""} />
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={4}>
                                    <CommonTextField
                                        fontWeight={400}
                                        text={'Investment Days'}
                                        placeholder={"Enter Investment Days"}
                                        type='number'
                                        name='investmentDays'
                                        value={e?.investmentDays}
                                        onChange={(e) => handleChange(e, true, i)}
                                    />
                                    <TextLabel fontSize={"12px"} color={"red"} fontWeight={"400"} title={!e?.investmentDays ? error?.investmentDays : ""} />
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={4}>
                                    <CommonTextField
                                        fontWeight={400}
                                        text={'Return Of Investment (%)'}
                                        placeholder={"Enter Return Of Investment"}
                                        type='number'
                                        name='returnOfInvestment'
                                        value={e?.returnOfInvestment}
                                        onChange={(e) => handleChange(e, true, i)}
                                    />
                                    <TextLabel fontSize={"12px"} color={"red"} fontWeight={"400"} title={!e?.returnOfInvestment ? error?.returnOfInvestment : ""} />
                                </Grid>

                            </Grid>
                        </Box>
                    </Grid>
                );
            })}



            {data?._id && <Grid item xs={12} marginTop={1}>
                <TextLabel fontSize={"16px"} fontWeight={"400"} title={'Meeting History'} />
                <TableContainer component={Card} elevation={1} square>
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>No</StyledTableCell>
                                <StyledTableCell align="center">Reason</StyledTableCell>
                                <StyledTableCell align="center">Visit Date</StyledTableCell>
                                <StyledTableCell align="center">Referance</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data?.history?.map((row, index) => (
                                <StyledTableRow key={row.id}>
                                    <StyledTableCell style={{ paddingLeft: '10px' }}>{index + 1}</StyledTableCell>
                                    <StyledTableCell align="center">{row?.reason}</StyledTableCell>
                                    <StyledTableCell align="center">{dayjs(row?.createdAt).format('DD/MM/YYYY')}</StyledTableCell>
                                    <StyledTableCell align="center">{row?.reference} </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>}
            <Grid item xs={12} sm={12} md={12} lg={12}>
                <Box style={{ display: 'flex', justifyContent: 'center', marginTop: '35px' }}>
                    <CommonButton
                    width={"280px"}
                        text={`${isEdit ? "Update" : "Create"} Customer`}
                        type="submit"
                        onClick={onSubmit}
                    />
                </Box>
            </Grid>
        </Grid>
    )
}

export default CustomerModel;
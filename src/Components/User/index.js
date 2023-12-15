import React from 'react'
import { Box, Grid, } from "@mui/material";
import TextLabel from '../../Components/Common/Fields/TextLabel';
import CommonTextField from '../../Components/Common/Fields/TextField';
import CommonButton from '../../Components/Common/Button/CommonButton';
import { Regex } from '../../Utils/regex';
import AutoCompleteSearch from '../Common/commonAutoComplete';

const AddUser = ({ data, setData, branches, roles, selectedRole, setSelectedRole, setSelectedBranch, selectedBranch, setSelectedState, selectedState, states, selectedCity, setSelectedCity, city, error, handleChange, isEdit, onSubmit }) => {
    return (
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
                <AutoCompleteSearch
                    backgroundColor="white"
                    width={"300px"}
                    text="State"
                    handleChange={(e, newValue) => setSelectedState(newValue)}
                    options={states?.map((e) => e?.label) || []}
                    name="label"
                    defaultValue={selectedState || ""}
                    freeSolo
                    blurOnSelect
                    placeholder={"Select State"}
                />
                <TextLabel fontSize={"12px"} color={"red"} fontWeight={"400"} title={!selectedState?.label ? error?.state : ""} />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
                <AutoCompleteSearch
                    backgroundColor="white"
                    width={"300px"}
                    text="City"
                    handleChange={(e, newValue) => setSelectedCity(newValue)}
                    options={city?.map((e) => e?.label) || []}
                    name="label"
                    defaultValue={selectedCity || ""}
                    freeSolo
                    blurOnSelect
                    placeholder={"Select City"}
                />
                <TextLabel fontSize={"12px"} color={"red"} fontWeight={"400"} title={!selectedCity?.label ? error?.city : ""} />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
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
            <Grid item xs={12} sm={12} md={6} lg={6}>
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
            <Grid item xs={12} sm={12} md={6} lg={6}>
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
            {!data?._id &&
                <>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
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
                    <Grid item xs={12} sm={12} md={6} lg={6}>
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
                <AutoCompleteSearch
                    backgroundColor="white"
                    width={"300px"}
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
            <Grid item xs={12} sm={12} md={6} lg={6}>
                <AutoCompleteSearch
                    backgroundColor="white"
                    width={"300px"}
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
            <Grid item xs={12} sm={12} md={12} lg={12}>
                <Box style={{ display: 'flex', justifyContent: 'center', marginTop: '35px' }}>
                    <CommonButton
                        width={'60%'}
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
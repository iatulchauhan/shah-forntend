import React from 'react'
import {
    Box,
    Grid,
    Switch,
} from "@mui/material";
import TextLabel from '../../Components/Common/Fields/TextLabel';
import CommonTextField from '../../Components/Common/Fields/TextField';
import SelectDropDown from '../../Components/Common/SelectDropDown';
import CommonButton from '../../Components/Common/Button/CommonButton';
import { Regex } from '../../Utils/regex';

const AddUser = ({ data, setData, state, branches, roles, plan, city, error, handleChange, isEdit, onSubmit }) => {
    return (
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
                    <TextLabel fontSize={"12px"} color={"red"} title={data?.mobileNo?.match(Regex.mobileNumberRegex) ? "" : error.mobileNo} />
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
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <SelectDropDown
                        fullWidth
                        width={'100%'}
                        values={branches?.map((item) => item.branchName) || []}
                        text="Select Branches"
                        name="branch"
                        value={data?.branch}
                        onChange={(e) => {
                            setData({ ...data, branch: e.target.value })
                        }}
                    />
                    <TextLabel fontSize={"12px"} color={"red"} fontWeight={"400"} title={!data?.branch ? error?.branch : ""} />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <SelectDropDown
                        fullWidth
                        width={'100%'}
                        values={roles?.map((role) => role.id) || []}
                        text="Assign Roles"
                        name="userType"
                        value={data?.userType}
                        onChange={(e) => {
                            setData({ ...data, userType: e.target.value })
                        }}
                    />
                    <TextLabel fontSize={"12px"} color={"red"} fontWeight={"400"} title={!data?.userType ? error?.userType : ""} />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Box display="flex" alignItems="center">
                        <div style={{ marginRight: '10px' }}>Active</div>
                        <Switch
                            checked={data.active} 
                            onChange={(e) => setData({ ...data, active: e.target.checked })}
                            color="primary"
                        />
                    </Box>
                </Grid>
                {/* <Grid item xs={12} sm={12} md={12} lg={12}>
                    <SelectDropDown
                        fullWidth
                        width={'100%'}
                        values={plan || []}
                        text="Choose Active Plan"
                        name="plan"
                        value={data?.activePlan}
                        onChange={(e) => {
                            setData({ ...data, activePlan: e.target.value })
                        }}
                    />
                    <TextLabel fontSize={"12px"} color={"red"} fontWeight={"400"} title={!data?.activePlan ? error?.activePlan : ""} />
                </Grid> */}
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
        </Box>
    )
}

export default AddUser;
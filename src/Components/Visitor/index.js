import React from 'react'
import {
    Box,
    Grid,
} from "@mui/material";
import TextLabel from '../../Components/Common/Fields/TextLabel';
import CommonTextField from '../../Components/Common/Fields/TextField';
import CommonButton from '../../Components/Common/Button/CommonButton';
import { Regex } from '../../Utils/regex';
import AutoCompleteSearch from '../Common/commonAutoComplete';

const AddVisitor = ({ data, error, handleChange, isEdit, onSubmit, selectedCity, setSelectedCity, states, cities, setSelectedState, selectedState, countries, selectedCountry, setSelectedCountry }) => {
    return (
        <Box>
            <Grid container spacing={1} xs={12} md={12} lg={12} sm={12} p={2}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <CommonTextField
                        fontWeight={400}
                        text={'Name'}
                        placeholder={"Enter Visitor Name"}
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
                    <AutoCompleteSearch
                        backgroundColor="white"
                        width={"300px"}
                        text="Country"
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
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <AutoCompleteSearch
                        backgroundColor="white"
                        width={"300px"}
                        text="State"
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
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <AutoCompleteSearch
                        backgroundColor="white"
                        width={"300px"}
                        text="City"
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
                        text={'Postal Code'}
                        placeholder={"Enter Postal/zip Code"}
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
                        placeholder={"Enter Email Address"}
                        type='text'
                        name='email'
                        value={data?.email}
                        onChange={(e) => handleChange(e, false)}
                    />
                    <TextLabel fontSize={"12px"} color={"red"} title={!data?.email ? error?.email : ""} />
                    <TextLabel fontSize={"12px"} color={"red"} title={data?.email?.match(Regex.emailRegex) ? "" : error.invalidEmail} />
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Box style={{ display: 'flex', justifyContent: 'center', marginTop: '35px' }}>
                        <CommonButton
                            width={'60%'}
                            text={`${isEdit ? "Update" : "Create"} Visitor`}
                            type="submit"
                            onClick={onSubmit}
                        />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default AddVisitor;
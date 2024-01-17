import React, { useEffect, useState } from 'react'
import { Box, Grid, } from "@mui/material";
import TextLabel from '../../Components/Common/Fields/TextLabel';
import CommonTextField from '../../Components/Common/Fields/TextField';
import CommonButton from '../../Components/Common/Button/CommonButton';
import AutoCompleteSearch from '../Common/commonAutoComplete';
import { Regex } from '../../Utils/regex';

const AddBranch = ({ data, selectedCity, setSelectedCity, states, cities, error, handleChange, isEdit, onSubmit, setSelectedState, selectedState, countries, selectedCountry, setSelectedCountry }) => {
   
    React.useEffect(() => {
        const defaultCountry = "India";
        const defaultCountryObj = countries?.response?.find(country => country.name === defaultCountry);
        if (defaultCountryObj) {
          setSelectedCountry(defaultCountry);
        }
      }, [countries, setSelectedCountry]);

    return (
        <Box>
            <Grid container spacing={1} xs={12} md={12} lg={12} sm={12} p={2}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <CommonTextField
                        fontWeight={400}
                        text={'Branch Name'}
                        placeholder={"Enter Branch Name"}
                        type='text'
                        name='branchName'
                        value={data?.branchName}
                        onChange={(e) => handleChange(e, false)}
                    />
                    <TextLabel fontSize={"12px"} color={"red"} fontWeight={"400"} title={!data?.branchName ? error?.branchName : ""} />
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
                {console.log("selectedCountry", selectedCountry)}
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <AutoCompleteSearch
                        backgroundColor="white"
                        width={"300px"}
                        text="Country"
                        handleChange={(e, newValue) => {
                            setSelectedCountry(newValue)
                            if (isEdit && selectedCountry !== newValue) { setSelectedCity(""); setSelectedState("") }
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
                        placeholder={"Enter Postal/Zip Code"}
                        type='number'
                        name='postalCode'
                        value={data?.postalCode}
                        onChange={(e) => handleChange(e, false)}
                    />
                    <TextLabel fontSize={"12px"} color={"red"} fontWeight={"400"} title={!data?.postalCode ? error?.postalCode : ""} />
                    <TextLabel fontSize={"12px"} color={"red"} title={data?.postalCode?.match(Regex.pinCodeRegex) ? "" : error.invalidPostalCode} />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Box style={{ display: 'flex', justifyContent: 'center', marginTop: '35px' }}>
                        <CommonButton
                            width={'280px'}
                            text={`${isEdit ? "Update" : "Create"} Branch`}
                            type="submit"
                            onClick={onSubmit}
                        />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default AddBranch
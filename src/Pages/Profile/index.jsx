import React, { useEffect, useState } from 'react'
import PaperContainer from '../../Components/Common/PaperContainer'
import CommonButton from '../../Components/Common/Button/CommonButton'
import { Avatar, Box, Grid } from '@mui/material'
import TextLabel from '../../Components/Common/Fields/TextLabel'
import SelectDropDown from '../../Components/Common/SelectDropDown'
import CommonTextField from '../../Components/Common/Fields/TextField'
import { Regex } from '../../Utils/regex'

const Profile = () => {
    const state = ['Gujarat ', 'Gujarat']
    const city = ['Surat', 'Ahmadabad']

    const [data, setData] = useState({})
    const [error, setError] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)

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
            errors['code'] = 'Please enter Pincode.'
        }
        if (!data?.email) {
            formIsValid = false;
            errors["email"] = "Please enter email.";
        } else if (!data?.email?.match(Regex.emailRegex)) {
            formIsValid = false;
            errors["invalidEmail"] = "* Invalid email Address";
        }
        if (!data?.contactno) {
            formIsValid = false
            errors['contactno'] = 'Please enter Contact No.'
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
            <PaperContainer>
                <Box>
                    <Grid container spacing={1} xs={12} md={12} lg={12} sm={12} p={2}>
                        <Grid item xs={12} sm={12} md={12} lg={12} display={'flex'} justifyContent={"center"} my={5}> 
                           <Avatar sx={{height: "100px", width: "100px"}}/>
                        </Grid>
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
                        <Grid item xs={12} sm={6} md={3} lg={3}>
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
                        <Grid item xs={12} sm={6} md={3} lg={3}>
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
                        <Grid item xs={12} sm={6} md={3} lg={3}>
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
                        <Grid item xs={12} sm={6} md={3} lg={3}>
                            <CommonTextField
                                fontWeight={400}
                                text={'Pincode'}
                                placeholder={"Enter Pincode"}
                                type='number'
                                name='code'
                                value={data?.code}
                                onChange={(e) => handleChange(e, false)}
                            />
                            <TextLabel fontSize={"12px"} color={"red"} fontWeight={"400"} title={!data?.code ? error?.code : ""} />
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
                                text={'Contact Number'}
                                placeholder={"Enter Contact Number"}
                                type='number'
                                name='contactno'
                                value={data?.contactno}
                                onChange={(e) => handleChange(e, false)}
                            />
                            <TextLabel fontSize={"12px"} color={"red"} fontWeight={"400"} title={!data?.contactno ? error?.contactno : ""} />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} >
                            <Box style={{ display: 'flex', justifyContent: 'center', marginTop: '35px' }}>
                                <CommonButton
                                    width={'20%'}
                                    text="Submit"
                                    type="submit"
                                    onClick={handleLoginClick}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </PaperContainer>
        </>
    )
}

export default Profile
import React, { useEffect, useState } from 'react'
import AuthLayout from '../../Components/AuthLayout'
import { Box, Grid, Typography } from '@mui/material'
import { Regex } from '../../Utils/regex'
import CommonTextField from '../../Components/Common/Fields/TextField'
import TextLabel from '../../Components/Common/Fields/TextLabel'
import CommonButton from '../../Components/Common/Button/CommonButton'
import { lightTheme } from '../../theme'
import { useAppContext } from '../../Context/context'
import axios from "../../APiSetUp/axios";
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert'

const ForgetPassword = () => {
    const navigate = useNavigate();

    //States 
    const [data, setData] = useState({})
    const [error, setError] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)
    const { OnUpdateError, toggleLoader, onUpdateUser, updateToken } = useAppContext();

    //Validation
    const handleValidation = () => {
        let formIsValid = true
        let errors = {}
        if (!data?.email) {
            formIsValid = false;
            errors["email"] = "Please enter email.";
        } else if (!data?.email?.match(Regex.emailRegex)) {
            formIsValid = false;
            errors["invalidEmail"] = "* Invalid email Address";
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
        if (isSubmit) {
            handleValidation()
        }
    }

    const handleLoginClick = () => {
        setIsSubmit(true)
        if (handleValidation()) {
            toggleLoader();
            axios.post("/login", {
                email: data?.email,
                password: data?.password
            }).then((res) => {
                console.log("res", res);
                if (res?.data?.data) {
                    onUpdateUser(res?.data?.data);
                    updateToken(res?.data?.data?.token)
                    swal(res?.data?.message, {
                        icon: "success",
                        timer: 5000,
                    })
                    navigate("/")
                }
                toggleLoader();
            }).catch((err) => {
                toggleLoader();
                OnUpdateError(err.data.message);
            }
            );
        }
    }


    return (
        <>
            <AuthLayout
                logo={"Logo"}
                login={"Forget Password"}
                account={
                    <>
                        Please enter your email address  for the <br />verification process
                    </>
                }

            >
                <Grid container spacing={2} style={{ display: 'flex', justifyContent: 'center' }}>
                    <Grid item xs={10} sm={10} md={10} lg={10} style={{ marginTop: '20px' }}>
                        <CommonTextField
                            placeholder={"Email id"}
                            type={'email'}
                            name='email'
                            value={data?.email}
                            onChange={(e) => handleChange(e, false)} />
                        <TextLabel fontSize={"12px"} color={"red"} title={!data?.email ? error?.email : ""} />
                        <TextLabel fontSize={"12px"} color={"red"} title={data?.email?.match(Regex.emailRegex) ? "" : error.invalidEmail} />
                    </Grid>
                    <Grid item xs={10} sm={10} md={10} lg={10}>
                        <Box style={{ display: 'flex', justifyContent: 'center', marginTop: '8rem' }}>
                            <CommonButton
                                width={'25%'}
                                text="Send OTP"
                                type="submit"
                                onClick={handleLoginClick}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </AuthLayout>
        </>

    )
}

export default ForgetPassword
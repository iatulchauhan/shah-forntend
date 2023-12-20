import React, { useState } from 'react'
import AuthLayout from '../../Components/AuthLayout'
import { Box, Grid } from '@mui/material'
import CommonTextField from '../../Components/Common/Fields/TextField'
import TextLabel from '../../Components/Common/Fields/TextLabel'
import CommonButton from '../../Components/Common/Button/CommonButton'
import { useAppContext } from '../../Context/context'
import axios from "../../APiSetUp/axios";
import { useLocation, useNavigate } from 'react-router-dom'
import swal from 'sweetalert'


const Resetpassword = () => {
    const navigate = useNavigate();
    const { state } = useLocation();

    //States 
    const otpFromVerification = state?.otp || '';
    const [data, setData] = useState({})
    const [error, setError] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)
    const { OnUpdateError, toggleLoader } = useAppContext();

    //Validation
    const handleValidation = () => {
        let errors = {}
        let formIsValid = true
        if (!data?.password) {
            formIsValid = false;
            errors['password'] = 'Please enter password.';
        } else if (data.password.length < 8) {
            formIsValid = false;
            errors['password'] = 'Password must be at least 8 characters.';
        }
        if (!data?.confirmPassword) {
            formIsValid = false;
            errors["confirmPassword"] = "Please enter confirmPassword.";
        } else if (data?.password !== data?.confirmPassword) {
            formIsValid = false;
            errors["passwordsMatch"] = "Password do not match !";
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
        if (handleValidation()) {
            toggleLoader();
            let body = {
                "otp": parseInt(otpFromVerification, 10),
                "password": data?.password,
            }
            axios.post("/change_password", body)
                .then((res) => {
                    if (res?.data?.data) {
                        swal(res?.data?.message, { icon: "success", timer: 5000, })
                        navigate("/login")
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
        <AuthLayout logo={"Logo"} login={"Reset Password"} account={'Submit Below details for reset password'}>
            <Grid container spacing={2} style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                <Grid item xs={10} sm={10} md={10} lg={10}>
                    <CommonTextField
                        placeholder={"Password"}
                        showPasswordToggle
                        type={'password'}
                        value={data?.password}
                        name='password'
                        onChange={(e) => handleChange(e, false)} />
                    <TextLabel fontSize={"12px"} color={"red"} fontWeight={"400"} title={error?.password} />

                </Grid>
                <Grid item xs={10} sm={10} md={10} lg={10}>
                    <CommonTextField
                        placeholder={"Confirm Password"}
                        showPasswordToggle
                        type={'password'}
                        value={data?.confirmPassword}
                        name='confirmPassword'
                        onChange={(e) => handleChange(e, false)} />
                    <TextLabel fontSize={"12px"} color={"red"} title={!data?.confirmPassword ? error?.confirmPassword : ""} />
                    <TextLabel fontSize={"12px"} color={"red"} title={data?.password === data?.confirmPassword ? "" : error?.passwordsMatch} />
                    <Box style={{ display: 'flex', justifyContent: 'center', marginTop: "8rem" }}>
                        <CommonButton
                            width={'25%'}
                            text="Submit"
                            type="submit"
                            onClick={handleLoginClick}
                        />
                    </Box>
                </Grid>
            </Grid>
        </AuthLayout>
    )
}

export default Resetpassword
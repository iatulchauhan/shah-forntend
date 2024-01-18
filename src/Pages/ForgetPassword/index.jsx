import React, { useState } from 'react'
import AuthLayout from '../../Components/AuthLayout'
import { Box, Grid } from '@mui/material'
import { Regex } from '../../Utils/regex'
import CommonTextField from '../../Components/Common/Fields/TextField'
import TextLabel from '../../Components/Common/Fields/TextLabel'
import CommonButton from '../../Components/Common/Button/CommonButton'
import { useAppContext } from '../../Context/context'
import axios from "../../APiSetUp/axios";
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert'
import Assets from '../../Components/Common/ImageContainer'

const ForgetPassword = () => {
    const navigate = useNavigate();

    //States 
    const [data, setData] = useState({})
    const [error, setError] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)
    const { OnUpdateError, toggleLoader} = useAppContext();

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
        if (handleValidation()) {
            toggleLoader();
            let body = {
                email: data?.email,
            }
            axios.post("/forgetPassword", body)
                .then((res) => {
                if (res?.data?.data) {
                    swal(res?.data?.message, { icon: "success", timer: 5000, })
                    navigate("/otp-verification", { state: { email: data?.email } });
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
                logo={<Assets height={"70px"} src={"/assets/icons/logo.png"} absolutePath={true} />}
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
                                width={'200px'}
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
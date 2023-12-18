import React, { useEffect, useState } from 'react'
import AuthLayout from '../../Components/AuthLayout'
import { Box, Grid, Typography } from '@mui/material'
import { Regex } from '../../Utils/regex'
import CommonButton from '../../Components/Common/Button/CommonButton'
import { lightTheme } from '../../theme'
import { useAppContext } from '../../Context/context'
import axios from "../../APiSetUp/axios";
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert'
import { makeStyles } from "tss-react/mui";


const useStyles = makeStyles()((theme) => {
    return {
        otpBox: {
            borderRadius: '12px',
            border: '1px solid var(--border, #EDF2F6)',
            background: '#FFF',
            width: '50px',
            height: '50px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#151D48'
        },
    };
});
const OTPverification = () => {
    const navigate = useNavigate();
    const { classes } = useStyles();

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
        if (!data?.password) {
            formIsValid = false;
            errors['password'] = 'Please enter password.';
        } else if (data.password.length < 8) {
            formIsValid = false;
            errors['password'] = 'Password must be at least 8 characters.';
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
                login={"Enter OTP"}
                account={
                    <>
                        An 4 digit code has been send to <br /> +91 8554965498
                    </>
                }

            >
                <Grid container spacing={2} style={{ display: 'flex', justifyContent: 'center' }}>
                    <Grid item xs={2} sm={2} md={2} lg={2} >
                        <Box className={classes.otpBox}>
                            1
                        </Box>
                    </Grid>
                    <Grid item xs={2} sm={2} md={2} lg={2}>
                        <Box className={classes.otpBox}>
                            1
                        </Box>
                    </Grid>
                    <Grid item xs={2} sm={2} md={2} lg={2}>
                        <Box className={classes.otpBox}>
                            1
                        </Box>
                    </Grid>
                    <Grid item xs={2} sm={2} md={2} lg={2}>
                        <Box className={classes.otpBox}>
                            1
                        </Box>
                    </Grid>
                    <Grid item xs={10} sm={10} md={10} lg={10}>
                        <Typography style={{ fontSize: '16px', fontWeight: 500, textAlign: 'center', marginTop: '40px', color: lightTheme.palette.primary.main }}>{'Resend OTP'}</Typography>
                        <Box style={{ display: 'flex', justifyContent: 'center', marginTop: '7rem' }}>
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
        </>

    )
}

export default OTPverification
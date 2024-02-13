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
import OTPInput from 'react-otp-input'
import { useLocation } from 'react-router-dom';
import TextLabel from '../../Components/Common/Fields/TextLabel'
import Assets from '../../Components/Common/ImageContainer'


const useStyles = makeStyles()((theme) => {
    return {
        otpBox: {
            borderRadius: '12px',
            border: '1px solid var(--border, #EDF2F6)',
            // background: '#FFF',
            width: '50px !important',
            height: '50px',
            margin: "10px",
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
    const { state } = useLocation();

    //States 
    const emailId = state?.email || '';
    const [data, setData] = useState({})
    const [otp, setOtp] = useState('')
    const [error, setError] = useState({})
    const { OnUpdateError, toggleLoader } = useAppContext();

    //Validation
    const handleValidation = () => {
        let formIsValid = true;
        let errors = {};
        if (!otp) {
            formIsValid = false;
            errors['otp'] = 'Please enter OTP.';
        }
        setError(errors);
        return formIsValid;
    };

    const handleChange = (otpValue) => {
        setOtp(otpValue);
    };


    const handleLoginClick = () => {
        if (handleValidation()) {
            toggleLoader();
            let body = { "otp": parseInt(otp, 10), "email": emailId }
            axios.post("/otp_verification", body)
                .then((res) => {
                    if (res?.data?.data) {
                        swal(res?.data?.message, { icon: "success", timer: 5000, })
                        navigate('/reset-password', { state: { otp: otp } });
                    }
                    toggleLoader();
                }).catch((err) => {
                    toggleLoader();
                    OnUpdateError(err.data.message);
                }
                );
        }
    }

    const handelResendOtp = () => {
        toggleLoader();
        let body = {
            email: emailId,
        }
        axios.post("/forgetPassword", body)
            .then((res) => {
                swal(res?.data?.message, { icon: "success", timer: 5000, })
                toggleLoader();
            }).catch((err) => {
                toggleLoader();
                OnUpdateError(err.data.message);
            }
            );
    }

    return (
        <>
            <AuthLayout
                logo={<Assets height={"70px"} src={"/assets/icons/logo.png"} absolutePath={true} />}
                login={"Enter OTP"}
                account={
                    <>
                        An 4 digit code has been send to <br /> {emailId}
                    </>
                }
            >
                <Grid container spacing={2} display={"flex"} flexDirection={"column"} alignItems={"center"}>
                    <Grid item xs={12} sm={12} md={12} lg={12} >
                        <OTPInput
                            value={otp}
                            numInputs={6}
                            isInputNum={(value) => /^\d+$/.test(value)}
                            onChange={handleChange}
                            renderInput={(props, index) => <input {...props} className={classes.otpBox} />}
                        />
                        <TextLabel fontSize={"12px"} color={"red"} title={!data?.otp ? error?.otp : ""} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Typography style={{ fontSize: '16px', fontWeight: 500, textAlign: 'center', cursor: "pointer", color: lightTheme.palette.primary.main }} onClick={handelResendOtp}>{'Resend OTP'}</Typography>
                        <Box style={{ display: 'flex', justifyContent: 'center', marginTop: '7rem' }}>
                            <CommonButton
                                width={'200px'}
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
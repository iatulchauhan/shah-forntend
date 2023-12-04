import { Box, Typography } from '@mui/material'
import React from 'react'
import { makeStyles } from "tss-react/mui";

import backgroundImage from "../Assest/Images/authBack.png"
import { Button } from '@mui/base';

const useStyles = makeStyles()((theme) => {
    return {
        mainBox: {
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',  // Adjust the background size as needed
            backgroundPosition: 'center',  // Adjust the background position as needed
            height: '100vh',  // Set the height of the container
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        loginBox: {
            background: '#FFF',
            boxShadow: '0px 4px 20px 0px rgba(238, 238, 238, 0.50);',
            width: '500px',
            height: '500px',
            border: '1px solid #F8F9FA',
            borderRadius: '20px'
        }
    };
});

const AuthLayout = () => {
    const { classes } = useStyles();
    return (
        <Box className={classes?.mainBox}>
            <Box className={classes?.loginBox}>
                <Typography style={{ fontSize: '22px', fontWeight: 600, textAlign: 'center', marginTop: '20px' }}>Logo</Typography>
                <Typography style={{ fontSize: '45px', fontWeight: 600, textAlign: 'center', marginTop: '20px' }}>Login</Typography>
                <Typography style={{ fontSize: '18px', fontWeight: 400, textAlign: 'center', color: '#737791', marginTop: '15px' }}>Please login to your account</Typography>
                <Typography style={{ fontSize: '18px', fontWeight: 500, textAlign: 'center', marginTop: '20px', color: '#5D5FEF' }}>Forgot Password ?</Typography>
            </Box>
        </Box>
    )
}

export default AuthLayout

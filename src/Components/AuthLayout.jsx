import { Box, Typography } from '@mui/material'
import React, { useState } from 'react'
import { makeStyles } from "tss-react/mui";
import backgroundImage from "../Assets/Images/authBack.png"
import CommonButton from './Button/CommonButton';

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
            width: '550px',
            border: '1px solid #F8F9FA',
            borderRadius: '20px',
        }
    };
});


const AuthLayout = ({ children, logo, login, account, newAccount, register }) => {
    const { classes } = useStyles();
    return (
        <Box className={classes?.mainBox}>
            <Box className={classes?.loginBox}>
                <Typography style={{ fontSize: '22px', fontWeight: 600, textAlign: 'center', marginTop: '40px' }}>{logo}</Typography>
                <Typography style={{ fontSize: '35px', fontWeight: 600, textAlign: 'center', marginTop: '30px' }}>{login}</Typography>
                <Typography style={{ fontSize: '16px', fontWeight: 400, textAlign: 'center', color: '#737791', marginTop: '20px', marginBottom: '20px' }}>{account}</Typography>
                {children}
                <Box style={{ display: 'flex', justifyContent: 'center', marginTop: '30px', marginBottom: '30px' }}>
                    <Typography style={{ fontSize: '16px', fontWeight: 500, color: '#151D48' }}>{newAccount}</Typography>
                    <Typography style={{ fontSize: '16px', fontWeight: 500, color: '#5D5FEF' }}>{register}</Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default AuthLayout

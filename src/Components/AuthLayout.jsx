import { Box } from '@mui/material'
import React from 'react'
import { makeStyles } from "tss-react/mui";

import backgroundImage from "../Assest/Images/authBack.png"

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
    };
});


const AuthLayout = () => {
    const { classes } = useStyles();

    return (
        <Box className={classes?.mainBox}>
            login
        </Box>
    )
}

export default AuthLayout

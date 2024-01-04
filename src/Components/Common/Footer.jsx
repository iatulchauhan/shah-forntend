import React from 'react'
import { Box, Typography, Divider } from '@mui/material'
import { makeStyles } from "tss-react/mui";


const useStyles = makeStyles()((theme) => {
    return {
        footerMain: {
            padding: '20px',
            marginTop: '10px',
            position: "fixed",
            bottom: "0",
            background: theme.palette.bgWhite.main,
            boxShadow: '0px -1px 0px 0px rgba(0, 0, 0, 0.05)',
            [theme.breakpoints.down("md")]: {
                    padding: '10px 20px',
                width: `100% !important`,
                marginLeft: "-16px !important"
            },
        },
        miniFooterItems: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "20px",
            [theme.breakpoints.down("md")]: {
                gap: '6px',
            }
        },
        footerContain: {
            fontSize: "14px",
            textAlign: "center"
        },
        footerLinkText: {
            fontSize: "14px",
            fontWeight: "600",
            color: theme.palette.bgDarkPrimary.main,
            [theme.breakpoints.down("sm")]: {
                fontSize: "12px",
            }
        }
    };
});

const Footer = ({ open }) => {
    const { classes } = useStyles();
    return (
        <>
            <Box className={classes.footerMain} style={{ width: !open ? "calc(100% - 48px)" : "calc(100% - 255px)", marginLeft: !open ? "48px" : "255px" }}>
                <Box className={classes.miniFooterItems} sx={{ display: "flex", flexDirection: { xl: "row", lg: "row", md: "row", sm: "column", xs: "column" }, textAlign: "center" }}>
                    <Typography className={classes.footerLinkText}> 2023 © Copyright - Shah Investment Made with <span style={{ color: "red" }}> ❤ </span> for Investment.</Typography>
                    <Box sx={{ display: "flex", flexDirection: "row", gap: "5px" }}>
                        <Typography className={classes.footerLinkText}> Privacy policy </Typography>
                        <Divider orientation="vertical" variant="middle" flexItem style={{ borderColor: "black", margin: "5px" }} />
                        <Typography className={classes.footerLinkText}> Terms and Condition</Typography>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default Footer; 
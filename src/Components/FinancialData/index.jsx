import React, { useEffect, useState } from 'react'
import { Box, Grid, TextField, } from "@mui/material";
import TextLabel from '../../Components/Common/Fields/TextLabel';
import CommonTextField from '../../Components/Common/Fields/TextField';
import CommonButton from '../../Components/Common/Button/CommonButton';
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { makeStyles } from "tss-react/mui";
import { useTheme } from '@mui/styles';

const useStyles = makeStyles()((theme) => {
    return {
        dateBox: {
            "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
            },
            "& .MuiOutlinedInput-input": {
                padding: "16.5px 14px",
                fontSize: "14px !important",
            },
            "&:hover": {
                borderColor: `${theme?.palette?.primary?.main} !important`,
            },
            ".MuiInputBase-formControl:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: `${theme?.palette?.primary?.main} !important`,
            },
            ".MuiOutlinedInput-notchedOutline": {
                borderColor: "#EDF2F6",
                borderRadius: "12px",
            },
            ".Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: `${theme?.palette?.primary?.main} !important`,
                borderWidth: "1px !important",
            },
        },
        customLabel: {
            "& .MuiTypography-root": {
                fontSize: "15px",
                color: "#151D48",
            },
        },
    };
});
const AddFinancialData = ({ data, error, handleChange, isEdit, onSubmit }) => {
    const { classes } = useStyles();
    const theme = useTheme();
    return (
        <Box>
            <Grid container spacing={1} xs={12} md={12} lg={12} sm={12} p={2}>
                <Grid item xs={12} sm={12} md={12} lg={6}>
                    <CommonTextField
                        fontWeight={400}
                        text={'Name'}
                        placeholder={"Enter Name"}
                        type='text'
                        name='name'
                        value={data?.name}
                        onChange={(e) => handleChange(e, false)}
                    />
                    <TextLabel fontSize={"12px"} color={"red"} fontWeight={"400"} title={!data?.name ? error?.name : ""} />
                </Grid>
                {/* <Grid item xs={12} sm={12} md={12} lg={6} className={classes.customLabel} >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <TextLabel
                            fontSize={"15px"}
                            style={{ marginRight: "3px", padding: "3px" }}
                            fontWeight={"400"}
                            title={"Investment Date"}
                            color={theme.palette.bgDarkPrimary.main}
                        />
                        <DesktopDatePicker
                            className={classes.dateBox}
                            inputFormat="MM/DD/YYYY"
                            value={dayjs(investmentDate) || dayjs()}
                            onChange={(newValue) => {
                                setInvestmentDate(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                    <TextLabel
                        fontSize={"12px"}
                        color={"red"}
                        fontWeight={"400"}
                        title={!data?.investmentDate ? error?.investmentDate : ""}
                    />
                </Grid> */}
                <Grid item xs={12} sm={12} md={12} lg={6}>
                    <CommonTextField
                        fontWeight={400}
                        text={'Return Amount Of Interest'}
                        placeholder={"Enter Return Of Interest"}
                        type='text'
                        name='returnAmount'
                        value={data?.returnAmount}
                        onChange={(e) => handleChange(e, false)}
                    />
                    <TextLabel fontSize={"12px"} color={"red"} fontWeight={"400"} title={!data?.returnAmount ? error?.returnAmount : ""} />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <CommonTextField
                        fontWeight={400}
                        text={'Total Balance'}
                        placeholder={"Enter Total Balance"}
                        type='number'
                        name='totalBalance'
                        value={data?.totalBalance}
                        onChange={(e) => handleChange(e, false)}
                    />
                    <TextLabel fontSize={"12px"} color={"red"} fontWeight={"400"} title={!data?.totalBalance ? error?.totalBalance : ""} />
                </Grid>


                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Box style={{ display: 'flex', justifyContent: 'center', marginTop: '35px' }}>
                        <CommonButton
                            width={'60%'}
                            text={`${isEdit ? "Update" : "Create"} Financial`}
                            type="submit"
                            onClick={onSubmit}
                        />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default AddFinancialData
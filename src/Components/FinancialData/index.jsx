import React from 'react'
import { Box, Grid, } from "@mui/material";
import TextLabel from '../../Components/Common/Fields/TextLabel';
import CommonTextField from '../../Components/Common/Fields/TextField';
import CommonButton from '../../Components/Common/Button/CommonButton';
import { makeStyles } from "tss-react/mui";
import { useTheme } from '@mui/styles';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import AutoCompleteSearch from '../Common/commonAutoComplete';
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
const AddFinancialData = ({ data, error, handleChange, isEdit, onSubmit, setSelectedClient, selectedClient, clients, user }) => {
    const { classes } = useStyles();
    const theme = useTheme();
    return (
        <Box>
            <Grid container spacing={1} xs={12} md={12} lg={12} sm={12} p={2}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <AutoCompleteSearch
                        fullWidth
                        backgroundColor="white"
                        text="Client"
                        placeholder={"Select Client"}
                        handleChange={(e, newValue) => setSelectedClient(newValue)}
                        options={clients?.map((e) => e?.name) || []}
                        name="selectedClient"
                        defaultValue={selectedClient || ""}
                        freeSolo
                        blurOnSelect
                        disabled={isEdit ? true : false}
                    />
                    <TextLabel fontSize={"12px"} color={"red"} title={!selectedClient ? error?.selectedClient : ""} />
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <CommonTextField
                        fontWeight={400}
                        text={'Investment Amount'}
                        placeholder={"Enter Investment"}
                        type='number'
                        name='investment'
                        value={data?.investment}
                        onChange={(e) => handleChange(e)}
                    />
                    <TextLabel fontSize={"12px"} color={"red"} title={!data?.investment ? error?.investment : ""} />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <CommonTextField
                        fontWeight={400}
                        text={'Investment Days'}
                        placeholder={"Enter Investment Days"}
                        type='number'
                        name='investmentDays'
                        value={data?.investmentDays}
                        onChange={(e) => handleChange(e)}
                    />
                    <TextLabel fontSize={"12px"} color={"red"} title={!data?.investmentDays ? error?.investmentDays : ""} />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <CommonTextField
                        fontWeight={400}
                        text={'Return Of Investment (%)'}
                        placeholder={"Enter Return Of Investment"}
                        type='number'
                        name='returnOfInvestment'
                        value={data?.returnOfInvestment}
                        onChange={(e) => handleChange(e)}
                    />
                    <TextLabel fontSize={"12px"} color={"red"} title={!data?.returnOfInvestment ? error?.returnOfInvestment : ""} />
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Box style={{ display: 'flex', justifyContent: 'center', marginTop: '35px' }}>
                        <CommonButton
                            width={'160px'}
                            text={`${isEdit ? "Update" : "Add"}  ${user?.userType === 3 ? "Assign File" : "Financial Data"}`}
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
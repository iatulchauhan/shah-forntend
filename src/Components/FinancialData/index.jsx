import React from 'react'
import { Box, Divider, Grid, Typography, } from "@mui/material";
import TextLabel from '../../Components/Common/Fields/TextLabel';
import CommonTextField from '../../Components/Common/Fields/TextField';
import CommonButton from '../../Components/Common/Button/CommonButton';
import { makeStyles } from "tss-react/mui";
import { useTheme } from '@mui/styles';
import CloseIcon from '@mui/icons-material/Close';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

import AutoCompleteSearch from '../Common/commonAutoComplete';

import { lightTheme } from '../../theme';
import { globalAmountConfig } from '../../Utils/globalConfig';
import DataNotFound from '../Common/DataNotFound';
import Swal from 'sweetalert2';
const useStyles = makeStyles()((theme) => {
    return {
        customGridItem: {
            paddingTop: '0px !important', // Adjust the margin top as needed
        },
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
const AddFinancialData = ({ data, error, handleChange, isEdit, onSubmit, setSelectedClient, selectedClient, clients, user, setUserPurchasePlanDelete, setUserPurchasePlanAdd, deleteUserPlan }) => {
    const { classes } = useStyles();
    const theme = useTheme();
    return (
        <Box>
            <Grid container spacing={1} xs={12} md={12} lg={12} sm={12} p={2}>
                <Grid item xs={12} sm={12} md={12} lg={12} >
                    {data?.isGenerateId && <TextLabel fontSize={"14px"} color={theme.palette.error.main} title={"UserId is already generateId !"} />}
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
                    <TextLabel fontSize={"12px"} color={theme.palette.error.main} title={!selectedClient ? error?.selectedClient : ""} />
                </Grid>
                <Divider />
                <Grid item xs={12} sm={12} md={12} lg={12} >
                    <Box style={{ display: "flex", justifyContent: "space-between", alignItems: "center", }} >
                        <TextLabel fontWeight={600} fontSize={16} title={'Investment Details'} />
                        <Box display={'flex'} gap={2} alignItems={'center'} >
                            <CommonButton
                                width={'120px'}
                                text={'Add Plan'}
                                onClick={() => setUserPurchasePlanAdd()}
                                startIcon={<AddIcon />}
                            />
                        </Box>
                    </Box>
                </Grid>
                {data?.userPurchasePlan?.length > 0 ? data?.userPurchasePlan?.map((e, i) => {
                    console.log(e?._id, "eee")
                    return (
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Box bgcolor={theme.palette.bgLightExtraPrimary.main} width={'100%'} border={`1px solid ${theme.palette.bgLightExtraPrimary.main}`} borderRadius={"10px"}>

                                {isEdit && e?._id !== null ? <Box display={"flex"} style={{ cursor: "pointer" }} margin={'4px 1px'} justifyContent={'end'} onClick={() => Swal.fire({
                                    title: "<strong>Warning</strong>",
                                    icon: "warning",
                                    html: "Are you sure you want to delete plan?",
                                    showCancelButton: true,
                                    confirmButtonColor: "#0492c2",
                                    iconColor: "#0492c2",
                                    confirmButtonText: "Yes",
                                    cancelButtonColor: "#1A1B2F",
                                }).then(async (result) => {
                                    if (result.isConfirmed) {
                                        deleteUserPlan(e?._id)
                                    }
                                })}>
                                    <DeleteForeverIcon sx={{ color: "#F14336", borderRadius: 1, fontSize: "22px", marginRight: "1px", backgroundColor: "" }} />
                                </Box> :
                                    <Box display={"flex"} style={{ cursor: "pointer" }} margin={'8px 8px'} justifyContent={'end'} onClick={() => setUserPurchasePlanDelete(i)}>
                                        <CloseIcon sx={{ color: "#F14336", borderRadius: 1, fontSize: "16px", marginRight: "1px", border: "0.5px dashed #F14336",cursor: "pointer" }} onClick={() => setUserPurchasePlanDelete(i)}/>
                                    </Box>
                                }

                                <Grid container padding={'0px 5px 10px 5px'} spacing={2}>
                                    <Grid item xs={12} sm={12} md={6} lg={4} className={classes.customGridItem}>
                                        <CommonTextField
                                            fontWeight={400}
                                            text={'Investment Amount'}
                                            placeholder={"Enter Investment"}
                                            type='text'
                                            name='investment'
                                            value={globalAmountConfig(e?.investment)}
                                            onChange={(e) => handleChange(e, true, i)}
                                        />
                                        <TextLabel fontSize={"12px"} color={"red"} fontWeight={"400"} title={!e?.investment ? error?.investment : ""} />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6} lg={4} className={classes.customGridItem}>
                                        <CommonTextField
                                            fontWeight={400}
                                            text={'Investment Days'}
                                            placeholder={"Enter Investment Days"}
                                            type='number'
                                            name='investmentDays'
                                            value={e?.investmentDays}
                                            onChange={(e) => handleChange(e, true, i)}
                                        />
                                        <TextLabel fontSize={"12px"} color={"red"} fontWeight={"400"} title={!e?.investmentDays ? error?.investmentDays : ""} />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6} lg={4} className={classes.customGridItem}>
                                        <CommonTextField
                                            fontWeight={400}
                                            text={'Return Of Investment (%)'}
                                            placeholder={"Enter Return Of Investment"}
                                            type='number'
                                            name='returnOfInvestment'
                                            value={e?.returnOfInvestment}
                                            onChange={(e) => handleChange(e, true, i)}
                                        />
                                        <TextLabel fontSize={"12px"} color={"red"} fontWeight={"400"} title={!e?.returnOfInvestment ? error?.returnOfInvestment : ""} />
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                    );
                }) : <Grid item xs={12} sm={12} md={12} lg={12}>
                    <DataNotFound icon={<ErrorOutlineIcon color="error" style={{ fontSize: "3rem" }} />} elevation={0} title={'No Investment Detail Found!'} />
                </Grid>
                }
                {/* <Grid item xs={12} sm={12} md={6} lg={6}>
                    <CommonTextField
                        fontWeight={400}
                        text={'Investment Amount'}
                        placeholder={"Enter Investment"}
                        type='number'
                        name='investment'
                        value={data?.investment}
                        onChange={(e) => handleChange(e)}
                        disabled={data?.isGenerateId}
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
                        disabled={data?.isGenerateId}
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
                        disabled={data?.isGenerateId}
                    />
                    <TextLabel fontSize={"12px"} color={"red"} title={!data?.returnOfInvestment ? error?.returnOfInvestment : ""} />
                </Grid> */}
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Box style={{ display: 'flex', justifyContent: 'center', marginTop: '35px' }}>
                        <CommonButton
                            width={'180px'}
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
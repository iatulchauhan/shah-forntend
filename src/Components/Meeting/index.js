import React, { useEffect, useState } from 'react'
import { Box, Grid, TextField, } from "@mui/material";
import TextLabel from '../../Components/Common/Fields/TextLabel';
import CommonTextField from '../../Components/Common/Fields/TextField';
import CommonButton from '../../Components/Common/Button/CommonButton';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { makeStyles } from "tss-react/mui";
import AutoCompleteSearch from '../Common/commonAutoComplete';
import { Roles } from '../../Utils/enum';

const useStyles = makeStyles()((theme) => {
    return {
        dateBox: {
            "& .MuiOutlinedInput-root": {
                borderRadius: '10px',
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
                borderRadius: '12px',
            },
            ".Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: `${theme?.palette?.primary?.main} !important`,
                borderWidth: "1px !important",
            },
        },
        customLabel: {
            "& .MuiTypography-root": {
                fontSize: '15px',
                color: "#151D48",
            }
        }
    };
});

const AddMeeting = ({ data, error, handleChange, isEdit, onSubmit, slotTimes, convertToAmPm, setSelectedSlot, selectedSlot, setData, clients, setSelectedInviteTo, selectedInviteTo, selectedClient, setSelectedClient, handleSlotClick }) => {
    const { classes } = useStyles();
    return (
        <Box>
            <Grid container spacing={1} xs={12} md={12} lg={12} sm={12} p={2}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <CommonTextField
                        fontWeight={400}
                        text={'Title'}
                        placeholder={"Enter Title"}
                        type='text'
                        name='title'
                        value={data?.title}
                        onChange={(e) => handleChange(e, false)}
                    />
                    <TextLabel fontSize={"12px"} color={"red"} fontWeight={"400"} title={!data?.title ? error?.title : ""} />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <AutoCompleteSearch
                        fullWidth
                        backgroundColor="white"
                        text="Client"
                        handleChange={(e, newValue) => setSelectedClient(newValue)}
                        options={clients?.response?.filter((e) => e?.userType === Roles.Visitor || e?.userType === Roles.User)?.map((e) => e?.name) || []}
                        name="selectedClient"
                        defaultValue={selectedClient || ""}
                        freeSolo
                        blurOnSelect
                        placeholder={"Select Client"}
                    />
                    <TextLabel fontSize={"12px"} color={"red"} fontWeight={"400"} title={!selectedClient ? error?.selectedClient : ""} />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={6} className={classes.customLabel}>
                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                        <DemoContainer components={['DesktopDatePicker']}                        >
                            <DemoItem label="Meeting Date" >
                                <DesktopDatePicker className={classes.dateBox} inputFormat="MM/dd/yyyy" name='date'
                                    value={dayjs(data?.meetingDate)} defaultValue={dayjs(data?.meetingDate)} onChange={(newValue) => setData({ ...data, meetingDate: newValue })} />
                            </DemoItem>
                        </DemoContainer>
                    </LocalizationProvider>
                    <TextLabel fontSize={"12px"} color={"red"} fontWeight={"400"} title={!data?.meetingDate ? error?.meetingDate : ""} />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <AutoCompleteSearch
                        fullWidth
                        backgroundColor="white"
                        text="Invite To"
                        handleChange={(e, newValue) => setSelectedInviteTo(newValue)}
                        options={clients?.response?.filter((e) => e?.userType === Roles.Counsellor || e?.userType === Roles.Receptionist)?.map((e) => e?.name) || []}
                        name="selectedInviteTo"
                        defaultValue={selectedInviteTo || ""}
                        freeSolo
                        blurOnSelect
                        placeholder={"Select Invite"}
                    />
                    <TextLabel fontSize={"12px"} color={"red"} fontWeight={"400"} title={!selectedInviteTo ? error?.selectedInviteTo : ""} />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <TextLabel fontSize={"15px"} color={"#151D48"} fontWeight={"400"} title={'Start Time'} style={{ padding: '3px' }} />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} display={"flex"} flexWrap={"wrap"} gap={2}>
                    {slotTimes?.map((e) => {
                        return (
                            <Chip
                                label={`${convertToAmPm(e?.startTime)}`}
                                style={{
                                    borderRadius: '10px',
                                    border: `1px solid ${e.isSelected === true ? 'var(--selected, #EDF2F6)' : 'var(--border, #EDF2F6)'}`,
                                    background: e.isSelected === true ? 'var(--border, #EDF2F6)' : 'var(--White, #FFF)',
                                    height: '42px',
                                    color: e.isSelected === true ? 'var(--White, #000)' : 'var(--text, #000)',
                                }}
                                onClick={() => handleSlotClick(e.startTime)}
                            />
                        )
                    })}
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Box style={{ display: 'flex', justifyContent: 'center', marginTop: '35px' }}>
                        <CommonButton
                            width={'60%'}
                            text={`${isEdit ? "Update" : "Schedule"} Meeting`}
                            type="submit"
                            onClick={onSubmit}
                        />
                    </Box>
                </Grid>
            </Grid>
        </Box >
    )
}

export default AddMeeting
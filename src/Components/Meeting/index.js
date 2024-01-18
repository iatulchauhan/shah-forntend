import React, { useEffect, useState } from "react";
import { Box, Grid, TextField, Tooltip, useTheme } from "@mui/material";
import TextLabel from "../../Components/Common/Fields/TextLabel";
import CommonTextField from "../../Components/Common/Fields/TextField";
import CommonButton from "../../Components/Common/Button/CommonButton";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { makeStyles } from "tss-react/mui";
import AutoCompleteSearch from "../Common/commonAutoComplete";
import { Roles, meetingStatus, userType } from "../../Utils/enum";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

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

const AddMeeting = ({
  counsellorDetails,
  data,
  error,
  handleChange,
  isEdit,
  onSubmit,
  slotTimes,
  convertToAmPm,
  setMeetingDate,
  meetingDate,
  updatedMeetingDetails,
  meetinStatusConfig,
  setSelectedInviteTo,
  selectedInviteTo,
  selectedClient,
  setSelectedClient,
  handleSlotClick,
  visitorDetails,
  setUpdateMeetingStatus,
  updateMeetingStatus,
  statusColors,
  _deleteScheduleMeeting,
}) => {
  const { classes } = useStyles();
  const theme = useTheme();
  return (
    <Box>
      <Grid container spacing={1} xs={12} md={12} lg={12} sm={12} p={2}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <CommonTextField
            fontWeight={400}
            text={"Title"}
            placeholder={"Enter Title"}
            type="text"
            name="title"
            value={data?.title}
            onChange={(e) => handleChange(e, false)}
            disabled={isEdit ? (updatedMeetingDetails?.isEdit ? false : true) : false}
          />
          <TextLabel
            fontSize={"12px"}
            color={"red"}
            fontWeight={"400"}
            title={!data?.title ? error?.title : ""}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <AutoCompleteSearch
            fullWidth
            backgroundColor="white"
            text="Client"
            handleChange={(e, newValue) => setSelectedClient(newValue)}
            // options={visitorDetails?.map((e) => `${e?.name}  (${userType?.filter((type) => type?.id === e?.userType)[0]?.label})`) || []}
            options={visitorDetails?.map((e) => e?.name) || []}
            name="selectedClient"
            defaultValue={selectedClient || ""}
            freeSolo
            blurOnSelect
            placeholder={"Select Client"}
            disabled={isEdit ? (updatedMeetingDetails?.isEdit ? false : true) : false}

          />
          <TextLabel
            fontSize={"12px"}
            color={"red"}
            fontWeight={"400"}
            title={!selectedClient ? error?.selectedClient : ""}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12}>
          <AutoCompleteSearch
            fullWidth
            backgroundColor="white"
            text="Invite To"
            handleChange={(e, newValue) => setSelectedInviteTo(newValue)}
            options={counsellorDetails?.map((e) => e?.name) || []}
            name="selectedInviteTo"
            defaultValue={selectedInviteTo || ""}
            freeSolo
            blurOnSelect
            placeholder={"Select Invite"}
            disabled={
              isEdit ? (updatedMeetingDetails?.isEdit ? false : true) : false
            }
          />
          <TextLabel
            fontSize={"12px"}
            color={"red"}
            fontWeight={"400"}
            title={!selectedInviteTo ? error?.selectedInviteTo : ""}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={6}
          className={classes.customLabel}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TextLabel
              fontSize={"15px"}
              style={{ marginRight: "3px", padding: "3px" }}
              fontWeight={"400"}
              title={"Meeting date"}
              color={theme.palette.bgDarkPrimary.main}
            />
            <DesktopDatePicker
              className={classes.dateBox}
              // label="Date desktop"
              inputFormat="MM/DD/YYYY"
              value={dayjs(meetingDate) || dayjs()}
              onChange={(newValue) => {
                console.log(newValue, "newValue");
                setMeetingDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
              disabled={
                isEdit ? (updatedMeetingDetails?.isEdit ? false : true) : false
              }
            />
            {/* </DemoItem> */}
          </LocalizationProvider>
          <TextLabel
            fontSize={"12px"}
            color={"red"}
            fontWeight={"400"}
            title={!data?.meetingDate ? error?.meetingDate : ""}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <TextLabel
            fontSize={"15px"}
            color={"#151D48"}
            fontWeight={"400"}
            title={"Schedule Time"}
            style={{ padding: "3px" }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          display={"flex"}
          flexWrap={"wrap"}
          gap={2}
        >
          {slotTimes?.map((e) => {
            return (
              <Chip
                label={`${convertToAmPm(e?.startTime)}`}
                style={{
                  borderRadius: "10px",
                  border: `1px solid ${e.isBooked === true ? "var(--selected, #A1E3FF)" : "var(--border, #A1E3FF)"}`,
                  background: e.isBooked === true ? "var(--border, #A1E3FF)" : "var(--White, #FFF)",
                  height: "36px",
                  color: e.isBooked === true ? "var(--White, #000)" : "var(--text, #000)",
                }}
                onClick={() => handleSlotClick(e.startTime)}
                disabled={updatedMeetingDetails && !updatedMeetingDetails?.isEdit ? true : e.isSelected ? true : false}
              />
            );
          })}
        </Grid>

        {updatedMeetingDetails?.isEdit && (
          <Grid item xs={12} sm={12} md={12} lg={12}>
            {!(updatedMeetingDetails?.status === meetingStatus?.completed || updatedMeetingDetails?.status === meetingStatus?.canceled) ? (
              <AutoCompleteSearch
                fullWidth
                backgroundColor="white"
                text="Update Status"
                handleChange={(e, status) => {
                  setUpdateMeetingStatus(status);
                }}
                options={meetinStatusConfig?.map((e) => e?.statusName) || []}
                name="updateMeetingStatus"
                defaultValue={updateMeetingStatus || ""}
                freeSolo
                blurOnSelect
                placeholder={"Select Status"}
                disabled={updatedMeetingDetails?.status === 3}
              />
            ) : (
              <Box display={"flex"} justifyContent={"center"} mt={2}>
                <TextLabel
                  fontSize={"12px"}
                  color={"white"}
                  fontWeight={"400"}
                  title={`Meeting has been ${meetinStatusConfig?.find((e) => e?.statusId === updatedMeetingDetails?.status)?.statusName
                    }`}
                  textAlign={"center"}
                  style={{
                    backgroundColor:
                      statusColors[updatedMeetingDetails?.status],
                    borderRadius: "20px",
                    width: "220px",
                    padding: "5px 5px",
                  }}
                />
              </Box>
            )}
          </Grid>
        )}
        {!(updatedMeetingDetails?.status === meetingStatus?.completed || updatedMeetingDetails?.status === meetingStatus?.canceled) && (
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Box style={{ display: "flex", justifyContent: "center", marginTop: "35px", }}>
              <CommonButton width={"280px"} text={`${isEdit ? "Update" : "Schedule"} Meeting`} type="submit" onClick={onSubmit} />
            </Box>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default AddMeeting;

import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { makeStyles } from "tss-react/mui";
import {
  Table,
  TableRow,
  TableHead,
  TableContainer,
  Box,
  Grid,
} from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import Assets from "../../Components/Common/ImageContainer";
import PaperContainer from "../../Components/Common/PaperContainer";
import TableHeading from "../../Components/Common/CommonTableHeading";
import CommonModal from "../../Components/Common/CommonModel";
import CommonPagination from "../../Components/Common/Pagination";
import { useAppContext } from "../../Context/context";
import axios from "../../APiSetUp/axios";
import swal from "sweetalert";
import { lightTheme } from "../../theme";
import CommonButton from "../../Components/Common/Button/CommonButton";
import AddMeeting from "../../Components/Meeting";
import { useEffect } from "react";
import { Roles, meetingStatus, permissionStatus } from "../../Utils/enum";
import dayjs, { Dayjs } from "dayjs";
import TextLabel from "../../Components/Common/Fields/TextLabel";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import DataNotFound from "../../Components/Common/DataNotFound";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    fontWeight: 600,
    fontSize: 14,
    color: theme.palette.primary.main,
    fontFamily: "Poppins",
    padding: 5,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    fontFamily: "Poppins",
    fontWeight: 500,
    padding: "8px",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const useStyles = makeStyles()((theme) => {
  return {
    paddedRow: {
      padding: "15px 10px",
    },
    writeBox: {
      borderRadius: "6px",
      padding: "8px",
      backgroundColor: lightTheme.palette.bgLightExtraPrimary.main,
      color: lightTheme.palette.primary.main,
      cursor: "pointer",
    },
    viewBox: {
      borderRadius: "6px",
      padding: "8px",
      color: lightTheme.palette.bgLightSuccess.main,
      backgroundColor: lightTheme.palette.bgLightExtraSuccess.main,
      cursor: "pointer",
    },
    deleteBox: {
      borderRadius: "6px",
      padding: "8px",
      color: lightTheme.palette.bgLightRed.main,
      backgroundColor: lightTheme.palette.bgLightExtraRed.main,
      cursor: "pointer",
    },
  };
});

const meetinStatusConfig = [
  {
    statusName: "Approval Pending",
    statusId: 0,
  },
  {
    statusName: "Approve",
    statusId: 1,
  },
  {
    statusName: "On Going",
    statusId: 2,
  },
  {
    statusName: "Complete",
    statusId: 3,
  },
  {
    statusName: "Cancel",
    statusId: 4,
  },
];

const statusColors = {
  0: "#FDCF71",
  1: "#72C75F",
  2: "#36A4F4",
  3: "#2DB70E",
  4: "#FF7474",
};

const MeetingList = () => {
  const { classes } = useStyles();
  const location = useLocation();
  const { pathname } = location;
  const { OnUpdateError, toggleLoader, user, menuList } = useAppContext();
  //States
  const [model, setModel] = useState(false);
  const [data, setData] = useState({ meetingDate: null });
  const [error, setError] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [slotTimes, setSlotTimes] = useState([]);
  const [page, setPage] = useState(0);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [selectedClient, setSelectedClient] = useState([]);
  const [selectedInviteTo, setSelectedInviteTo] = useState([]);
  const [meetingDetails, setMeetingDetails] = useState([]);
  const [counsellorDetails, setCounsellorDetails] = useState([]);
  const [visitorDetails, setVisitorDetails] = useState([]);
  const [meetingId, setMeetingId] = useState("");
  const [meetingDate, setMeetingDate] = useState(dayjs());
  const [updatedMeetingDetails, setUpdatedMeetingDetails] = useState(null);
  const [updateMeetingStatus, setUpdateMeetingStatus] = useState([]);
  const [permissions, setPermissions] = useState({});
  const [search, setSearch] = useState("");
  const handleChangePage = (newPage) => {
    setPage(newPage);
  };
  console.log(isEdit, model, "isEdit")

  const handleChangeRowsPerPage = (value) => {
    setRowsPerPage(value);
    setPage(0);
  };

  const convertToAmPm = (timeInMinutes) => {
    const hours = Math.floor(timeInMinutes / 60);
    const minutes = timeInMinutes % 60;
    const period = hours < 12 ? "AM" : "PM";
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes < 10 ? "0" : ""}${minutes} ${period}`;
  };

  const _getSlotTimes = () => {
    toggleLoader();
    let body = {
      client: (updatedMeetingDetails) ? updatedMeetingDetails?.client : visitorDetails?.find((e) => e?.name == selectedClient)?._id,
      meetingWith: (updatedMeetingDetails) ? updatedMeetingDetails?.meetingWith : counsellorDetails?.find((e) => e?.name == selectedInviteTo)?._id,
      meetingDate: (updatedMeetingDetails) ? dayjs(updatedMeetingDetails?.meetingDate).format("YYYY-MM-DD") : dayjs(meetingDate).format("YYYY-MM-DD"),
    };

    axios.post("/slotTimes", body)
      .then((res) => {
        if (res?.data?.data) {
          setSlotTimes(res?.data?.data);
        }
        toggleLoader();
      })
      .catch((err) => {
        toggleLoader();
        OnUpdateError(err.data.message);
      });
  };

  const _getVisitor = () => {
    toggleLoader();
    axios.post(`visitor`).then((res) => {
      if (res?.data?.data) {
        setVisitorDetails(res?.data?.data);
      }
      toggleLoader();
    })
      .catch((err) => {
        toggleLoader();
        OnUpdateError(err.data.message);
      });
  };

  const handleSlotClick = (clickedSlot) => {
    // Initialize selectedSlots as an empty array if it's undefined
    const currentSelectedSlots = selectedSlots || [];
    let updatedSlots;
    const isSlotSelected = currentSelectedSlots.includes(clickedSlot);

    // Toggle the selected state
    if (isSlotSelected) {
      updatedSlots = currentSelectedSlots.filter((slot) => slot !== clickedSlot);
      setSelectedSlots(updatedSlots);
    } else {
      updatedSlots = [...currentSelectedSlots, clickedSlot];
      setSelectedSlots(updatedSlots);
    }

    // Update the isBooked property in the state
    const updatedData = slotTimes.map((slot) => {
      if (updatedSlots.includes(slot.startTime)) {
        return { ...slot, isBooked: true };
      } else {
        return { ...slot, isBooked: slot?.isBooked };
      }
    });

    setSlotTimes(updatedData);
  };

  const handleValidation = () => {
    let formIsValid = true;
    let errors = {};
    if (!data?.title) {
      formIsValid = false;
      errors["title"] = "Please enter title.";
    }
    if (!selectedClient) {
      formIsValid = false;
      errors["selectedClient"] = "Please select Client.";
    }
    if (!selectedInviteTo) {
      formIsValid = false;
      errors["selectedInviteTo"] = "Please select invite.";
    }
    if (!meetingDate) {
      formIsValid = false;
      errors["meetingDate"] = "Please select meeting date.";
    }
    setError(errors);
    return formIsValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleClear = () => {
    setModel(false);
    setData({});
    setError({});
    setIsEdit(false);
    setVisitorDetails([]);
    setCounsellorDetails([]);
    setSelectedInviteTo([]);
    setSelectedClient([]);
    setSelectedSlots([]);
    setSlotTimes([]);
    setMeetingId("");
    setMeetingDate(dayjs());
    setUpdatedMeetingDetails(null);
    setUpdateMeetingStatus([]);
  };
  const _getMeetingList = () => {
    toggleLoader();
    let body = {
      limit: rowsPerPage,
      page: page + 1,
      search: search || "",
    };
    axios
      .post(`meetingList`, body)
      .then((res) => {
        if (res?.data?.data) {
          setMeetingDetails(res?.data?.data);
        }
        toggleLoader();
      })
      .catch((err) => {
        toggleLoader();
        OnUpdateError(err.data.message);
      });
  };
  const _getCounselor = () => {
    toggleLoader();
    axios
      .post((user?.userType === 2 || user?.userType === 5) ? `counsellor` : `accountant`)
      .then((res) => {
        if (res?.data?.data) {
          setCounsellorDetails(res?.data?.data);
        }
        toggleLoader();
      })
      .catch((err) => {
        toggleLoader();
        OnUpdateError(err.data.message);
      });
  };

  const _deleteScheduleMeeting = (meetingId) => {
    Swal.fire({
      title: "<strong>Warning</strong>",
      icon: "error",
      html: "Are you sure you want to Delete Meeting",
      showCancelButton: true,
      confirmButtonColor: "#0492c2",
      iconColor: "#ff0000",
      confirmButtonText: "Yes",
      cancelButtonColor: "#1A1B2F",
    }).then(async (result) => {
      if (result.isConfirmed) {
        axios
          .delete(`meeting/delete/${meetingId}`)
          .then((res) => {
            if (res?.data?.data) {
              swal(res?.data?.message, { icon: "success", timer: 5000 });
              _getMeetingList();
            }
            toggleLoader();
          })
          .catch((err) => {
            toggleLoader();
            OnUpdateError(err.data.message);
          });
      }
    });
  };
  // const _deleteScheduleMeeting = (meetingId) => {
  //   toggleLoader();
  //   axios
  //     .delete(`meeting/delete/${meetingId}`)
  //     .then((res) => {
  //       if (res?.data?.data) {
  //         swal(res?.data?.message, { icon: "success", timer: 5000 });
  //         _getMeetingList();
  //       }
  //       toggleLoader();
  //     })
  //     .catch((err) => {
  //       toggleLoader();
  //       OnUpdateError(err.data.message);
  //     });
  // };
  const _addUpdateMeetingSchedule = () => {
    if (handleValidation()) {
      toggleLoader();

      let body = {
        title: data?.title,
        client: visitorDetails?.filter((e) => e?.name == selectedClient)[0]?._id,
        meetingWith: counsellorDetails?.filter((e) => e?.name == selectedInviteTo)[0]?._id,
        meetingDate: dayjs(meetingDate).format("YYYY-MM-DD"),
        slot_time: slotTimes,
        status: meetinStatusConfig?.find((e) => e?.statusName === updateMeetingStatus)?.statusId,
      };
      if (data?._id) {
        body.id = data?._id;
      }
      axios
        ?.post(data?._id ? "meeting/update" : `meeting/create`, body)
        .then((res) => {
          if (res?.data?.data) {
            swal(res?.data?.message, { icon: "success", timer: 5000 });
            _getMeetingList();
            handleClear();
          }
          toggleLoader();
        })
        .catch((err) => {
          toggleLoader();
          OnUpdateError(err.data.message);
        });
    }
  };
  const _getMeetingDetailsById = async () => {
    toggleLoader();
    await axios
      .get(`meeting/by_id/${meetingId}`)
      .then((res) => {
        if (res?.data?.data) {
          console.log(res?.data?.data, "res?.data?.data")
          setUpdatedMeetingDetails(res?.data?.data);
        }
        toggleLoader();
      })
      .catch((err) => {
        toggleLoader();
        OnUpdateError(err.data.message);
      });
  };



  useEffect(() => {
    if (model) {
      _getVisitor();
      _getCounselor();
    }
  }, [model]);

  useEffect(() => {
    (async () => {
      if (model && meetingId) {
        _getMeetingDetailsById();
      }
    })();
  }, [model, meetingId]);

  useEffect(() => {
    if (updatedMeetingDetails) {
      setSelectedClient(updatedMeetingDetails?.clientDetails?.name || "");
      setSelectedInviteTo(
        updatedMeetingDetails?.meetingWithDetails?.name || ""
      );
      setData({
        ...data,
        title: updatedMeetingDetails?.title,
        _id: updatedMeetingDetails?._id,
      });
      setMeetingDate(updatedMeetingDetails?.meetingDate || dayjs());
      setUpdateMeetingStatus(meetinStatusConfig?.find((e) => e?.statusId === updatedMeetingDetails?.status)?.statusName);
    }
  }, [updatedMeetingDetails]);

  useEffect(() => {
    _getMeetingList();
  }, [page, rowsPerPage, search]);

  useEffect(() => {
    if (visitorDetails?.length > 0 && counsellorDetails?.length > 0 && selectedClient?.length > 0 && selectedInviteTo?.length > 0 && meetingDate) {
      console.log(visitorDetails, "visitorDetails", counsellorDetails, "counsellorDetails", selectedClient, "selectedClient", selectedInviteTo, "selectedInviteTo", meetingDate)
      _getSlotTimes();
    }
  }, [model, meetingDate, visitorDetails, selectedClient, selectedInviteTo, counsellorDetails]);

  useEffect(() => {
    const menu = menuList?.find((e) => e?.path === pathname);
    if (menu) {
      const menuPermissions = menu.permissions;
      setPermissions({
        view: menuPermissions.includes(permissionStatus.view) ? true : false,
        create: menuPermissions.includes(permissionStatus.create) ? true : false,
        update: menuPermissions.includes(permissionStatus.update) ? true : false,
        delete: menuPermissions.includes(permissionStatus.delete) ? true : false,
      });
    }
  }, [menuList, location]);
  return (
    <>
      <PaperContainer elevation={0} square={false}>
        <Grid container>
          <Grid item xs={12}>
            <TableHeading
              title="Meeting List"
              buttonText={permissions?.create ? "Schedule Meeting" : ""}
              onClick={() => setModel(true)}
              handleSearch={(value) => { setSearch(value); }}
            />
          </Grid>
          <Grid item xs={12}>
            <TableContainer>
              {meetingDetails?.response?.length > 0 ? <Table sx={{ minWidth: 600 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell className={classes.paddedRow}>
                      No.
                    </StyledTableCell>
                    {/* <StyledTableCell>Title</StyledTableCell> */}
                    <StyledTableCell>Client</StyledTableCell>
                    <StyledTableCell>Meeting With</StyledTableCell>
                    <StyledTableCell>Date</StyledTableCell>
                    <StyledTableCell align="center">Start Time</StyledTableCell>
                    <StyledTableCell align="center">Status</StyledTableCell>
                    <StyledTableCell>Creator</StyledTableCell>
                    <StyledTableCell>Action</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {meetingDetails?.response?.map((row, index) => {
                    const getSlotStartTime = row?.slot_time?.filter((e) => e?.isBooked)
                    return (
                      <StyledTableRow key={index}>
                        <StyledTableCell>{index + 1 + page * rowsPerPage}</StyledTableCell>
                        <StyledTableCell
                          className={classes.paddedRow}
                          component="th"
                          scope="row"
                        >
                          {row?.clientDetails?.name}
                        </StyledTableCell>
                        <StyledTableCell>
                          {row?.meetingWithDetails?.name}
                        </StyledTableCell>
                        <StyledTableCell>{row?.meetingDate}</StyledTableCell>
                        <StyledTableCell align="center">
                          {convertToAmPm(getSlotStartTime[0]?.startTime)}
                        </StyledTableCell>
                        <StyledTableCell className={classes.paddedRow}>
                          <Box display={"flex"} justifyContent={"center"}>
                            <TextLabel
                              fontSize={"12px"}
                              color={"white"}
                              fontWeight={"400"}
                              title={meetinStatusConfig?.find((e) => e?.statusId === row.status)?.statusName}
                              textAlign={"center"}
                              style={{
                                backgroundColor: statusColors[row?.status],
                                borderRadius: "20px",
                                width: "130px",
                                padding: "5px 5px",
                              }}
                            />
                          </Box>
                        </StyledTableCell>
                        <StyledTableCell>
                          {row?.creatorDetails?.name}
                        </StyledTableCell>
                        <StyledTableCell>
                          <Box display={"flex"} gap={1}>
                            {/* <Assets
                            className={classes.viewBox}
                            src={"/assets/icons/view.svg"}
                            absolutePath={true}
                          /> */}
                            {permissions?.update && (
                              <Assets
                                className={classes.writeBox}
                                src={"/assets/icons/write.svg"}
                                absolutePath={true}
                                onClick={() => {
                                  console.log("lodaaa")
                                  setMeetingId(row?._id);
                                  setModel(true);
                                  setIsEdit(true);
                                }}
                              />
                            )}

                            {permissions?.delete && (
                              <Assets
                                className={classes.deleteBox}
                                src={"/assets/icons/delete.svg"}
                                absolutePath={true}
                                onClick={() => {
                                  _deleteScheduleMeeting(row?._id);
                                }}
                              />
                            )}
                          </Box>
                        </StyledTableCell>
                      </StyledTableRow>
                    )
                  })}
                </TableBody>
              </Table> : <DataNotFound icon={<ErrorOutlineIcon color="primary" style={{ fontSize: "3rem" }} />} elevation={2} />}
            </TableContainer>
          </Grid>
          {meetingDetails?.count > 0 && <Grid item xs={12}>
            <CommonPagination
              count={meetingDetails?.count}
              rowsPerPage={rowsPerPage}
              page={page}
              onRowsPerPageChange={handleChangeRowsPerPage}
              onPageChange={handleChangePage}
            />
          </Grid>}
        </Grid>
      </PaperContainer>
      <CommonModal
        open={model}
        onClose={handleClear}
        title={`${isEdit ? "Update" : "Schedule"} Meeting`}
        content={
          <AddMeeting
            visitorDetails={visitorDetails}
            counsellorDetails={counsellorDetails}
            data={data}
            setData={setData}
            error={error}
            handleChange={handleChange}
            onSubmit={_addUpdateMeetingSchedule}
            isEdit={isEdit}
            slotTimes={slotTimes}
            setSlotTimes={setSlotTimes}
            convertToAmPm={convertToAmPm}
            setSelectedSlot={setSelectedSlots}
            selectedInviteTo={selectedInviteTo}
            setSelectedInviteTo={setSelectedInviteTo}
            selectedClient={selectedClient}
            setSelectedClient={setSelectedClient}
            selectedSlot={selectedSlots}
            handleSlotClick={handleSlotClick}
            meetingDate={meetingDate}
            setMeetingDate={setMeetingDate}
            onDelete={_deleteScheduleMeeting}
            updatedMeetingDetails={updatedMeetingDetails}
            meetinStatusConfig={meetinStatusConfig}
            setUpdateMeetingStatus={setUpdateMeetingStatus}
            updateMeetingStatus={updateMeetingStatus}
            statusColors={statusColors}
            meetingId={meetingId}
          />
        }
      />
    </>
  );
};

export default MeetingList;

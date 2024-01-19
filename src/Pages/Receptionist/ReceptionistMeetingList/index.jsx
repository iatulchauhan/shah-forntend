import React, { useState } from 'react'
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
import axios from "../../../APiSetUp/axios";
import swal from 'sweetalert';
import { useEffect } from 'react';
import TableHeading from '../../../Components/Common/CommonTableHeading';
import PaperContainer from '../../../Components/Common/PaperContainer';
import { useAppContext } from '../../../Context/context';
import Assets from '../../../Components/Common/ImageContainer';
import CommonModal from '../../../Components/Common/CommonModel';
import CommonPagination from '../../../Components/Common/Pagination';
import { lightTheme } from '../../../theme';
import CommonButton from '../../../Components/Common/Button/CommonButton';
import dayjs from 'dayjs';
import AddScheduleMeeting from '../../../Components/ReceptionistModels/ScheduleMeetingModel';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        fontWeight: 600,
        fontSize: 16,
        color: theme.palette.primary.main,
        fontFamily: "Poppins",
        padding: "16px 8px",
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        fontFamily: "Poppins",
        fontWeight: 500,
        padding: '8px'
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
            padding: '15px 10px',
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

const rows = [
    {
        key: '1',
        title: "Lorem ipsum Dolor",
        meeting: 'John Doe',
        date: '30-10-2023',
        startTime: '10:00 AM',
        status: 'Pending Approval',
        creator: 'William Danny',
    },
    {
        key: '2',
        title: "Lorem ipsum Dolor",
        meeting: 'John Doe',
        date: '30-10-2023',
        startTime: '10:00 AM',
        status: 'Accepted',
        creator: 'William Danny',
    },
    {
        key: '3',
        title: "Lorem ipsum Dolor",
        meeting: 'John Doe',
        date: '30-10-2023',
        startTime: '10:00 AM',
        status: 'Completed',
        creator: 'William Danny',
    },

];
const ReceptionistMeetingList = () => {
    const { classes } = useStyles();
    const { OnUpdateError, toggleLoader } = useAppContext();
    const statusColors = {
        'Pending Approval': '#EB5757',
        'Accepted': '#2391C1',
        'Completed': '#4CC123',
    };
    //States
    const [model, setModel] = useState(false);
    const [data, setData] = useState({})
    const [error, setError] = useState({})
    const [isEdit, setIsEdit] = useState(false)
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [slotTimes, setSlotTimes] = useState([]);
    const [page, setPage] = useState(0);
    const [selectedSlots, setSelectedSlots] = useState([]);
    const [clients, setClients] = useState([]);
    const [meetingVisitorList, setMeetingVisitorList] = useState([]);
    const [meetingCounsellorList, setMeetingCounsellorList] = useState([]);
    const [selectedClient, setSelectedClient] = useState([]);
    const [selectedInviteTo, setSelectedInviteTo] = useState([]);
    console.log(meetingVisitorList, 'meetingVisitorList')
    const handleChangePage = (newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (value) => {
        setRowsPerPage(value);
        setPage(0);
    };
    const convertToAmPm = (timeInMinutes) => {
        console.log(timeInMinutes, "timeInMinutes")
        const hours = Math.floor(timeInMinutes / 60);
        const minutes = timeInMinutes % 60;
        const period = hours < 12 ? 'AM' : 'PM';
        const formattedHours = hours % 12 || 12;
        return `${formattedHours}:${minutes < 10 ? '0' : ''}${minutes} ${period}`;
    };

    const _getSlotTimes = () => {
        toggleLoader();
        let body = {
            "client": "658512dcf440749d23b28fb9",
            "inviteTo": "658141338e2809b893cec105",
            "sloatDate": "2024-01-01"
        }

        axios.post(`/slotTimes`, body).then((res) => {
            if (res?.data?.data) {
                setSlotTimes(res?.data?.data?.slot_time)
                console.log(res?.data?.data, 'res?.data?.data')
            }
            toggleLoader();
        }).catch((err) => {
            toggleLoader();
            OnUpdateError(err.data.message);
        }
        );
    }

    const _getMeetingVisitorList = () => {
        toggleLoader();
        axios.get(`/receptionist/visitor_list`).then((res) => {
            if (res?.data?.data) {
                setMeetingVisitorList(res?.data?.data)
            }
            toggleLoader();
        }).catch((err) => {
            toggleLoader();
            OnUpdateError(err.data.message);
        }
        );
    }

    const _getMeetingCounsellorList = () => {
        toggleLoader();
        axios.get(`/receptionist/counsellor_list`).then((res) => {
            if (res?.data?.data) {
                setMeetingCounsellorList(res?.data?.data)
            }
            toggleLoader();
        }).catch((err) => {
            toggleLoader();
            OnUpdateError(err.data.message);
        }
        );
    }

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
                return { ...slot, isSelected: true, isBooked: true };
            } else {
                return { ...slot, isSelected: false, isBooked: false };
            }
        });

        setSlotTimes(updatedData);
    }

    const handleValidation = () => {
        let formIsValid = true
        let errors = {}
        if (!data?.title) {
            formIsValid = false
            errors['title'] = 'Please enter title.'
        }
        if (!selectedClient) {
            formIsValid = false
            errors['selectedClient'] = 'Please select Client.'
        }
        if (!selectedInviteTo) {
            formIsValid = false
            errors['selectedInviteTo'] = 'Please select invite.'
        }
        if (!data?.meetingDate) {
            formIsValid = false
            errors['meetingDate'] = 'Please select meeting date.'
        }
        setError(errors)
        return formIsValid
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setData((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleClear = () => {
        setModel(false)
        setData({})
        setError({})
        setIsEdit(false)
    }

    const _getMeeting = () => {
        toggleLoader();
        axios.get(`branch?limit=${rowsPerPage}&page=${page + 1}`).then((res) => {
            if (res?.data?.data) {
                // setMeetingDetails(res?.data?.data)
            }
            toggleLoader();
        }).catch((err) => {
            toggleLoader();
            OnUpdateError(err.data.message);
        }
        );
    }

    const _addUpdateMeetingSchedule = () => {
        if (handleValidation()) {
            toggleLoader();
            let body = {
                "title": data?.title,
                "client": meetingVisitorList?.response?.filter((e) => e?.name == selectedClient)[0]?._id,
                "meetingWith": clients?.response?.filter((e) => e?.name == selectedInviteTo)[0]?._id,
                "meetingDate": dayjs(data?.meetingDate).format('DD/MM/YYYY'),
                "slot_time": slotTimes
            }
            if (data?._id) {
                body.id = data?._id
            }
            axios.post(`/receptionist/scheduleMeeting/counsellor/create`, body).then((res) => {
                if (res?.data?.data) {
                    swal(res?.data?.message, { icon: "success", timer: 5000, })
                    handleClear()
                }
                toggleLoader();
            }).catch((err) => {
                toggleLoader();
                OnUpdateError(err.data.message);
            }
            );
        }
    }

    useEffect(() => {
        _getSlotTimes()
    }, [])

    useEffect(() => {
        if (model) {
            _getMeetingVisitorList()
            _getMeetingCounsellorList()
        }
    }, [model])

    useEffect(() => {
        // _getMeeting()
    }, [page, rowsPerPage])

    return (
        <>
            <PaperContainer elevation={0} square={false}>
                <Grid container >
                    <Grid item xs={12}>
                        <TableHeading title="Meeting List" buttonText={"Schedule Meeting"} onClick={() => setModel(true)} />
                    </Grid>
                    <Grid item xs={12}>
                        <TableContainer>
                            <Table sx={{ minWidth: 600 }} aria-label="customized table">
                                <TableHead >
                                    <TableRow>
                                        <StyledTableCell className={classes.paddedRow}>#</StyledTableCell>
                                        <StyledTableCell>Title</StyledTableCell>
                                        <StyledTableCell>Meeting With</StyledTableCell>
                                        <StyledTableCell>Date</StyledTableCell>
                                        <StyledTableCell>Start Time</StyledTableCell>
                                        <StyledTableCell>Status</StyledTableCell>
                                        <StyledTableCell>Creator</StyledTableCell>
                                        <StyledTableCell>Action</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {clients?.response?.map((row, index) => (
                                        <StyledTableRow key={index} >
                                            <StyledTableCell style={{ paddingLeft: '13px' }}>{index + 1 + page * rowsPerPage}</StyledTableCell>
                                            <StyledTableCell className={classes.paddedRow}>{row?.title}</StyledTableCell>
                                            <StyledTableCell>{row?.meetingWithDetails?.name}</StyledTableCell>
                                            <StyledTableCell>{row?.meetingDate}</StyledTableCell>
                                            <StyledTableCell>{row.slot_time?.startTime}</StyledTableCell>
                                            <StyledTableCell className={classes.paddedRow} data-status={row.status}>
                                                <CommonButton
                                                    text={row.status}
                                                    type="submit"
                                                    background={statusColors[row.status] || ''}
                                                    borderRadius='8px'
                                                />
                                            </StyledTableCell>
                                            <StyledTableCell>{row?.creatorDetails?.name}</StyledTableCell>
                                            <StyledTableCell>
                                                <Box display={"flex"} gap={1}>
                                                    <Assets
                                                        className={classes.writeBox}
                                                        src={"/assets/icons/write.svg"}
                                                        absolutePath={true}
                                                    />
                                                    <Assets
                                                        className={classes.viewBox}
                                                        src={"/assets/icons/view.svg"}
                                                        absolutePath={true}
                                                    />
                                                    <Assets
                                                        className={classes.deleteBox}
                                                        src={"/assets/icons/delete.svg"}
                                                        absolutePath={true}
                                                    />
                                                </Box>
                                            </StyledTableCell>

                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
                <Box p={1}>
                    <CommonPagination
                        count={100}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        onPageChange={handleChangePage}
                    />
                </Box>
            </PaperContainer>
            <CommonModal
                open={model}
                onClose={handleClear}
                title={`${isEdit ? "Update" : "Schedule"} Meeting`}
                content={<AddScheduleMeeting data={data} setData={setData} error={error} handleChange={handleChange} onSubmit={_addUpdateMeetingSchedule} isEdit={isEdit} slotTimes={slotTimes} setSlotTimes={setSlotTimes}
                    convertToAmPm={convertToAmPm} setSelectedSlot={setSelectedSlots} meetingVisitorList={meetingVisitorList} selectedClient={selectedClient} setSelectedClient={setSelectedClient} selectedSlot={selectedSlots} handleSlotClick={handleSlotClick} meetingCounsellorList={meetingCounsellorList} />}
            />
        </>
    )
}

export default ReceptionistMeetingList
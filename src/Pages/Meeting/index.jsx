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
import Assets from '../../Components/Common/ImageContainer';
import PaperContainer from '../../Components/Common/PaperContainer';
import TableHeading from '../../Components/Common/CommonTableHeading';
import CommonModal from '../../Components/Common/CommonModel';
import CommonPagination from '../../Components/Common/Pagination';
import { useAppContext } from '../../Context/context';
import axios from "../../APiSetUp/axios";
import swal from 'sweetalert';
import { lightTheme } from '../../theme';
import CommonButton from '../../Components/Common/Button/CommonButton';
import AddMeeting from '../../Components/Meeting';
import { useEffect } from 'react';
import { Roles, meetingStatus } from '../../Utils/enum';
import dayjs, { Dayjs } from 'dayjs';
import TextLabel from '../../Components/Common/Fields/TextLabel';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        fontWeight: 600,
        fontSize: 16,
        color: theme.palette.primary.main,
        fontFamily: "Poppins",
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
const MeetingList = () => {
    const { classes } = useStyles();
    const { OnUpdateError, toggleLoader } = useAppContext();
    const statusColors = {
        0: '#ffcc00',
        1: '#00cc00',
        2: "#3366cc",
        3: '#339933',
        4: "#cc0000"
    };
    //States
    const [model, setModel] = useState(false);
    const [data, setData] = useState({ meetingDate: null })
    const [error, setError] = useState({})
    const [isEdit, setIsEdit] = useState(false)
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [slotTimes, setSlotTimes] = useState([]);
    const [page, setPage] = React.useState(0);
    const [selectedSlots, setSelectedSlots] = useState([]);
    const [clients, setClients] = useState([]);
    const [selectedClient, setSelectedClient] = useState([]);
    const [selectedInviteTo, setSelectedInviteTo] = useState([]);
    const [meetingDetails, setMeetingDetails] = useState([]);
    const [meetingId, setMeetingId] = useState("");
    const [meetingDate, setMeetingDate] = React.useState(dayjs());
    const handleChangePage = (newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (value) => {
        setRowsPerPage(value);
        setPage(0);
    };
    const convertToAmPm = (timeInMinutes) => {
        const hours = Math.floor(timeInMinutes / 60);
        const minutes = timeInMinutes % 60;
        const period = hours < 12 ? 'AM' : 'PM';
        const formattedHours = hours % 12 || 12;
        return `${formattedHours}:${minutes < 10 ? '0' : ''}${minutes} ${period}`;
    };

    const _getSlotTimes = () => {
        toggleLoader();
        console.log("meetingDate", meetingDate);
        let body = {
            "client": clients?.response?.filter((e) => e?.name == selectedClient)[0]?._id,
            "meetingWith": clients?.response?.filter((e) => e?.name == selectedInviteTo)[0]?._id,
            "meetingDate": meetingDate,
        }
        axios.post('/slotTimes', body).then((res) => {
            if (res?.data?.data) {
                console.log(res?.data?.data?.response, "slot response")
                setSlotTimes(res?.data?.data)
            }
            toggleLoader();
        }).catch((err) => {
            toggleLoader();
            OnUpdateError(err.data.message);
        }
        );
    }

    const _getClients = () => {
        toggleLoader();
        axios.post(`users`).then((res) => {
            if (res?.data?.data) {
                setClients(res?.data?.data)
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
                return { ...slot, isSelected: true };
            } else {
                return { ...slot, isSelected: false };
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
        if (!meetingDate) {
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
        setClients([])
        setSelectedInviteTo([])
        setSelectedClient([])
        setSelectedSlots([])
        setSlotTimes([])
        setMeetingId("")
    }

    const _getMeetingList = () => {
        toggleLoader();
        let body = {
            "limit": rowsPerPage,
            "page": page + 1
        }
        axios.post(`meetingList`, body).then((res) => {
            console.log(res, "resres")
            if (res?.data?.data) {
                setMeetingDetails(res?.data?.data)
                // toggleLoader()
            }
            toggleLoader()
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
                "client": clients?.response?.filter((e) => e?.name == selectedClient)[0]?._id,
                "meetingWith": clients?.response?.filter((e) => e?.name == selectedInviteTo)[0]?._id,
                "meetingDate": meetingDate,
                "slot_time": slotTimes
            }
            if (data?._id) {
                body.id = data?._id
            }
            axios.post(`meeting/create`, body).then((res) => {
                if (res?.data?.data) {
                    swal(res?.data?.message, { icon: "success", timer: 5000, })
                    _getMeetingList()
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
    console.log(selectedClient?.length, meetingDate, selectedInviteTo?.length, "selectedInviteTo?.length")
    useEffect(() => {
        if (selectedClient?.length > 0 && meetingDate && selectedInviteTo?.length > 0 && clients?.response?.length > 0) {
            _getSlotTimes()
        }
    }, [meetingDate, clients?.response])

    useEffect(() => {
        if (model) {
            _getClients()
        }
    }, [model])

    useEffect(() => {
        (async () => {
            console.log(meetingId, model, "meetingId")
            if (model && meetingId) {
                toggleLoader()
                await axios.get(`meeting/by_id/${meetingId}`).then((res) => {
                    if (res?.data?.data) {
                        console.log(res?.data?.data, "res?.data?.data")
                        const updatedMeetingDetails = res?.data?.data
                        setSelectedClient(updatedMeetingDetails?.clientDetails?.name || "")
                        setSelectedInviteTo(updatedMeetingDetails?.meetingWithDetails?.name || "")
                        setData({ ...data, title: updatedMeetingDetails?.title, meetingDate: updatedMeetingDetails?.meetingDate })
                        setMeetingDate(updatedMeetingDetails?.meetingDate || dayjs('2014-08-18T21:11:54'))
                        console.log(updatedMeetingDetails, "meetingDetails")
                    }
                    toggleLoader();
                }).catch((err) => {
                    toggleLoader();
                    OnUpdateError(err.data.message);
                })
            }
        })();
    }, [model, meetingId])

    React.useEffect(() => {
        _getMeetingList()
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
                                        <StyledTableCell className={classes.paddedRow}>No.</StyledTableCell>
                                        {/* <StyledTableCell>Title</StyledTableCell> */}
                                        <StyledTableCell>Client</StyledTableCell>
                                        <StyledTableCell>Meeting With</StyledTableCell>
                                        <StyledTableCell>Date</StyledTableCell>
                                        <StyledTableCell align='center'>Start Time</StyledTableCell>
                                        <StyledTableCell align='center'>Status</StyledTableCell>
                                        <StyledTableCell>Creator</StyledTableCell>
                                        <StyledTableCell align="right">Action</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {meetingDetails?.response?.map((row, index) => (
                                        <StyledTableRow key={index} >
                                            <StyledTableCell>{index + 1}</StyledTableCell>
                                            {/* <StyledTableCell className={classes.paddedRow} component="th" scope="row">
                                                {row?.title}
                                            </StyledTableCell> */}
                                            <StyledTableCell className={classes.paddedRow} component="th" scope="row">
                                                {row?.clientDetails?.name}
                                            </StyledTableCell>
                                            <StyledTableCell>{row?.meetingWithDetails?.name}</StyledTableCell>
                                            <StyledTableCell>{row?.meetingDate}</StyledTableCell>
                                            <StyledTableCell align='center'>{row?.startTime}</StyledTableCell>
                                            <StyledTableCell className={classes.paddedRow} align='center'>
                                                <TextLabel fontSize={"12px"} color={"white"} fontWeight={"400"} title={row?.status === meetingStatus?.approvalPending ? "Approval Pending"
                                                    : row?.status === meetingStatus?.approved ? "Approved"
                                                        : row?.status === meetingStatus?.onGoing ? "onGoing" :
                                                            row?.status === meetingStatus?.completed ? "Completed" :
                                                                row?.status === meetingStatus?.canceled ? "Canceled" : ""}
                                                    textAlign={'center'}
                                                    style={{
                                                        backgroundColor: statusColors[row?.status],
                                                        borderRadius: '20px',
                                                        width: '130px',
                                                        padding: '5px 5px'
                                                    }} />
                                            </StyledTableCell>
                                            <StyledTableCell>{row?.creatorDetails?.name}</StyledTableCell>
                                            <StyledTableCell>
                                                <Box display={"flex"} justifyContent={"end"} gap={1}>
                                                    <Assets
                                                        className={classes.writeBox}
                                                        src={"/assets/icons/write.svg"}
                                                        absolutePath={true}
                                                        onClick={() => { setModel(true); setMeetingId(row?._id) }}
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
                content={<AddMeeting data={data} setData={setData} error={error} handleChange={handleChange} onSubmit={_addUpdateMeetingSchedule} isEdit={isEdit} slotTimes={slotTimes} setSlotTimes={setSlotTimes}
                    convertToAmPm={convertToAmPm} setSelectedSlot={setSelectedSlots} clients={clients} selectedInviteTo={selectedInviteTo} setSelectedInviteTo={setSelectedInviteTo} selectedClient={selectedClient} setSelectedClient={setSelectedClient} selectedSlot={selectedSlots} handleSlotClick={handleSlotClick} meetingDate={meetingDate} setMeetingDate={setMeetingDate}/>}
            />
        </>
    )
}

export default MeetingList
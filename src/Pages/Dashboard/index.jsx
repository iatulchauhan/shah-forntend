import React, { useState } from 'react'
import PaperContainer from '../../Components/Common/PaperContainer';
import { Avatar, Box, Grid, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material';
import TextLabel from '../../Components/Common/Fields/TextLabel';
import CommonButton from '../../Components/Common/Button/CommonButton';
import { lightTheme } from '../../theme';
import { makeStyles } from "tss-react/mui";
import Assets from '../../Components/Common/ImageContainer';
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import TableHeading from '../../Components/Common/CommonTableHeading';
import CommonBarChart from '../../Components/Common/CommonBarChart';
import CommonAreaChart from '../../Components/Common/CommonAreaChart';
import CommonLineChart from '../../Components/Common/CommonLineChart';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';


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
        customButtom: {
            color: 'lightTheme.palette.bgDarkPrimary.main',
            '&:hover': {
                backgroundColor: '#fff'
            }
        },
        customTab: {
            color: "#737791",
            minHeight: "22px",
            backgroundColor: "#EDF2F6",
            borderRadius: "6px",
            fontSize: "10px",
            fontWeight: "500",
            padding: "8px 10px",
            minWidth: "0",
            marginRight: "8px",
            '&.Mui-selected': {
                color: theme.palette.bgWhite.main,
                backgroundColor: theme.palette.primary.main,
            },

        },
        customIndicators: {
            minHeight: "40px",
            '& .MuiTabs-indicator': {
                display: "none"
            }
        },
        customTabPanel: {
            padding: "0px !important"
        }
    };
});

const rows = [
    {
        key: '1',
        name: "John Doe",
        contactNo: '+91 9865998545',
        emailId: 'johndoe@gmail.com',
        expiringPlan: '$2000',
        activePlan: 'Lorem ipsum',
    },
    {
        key: '2',
        name: "John Doe",
        contactNo: '+91 9865998545',
        emailId: 'johndoe@gmail.com',
        expiringPlan: '$2000',
        activePlan: 'Lorem ipsum',
    },
    {
        key: '3',
        name: "John Doe",
        contactNo: '+91 9865998545',
        emailId: 'johndoe@gmail.com',
        expiringPlan: '$2000',
        activePlan: 'Lorem ipsum',
    },
    {
        key: '4',
        name: "John Doe",
        contactNo: '+91 9865998545',
        emailId: 'johndoe@gmail.com',
        expiringPlan: '$2000',
        activePlan: 'Lorem ipsum',
    },
];

const upcomingData = [
    {
        name: "Javob John",
        subline: "Design Review",
        time: "1st Oct, 10 AM to 11: AM",
        backgroundColor: "rgba(205, 249, 255, 1)",
        borderColor: "rgba(0, 196, 223, 1)"
    },
    {
        name: "Javob John",
        subline: "Design Review",
        time: "1st Oct, 10 AM to 11: AM",
        backgroundColor: "rgba(255, 229, 205, 1)",
        borderColor: "rgba(231, 142, 60, 1)"
    },
    {
        name: "Javob John",
        subline: "Design Review",
        time: "1st Oct, 10 AM to 11: AM",
        backgroundColor: "rgba(215, 205, 255, 1)",
        borderColor: "rgba(119, 97, 205, 1)"
    },
]
const past = [
    {
        name: "Javob John",
        subline: "Design Review",
        time: "1st Oct, 10 AM to 11: AM",
        backgroundColor: "rgba(205, 249, 255, 1)",
        borderColor: "rgba(0, 196, 223, 1)"
    },
    {
        name: "Javob John",
        subline: "Design Review",
        time: "1st Oct, 10 AM to 11: AM",
        backgroundColor: "rgba(255, 229, 205, 1)",
        borderColor: "rgba(231, 142, 60, 1)"
    },
]
const ongoing = [
    {
        name: "Javob John",
        subline: "Design Review",
        time: "1st Oct, 10 AM to 11: AM",
        backgroundColor: "rgba(205, 249, 255, 1)",
        borderColor: "rgba(0, 196, 223, 1)"
    },
]

const summaryData = [
    {
        name: "Total Receptionist",
        count: "250",
        avtar: "/assets/icons/DashboardIcon-1.png",
        background: "#FFE2E5"
    },
    {
        name: "Total Counsellor",
        count: "300",
        avtar: "/assets/icons/DashboardIcon-2.png",
        background: "#FFF4DE"
    },
    {
        name: "Total Accountant",
        count: "360",
        avtar: "/assets/icons/DashboardIcon-3.png",
        background: "#DCFCE7"
    },
    {
        name: "Total Users",
        count: "2160",
        avtar: "/assets/icons/DashboardIcon-4.png",
        background: "#F3E8FF"
    },
    {
        name: "Total New Visitor",
        count: "2160",
        avtar: "/assets/icons/DashboardIcon-5.png",
        background: "#E0F0FF"
    },
]

const Dashboard = () => {

    const { classes } = useStyles();
    const [value, setValue] = useState('Upcoming');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>

            <PaperContainer>
                <Box padding={3} display={"flex"} justifyContent={"space-between"} alignItems={"center"} >
                    <TextLabel variant={"h6"} fontWeight={"600"} title={"Today’s Summary"} />
                    <CommonButton
                        text="Export"
                        background={lightTheme.palette.bgWhite.main}
                        borderRadius={2}
                        color={lightTheme.palette.bgDarkPrimary.main}
                        border={"2px solid #EDF2F6"}
                        className={classes.customButtom}
                    // startIcon={<Assets src={exportIcon} absolutePath={true} />}
                    />
                </Box>
                <Grid container padding={3} spacing={3}>
                    {summaryData.map((item) => {
                        return (
                            <Grid item xs={12} sm={6} md={3} lg={2.4}>
                                <Box display={"flex"} flexDirection={"column"} gap={2} backgroundColor={item.background} borderRadius={4} padding={2}>
                                    <Assets src={item.avtar} absolutePath={true} height={"56px"} width={"56px"} />
                                    <TextLabel variant={"h5"} fontWeight={600} title={item.count} />
                                    <TextLabel variant={"subtitle2"} fontWeight={500} title={item.name} />
                                </Box>
                            </Grid>
                        )
                    })}
                </Grid>
            </PaperContainer>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={6} lg={4}>
                    <PaperContainer >
                        <TextLabel variant={"h6"} fontWeight={600} title={"Total Revenue"} style={{ padding: "20px 0px 0px 10px" }} />
                        <CommonBarChart />
                    </PaperContainer>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4}>
                    <PaperContainer>
                        <TextLabel variant={"h6"} fontWeight={600} title={"Customer Satisfaction"} style={{ padding: "20px 0px 0px 10px" }} />
                        <CommonAreaChart />
                    </PaperContainer>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4}>
                    <PaperContainer>
                        <TextLabel variant={"h6"} fontWeight={600} title={"Scheduled Meetings"} style={{ padding: "20px 0px 0px 10px" }} />
                        <Box padding={1} display={"flex"} flexDirection={"column"} >
                            <TabContext value={value} padding={"0px"}>
                                <TabList onChange={handleChange} aria-label="lab API tabs example" className={classes.customIndicators}>
                                    <Tab className={classes.customTab} label="Upcoming" value="Upcoming" />
                                    <Tab className={classes.customTab} label="Past" value="Past" />
                                    <Tab className={classes.customTab} label="Ongoing" value="Ongoing" />
                                </TabList>
                                <TabPanel value="Upcoming" className={classes.customTabPanel}>
                                    <Box sx={{
                                        margin: "0px",
                                        maxHeight: "300px",
                                        overflow: "scroll",
                                        "::-webkit-scrollbar": {
                                            width: "0.5px"
                                        },
                                        "::-webkit-scrollbar-thumb": {
                                            backgroundColor: "transparent"
                                        }
                                    }}>
                                        {upcomingData.map((item) => {
                                            return (
                                                <Box backgroundColor={item.backgroundColor} padding={2} marginBottom={1} sx={{
                                                    borderLeft: `5px solid ${item.borderColor}`, minWidth: "300px"
                                                }}>
                                                    <Box display={"flex"} justifyContent={"space-between"}>
                                                        <Box display={"flex"} gap={1}>
                                                            <Avatar />
                                                            <Box>
                                                                <TextLabel variant={"body1"} fontWeight={600} color={"theme.palette.primary.main"} title={item.name} />
                                                                <TextLabel variant={"body2"} fontWeight={500} color={'#737791'} title={item.subline} />
                                                            </Box>
                                                        </Box>
                                                        <TextLabel variant={"body2"} fontWeight={500} color={'#737791'} title={item.time} />
                                                    </Box>
                                                    <Box display={"flex"} justifyContent={"space-between"} marginTop={2}>
                                                        <Box display={"flex"} gap={1} >
                                                            <Avatar sx={{ height: "30px", width: "30px" }} />
                                                            <Avatar sx={{ height: "30px", width: "30px" }} />
                                                            <Avatar sx={{ height: "30px", width: "30px" }} />
                                                            <Avatar sx={{ height: "30px", width: "30px" }} />
                                                        </Box>
                                                        <CommonButton
                                                            text="Export"
                                                            color={lightTheme.palette.bgWhite.main}
                                                            borderRadius={2}
                                                            background={item.borderColor}
                                                            fontSize={"10px"}
                                                        />
                                                    </Box>

                                                </Box>
                                            )
                                        })}
                                    </Box>

                                </TabPanel >
                                <TabPanel value="Past" className={classes.customTabPanel}>
                                    <Box sx={{
                                        margin: "0px",
                                        maxHeight: "300px",
                                        overflow: "scroll",
                                        "::-webkit-scrollbar": {
                                            width: "0.5px"
                                        },
                                        "::-webkit-scrollbar-thumb": {
                                            backgroundColor: "transparent"
                                        }
                                    }}>
                                        {past.map((item) => {
                                            return (
                                                <Box backgroundColor={item.backgroundColor} padding={2} marginBottom={1} sx={{
                                                    borderLeft: `5px solid ${item.borderColor}`, minWidth: "300px"
                                                }}>
                                                    <Box display={"flex"} justifyContent={"space-between"}>
                                                        <Box display={"flex"} gap={1}>
                                                            <Avatar />
                                                            <Box>
                                                                <TextLabel variant={"body1"} fontWeight={600} color={"theme.palette.primary.main"} title={item.name} />
                                                                <TextLabel variant={"body2"} fontWeight={500} color={'#737791'} title={item.subline} />
                                                            </Box>
                                                        </Box>
                                                        <TextLabel variant={"body2"} fontWeight={500} color={'#737791'} title={item.time} />
                                                    </Box>
                                                    <Box display={"flex"} justifyContent={"space-between"} marginTop={2}>
                                                        <Box display={"flex"} gap={1} >
                                                            <Avatar sx={{ height: "30px", width: "30px" }} />
                                                            <Avatar sx={{ height: "30px", width: "30px" }} />
                                                            <Avatar sx={{ height: "30px", width: "30px" }} />
                                                            <Avatar sx={{ height: "30px", width: "30px" }} />
                                                        </Box>
                                                        <CommonButton
                                                            text="Export"
                                                            color={lightTheme.palette.bgWhite.main}
                                                            borderRadius={2}
                                                            background={item.borderColor}
                                                            fontSize={"10px"}
                                                        />
                                                    </Box>
                                                </Box>
                                            )
                                        })}
                                    </Box>
                                </TabPanel>
                                <TabPanel value="Ongoing" className={classes.customTabPanel}>
                                    <Box sx={{
                                        margin: "0px",
                                        maxHeight: "300px",
                                        overflow: "scroll",
                                        "::-webkit-scrollbar": {
                                            width: "0.5px"
                                        },
                                        "::-webkit-scrollbar-thumb": {
                                            backgroundColor: "transparent"
                                        }
                                    }}>
                                        {ongoing.map((item) => {
                                            return (
                                                <Box backgroundColor={item.backgroundColor} padding={2} marginBottom={1} sx={{
                                                    borderLeft: `5px solid ${item.borderColor}`, minWidth: "300px",
                                                }}>
                                                    <Box display={"flex"} justifyContent={"space-between"}>
                                                        <Box display={"flex"} gap={1}>
                                                            <Avatar />
                                                            <Box>
                                                                <TextLabel variant={"body1"} fontWeight={600} color={"theme.palette.primary.main"} title={item.name} />
                                                                <TextLabel variant={"body2"} fontWeight={500} color={'#737791'} title={item.subline} />
                                                            </Box>
                                                        </Box>
                                                        <TextLabel variant={"body2"} fontWeight={500} color={'#737791'} title={item.time} />
                                                    </Box>
                                                    <Box display={"flex"} justifyContent={"space-between"} marginTop={2}>
                                                        <Box display={"flex"} gap={1} >
                                                            <Avatar sx={{ height: "30px", width: "30px" }} />
                                                            <Avatar sx={{ height: "30px", width: "30px" }} />
                                                            <Avatar sx={{ height: "30px", width: "30px" }} />
                                                            <Avatar sx={{ height: "30px", width: "30px" }} />
                                                        </Box>
                                                        <CommonButton
                                                            text="Export"
                                                            color={lightTheme.palette.bgWhite.main}
                                                            borderRadius={2}
                                                            background={item.borderColor}
                                                            fontSize={"10px"}
                                                        />
                                                    </Box>
                                                </Box>
                                            )
                                        })}
                                    </Box>
                                </TabPanel>
                            </TabContext>
                        </Box>
                    </PaperContainer>
                </Grid>
                <Grid item xs={12} md={6} lg={7}>
                    <PaperContainer>
                        <Grid item xs={12}>
                            <TableHeading title="Investors" removeSearchField showSelectDropDown />
                        </Grid>
                        <Grid item xs={12}>
                            <TableContainer>
                                <Table sx={{ minWidth: 600 }} aria-label="customized table">
                                    <TableHead >
                                        <TableRow>
                                            <StyledTableCell className={classes.paddedRow}>#</StyledTableCell>
                                            <StyledTableCell>Name</StyledTableCell>
                                            <StyledTableCell>Contact No.</StyledTableCell>
                                            <StyledTableCell>Email Id</StyledTableCell>
                                            <StyledTableCell>Investment Amount</StyledTableCell>
                                            <StyledTableCell>Active Plan</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.map((row, index) => (
                                            <StyledTableRow key={index} >
                                                <StyledTableCell>{row.key}</StyledTableCell>
                                                <StyledTableCell className={classes.paddedRow} component="th" scope="row">
                                                    {row.name}
                                                </StyledTableCell>
                                                <StyledTableCell>{row.contactNo}</StyledTableCell>
                                                <StyledTableCell>{row.emailId}</StyledTableCell>
                                                <StyledTableCell>{row.expiringPlan}</StyledTableCell>
                                                <StyledTableCell>{row.activePlan}</StyledTableCell>


                                            </StyledTableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </PaperContainer>
                </Grid>
                <Grid item xs={12} md={6} lg={5}>
                    <PaperContainer>
                        <TextLabel variant={"h6"} fontWeight={600} title={"Visitor Insights"} style={{ padding: "20px 0px 0px 10px" }} />
                        <CommonLineChart />
                    </PaperContainer>
                </Grid>
            </Grid>
        </>
    )
}

export default Dashboard;
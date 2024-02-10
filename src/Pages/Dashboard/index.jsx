import React, { useEffect, useState } from "react";
import PaperContainer from "../../Components/Common/PaperContainer";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import TextLabel from "../../Components/Common/Fields/TextLabel";
import CommonButton from "../../Components/Common/Button/CommonButton";
import { lightTheme } from "../../theme";
import { makeStyles } from "tss-react/mui";
import Assets from "../../Components/Common/ImageContainer";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import TableHeading from "../../Components/Common/CommonTableHeading";
import CommonBarChart from "../../Components/Common/CommonBarChart";
import CommonAreaChart from "../../Components/Common/CommonAreaChart";
import CommonLineChart from "../../Components/Common/CommonLineChart";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import axios, { Image_BASE_URL } from "../../APiSetUp/axios";
import { useAppContext } from "../../Context/context";
import DashboardSummaryBox from "../../Components/Common/DashboardSummaryBox";
import CommonPagination from "../../Components/Common/Pagination";

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
    customButtom: {
      background: lightTheme.palette.bgWhite.main,
      borderRadius: "8px",
      color: lightTheme.palette.bgDarkPrimary.main,
      border: "2px solid #EDF2F6",
      "&:hover": {
        backgroundColor: "#fff",
      },
    },
    customTab: {
      color: lightTheme.palette.bgLightExtraLightGray.main,
      minHeight: "22px",
      backgroundColor: "#EDF2F6",
      borderRadius: "6px",
      fontSize: "10px",
      fontWeight: "500",
      padding: "8px 10px",
      minWidth: "0",
      marginRight: "8px",
      "&.Mui-selected": {
        color: theme.palette.bgWhite.main,
        backgroundColor: theme.palette.primary.main,
      },
    },
    customIndicators: {
      minHeight: "40px",
      "& .MuiTabs-indicator": {
        display: "none",
      },
    },
    customTabPanel: {
      padding: "0px !important",
    },
    card: {
      padding: "20px",
      borderRadius: "16px",
      border: "1px solid #F8F9FA",
      boxShadow: "0px 4px 20px 0px rgba(238, 238, 238, 0.50)",
      background: "#FFF",
    },
    cardImage: {
      height: "150px",
      border: "1px solid #EDF2F6",
      borderRadius: "16px",
      backgroundPosition: "top center",
    },
    cardContent: {
      display: "flex",
      justifyContent: "space-between",
      padding: "15px 5px",
      gap: "5px",
    },
    cardDescription: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      display: "-webkit-box",
      WebkitBoxOrient: "vertical",
      WebkitLineClamp: 4,
      minHeight: "70px",
    },
  };
});

 


const past = [
  {
    name: "Javob John",
    subline: "Design Review",
    time: "1st Oct, 10 AM to 11: AM",
    backgroundColor: "rgba(205, 249, 255, 1)",
    borderColor: "rgba(0, 196, 223, 1)",
  },
  {
    name: "Javob John",
    subline: "Design Review",
    time: "1st Oct, 10 AM to 11: AM",
    backgroundColor: "rgba(255, 229, 205, 1)",
    borderColor: "rgba(231, 142, 60, 1)",
  },
];
const ongoing = [
  {
    name: "Javob John",
    subline: "Design Review",
    time: "1st Oct, 10 AM to 11: AM",
    backgroundColor: "rgba(205, 249, 255, 1)",
    borderColor: "rgba(0, 196, 223, 1)",
  },
];

const Dashboard = () => {
  const { classes } = useStyles();
  const { OnUpdateError, toggleLoader, user } = useAppContext();
  const [value, setValue] = useState("Upcoming");
  const [dashboardSummary, setDashboardSummary] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState([]);
  const [topInvestors, setTopInvestors] = useState([]);
  const [offerDetails, setOfferDetails] = useState([]);
  const [visitorInsights, setVisitorInsights] = useState([]);
  const [meetingDetails, setMeetingDetails] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
 
  const upcomingData = meetingDetails.map((item) => ({
    name: item?.creatorDetails?.name,
    subline: "Design Review",
    time: "1st Oct, 10 AM to 11: AM",
    backgroundColor: "rgba(205, 249, 255, 1)",
    borderColor: "rgba(0, 196, 223, 1)",
  }));
  const upcomingData1 = [
    {
      name: "Javob John",
      subline: "Design Review",
      time: "1st Oct, 10 AM to 11: AM",
      backgroundColor: "rgba(205, 249, 255, 1)",
      borderColor: "rgba(0, 196, 223, 1)",
    },
    {
      name: "Javob John",
      subline: "Design Review",
      time: "1st Oct, 10 AM to 11: AM",
      backgroundColor: "rgba(255, 229, 205, 1)",
      borderColor: "rgba(231, 142, 60, 1)",
    },
    {
      name: "Javob John",
      subline: "Design Review",
      time: "1st Oct, 10 AM to 11: AM",
      backgroundColor: "rgba(215, 205, 255, 1)",
      borderColor: "rgba(119, 97, 205, 1)",
    },
  ];

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (value) => {
    setRowsPerPage(value);
    setPage(0);
  };

  console.log(meetingDetails, "meetingDetails ");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const _getOffer = () => {
    toggleLoader();
    axios
      .get("offer")
      .then((res) => {
        if (res?.data?.data) {
          setOfferDetails(res?.data?.data);
        }
        toggleLoader();
      })
      .catch((err) => {
        toggleLoader();
        OnUpdateError(err.data.message);
      });
  };

  const _getDashboardSummary = () => {
    let body = {};
    axios
      .post(`/dashboard_deatils`, body)
      .then((res) => {
        if (res?.data?.data) {
          setDashboardSummary(res?.data?.data);
        }
      })
      .catch((err) => {
        toggleLoader();
        OnUpdateError(err.data.message);
      });
  };

  const _getDashboardTotalRevenue = () => {
    let body = {};
    axios
      .post(`/total_Revenue`, body)
      .then((res) => {
        if (res?.data?.data?.response) {
          setTotalRevenue(res?.data?.data?.response);
        }
      })
      .catch((err) => {
        toggleLoader();
        OnUpdateError(err.data.message);
      });
  };

  const _getDashboardTopInvestors = () => {
    let body = {};
    axios
      .post(`/top_invester`, body)
      .then((res) => {
        if (res?.data?.data) {
          setTopInvestors(res?.data?.data);
        }
      })
      .catch((err) => {
        toggleLoader();
        OnUpdateError(err.data.message);
      });
  };

  const _getDashboardVisitorInsights = () => {
    let body = {};
    axios
      .post(`/visitor_Insights`, body)
      .then((res) => {
        if (res?.data?.data) {
          setVisitorInsights(res?.data?.data);
        }
      })
      .catch((err) => {
        toggleLoader();
        OnUpdateError(err.data.message);
      });
  };

  const _getMeetingList = () => {
    toggleLoader();
    let body = {
      limit: rowsPerPage,
      page: page + 1,
      search: search || "",
    };
    // let body = {
    //   limit: 1,
    //   page: 1,
    //   search:   "",
    // };
    axios
      .post(`meetingList`, body)
      .then((res) => {
        if (res?.data?.data?.response) {
          setMeetingDetails(res?.data?.data?.response);
        }
        toggleLoader();
      })
      .catch((err) => {
        toggleLoader();
        OnUpdateError(err.data.message);
      });
  };
  useEffect(() => {
    _getOffer();
    _getDashboardSummary();
    _getDashboardTotalRevenue();
    _getDashboardTopInvestors();
    _getDashboardVisitorInsights();
    _getMeetingList();
  }, []);
   return (
    <>
      <Grid container spacing={2} mb={4}>
        {dashboardSummary?.todaySummary && (
          <Grid item xs={12}>
            <PaperContainer>
              <Box
                padding={3}
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <TextLabel
                  variant={"h6"}
                  fontWeight={"600"}
                  title={"Today’s Summary"}
                />
                {/* <CommonButton
              text="Export"
              className={classes.customButtom}
              // startIcon={<Assets src={exportIcon} absolutePath={true} />}
            /> */}
              </Box>
              <Grid container padding={3} spacing={3}>
                <DashboardSummaryBox
                  count={dashboardSummary?.todaySummary?.todayVisitor || 0}
                  title={"Total Visitor"}
                  iconColor={"#FA5A7D"}
                  backgroundColor={"#FFE2E5"}
                  avtar={"/assets/icons/DashboardIcon1.png"}
                />
                <DashboardSummaryBox
                  count={dashboardSummary?.todaySummary?.todayMetting || 0}
                  title={"Total Meetings"}
                  iconColor={"#FF947A"}
                  backgroundColor={"#FFF4DE"}
                  avtar={"/assets/icons/DashboardIcon2.png"}
                />
                <DashboardSummaryBox
                  count={
                    dashboardSummary?.todaySummary?.totalInvestmentAmount || 0
                  }
                  title={"Total Investment Amount"}
                  iconColor={"#3CD856"}
                  backgroundColor={"#DCFCE7"}
                  avtar={"/assets/icons/DashboardIcon3.png"}
                />
                <DashboardSummaryBox
                  count={dashboardSummary?.todaySummary?.totalPayout || 0}
                  title={"Total Payout"}
                  iconColor={"#BF83FF"}
                  backgroundColor={"#F3E8FF"}
                  avtar={"/assets/icons/DashboardIcon4.png"}
                />
                <DashboardSummaryBox
                  count={dashboardSummary?.todaySummary?.todayClient || 0}
                  title={"Total New Client"}
                  iconColor={"#4FA3F1"}
                  backgroundColor={"#E0F0FF"}
                  avtar={"/assets/icons/DashboardIcon4.png"}
                />
              </Grid>
            </PaperContainer>
          </Grid>
        )}
        {dashboardSummary?.allOverSummary && (
          <Grid item xs={12}>
            <PaperContainer>
              <Box
                padding={3}
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <TextLabel
                  variant={"h6"}
                  fontWeight={"600"}
                  title={"All Over Summary"}
                />
                {/* <CommonButton text="Export" className={classes.customButtom} /> */}
              </Box>
              <Grid container padding={3} spacing={3}>
                <DashboardSummaryBox
                  count={
                    dashboardSummary?.allOverSummary?.totalReceptionist || 0
                  }
                  title={"Total Receptionist"}
                  iconColor={"#FA5A7D"}
                  backgroundColor={"#FFE2E5"}
                  avtar={"/assets/icons/DashboardIcon1.png"}
                />
                <DashboardSummaryBox
                  count={dashboardSummary?.allOverSummary?.totalCounsellor || 0}
                  title={"Total Counsellor"}
                  iconColor={"#FF947A"}
                  backgroundColor={"#FFF4DE"}
                  avtar={"/assets/icons/DashboardIcon2.png"}
                />
                <DashboardSummaryBox
                  count={dashboardSummary?.allOverSummary?.totalAccountant || 0}
                  title={"Total Accountant"}
                  iconColor={"#3CD856"}
                  backgroundColor={"#DCFCE7"}
                  avtar={"/assets/icons/DashboardIcon3.png"}
                />
                <DashboardSummaryBox
                  count={dashboardSummary?.allOverSummary?.totalUser || 0}
                  title={"Total Users"}
                  iconColor={"#BF83FF"}
                  backgroundColor={"#F3E8FF"}
                  avtar={"/assets/icons/DashboardIcon4.png"}
                />
                <DashboardSummaryBox
                  count={
                    dashboardSummary?.allOverSummary?.totalInvestmentAmount || 0
                  }
                  title={"Total Investment Amount"}
                  iconColor={"#4FA3F1"}
                  backgroundColor={"#E0F0FF"}
                  avtar={"/assets/icons/DashboardIcon4.png"}
                />
              </Grid>
            </PaperContainer>
          </Grid>
        )}
        {user?.userType === 1 && (
          <Grid item xs={12}>
            <Grid container spacing={4}>
              {offerDetails?.response?.length > 0 &&
                offerDetails?.response?.map((item) => {
                  return (
                    <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
                      <Card className={classes.card}>
                        <CardMedia
                          className={classes.cardImage}
                          image={`${Image_BASE_URL}${item?.image}`}
                          title="green iguana"
                        />
                        <CardContent className={classes.cardContent}>
                          <TextLabel
                            fontSize={"18px"}
                            color={"#000"}
                            fontWeight={"600"}
                            title={item?.title}
                          />
                          <Box display={"flex"} justifyContent={"end"} gap={1}>
                            {/* <Assets
                          className={classes.writeBox}
                          src={"/assets/icons/write.svg"}
                          absolutePath={true}
                          onClick={() => {
                            setData(item);
                            setIsEdit(true);
                            setDescription(item?.description);
                            setModel(true);
                          }}
                        />
                        <Assets
                          className={classes.deleteBox}
                          src={"/assets/icons/delete.svg"}
                          absolutePath={true}
                          onClick={() => {
                            setDeleteId(item?._id);
                            _handleDelete();
                          }}
                        /> */}
                          </Box>
                        </CardContent>
                        <TextLabel
                          className={classes.cardDescription}
                          variant={"body2"}
                          color={lightTheme.palette.bgLightExtraLightGray.main}
                          fontWeight={"400"}
                          title={
                            <div
                              dangerouslySetInnerHTML={{
                                __html: item?.description,
                              }}
                            />
                          }
                        />
                      </Card>
                    </Grid>
                  );
                })}
            </Grid>
          </Grid>
        )}
        <Grid item xs={12} sm={12} md={6} lg={7}>
          <PaperContainer sx={{ height: "400px" }}>
            <TextLabel
              variant={"h6"}
              fontWeight={600}
              title={"Total Revenue"}
              style={{ padding: "20px 0px 0px 10px" }}
            />
            <CommonBarChart totalRevenue={totalRevenue} />
          </PaperContainer>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={5}>
          <PaperContainer sx={{ height: "400px" }}>
            <TextLabel
              variant={"h6"}
              fontWeight={600}
              title={"Scheduled Meetings"}
              style={{ padding: "20px 0px 0px 10px" }}
            />
            <Box padding={1} display={"flex"} flexDirection={"column"}>
              <TabContext value={value} padding={"0px"}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                  className={classes.customIndicators}
                >
                  <Tab
                    className={classes.customTab}
                    label="Upcoming"
                    value="Upcoming"
                  />
                  <Tab
                    className={classes.customTab}
                    label="Past"
                    value="Past"
                  />
                  <Tab
                    className={classes.customTab}
                    label="Ongoing"
                    value="Ongoing"
                  />
                </TabList>
                <TabPanel value="Upcoming" className={classes.customTabPanel}>
                  <Box
                    sx={{
                      margin: "0px",
                      maxHeight: "300px",
                      overflow: "scroll",
                      "::-webkit-scrollbar": {
                        width: "0.5px",
                      },
                      "::-webkit-scrollbar-thumb": {
                        backgroundColor: "transparent",
                      },
                    }}
                  >
                    {upcomingData.map((item) => {
                      return (
                        <Box
                          backgroundColor={item.backgroundColor}
                          padding={2}
                          marginBottom={1}
                          sx={{
                            borderLeft: `5px solid ${item.borderColor}`,
                            minWidth: "300px",
                          }}
                        >
                          <Box
                            display={"flex"}
                            justifyContent={"space-between"}
                          >
                            <Box display={"flex"} gap={1}>
                              <Avatar />
                              <Box>
                                <TextLabel
                                  variant={"body1"}
                                  fontWeight={600}
                                  color={"theme.palette.primary.main"}
                                  title={item.name}
                                />
                                <TextLabel
                                  variant={"body2"}
                                  fontWeight={500}
                                  color={
                                    lightTheme.palette.bgLightExtraLightGray
                                      .main
                                  }
                                  title={item.subline}
                                />
                              </Box>
                            </Box>
                            <TextLabel
                              variant={"body2"}
                              fontWeight={500}
                              color={
                                lightTheme.palette.bgLightExtraLightGray.main
                              }
                              title={item.time}
                            />
                          </Box>
                          <Box
                            display={"flex"}
                            justifyContent={"space-between"}
                            marginTop={2}
                          >
                            <Box display={"flex"} gap={1}>
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
                          </Box>{" "}
                        </Box>
                      );
                    })}
                  </Box>
                </TabPanel>
                <TabPanel value="Past" className={classes.customTabPanel}>
                  <Box
                    sx={{
                      margin: "0px",
                      maxHeight: "300px",
                      overflow: "scroll",
                      "::-webkit-scrollbar": {
                        width: "0.5px",
                      },
                      "::-webkit-scrollbar-thumb": {
                        backgroundColor: "transparent",
                      },
                    }}
                  >
                    {past.map((item) => {
                      return (
                        <Box
                          backgroundColor={item.backgroundColor}
                          padding={2}
                          marginBottom={1}
                          sx={{
                            borderLeft: `5px solid ${item.borderColor}`,
                            minWidth: "300px",
                          }}
                        >
                          <Box
                            display={"flex"}
                            justifyContent={"space-between"}
                          >
                            <Box display={"flex"} gap={1}>
                              <Avatar />
                              <Box>
                                <TextLabel
                                  variant={"body1"}
                                  fontWeight={600}
                                  color={"theme.palette.primary.main"}
                                  title={item.name}
                                />
                                <TextLabel
                                  variant={"body2"}
                                  fontWeight={500}
                                  color={
                                    lightTheme.palette.bgLightExtraLightGray
                                      .main
                                  }
                                  title={item.subline}
                                />
                              </Box>
                            </Box>
                            <TextLabel
                              variant={"body2"}
                              fontWeight={500}
                              color={
                                lightTheme.palette.bgLightExtraLightGray.main
                              }
                              title={item.time}
                            />
                          </Box>
                          <Box
                            display={"flex"}
                            justifyContent={"space-between"}
                            marginTop={2}
                          >
                            <Box display={"flex"} gap={1}>
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
                      );
                    })}
                  </Box>
                </TabPanel>
                <TabPanel value="Ongoing" className={classes.customTabPanel}>
                  <Box
                    sx={{
                      margin: "0px",
                      maxHeight: "300px",
                      overflow: "scroll",
                      "::-webkit-scrollbar": {
                        width: "0.5px",
                      },
                      "::-webkit-scrollbar-thumb": {
                        backgroundColor: "transparent",
                      },
                    }}
                  >
                    {ongoing.map((item) => {
                      return (
                        <Box
                          backgroundColor={item.backgroundColor}
                          padding={2}
                          marginBottom={1}
                          sx={{
                            borderLeft: `5px solid ${item.borderColor}`,
                            minWidth: "300px",
                          }}
                        >
                          <Box
                            display={"flex"}
                            justifyContent={"space-between"}
                          >
                            <Box display={"flex"} gap={1}>
                              <Avatar />
                              <Box>
                                <TextLabel
                                  variant={"body1"}
                                  fontWeight={600}
                                  color={"theme.palette.primary.main"}
                                  title={item.name}
                                />
                                <TextLabel
                                  variant={"body2"}
                                  fontWeight={500}
                                  color={
                                    lightTheme.palette.bgLightExtraLightGray
                                      .main
                                  }
                                  title={item.subline}
                                />
                              </Box>
                            </Box>
                            <TextLabel
                              variant={"body2"}
                              fontWeight={500}
                              color={
                                lightTheme.palette.bgLightExtraLightGray.main
                              }
                              title={item.time}
                            />
                          </Box>
                          <Box
                            display={"flex"}
                            justifyContent={"space-between"}
                            marginTop={2}
                          >
                            <Box display={"flex"} gap={1}>
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
                      );
                    })}
                  </Box>
                </TabPanel>
              </TabContext>
            </Box>
            {/* {meetingDetails?.count > 0 && (
              <Grid item xs={12}>
                <CommonPagination
                  count={meetingDetails?.count}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  onPageChange={handleChangePage}
                />
              </Grid>
            )} */}
          </PaperContainer>
        </Grid>
        <Grid item xs={12} md={6} lg={7}>
          <PaperContainer sx={{ height: "460px", overflow: "auto" }}>
            <Grid item xs={12}>
              <TableHeading
                title="Investors"
                removeSearchField
                showSelectDropDown
              />
            </Grid>
            <Grid item xs={12}>
              <TableContainer>
                <Table sx={{ minWidth: 600 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell className={classes.paddedRow}>
                        #
                      </StyledTableCell>
                      <StyledTableCell>Name</StyledTableCell>
                      <StyledTableCell>Contact No.</StyledTableCell>
                      <StyledTableCell>Email Id</StyledTableCell>
                      <StyledTableCell>Investment Amount</StyledTableCell>
                      <StyledTableCell>Active Plan</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {topInvestors.map((investor, index) => (
                      <StyledTableRow key={index}>
                        <StyledTableCell>{index + 1}</StyledTableCell>
                        <StyledTableCell
                          className={classes.paddedRow}
                          component="th"
                          scope="row"
                        >
                          {investor.userDetails.name}
                        </StyledTableCell>
                        <StyledTableCell>
                          {investor.userDetails.mobileNo}
                        </StyledTableCell>
                        <StyledTableCell>
                          {investor.userDetails.email}
                        </StyledTableCell>
                        <StyledTableCell>{investor.investment}</StyledTableCell>
                        <StyledTableCell>
                          {investor.iscompleted ? "Yes" : "No"}
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </PaperContainer>
        </Grid>
        <Grid item xs={12} md={6} lg={5}>
          <PaperContainer sx={{ height: "460px", overflow: "auto" }}>
            <TextLabel
              variant={"h6"}
              fontWeight={600}
              title={"Visitor Insights"}
              style={{ padding: "20px 0px 0px 10px" }}
            />
            <CommonLineChart visitorInsights={visitorInsights} />
          </PaperContainer>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        {/* <Grid item xs={12} sm={12} md={6} lg={4}>
          <PaperContainer>
            <TextLabel
              variant={"h6"}
              fontWeight={600}
              title={"Customer Satisfaction"}
              style={{ padding: "20px 0px 0px 10px" }}
            />
            <CommonAreaChart />
          </PaperContainer>
        </Grid> */}
      </Grid>
    </>
  );
};

export default Dashboard;

import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { makeStyles } from "tss-react/mui";
import { Table, TableRow, TableHead, Box, Grid, useTheme, } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import Assets from "../../Components/Common/ImageContainer";
import PaperContainer from "../../Components/Common/PaperContainer";
import TableHeading from "../../Components/Common/CommonTableHeading";
import CommonPagination from "../../Components/Common/Pagination";
import { useAppContext } from "../../Context/context";
import axios from "../../APiSetUp/axios";
import dayjs from "dayjs";
import AddFinancialData from "../../Components/FinancialData";
import CommonModal from "../../Components/Common/CommonModel";
import swal from "sweetalert";
import { permissionStatus } from "../../Utils/enum";
import { useLocation } from "react-router-dom";
import DataNotFound from "../../Components/Common/DataNotFound";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import TextLabel from "../../Components/Common/Fields/TextLabel";
import { globalAmountConfig } from "../../Utils/globalConfig";

import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import WidgetLoader from "../../Components/Common/widgetLoader";


const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `3px solid ${"#FFF"}`,
  '&:not(:last-child)': { borderBottom: 0, },
  '&::before': { display: 'none', },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.5rem' }} />}    {...props} />
))(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .05)' : "#79797914",
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
  padding: theme.spacing(0)
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(0.5),
  borderTop: '0px solid rgba(0, 0, 0, .125)',
}));


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    fontWeight: 600,
    fontSize: 12,
    color: theme.palette.primary.main,
    fontFamily: "Poppins",
    padding: 5,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
    fontFamily: "Poppins",
    fontWeight: 500,
    padding: "8px",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    // backgroundColor: theme.palette.action.hover,
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
      padding: "6px",
      backgroundColor: theme.palette.bgLightExtraPrimary.main,
      color: theme.palette.primary.main,
      cursor: "pointer",
      height: '26px'
    },
    viewBox: {
      borderRadius: "6px",
      padding: "6px",
      color: theme.palette.bgLightSuccess.main,
      backgroundColor: theme.palette.bgLightExtraSuccess.main,
      cursor: "pointer",
      height: '26px'
    },
    deleteBox: {
      borderRadius: "6px",
      padding: "6px",
      color: theme.palette.bgLightRed.main,
      backgroundColor: theme.palette.bgLightExtraRed.main,
      cursor: "pointer",
      height: '26px'
    },
  };
});

const FinancialData = () => {
  const { classes } = useStyles();
  const { OnUpdateError, toggleLoader, menuList, user } = useAppContext();
  const location = useLocation();
  const { pathname } = location;
  const theme = useTheme()
  //States
  const [data, setData] = useState({ userPurchasePlan: [{ _id: null, investment: "", investmentDays: "", returnOfInvestment: "" }] });
  const [financialDetails, setFinancialDetails] = useState([]);
  const [model, setModel] = useState(false);
  const [error, setError] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [financialId, setFinancialId] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [permissions, setPermissions] = useState({});
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedClient, setSelectedClient] = useState("");

  const [expanded, setExpanded] = React.useState('panel1');

  const handleAccordian = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (value) => {
    setRowsPerPage(value);
    setPage(0);
  };

  const closeDate = (date, days) => {
    const initialDate = new Date(date);
    const newDate = new Date(initialDate);
    newDate?.setDate(initialDate.getDate() + days);
    newDate?.setUTCHours(0, 0, 0, 0);
    const formattedDate = newDate?.toISOString();
    return dayjs(formattedDate).format("DD/MM/YYYY");
  };

  //Validation
  const handleValidation = () => {
    let formIsValid = true;
    let errors = {};
    if (!selectedClient) {
      formIsValid = false;
      errors["selectedClient"] = "* Please select Client.";
    }

    data?.userPurchasePlan?.map((e) => {
      if (!e?.investment) {
        formIsValid = false;
        errors["investment"] = "* Please enter Investment.";
      }
      if (!e?.investmentDays) {
        formIsValid = false;
        errors["investmentDays"] = "* Please enter Investment Days.";
      }
      if (!e?.returnOfInvestment) {
        formIsValid = false;
        errors["returnOfInvestment"] = "* Please enter Return Of Investment.";
      }
    });
    setError(errors);
    return formIsValid;
  };

  const handleChange = (e, isInvestmentPlan, i) => {
    const { name, value } = e.target;

    if (isInvestmentPlan && name === 'returnOfInvestment') {
      if (value !== "" && (isNaN(value) || value < 0 || value > 100)) {
        return;
      }
    }

    if (isInvestmentPlan === true) {
      const modifyData = { ...data };
      if (modifyData.userPurchasePlan && modifyData.userPurchasePlan[i]) {
        modifyData.userPurchasePlan[i][name] = value?.replace(/,/g, '');
      }
      setData(modifyData);
    } else {
      setData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const setUserPurchasePlanDelete = (i) => {
    const modifyData = { ...data };
    if (modifyData.userPurchasePlan && modifyData.userPurchasePlan.length > i) {
      modifyData.userPurchasePlan.splice(i, 1);
      setData(modifyData);
    }
  };

  const setUserPurchasePlanAdd = () => {
    setData({
      ...data,
      userPurchasePlan: [
        ...data?.userPurchasePlan,
        { _id: null, investment: "", investmentDays: "", returnOfInvestment: "" },
      ],
    });
  };

  const _getUsers = () => {
    toggleLoader();

    axios.post("/userPurchasePlan/userList")
      .then((res) => {
        if (res?.data?.data) {
          setClients(res?.data?.data);
        }
        toggleLoader();
      })
      .catch((err) => {
        toggleLoader();
        OnUpdateError(err.data.message);
      });
  };
  const handleClear = () => {
    setModel(false);
    setData({ userPurchasePlan: [{ _id: null, investment: "", investmentDays: "", returnOfInvestment: "" }] });
    setError({});
    setIsEdit(false);
    setFinancialId("");
    setSelectedClient("");
    _getUsers()
    _getFinancialData()
  };

  const _getFinancialData = async () => {
    let body = {
      limit: rowsPerPage,
      page: page + 1,
      search: search || "",
    };
    await axios.post(`/userPurchasePlanList`, body)
      .then((res) => {
        if (res?.data?.data) {
          setFinancialDetails(res?.data?.data);
        }
      })
      .catch((err) => {
        OnUpdateError(err.data.message);
      });
  };

  const _getFinancialById = async () => {
    await axios.get(`userPurchasePlan/${financialId}`)
      .then((res) => {
        if (res?.data?.data) {
          setIsEdit(true);
          setData(res?.data?.data);
          setSelectedClient(res?.data?.data?.name);
        }
      })
      .catch((err) => {
        OnUpdateError(err.data.message);
      });
  };

  const _deleteUserPlanById = async (id) => {
    toggleLoader();
    await axios.post(`userPurchasePlan/delete/${id}`)
      .then(async (res) => {
        console.log(res, "res?.data?.data")
        if (res?.data?.status === 200 && financialId) {
          await _getFinancialById()
          toggleLoader();
          swal(res?.data?.message, { icon: "success", timer: 5000 });
          await _getFinancialData()
        }
      })
      .catch((err) => {
        toggleLoader();
        OnUpdateError(err.data.message);
      });
  }

  const _addUpdateFinancialData = async () => {
    if (handleValidation()) {
      toggleLoader();
      let body = {
        client: clients?.filter((e) => e?.name == selectedClient)[0]?._id,
        clientBranch: clients?.filter((e) => e?.name == selectedClient)[0]?.branch,
        userPurchasePlan: data?.userPurchasePlan
      };
      if (data?._id) {
        body.id = data?._id;
      }
      await axios.post(`userPurchasePlan/${data?._id ? "update" : "create"}`, body)
        .then((res) => {
          if (res?.data?.data) {
            swal(res?.data?.message, { icon: "success", timer: 5000 });
            handleClear();
            _getFinancialData();
          }
          toggleLoader();
        })
        .catch((err) => {
          toggleLoader();
          OnUpdateError(err.data.message);
        });
    }
  };

  useEffect(() => {
    _getFinancialData();
  }, [page, rowsPerPage, search]);

  useEffect(() => {
    if (financialId) {
      _getFinancialById();
    }
  }, [financialId]);

  useEffect(() => {
    if (model) {
      _getUsers();
    }
  }, [model]);

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
              title={user?.userType === 3 ? "Assign File" : "Financial Data History"}
              buttonText={permissions?.create ? `Add ${user?.userType === 3 ? "Assign File" : "Financial Data"}` : ""}
              onClick={() => setModel(true)}
              handleSearch={(value) => { setSearch(value); }}
            />
          </Grid>
          <Grid item xs={12}>
            {financialDetails?.response != undefined ? financialDetails?.response?.length > 0 ?
              financialDetails?.response?.map((val, index) => {
                const sumOfInvestment = val.userPurchasePlan?.reduce((total, plan) => { return total + plan.investment }, 0);
                return <Accordion expanded={expanded === index + 'panel1'} onChange={handleAccordian(index + 'panel1')} >
                  <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" expandIcon={<ArrowDownwardIcon sx={{ marginLeft: 3, marginRight: 3, fontSize: '1rem', color: theme.palette.primary.main }} />}>
                    <Box display={'flex'} alignItems={'center'} width="100%" justifyContent="space-between">
                      <Box display={'flex'} alignItems={'center'} flexShrink={0} width={'180px'}>
                        <PersonOutlineIcon color="primary" fontSize="small" />
                        <TextLabel color={theme.palette.primary.main} fontSize={"14px"} title={val?.name?.toUpperCase()} />
                      </Box>
                      <Box display={'flex'} flexWrap={'wrap'} alignItems={'center'} gap={10}>
                        <Box display={'flex'} flexWrap={'wrap'} alignItems={'center'} gap={2}>
                          <Box>
                            <TextLabel fontSize={"12px"} title={"Total Plan"} textAlign={'start'} line />
                            <TextLabel fontSize={"12px"} title={val.userPurchasePlan?.length} textAlign={'start'} fontWeight={600} />
                          </Box>
                          <Box>
                            <TextLabel fontSize={"12px"} title={"Total Investment"} textAlign={'start'} line />
                            <TextLabel fontSize={"12px"} title={globalAmountConfig(sumOfInvestment) || 0} textAlign={'start'} fontWeight={600} />
                          </Box>
                          <Box>
                            <TextLabel fontSize={"12px"} title={"Status"} textAlign={'start'} line />
                            <TextLabel fontSize={"12px"} color={val?.isGenerateId ? theme.palette.bgLightSuccess.main : theme.palette.bgLightBlue2.main} title={val?.isGenerateId ? "Generated" : "Pending"} textAlign={'center'} />
                          </Box>
                        </Box>
                        <Box display={"flex"} gap={1}>
                          {permissions?.update && (
                            <Assets className={classes.writeBox} src={"/assets/icons/write.svg"}
                              absolutePath={true}
                              onClick={() => {
                                setData(val); setIsEdit(true); setModel(true); setFinancialId(val?._id);
                              }}
                            />
                          )}
                          {/* {permissions?.delete && (
                          <Assets
                            className={classes.deleteBox}
                            src={"/assets/icons/delete.svg"}
                            absolutePath={true}
                          />
                        )} */}
                        </Box>
                      </Box>

                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    {/* <TableContainer> */}
                    {val?.userPurchasePlan != undefined ? (
                      <Table sx={{ minWidth: 600 }} aria-label="customized table">
                        <TableHead>
                          <TableRow>
                            <StyledTableCell>No.</StyledTableCell>
                            <StyledTableCell> Investment Date </StyledTableCell>
                            <StyledTableCell> Closing Date </StyledTableCell>
                            <StyledTableCell align="center"> Investment Days </StyledTableCell>
                            <StyledTableCell> Return Amount Of Interest </StyledTableCell>
                            <StyledTableCell> Investment Amount </StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {val?.userPurchasePlan?.length > 0 ?
                            val?.userPurchasePlan?.map((row, index) => {
                              console.log(row.createdAt, "row.createdAt")
                              return (
                                <StyledTableRow key={index}>
                                  <StyledTableCell style={{ paddingLeft: "15px" }}>{index + 1 + page * rowsPerPage}</StyledTableCell>
                                  <StyledTableCell>{dayjs(row?.createdAt).format("DD/MM/YYYY")}</StyledTableCell>
                                  <StyledTableCell>{closeDate(row?.createdAt, row?.investmentDays)}</StyledTableCell>
                                  <StyledTableCell align="center">{row?.investmentDays}</StyledTableCell>
                                  <StyledTableCell>{`${(row.investment * row.returnOfInvestment) / 100}(${row.returnOfInvestment}%)`}</StyledTableCell>
                                  <StyledTableCell>{globalAmountConfig(row.investment)}</StyledTableCell>
                                </StyledTableRow>
                              );
                            }) : <TableRow>
                              <TableCell colSpan={12}> <DataNotFound icon={<ErrorOutlineIcon color="primary" style={{ fontSize: "3rem" }} />} elevation={2} />
                              </TableCell>
                            </TableRow>}
                        </TableBody>
                      </Table>
                    ) : <WidgetLoader />}
                  </AccordionDetails>
                </Accordion>
              })
              : <TableRow>
                <TableCell colSpan={12}> <DataNotFound icon={<ErrorOutlineIcon color="primary" style={{ fontSize: "3rem" }} />} elevation={2} />
                </TableCell>
              </TableRow>
              : <WidgetLoader />}
          </Grid>
          {financialDetails?.count > 0 && <Grid item xs={12}>
            <CommonPagination
              count={financialDetails?.count}
              rowsPerPage={rowsPerPage}
              page={page}
              onRowsPerPageChange={handleChangeRowsPerPage}
              onPageChange={handleChangePage}
            />
          </Grid>}
        </Grid>

      </PaperContainer>

      {model && (
        <CommonModal
          open={model}
          onClose={handleClear}
          title={`${isEdit ? "Update" : "Add"} ${user?.userType === 3 ? "Assign File" : "Financial Data"}`}
          maxWidth={'md'}
          content={
            <AddFinancialData
              data={data}
              setData={setData}
              error={error}
              handleChange={handleChange}
              isEdit={isEdit}
              onSubmit={_addUpdateFinancialData}
              setSelectedClient={setSelectedClient}
              selectedClient={selectedClient}
              clients={clients}
              user={user}
              setUserPurchasePlanDelete={setUserPurchasePlanDelete}
              setUserPurchasePlanAdd={setUserPurchasePlanAdd}
              deleteUserPlan={_deleteUserPlanById}
            />
          }
        />
      )}
    </>
  );
};

export default FinancialData;

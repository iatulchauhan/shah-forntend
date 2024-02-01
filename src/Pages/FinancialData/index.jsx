import React, { useEffect, useState } from "react";
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
import CommonPagination from "../../Components/Common/Pagination";
import { lightTheme } from "../../theme";
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

const closeDate = (date, days) => {
  const initialDate = new Date(date);
  const newDate = new Date(initialDate);
  newDate.setDate(initialDate.getDate() + days);
  newDate.setUTCHours(0, 0, 0, 0);
  const formattedDate = newDate.toISOString();
  return dayjs(formattedDate).format("DD/MM/YYYY");
};

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

const FinancialData = () => {
  const { classes } = useStyles();
  const { OnUpdateError, toggleLoader, menuList, user } = useAppContext();
  const location = useLocation();
  const { pathname } = location;
  //States
  const [data, setData] = useState({});
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
  console.log(selectedClient, "selectedClient");
  const handleChangePage = (newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (value) => {
    setRowsPerPage(value);
    setPage(0);
  };

  console.log(user, "user")

  //Validation
  const handleValidation = () => {
    let formIsValid = true;
    let errors = {};
    if (!selectedClient) {
      formIsValid = false;
      errors["selectedClient"] = "*Please select Client.";
    }

    if (!data?.investment) {
      formIsValid = false;
      errors["investment"] = "*Please enter Investment.";
    }
    if (!data?.investmentDays) {
      formIsValid = false;
      errors["investmentDays"] = "*Please enter Investment Days.";
    }
    if (!data?.returnOfInvestment) {
      formIsValid = false;
      errors["returnOfInvestment"] = "*Please enter Return Of Investment.";
    }
    setError(errors);
    return formIsValid;
  };

  const _getFinancialData = () => {
    toggleLoader();
    let body = {
      limit: rowsPerPage,
      page: page + 1,
      search: search || "",
    };
    axios
      .post(`/userPurchasePlanList`, body)
      .then((res) => {
        if (res?.data?.data) {
          setFinancialDetails(res?.data?.data);
        }
        toggleLoader();
      })
      .catch((err) => {
        toggleLoader();
        OnUpdateError(err.data.message);
      });
  };

  const _getFinancialById = () => {
    axios
      .get(`userPurchasePlan/${financialId}`)
      .then((res) => {
        if (res?.data?.data) {
          setIsEdit(true);
          setData(res?.data?.data);
          setSelectedClient(res?.data?.data?.userDetails?.name);
        }
      })
      .catch((err) => {
        toggleLoader();
        OnUpdateError(err.data.message);
      });
  };

  const _addUpdateFinancialData = () => {
    if (handleValidation()) {
      toggleLoader();
      let body = {
        client: clients?.filter((e) => e?.name == selectedClient)[0]?._id,
        clientBranch: clients?.filter((e) => e?.name == selectedClient)[0]?.branch,
        investment: data?.investment,
        investmentDays: data?.investmentDays,
        returnOfInvestment: data?.returnOfInvestment
      };
      if (data?._id) {
        body.id = data?._id;
      }
      axios.post(`userPurchasePlan/${data?._id ? "update" : "create"}`, body)
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

  const _getUsers = () => {
    toggleLoader();

    axios
      .post("/userPurchasePlan/userList")
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
    setFinancialId("");
    setSelectedClient("");
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
        create: menuPermissions.includes(permissionStatus.create)
          ? true
          : false,
        update: menuPermissions.includes(permissionStatus.update)
          ? true
          : false,
        delete: menuPermissions.includes(permissionStatus.delete)
          ? true
          : false,
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
            <TableContainer>
              {financialDetails?.response?.length > 0 ? (
                <Table sx={{ minWidth: 600 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>#</StyledTableCell>
                      <StyledTableCell>Name</StyledTableCell>
                      <StyledTableCell>
                        Investment Date
                      </StyledTableCell>
                      <StyledTableCell>
                        Closing Date
                      </StyledTableCell>
                      <StyledTableCell>
                        Return Amount Of Interest
                      </StyledTableCell>
                      <StyledTableCell>
                        Total Balance
                      </StyledTableCell>
                      <StyledTableCell>
                        IsIDGenerated
                      </StyledTableCell>
                      <StyledTableCell>Action</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {financialDetails?.response?.length > 0 &&
                      financialDetails?.response?.map((row, index) => {
                        return (
                          <StyledTableRow key={index}>
                            <StyledTableCell style={{ paddingLeft: "15px" }}>
                              {index + 1 + page * rowsPerPage}
                            </StyledTableCell>
                            <StyledTableCell>
                              {row?.userDetails?.name}{" "}
                            </StyledTableCell>
                            <StyledTableCell>
                              {dayjs(row.createdAt).format("DD/MM/YYYY")}
                            </StyledTableCell>
                            <StyledTableCell>
                              {closeDate(row.createdAt, row?.investmentDays)}
                            </StyledTableCell>
                            <StyledTableCell>{`${(row.investment * row.returnOfInvestment) / 100
                              }(${row.returnOfInvestment}%)`}</StyledTableCell>
                            <StyledTableCell>
                              {row.investment}
                            </StyledTableCell>
                            <StyledTableCell>
                              {row.isGenerateId ? "Generated" : "Pending"}
                            </StyledTableCell>
                            <StyledTableCell>
                              <Box
                                display={"flex"}
                                gap={1}
                              >
                                {permissions?.update && (
                                  <Assets
                                    className={classes.writeBox}
                                    src={"/assets/icons/write.svg"}
                                    absolutePath={true}
                                    onClick={() => {
                                      setData(row);
                                      setIsEdit(true);
                                      setModel(true);
                                      setFinancialId(row?._id);
                                    }}
                                  />
                                )}
                                {permissions?.delete && (
                                  <Assets
                                    className={classes.deleteBox}
                                    src={"/assets/icons/delete.svg"}
                                    absolutePath={true}
                                  />
                                )}
                              </Box>
                            </StyledTableCell>
                          </StyledTableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              ) : (
                <DataNotFound
                  icon={
                    <ErrorOutlineIcon
                      color="primary"
                      style={{ fontSize: "3rem" }}
                    />
                  }
                  elevation={2}
                />
              )}
            </TableContainer>
          </Grid>
        </Grid>
        {financialDetails?.count > 0 && <Box p={1}>
          <CommonPagination
            count={financialDetails?.count}
            rowsPerPage={rowsPerPage}
            page={page}
            onRowsPerPageChange={handleChangeRowsPerPage}
            onPageChange={handleChangePage}
          />
        </Box>}
      </PaperContainer>

      {model && (
        <CommonModal
          open={model}
          onClose={handleClear}
          title={`${isEdit ? "Update" : "Add"} ${user?.userType === 3 ? "Assign File" : "Financial Data"}`}
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
            />
          }
        />
      )}
    </>
  );
};

export default FinancialData;

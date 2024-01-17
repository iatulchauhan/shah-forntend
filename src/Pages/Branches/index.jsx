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
  Switch,
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
import { useLocation, useNavigate } from "react-router-dom";
import AddBranch from "../../Components/Branch";
import DataNotFound from "../../Components/Common/DataNotFound";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { lightTheme } from "../../theme";
import { permissionStatus } from "../../Utils/enum";
import { Regex } from "../../Utils/regex";

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

const Branches = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const { OnUpdateError, toggleLoader, menuList } = useAppContext();

  //States
  const [model, setModel] = useState(false);
  const [data, setData] = useState({});
  const [error, setError] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [brancesDetails, setBrancheDetails] = useState([]);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [isActiveDeactive, setIsActiveDeactive] = useState();
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [permissions, setPermissions] = useState({});
  const [search, setSearch] = useState("");

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (value) => {
    setRowsPerPage(value);
    setPage(0);
  };

  //Validation
  const handleValidation = () => {
    let formIsValid = true;
    let errors = {};
    if (!data?.branchName) {
      formIsValid = false;
      errors["branchName"] = "Please enter name.";
    }
    if (!data?.address) {
      formIsValid = false;
      errors["address"] = "Please enter address.";
    }
    if (!selectedCountry) {
      formIsValid = false;
      errors["country"] = "Please enter country.";
    }
    if (!selectedState) {
      formIsValid = false;
      errors["state"] = "Please select state.";
    }
    if (!selectedCity) {
      formIsValid = false;
      errors["city"] = "Please select city.";
    }
    if (!data?.postalCode) {
      formIsValid = false;
      errors["postalCode"] = "Please enter Postal Code.";
    } else if (!data?.postalCode?.match(Regex.pinCodeRegex)) {
      formIsValid = false;
      errors["invalidPostalCode"] = "please enter valid postal code";
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

  const _getDefaultId = (data, name) => {
    return data?.length > 0 && data?.filter((e) => e.name == name)?.[0]?.id;
  };
  console.log(
    states,
    _getDefaultId(countries?.response, selectedCountry),
    "states"
  );

  const _getBranches = () => {
    toggleLoader();
    let body = {
      limit: rowsPerPage,
      page: page + 1,
      search: search || "",
    };
    axios
      .post(`/branch`, body)
      .then((res) => {
        if (res?.data?.data) {
          setBrancheDetails(res?.data?.data);
        }
        toggleLoader();
      })
      .catch((err) => {
        toggleLoader();
        OnUpdateError(err.data.message);
      });
  };

  const _getCountries = () => {
    toggleLoader();
    axios
      .get("/countries")
      .then((res) => {
        if (res?.data?.data) {
          setCountries(res?.data?.data);
        }
        toggleLoader();
      })
      .catch((err) => {
        toggleLoader();
        OnUpdateError(err.data.message);
      });
  };

  const _getStates = () => {
    toggleLoader();
    axios
      .post("/states", {
        country_id: _getDefaultId(countries?.response, selectedCountry),
      })
      .then((res) => {
        if (res?.data?.data) {
          setStates(res?.data?.data);
        }
        toggleLoader();
      })
      .catch((err) => {
        toggleLoader();
        OnUpdateError(err.data.message);
      });
  };

  const _getCities = () => {
    toggleLoader();
    axios
      .post("/cities", {
        state_id: _getDefaultId(states?.response, selectedState),
        country_id: _getDefaultId(countries?.response, selectedCountry),
      })
      .then((res) => {
        if (res?.data?.data) {
          setCities(res?.data?.data);
        }
        toggleLoader();
      })
      .catch((err) => {
        toggleLoader();
        OnUpdateError(err.data.message);
      });
  };

  const _activeDeactive = (userId, isActive) => {
    setIsActiveDeactive(isActive);
    toggleLoader();
    const body = {
      id: userId,
      isActive: isActive,
    };
    axios
      .post("branch/activeInactive", body)
      .then((res) => {
        toggleLoader();
      })
      .catch((err) => {
        toggleLoader();
        OnUpdateError(err.data.message);
      });
  };

  const handleClear = () => {
    setModel(false);
    setData({});
    setError({});
    setIsEdit(false);
    setSelectedCountry("");
    setSelectedCity("");
    setSelectedState("");
  };

  const _addUpdateBranch = () => {
    if (handleValidation()) {
      toggleLoader();
      let body = {
        branchName: data?.branchName,
        address: data?.address,
        country: _getDefaultId(countries?.response, selectedCountry),
        state: _getDefaultId(states?.response, selectedState),
        city: _getDefaultId(cities?.response, selectedCity),
        postalCode: data?.postalCode,
      };
      if (data?._id) {
        body.id = data?._id;
      }
      axios
        .post(`branch/${data?._id ? "update" : "create"}`, body)
        .then((res) => {
          if (res?.data?.data) {
            swal(res?.data?.message, { icon: "success", timer: 5000 });
            handleClear();
            _getBranches();
            // navigate("/")
          }
          toggleLoader();
        })
        .catch((err) => {
          toggleLoader();
          OnUpdateError(err.data.message);
        });
    }
  };

  React.useEffect(() => {
    _getCountries();
  }, []);

  React.useEffect(() => {
    if (countries?.response && selectedCountry) {
      _getStates();
    }
  }, [countries, selectedCountry]);

  React.useEffect(() => {
    if (selectedCountry && selectedState) {
      _getCities();
    }
  }, [selectedState]);

  React.useEffect(() => {
    _getBranches();
  }, [page, rowsPerPage, search]);

  React.useEffect(() => {
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
              title="Branch List"
              buttonText={permissions?.create ? `Add Branch` : ""}
              onClick={() => setModel(true)}
              onSearch={(e) => setSearch(e?.target?.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TableContainer>
              {brancesDetails?.response?.length > 0 ? (
                <Table sx={{ minWidth: 600 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell className={classes.paddedRow}>
                        #
                      </StyledTableCell>
                      <StyledTableCell>Branch Name</StyledTableCell>
                      <StyledTableCell>Address</StyledTableCell>
                      <StyledTableCell>Country</StyledTableCell>
                      <StyledTableCell>State</StyledTableCell>
                      <StyledTableCell>City</StyledTableCell>
                      <StyledTableCell align="center">
                        Active/Deactive
                      </StyledTableCell>
                      <StyledTableCell align="right">Action</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {brancesDetails?.response?.length > 0 &&
                      brancesDetails?.response?.map((row, index) => {
                        console.log(row, "rowwwwwwwwwwwwwww");
                        return (
                          <StyledTableRow key={index}>
                            <StyledTableCell className={classes.paddedRow}>
                            {index + 1 + page * rowsPerPage}
                            </StyledTableCell>
                            <StyledTableCell component="th" scope="row">
                              {row.branchName}
                            </StyledTableCell>
                            <StyledTableCell>{row.address}</StyledTableCell>
                            <StyledTableCell>
                              {row.countryDetail.name}
                            </StyledTableCell>
                            <StyledTableCell>
                              {row.stateDetail.name}
                            </StyledTableCell>
                            <StyledTableCell>
                              {row.cityDetail.name}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              <Switch
                                defaultChecked={row.isActive}
                                // checked={row.isActive}
                                value={isActiveDeactive}
                                onChange={(e) =>
                                  _activeDeactive(row._id, e.target.checked)
                                }
                                color="primary"
                              />
                            </StyledTableCell>
                            <StyledTableCell>
                              <Box
                                display={"flex"}
                                justifyContent={"end"}
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
                                      setSelectedCountry(
                                        row?.countryDetail?.name
                                      );
                                      setSelectedCity(row?.cityDetail?.name);
                                      setSelectedState(row?.stateDetail?.name);
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
        <Box p={1}>
          <CommonPagination
            count={brancesDetails?.count}
            rowsPerPage={rowsPerPage}
            page={page}
            onRowsPerPageChange={handleChangeRowsPerPage}
            onPageChange={handleChangePage}
          />
        </Box>
      </PaperContainer>

      {model && (
        <CommonModal
          open={model}
          onClose={handleClear}
          title={`${isEdit ? "Update" : "Add"} Branch`}
          content={
            <AddBranch
              data={data}
              setData={setData}
              error={error}
              handleChange={handleChange}
              cities={cities}
              states={states}
              onSubmit={_addUpdateBranch}
              isEdit={isEdit}
              selectedCity={selectedCity}
              setSelectedCity={setSelectedCity}
              setSelectedState={setSelectedState}
              selectedState={selectedState}
              countries={countries}
              setSelectedCountry={setSelectedCountry}
              selectedCountry={selectedCountry}
            />
          }
        />
      )}
    </>
  );
};

export default Branches;

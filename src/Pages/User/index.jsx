import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { makeStyles } from "tss-react/mui";
import { Table, TableRow, TableHead, TableContainer, Box, Grid, } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import Assets from "../../Components/Common/ImageContainer";
import PaperContainer from "../../Components/Common/PaperContainer";
import TableHeading from "../../Components/Common/CommonTableHeading";
import { Regex } from "../../Utils/regex";
import CommonPagination from "../../Components/Common/Pagination";
import { lightTheme } from "../../theme";
import AddUser from "../../Components/User";
import { useAppContext } from "../../Context/context";
import axios from "../../APiSetUp/axios";
import swal from "sweetalert";
import DataNotFound from "../../Components/Common/DataNotFound";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Roles, permissionStatus, roles, userType } from "../../Utils/enum";
import VisitorModel from "../../Components/VisitorModel";
import CommonButton from "../../Components/Common/Button/CommonButton";
import CustomerModel from "../../Components/CustomerModel";
import { useLocation } from "react-router-dom";
import CommonModal from "../../Components/Common/CommonModel";
import MarketingModel from "../../Components/Common/MarketingModel";
import Swal from "sweetalert2";
import { globalAmountConfig } from "../../Utils/globalConfig";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    fontWeight: 600,
    fontSize: 14,
    color: theme.palette.primary.main,
    fontFamily: "Poppins",
    whiteSpace: "nowrap",
    padding: 8
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

const User = () => {
  const { classes } = useStyles();
  const { OnUpdateError, toggleLoader, user, menuList } = useAppContext();
  const location = useLocation()
  const { pathname } = location
  //States
  const [model, setModel] = useState(false);
  const [visitorModel, setVisitorModel] = useState(false);
  const [marketingModel, setMarketingModel] = useState(false);
  const [customerModel, setCustomerModel] = useState(false);
  const [data, setData] = useState({ userPurchasePlan: [{ _id: null, investment: "", investmentDays: "", returnOfInvestment: "" }] });
  const [error, setError] = useState({});
  const [deleteId, setDeleteId] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [userDetails, setUserDetails] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [multiSelectedBranch, setMultiSelectedBranch] = useState([]);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [page, setPage] = useState(0);
  const [permissions, setPermissions] = useState({})
  const [search, setSearch] = useState("");

  //Validation

  const handleValidation = () => {
    let formIsValid = true;
    let errors = {};
    const isAnyInvestmentFieldFilled =
      data?.investment || data?.investmentDays || data?.returnOfInvestment;
    if (!data?.name) {
      formIsValid = false;
      errors["name"] = "Please enter name.";
    }
    if (!data?.address) {
      formIsValid = false;
      errors["address"] = "Please enter address.";
    }
    if (!selectedCountry) {
      formIsValid = false;
      errors["country"] = "Please select country.";
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
    if (!data?.mobileNo) {
      formIsValid = false;
      errors["mobileNo"] = "Please enter Contact No.";
    } else if (!data?.mobileNo?.match(Regex.mobileNumberRegex)) {
      formIsValid = false;
      errors["invalidMobile"] = "Please enter valid Contact No.";
    }
    if (!data?.email) {
      formIsValid = false;
      errors["email"] = "Please enter email.";
    } else if (!data?.email?.match(Regex.emailRegex)) {
      formIsValid = false;
      errors["invalidEmail"] = "* Invalid email Address";
    }
    if (selectedRole !== "Marketing") {
      if (model) {
        if (multiSelectedBranch?.length === 0) {
          formIsValid = false;
          errors["branchName"] = "Please select branchName.";
        }
      } else {
        if (!selectedBranch) {
          formIsValid = false;
          errors["branchName"] = "Please select branchName.";
        }
      }
    }

    if (model) {
      if (!selectedRole) {
        formIsValid = false;
        errors["userType"] = "Please select Assign Roles.";
      }
    }

    if ((visitorModel || customerModel) && !data?._id) {
      if (!data?.reference) {
        formIsValid = false;
        errors["reference"] = "Please enter Meeting With.";
      }
      if (!data?.reason) {
        formIsValid = false;
        errors["reason"] = "Please enter reason.";
      }
    }

    if (!data?._id) {
      if (model) {
        if (!data?.password) {
          formIsValid = false;
          errors["password"] = "Please enter password.";
        } else if (!data.password?.match(Regex.passwordRegex)) {
          formIsValid = false;
          errors["strongPassword"] = "Please enter strong password";
        }
        if (!data?.confirmPassword) {
          formIsValid = false;
          errors["confirmPassword"] = "Please confirm your password.";
        } else if (data?.confirmPassword !== data?.password) {
          formIsValid = false;
          errors["matchPassword"] = "Passwords do not match.";
        }
      }
    }

    if (customerModel) {
      data?.userPurchasePlan?.map((e) => {
        if (!e?.investment) {
          formIsValid = false;
          errors["investment"] = "Please enter Investment.";
        }
        if (!e?.investmentDays) {
          formIsValid = false;
          errors["investmentDays"] = "Please enter Investment Days.";
        }
        if (!e?.returnOfInvestment) {
          formIsValid = false;
          errors["returnOfInvestment"] = "Please enter Return Of Investment.";
        }
      });
    }
    console.log(errors, "errors")
    setError(errors);
    return formIsValid;
  };

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (value) => {
    setRowsPerPage(value);
    setPage(0);
  };


  const _getDefaultId = (data, name) => {
    return data?.length > 0 && data?.filter((e) => e?.name == name)?.[0]?.id;
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

  const _getUsers = async () => {
    toggleLoader();
    // let body = `/users?limit=${rowsPerPage}&page=${page + 1}`
    let body = {
      limit: rowsPerPage,
      page: page + 1,
      search: search || "",
    };
    await axios.post("/users", body)
      .then((res) => {
        if (res?.data?.data) {
          setUserDetails(res?.data?.data);
        }
        toggleLoader();
      })
      .catch((err) => {
        toggleLoader();
        OnUpdateError(err.data.message);
      });
  };

  const _getBranches = () => {
    let body = {
      limit: rowsPerPage,
      page: page + 1,
    };
    axios
      .post(`/branch`, body)
      .then((res) => {
        if (res?.data?.data?.response) {
          setBranches(res?.data?.data?.response);
        }
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
  console.log(data, "datadatadata")
  const handleClear = () => {
    setData({ userPurchasePlan: [{ _id: null, investment: "", investmentDays: "", returnOfInvestment: "" }] });
    setModel(false);
    setVisitorModel(false);
    setCustomerModel(false);
    setMarketingModel(false)
    setError({});
    setIsEdit(false);
    setSelectedBranch("");
    setSelectedState("");
    setSelectedCity("");
    setSelectedRole("");
    setMultiSelectedBranch([]);
    _getUsers()
  };

  const handleEdit = (row) => {
    console.log(row?.userType === Roles.Guest, "row?.userType === Roles.Visitor")
    const roleConfig = roles?.filter((e) => e?.id == row?.userType)?.[0];
    setData(row);
    setSelectedBranch(row?.branchDetails?.[0]?.branchName || "");
    setMultiSelectedBranch(row?.branchDetails);
    setSelectedCountry(row?.countryDetail?.name || "");
    setSelectedState(row?.stateDetail?.name || "");
    setSelectedCity(row?.cityDetail?.name || "");
    setSelectedRole(roleConfig?.label);
    setIsEdit(true);
    if (row?.userType === Roles.Visitor) {
      setVisitorModel(true);
    } else if (row?.userType === Roles.User) {
      setCustomerModel(true);
    } else if (row?.userType === Roles.Guest) {
      setMarketingModel(true);
    } else {
      setModel(true);
    }
  };


  const _handleDelete = () => {
    Swal.fire({
      title: "<strong>Warning</strong>",
      icon: "error",
      html: "Are you sure you want to Delete User",
      showCancelButton: true,
      confirmButtonColor: "#0492c2",
      iconColor: "#ff0000",
      confirmButtonText: "Yes",
      cancelButtonColor: "#1A1B2F",
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (deleteId) {
          toggleLoader();
          axios
            .delete(`/users/delete/${deleteId}`)
            .then((res) => {
              swal(res?.data?.message, { icon: "success", timer: 5000 });
              toggleLoader();
              setDeleteId("");
              _getUsers();
            })
            .catch((err) => {
              toggleLoader();
              OnUpdateError(err.data.message);
            });
        }
      }
    });
  };

  const _addUpdateUser = () => {
    if (handleValidation()) {
      toggleLoader();
      let body = {
        name: data?.name,
        address: data?.address,
        country: _getDefaultId(countries?.response, selectedCountry),
        state: _getDefaultId(states?.response, selectedState),
        city: _getDefaultId(cities?.response, selectedCity),
        postalCode: data?.postalCode,
        mobileNo: data?.mobileNo,
        email: data?.email,
        branch: model ? multiSelectedBranch.map((item) => item._id) : [branches?.filter((e) => e?.branchName == selectedBranch)[0]?._id],
        userType: visitorModel ? Roles.Visitor : customerModel ? Roles.User : marketingModel ? Roles.Guest : roles?.filter((e) => e?.label == selectedRole)[0]?.id,
      };
      // if(selectedRole !=="")
      if (visitorModel || customerModel) {
        body.reason = data?.reason || null;
        body.reference = data?.reference || null;
      }
      if (customerModel) {
        body.password = data?.password;
        body.userPurchasePlan = data?.userPurchasePlan;
      }
      if (model) {
        body.password = data?.password;
      }
      if (data?._id) {
        body.id = data?._id;
        delete body.password;
      }
      // if (data?._id && data?.userType === 1)

      axios
        .post(`/users/${data?._id ? "update" : "create"}`, body)
        .then((res) => {
          if (res?.data?.data) {
            swal(res?.data?.message, { icon: "success", timer: 5000 });
            handleClear();
            _getUsers();
          }
          toggleLoader();
        })
        .catch((err) => {
          toggleLoader();
          OnUpdateError(err.data.message);
        });
    }
  };

  // useEffect(() => {
  //     if (visitorModel || customerModel) _getMeetingWithList()
  // }, [visitorModel, customerModel])

  useEffect(() => {
    _getUsers();
  }, [page, rowsPerPage, search]);

  useEffect(() => {
    _getBranches();
  }, []);


  useEffect(() => {
    _getCountries();
  }, []);

  useEffect(() => {
    if (countries?.response && selectedCountry) {
      _getStates();
    }
  }, [countries, selectedCountry]);

  useEffect(() => {
    if (selectedCountry && selectedState) {
      _getCities();
    }
  }, [states, selectedState]);

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
      {user?.userType != Roles?.Accountant && <PaperContainer elevation={0} square={false}>
        <Grid container spacing={1} xs={12} md={12} sm={12} lg={12}>
          <Grid item xs={12} md={12} sm={12} lg={12}>
            <Box sx={{ display: "flex", justifyContent: { xs: "center", sm: "center", md: "end", lg: "end" }, padding: "10px", gap: 1, flexWrap: "wrap", }}>
              {user?.userType === Roles?.Marketing &&
                <CommonButton
                  text={permissions?.create ? "Add Guest User" : ""}
                  onClick={() => {
                    handleClear();
                    setMarketingModel(true)
                    setModel(false);
                  }}
                />}
              {(user?.userType === Roles?.Receptionist || user?.userType === 0) &&
                <CommonButton
                  text={permissions?.create ? "Add Visitor" : ""}
                  onClick={() => {
                    handleClear();
                    setVisitorModel(true);
                    setCustomerModel(false);
                    setModel(false);
                  }}
                />}
              {user?.userType === 0 && (
                <>
                  <CommonButton
                    text={permissions?.create ? "Add Client" : ""}
                    onClick={() => {
                      handleClear();
                      setCustomerModel(true);
                      setVisitorModel(false);
                      setModel(false);
                    }}
                  />
                  <CommonButton
                    // width={"120px"}
                    text={permissions?.create ? "Add Role" : ""}
                    onClick={() => {
                      handleClear();
                      setModel(true);
                      setVisitorModel(false);
                      setCustomerModel(false);
                    }}
                  />
                </>
              )}
            </Box>
          </Grid>
        </Grid>
      </PaperContainer>}
      <PaperContainer elevation={0} square={false}>
        {marketingModel && (
          <CommonModal
            open={marketingModel}
            onClose={handleClear}
            title={`${isEdit ? "Update" : "Add"} Guest User`}
            content={
              <MarketingModel
                data={data}
                setData={setData}
                error={error}
                handleChange={handleChange}
                branches={branches}
                selectedBranch={selectedBranch}
                setSelectedBranch={setSelectedBranch}
                roles={roles}
                cities={cities}
                states={states}
                onSubmit={_addUpdateUser}
                isEdit={isEdit}
                setSelectedState={setSelectedState}
                selectedState={selectedState}
                setSelectedCity={setSelectedCity}
                selectedCity={selectedCity}
                setSelectedRole={setSelectedRole}
                selectedRole={selectedRole}
                selectedCountry={selectedCountry}
                setSelectedCountry={setSelectedCountry}
                countries={countries}
              />
            }
          />
        )}
        {visitorModel && (
          <Grid item xs={12}>
            <TableHeading
              title={`${isEdit ? "Update" : "Add"} Visitor`}
              handleBack={() => {
                setVisitorModel(false);
                handleClear();
              }}
              removeSearchField={true}
            />
            <VisitorModel
              data={data}
              setData={setData}
              error={error}
              handleChange={handleChange}
              branches={branches}
              selectedBranch={selectedBranch}
              setSelectedBranch={setSelectedBranch}
              roles={roles}
              cities={cities}
              states={states}
              onSubmit={_addUpdateUser}
              isEdit={isEdit}
              setSelectedState={setSelectedState}
              selectedState={selectedState}
              setSelectedCity={setSelectedCity}
              selectedCity={selectedCity}
              setSelectedRole={setSelectedRole}
              selectedRole={selectedRole}
              selectedCountry={selectedCountry}
              setSelectedCountry={setSelectedCountry}
              countries={countries}
            />
          </Grid>
        )}
        {customerModel && (
          <Grid item xs={12}>
            <TableHeading
              title={`${isEdit ? "Update" : "Add"} Client`}
              handleBack={() => {
                handleClear();
                setCustomerModel(false);
              }}
              removeSearchField={true}
            />
            <CustomerModel
              data={data}
              setData={setData}
              error={error}
              handleChange={handleChange}
              branches={branches}
              selectedBranch={selectedBranch}
              setSelectedBranch={setSelectedBranch}
              roles={roles}
              cities={cities}
              states={states}
              onSubmit={_addUpdateUser}
              isEdit={isEdit}
              setSelectedState={setSelectedState}
              selectedState={selectedState}
              setSelectedCity={setSelectedCity}
              selectedCity={selectedCity}
              setSelectedRole={setSelectedRole}
              selectedRole={selectedRole}
              selectedCountry={selectedCountry}
              setSelectedCountry={setSelectedCountry}
              countries={countries}
              setUserPurchasePlanDelete={setUserPurchasePlanDelete}
              setUserPurchasePlanAdd={setUserPurchasePlanAdd}
            />
          </Grid>
        )}
        {model && (
          <Grid item xs={12}>
            <TableHeading
              title={`${isEdit ? "Update" : "Add"} Role`}
              handleBack={() => {
                setModel(false);
                handleClear();
              }}
              removeSearchField={true}
            />
            <AddUser
              data={data}
              setData={setData}
              error={error}
              handleChange={handleChange}
              branches={branches}
              multiSelectedBranch={multiSelectedBranch}
              setMultiSelectedBranch={setMultiSelectedBranch}
              roles={roles}
              cities={cities}
              states={states}
              onSubmit={_addUpdateUser}
              isEdit={isEdit}
              setSelectedState={setSelectedState}
              selectedState={selectedState}
              setSelectedCity={setSelectedCity}
              selectedCity={selectedCity}
              setSelectedRole={setSelectedRole}
              selectedRole={selectedRole}
              selectedCountry={selectedCountry}
              setSelectedCountry={setSelectedCountry}
              countries={countries}
            />
          </Grid>
        )}
        {!model && !visitorModel && !customerModel && (
          <>
            <Grid container>
              <Grid item xs={12}>
                <TableHeading title="User List" onClick={() => { setModel(true) }} handleSearch={(value) => { setSearch(value); }} />
              </Grid>
              <Grid item xs={12}>
                <TableContainer>
                  {userDetails?.response?.length > 0 ? (
                    <Table sx={{ minWidth: 600 }} aria-label="customized table">
                      <TableHead>
                        <TableRow>
                          <StyledTableCell className={classes.paddedRow}>No.</StyledTableCell>
                          <StyledTableCell>Name</StyledTableCell>
                          <StyledTableCell>Address</StyledTableCell>
                          <StyledTableCell>Contact No.</StyledTableCell>
                          <StyledTableCell>Email Id</StyledTableCell>
                          <StyledTableCell>Branch</StyledTableCell>
                          <StyledTableCell>Role</StyledTableCell>
                          <StyledTableCell>Action</StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {userDetails?.response?.length > 0 &&
                          userDetails?.response?.map((row, index) => {
                            const getRoleName = (type) => {
                              return roles.filter((e) => e?.id == type)?.[0]
                                ?.label;
                            };
                            return (
                              <StyledTableRow key={index}>
                                <StyledTableCell style={{ paddingLeft: "13px" }}>{index + 1 + page * rowsPerPage}</StyledTableCell>
                                <StyledTableCell className={classes.paddedRow} component="th" scope="row">{row.name}</StyledTableCell>
                                <StyledTableCell>{row?.address}</StyledTableCell>
                                <StyledTableCell>{row?.mobileNo}</StyledTableCell>
                                <StyledTableCell>{row?.email}</StyledTableCell>
                                <StyledTableCell>{row?.branchDetails?.map((e) => e?.branchName)?.join(",")}</StyledTableCell>
                                <StyledTableCell>{getRoleName(row.userType)}</StyledTableCell>
                                <StyledTableCell>
                                  <Box display={"flex"} justifyContent={"end"} gap={1}>
                                    {permissions?.update && <Assets
                                      className={classes.writeBox}
                                      src={"/assets/icons/write.svg"}
                                      absolutePath={true}
                                      onClick={() => { handleEdit(row); }}
                                    />}
                                    {/* <Assets
                                      className={classes.viewBox}
                                      src={"/assets/icons/view.svg"}
                                      absolutePath={true}
                                    /> */}
                                    {permissions?.delete && <Assets
                                      className={classes.deleteBox}
                                      src={"/assets/icons/delete.svg"}
                                      absolutePath={true}
                                      onClick={() => {
                                        setDeleteId(row?._id);
                                        _handleDelete();
                                      }}
                                    />}
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
              {userDetails?.count > 0 &&
                <Grid item xs={12}>
                  <CommonPagination
                    count={userDetails?.count}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    onPageChange={handleChangePage}
                  />
                </Grid>
              }

            </Grid>

          </>
        )}
      </PaperContainer>
    </>
  );
};

export default User;

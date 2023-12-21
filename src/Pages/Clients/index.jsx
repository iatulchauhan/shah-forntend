import React, { useEffect, useState } from 'react'
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
import { Regex } from '../../Utils/regex';
import CommonPagination from '../../Components/Common/Pagination';
import { lightTheme } from '../../theme';
import { useAppContext } from '../../Context/context';
import axios from "../../APiSetUp/axios";
import swal from 'sweetalert';
import DataNotFound from '../../Components/Common/DataNotFound';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { roles } from '../../Utils/enum';
import AddClient from '../../Components/Client';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        fontWeight: 600,
        fontSize: 16,
        color: theme.palette.primary.main,
        fontFamily: "Poppins",
        whiteSpace: 'nowrap',
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

const Clients = () => {
    const { classes } = useStyles();
    const { OnUpdateError, toggleLoader } = useAppContext();
    //States
    const [model, setModel] = useState(false);
    const [data, setData] = useState({})
    const [error, setError] = useState({})
    const [deleteId, setDeleteId] = useState("")
    const [isEdit, setIsEdit] = useState(false)
    const [userDetails, setUserDetails] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [branches, setBranches] = useState([])
    const [selectedBranch, setSelectedBranch] = useState("");
    const [countries, setCountries] = useState([])
    const [selectedCountry, setSelectedCountry] = useState("");
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [selectedRole, setSelectedRole] = useState("")
    const [page, setPage] = useState(0);

    const handleChangePage = (newPage) => { setPage(newPage); };
    const handleChangeRowsPerPage = (value) => { setRowsPerPage(value); setPage(0); };
    //Validation
    const handleValidation = () => {
        let formIsValid = true
        let errors = {}
        const isAnyInvestmentFieldFilled = data?.investment || data?.investmentDays || data?.returnOfInvestment;
        if (!data?.name) {
            formIsValid = false
            errors['name'] = 'Please enter client name.'
        }
        if (!data?.address) {
            formIsValid = false
            errors['address'] = 'Please enter address.'
        }
        if (!selectedCountry) {
            formIsValid = false
            errors['country'] = 'Please select country.'
        }
        if (!selectedState) {
            formIsValid = false
            errors['state'] = 'Please select state.'
        }
        if (!selectedCity) {
            formIsValid = false
            errors['city'] = 'Please select city.'
        }
        if (!data?.postalCode) {
            formIsValid = false
            errors['postalCode'] = 'Please enter Postal Code.'
        }
        if (!data?.mobileNo) {
            formIsValid = false
            errors['mobileNo'] = 'Please enter Contact No.'
        }
        if (!data?.email) {
            formIsValid = false;
            errors["email"] = "Please enter email.";
        } else if (!data?.email?.match(Regex.emailRegex)) {
            formIsValid = false;
            errors["invalidEmail"] = "* Invalid email Address";
        }
        if (!selectedBranch) {
            formIsValid = false
            errors['branchName'] = 'Please select branchName.'
        }
        if (!selectedRole) {
            formIsValid = false
            errors['userType'] = 'Please select Assign Roles.'
        }

        if (!data?._id) {
            if (!data?.password) {
                formIsValid = false
                errors['password'] = 'Please enter password.'
            } else if (!data.password?.match(Regex.passwordRegex)) {
                formIsValid = false;
                errors["strongPassword"] = "Please enter strong password"
            }
            if (!data?.confirmPassword) {
                formIsValid = false;
                errors['confirmPassword'] = 'Please confirm your password.';
            } else if (data?.confirmPassword !== data?.password) {
                formIsValid = false;
                errors['matchPassword'] = 'Passwords do not match.';
            }
        }
        if (isAnyInvestmentFieldFilled) {
            if (!data?.investment) {
                formIsValid = false;
                errors['investment'] = 'Please enter Investment.';
            }
            if (!data?.investmentDays) {
                formIsValid = false;
                errors['investmentDays'] = 'Please enter Investment Days.';
            }
            if (!data?.returnOfInvestment) {
                formIsValid = false;
                errors['returnOfInvestment'] = 'Please enter Return Of Investment.';
            }
        }
        setError(errors)
        return formIsValid
    }

    const _getDefaultId = (data, name) => {
        return data?.length > 0 && data?.filter((e) => e.name == name)?.[0]?.id
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setData((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const _getUser = () => {
        toggleLoader();
        axios.get(`admin/users/?userType=${1} limit=${rowsPerPage}&page=${page + 1}`).then((res) => {
            if (res?.data?.data) {
                setUserDetails(res?.data?.data)
            }
            toggleLoader();
        }).catch((err) => {
            toggleLoader();
            OnUpdateError(err.data.message);
        }
        );
    }

    const _getBranches = () => {
        axios.get("/admin/branch")
            .then((res) => {
                if (res?.data?.data?.response) {
                    setBranches(res?.data?.data?.response)
                }
            }).catch((err) => {
                toggleLoader();
                OnUpdateError(err.data.message);
            })
    }

    const _getCountries = () => {
        axios.get("/countries")
            .then((res) => {
                if (res?.data?.data) {
                    setCountries(res?.data?.data)
                }
            }).catch((err) => {
                toggleLoader();
                OnUpdateError(err.data.message);
            })
    }

    const _getStates = () => {
        toggleLoader();
        axios.post("/states", { country_id: _getDefaultId(countries?.response, selectedCountry) }).then((res) => {
            if (res?.data?.data) {
                setStates(res?.data?.data)
            }
            toggleLoader();
        }).catch((err) => {
            toggleLoader();
            OnUpdateError(err.data.message);
        }
        );
    }

    const _getCities = () => {
        toggleLoader();
        axios.post("/cities", { state_id: _getDefaultId(states?.response, selectedState), country_id: _getDefaultId(countries?.response, selectedCountry) }).then((res) => {
            if (res?.data?.data) {
                setCities(res?.data?.data)
            }
            toggleLoader();
        }).catch((err) => {
            toggleLoader();
            OnUpdateError(err.data.message);
        }
        );
    }

    const handleClear = () => {
        setModel(false);
        setData({});
        setError({});
        setIsEdit(false);
        setSelectedBranch("");
        setSelectedCountry("");
        setSelectedState("");
        setSelectedCity("");
        setSelectedRole("");
    }

    const handleEdit = (row) => {
        console.log('row👌', row)
        const roleConfig = roles?.filter((e) => e?.id == row?.userType)?.[0]
        setData(row);
        setSelectedBranch(row?.branchDetails?.branchName || "");
        setSelectedCountry(row?.countryDetail?.name || "");
        setSelectedState(row?.stateDetail?.name || "");
        setSelectedCity(row?.cityDetail?.name || "");
        setSelectedRole(roleConfig?.label);
        setIsEdit(true);
        setModel(true);
    }

    const _handleDelete = () => {
        if (deleteId) {
            toggleLoader();
            axios.delete(`/admin/users/delete/${deleteId}`)
                .then((res) => {
                    swal(res?.data?.message, { icon: "success", timer: 5000, })
                    toggleLoader();
                    setDeleteId("");
                    _getUser();
                })
                .catch((err) => {
                    toggleLoader();
                    OnUpdateError(err.data.message);
                });
        }
    };

    const _addUpdateUser = () => {
        if (handleValidation()) {
            toggleLoader();
            let body = {
                "name": data?.name,
                "address": data?.address,
                "country": _getDefaultId(countries?.response, selectedCountry),
                "state": _getDefaultId(states?.response, selectedState),
                "city": _getDefaultId(cities?.response, selectedCity),
                "postalCode": data?.postalCode,
                "mobileNo": data?.mobileNo,
                "email": data?.email,
                "password": data?.password,
                "branch": branches?.filter((e) => e?.branchName == selectedBranch)[0]?._id,
                "userType": roles?.filter((e) => e?.label == selectedRole)[0]?.id,
                "investment": data?.investment,
                "investmentDays": data?.investmentDays,
                "returnOfInvestment": data?.returnOfInvestment,
            }
            if (data?._id) {
                body.id = data?._id
                delete body.password
            }
            axios.post(`admin/users/${data?._id ? "update" : "create"}`, body).then((res) => {
                if (res?.data?.data) {
                    swal(res?.data?.message, { icon: "success", timer: 5000, })
                    handleClear()
                    _getUser()
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
        _getUser()
    }, [page, rowsPerPage])

    useEffect(() => {
        _getUser()
        _getBranches()
        _getCountries()
    }, [])

    React.useEffect(() => {
        if (selectedCountry) {
            _getStates()
        }
    }, [selectedCountry])

    React.useEffect(() => {
        if (selectedCountry && selectedState) {
            _getCities()
        }
    }, [selectedState])

    return (
        <>
            <PaperContainer elevation={0} square={false}>
                <Grid container >
                    <Grid item xs={12}>
                        <TableHeading title="Client List"
                            //  buttonText={'Add Client'} 
                            onClick={() => setModel(true)} />
                    </Grid>
                    <Grid item xs={12}>
                        <TableContainer>
                            {userDetails?.response?.length > 0 ?
                                <Table sx={{ minWidth: 600 }} aria-label="customized table">
                                    <TableHead >
                                        <TableRow>
                                            <StyledTableCell className={classes.paddedRow}>#</StyledTableCell>
                                            <StyledTableCell>Name</StyledTableCell>
                                            <StyledTableCell>Address</StyledTableCell>
                                            <StyledTableCell>Contact No.</StyledTableCell>
                                            <StyledTableCell>Email Id</StyledTableCell>
                                            <StyledTableCell>Active Plan</StyledTableCell>
                                            <StyledTableCell>Branch</StyledTableCell>
                                            <StyledTableCell align='center'>Role</StyledTableCell>
                                            <StyledTableCell align="right">Action</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {userDetails?.response?.length > 0 && userDetails?.response?.map((row, index) => {
                                            const getRoleName = (type) => { return roles.filter((e) => e?.id == type)?.[0]?.label }
                                            return (
                                                <StyledTableRow key={index} >
                                                    <StyledTableCell>{index + 1}</StyledTableCell>
                                                    <StyledTableCell className={classes.paddedRow} component="th" scope="row">
                                                        {row.name}
                                                    </StyledTableCell>
                                                    <StyledTableCell>{row.address}</StyledTableCell>
                                                    <StyledTableCell>{row.mobileNo}</StyledTableCell>
                                                    <StyledTableCell>{row.email}</StyledTableCell>
                                                    <StyledTableCell>{row.activePlan}</StyledTableCell>
                                                    <StyledTableCell>{row?.branchDetails?.branchName}</StyledTableCell>
                                                    <StyledTableCell align='center'>{getRoleName(row.userType)}</StyledTableCell>
                                                    <StyledTableCell align="right">
                                                        <Box display={"flex"} justifyContent={"end"} gap={1}>
                                                            <Assets
                                                                className={classes.writeBox}
                                                                src={"/assets/icons/write.svg"}
                                                                absolutePath={true}
                                                                onClick={() => { handleEdit(row) }}
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
                                                                onClick={() => { setDeleteId(row?._id); _handleDelete(); }}
                                                            />
                                                        </Box>
                                                    </StyledTableCell>

                                                </StyledTableRow>
                                            )
                                        })}
                                    </TableBody>
                                </Table> :
                                <DataNotFound
                                    icon={<ErrorOutlineIcon color="primary" style={{ fontSize: '3rem' }} />}
                                    elevation={2}
                                />
                            }
                        </TableContainer>
                    </Grid>
                </Grid>
                <Box p={1}>
                    <CommonPagination
                        count={userDetails?.count}
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
                title={`${isEdit ? "Update" : "Add"} Client`}
                content={<AddClient data={data} setData={setData} error={error} handleChange={handleChange} branches={branches} selectedBranch={selectedBranch} setSelectedBranch={setSelectedBranch} roles={roles} cities={cities} states={states} onSubmit={_addUpdateUser} isEdit={isEdit} setSelectedState={setSelectedState} selectedState={selectedState} setSelectedCity={setSelectedCity} selectedCity={selectedCity} setSelectedRole={setSelectedRole} selectedRole={selectedRole} selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} countries={countries} />}
            />
        </>
    )
}

export default Clients
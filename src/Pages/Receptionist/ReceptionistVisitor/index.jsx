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
import axios from "../../../APiSetUp/axios";
import swal from 'sweetalert';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import PaperContainer from '../../../Components/Common/PaperContainer';
import TableHeading from '../../../Components/Common/CommonTableHeading';
import CommonPagination from '../../../Components/Common/Pagination';
import { useAppContext } from '../../../Context/context';
import { Regex } from '../../../Utils/regex';
import Assets from '../../../Components/Common/ImageContainer';
import DataNotFound from '../../../Components/Common/DataNotFound';
import { lightTheme } from '../../../theme';
import VisitorModel from '../../../Components/VisitorModel';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        fontWeight: 600,
        fontSize: 16,
        color: theme.palette.primary.main,
        fontFamily: "Poppins",
        padding: '8px'
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

const ReceptionistVisitorData = () => {
    const { classes } = useStyles();
    const { OnUpdateError, toggleLoader } = useAppContext();

    //States
    const [model, setModel] = useState(false);
    const [data, setData] = useState({})
    const [error, setError] = useState({})
    const [deleteId, setDeleteId] = useState("")
    const [isEdit, setIsEdit] = useState(false)
    const [visitorDetails, setVisitorDetails] = useState([]);
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [branches, setBranches] = useState([])
    const [selectedBranch, setSelectedBranch] = useState("");
    const [selectedRole, setSelectedRole] = useState("")
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);
    const handleChangePage = (newPage) => { setPage(newPage); };
    const handleChangeRowsPerPage = (value) => { setRowsPerPage(value); setPage(0); };

    //Validation
    const handleValidation = () => {
        let formIsValid = true
        let errors = {}
        if (!data?.name) {
            formIsValid = false
            errors['name'] = 'Please enter name.'
        }
        if (!data?.address) {
            formIsValid = false
            errors['address'] = 'Please enter address.'
        }
        if (!selectedCountry) {
            formIsValid = false
            errors['country'] = 'Please enter country.'
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
        if (!data?._id) {
            if (!data?.reference) {
                formIsValid = false
                errors['reference'] = 'Please enter Meeting With.'
            }
            if (!data?.reason) {
                formIsValid = false
                errors['reason'] = 'Please enter reason.'
            }
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

    const _getDefaultId = (data, name) => {
        return data?.length > 0 && data?.filter((e) => e.name == name)?.[0]?.id
    }

    const _getBranches = () => {
        axios.post("/receptionist/branchList")
            .then((res) => {
                console.log(res, 'resssss')
                if (res?.data?.data) {
                    setBranches(res?.data?.data)
                }
            }).catch((err) => {
                toggleLoader();
                OnUpdateError(err.data.message);
            })
    }

    const _getVisitor = () => {
        toggleLoader();
        let body = {
            limit: rowsPerPage,
            page: page + 1
        }
        axios.get(`receptionist/visitor`, body).then((res) => {
            if (res?.data?.data) {
                setVisitorDetails(res?.data?.data)
            }
            toggleLoader();
        }).catch((err) => {
            toggleLoader();
            OnUpdateError(err.data.message);
        }
        );
    }

    const _getCountries = () => {
        toggleLoader();
        axios.get("/countries").then((res) => {
            if (res?.data?.data) {
                setCountries(res?.data?.data)
            }
            toggleLoader();
        }).catch((err) => {
            toggleLoader();
            OnUpdateError(err.data.message);
        }
        );
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

    const handleEdit = (row) => {
        setData(row);
        setSelectedBranch(row?.branchDetails?.[0]?.branchName || "");
        setSelectedCountry(row?.countryDetail?.name || "");
        setSelectedState(row?.stateDetail?.name || "");
        setSelectedCity(row?.cityDetail?.name || "");
        setIsEdit(true);
        setModel(true);
    }

    const _handleDelete = () => {
        if (deleteId) {
            toggleLoader();
            axios.delete(`/receptionist/visitor/delete/${deleteId}`)
                .then((res) => {
                    swal(res?.data?.message, { icon: "success", timer: 5000, })
                    toggleLoader();
                    setDeleteId("");
                    _getVisitor();
                })
                .catch((err) => {
                    toggleLoader();
                    OnUpdateError(err.data.message);
                });
        }
    };

    const handleClear = () => {
        setModel(false)
        setData({})
        setError({})
        setIsEdit(false)
        setSelectedCountry("")
        setSelectedCity("")
        setSelectedState("")
        setSelectedBranch("")
    }

    const _addUpdateVisitor = () => {
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
                "branch": branches?.filter((e) => e?.branchName == selectedBranch)[0]?._id,
                "reason": data?.reason || null,
                "reference": data?.reference || null
            }
            if (data?._id) {
                body.id = data?._id
            }
            axios.post(`receptionist/visitor/${data?._id ? "update" : "create"}`, body).then((res) => {
                if (res?.data?.data) {
                    swal(res?.data?.message, { icon: "success", timer: 5000, })
                    handleClear()
                    _getVisitor()
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
        _getVisitor()
    }, [page, rowsPerPage])

    useEffect(() => {
        _getBranches()
        _getCountries()
    }, [])

    useEffect(() => {
        if (selectedCountry) {
            _getStates()
        }
    }, [selectedCountry])

    useEffect(() => {
        if (selectedCountry && selectedState) {
            _getCities()
        }
    }, [selectedState])

    return (
        <>
            <PaperContainer elevation={0} square={false}>
                {model &&
                    <Grid item xs={12}>
                        <TableHeading title={`${isEdit ? "Update" : "Add"} Visitor`} handleBack={() => { setModel(false); handleClear(); }} removeSearchField={true} />
                        <VisitorModel data={data} setData={setData} error={error} handleChange={handleChange} branches={branches}
                            selectedBranch={selectedBranch} setSelectedBranch={setSelectedBranch} cities={cities}
                            states={states} onSubmit={_addUpdateVisitor} isEdit={isEdit} setSelectedState={setSelectedState}
                            selectedState={selectedState} setSelectedCity={setSelectedCity} selectedCity={selectedCity}
                            setSelectedRole={setSelectedRole} selectedRole={selectedRole} selectedCountry={selectedCountry}
                            setSelectedCountry={setSelectedCountry} countries={countries} />
                    </Grid>}
                {!model &&
                    <>
                        <Grid container >
                            <Grid item xs={12}>
                                <TableHeading title="Visitor Data" buttonText={'Add Visitor'} onClick={() => setModel(true)} />
                            </Grid>
                            <Grid item xs={12}>
                                <TableContainer>
                                    {visitorDetails?.response?.length > 0 ?
                                        <Table sx={{ minWidth: 600 }} aria-label="customized table">
                                            <TableHead >
                                                <TableRow>
                                                    <StyledTableCell className={classes.paddedRow}>#</StyledTableCell>
                                                    <StyledTableCell>Name</StyledTableCell>
                                                    <StyledTableCell>Address</StyledTableCell>
                                                    <StyledTableCell>Contact No.</StyledTableCell>
                                                    <StyledTableCell>Email Id</StyledTableCell>
                                                    <StyledTableCell align="right">Action</StyledTableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {visitorDetails?.response?.map((row, index) => (
                                                    <StyledTableRow key={index} >
                                                        <StyledTableCell>{index + 1 + page * rowsPerPage}</StyledTableCell>
                                                        <StyledTableCell className={classes.paddedRow} component="th" scope="row">
                                                            {row.name}
                                                        </StyledTableCell>
                                                        <StyledTableCell>{row.address}</StyledTableCell>
                                                        <StyledTableCell>{row.mobileNo}</StyledTableCell>
                                                        <StyledTableCell>{row.email}</StyledTableCell>
                                                        <StyledTableCell>
                                                            <Box display={"flex"} justifyContent={"end"} gap={1}>
                                                                <Assets
                                                                    className={classes.writeBox}
                                                                    src={"/assets/icons/write.svg"}
                                                                    absolutePath={true}
                                                                    onClick={() => { handleEdit(row) }}
                                                                />
                                                                {/* <Assets
                                                                    className={classes.viewBox}
                                                                    src={"/assets/icons/view.svg"}
                                                                    absolutePath={true}
                                                                /> */}
                                                                <Assets
                                                                    className={classes.deleteBox}
                                                                    src={"/assets/icons/delete.svg"}
                                                                    absolutePath={true}
                                                                    onClick={() => { setDeleteId(row?._id); _handleDelete(); }}
                                                                />
                                                            </Box>
                                                        </StyledTableCell>

                                                    </StyledTableRow>
                                                ))}
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
                        {visitorDetails?.count > 0 && <Box p={1}>
                            <CommonPagination
                                count={visitorDetails?.count}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                onPageChange={handleChangePage}
                            />
                        </Box>}

                    </>

                }

            </PaperContainer>
        </>
    )
}

export default ReceptionistVisitorData
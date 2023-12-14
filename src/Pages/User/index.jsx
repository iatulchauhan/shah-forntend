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
import AddUser from '../../Components/User';
import { useAppContext } from '../../Context/context';
import axios from "../../APiSetUp/axios";
import swal from 'sweetalert';
import DataNotFound from '../../Components/Common/DataNotFound';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

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

const User = () => {
    const { classes } = useStyles();
    const { OnUpdateError, toggleLoader } = useAppContext();
    const states = [{ code: 1, label: 'Gujarat' }, { code: 2, label: 'Maharashtra' }]
    const city = [{ code: 1, label: 'Surat' }, { code: 2, label: 'Ahmadabad' }]
    const roles = [{ label: "admin", id: "0", }, { label: "user", id: "1", }, { label: "receptionist", id: "2", }, { label: "counsellor", id: "3", }, { label: "accountant", id: "4", }, { label: "marketing", id: "5", },]
    //States
    const [model, setModel] = useState(false);
    const [data, setData] = useState({})
    const [error, setError] = useState({})
    const [deleteId, setDeleteId] = useState("")
    const [isEdit, setIsEdit] = useState(false)
    const [userDetails, setUserDetails] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [branches, setBranches] = useState([])
    const [selectedBranch, setSelectedBranch] = useState({});
    const [selectedState, setSelectedState] = useState({});
    const [selectedCity, setSelectedCity] = useState({})
    const [selectedRole, setSelectedRole] = useState({})
    const [page, setPage] = useState(0);
    console.log(data, "data")
    console.log(selectedBranch, "selectedBranch")
    const handleChangePage = (newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (value) => {
        setRowsPerPage(value);
        setPage(0);
    };
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
        if (!data?.country) {
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
        if (!selectedBranch) {
            formIsValid = false
            errors['branchName'] = 'Please select branchName.'
        }
        if (!selectedRole) {
            formIsValid = false
            errors['userType'] = 'Please select Assign Roles.'
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

    const _getUser = () => {
        toggleLoader();
        axios.get("admin/users").then((res) => {
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
                "country": data?.country,
                "state": selectedState?.label,
                "city": selectedCity?.label,
                "postalCode": data?.postalCode,
                "mobileNo": data?.mobileNo,
                "email": data?.email,
                "password": data?.password,
                "branch": selectedBranch?._id,
                "userType": selectedRole?.id,
                "active": data?.active,
            }
            if (data?._id) {
                body.id = data?._id
            }
            axios.post(`admin/users/${data?._id ? "update" : "create"}`, body).then((res) => {
                if (res?.data?.data) {
                    swal(res?.data?.message, { icon: "success", timer: 5000, })
                    setModel(false)
                    setData({})
                    setError({})
                    setIsEdit(false)
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
    }, [])
    useEffect(() => {
        _getBranches()
    }, [])
    return (
        <>
            <PaperContainer elevation={0} square={false}>
                <Grid container >
                    <Grid item xs={12}>
                        <TableHeading title="User List" buttonText={'Add User'} onClick={() => setModel(true)} />
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
                                            <StyledTableCell>Role</StyledTableCell>
                                            <StyledTableCell align="right">Action</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {userDetails?.response?.length > 0 && userDetails?.response?.map((row, index) => {
                                            console.log(row, "row")
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
                                                    <StyledTableCell>{row.userType}</StyledTableCell>
                                                    <StyledTableCell>
                                                        <Box display={"flex"} justifyContent={"end"} gap={1}>
                                                            <Assets
                                                                className={classes.writeBox}
                                                                src={"/assets/icons/write.svg"}
                                                                absolutePath={true}
                                                                onClick={() => { setData(row); setSelectedBranch(row?.branchDetails || {}); setIsEdit(true); setModel(true) }}
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
                onClose={() => { setModel(false); setData({}); setError({}); setIsEdit(false) }}
                title={`${isEdit ? "Update" : "Add"} User`}
                content={<AddUser data={data} setData={setData} error={error} handleChange={handleChange} branches={branches} selectedBranch={selectedBranch} setSelectedBranch={setSelectedBranch} roles={roles} city={city} states={states} onSubmit={_addUpdateUser} isEdit={isEdit} setSelectedState={setSelectedState} selectedState={selectedState} setSelectedCity={setSelectedCity} selectedCity={selectedCity} setSelectedRole={setSelectedRole} selectedRole={selectedRole} />}
            />D
        </>
    )
}

export default User
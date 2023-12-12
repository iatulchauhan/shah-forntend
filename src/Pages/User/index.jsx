import React, { useEffect, useState } from 'react'
import { alpha, styled } from "@mui/material/styles";
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
import TextLabel from '../../Components/Common/Fields/TextLabel';
import CommonTextField from '../../Components/Common/Fields/TextField';
import SelectDropDown from '../../Components/Common/SelectDropDown';
import CommonButton from '../../Components/Common/Button/CommonButton';
import { Regex } from '../../Utils/regex';
import CommonPagination from '../../Components/Common/Pagination';
import { lightTheme } from '../../theme';
import AddUser from '../../Components/User';
import { useAppContext } from '../../Context/context';
import axios from "../../APiSetUp/axios";
import swal from 'sweetalert';

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
        name: "John Doe",
        address: '121, Quicksand view, India',
        contact: ' +91 9865998545',
        email: 'johndoe@gmail.com',
        activePlan: 'Lorem ipsum',
        branch: 'Surat',
        role: 'Customer'
    },
    {
        key: '2',
        name: "John Doe",
        address: '121, Quicksand view, India',
        contact: ' +91 9865998545',
        email: 'johndoe@gmail.com',
        activePlan: 'Lorem ipsum',
        branch: 'Surat',
        role: 'Customer'
    },

];
const User = () => {
    const { classes } = useStyles();
    const { OnUpdateError, toggleLoader, onUpdateUser, updateToken } = useAppContext();
    const state = ['Gujarat ', 'Gujarat']
    const city = ['Surat', 'Ahmadabad']
    const branches = ['Surat', 'Ahmadabad']
    const roles = [
        {
            label: "admin",
            id: "0",
        },
        {
            label: "user",
            id: "1",
        },
        {
            label: "receptionist",
            id: "2",
        },
        {
            label: "counsellor",
            id: "3",
        },
        {
            label: "accountant",
            id: "4",
        },
        {
            label: "marketing",
            id: "5",
        },
    ]
    const plan = ['Surat', 'Ahmadabad']

    //States
    const [model, setModel] = useState(false);
    const [data, setData] = useState({})
    const [error, setError] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [userDetails, setUserDetails] = useState([]);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [page, setPage] = React.useState(0);
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
        if (!data?.state) {
            formIsValid = false
            errors['state'] = 'Please select state.'
        }
        if (!data?.city) {
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
        if (!data?.branch) {
            formIsValid = false
            errors['branch'] = 'Please select branch.'
        }
        if (!data?.userType) {
            formIsValid = false
            errors['userType'] = 'Please select Assign Roles.'
        }
        // if (!data?.activePlan) {
        //     formIsValid = false
        //     errors['activePlan'] = 'Please select Active Plan.'
        // }
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


    const _addUpdateUser = () => {
        if (handleValidation()) {
            toggleLoader();
            let body = {
                "name": data?.name,
                "address": data?.address,
                "country": data?.country,
                "state": data?.state,
                "city": data?.city,
                "postalCode": data?.postalCode,
                "mobileNo": data?.mobileNo,
                "email": data?.email,
                "branch": data?.branch,
                "userType": data?.userType,
                "activePlan": data?.activePlan,
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
                    // navigate("/")
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
    return (
        <>
            <PaperContainer elevation={0} square={false}>
                <Grid container >
                    <Grid item xs={12}>
                        <TableHeading title="User List" buttonText={'Add User'} onClick={() => setModel(true)} />
                    </Grid>
                    <Grid item xs={12}>
                        <TableContainer>
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
                                    {userDetails?.response?.length > 0 && userDetails?.response?.map((row, index) => (
                                        <StyledTableRow key={index} >
                                            <StyledTableCell>{row.key}</StyledTableCell>
                                            <StyledTableCell className={classes.paddedRow} component="th" scope="row">
                                                {row.name}
                                            </StyledTableCell>
                                            <StyledTableCell>{row.address}</StyledTableCell>
                                            <StyledTableCell>{row.mobileNo}</StyledTableCell>
                                            <StyledTableCell>{row.email}</StyledTableCell>
                                            <StyledTableCell>{row.activePlan}</StyledTableCell>
                                            <StyledTableCell>{row.branch}</StyledTableCell>
                                            <StyledTableCell>{row.userType}</StyledTableCell>
                                            <StyledTableCell>
                                                <Box display={"flex"} justifyContent={"end"} gap={1}>
                                                    <Assets
                                                        className={classes.writeBox}
                                                        src={"/assets/icons/write.svg"}
                                                        absolutePath={true}
                                                        onClick={() => { setData(row); setIsEdit(true); setModel(true) }}
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
                onClose={() => { setModel(false); setData({}); setError({}); setIsEdit(false) }}
                title={`${isEdit ? "Update" : "Add"} User`}
                content={<AddUser data={data} setData={setData} error={error} handleChange={handleChange} branches={branches} roles={roles} plan={plan} city={city} state={state} onSubmit={_addUpdateUser} isEdit={isEdit} />}
            />
        </>
    )
}

export default User
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
import { useAppContext } from '../../Context/context';
import axios from "../../APiSetUp/axios";
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import AddBranch from '../../Components/Branch';

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
            backgroundColor: "rgba(93, 95, 239, 0.2)",
            color: "#5D5FEF",
            cursor: "pointer",
        },
        viewBox: {
            borderRadius: "6px",
            padding: "8px",
            color: "#44B631",
            backgroundColor: "rgba(113, 239, 93, 0.2)",
            cursor: "pointer",
        },
        deleteBox: {
            borderRadius: "6px",
            padding: "8px",
            color: "#F14336",
            backgroundColor: "rgba(235, 87, 87, 0.2)",
            cursor: "pointer",
        },
    };
});
const rows = [
    {
        key: '1',
        name: "John Doe",
        address: '121, Quicksand view, Lorem ipsum , India',
    },
    {
        key: '2',
        name: "John Doe",
        address: '121, Quicksand view, Lorem ipsum , India',
    },

];
const Branches = () => {
    const { classes } = useStyles();
    const navigate = useNavigate();
    const { OnUpdateError, toggleLoader, onUpdateUser, updateToken } = useAppContext();

    const state = ['Gujarat ', 'Gujarat']
    const city = ['Surat', 'Ahmadabad']

    //States
    const [model, setModel] = useState(false);
    const [data, setData] = useState({})
    const [error, setError] = useState({})
    const [isEdit, setIsEdit] = useState(false)
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [page, setPage] = React.useState(0);
    const [brancesDetails, setBrancheDetails] = React.useState([]);

    const handleChangePage = (newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (value) => {
        setRowsPerPage(value);
        setPage(0);
    };
    console.log(data, "datadata")
    //Validation
    const handleValidation = () => {
        let formIsValid = true
        let errors = {}
        if (!data?.branchName) {
            formIsValid = false
            errors['branchName'] = 'Please enter name.'
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
        // console.log(first)
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

    const _getBranches = () => {
        toggleLoader();

        axios.get("admin/branch").then((res) => {
            if (res?.data?.data) {
                console.log("resasdasd", res?.data?.data);
                setBrancheDetails(res?.data?.data)
            }
            toggleLoader();
        }).catch((err) => {
            toggleLoader();
            OnUpdateError(err.data.message);
        }
        );
    }


    const _addUpdateBranch = () => {
        if (handleValidation()) {
            toggleLoader();
            let body = {
                "branchName": data?.branchName,
                "address": data?.address,
                "country": data?.country,
                "state": data?.state,
                "city": data?.city,
                "postalCode": data?.postalCode
            }
            if (data?._id) {
                body.id = data?._id
            }
            axios.post(`admin/branch/${data?._id ? "update" : "create"}`, body).then((res) => {
                console.log("resasdasd", res);
                if (res?.data?.data) {
                    swal(res?.data?.message, { icon: "success", timer: 5000, })
                    setModel(false)
                    setData({})
                    setError({})
                    setIsEdit(false)
                    _getBranches()
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

    React.useEffect(() => {
        _getBranches()
    }, [])

    return (
        <>
            <PaperContainer elevation={0} square={false}>
                <Grid container >
                    <Grid item xs={12}>
                        <TableHeading title="Branch List" buttonText={`Add Branch`} onClick={() => setModel(true)} />
                    </Grid>
                    <Grid item xs={12}>
                        <TableContainer>
                            <Table sx={{ minWidth: 600 }} aria-label="customized table">
                                <TableHead >
                                    <TableRow>
                                        <StyledTableCell className={classes.paddedRow}>#</StyledTableCell>
                                        <StyledTableCell>Branch Name</StyledTableCell>
                                        <StyledTableCell>Address</StyledTableCell>
                                        <StyledTableCell>Country</StyledTableCell>
                                        <StyledTableCell>State</StyledTableCell>
                                        <StyledTableCell>City</StyledTableCell>
                                        <StyledTableCell align="right">Action</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {brancesDetails?.response?.length > 0 && brancesDetails?.response?.map((row, index) => (
                                        <StyledTableRow key={index} >
                                            <StyledTableCell className={classes.paddedRow}>{index + 1}</StyledTableCell>
                                            <StyledTableCell component="th" scope="row">
                                                {row.branchName}
                                            </StyledTableCell>
                                            <StyledTableCell>{row.address}</StyledTableCell>
                                            <StyledTableCell>{row.country}</StyledTableCell>
                                            <StyledTableCell>{row.state}</StyledTableCell>
                                            <StyledTableCell>{row.city}</StyledTableCell>
                                            <StyledTableCell>
                                                <Box display={"flex"} justifyContent={"end"} gap={1}>
                                                    <Assets className={classes.writeBox} src={"/assets/icons/write.svg"} absolutePath={true} onClick={() => { setData(row); setIsEdit(true); setModel(true) }} />
                                                    <Assets className={classes.deleteBox} src={"/assets/icons/delete.svg"} absolutePath={true} />
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
                title={`${isEdit ? "Update" : "Add"} Branch`}
                content={<AddBranch data={data} setData={setData} error={error} handleChange={handleChange} city={city} state={state} onSubmit={_addUpdateBranch} isEdit={isEdit} />}
            />
        </>
    )
}

export default Branches;
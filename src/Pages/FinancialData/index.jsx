import React, { useState } from 'react'
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
import CommonPagination from '../../Components/Common/Pagination';
import { lightTheme } from '../../theme';
import { useAppContext } from '../../Context/context';
import axios from "../../APiSetUp/axios";
import dayjs from 'dayjs';
import AddFinancialData from '../../Components/FinancialData';
import CommonModal from '../../Components/Common/CommonModel';
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

const closeDate = (date, days) => {
    const initialDate = new Date(date);
    const newDate = new Date(initialDate);
    newDate.setDate(initialDate.getDate() + days);
    newDate.setUTCHours(0, 0, 0, 0)
    const formattedDate = newDate.toISOString();
    return dayjs(formattedDate).format('DD/MM/YYYY')
}

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

const FinancialData = () => {
    const { classes } = useStyles();
    const { OnUpdateError, toggleLoader } = useAppContext();
    //States
    const [financialDetails, setFinancialDetails] = useState([]);
    const [model, setModel] = useState(false);
    const [data, setData] = useState({})
    const [error, setError] = useState({})
    const [isEdit, setIsEdit] = useState(false)
    const [financialId, setFinancialId] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(0);

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
        if (!data?.investmentDate) {
            formIsValid = false
            errors['investmentDate'] = 'Please enter InvestmentDate.'
        }
        if (!data?.closingDate) {
            formIsValid = false
            errors['closingDate'] = 'Please enter ClosingDate.'
        }
        if (!data?.returnAmount) {
            formIsValid = false
            errors['returnAmount'] = 'Please enter Return Amount Of Interest.'
        }
        if (!data?.totalBalance) {
            formIsValid = false
            errors['totalBalance'] = 'Please enter Total Balance.'
        }
        setError(errors)
        return formIsValid
    }

    const _getFinancialData = () => {
        toggleLoader();
        let body = {
            limit: rowsPerPage,
            page: page + 1
        }
        axios.post(`/userParchesPlans`, body).then((res) => {
            if (res?.data?.data) {
                setFinancialDetails(res?.data?.data)
            }
            toggleLoader();
        }).catch((err) => {
            toggleLoader();
            OnUpdateError(err.data.message);
        }
        );
    }

    const _getFinancialById = (id) => {
        if (id) {
            axios
                .get(`userParchesPlans/${id}`)
                .then((res) => {
                    if (res?.data?.data) {
                        setIsEdit(true);
                        setData({
                            ...data,
                            name: res?.data?.data?.userDetails?.name,
                            returnAmount: `${res?.data?.data?.returnOfInvestment}%`,
                            totalBalance: res?.data?.data?.investment,
                        });
                    }
                })
                .catch((err) => {
                    toggleLoader();
                    OnUpdateError(err.data.message);
                });
        }
    };

    const _addUpdateFinancialData = () => {
        if (handleValidation()) {
            toggleLoader();
            let body = {
                "investment": data?.branchName,
                "returnOfInvestment": data?.address,
                "investmentDays": data?.postalCode
            }
            if (data?._id) {
                body.id = data?._id
            }
            axios.post(`userParchesPlans/${data?._id ? "update" : "create"}`, body).then((res) => {
                if (res?.data?.data) {
                    swal(res?.data?.message, { icon: "success", timer: 5000, })
                    handleClear()
                    _getFinancialData()
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

    const handleChange = (e) => {
        const { name, value } = e.target
        setData((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleClear = () => {
        setModel(false)
        setData({})
        setError({})
        setIsEdit(false)
        setFinancialId("")
    }

    React.useEffect(() => {
        _getFinancialData()
    }, [page, rowsPerPage])

    React.useEffect(() => {
        if (financialId) {
            _getFinancialById(financialId);
        }
    }, [financialId]);

    return (
        <>
            <PaperContainer elevation={0} square={false}>
                <Grid container >
                    <Grid item xs={12}>
                        <TableHeading title="Financial Data History" />
                    </Grid>
                    <Grid item xs={12}>
                        <TableContainer>
                            <Table sx={{ minWidth: 600 }} aria-label="customized table">
                                <TableHead >
                                    <TableRow>
                                        <StyledTableCell>#</StyledTableCell>
                                        <StyledTableCell>Name</StyledTableCell>
                                        <StyledTableCell align='center'>Investment Date</StyledTableCell>
                                        <StyledTableCell align='center'>Closing Date</StyledTableCell>
                                        <StyledTableCell align='center'>Return Amount Of Interest</StyledTableCell>
                                        <StyledTableCell align='center'>Total Balance</StyledTableCell>
                                        <StyledTableCell align="right">Action</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {financialDetails?.response?.length > 0 && financialDetails?.response?.map((row, index) => {
                                        return (
                                            <StyledTableRow key={index} >
                                                <StyledTableCell style={{ paddingLeft: '15px' }}>{index + 1}</StyledTableCell>
                                                <StyledTableCell>{row?.userDetails?.name} </StyledTableCell>
                                                <StyledTableCell align='center'>{dayjs(row.createdAt).format('DD/MM/YYYY')}</StyledTableCell>
                                                <StyledTableCell align='center'>{closeDate(row.createdAt, row?.investmentDays)}</StyledTableCell>
                                                <StyledTableCell align='center'>{`${row.investment * row.returnOfInvestment / 100}(${row.returnOfInvestment}%)`}</StyledTableCell>
                                                <StyledTableCell align='center'>{row.investment}</StyledTableCell>
                                                <StyledTableCell>
                                                    <Box display={"flex"} justifyContent={"end"} gap={1}>
                                                        <Assets
                                                            className={classes.writeBox}
                                                            src={"/assets/icons/write.svg"}
                                                            absolutePath={true}
                                                            onClick={() => {
                                                                setData(row); setIsEdit(true); setModel(true);
                                                                setFinancialId(row?._id);
                                                            }}
                                                        />
                                                        <Assets
                                                            className={classes.deleteBox}
                                                            src={"/assets/icons/delete.svg"}
                                                            absolutePath={true}
                                                        />
                                                    </Box>
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        )
                                    })}
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

            {model && <CommonModal
                open={model}
                onClose={handleClear}
                title={`${isEdit ? "Update" : "Add"} Financial`}
                content={<AddFinancialData data={data} setData={setData} error={error} handleChange={handleChange} isEdit={isEdit} onSubmit={_addUpdateFinancialData} />}
            />}
        </>
    )
}

export default FinancialData
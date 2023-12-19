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
    Switch,
} from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import Assets from '../../Components/Common/ImageContainer';
import PaperContainer from '../../Components/Common/PaperContainer';
import TableHeading from '../../Components/Common/CommonTableHeading';
import CommonModal from '../../Components/Common/CommonModel';
import CommonPagination from '../../Components/Common/Pagination';
import { useAppContext } from '../../Context/context';
import axios from "../../APiSetUp/axios";
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import AddBranch from '../../Components/Branch';
import DataNotFound from '../../Components/Common/DataNotFound';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { lightTheme } from '../../theme';
import CommonButton from '../../Components/Common/Button/CommonButton';
import AddMeeting from '../../Components/Meeting';

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
        title: "Lorem ipsum Dolor",
        meeting: 'John Doe',
        date: '30-10-2023',
        startTime: '10:00 AM',
        status: 'Pending Approval',
        creator: 'William Danny',
    },
    {
        key: '2',
        title: "Lorem ipsum Dolor",
        meeting: 'John Doe',
        date: '30-10-2023',
        startTime: '10:00 AM',
        status: 'Accepted',
        creator: 'William Danny',
    },
    {
        key: '3',
        title: "Lorem ipsum Dolor",
        meeting: 'John Doe',
        date: '30-10-2023',
        startTime: '10:00 AM',
        status: 'Completed',
        creator: 'William Danny',
    },

];
const MeetingList = () => {
    const { classes } = useStyles();
    const { OnUpdateError, toggleLoader } = useAppContext();
    const statusColors = {
        'Pending Approval': '#EB5757',
        'Accepted': '#2391C1',
        'Completed': '#4CC123',
    };
    //States
    const [model, setModel] = useState(false);
    const [data, setData] = useState({})
    const [error, setError] = useState({})
    const [isEdit, setIsEdit] = useState(false)
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const [page, setPage] = React.useState(0);
    const handleChangePage = (newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (value) => {
        setRowsPerPage(value);
        setPage(0);
    };

    const handleValidation = () => {
        let formIsValid = true
        let errors = {}
        if (!data?.branchName) {
            formIsValid = false
            errors['branchName'] = 'Please enter name.'
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


    const handleClear = () => {
        setModel(false)
        setData({})
        setError({})
        setIsEdit(false)
    }

    const _addUpdateBranch = () => {
        if (handleValidation()) {
            toggleLoader();
            let body = {
                "branchName": data?.branchName,
                "address": data?.address,
                "postalCode": data?.postalCode
            }
            if (data?._id) {
                body.id = data?._id
            }
            axios.post(`admin/branch/${data?._id ? "update" : "create"}`, body).then((res) => {
                if (res?.data?.data) {
                    swal(res?.data?.message, { icon: "success", timer: 5000, })
                    handleClear()
                }
                toggleLoader();
            }).catch((err) => {
                toggleLoader();
                OnUpdateError(err.data.message);
            }
            );
        }
    }



    return (
        <>
            <PaperContainer elevation={0} square={false}>
                <Grid container >
                    <Grid item xs={12}>
                        <TableHeading title="Meeting List" buttonText={"Schedule Meeting"} onClick={() => setModel(true)} />
                    </Grid>
                    <Grid item xs={12}>
                        <TableContainer>
                            <Table sx={{ minWidth: 600 }} aria-label="customized table">
                                <TableHead >
                                    <TableRow>
                                        <StyledTableCell className={classes.paddedRow}>#</StyledTableCell>
                                        <StyledTableCell>Title</StyledTableCell>
                                        <StyledTableCell>Meeting With</StyledTableCell>
                                        <StyledTableCell>Date</StyledTableCell>
                                        <StyledTableCell>Start Time</StyledTableCell>
                                        <StyledTableCell>Status</StyledTableCell>
                                        <StyledTableCell>Creator</StyledTableCell>
                                        <StyledTableCell align="right">Action</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row, index) => (
                                        <StyledTableRow key={index} >
                                            <StyledTableCell>{row.key}</StyledTableCell>
                                            <StyledTableCell className={classes.paddedRow} component="th" scope="row">
                                                {row.title}
                                            </StyledTableCell>
                                            <StyledTableCell>{row.meeting}</StyledTableCell>
                                            <StyledTableCell>{row.date}</StyledTableCell>
                                            <StyledTableCell>{row.startTime}</StyledTableCell>
                                            <StyledTableCell className={classes.paddedRow} data-status={row.status}>
                                                <CommonButton
                                                    text={row.status}
                                                    type="submit"
                                                    background={statusColors[row.status] || ''}
                                                    borderRadius='8px'
                                                />
                                            </StyledTableCell>
                                            <StyledTableCell>{row.creator}</StyledTableCell>
                                            <StyledTableCell>
                                                <Box display={"flex"} justifyContent={"end"} gap={1}>
                                                    <Assets
                                                        className={classes.writeBox}
                                                        src={"/assets/icons/write.svg"}
                                                        absolutePath={true}
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
                onClose={handleClear}
                title={`${isEdit ? "Update" : "Add"} User`}
                content={<AddMeeting data={data} setData={setData} error={error} handleChange={handleChange} onSubmit={_addUpdateBranch} isEdit={isEdit}  />}
            />
        </>
    )
}

export default MeetingList
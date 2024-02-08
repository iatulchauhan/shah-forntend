import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { makeStyles } from "tss-react/mui";
import { Table, TableRow, TableHead, Box, Grid, useTheme, } from "@mui/material";
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
import CommonModal from "../../Components/Common/CommonModel";
import swal from "sweetalert";
import { permissionStatus } from "../../Utils/enum";
import { useLocation } from "react-router-dom";
import DataNotFound from "../../Components/Common/DataNotFound";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import AddNewFile from "../../Components/New File";

import { globalAmountConfig } from "../../Utils/globalConfig";

import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import TextLabel from "../../Components/Common/Fields/TextLabel";
import CommonButton from "../../Components/Common/Button/CommonButton";
import Swal from "sweetalert2";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `3px solid ${"#FFF"}`,
    '&:not(:last-child)': { borderBottom: 0, },
    '&::before': { display: 'none', },
}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.5rem' }} />}    {...props} />
))(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .05)' : "#79797914",
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
    padding: theme.spacing(0)
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(0.5),
    borderTop: '0px solid rgba(0, 0, 0, .125)',
}));


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        fontWeight: 600,
        fontSize: 12,
        color: theme.palette.primary.main,
        fontFamily: "Poppins",
        padding: 5,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 12,
        fontFamily: "Poppins",
        fontWeight: 500,
        padding: "8px",
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        // backgroundColor: theme.palette.action.hover,
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
            padding: "6px",
            backgroundColor: lightTheme.palette.bgLightExtraPrimary.main,
            color: lightTheme.palette.primary.main,
            cursor: "pointer",
            height: '26px'
        },
        viewBox: {
            borderRadius: "6px",
            padding: "6px",
            color: lightTheme.palette.bgLightSuccess.main,
            backgroundColor: lightTheme.palette.bgLightExtraSuccess.main,
            cursor: "pointer",
            height: '26px'
        },
        deleteBox: {
            borderRadius: "6px",
            padding: "6px",
            color: lightTheme.palette.bgLightRed.main,
            backgroundColor: lightTheme.palette.bgLightExtraRed.main,
            cursor: "pointer",
            height: '26px'
        },
    };
});
const NewFile = () => {
    const { classes } = useStyles();
    const { OnUpdateError, toggleLoader, menuList, user } = useAppContext();
    const location = useLocation();
    const { pathname } = location;
    const theme = useTheme()
    //States
    const [data, setData] = useState({ userPurchasePlan: [{ _id: null, investment: "", investmentDays: "", returnOfInvestment: "" }] });
    const [newFileDetails, setNewFileDetails] = useState([]);
    const [model, setModel] = useState(false);
    const [error, setError] = useState({});
    const [isEdit, setIsEdit] = useState(false);
    const [newFileId, setNewFileId] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);
    const [permissions, setPermissions] = useState({});
    const [clients, setClients] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedClient, setSelectedClient] = useState("");
    const [expanded, setExpanded] = React.useState('panel1');


    const handleAccordian = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const handleChangePage = (newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (value) => {
        setRowsPerPage(value);
        setPage(0);
    };

    const closeDate = (date, days) => {
        const initialDate = new Date(date);
        const newDate = new Date(initialDate);
        newDate.setDate(initialDate.getDate() + days);
        newDate.setUTCHours(0, 0, 0, 0);
        const formattedDate = newDate.toISOString();
        return dayjs(formattedDate).format("DD/MM/YYYY");
    };

    //Validation
    const handleValidation = () => {
        let formIsValid = true;
        let errors = {};
        if (!selectedClient) {
            formIsValid = false;
            errors["selectedClient"] = "*Please select Client.";
        }

        data?.userPurchasePlan?.map((e) => {
            if (!e?.investment) {
                formIsValid = false;
                errors["investment"] = "* Please enter Investment.";
            }
            if (!e?.investmentDays) {
                formIsValid = false;
                errors["investmentDays"] = "* Please enter Investment Days.";
            }
            if (!e?.returnOfInvestment) {
                formIsValid = false;
                errors["returnOfInvestment"] = "* Please enter Return Of Investment.";
            }
        });
        setError(errors);
        return formIsValid;
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

    const handleClear = () => {
        setModel(false);
        setData({ userPurchasePlan: [{ _id: null, investment: "", investmentDays: "", returnOfInvestment: "" }] });
        setError({});
        setIsEdit(false);
        setNewFileId("");
        setSelectedClient("");
        _getNewFiles()
    };

    const _getUsers = async () => {
        toggleLoader();

        await axios.post("/userPurchasePlan/userList")
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

    const _getNewFiles = async () => {
        toggleLoader();
        let body = {
            limit: rowsPerPage,
            page: page + 1,
            search: search || "",
        };
        await axios.post(`/userPurchasePlanList`, body)
            .then((res) => {
                if (res?.data?.data) {
                    setNewFileDetails(res?.data?.data);
                }
                toggleLoader();
            })
            .catch((err) => {
                toggleLoader();
                OnUpdateError(err.data.message);
            });
    };

    const _getNewFIleById = () => {
        axios
            .get(`userPurchasePlan/${newFileId}`)
            .then((res) => {
                if (res?.data?.data) {
                    setIsEdit(true);
                    setData(res?.data?.data);
                    setSelectedClient(res?.data?.data?.name);
                }
            })
            .catch((err) => {
                toggleLoader();
                OnUpdateError(err.data.message);
            });
    };


    const _deleteUserPlanById = async (id) => {
        toggleLoader();
        await axios.post(`userPurchasePlan/delete/${id}`)
            .then(async (res) => {
                console.log(res, "res?.data?.data")
                if (res?.data?.status === 200 && newFileId) {
                    await _getNewFIleById()
                    toggleLoader();
                    swal(res?.data?.message, { icon: "success", timer: 5000 });
                    await _getNewFiles()
                }
            })
            .catch((err) => {
                toggleLoader();
                OnUpdateError(err.data.message);
            });
    }

    const _generateCredential = (id) => {
        toggleLoader();
        axios.post(`generateId/${id}`)
            .then((res) => {
                if (res?.data?.data) {
                    swal(res?.data?.message, { icon: "success", timer: 5000 });
                    _getNewFiles()
                }
            })
            .catch((err) => {
                toggleLoader();
                OnUpdateError(err.data.message);
            });
    };

    const _addUpdateNewFile = () => {
        if (handleValidation()) {
            toggleLoader();
            let body = {
                client: clients?.filter((e) => e?.name === selectedClient)[0]?._id,
                clientBranch: clients?.filter((e) => e?.name === selectedClient)[0]?.branch,
                userPurchasePlan: data?.userPurchasePlan
            };
            if (data?._id) {
                body.id = data?._id;
            }
            axios.post(`userPurchasePlan/${data?._id ? "update" : "create"}`, body)
                .then((res) => {
                    if (res?.data?.data) {
                        swal(res?.data?.message, { icon: "success", timer: 5000 });
                        handleClear();
                        _getNewFiles();
                    }
                    toggleLoader();
                })
                .catch((err) => {
                    toggleLoader();
                    OnUpdateError(err.data.message);
                });
        }
    };






    useEffect(() => {
        _getNewFiles();
    }, [page, rowsPerPage, search]);

    useEffect(() => {
        if (newFileId) {
            _getNewFIleById();
        }
    }, [newFileId]);

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
                create: menuPermissions.includes(permissionStatus.create) ? true : false,
                update: menuPermissions.includes(permissionStatus.update) ? true : false,
                delete: menuPermissions.includes(permissionStatus.delete) ? true : false,
            });
        }
    }, [menuList, location]);
    return (
        <>
            <PaperContainer elevation={0} square={false}>
                <Grid container>
                    <Grid item xs={12}>
                        <TableHeading
                            title={"New File History"}
                            buttonText={permissions?.create ? `Add New File` : ""}
                            onClick={() => setModel(true)}
                            handleSearch={(value) => { setSearch(value); }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        {newFileDetails?.response?.length > 0 && newFileDetails?.response?.map((val, index) => {
                            console.log(val, "val")
                            const sumOfInvestment = val.userPurchasePlan?.reduce((total, plan) => { return total + plan.investment }, 0);
                            return <Accordion expanded={expanded === index + 'panel1'} onChange={handleAccordian(index + 'panel1')} >
                                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" expandIcon={<ArrowDownwardIcon sx={{ marginLeft: 3, marginRight: 3, fontSize: '1rem', color: theme.palette.primary.main }} />}>
                                    <Box display={'flex'} alignItems={'center'} width="100%" justifyContent="space-between">
                                        <Box display={'flex'} alignItems={'center'} flexShrink={0} width={'180px'}>
                                            <PersonOutlineIcon color="primary" fontSize="small" />
                                            <TextLabel color={theme.palette.primary.main} fontSize={"14px"} title={val?.name?.toUpperCase()} />
                                        </Box>

                                        <Box display={'flex'} flexWrap={'wrap'} alignItems={'center'} gap={10}>
                                            <Box display={'flex'} flexWrap={'wrap'} alignItems={'center'} gap={2}>
                                                <Box>
                                                    <TextLabel fontSize={"12px"} title={"Total Plan"} textAlign={'start'} line />
                                                    <TextLabel fontSize={"12px"} title={val.userPurchasePlan?.length} textAlign={'start'} fontWeight={600} />
                                                </Box>
                                                <Box>
                                                    <TextLabel fontSize={"12px"} title={"Total Investment"} textAlign={'start'} line />
                                                    <TextLabel fontSize={"12px"} title={globalAmountConfig(sumOfInvestment) || 0} textAlign={'start'} fontWeight={600} />
                                                </Box>
                                                <Box>
                                                    <TextLabel fontSize={"12px"} title={"Status"} textAlign={'start'} line />
                                                    <TextLabel fontSize={"12px"} color={val?.isGenerateId ? theme.palette.bgLightSuccess.main : theme.palette.bgLightBlue2.main} title={val?.isGenerateId ? "Generated" : "Pending"} textAlign={'center'} />
                                                </Box>
                                            </Box>
                                            <Box display={"flex"} gap={1}>
                                                {permissions?.update && (
                                                    <Assets className={classes.writeBox} src={"/assets/icons/write.svg"}
                                                        absolutePath={true}
                                                        onClick={() => {
                                                            setData(val);
                                                            setIsEdit(true);
                                                            setModel(true);
                                                            setNewFileId(val?._id);
                                                        }}
                                                    />
                                                )}
                                                {/* {permissions?.delete && (
                                                    <Assets
                                                        className={classes.deleteBox}
                                                        src={"/assets/icons/delete.svg"}
                                                        absolutePath={true}
                                                    />
                                                )} */}
                                                <Box>
                                                    <CommonButton
                                                        width={'90px'}
                                                        text={`Generate ID`}
                                                        padding={"2px 2px"}
                                                        fontSize='11px'
                                                        onClick={(e) => {
                                                            e?.stopPropagation()
                                                            Swal.fire({
                                                                title: "<strong>Warning</strong>",
                                                                icon: "warning",
                                                                html: "Are you sure you want to generate Id?",
                                                                showCancelButton: true,
                                                                confirmButtonColor: "#0492c2",
                                                                iconColor: "#0492c2",
                                                                confirmButtonText: "Yes",
                                                                cancelButtonColor: "#1A1B2F",
                                                            }).then(async (result) => {
                                                                if (result.isConfirmed) {
                                                                    _generateCredential(val?._id)
                                                                }
                                                            })
                                                        }}
                                                    />
                                                </Box>
                                            </Box>
                                        </Box>

                                    </Box>
                                </AccordionSummary>
                                <AccordionDetails>
                                    {val?.userPurchasePlan?.length > 0 ? (
                                        <Table sx={{ minWidth: 600 }} aria-label="customized table">
                                            <TableHead>
                                                <TableRow>
                                                    <StyledTableCell>No.</StyledTableCell>
                                                    <StyledTableCell> Investment Date </StyledTableCell>
                                                    <StyledTableCell> Closing Date </StyledTableCell>
                                                    <StyledTableCell align="center"> Investment Days </StyledTableCell>
                                                    <StyledTableCell> Return Amount Of Interest </StyledTableCell>
                                                    <StyledTableCell> Investment Amount </StyledTableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {val?.userPurchasePlan?.length > 0 &&
                                                    val?.userPurchasePlan?.map((row, index) => {
                                                        console.log(row, "row")
                                                        return (
                                                            <StyledTableRow key={index}>
                                                                <StyledTableCell style={{ paddingLeft: "15px" }}>{index + 1 + page * rowsPerPage}</StyledTableCell>
                                                                <StyledTableCell>{dayjs(row.createdAt).format("DD/MM/YYYY")}</StyledTableCell>
                                                                <StyledTableCell>{closeDate(row.createdAt, row?.investmentDays)}</StyledTableCell>
                                                                <StyledTableCell align="center">{row?.investmentDays}</StyledTableCell>
                                                                <StyledTableCell>{`${(row.investment * row.returnOfInvestment) / 100}(${row.returnOfInvestment}%)`}</StyledTableCell>
                                                                <StyledTableCell>{globalAmountConfig(row.investment)}</StyledTableCell>
                                                            </StyledTableRow>
                                                        );
                                                    })}
                                            </TableBody>
                                        </Table>
                                    ) : (<DataNotFound icon={<ErrorOutlineIcon color="primary" style={{ fontSize: "3rem" }} />} elevation={2} />)}
                                </AccordionDetails>
                            </Accordion>
                        })}
                    </Grid>
                </Grid>
                {newFileDetails?.count > 0 &&
                    <Grid>
                        <CommonPagination
                            count={newFileDetails?.count}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            onPageChange={handleChangePage}
                        />
                    </Grid>}
            </PaperContainer>
            {model && (
                <CommonModal
                    open={model}
                    onClose={handleClear}
                    title={`${isEdit ? "Update" : "Add"} New File`}
                    maxWidth={'md'}
                    content={
                        <AddNewFile
                            data={data}
                            setData={setData}
                            error={error}
                            handleChange={handleChange}
                            isEdit={isEdit}
                            onSubmit={_addUpdateNewFile}
                            setSelectedClient={setSelectedClient}
                            selectedClient={selectedClient}
                            clients={clients}
                            user={user}
                            setUserPurchasePlanDelete={setUserPurchasePlanDelete}
                            setUserPurchasePlanAdd={setUserPurchasePlanAdd}
                            deleteUserPlan={_deleteUserPlanById}
                        />
                    }
                />
            )}
        </>
    )
}

export default NewFile
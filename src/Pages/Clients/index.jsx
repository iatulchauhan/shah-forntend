import React, { useEffect, useState } from "react";
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
import Assets from "../../Components/Common/ImageContainer";
import PaperContainer from "../../Components/Common/PaperContainer";
import TableHeading from "../../Components/Common/CommonTableHeading";
import CommonModal from "../../Components/Common/CommonModel";
import { Regex } from "../../Utils/regex";
import CommonPagination from "../../Components/Common/Pagination";
import { lightTheme } from "../../theme";
import { useAppContext } from "../../Context/context";
import axios from "../../APiSetUp/axios";
import swal from "sweetalert";
import DataNotFound from "../../Components/Common/DataNotFound";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Roles, roles } from "../../Utils/enum";
import AddClient from "../../Components/Client";
import WidgetLoader from "../../Components/Common/widgetLoader";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    fontWeight: 600,
    fontSize: 14,
    color: theme.palette.primary.main,
    fontFamily: "Poppins",
    whiteSpace: "nowrap",
    padding: 5,
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

const Clients = () => {
  const { classes } = useStyles();
  const { OnUpdateError, toggleLoader } = useAppContext();
  //States
  const [userDetails, setUserDetails] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (value) => {
    setRowsPerPage(value);
    setPage(0);
  };
  //Validation
  const _getUser = () => {
    let body = {
      limit: rowsPerPage,
      page: page + 1,
      userType: [Roles.User],
      search: search || "",
    };
    axios.post(`/users`, body)
      .then((res) => {
        if (res?.data?.data) {
          setUserDetails(res?.data?.data);
        }
      })
      .catch((err) => {
        OnUpdateError(err.data.message);
      });
  };

  useEffect(() => {
    _getUser();
  }, [page, rowsPerPage, search]);

  return (
    <>
      <PaperContainer elevation={0} square={false}>
        <Grid container>
          <Grid item xs={12}>
            <TableHeading title="Client List" handleSearch={(value) => { setSearch(value); }} />
          </Grid>
          <Grid item xs={12}>
            <TableContainer>
              {userDetails?.response != undefined ? (
                <Table sx={{ minWidth: 600 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell className={classes.paddedRow}>
                        #
                      </StyledTableCell>
                      <StyledTableCell>Name</StyledTableCell>
                      <StyledTableCell>Address</StyledTableCell>
                      <StyledTableCell>Contact No.</StyledTableCell>
                      <StyledTableCell>Email Id</StyledTableCell>
                      <StyledTableCell align="center">
                        Active Plan
                      </StyledTableCell>
                      <StyledTableCell>Branch</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {userDetails?.response?.length > 0 ?
                      userDetails?.response?.map((row, index) => {
                        const getRoleName = (type) => {
                          return roles.filter((e) => e?.id == type)?.[0]?.label;
                        };
                        return (
                          <StyledTableRow key={index}>
                            <StyledTableCell>{index + 1 + page * rowsPerPage}</StyledTableCell>
                            <StyledTableCell
                              className={classes.paddedRow}
                              component="th"
                              scope="row"
                            >
                              {row.name}
                            </StyledTableCell>
                            <StyledTableCell>{row.address}</StyledTableCell>
                            <StyledTableCell>{row.mobileNo}</StyledTableCell>
                            <StyledTableCell>{row.email}</StyledTableCell>
                            <StyledTableCell align="center">
                              {row.userPurchasePlan?.length}
                            </StyledTableCell>
                            <StyledTableCell>
                              {row?.branchDetails?.[0]?.branchName}
                            </StyledTableCell>
                          </StyledTableRow>
                        );
                      }) :
                      <TableRow>
                        <TableCell colSpan={12}> <DataNotFound icon={<ErrorOutlineIcon color="primary" style={{ fontSize: "3rem" }} />} elevation={2} />
                        </TableCell>
                      </TableRow>
                    }
                  </TableBody>
                </Table>
              ) : (
                <WidgetLoader />
              )}
            </TableContainer>
          </Grid>
          {userDetails?.count > 0 && <Grid item xs={12}>
            <CommonPagination
              count={userDetails?.count}
              rowsPerPage={rowsPerPage}
              page={page}
              onRowsPerPageChange={handleChangeRowsPerPage}
              onPageChange={handleChangePage}
            />
          </Grid>}
        </Grid>

      </PaperContainer>
    </>
  );
};

export default Clients;

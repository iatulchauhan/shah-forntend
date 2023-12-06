import React from 'react'
import { alpha, styled } from "@mui/material/styles";
import { makeStyles } from "tss-react/mui";
import {
    Table,
    TableRow,
    TableHead,
    TableContainer,
    Paper,
    Box,
    Grid,
    InputBase,
} from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import SectionHeading from '../../Components/Common/SectionHeading';
import CommonButton from '../../Components/Button/CommonButton';
import SearchIcon from '@mui/icons-material/Search';

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

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#F9FAFB',
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

const useStyles = makeStyles()((theme) => {
    return {
        paddedRow: {
            padding: '15px 10px',
        },
    };
});

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));
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
    return (
        <>
            <Grid container component={Paper}>
                <Grid item xs={12}>
                    <Box style={{
                        borderBottom: '1px solid #e3e1e1',
                        padding: '10px 13px',
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}>
                        <SectionHeading
                            title={"User List"}
                            style={{
                                fontSize: "18px",
                                fontWeight: 600,
                                color: '#151D48',
                                marginTop: '5px'
                            }}
                        />
                        {/* <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search> */}
                        <CommonButton
                            width={'8%'}
                            text="Add User"
                            type="submit"
                            fontSize="13px"
                        />
                    </Box>

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
                                    <StyledTableCell align="center">Action</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row, index) => (
                                    <StyledTableRow key={index} >
                                        <StyledTableCell>{row.key}</StyledTableCell>
                                        <StyledTableCell className={classes.paddedRow} component="th" scope="row">
                                            {row.name}
                                        </StyledTableCell>
                                        <StyledTableCell>{row.address}</StyledTableCell>
                                        <StyledTableCell>{row.contact}</StyledTableCell>
                                        <StyledTableCell>{row.email}</StyledTableCell>
                                        <StyledTableCell>{row.activePlan}</StyledTableCell>
                                        <StyledTableCell>{row.branch}</StyledTableCell>
                                        <StyledTableCell>{row.role}</StyledTableCell>
                                        <StyledTableCell align="left">
                                            <Box display={"flex"} justifyContent={"center"} gap={1}>
                                                <RemoveRedEyeOutlinedIcon style={{ cursor: "pointer", color: "#44B631", backgroundColor: "#71EF5D", borderRadius: "6px", padding: "8px", opacity: '0.2' }} />
                                                <DeleteIcon style={{ cursor: "pointer", color: "#F14336", backgroundColor: "#FF8A80", borderRadius: "6px", padding: "8px" }} />
                                            </Box>
                                        </StyledTableCell>

                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </>
    )
}

export default User
import React from 'react';
import { Box, IconButton, useTheme } from '@mui/material';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';

const CommonPagination = ({ count, page, rowsPerPage, onPageChange, onRowsPerPageChange, data }) => {
    const theme = useTheme()

    const handlePageChange = (newPage) => {
        onPageChange(newPage);
    };

    const handleRowsPerPageChange = (event) => {
        onRowsPerPageChange(parseInt(event.target.value, 10));
    };

    const maxPage = Math.ceil(count / rowsPerPage) - 1;
    return (
        <Box display="flex" alignItems="center" justifyContent="space-between" flexWrap={"wrap"} sx={{ marginTop: "10px" }}>
            <Box display={"flex"} alignItems={"center"} p={1}>
                <Box fontSize={"13px"}>Show&nbsp;</Box>
                <Box>
                    <select
                        value={rowsPerPage}
                        onChange={(e) => {
                            handleRowsPerPageChange(e);
                        }}
                        style={{ borderColor: "#EEE", padding: 5, borderRadius: 4 }}
                    >
                        {[5, 10, 25].map((pageSize) => (
                            <option key={pageSize} value={pageSize}>
                                {pageSize}
                            </option>
                        ))}
                    </select>
                </Box>
                <Box fontSize={"13px"}>&nbsp;entries</Box>
            </Box>
            <Box display={"flex"} alignItems={"center"} p={1}>
                <IconButton
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 0}
                    sx={{ backgroundColor: "#EEE", padding: { xs: '0px', sm: '5px' }, borderRadius: "5px", marginRight: '10px', fontSize: '13px' }}
                >
                    <FirstPageIcon />
                </IconButton>
                <Box sx={{ backgroundColor: theme.palette.primary.main, padding: { xs: '0px 8px', sm: '6px 11px' }, borderRadius: "5px", color: 'white', fontSize: '13px' }}>{page + 1}</Box>
                <IconButton
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page >= maxPage}
                    sx={{ backgroundColor: "#EEE", padding: { xs: '0px', sm: '5px' }, borderRadius: "5px", marginLeft: '10px', fontSize: '13px' }}
                >
                    <LastPageIcon />
                </IconButton>
            </Box>
            <Box>
                <Box fontSize={"12px"} p={1}>
                    Showing {Math.min(rowsPerPage * page + 1, count)} to{" "}
                    {Math.min(rowsPerPage * (page + 1), count)} of {count} entries
                </Box>
            </Box>
        </Box>
    );
};

export default CommonPagination;

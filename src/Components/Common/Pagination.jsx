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

    const totalPages = Math.ceil(count / rowsPerPage);

    const calculatePageRange = () => {
        const visiblePages = 5;

        if (totalPages <= visiblePages) {
            return Array.from({ length: totalPages }, (_, index) => index + 1);
        }
        const startPage = Math.max(0, Math.min(page - Math.floor(visiblePages / 2), totalPages - visiblePages));
        const endPage = Math.min(startPage + visiblePages, totalPages);

        const pages = [];
        if (startPage > 0) {
            pages.push(1, '...');
        }
        for (let i = startPage + 1; i < endPage; i++) {
            pages.push(i);
        }
        if (endPage < totalPages) {
            pages.push('...', totalPages);
        }

        return pages;
    };

    const pageRange = calculatePageRange();

    return (
        <Box display="flex" alignItems="center" justifyContent={{ xs: "center", sm: "center", md: "space-between", lg: "space-between" }} flexWrap={"wrap"} sx={{ marginTop: "0px" }}>
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
                        {[10, 25, 50, 100].map((pageSize) => (
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
                {pageRange.map((pageNumber, index) => (
                    <Box
                        key={index}
                        onClick={() => (pageNumber !== '...' ? handlePageChange(pageNumber - 1) : null)}
                        sx={{
                            backgroundColor:
                                pageNumber === page + 1 ? theme.palette.primary.main : pageNumber === '...' ? 'transparent' : '#EEE',
                            padding: { xs: '0px 8px', sm: '6px 11px' },
                            borderRadius: '5px',
                            color: pageNumber === page + 1 ? 'white' : pageNumber === '...' ? 'inherit' : 'black',
                            fontSize: '13px',
                            cursor: pageNumber !== '...' ? 'pointer' : 'default',
                            margin: '0 5px',
                        }}
                    >
                        {pageNumber}
                    </Box>
                ))}
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

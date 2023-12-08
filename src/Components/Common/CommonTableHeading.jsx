import { Box, InputBase, alpha, styled } from '@mui/material'
import React from 'react'
import SectionHeading from './SectionHeading'
import CommonButton from './Button/CommonButton'
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#f3f3f3',
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
    color: '#5D5FEF'
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
const TableHeading = ({ title, buttonText, onClick }) => {
    return (
        <Box style={{
            borderBottom: '1px solid #e3e1e1',
            padding: '10px 13px',
            display: 'flex',
            justifyContent: 'space-between'
        }}>
            <SectionHeading
                title={title}
                style={{
                    fontSize: "18px",
                    fontWeight: 600,
                    color: '#151D48',
                    marginTop: '5px'
                }}
            />
            <Box display={'flex'} gap={2}>
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </Search>
                <CommonButton
                    text={buttonText}
                    type="submit"
                    fontSize="13px"
                    onClick={onClick}
                />
            </Box>
        </Box>
    )
}

export default TableHeading
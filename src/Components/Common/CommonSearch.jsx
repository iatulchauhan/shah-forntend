import React, { useState } from 'react';
import { InputBase, alpha, styled } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { lightTheme } from '../../theme';


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#f3f3f3',
    // '&:hover': {
    //     backgroundColor: alpha(theme.palette.common.white, 0.25),
    // },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        // marginLeft: theme.spacing(1),
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
    color: lightTheme.palette.primary.main,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: lightTheme.palette.bgLightExtraLightGray.main,
    // width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            // width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

const CommonSearch = ({ placeholder, width, onSearch, ...props }) => {

    const [searchTerm, setSearchTerm] = useState("");
    const [timer, setTimer] = useState(0);
    const WAIT_INTERVAL = 500;
    return (
        <Search>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                width={width}
                placeholder={placeholder ? placeholder : "Search here..."}
                inputProps={{ 'aria-label': 'search' }}
                // onChange={onSearch ? (e) => onSearch(e) : {}}
                onChange={(ev) => {
                    setSearchTerm(ev.target.value);
                    let val = (ev.target.value || "").trim();
                    clearTimeout(timer);
                    setTimer(
                        setTimeout(() => {
                            props.handleSearch && props.handleSearch(val);
                        }, WAIT_INTERVAL)
                    );
                }}
            />
        </Search>
    )
}

export default CommonSearch
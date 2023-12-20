import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Box, InputLabel, Paper, Typography, useTheme } from "@mui/material";
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
    return {
        select: {
            "& .MuiSelect-select ": {
                padding: "14px"
            },
            "&:before": {
                borderColor: "white",
            },
            "&:after": {
                borderColor: "white",
            },
            "&:not(.Mui-disabled):hover::before": {
                borderColor: "white",
            },
            "& .MuiInputBase-input": {
                height: "15px",
                fontSize: '14px',
            },
            "& .MuiInputBase-fullWidth": {
                fontSize: "14px",
                fontFamily: "Poppins",
            },
            "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#EEEEEE",
                borderRadius: "10px",
            },
            "& .MuiOutlinedInput-root": {
                "& fieldset": {
                    borderColor: "#EEEEEE",
                    borderRadius: "10px",
                },
                "&:hover fieldset": {
                    borderColor: "#EEEEEE",
                },
                "&.Mui-focused fieldset": {
                    borderColor: "#EEEEEE",
                },
            },
            "&:hover": {
                "& .MuiOutlinedInput-notchedOutline": {
                    border: "1px solid #EEEEEE"
                },
            },
            "&.Mui-focused": {
                "& .MuiOutlinedInput-notchedOutline": {
                    border: "1px solid #EEEEEE"
                },
            },
        },
        icon: {
            fill: '#eee',
        },
        root: {
            // color: 'white',
        },
        main: {
            background: theme?.palette?.bgWhite?.main,
            minWidth: "50px",
            ".MuiInputBase-input": {
                height: "15px",
                fontSize: '14px',
            },
            "&:hover": {
                borderColor: `${theme?.palette?.primary?.main} !important`,
            },
            ".MuiInputBase-formControl:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: `${theme?.palette?.primary?.main} !important`,
            },
            ".MuiOutlinedInput-notchedOutline": {
                borderColor: "#EDF2F6",
                borderRadius: '12px',
            },
            ".Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: `${theme?.palette?.primary?.main} !important`,
                borderWidth: "1px !important",
            },
        },
        error: {
            border: "1px solid green",
        },
    };
});

export default function AutoCompleteSearch({
    width,
    height,
    text,
    valid,
    options,
    placeholder,
    handleChange,
    name,
    handleChangeInput,
    fontWeight,
    labelSize,
    disabled,
    defaultValue,
    freeSolo = true,
    clearOnSelect,
    blurOnSelect,
    loadData,
    onBlur,
    searchValue,
    handleSearch,
    multiple = false,
    fullWidth,
    className
}) {
    const { classes, cx } = useStyles();
    const theme = useTheme()
    return (
        <>
            {text && (
                <Box
                    mt={1.5}
                    // mb={1}
                    display="flex"
                    fontSize="12px"
                    flexDirection={"row"}
                >
                    <InputLabel
                        sx={{
                            marginRight: "3px",
                            fontWeight: fontWeight,
                            fontSize: "15px",
                            color: theme.palette.bgDarkPrimary.main,
                            padding: '3px',
                        }}
                    >
                        {text}
                    </InputLabel>
                    {valid && (
                        <Typography color="#EF627A" component={"caption"} variant={"body2"}>
                            *
                        </Typography>
                    )}
                </Box>
            )}
            <Box
                display="flex"
                className="search_filed"
                bgcolor="white"
                borderRadius={1}
            >
                <Autocomplete
                    fullWidth={fullWidth}
                    // multiple={multiple}
                    className={cx(classes.main, className)}
                    disabled={disabled ? disabled : ""}
                    autoHighlight={false}
                    disablePortal
                    blurOnSelect={blurOnSelect}
                    options={options || []}
                    onChange={handleChange}
                    isOptionEqualToValue={(option, value) => {
                        if (value === "" || value === option) {
                            return true;
                        } else {
                            return false;
                        }
                    }}
                    value={defaultValue || ""}
                    defaultValue={defaultValue || ""}
                    sx={{
                        borderRadius: 1,
                        width: width,
                        backgroundColor: "white",
                    }}
                    freeSolo={freeSolo}
                    renderInput={(params) => (
                        <TextField
                            className="searchInput"
                            {...params}
                            onBlur={onBlur}
                            placeholder={placeholder}
                            onChange={handleSearch}
                            name={name}
                            disabled={disabled ? disabled : ""}
                            value={searchValue}
                        />
                    )}
                />
            </Box>
        </>
    );
}

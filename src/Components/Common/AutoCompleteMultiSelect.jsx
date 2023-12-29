import React from 'react'
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { makeStyles } from "tss-react/mui";
import { Box, InputLabel, Typography, useTheme } from '@mui/material';

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
const AutoCompleteMultiSelect = ({ width,
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
    getOptionLabel,
    freeSolo = true,
    clearOnSelect,
    blurOnSelect,
    loadData,
    onBlur,
    searchValue,
    handleSearch,
    multiple = false,
    fullWidth,
    label,
    mappingLabel,
    className,
 }) => {
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
                    multiple
                    fullWidth={fullWidth}
                    id="tags-outlined"
                    options={options}
                    className={cx(classes.main, className)}
                    onChange={handleChange}
                    getOptionLabel={getOptionLabel}
                    defaultValue={defaultValue}
                    value={defaultValue}
                    filterSelectedOptions
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label={label}
                            placeholder={placeholder}
                            onChange={handleSearch}
                            disabled={disabled ? disabled : ""}
                            value={defaultValue}
                            name={name}
                            onBlur={onBlur}
                        />
                    )}
                    renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                            <Chip {...getTagProps({ index })} color="primary" key={option[mappingLabel] || ""} label={option[mappingLabel] || ""} size="small" style={{ background: "#d6d7ff" }} variant="outlined" />
                        ))
                    }
                    sx={{

                        borderRadius: 1,
                        width: width,
                        backgroundColor: "white",
                    }}
                    clearOnSelect={clearOnSelect}
                />
            </Box>
        </>
    )
}

export default AutoCompleteMultiSelect
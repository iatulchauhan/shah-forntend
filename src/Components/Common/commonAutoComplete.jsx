import React from "react";
import { InputLabel, Typography, Box, FormControl, Autocomplete, TextField, useTheme, } from "@mui/material";
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
                height: "30px",
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
    };
});

const AutoCompleteDropDown = ({ text, width, options, valid, onChange, value, defaultChecked, fontWeight, labelSize, getOptionLabel, className, size, getOptionSelected, placeholder,defaultValue }) => {
    const { classes, cx } = useStyles();
    const theme = useTheme()
    return (
        <>
            {text && (
                <Box
                    mt={1.5}
                    display="flex"
                    fontSize="12px"
                    flexDirection={"row"}
                >
                    <InputLabel
                        sx={{
                            fontWeight: fontWeight,
                            fontSize: labelSize || "15px",
                            marginRight: "2px",
                            color: theme.palette.bgDarkPrimary.main,
                            padding: "3px",
                        }}
                    >
                        {text}
                    </InputLabel>
                    {valid && (
                        <Typography
                            style={{ color: theme.palette.defaultBgRejectColor.main, }}
                            component={"caption"}
                            variant={"body2"}
                        >
                            *
                        </Typography>
                    )}
                </Box>
            )}
            <FormControl sx={{ width: width, height: '50px' }}>
                <Autocomplete
                    size={size || "small"}
                    options={options}
                    className={cx(classes.select, className)}
                    value={value}
                    onChange={onChange}
                    // inputValue={value}
                    onInputChange={onChange}
                    defaultValue={defaultValue}
                    defaultChecked={defaultChecked}
                    renderInput={(params) => <TextField {...params} placeholder={placeholder} label="" variant="outlined" />}
                    getOptionLabel={getOptionLabel}
                    getOptionSelected={getOptionSelected}
                />
            </FormControl>
        </>
    );
};

export default AutoCompleteDropDown;
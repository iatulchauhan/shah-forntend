import React, { Children } from "react";
import {
    InputLabel,
    Typography,
    Box,
    FormControl,
    Select,
    MenuItem,
} from "@mui/material";
import { makeStyles } from "tss-react/mui";
import { lightTheme } from "../../theme";

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
        redborder: {
            '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'red'
            }
        }
    };
});
const SelectDropDown = ({
    text,
    height,
    width,
    values,
    menu,
    valid,
    onChange,
    name,
    value,
    defaultValue,
    defaultChecked,
    disabled,
    fontWeight,
    labelSize,
    rejection,
    className,
    size,
    backgroundColor,
    color,
    sx,
}) => {
    const { classes, cx } = useStyles();
    return (
        <>
            {text && (
                <Box
                    mt={1.5}
                    display="flex"
                    fontSize="12px"
                    flexDirection={"row"}
                >
                    <InputLabel sx={{ fontWeight: fontWeight, fontSize: labelSize || "15px", marginRight: "2px", color: lightTheme.palette.bgDarkPrimary.main, padding: '3px', }}>
                        {text}
                    </InputLabel>
                    {valid && (
                        <Typography style={{ color: lightTheme.palette.defaultBgRejectColor.main }} component={"caption"} variant={"body2"}>
                            *
                        </Typography>
                    )}
                </Box>
            )}
            <FormControl sx={{ width: width, height: height }}>
                <Select
                    size={size || "small"}
                    className={cx(classes.select, className)}
                    value={value || ""}
                    onChange={onChange}
                    name={name}
                    defaultValue={defaultValue || ""}
                    defaultChecked={defaultChecked}
                    disabled={disabled}
                    displayEmpty
                    sx={sx}
                    renderValue={(selected) => {
                        if (selected === "") {
                            return <span style={{ color: color || "#00000070" }}>Select</span>;
                        }
                        return (
                            <span style={{ color: color || "#00000070" }}>
                                {selected}
                            </span>
                        );
                        // return selected;
                    }}
                    // inputProps={{ 'aria-label': 'Without label' }}
                    style={{
                        backgroundColor: backgroundColor || "transparent",
                        color: color || 'white',
                        width: width || '120px',
                        borderRadius: "10px",
                        height: size === 'medium' ? '52px' : size === 'small' ? '39px' : 'auto',
                    }}
                    inputProps={{
                        classes: {
                            icon: classes.icon,
                            root: classes.root,
                        },
                    }}
                >
                    {values &&
                        values?.map((val, index) => {
                            return (
                                <MenuItem value={val} key={index.toString()}>
                                    {val}
                                </MenuItem>
                            );
                        })}
                </Select>
            </FormControl >
        </>
    );
};
export default SelectDropDown;

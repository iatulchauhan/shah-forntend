import {
  InputLabel,
  Typography,
  Box,
  InputAdornment,
  IconButton,
  TextField,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { makeStyles } from "tss-react/mui";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import emojiRegex from "emoji-regex";
import { lightTheme } from "../../../theme";

const useStyles = makeStyles()((theme) => {
  return {
    main: {
      background: theme?.palette?.bgWhite?.main,
      borderRadius: '12px',
      height: "47px",
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
const CommonTextField = ({
  text,
  type,
  placeholder,
  height,
  width,
  valid,
  multiline,
  rows,
  name,
  value,
  onChange,
  onInput,
  inputProps,
  defaultValue,
  fontWeight,
  showPasswordToggle,
  className,
  bgcolor,
  onKeyDown,
  onPaste,
  onBlur,
  disabled,
  onDrag,
  border,
  background
}) => {
  const { classes } = useStyles();
  const theme = useTheme()
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event
  ) => {
    event.preventDefault();
  };
  const regex = emojiRegex();
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
      <TextField
        fullWidth
        name={name}
        value={value}
        onChange={onChange}
        type={
          type == "password"
            ? showPassword && showPasswordToggle
              ? "text"
              : type
            : type
        }
        placeholder={placeholder}
        sx={{ height: height || 52, width: width, bgcolor: bgcolor, borderRadius: "5px", border: border, background: background || "tranparent" }}
        multiline={multiline}
        rows={rows}
        className={`${classes?.main} ${className}`}
        onInput={onInput}
        onPaste={onPaste}
        inputProps={inputProps}
        onKeyDown={onKeyDown}
        defaultValue={defaultValue}
        onDrag={onDrag}
        // InputLabelProps={{
        //   shrink: shrink,
        // }}
        InputProps={{
          ...(showPasswordToggle && {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                  style={{ color: showPassword ? lightTheme.palette.primary.main : lightTheme.palette.primary.main }}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          })
        }}
        onBlur={onBlur}
        disabled={disabled ? disabled : false}
      />
    </>
  );
};

export default CommonTextField;



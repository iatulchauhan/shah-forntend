import {
  InputLabel,
  OutlinedInput,
  Typography,
  Box,
  InputAdornment,
  IconButton,
  TextField,
} from "@mui/material";
import React from "react";
import { makeStyles } from "tss-react/mui";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import emojiRegex from "emoji-regex";

const useStyles = makeStyles()((theme) => {
  return {
    main: {
      background: theme?.palette?.bgWhite?.main,
      minWidth: "50px",
      ".MuiInputBase-input":{
        height:"20px"
      },
      "&:hover": {
        borderColor: `${theme?.palette?.primary?.main} !important`,
      },
      ".MuiInputBase-formControl:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: `${theme?.palette?.primary?.main} !important`,
      },
      ".MuiOutlinedInput-notchedOutline": {
        borderColor: "#EDF2F6",
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
  labelSize,
  labelColor,
  showPasswordToggle,
  maxValue,
  error,
  className,
  format,
  bgcolor,
  onKeyDown,
  onPaste,
  onBlur,
  disabled,
  onKeyDownCapture,
  shrink,
  onDrag
}) => {
  const { classes } = useStyles();
  const [showPassword, setShowPassword] = React.useState(false);
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
          mb={1}
          display="flex"
          fontSize="12px"
          flexDirection={"row"}
        // gap={0.5}
        >
          <InputLabel
            sx={{
              marginRight: "2px",
              fontWeight: fontWeight,
              fontSize: "14px",
              color: labelColor,
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
        name={name}
        value={value}
        onChange={(e) => {
          const value = e.target.value;
          const strippedValue = value.replace(regex, '');
          const modifiedEvent = {
            ...e,
            target: {
              ...e.target,
              name: name,
              value: strippedValue,
            },
          };
          onChange(modifiedEvent)
        }}
        type={
          type == "password"
            ? showPassword && showPasswordToggle
              ? "text"
              : type
            : type
        }
        placeholder={placeholder}
        sx={{ height: height || 52, width: width, bgcolor: bgcolor,borderRadius:"5px" }}
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



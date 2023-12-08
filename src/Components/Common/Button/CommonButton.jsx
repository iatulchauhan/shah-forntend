import React from "react";
import { Button, CircularProgress, Typography } from "@mui/material";
import { useTheme } from "@mui/material";

const CommonButton = ({
    text,
    height,
    width,
    endIcon,
    startIcon,
    onClick,
    color,
    disabled,
    type,
    loading,
    href,
    variant,
    fullWidth,
    fontSize,
    padding,

}) => {
    const theme = useTheme();
    return (
        <Button
            fullWidth={fullWidth || false}
            type={type}
            variant={variant || "contained"}
            color={`${color === "error" ? "error" : "primary"}`}
            sx={{ width: width, height: height, fontSize: fontSize, whiteSpace: "nowrap", padding: padding }}
            disableElevation
            startIcon={startIcon}
            endIcon={endIcon}
            onClick={onClick}
            disabled={disabled}
            href={href}
        // loading={loading}
        >
            {text}
        </Button>
    );
};

export default CommonButton;

import React, { useEffect, useState } from "react";
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
    background,
    borderRadius,
    border,
    className

}) => {
    const theme = useTheme();
    return (
        <Button
            fullWidth={fullWidth || false}
            type={type}
            variant={variant || "contained"}
            color={`${color === "error" ? "error" : "primary"}`}
            style={{ width: width, height: height, fontSize: fontSize || "14px", whiteSpace: "nowrap", padding: padding, background: background, borderRadius: borderRadius, color: color, border: border }}
            disableElevation
            startIcon={startIcon}
            endIcon={endIcon}
            onClick={onClick}
            disabled={disabled}
            href={href}
            className={className}

        // loading={loading}
        >
            {text}
        </Button>
    );
};

export default CommonButton;

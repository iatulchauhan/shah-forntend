import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
export default function TextLabel({
    title,
    variant,
    style,
    noWrap = false,
    color = "#000",
    fontSize,
    fontWeight,
    fontColor,
    secondText,
    secondTextColor,
    marginBottom,
    marginTop,
    textAlign,
    className,
    textTransform,
    textOverflow,
    whiteSpace,
    overflow,
    lineHeight
}) {
    const variantToFontSize = {
        h1: "40px",
        h2: "36px",
        h3: "30px",
        h4: "26px",
        h5: "24px",
        h6: "20px",
        subtitle1: "18px",
        subtitle2: "16px",
        body1: "14px",
        body2: "12px",
    };
    const [responsiveFontSize, setResponsiveFontSize] = useState(
        fontSize || variantToFontSize[variant]
    );
    useEffect(() => {
        const updateFontSizes = () => {
            const newVariantToFontSize = { ...variantToFontSize };
            if (window.innerWidth <= 600) {
                newVariantToFontSize.h1 = "28px";
                newVariantToFontSize.h2 = "25px";
                newVariantToFontSize.h3 = "24px";
                newVariantToFontSize.h4 = "22px";
                newVariantToFontSize.h5 = "20px";
                newVariantToFontSize.h6 = "18px";
                newVariantToFontSize.subtitle1 = "16px";
                newVariantToFontSize.subtitle2 = "14px";
                newVariantToFontSize.body1 = "12px";
                newVariantToFontSize.body2 = "12px";
            }
            setResponsiveFontSize(fontSize || newVariantToFontSize[variant]);
        };
        window.addEventListener("resize", updateFontSizes);
        updateFontSizes();
        return () => {
            window.removeEventListener("resize", updateFontSizes);
        };
    }, [fontSize, variant]);
    return (
        <Box fontWeight={fontWeight || "fontWeightBold"}>
            <Typography
                noWrap={noWrap}
                className={className}
                variant={variant || "subtitle2"}
                style={{
                    fontWeight: fontWeight || 400,
                    fontSize: responsiveFontSize || "16px",
                    color: fontColor || color,
                    fontFamily: "Poppins",
                    marginTop: marginTop || "0px",
                    marginBottom: marginBottom,
                    textAlign: textAlign || "left",
                    textTransform: textTransform,
                    textOverflow: textOverflow,
                    whiteSpace: whiteSpace,
                    overflow: overflow,
                    lineHeight:1.4,
                    ...style,
                }}
                color={color}
            >
                {title}
                {secondText ? (
                    <span style={{ color: secondTextColor ? secondTextColor : "#333" }}>
                        {secondText}
                    </span>
                ) : null}
            </Typography>
        </Box>
    );
}
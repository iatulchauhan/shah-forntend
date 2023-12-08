import { Box, Typography } from "@mui/material";
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
    if (window.innerWidth <= 600) {
        variantToFontSize.h1 = "28px";
        variantToFontSize.h2 = "25px";
        variantToFontSize.h3 = "24px";
        variantToFontSize.h4 = "22px";
        variantToFontSize.h5 = "20px";
        variantToFontSize.h6 = "18px";
        variantToFontSize.subtitle1 = "16px";
        variantToFontSize.subtitle2 = "14px";
        variantToFontSize.body1 = "13px";
        variantToFontSize.body2 = "12px";
    }
    const responsiveFontSize = fontSize || variantToFontSize[variant];
    return (
        <Box fontWeight={fontWeight || "fontWeightBold"}>
            <Typography
                noWrap={noWrap}
                variant={variant || "subtitle2"}
                style={{
                    fontWeight: fontWeight || 400,
                    fontSize: responsiveFontSize || "16px",
                    color: fontColor || color,
                    fontFamily: "Poppins",
                    marginTop: marginTop || "0px",
                    marginBottom: marginBottom,
                    textAlign: textAlign || "left",
                    ...style,
                }}
                color={color}
            >
                {title}{" "}
                {secondText ? (
                    <span style={{ color: secondTextColor ? secondTextColor : "#333" }}>
                        {secondText}
                    </span>
                ) : null}
            </Typography>
        </Box>
    );
}
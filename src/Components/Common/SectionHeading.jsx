import { Box, Typography } from "@mui/material";
export default function SectionHeading({
    title,
    variant,
    style,
    fontWeight,
    noWrap = true,
    color = "inherit"
}) {
    return (
        <Box fontWeight="fontWeightBold">
            <Typography
                noWrap={noWrap}
                variant={variant || "subtitle1"}
                style={{ ...style }}
                color={color}
                fontWeight={fontWeight ? fontWeight : "inherit"}
            >
                {title}
            </Typography>
        </Box>
    );
}
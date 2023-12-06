import { Box, Typography } from "@mui/material";
export default function SectionHeading({
    title,
    variant,
    style,
    noWrap = true,
    color = "inherit"
}) {
    return (
        <Box fontWeight="fontWeightBold">
            <Typography
                noWrap={noWrap}
                variant={variant || "subtitle1"}
                style={{ fontWeight: "inherit", ...style }}
                color={color}
            >
                {title}
            </Typography>
        </Box>
    );
}
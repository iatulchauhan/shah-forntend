import { Box, Grid } from "@mui/material";
import React from "react";
import Assets from "./ImageContainer";
import TextLabel from "./Fields/TextLabel";

const DashboardSummaryBox = ({ backgroundColor, avtar, count, title, iconColor }) => {
  return (
    <Grid item xs={12} sm={6} md={3} lg={2.4}>
      <Box
        display={"flex"}
        flexDirection={"column"}
        gap={2}
        backgroundColor={backgroundColor}
        borderRadius={4}
        padding={2}
      >
        <Box
          width={"56px"}
          height={"56px"}
          backgroundColor={iconColor}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          borderRadius={"50%"}
        >
          <Assets
            src={avtar}
            absolutePath={true}
            height={"32px"}
            width={"32px"}
          />
        </Box>
        <TextLabel variant={"h5"} fontWeight={600} title={count} />
        <TextLabel variant={"subtitle2"} fontWeight={500} title={title} />
      </Box>
    </Grid>
  );
};

export default DashboardSummaryBox;

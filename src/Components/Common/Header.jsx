import { Avatar, Box, Grid, Hidden } from '@mui/material'
import React from 'react'
import TextLabel from './Fields/TextLabel'
import CommonSearch from './CommonSearch'
import Assets from './ImageContainer'

const Header = () => {
  return (
    <Grid container sx={{ backgroundColor: "white", padding: 3, display: "flex", justifyContent: "space-between" }}>
      <TextLabel title="Dashboard" variant={"h2"} fontWeight={"600"} />
      <Box display={"flex"} gap={2}>
        <Hidden lgDown>
        <CommonSearch />
        </Hidden>
        <Box sx={{ backgroundColor: "#FFFAF1", display: "flex", justifyContent: "center", alignItems: "center", width: "50px", height: "50px", borderRadius: "16px" }}>
          <Assets src={"/assets/icons/notification.svg"} absolutePath={true} />
        </Box>
        <Box display={"flex"} gap={1}>
          <Avatar />
          <Box>
            <Box display={"flex"} gap={2}>
              <TextLabel title={"John Doe"} fontWeight={"500"} variant={"subtitle2"} />
              <Assets src={"/assets/icons/downArrow.svg"} absolutePath={true} />
            </Box>
            <TextLabel title={"Admin"} fontWeight={"400"} variant={"body1"} color={"#737791"} />
          </Box>
        </Box>
      </Box>

    </Grid>
  )
}

export default Header

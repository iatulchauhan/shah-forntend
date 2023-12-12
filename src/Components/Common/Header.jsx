import { Avatar, Box, Grid, Hidden } from '@mui/material'
import React from 'react'
import TextLabel from './Fields/TextLabel'
import CommonSearch from './CommonSearch'
import Assets from './ImageContainer'
import CommonButton from './Button/CommonButton'


import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuIcon from '@mui/icons-material/Menu';
import Logout from '@mui/icons-material/Logout';

const Header = ({ onClick }) => {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Grid container sx={{ backgroundColor: "white", padding: 1.5, display: "flex", justifyContent: "space-between" }}>
      <Box display={"flex"} gap={2}>
        <MenuIcon sx={{ color: "black", alignSelf: "center", width: '36px', height: "36px", cursor: "pointer" }} onClick={onClick} />
        <TextLabel title="Dashboard" variant={"h2"} fontWeight={"600"} />
      </Box>
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"} gap={2}>
        <Hidden mdDown>
          <CommonSearch width={"500px"} />
        </Hidden>
        <Box sx={{ backgroundColor: "#FFFAF1", display: "flex", justifyContent: "center", alignItems: "center", width: "45px", height: "45px", borderRadius: "16px" }}>
          <Assets src={"/assets/icons/notification.svg"} absolutePath={true} />
        </Box>
        <Box display={"flex"} gap={1} onClick={handleClick}>
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
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Grid>
  )
}

export default Header

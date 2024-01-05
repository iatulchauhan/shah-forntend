import { Avatar, Box, Divider, Grid, Hidden, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import TextLabel from "./Fields/TextLabel";
import CommonSearch from "./CommonSearch";
import Assets from "./ImageContainer";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import MenuIcon from "@mui/icons-material/Menu";
import { lightTheme } from "../../theme";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import Swal from "sweetalert2";
import { useAppContext } from "../../Context/context";
import { useLocation, useNavigate } from "react-router-dom";
import { userType } from "../../Utils/enum";
import { makeStyles } from "tss-react/mui";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import axios from "../../APiSetUp/axios";

const useStyles = makeStyles()((theme) => {
  return {
    profileImage: {
      height: "40px",
      width: "40px",
      objectFit: "cover",
      borderRadius: "8px",
    },
  };
});

const StyledMenu = styled(Menu)(({ theme }) => ({
  "& .MuiPaper-root": {
    boxShadow: "0px",
  },
  "& .MuiMenu-list": {
    paddingBottom: "0px !important",
    paddingTop: "0px !important",
  },
}));
const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  padding: "10px",
  "&:hover": {},
}));

const Header = ({ onClick }) => {
  const { OnUpdateError, toggleLoader, user, onUpdateUser, menuList } =
    useAppContext();
  const [data, setData] = useState({});
  const { classes } = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const { logout } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();


  const activePage = menuList?.filter((e) => e?.path === location?.pathname)[0]?.page 

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorEl(null);
  };
  
  const logoutAdmin = () => {
    handleProfileClose();
    Swal.fire({
      title: "<strong>Warning</strong>",
      icon: "warning",
      html: "Are you sure you want to logout?",
      showCancelButton: true,
      confirmButtonColor: "#0492c2",
      iconColor: "#0492c2",
      confirmButtonText: "Yes",
      cancelButtonColor: "#1A1B2F",
    }).then(async (result) => {
      if (result.isConfirmed) {
        logout();
        navigate("/login");
      }
    });
  };

  return (
    <Grid
      container
      sx={{
        backgroundColor: "white",
        padding: 1.5,
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Box display={"flex"} alignItems={"center"} gap={{ md: 2, xs: 1 }}>
        <MenuIcon
          sx={{
            color: "black",
            alignSelf: "center",
            width: { xs: "25px", sm: "30px" },
            height: { xs: "25px", sm: "30px" },
            cursor: "pointer",
          }}
          onClick={onClick}
        />
        <TextLabel
          title={activePage}
          variant={"h4"}
          fontWeight={"600"}
          textTransform={"capitalize"}
        />
      </Box>
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={2}
      >
        <Hidden mdDown>
          <CommonSearch width={"500px"} />
          <Box
            sx={{
              backgroundColor: "#FFFAF1",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "45px",
              height: "45px",
              borderRadius: "8px",
            }}
          >
            <Assets
              src={"/assets/icons/notification.svg"}
              absolutePath={true}
            />
          </Box>
        </Hidden>
        <Box
          display={"flex"}
          alignItems={"center"}
          gap={1}
          onClick={handleProfileClick}
          sx={{ cursor: "pointer" }}
        >
          {user?.avtar ? (
            <Assets
              src={`https://shiv-gas-agency.s3.ap-south-1.amazonaws.com/${user?.avtar}`}
              className={classes.profileImage}
              absolutePath={true}
            />
          ) : (
            <AccountBoxIcon style={{ color: "#cacaca", fontSize: "50px" }} />
          )}
          <Hidden smDown>
            <Box>
              <Box display={"flex"} gap={{ md: 2, xs: 1 }}>
                <TextLabel
                  title={user?.name}
                  fontWeight={"500"}
                  variant={"subtitle2"}
                />

                <Assets
                  src={"/assets/icons/downArrow.svg"}
                  absolutePath={true}
                />
              </Box>
              <TextLabel
                title={
                  userType.filter((e) => e?.id === user?.userType)[0]?.label
                }
                fontWeight={"400"}
                variant={"body1"}
                color={lightTheme.palette.bgLightExtraLightGray.main}
              />
            </Box>
          </Hidden>
        </Box>
      </Box>
      <StyledMenu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleProfileClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "center", vertical: "top" }}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
      >
        <Box>
          <StyledMenuItem>
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              minWidth={"150px"}
              padding={"10px"}
              gap={"10px"}
              backgroundColor={"#f3f3f3"}
              borderRadius={"10px"}
            >
              {user?.avtar ? (
                <Assets
                  src={`https://shiv-gas-agency.s3.ap-south-1.amazonaws.com/${user?.avtar}`}
                  className={classes.profileImage}
                  absolutePath={true}
                />
              ) : (
                <AccountBoxIcon
                  style={{ color: "#cacaca", fontSize: "50px" }}
                />
              )}
              <Box>
                <TextLabel
                  title={user?.name}
                  fontWeight={"500"}
                  variant={"subtitle2"}
                />
                <TextLabel
                  title={
                    userType.filter((e) => e?.id === user?.userType)[0]?.label
                  }
                  fontWeight={"500"}
                  variant={"body2"}
                />
              </Box>
            </Box>
          </StyledMenuItem>
          <StyledMenuItem
            sx={{ paddingLeft: "15px" }}
            onClick={() => {
              handleProfileClose();
              navigate("/profile");
            }}
          >
            <ListItemIcon>
              <PersonOutlineOutlinedIcon />
            </ListItemIcon>
            <TextLabel
              title={"Profile"}
              fontWeight={"500"}
              variant={"subtitle2"}
            />
          </StyledMenuItem>
        </Box>
        <Divider />
        <StyledMenuItem onClick={() => logoutAdmin()}>
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            width={"-webkit-fill-available"}
          >
            <ListItemIcon>
              <LogoutOutlinedIcon
                style={{
                  color: lightTheme.palette.primary.main,
                  fontSize: "20px",
                }}
              />
            </ListItemIcon>
            <TextLabel
              title={"Logout"}
              fontWeight={"600"}
              variant={"subtitle2"}
              color={lightTheme.palette.primary.main}
            />
          </Box>
        </StyledMenuItem>
      </StyledMenu>
    </Grid>
  );
};

export default Header;

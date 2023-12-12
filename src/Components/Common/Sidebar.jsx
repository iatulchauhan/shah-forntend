import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
// import logo from "../Assets/images/logo.png";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
// import sort from "../Assets/images/sort.png";
import Header from "./Header";
// import FeatherIcon from "feather-icons-react";
import { Link, useLocation } from "react-router-dom";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Collapse } from "@mui/material";
import Footer from "./Footer";
import { useAppContext } from "../../Context/context";
import Swal from "sweetalert2";
import axios from "../../APiSetUp/axios";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import Assets from "./ImageContainer";
import { makeStyles } from "tss-react/mui";


const drawerWidth = 275;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  boxShadow: "0 4px 14px 0 rgb(0 0 0 / 10%)",
  zIndex: 9999,
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `70px`,
  [theme.breakpoints.up("md")]: {
    width: `70px`,
  },
  [theme.breakpoints.down("md")]: {
    width: `0px`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  // whiteSpace: 'nowrap',
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));


const useStyles = makeStyles()((theme) => {
  return {

  };
});

export default function SideBar(props) {
  const classes = useStyles()
  const width = window.innerWidth;
  const location = useLocation();
  const [open2, setOpen2] = useState(true);
  const [open, setOpen] = useState(width > 991 ? true : false);
  const { user, logout, toggleSideBar } = useAppContext();
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        width < 991 &&
        !sidebarRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDrawerOpen = () => {
    setOpen(!open);
    toggleSideBar();
    setOpen2(false);
  };
  console.log("location.pathname", location.pathname === "/");
  const data = [
    {
      title: "Dashboard",
      icon: (
        // <FeatherIcon
        //   icon="home"
        //   style={{
        //     color: location.pathname === "/dashboard" ? "#FFFFFF" : "#424448",
        //   }}
        // />
        <Assets src="/assets/icons/dashboard.svg" absolutePath={true}
        // style={{
        //   color: location.pathname === "/" ? "red" : "red",
        //   background: "red"
        // }}
        />
      ),
      link: "/",
      activeLinks: [""],
    },
    {
      title: "Create User",
      icon: <Assets src="/assets/icons/profile.svg" absolutePath={true} />,
      link: "/user",
      activeLinks: ["user"],
    },
    {
      title: "Create Branches",
      icon: <Assets src="/assets/icons/branches.svg" absolutePath={true} />,
      link: "/branches",
      activeLinks: ["branches"],
    },
    {
      title: "Visitor List",
      icon: <Assets src="/assets/icons/profile.svg" absolutePath={true} />,
      link: "/visitor",
      activeLinks: ["visitor"],
    },
    {
      title: "Email",
      icon: <Assets src="/assets/icons/sms.svg" absolutePath={true} />,
      link: "/email",
      activeLinks: ["email"],
    },
    {
      title: "Offer",
      icon: <Assets src="/assets/icons/discount-shape.svg" absolutePath={true} />,
      link: "/offer",
      activeLinks: ["offer"],
    },
    {
      title: "Financial Data",
      icon: <Assets src="/assets/icons/dollar-square.svg" absolutePath={true} />,
      link: "/financial-data",
      activeLinks: ["financial-data"],
    },
    {
      title: "Meeting List",
      icon: <Assets src="/assets/icons/calendar-edit.svg" absolutePath={true} />,
      link: "/meeting",
      activeLinks: ["meeting"],
    },
    {
      title: "Expiring Plan List",
      icon: <Assets src="/assets/icons/info-circle.svg" absolutePath={true} />,
      link: "/expiring-plan",
      activeLinks: ["expiring-plan"],
    },
    {
      title: "Payment",
      icon: <Assets src="/assets/icons/dollar-square.svg" absolutePath={true} />,
      link: "/payment",
      activeLinks: ["payment"],
    },
  ];

  const handleClick = () => {
    setOpen2(!open2);
  };

  const logoutAdmin = () => {
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
        axios.post("/logout").then((res) => {
          if (res?.data?.result?.message === "Success!") {
            logout();
          }
        });
      }
    });
  };
  return (
    <>
      {location?.pathname === "/login" || location?.pathname === "/register" ? <>{props.children}</> : <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Header
            open={open}
            sx={{
              marginLeft: 0.8,
            }}
            onClick={handleDrawerOpen}
          />
        </AppBar>
        <Drawer
          className="drawer_main"
          variant="permanent"
          open={open}
          onClose={handleDrawerOpen}
          ref={sidebarRef}
        >
          <DrawerHeader
            sx={{
              position: "fixed",
              top: 0,
              background: "#fff",
              zIndex: 999999,
              width: "275px",
            }}
          >
            <IconButton
              onClick={handleDrawerOpen}
              sx={{
                width: "100%",
                justifyContent: open ? "space-between" : "center",
              }}
            >
              {open ? (
                <>
                  <button onClick={handleDrawerOpen}>Logo</button>
                </>
              ) : (
                <button onClick={handleDrawerOpen}>Logo</button>

              )}
            </IconButton>
          </DrawerHeader>
          <List sx={{ marginTop: { xs: 8, md: open ? 9.5 : 8 } }}>
            {data.map((item, index) => (
              <Link
                to={item.link}
                className={
                  item?.activeLinks?.includes(location.pathname.split("/")?.[1])
                    ? "active"
                    : "nav-link width-100"
                }
                onClick={width > 991 ? () => { } : () => handleDrawerOpen()}
              >
                <ListItem
                  key={index}
                  disablePadding
                  sx={{
                    display: "block",
                    marginBottom: 0.5,
                    background: "#5D5FEF",

                  }}
                >
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                      marginBottom: 0.5,
                      backgroundColor: item?.activeLinks?.includes(
                        location.pathname.split("/")?.[1]
                      )
                        ? "#5D5FEF"
                        : "#FFFFFF",
                      "&:hover .MuiListItemText-root .MuiTypography-root": {
                        color: "#FFFFFF"
                      }

                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        color: "#424448",
                        mr: open ? 1 : "auto",
                        justifyContent: "center",

                      }}
                    >
                      {item?.icon}
                    </ListItemIcon>
                    <ListItemText
                      style={{ whiteSpace: "nowrap", }}
                      primary={item?.title}
                      sx={{
                        color: item?.activeLinks?.includes(
                          location.pathname.split("/")?.[1]
                        )
                          ? "#FFFFFF"
                          : "#737791",
                        opacity: open ? 1 : 0,
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
            <Link
              onClick={() => logoutAdmin()}
              className={
                location.pathname === "/logout" ? "active" : "nav-link width-100"
              }
            >
              <ListItem
                disablePadding
                sx={{
                  display: "block",
                  marginBottom: 0.5,
                  background: "#f1f1f1",
                }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    background: "white",
                    marginBottom: 0.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      color: "#424448",
                      mr: open ? 1 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {/* <FeatherIcon icon="lock" /> */}
                  </ListItemIcon>
                  <ListItemText
                    style={{ whiteSpace: "nowrap" }}
                    primary={"Logout"}
                    sx={{
                      opacity: open ? 1 : 0,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            </Link>
          </List>
        </Drawer>
      </Box>}
    </>
  );
}

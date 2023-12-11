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

export default function SideBar(props) {
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

  const data = [
    {
      title: "Dashboard",
    //   icon: (
    //     <FeatherIcon
    //       icon="home"
    //       style={{
    //         color: location.pathname === "/dashboard" ? "#FFFFFF" : "#424448",
    //       }}
    //     />
    //   ),
      link: "/dashboard",
      activeLinks: ["dashboard"],
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
    <Box sx={{ display: "flex" }}>
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
                <button onClick={handleDrawerOpen}>123</button>
              </>
            ) : (
                <button onClick={handleDrawerOpen}>123</button>
              
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
              onClick={width > 991 ? () => {} : () => handleDrawerOpen()}
            >
              <ListItem
                key={index}
                disablePadding
                sx={{
                  display: "block",
                  marginBottom: 0.5,
                  background: "#f1f1f1",
                }}
              >
                {item?.subData && item?.subData?.length !== 0 ? (
                  <>
                    <ListItemButton
                      style={{ background: "white" }}
                      onClick={handleClick}
                      className={
                        item?.activeLinks?.includes(
                          location.pathname.split("/")?.[1]
                        )
                          ? "active_tab"
                          : ""
                      }
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 1 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        {item?.icon}
                      </ListItemIcon>
                      <ListItemText
                        style={{ whiteSpace: "nowrap" }}
                        primary={item?.title}
                        sx={{ opacity: open ? 1 : 0 }}
                      />
                      {open2 ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={open2} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        {item?.subData?.map((e) => {
                          return (
                            <Link
                              to={e.link}
                              className={
                                location.pathname === e.link
                                  ? "active"
                                  : "nav-link"
                              }
                              onClick={
                                width > 991
                                  ? () => {}
                                  : () => handleDrawerOpen()
                              }
                            >
                              <ListItemButton
                                sx={{
                                  pl: 4,
                                  background: "white",
                                  marginLeft: 2,
                                }}
                                className={
                                  location.pathname === e.link
                                    ? "active_tab"
                                    : ""
                                }
                              >
                                <ListItemText
                                  style={{ whiteSpace: "nowrap" }}
                                  primary={e?.title}
                                  sx={{
                                    color:
                                      location.pathname === e.link
                                        ? "#FFFFFF"
                                        : "#424448",
                                    opacity: open2 ? 1 : 0,
                                  }}
                                />
                              </ListItemButton>
                            </Link>
                          );
                        })}
                      </List>
                    </Collapse>
                  </>
                ) : (
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                      background: "white",
                      marginBottom: 0.5,
                    }}
                    className={
                      item?.activeLinks?.includes(
                        location.pathname.split("/")?.[1]
                      )
                        ? "active_tab"
                        : ""
                    }
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
                      style={{ whiteSpace: "nowrap" }}
                      primary={item?.title}
                      sx={{
                        color: item?.activeLinks?.includes(
                          location.pathname.split("/")?.[1]
                        )
                          ? "#FFFFFF"
                          : "#424448",
                        opacity: open ? 1 : 0,
                      }}
                    />
                  </ListItemButton>
                )}
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
      <div className="main-content">
        <div style={{ paddingLeft: "25px" }} className="div">
          {props.children}
        </div>
        <Footer open={open} />
      </div>
    </Box>
  );
}

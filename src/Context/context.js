import { createContext, useContext, useState } from "react";
import { getLSItem, removeLSItem, setLSItem } from "../APiSetUp/LocalStorage";
import axios from "../APiSetUp/axios";
import Assets from "../Components/Common/ImageContainer";

const menuIconList = [
  {
    title: "Dashboard",
    icon: (<Assets src="/assets/icons/dashboard.svg" absolutePath={true} />),

  },
  {
    title: "Create User",
    icon: <Assets src="/assets/icons/profile.svg" absolutePath={true} />,
  },
  {
    title: "User List",
    icon: <Assets src="/assets/icons/profile.svg" absolutePath={true} />,
  },
  {
    title: "Create Branch",
    icon: <Assets src="/assets/icons/branches.svg" absolutePath={true} />,

  },
  {
    title: "Client List",
    icon: <Assets src="/assets/icons/client.svg" absolutePath={true} />,

  },
  {
    title: "Visitor List",
    icon: <Assets src="/assets/icons/profile.svg" absolutePath={true} />,

  },
  {
    title: "Email",
    icon: <Assets src="/assets/icons/sms.svg" absolutePath={true} />,

  },
  {
    title: "Offer",
    icon: <Assets src="/assets/icons/discount-shape.svg" absolutePath={true} />,

  },
  {
    title: "Financial Data",
    icon: <Assets src="/assets/icons/dollar-square.svg" absolutePath={true} />,

  },
  {
    title: "Meeting List",
    icon: <Assets src="/assets/icons/calendar-edit.svg" absolutePath={true} />,

  },
  {
    title: "View Meeting",
    icon: <Assets src="/assets/icons/calendar-edit.svg" absolutePath={true} />,
  },
  {
    title: "Schedule Meeting",
    icon: <Assets src="/assets/icons/calendar-edit.svg" absolutePath={true} />,

  },
  {
    title: "Assign File",
    icon: <Assets src="/assets/icons/profile.svg" absolutePath={true} />,
  },
  {
    title: "New File",
    icon: <Assets src="/assets/icons/profile.svg" absolutePath={true} />,
  },
  {
    title: "Modify Plan",
    icon: <Assets src="/assets/icons/profile-tick.svg" absolutePath={true} />,
  },
  {
    title: "Expiring Plan List",
    icon: <Assets src="/assets/icons/info-circle.svg" absolutePath={true} />,

  },
  {
    title: "Investment",
    icon: <Assets src="/assets/icons/info-circle.svg" absolutePath={true} />,
  },
  {
    title: "Reminder",
    icon: <Assets src="/assets/icons/reminder.svg" absolutePath={true} />,
  },
  {
    title: "Visitor History",
    icon: <Assets src="/assets/icons/info-circle.svg" absolutePath={true} />,

  },
  {
    title: "Payment",
    icon: <Assets src="/assets/icons/dollar-square.svg" absolutePath={true} />,
  },
];

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [auth_token, setAuth_token] = useState(getLSItem("auth_token"));
  const [sideBarOpen, setSideBarOpen] = useState(true);
  const [menuList, setMenuList] = useState(getLSItem("menuList") ? JSON.parse(getLSItem("menuList")) : []);
  console.log(menuList, "menuList")
  console.log(JSON.parse(getLSItem("menuList")), "getLSItem")
  const [user, setUser] = useState(
    getLSItem("user") ? JSON.parse(getLSItem("user")) : null
  );
  const [loader, setLoader] = useState(false);
  const [cart, setCart] = useState(
    getLSItem("cart") ? JSON.parse(getLSItem("cart")) : null
  );
  const [wishList, setWishList] = useState(
    getLSItem("wishlist") ? JSON.parse(getLSItem("wishlist")) : null
  );
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [profileImagePath, setProfileImagePath] = useState(
    getLSItem("profileImagePath")
  );

  const updateToken = (auth) => {
    // Perform update token logic here
    setLSItem("auth_token", auth);
    setAuth_token(auth);
  };

  const onUpdateUser = (userData) => {
    // Perform login logic here
    setLSItem("user", JSON.stringify(userData));
    setUser(userData);
  };
  const onUpdateUserType = (type) => {
    // Perform login logic here
    setLSItem("user_type", type);
  };

  const onUpdateProfileImagePath = (data) => {
    // Perform login logic here
    setLSItem("profileImagePath", data);
    setProfileImagePath(data);
  };

  const logout = () => {
    // Perform logout logic here
    removeLSItem("user");
    removeLSItem("auth_token");
    setUser(null);
    setAuth_token(null);
    setMenuList([])
  };
  const OnUpdateSuccess = (data) => {
    setSuccess(data);
  };
  const OnUpdateError = (data) => {
    setError(data);
  };

  const getMenuListByRole = () => {
    toggleLoader();
    axios.post(`/permissions`).then((res) => {
      if (res?.data?.data) {
        const dynamicMenuList = res.data.data.map((menuItem) => {
          const matchingIcon = menuIconList.find(e => e?.title === menuItem?.page);
          return {
            ...menuItem,
            activeLinks: menuItem.path !== "/" ? menuItem.path.substring(1).split('/').filter(Boolean) : "/",
            icon: matchingIcon?.icon || null,
          };
        });

        setLSItem("menuList", JSON.stringify(dynamicMenuList));
        setMenuList(dynamicMenuList);
      }
      toggleLoader();
    }).catch((err) => {
      toggleLoader();
      OnUpdateError(err.data.message);
    });
  }


  const toggleLoader = () => {
    setLoader((prevLoader) => !prevLoader);
  };

  const OnUpdateCart = (item) => {
    setLSItem("cart", JSON.stringify(item));
    setCart(item);
  };

  const OnUpdateWishList = (item) => {
    setLSItem("wishlist", JSON.stringify(item));
    setWishList(item);
  };

  const toggleSideBar = () => {
    setSideBarOpen(!sideBarOpen);
  };

  return (
    <AppContext.Provider
      value={{
        auth_token,
        user,
        loader,
        cart,
        wishList,
        success,
        error,
        profileImagePath,
        onUpdateProfileImagePath,
        updateToken,
        onUpdateUser,
        logout,
        OnUpdateSuccess,
        OnUpdateError,
        toggleLoader,
        OnUpdateCart,
        OnUpdateWishList,
        onUpdateUserType,
        toggleSideBar,
        getMenuListByRole,
        menuList,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

//Custom hook

const useAppContext = () => {
  const appContext = useContext(AppContext);

  if (!appContext) {
    throw new Error("useAppContext must be used within an AppProvider");
  }

  return appContext;
};

export { AppContext, AppProvider, useAppContext };

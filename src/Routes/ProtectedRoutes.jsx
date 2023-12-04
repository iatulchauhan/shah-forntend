import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppContext } from "../Context/context";

export const ProtectedRoutes = () => {
  const { user } = useAppContext();
  const location = useLocation();
  const isAuth = user ? true : false;
  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location?.pathname }} />
  );
};
export const LoginRoutes = () => {
  const { user } = useAppContext();
  const location = useLocation();
  const isAuth = user ? true : false;

  return !isAuth ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace state={{ from: location?.pathname }} />
  );
};

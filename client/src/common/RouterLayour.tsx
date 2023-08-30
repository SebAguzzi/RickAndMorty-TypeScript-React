import React from "react";
import { NavBar } from "./NavBar";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { useCookies } from "react-cookie";

export const RouterLayout: React.FC<{}> = () => {
  const [, setCookie, remove ] = useCookies();
  const { isAuth, isExpired, accessToken } = useAppSelector(
    (state) => state.authReducer
  );

  React.useEffect(() => {
    if (accessToken) {
      setCookie("accessToken", accessToken);
    }
  }, [accessToken])

  React.useEffect(() => {
    if (isExpired) {
      remove("accessToken");
    }
  }, [isExpired])

  return isAuth ? (
    <>
      <NavBar />
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );
};

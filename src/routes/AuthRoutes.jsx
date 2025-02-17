import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function AuthRoutes({ children }) {
  const isAuth =
    JSON.parse(localStorage.getItem("token")) &&
    useSelector((state) => state.auth.isAuth);
  if (!isAuth) {
    return <Navigate to={"/login"} />;
  }
  return children;
}

export default AuthRoutes;

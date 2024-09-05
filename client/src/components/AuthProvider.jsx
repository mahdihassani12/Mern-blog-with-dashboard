import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AuthProvider = () => {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    // Redirect them to the login page if not logged in
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default AuthProvider;

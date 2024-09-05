import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminProvider = () => {
  const { user } = useSelector((state) => state.auth);

  if (!user || user.role !== "admin") {
    // Redirect them to the home page if not an admin
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default AdminProvider;

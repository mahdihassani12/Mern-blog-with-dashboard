import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { setUser } from "./features/auth/authSlice";

const AdminProvider = () => {
  const { user, isLoading } = useSelector((state) => state.auth);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      // Check if user is not already available in the Redux state
      const userFromLocalStorage = localStorage.getItem("user");
      if (userFromLocalStorage) {
        try {
          const userData = JSON.parse(userFromLocalStorage);
          dispatch(setUser(userData));
        } catch (error) {
          // Handle JSON parsing error, e.g., clear local storage or show an error
          localStorage.removeItem("user");
        }
      }
    }
  }, [dispatch, user]);

  if (isLoading) {
    // Optionally, you can render a loading spinner or similar component here
    return <div>Loading...</div>;
  }

  if (!user || user.role !== "admin") {
    // Redirect them to the home page if not an admin
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default AdminProvider;

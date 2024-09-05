import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FrontendLayout from "./layouts/FrontendLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import Home from "./pages/frontend/Home";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      {/* Frontend Routes */}
      <Route path="/" element={<FrontendLayout />}>
        <Route index element={<Home />} /> {/* /frontend home page */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Dashboard Routes */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} /> {/* /dashboard home page */}
      </Route>
    </Routes>
  </BrowserRouter>
);

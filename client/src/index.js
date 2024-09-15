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
import { Provider } from "react-redux";
import store from "./app/store";
import AuthProvider from "./components/AuthProvider"; 

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>

        {/* Frontend Routes */}
        <Route path="/" element={<FrontendLayout />}>
          <Route index element={<Home />} /> {/* /frontend home page */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Protected Routes */}
        <Route element={<AuthProvider />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} /> {/* /dashboard home page */}
          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  </Provider>
);

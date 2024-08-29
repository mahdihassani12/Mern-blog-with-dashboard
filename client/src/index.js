import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Home from "./pages/frontend/Home";
import Dashboard from "./pages/dashboard/Dashboard";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App></App>}>
        <Route path="/" element={<Home />} /> {/* /frontend home page */}
        <Route path="/dashboard" element={<Dashboard />} /> {/* /dashboard home page */}
      </Route>
    </Routes>
  </BrowserRouter>
);

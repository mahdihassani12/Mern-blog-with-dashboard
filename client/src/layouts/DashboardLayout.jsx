import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/dashboard/Header";
import Footer from "../components/dashboard/Footer";
import Sidebar from "../components/dashboard/Sidebar";

const DashboardLayout = () => {
  return (
    <div className="wrapper">
      <Header />
      <Sidebar />
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            Page Header
          </div>
        </div>
        <div className="content">
          <div className="container-fluid">
            <Outlet />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardLayout;

import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/dashboard/Header";
import Footer from "../components/dashboard/Footer";
import Sidebar from "../components/dashboard/Sidebar";

const DashboardLayout = () => {
  const [pageHeader, setPageHeader] = useState("Dashboard");

  return (
    <div className="wrapper">
      <Header />
      <Sidebar />
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <h1>{pageHeader}</h1>
          </div>
        </div>
        <div className="content">
          <div className="container-fluid">
            <Outlet context={[setPageHeader]} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardLayout;

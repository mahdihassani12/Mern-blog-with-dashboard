import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/dashboard/Header";
import Footer from "../components/dashboard/Footer";
import Sidebar from "../components/dashboard/Sidebar";

const DashboardLayout = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default DashboardLayout;

import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/frontend/Header";
import Footer from "../components/frontend/Footer";

const FrontendLayout = () => {
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

export default FrontendLayout;

import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="pt-4">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;

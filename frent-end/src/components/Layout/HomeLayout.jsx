import React from "react";
import NavBar from "./NavBar";
import { Outlet } from "react-router";
import Footer from "../Layout/Footer";

const HomeLayout = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default HomeLayout;

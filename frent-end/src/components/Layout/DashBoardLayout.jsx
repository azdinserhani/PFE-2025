import React from "react";
import { Outlet } from "react-router";
import SideBar from "../SideBar/SideBar";

const DashBoardLayout = () => {
  return (
    <div className="flex">
      <SideBar />
      <Outlet />
    </div>
  );
};

export default DashBoardLayout;

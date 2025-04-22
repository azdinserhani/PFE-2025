import React from "react";
import { Outlet } from "react-router";
import SideBar from "../SideBar/SideBar";
import { useTheme } from "../../context/ThemeContext";

const DashBoardLayout = () => {
  const { currentTheme, themes } = useTheme();
  const theme = themes[currentTheme];

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: theme.background }}>
      <SideBar />
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default DashBoardLayout;

import React from "react";
import NavBar from "./NavBar";
import { Outlet } from "react-router";
import Footer from "../Layout/Footer";
import { useTheme } from "../../context/ThemeContext";

const HomeLayout = () => {
  const { currentTheme } = useTheme();
  
  return (
    <div className="min-h-screen bg-themed text-themed">
      <NavBar />
      <main className="min-h-[calc(100vh-200px)]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default HomeLayout;

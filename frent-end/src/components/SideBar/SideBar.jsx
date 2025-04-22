import React, { useState } from "react";
import { PiProjectorScreenChartLight } from "react-icons/pi";
import { GrHomeRounded } from "react-icons/gr";
import { IoIosArrowForward } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { FaTasks } from "react-icons/fa";
import { RiTeamFill } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { BiBookAlt } from "react-icons/bi";
import NavItem from "./NavItem";
import { Link } from "react-router";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { IoIosList } from "react-icons/io";
import { useTheme } from "../../context/ThemeContext";

const SideBar = () => {
  const [open, setOpen] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const { currentTheme, themes } = useTheme();
  const theme = themes[currentTheme];

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const mainNavItems = [
    {
      label: "Account settings",
      icon: FaUser,
      path: "/myProfile",
      id: "profile"
    },
    {
      label: "My Learning",
      icon: BiBookAlt,
      path: "/myLearning",
      id: "learning"
    },
    {
      label: "My Courses",
      icon: IoIosList,
      path: "/instructorCourse",
      id: "instructorCourse"
    },
    {
      label: "Analytics",
      icon: TbBrandGoogleAnalytics,
      path: "/analytics",
      id: "analytics"
    }
  ];

  const bottomNavItems = [
    {
      label: "Settings",
      icon: IoSettingsOutline,
      path: "/settings",
      id: "settings"
    },
    {
      label: "Help & information",
      icon: IoIosInformationCircleOutline,
      path: "/dashBoard/help",
      id: "help"
    },
    {
      label: "Log out",
      icon: CiLogout,
      path: "/logout",
      id: "logout"
    }
  ];

  return (
    <div
      className={`flex-col border-r h-screen relative ${
        open ? "w-60" : "w-20"
      } duration-300`}
      style={{ 
        backgroundColor: theme.cardBg,
        borderColor: theme.border
      }}
    >
      <div className="flex gap-1 items-center">
        <img src alt="" className="h-16 mt-2 ml-2 cursor-pointer" />
        <Link to={"/"}>
          <h1 className={`${!open && "hidden"} font-bold text-2xl`} style={{ color: theme.text }}>
            3almni
          </h1>
        </Link>
      </div>
      <IoIosArrowForward
        style={{ color: theme.text, backgroundColor: theme.primary }}
        onClick={() => {
          setOpen(!open);
          setMenuOpen(open);
        }}
        className={`absolute top-9 -right-3 rounded-full p-1 text-2xl cursor-pointer ${
          open && "rotate-180"
        }`}
      />
      
      {/* Main Navigation */}
      <nav className="mt-10 ml-6">
        <ul className="space-y-4" style={{ color: theme.secondary }}>
          {mainNavItems.map((item) => (
            <div 
              key={item.id}
              style={{ color: selectedItem === item.id ? theme.primary : theme.secondary }}
            >
              <Link to={item.path}>
                <NavItem
                  label={item.label}
                  icon={item.icon}
                  open={open}
                  onClick={() => handleItemClick(item.id)}
                  theme={theme}
                />
              </Link>
            </div>
          ))}
        </ul>
      </nav>

      {/* Bottom Navigation */}
      <nav className="absolute bottom-2 ml-6 flex-col">
        <ul className="space-y-3" style={{ color: theme.secondary }}>
          {bottomNavItems.map((item) => (
            <div 
              key={item.id}
              style={{ color: selectedItem === item.id ? theme.primary : theme.secondary }}
            >
              <Link to={item.path}>
                <NavItem
                  label={item.label}
                  icon={item.icon}
                  open={open}
                  onClick={() => handleItemClick(item.id)}
                  theme={theme}
                />
              </Link>
            </div>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;

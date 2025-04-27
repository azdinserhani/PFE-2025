import React, { useState } from "react";
import { PiProjectorScreenChartLight } from "react-icons/pi";
import { GrHomeRounded } from "react-icons/gr";
import { IoIosArrowForward } from "react-icons/io";
import { FaBookOpen, FaUser } from "react-icons/fa";
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
import { motion, AnimatePresence } from "framer-motion";

const SideBar = () => {
  const [open, setOpen] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
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
      id: "profile",
    },
    {
      label: "My Learning",
      icon: BiBookAlt,
      path: "/myLearning",
      id: "learning",
    },
    {
      label: "My Courses",
      icon: IoIosList,
      path: "/instructorCourse",
      id: "instructorCourse",
    },
    {
      label: "Analytics",
      icon: TbBrandGoogleAnalytics,
      path: "/analytics",
      id: "analytics",
    },
  ];

  const bottomNavItems = [
    {
      label: "Settings",
      icon: IoSettingsOutline,
      path: "/settings",
      id: "settings",
    },
    {
      label: "Help & information",
      icon: IoIosInformationCircleOutline,
      path: "/dashBoard/help",
      id: "help",
    },
    {
      label: "Log out",
      icon: CiLogout,
      path: "/logout",
      id: "logout",
    },
  ];

  const sidebarVariants = {
    open: {
      width: "240px",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.05,
      },
    },
    closed: {
      width: "80px",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    open: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    closed: {
      x: -20,
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  };

  return (
    <>
      {/* Hover-sensitive area when sidebar is closed */}
      {!open && (
        <div
          className="fixed left-0 top-0 w-20 h-screen z-10"
          onMouseEnter={() => setOpen(true)}
          style={{ backgroundColor: "transparent" }}
        />
      )}
      <motion.div
        initial={open ? "open" : "closed"}
        animate={open ? "open" : "closed"}
        variants={sidebarVariants}
        className="flex-col border-r h-screen relative duration-300"
        style={{
          backgroundColor: theme.cardBg,
          borderColor: theme.border,
        }}
        onMouseLeave={() => !isHovered && setOpen(false)}
      >
        <motion.div
          className="flex gap-1 items-center p-4"
          variants={itemVariants}
        >
          <Link to="/" className="flex items-center gap-2">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaBookOpen size={40} color={theme.primary} />
            </motion.div>
            <AnimatePresence>
              {open && (
                <motion.h1
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="font-bold text-2xl"
                  style={{ color: theme.text }}
                >
                  EdClub
                </motion.h1>
              )}
            </AnimatePresence>
          </Link>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            setOpen(!open);
            setMenuOpen(open);
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="absolute top-9 -right-3 rounded-full p-1 text-2xl cursor-pointer"
          style={{ backgroundColor: theme.primary, color: "#fff" }}
        >
          <motion.div
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <IoIosArrowForward />
          </motion.div>
        </motion.button>

        {/* Main Navigation */}
        <motion.nav className="mt-10 ml-6">
          <motion.ul className="space-y-4" style={{ color: theme.secondary }}>
            {mainNavItems.map((item, index) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                style={{
                  color:
                    selectedItem === item.id ? theme.primary : theme.secondary,
                }}
                custom={index}
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
              </motion.div>
            ))}
          </motion.ul>
        </motion.nav>

        {/* Bottom Navigation */}
        <motion.nav className="absolute bottom-2 ml-6 flex-col">
          <motion.ul className="space-y-3" style={{ color: theme.secondary }}>
            {bottomNavItems.map((item, index) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                style={{
                  color:
                    selectedItem === item.id ? theme.primary : theme.secondary,
                }}
                custom={index}
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
              </motion.div>
            ))}
          </motion.ul>
        </motion.nav>
      </motion.div>
    </>
  );
};

export default SideBar;

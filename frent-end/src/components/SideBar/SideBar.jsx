import React, { useState } from "react";
import { PiProjectorScreenChartLight } from "react-icons/pi";
import { GrHomeRounded } from "react-icons/gr";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
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
import { useTranslation } from "react-i18next";
import { MdLanguage } from "react-icons/md";

const SideBar = () => {
  const [open, setOpen] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const { currentTheme, themes } = useTheme();
  const theme = themes[currentTheme];
  const { t, i18n } = useTranslation();

  const isRTL = i18n.dir() === 'rtl';

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const mainNavItems = [
    {
      label: t("courses.sidebar.accountSettings"),
      icon: FaUser,
      path: "/myProfile",
      id: "profile",
    },
    {
      label: t("courses.sidebar.myLearning"),
      icon: BiBookAlt,
      path: "/myLearning",
      id: "learning",
    },
    {
      label: t("courses.sidebar.myCourses"),
      icon: IoIosList,
      path: "/instructorCourse",
      id: "instructorCourse",
    },
    {
      label: t("courses.sidebar.analytics"),
      icon: TbBrandGoogleAnalytics,
      path: "/analytics",
      id: "analytics",
    },
  ];

  const bottomNavItems = [
    {
      label: t("courses.sidebar.settings"),
      icon: IoSettingsOutline,
      path: "/settings",
      id: "settings",
    },
    {
      label: t("courses.sidebar.helpInfo"),
      icon: IoIosInformationCircleOutline,
      path: "/dashBoard/help",
      id: "help",
    },
    {
      label: t("courses.sidebar.logout"),
      icon: CiLogout,
      path: "/logout",
      id: "logout",
    },
  ];

  const sidebarVariants = {
    open: {
      width: "240px",
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.05,
      },
    },
    closed: {
      width: "40px",
      opacity: 1,
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
      x: isRTL ? 20 : -20,
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  };

  return (
    <motion.div
      initial={open ? "open" : "closed"}
      animate={open ? "open" : "closed"}
      variants={sidebarVariants}
      className="flex-col border-r h-screen relative"
      style={{
        backgroundColor: theme.cardBg,
        borderColor: theme.border,
      }}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className={`fixed z-50 ${
          isRTL
            ? open
              ? "right-[237px]"
              : "right-[37px]"
            : open
            ? "left-[237px]"
            : "left-[37px]"
        } top-9 rounded-full p-1 text-2xl cursor-pointer`}
        style={{ backgroundColor: theme.primary, color: "#fff" }}
      >
        <motion.div
          animate={{ rotate: isRTL ? (open ? 0 : 180) : (open ? 180 : 0) }}
          transition={{ duration: 0.3 }}
        >
          {isRTL ? <IoIosArrowBack /> : <IoIosArrowForward />}
        </motion.div>
      </button>

      <AnimatePresence>
        {/* Logo and Navigation */}
        <motion.div
          initial="closed"
          animate={open ? "open" : "closed"}
          variants={itemVariants}
          className="flex gap-1 items-center p-4"
        >
          <Link to="/" className="flex items-center gap-2">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaBookOpen size={40} color={theme.primary} />
            </motion.div>
            {open && (
              <motion.h1
                className="font-bold text-2xl"
                style={{ color: theme.text }}
              >
                EdClub
              </motion.h1>
            )}
          </Link>
        </motion.div>

        {/* Language Switcher */}
        {open && (
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-2 px-6 py-2"
            style={{ color: theme.text }}
          >
            <MdLanguage size={20} />
            <select
              onChange={(e) => changeLanguage(e.target.value)}
              value={i18n.language}
              className="bg-transparent outline-none"
              style={{ color: theme.text }}
            >
              <option value="en">English</option>
              <option value="fr">Français</option>
              <option value="ar">العربية</option>
              <option value="es">Español</option>
              <option value="de">Deutsch</option>
            </select>
          </motion.div>
        )}

        {/* Main Navigation */}
        <motion.nav className={`mt-10 ${open ? (isRTL ? "mr-6" : "ml-6") : (isRTL ? "mr-1" : "ml-1")}`}>
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
                    isRTL={isRTL}
                  />
                </Link>
              </motion.div>
            ))}
          </motion.ul>
        </motion.nav>

        {/* Bottom Navigation */}
        <motion.nav className={`absolute bottom-2 ${open ? (isRTL ? "mr-6" : "ml-6") : (isRTL ? "mr-1" : "ml-1")}`}>
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
                    isRTL={isRTL}
                  />
                </Link>
              </motion.div>
            ))}
          </motion.ul>
        </motion.nav>
      </AnimatePresence>
    </motion.div>
  );
};

export default SideBar;

import { Link } from "react-router";
import { IoSettingsOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { FaUserAlt } from "react-icons/fa";
import { BiBookAlt } from "react-icons/bi";
import { useTheme } from "../context/ThemeContext";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/ApiCalls";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const ProfileMenu = () => {
  const { i18n, t } = useTranslation();
  const { currentTheme, themes } = useTheme();
  const theme = themes[currentTheme];
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const savedLanguage = localStorage.getItem("selectedLanguage");
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("selectedLanguage", lng);
  };

  const menuItems = [
    { icon: <FaUserAlt />, label: t("profile_menu.my_profile"), link: "/myProfile" },
    { icon: <BiBookAlt />, label: t("profile_menu.my_learning"), link: "/myLearning" },
    { icon: <IoSettingsOutline />, label: t("profile_menu.settings"), link: "/settings" },
    { icon: <CiLogout />, label: t("profile_menu.sign_out"), action: () => signout() },
  ];

  const signout = () => {
    logoutUser(dispatch);
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: (i) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    }),
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <motion.div initial="hidden" animate="visible" className="py-2">
      <motion.div
        className="p-3 border-b mb-1"
        style={{ borderColor: theme.border }}
        variants={itemVariants}
        custom={0}
      >
        <motion.p
          className="text-sm font-medium"
          style={{ color: theme.primary }}
          whileHover={{ x: 3 }}
        >
          {user?.username || "User Name"}
        </motion.p>
        <motion.p className="text-xs opacity-70" style={{ color: theme.text }}>
          {user?.email || "Email Address"}
        </motion.p>
      </motion.div>

      <motion.ul>
        {menuItems.map((item, index) => (
          <motion.li key={index} variants={itemVariants} custom={index + 1}>
            {item.link ? (
              <Link
                to={item.link}
                className="flex items-center gap-2 px-3 py-2 text-sm transition-all"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  style={{ color: theme.primary }}
                >
                  {item.icon}
                </motion.div>
                <motion.span
                  style={{ color: theme.text }}
                  whileHover={{ x: 2 }}
                >
                  {item.label}
                </motion.span>
              </Link>
            ) : (
              <div
                onClick={item.action}
                className="flex items-center gap-2 px-3 py-2 text-sm transition-all cursor-pointer"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  style={{ color: theme.primary }}
                >
                  {item.icon}
                </motion.div>
                <motion.span
                  style={{ color: theme.text }}
                  whileHover={{ x: 2 }}
                >
                  {item.label}
                </motion.span>
              </div>
            )}
          </motion.li>
        ))}
      </motion.ul>

      <motion.div
        className="border-t mt-1 pt-2 px-3"
        style={{ borderColor: theme.border }}
        variants={itemVariants}
        custom={menuItems.length + 1}
      >
        <motion.div
          className="flex items-center justify-between text-xs"
          whileHover={{ x: 3 }}
        >
          <span style={{ color: theme.text }}>Version</span>
          <span style={{ color: theme.secondary }}>2.0.0</span>
        </motion.div>
      </motion.div>

      <motion.div
        className="mt-2 px-3"
        style={{ borderColor: theme.border }}
        variants={itemVariants}
        custom={menuItems.length + 2}
      >
        <label className="text-xs" style={{ color: theme.text }}>
          Language:
        </label>
        <select
          onChange={(e) => changeLanguage(e.target.value)}
          className="ml-2 text-xs border rounded px-1"
          style={{ color: theme.text, borderColor: theme.border }}
          value={i18n.language}
        >
          <option value="en">English</option>
          <option value="fr">French</option>
          <option value="ar">Arabic</option>
          <option value="sp">Spanish</option>
          <option value="gr">German</option>
        </select>
      </motion.div>
    </motion.div>
  );
};

export default ProfileMenu;

import { Link } from "react-router";
import { IoSettingsOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { FaUserAlt } from "react-icons/fa";
import { BiBookAlt } from "react-icons/bi";
import { useTheme } from "../context/ThemeContext";
import { motion } from "framer-motion";

const ProfileMenu = () => {
  const { currentTheme, themes } = useTheme();
  const theme = themes[currentTheme];

  const menuItems = [
    { icon: <FaUserAlt />, label: "My Profile", link: "/myProfile" },
    { icon: <BiBookAlt />, label: "My Learning", link: "/myLearning" },
    { icon: <IoSettingsOutline />, label: "Settings", link: "/settings" },
    { icon: <CiLogout />, label: "Sign Out", link: "/signout" },
  ];

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
          user@example.com
        </motion.p>
        <motion.p className="text-xs opacity-70" style={{ color: theme.text }}>
          Free Account
        </motion.p>
      </motion.div>

      <motion.ul>
        {menuItems.map((item, index) => (
          <motion.li key={index} variants={itemVariants} custom={index + 1}>
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
              <motion.span style={{ color: theme.text }} whileHover={{ x: 2 }}>
                {item.label}
              </motion.span>
            </Link>
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
    </motion.div>
  );
};

export default ProfileMenu;

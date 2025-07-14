import React from "react";
import { IoLink } from "react-icons/io5";
import { IoLogoLinkedin } from "react-icons/io";
import { FaYoutube } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";

const InstructorCard = ({ teacherInfo }) => {
  const { currentTheme, themes } = useTheme();
  const theme = themes[currentTheme];

  const socialLinks = [
    {
      id: 1,
      icon: <IoLink fontSize={22} />,
      href: "#",
    },
    {
      id: 2,
      icon: <IoLogoLinkedin fontSize={22} />,
      href: "#",
    },
    {
      id: 3,
      icon: <BsTwitterX fontSize={20} />,
      href: "#",
    },
    {
      id: 4,
      icon: <FaYoutube fontSize={22} />,
      href: "#",
    },
  ];

  return (
    <motion.div
      className="w-[360px] flex flex-col items-center gap-7 rounded-xl shadow-lg absolute right-[15%] top-10 p-6"
      style={{
        backgroundColor: theme.cardBg,
        border: `1px solid ${theme.border}`,
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <motion.div
        className="relative w-[150px] h-[150px] rounded-full overflow-hidden border-4"
        style={{ borderColor: theme.primary }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <img
          src={teacherInfo?.teacher_profile_pic}
          alt="Instructor"
          className="h-full w-full object-cover"
        />
      </motion.div>

      <motion.div
        className="flex gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {socialLinks.map((item) => (
          <motion.a
            key={item.id}
            href={item.href}
            className="p-3 rounded-lg cursor-pointer transition-all duration-300"
            style={{
              backgroundColor: theme.cardBg,
              border: `1px solid ${theme.primary}`,
              color: theme.primary,
            }}
            whileHover={{
              backgroundColor: theme.primary,
              color: theme.cardBg,
              scale: 1.05,
            }}
            whileTap={{ scale: 0.95 }}
          >
            {item.icon}
          </motion.a>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default InstructorCard;

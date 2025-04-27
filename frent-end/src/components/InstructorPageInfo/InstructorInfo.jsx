import React from "react";
import { IoIosPlayCircle } from "react-icons/io";
import { FaUserFriends } from "react-icons/fa";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";

const InstructorInfo = () => {
  const { currentTheme, themes } = useTheme();
  const theme = themes[currentTheme];

  const stats = [
    {
      icon: <IoIosPlayCircle fontSize={20} />,
      label: "7 Courses",
      value: "7",
    },
    {
      icon: <FaUserFriends fontSize={20} />,
      label: "Students",
      value: "1,545",
    },
  ];

  return (
    <motion.div
      className="absolute left-[15%] top-10 flex flex-col gap-4"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.span
        className="text-sm font-medium tracking-wider"
        style={{ color: theme.secondary }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        INSTRUCTOR
      </motion.span>

      <motion.h3
        className="text-3xl font-bold"
        style={{ color: theme.text }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Dr. Angela Yu
      </motion.h3>

      <motion.h4
        className="text-xl"
        style={{ color: theme.secondary }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Developer and Lead Instructor
      </motion.h4>

      <motion.div
        className="flex gap-4 mt-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            className="flex items-center gap-2 px-4 py-2 rounded-lg"
            style={{
              backgroundColor: `${theme.primary}15`,
              color: theme.primary,
            }}
            whileHover={{
              backgroundColor: `${theme.primary}25`,
              scale: 1.05,
            }}
          >
            {stat.icon}
            <span className="font-medium">{stat.label}</span>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default InstructorInfo;

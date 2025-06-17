import React from "react";
import { TbClockHour2 } from "react-icons/tb";
import { FaBook, FaRegUser, FaWifi, FaStar } from "react-icons/fa";
import { AiOutlineInbox } from "react-icons/ai";
import { useTheme } from "../../context/ThemeContext";
import { motion } from "framer-motion";

const CourseOverview = ({ course }) => {
  const { currentTheme, themes } = useTheme();
  const theme = themes[currentTheme];

  const stats = [
    { icon: <TbClockHour2 size={18} />, text: "10 hours" },
    { icon: <FaWifi size={16} />, text: "All Levels" },
    { icon: <FaBook size={16} />, text: "16 Lessons" },
    { icon: <AiOutlineInbox size={18} />, text: "0 Quiz" },
    { icon: <FaRegUser size={16} />, text: "5 Students" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 rounded-lg mt-3"
      style={{ backgroundColor: theme.cardBg }}
    >
      <div className="w-full">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between w-full gap-4 md:gap-7 mb-8">
          <div className="flex-1">
            <h2
              className="text-2xl font-bold mb-2"
              style={{ color: theme.text }}
            >
              {course?.title}
            </h2>
            <div
              className="flex items-center gap-2"
              style={{ color: theme.primary }}
            >
              {/* <div className="flex items-center">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar className="opacity-40" />
              </div>
              //TODO: Add dynamic rating
              <span className="text-sm" style={{ color: theme.secondary }}>
                (4.0)
              </span> */}
            </div>
          </div>

          <div
            className="flex items-center gap-3 px-4 py-2 rounded-lg"
            style={{ backgroundColor: `${theme.primary}10` }}
          >
            <img
              src={
                course?.instructor?.profile_pic ||
                "https://via.placeholder.com/150"
              }
              alt="Instructor"
              className="h-12 w-12 rounded-full object-cover border-2"
              style={{ borderColor: theme.primary }}
            />
            <div className="flex flex-col">
              <span className="font-medium" style={{ color: theme.text }}>
                {course?.instructor?.userName || "Instructor Name"}
              </span>
              <span className="text-sm" style={{ color: theme.secondary }}>
                Course Instructor
              </span>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div
          className="grid grid-cols-2 md:grid-cols-5 gap-4 p-4 rounded-lg mb-8"
          style={{ backgroundColor: `${theme.secondary}10` }}
        >
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className="p-2 rounded-full"
                style={{ backgroundColor: `${theme.primary}20` }}
              >
                {React.cloneElement(stat.icon, { color: theme.primary })}
              </div>
              <span style={{ color: theme.text }}>{stat.text}</span>
            </div>
          ))}
        </div>

        {/* Overview Section */}
        <div className="flex flex-col gap-4">
          <h3 className="text-2xl font-bold" style={{ color: theme.text }}>
            Overview
          </h3>
          <div
            className="p-4 rounded-lg text-base leading-relaxed"
            style={{
              backgroundColor: theme.background,
              color: theme.secondary,
              border: `1px solid ${theme.border}`,
            }}
          >
            <p>{course?.description}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseOverview;

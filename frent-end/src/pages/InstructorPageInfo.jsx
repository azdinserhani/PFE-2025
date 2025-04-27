import React from "react";
import InstructorCard from "../components/InstructorPageInfo/InstructorCard";
import InstructorInfo from "../components/InstructorPageInfo/InstructorInfo";
import InstructorAbout from "../components/InstructorPageInfo/InstructorAbout";
import InstructorCourses from "../components/InstructorPageInfo/InstructorCourses";
import { useTheme } from "../context/ThemeContext";
import { motion } from "framer-motion";

const InstructorPageInfo = () => {
  const { currentTheme, themes } = useTheme();
  const theme = themes[currentTheme];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mx-auto min-h-screen"
      style={{ backgroundColor: theme.background }}
    >
      <motion.div
        className="relative h-[300px]"
        style={{
          backgroundColor: `${theme.primary}15`,
          borderBottom: `1px solid ${theme.border}`,
        }}
        initial={{ height: 0 }}
        animate={{ height: 300 }}
        transition={{ duration: 0.5 }}
      >
        <InstructorInfo />
        <InstructorCard />
      </motion.div>
      <div className="max-w-7xl mx-auto">
        <InstructorAbout />
        <InstructorCourses />
      </div>
    </motion.div>
  );
};

export default InstructorPageInfo;

import React from "react";
import CourseCard from "../LandingPage/CourseCard";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";

const InstructorCourses = () => {
  const { currentTheme, themes } = useTheme();
  const theme = themes[currentTheme];

  const courses = [
    {
      id: 1,
      title: "The Complete Web Development Bootcamp",
      lessons: 400,
      students: 850,
      price: 89,
      instructor: "Dr. Angela Yu",
      description:
        "Become a full-stack web developer with just one course. HTML, CSS, Javascript, Node, React, MongoDB and more!",
      image: "/Info1.jpg",
    },
    {
      id: 2,
      title: "iOS & Swift - The Complete iOS App Development Bootcamp",
      lessons: 320,
      students: 695,
      price: 99,
      instructor: "Dr. Angela Yu",
      description:
        "From beginner to iOS app developer with just one course. Learn to code and build apps for iPhone and iPad.",
      image: "/Info2.jpg",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <motion.div
      className="p-8 mt-8 mb-4 rounded-xl"
      style={{
        backgroundColor: theme.cardBg,
        border: `1px solid ${theme.border}`,
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-8">
        <motion.h2
          className="text-3xl font-bold"
          style={{ color: theme.text }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          My Courses{" "}
          <span style={{ color: theme.primary }}>({courses.length})</span>
        </motion.h2>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {courses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            <CourseCard item={course} index={index} />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default InstructorCourses;

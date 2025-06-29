import React, { useEffect, useState } from "react";
import StatCard from "../components/MyLearning/StatCard";
import CourseCard from "../components/LandingPage/CourseCard";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { userRequest } from "../utils/axios";
import { useSelector } from "react-redux";

const MyLearning = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const { currentTheme, themes } = useTheme();
  const theme = themes[currentTheme];
  useEffect(() => {
    const getEnroolledCourses = async () => {
      try {
        const courseEnroled = await userRequest.get(
          "/api/v1/course/course/enrollmentsByUserId"
        );
        console.log("Enrolled Courses:", courseEnroled.data.data);
        setEnrolledCourses(courseEnroled.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getEnroolledCourses();
  }, []);
  const { items, total } = useSelector((state) => state.cart);
  const cards = [
    {
      title: "Enrolled Courses",
      number: enrolledCourses.length,
    },
    {
      title: "Completed Courses",
      number: 0,
    },
    {
      title: "Pending Courses",
      number: items.length,
    },
  ];

  const courses = [
    {
      title: "The Ultimate Course Course",
      lessons: 10,
      students: 49,
      price: "$0",
      instructor: "Calvin Carlo",
      description: "The phrasal sequence of the is now so many campaign.",
      isEnrolled: true,
      progress: 30,
    },
    {
      title: "Back-end Development Course",
      lessons: 10,
      students: 49,
      price: "$15",
      instructor: "Calvin Carlo",
      description: "The phrasal sequence of the is now so many campaign.",
      isEnrolled: true,
      progress: 25,
    },
    {
      title: "Front-end Development Course",
      lessons: 10,
      students: 49,
      price: "$24",
      instructor: "Calvin Carlo",
      description: "The phrasal sequence of the is now so many campaign.",
      isEnrolled: true,
      progress: 75,
    },
    {
      title: "The Ultimate Course Course",
      lessons: 10,
      students: 49,
      price: "$0",
      instructor: "Calvin Carlo",
      description: "The phrasal sequence of the is now so many campaign.",
      isEnrolled: true,
      progress: 30,
    },
    {
      title: "Back-end Development Course",
      lessons: 10,
      students: 49,
      price: "$15",
      instructor: "Calvin Carlo",
      description: "The phrasal sequence of the is now so many campaign.",
      isEnrolled: true,
      progress: 25,
    },
    {
      title: "Front-end Development Course",
      lessons: 10,
      students: 49,
      price: "$24",
      instructor: "Calvin Carlo",
      description: "The phrasal sequence of the is now so many campaign.",
      isEnrolled: true,
      progress: 75,
    },
    {
      title: "The Ultimate Course Course",
      lessons: 10,
      students: 49,
      price: "$0",
      instructor: "Calvin Carlo",
      description: "The phrasal sequence of the is now so many campaign.",
      isEnrolled: true,
      progress: 30,
    },
    {
      title: "Back-end Development Course",
      lessons: 10,
      students: 49,
      price: "$15",
      instructor: "Calvin Carlo",
      description: "The phrasal sequence of the is now so many campaign.",
      isEnrolled: true,
      progress: 25,
    },
    {
      title: "Front-end Development Course",
      lessons: 10,
      students: 49,
      price: "$24",
      instructor: "Calvin Carlo",
      description: "The phrasal sequence of the is now so many campaign.",
      isEnrolled: true,
      progress: 75,
    },
    {
      title: "The Ultimate Course Course",
      lessons: 10,
      students: 49,
      price: "$0",
      instructor: "Calvin Carlo",
      description: "The phrasal sequence of the is now so many campaign.",
      isEnrolled: true,
      progress: 30,
    },
    {
      title: "Back-end Development Course",
      lessons: 10,
      students: 49,
      price: "$15",
      instructor: "Calvin Carlo",
      description: "The phrasal sequence of the is now so many campaign.",
      isEnrolled: true,
      progress: 25,
    },
    {
      title: "Front-end Development Course",
      lessons: 10,
      students: 49,
      price: "$24",
      instructor: "Calvin Carlo",
      description: "The phrasal sequence of the is now so many campaign.",
      isEnrolled: true,
      progress: 75,
    },
    {
      title: "The Ultimate Course Course",
      lessons: 10,
      students: 49,
      price: "$0",
      instructor: "Calvin Carlo",
      description: "The phrasal sequence of the is now so many campaign.",
      isEnrolled: true,
      progress: 30,
    },
    {
      title: "Back-end Development Course",
      lessons: 10,
      students: 49,
      price: "$15",
      instructor: "Calvin Carlo",
      description: "The phrasal sequence of the is now so many campaign.",
      isEnrolled: true,
      progress: 25,
    },
    {
      title: "Front-end Development Course",
      lessons: 10,
      students: 49,
      price: "$24",
      instructor: "Calvin Carlo",
      description: "The phrasal sequence of the is now so many campaign.",
      isEnrolled: true,
      progress: 75,
    },
    {
      title: "The Ultimate Course Course",
      lessons: 10,
      students: 49,
      price: "$0",
      instructor: "Calvin Carlo",
      description: "The phrasal sequence of the is now so many campaign.",
      isEnrolled: true,
      progress: 30,
    },
    {
      title: "Back-end Development Course",
      lessons: 10,
      students: 49,
      price: "$15",
      instructor: "Calvin Carlo",
      description: "The phrasal sequence of the is now so many campaign.",
      isEnrolled: true,
      progress: 25,
    },
    {
      title: "Front-end Development Course",
      lessons: 10,
      students: 49,
      price: "$24",
      instructor: "Calvin Carlo",
      description: "The phrasal sequence of the is now so many campaign.",
      isEnrolled: true,
      progress: 75,
    },
  ];

  return (
    <motion.div
      className="w-full min-h-screen p-6 md:p-10 space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ backgroundColor: theme.background }}
    >
      {/* Header Section */}
      <div className="max-w-7xl mx-auto">
        <motion.h1
          className="text-3xl md:text-4xl font-bold mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ color: theme.text }}
        >
          My Learning Dashboard
        </motion.h1>

        {/* Stats Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {cards.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <StatCard item={item} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* My Courses Section */}
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="flex items-center justify-between mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2
            className="text-2xl md:text-3xl font-bold"
            style={{ color: theme.text }}
          >
            My Courses
          </h2>
          <div
            className="px-4 py-2 rounded-lg text-sm"
            style={{
              backgroundColor: `${theme.primary}15`,
              color: theme.primary,
            }}
          >
            {enrolledCourses.length} Total Courses
          </div>
        </motion.div>

        {/* Courses Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-x-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {enrolledCourses?.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <CourseCard item={item} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MyLearning;

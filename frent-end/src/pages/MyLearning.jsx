import React from "react";
import StatCard from "../components/MyLearning/StatCard";
import CourseCard from "../components/LandingPage/CourseCard";
import { motion } from "framer-motion";

const MyLearning = () => {
  const cards = [
    {
      title: "Enrolled Courses",
      number: 25,
    },
    {
      title: "Completed Courses ",
      number: 43,
    },
    {
      title: "Pending Courses",
      number: 25,
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
      className="w-full max-h-screen pt-10 overflow-y-scroll p-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex gap-4">
        {cards.map((item, index) => {
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="w-full"
            >
              <StatCard item={item} />
            </motion.div>
          );
        })}
      </div>
      <h2 className="mt-10 mb-5 text-3xl">My courses</h2>
      <div className="grid grid-cols-3 gap-4 overflow-x-hidden">
        {courses.map((item, index) => {
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <CourseCard item={item} />
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default MyLearning;

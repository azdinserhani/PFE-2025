import React, { useEffect, useState } from "react";
import InstructorsCard from "./InstructorsCard";
import { useTheme } from "../../context/ThemeContext";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { getInstructor } from "../../redux/ApiCalls";

const Instructors = () => {
  const { currentTheme, themes } = useTheme();
  const theme = themes[currentTheme];
  const { t } = useTranslation();
  const [instructors, setInstructors] = useState([]);
  useEffect(() => {
    const fetchInstructors = async () => {
      const res = await getInstructor();
      setInstructors(res);
    };
    fetchInstructors();
  }, []);
  
  const instructorsContent = [
    {
      Img: "/instu1.jpg",
      name: "Dr. Sarah Mitchell",
      desc: "Web Development Expert",
      stats: {
        courses: 12,
        students: "2.5K",
        rating: 4.8,
      },
    },
    {
      Img: "/instu1.jpg",
      name: "Prof. Michael Chen",
      desc: "Data Science Specialist",
      stats: {
        courses: 8,
        students: "1.8K",
        rating: 4.9,
      },
    },
    {
      Img: "/instu1.jpg",
      name: "Emma Rodriguez",
      desc: "UI/UX Design Master",
      stats: {
        courses: 15,
        students: "3.2K",
        rating: 4.7,
      },
    },
    {
      Img: "/instu1.jpg",
      name: "James Anderson",
      desc: "Mobile Development Pro",
      stats: {
        courses: 10,
        students: "2.1K",
        rating: 4.8,
      },
    },
  ];

  return (
    <motion.div
      className="container mx-auto flex flex-col items-center justify-center py-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ backgroundColor: theme.background }}
    >
      <motion.div
        className="text-center max-w-3xl mx-auto mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.h2
          className="text-4xl font-bold mb-6"
          style={{ color: theme.text }}
        >
          {t("instructors.title")}
        </motion.h2>
        <motion.div
          className="w-20 h-1 mx-auto mb-6"
          style={{ backgroundColor: theme.primary }}
        />
        <motion.p className="text-lg mb-8" style={{ color: theme.secondary }}>
          {t("instructors.description")}
        </motion.p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {instructors.map((instructor, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
          >
            <InstructorsCard item={instructor} />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Instructors;

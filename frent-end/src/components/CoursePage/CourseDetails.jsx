import React, { useEffect, useState } from "react";
import CourseSections from "./CourseSections";
import { TbClockHour2 } from "react-icons/tb";
import { FaWifi } from "react-icons/fa6";
import { FaBook } from "react-icons/fa";
import { AiOutlineInbox } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import { PiShoppingCartLight } from "react-icons/pi";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import { FaPalette } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cartSlice";
import { useTheme } from "../../context/ThemeContext";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router";

const CourseDetails = () => {
  const dispatch = useDispatch();
  const { currentTheme, changeTheme, themes } = useTheme();
  const theme = themes[currentTheme];
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAddToCart = () => {
    // Create a course object with the current course details
    const course = {
      id: "1", // This would normally come from the course data
      title: "Spoken English Popular Course",
      lessons: 16,
      students: 5,
      price: "$29",
      instructor: "Calvin Carlo",
      description: "Learn spoken English with this popular course.",
    };

    dispatch(addToCart(course));
  };

  const toggleThemeMenu = (e) => {
    e.stopPropagation();
    setThemeMenuOpen(!themeMenuOpen);
  };

  const handleThemeChange = (themeKey) => {
    changeTheme(themeKey);
    setThemeMenuOpen(false);
  };

  // Close theme menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setThemeMenuOpen(false);
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col justify-center items-center gap-8 my-10 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Course Header */}
      <motion.div
        className="w-full rounded-xl shadow-md p-6 overflow-hidden relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          backgroundColor: theme.cardBg,
          border: `1px solid ${theme.border}`,
        }}
      >
        <div
          className="absolute top-0 left-0 w-full h-2"
          style={{ backgroundColor: theme.primary }}
        ></div>
        <h1
          className="text-2xl md:text-3xl font-bold text-center mb-6"
          style={{ color: theme.text }}
        >
          Spoken English Popular Course
        </h1>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center gap-3 mb-4 md:mb-0">
            <img
              src="/instu1.jpg"
              alt="Calvin Carlo"
              className="h-12 w-12 rounded-full object-cover shadow-sm"
              style={{ border: `2px solid ${theme.primary}` }}
            />
            <div className="flex flex-col md:flex-row md:items-center gap-2">
              <Link to="/instructor/1" className="flex items-center gap-2">
                <span style={{ color: theme.text }} className="font-medium">
                  Calvin Carlo
                </span>
              </Link>
              <motion.button
                onClick={() => (window.location.href = "/instructor/1")}
                className="flex items-center cursor-pointer justify-center py-1.5 px-3 font-medium gap-1 rounded-lg transition-all duration-300"
                whileHover={{
                  scale: 1.02,
                  backgroundColor: `${theme.primary}20`,
                }}
                whileTap={{ scale: 0.98 }}
                style={{
                  border: `1px solid ${theme.primary}`,
                  color: theme.primary,
                }}
              >
                <FaRegUser size={16} />
                View Profile
              </motion.button>
            </div>
          </div>

          <div className="flex items-center">
            <span
              className="text-2xl font-bold mr-4"
              style={{ color: theme.primary }}
            >
              $29
            </span>
            <motion.button
              onClick={handleAddToCart}
              className="flex items-center cursor-pointer justify-center py-2.5 px-5 font-semibold gap-2 rounded-lg transition-all duration-300 shadow-md"
              whileHover={{
                scale: 1.03,
                boxShadow: "0 10px 15px rgba(0,0,0,0.1)",
              }}
              whileTap={{ scale: 0.98 }}
              style={{
                backgroundColor: theme.primary,
                color: "#ffffff",
              }}
            >
              <PiShoppingCartLight size={20} /> Add to Cart
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Course Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-6 w-full">
        <motion.div
          className="flex items-center gap-2 p-4 rounded-lg shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          style={{
            backgroundColor: theme.cardBg,
            border: `1px solid ${theme.border}`,
          }}
        >
          <div
            className="p-2 rounded-full"
            style={{ backgroundColor: `${theme.primary}20` }}
          >
            <TbClockHour2 size={20} style={{ color: theme.primary }} />
          </div>
          <div>
            <p className="text-xs" style={{ color: theme.secondary }}>
              Duration
            </p>
            <p className="font-medium" style={{ color: theme.text }}>
              10 hours
            </p>
          </div>
        </motion.div>

        <motion.div
          className="flex items-center gap-2 p-4 rounded-lg shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          style={{
            backgroundColor: theme.cardBg,
            border: `1px solid ${theme.border}`,
          }}
        >
          <div
            className="p-2 rounded-full"
            style={{ backgroundColor: `${theme.primary}20` }}
          >
            <FaWifi size={20} style={{ color: theme.primary }} />
          </div>
          <div>
            <p className="text-xs" style={{ color: theme.secondary }}>
              Level
            </p>
            <p className="font-medium" style={{ color: theme.text }}>
              All Levels
            </p>
          </div>
        </motion.div>

        <motion.div
          className="flex items-center gap-2 p-4 rounded-lg shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          style={{
            backgroundColor: theme.cardBg,
            border: `1px solid ${theme.border}`,
          }}
        >
          <div
            className="p-2 rounded-full"
            style={{ backgroundColor: `${theme.primary}20` }}
          >
            <FaBook size={20} style={{ color: theme.primary }} />
          </div>
          <div>
            <p className="text-xs" style={{ color: theme.secondary }}>
              Lessons
            </p>
            <p className="font-medium" style={{ color: theme.text }}>
              16 Lessons
            </p>
          </div>
        </motion.div>

        <motion.div
          className="flex items-center gap-2 p-4 rounded-lg shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          style={{
            backgroundColor: theme.cardBg,
            border: `1px solid ${theme.border}`,
          }}
        >
          <div
            className="p-2 rounded-full"
            style={{ backgroundColor: `${theme.primary}20` }}
          >
            <AiOutlineInbox size={20} style={{ color: theme.primary }} />
          </div>
          <div>
            <p className="text-xs" style={{ color: theme.secondary }}>
              Quizzes
            </p>
            <p className="font-medium" style={{ color: theme.text }}>
              0 Quiz
            </p>
          </div>
        </motion.div>

        <motion.div
          className="flex items-center gap-2 p-4 rounded-lg shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          style={{
            backgroundColor: theme.cardBg,
            border: `1px solid ${theme.border}`,
          }}
        >
          <div
            className="p-2 rounded-full"
            style={{ backgroundColor: `${theme.primary}20` }}
          >
            <FaRegUser size={20} style={{ color: theme.primary }} />
          </div>
          <div>
            <p className="text-xs" style={{ color: theme.secondary }}>
              Students
            </p>
            <p className="font-medium" style={{ color: theme.text }}>
              5 Students
            </p>
          </div>
        </motion.div>
      </div>

      {/* Course Image */}
      <motion.div
        className="w-full mt-2 overflow-hidden rounded-xl shadow-lg"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <img
          src="/Info2.jpg"
          alt="Course cover"
          className="h-[400px] md:h-[500px] w-full object-cover transform hover:scale-105 transition-transform duration-700"
        />
      </motion.div>

      {/* Overview Section */}
      <motion.div
        className="flex flex-col gap-4 w-full p-6 rounded-xl shadow-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        style={{
          backgroundColor: theme.cardBg,
          border: `1px solid ${theme.border}`,
        }}
      >
        <h2
          className="text-xl md:text-2xl font-bold border-b pb-3"
          style={{
            color: theme.text,
            borderColor: theme.border,
          }}
        >
          Overview
        </h2>
        <p className="leading-relaxed" style={{ color: theme.text }}>
          Ooh, name it after me! Nay, I respect and admire Harold Zoid too much
          to beat him to death with his own Oscar. Why would I want to know
          that? What's with you kids? Every other day it's food, food, food.
          Alright, I'll get you some stupid food. It's a T. It goes "tuh". You
          seem malnourished. Are you suffering from intestinal parasites? I
          suppose I could part with 'one' and still be feared… And I'd do it
          again! And perhaps a third time! But that would be it. I'm just glad
          my fat, ugly mama isn't alive to see this day. I can explain. It's
          very valuable. I barely knew Philip, but as a clergyman I have no
          problem telling his most intimate friends all about him. Bender, we're
          trying our best. Kif might! You can crush me but you can't crush my
          spirit! Kif, I have mated with a woman. Inform the men. I'm Santa
          Claus! What are you hacking off? Is it my torso?! 'It is!' My precious
          torso! You, a bobsleder!? That I'd like to see! And I'd do it again!
          And perhaps a third time! But that would be it. My fellow Earthicans,
          as I have explained in my book 'Earth in the Balance", and the much
          more popular "Harry Potter and the Balance of Earth', we need to
          defend our planet against pollution. Also dark wizards.
        </p>
      </motion.div>

      {/* Curriculum Section */}
      <motion.div
        className="flex flex-col gap-5 w-full p-6 rounded-xl shadow-md mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        style={{
          backgroundColor: theme.cardBg,
          border: `1px solid ${theme.border}`,
        }}
      >
        <h2
          className="text-xl md:text-2xl font-bold border-b pb-3"
          style={{
            color: theme.text,
            borderColor: theme.border,
          }}
        >
          Curriculum
        </h2>
        <div className="space-y-4">
          <CourseSections />
          <CourseSections />
          <CourseSections />
        </div>
      </motion.div>
    </div>
  );
};

export default CourseDetails;

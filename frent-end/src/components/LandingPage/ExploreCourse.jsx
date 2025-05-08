import React, { useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import { FaLongArrowAltRight } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";
import { useTranslation } from "react-i18next";
import { getAllCourses } from "../../redux/ApiCalls";
import { Link } from "react-router";

const ExploreCourse = () => {
  const { currentTheme, themes } = useTheme();
  const theme = themes[currentTheme];
  const { t } = useTranslation();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const result = await getAllCourses();
        setCourses(result.courses || []);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setCourses([]);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div
      className="container mx-auto min-h-screen flex flex-col items-center mt-20"
      style={ { backgroundColor: theme.background } }
    >
      <h2 className="text-4xl font-bold" style={ { color: theme.text } }>
        { t("explore_courses.title") }
      </h2>
      <p
        className="font-bold mt-4 text-center"
        style={ { color: theme.secondary } }
      >
        { t("explore_courses.description") }
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 mt-7">
        { Array.isArray(courses) && courses.map((course) => (
          <CourseCard key={ course.id } item={ course } />
        )) }
      </div>
      <Link
        to="/courses"
        className="flex items-center gap-0.5 mt-5 cursor-pointer duration-300"
        style={ { color: theme.secondary } }
        onMouseOver={ (e) => (e.currentTarget.style.color = theme.primary) }
        onMouseOut={ (e) => (e.currentTarget.style.color = theme.secondary) }
      >
        { t("explore_courses.see_more_courses") } <FaLongArrowAltRight />
      </Link>
    </div>
  );
};

export default ExploreCourse;

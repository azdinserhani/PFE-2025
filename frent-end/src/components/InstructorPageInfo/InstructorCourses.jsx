import React from "react";
import CourseCard from "../LandingPage/CourseCard";

const InstructorCourses = () => {
  const courses = [
    {
      title: "The Ultimate Course Course",
      lessons: 10,
      students: 49,
      price: "$0",
      instructor: "Calvin Carlo",
      description: "The phrasal sequence of the is now so many campaign.",
    },
    {
      title: "Back-end Development Course",
      lessons: 10,
      students: 49,
      price: "$15",
      instructor: "Calvin Carlo",
      description: "The phrasal sequence of the is now so many campaign.",
    },
    {
      title: "Back-end Development Course",
      lessons: 10,
      students: 49,
      price: "$15",
      instructor: "Calvin Carlo",
      description: "The phrasal sequence of the is now so many campaign.",
    },
    {
      title: "Back-end Development Course",
      lessons: 10,
      students: 49,
      price: "$15",
      instructor: "Calvin Carlo",
      description: "The phrasal sequence of the is now so many campaign.",
    },
  ];
  return (
    <div className="container mx-auto p-6 mt-7 mb-4">
      <span className="text-4xl font-bold text-gray-800 mb-4 border-b-2 border-gray-300 pb-2">
        My courses (2)
      </span>
      <div className="grid grid-cols-3 gap-7 mt-7">
        {courses.map((course) => {
          return <CourseCard item={course} />;
        })}
      </div>
    </div>
  );
};

export default InstructorCourses;

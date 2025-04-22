import React from "react";
import CourseCard from "./CourseCard";
import { FaLongArrowAltRight } from "react-icons/fa";

const ExploreCourse = () => {
  const courses = [
    {
      id: 1,
      title: "The Ultimate Course Course",
      lessons: 10,
      students: 49,
      price: 12,
      instructor: "Calvin Carlo",
      description: "The phrasal sequence of the is now so many campaign.",
    },
    {
      id: 2,
      title: "Back-end Development Course", 
      lessons: 10,
      students: 49,
      price: 11,
      instructor: "Calvin Carlo",
      description: "The phrasal sequence of the is now so many campaign.",
    },
    {
      id: 3,
      title: "Front-end Development Course",
      lessons: 10,
      students: 49,
      price: 24,
      instructor: "Calvin Carlo",
      description: "The phrasal sequence of the is now so many campaign.",
    },
    {
      id: 4,
      title: "Spoken English Popular Course",
      lessons: 10,
      students: 49,
      price: 29,
      instructor: "Calvin Carlo",
      description: "The phrasal sequence of the is now so many campaign.",
    },
    {
      id: 5,
      title: "Full Stack Project in Next.js Course",
      lessons: 10,
      students: 49,
      price: 29,
      instructor: "Calvin Carlo",
      description: "The phrasal sequence of the is now so many campaign.",
    },
  ];

  return (
    <div className="container mx-auto min-h-screen flex flex-col  items-center  mt-20">
      <h2 className="text-4xl font-bold">Explore Our Best Courses</h2>
      <p className="text-gray-400 font-bold mt-4 text-center">
        Discover a world of knowledge and opportunities with our online <br />
        education platform pursue a new career.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-7 mt-7">
        {courses.map((course) => {
          return <CourseCard item={course} />;
        })}
      </div>
      <span className="flex items-center gap-0.5 text-gray-400 mt-5 hover:text-purple-600 cursor-pointer duration-300">
        See More Courses <FaLongArrowAltRight />
      </span>
    </div>
  );
};

export default ExploreCourse;

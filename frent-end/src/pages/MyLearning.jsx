import React from "react";
import StatCard from "../components/MyLearning/StatCard";
import CourseCard from "../components/LandingPage/CourseCard";

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
  ];

  return (
    <div className="container mx-auto min-h-screen">
      <div className="flex gap-4 ">
        {cards.map((item, index) => {
          return <StatCard item={item} key={index} />;
        })}
      </div>
      <h2 className="mt-10 mb-5  text-3xl">My courses</h2>
      <div className="grid grid-cols-3 gap-4">
        {courses.map((item, index) => {
          return <CourseCard item={item} />;
        })}
      </div>
    </div>
  );
};

export default MyLearning;

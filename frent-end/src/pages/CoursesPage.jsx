import React from "react";
import Header from "../components/Coursespage/Header";
import CourseCard from "../components/LandingPage/CourseCard";
import SideBar from "../components/Coursespage/SideBar";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
const CoursesPage = () => {
  const courses = [
    {
      id: 1,
      title: "The Ultimate Course Course",
      lessons: 10,
      students: 49,
      price: 0,
      instructor: "Calvin Carlo",
      description: "The phrasal sequence of the is now so many campaign.",
    },
    {
      id: 2,
      title: "Back-end Development Course", 
      lessons: 10,
      students: 49,
      price: 15,
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
    <div className="">
      <Header />
      <div className="container mx-auto">
        <div className=" flex gap-4 p-4">
          <div className="flex-2/3 grid grid-cols-2 gap-7">
            {courses.map((course) => {
              return <CourseCard item={course} />;
            })}
          </div>
          <div className="flex-1/3">
            <SideBar />
          </div>
        </div>
        <div className="flex w-full justify-center my-10 ">
          <Stack spacing={2}>
            <Pagination
              count={10}
              sx={{
                "& .MuiPaginationItem-root": {
                  color: "purple",
                },
              }}
              onChange={(event, value) => {
                console.log("Current page:", value);
              }}
            />
          </Stack>
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;

import React from "react";
import InstructorCard from "../components/InstructorPageInfo/InstructorCard";
import InstructorInfo from "../components/InstructorPageInfo/InstructorInfo";
import InstructorAbout from "../components/InstructorPageInfo/InstructorAbout";
import InstructorCourses from "../components/InstructorPageInfo/InstructorCourses";

const InstructorPageInfo = () => {
  return (
    <div className="mx-auto min-h-screen">
      <div className="relative bg-purple-100 h-[200px]">
        <InstructorInfo />
        <InstructorCard />
      </div>
      <InstructorAbout />
      <InstructorCourses />
    </div>
  );
};

export default InstructorPageInfo;

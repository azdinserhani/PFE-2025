import React from "react";
import CoursesTable from "../../components/InstroctorDashbaord/CoursesTable";


const CourseByInstructor = () => {
  return (
    <div className="container mx-auto flex flex-col w-full py-5 gap-4">
   
      <CoursesTable />
    </div>
  );
};

export default CourseByInstructor;

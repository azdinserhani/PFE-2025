import React from "react";
import CoursesTable from "../../components/InstroctorDashbaord/CoursesTable";
import Head from "../../components/InstroctorDashbaord/Head";

const CourseByInstructor = () => {
  return (
    <div className="container mx-auto flex flex-col w-full py-5 gap-4">
      <Head />
      <CoursesTable />
    </div>
  );
};

export default CourseByInstructor;

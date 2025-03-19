import React from "react";
import InstructorsCard from "./InstructorsCard";

const Instructors = () => {
  const instructorsContent = [
    {
      Img: "/instu1.jpg",
      name: "Relaxing & Learning",
      desc: "The phrasal sequence ",
    },
    {
      Img: "/instu1.jpg",
      name: "Certificate",
      desc: "Receive a cet.",
    },
    {
      Img: "/instu1.jpg",
      name: "Private Mentoring",
      desc: "Get one-on-one mentoring.",
    },
    {
      Img: "/instu1.jpg",
      name: "Creative Thinking",
      desc: "Enhance your creat.",
    },
  ];
  return (
    <div className="container mx-auto">
      <div
        className=" text-center h-[20vh] flex flex-col  items-center justify-center"
        style={{ display: "flex" }}
      >
        <h2 className="text-4xl font-bold text-center ">Expert Instructors</h2>
        <p className="text-gray-400 font-bold mt-4 text-center">
          Discover a world of knowledge and opportunities with our online
          education <br /> platform pursue a new career.
        </p>
      </div>
      <div className="grid grid-cols-4 gap-6 mt-12 p-4">
        {instructorsContent.map((instructors) => {
          return <InstructorsCard item={instructors} />;
        })}
      </div>
    </div>
  );
};

export default Instructors;

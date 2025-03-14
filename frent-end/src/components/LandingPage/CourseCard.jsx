import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";

const CourseCard = ({ item }) => {
  return (
    <div className=" p-4 bg-white  rounded-lg shadow-md hover:shadow-lg duration-300 cursor-pointer group overflow-hidden">
      <img
        src="/Info1.jpg"
        alt=""
        className="h-[151px] object-cover w-full rounded-lg transition-transform duration-300 ease-in-out group-hover:scale-105"
      />
      <div className="flex gap-3 py-3 text-gray-400 font-semibold">
        <span>{item.students} Lessons</span>
        <span>{item.lessons} student</span>
      </div>

      <h3 className="font-semibold text-[22px]">{item.title}</h3>
      <p className="text-gray-400 font-semibold">{item.description}</p>
      <div className="flex items-center justify-between mt-5">
        <div className="flex gap-4 items-center">
          <img
            src="./instu1.jpg"
            alt=""
            className="h-10 w-10 rounded-full object-cover"
          />
          <span className="font-bold ">{item.instructor}</span>
        </div>

        <button className="flex  items-center justify-center w-fit py-2 px-4 bg-purple-300  text-purple-900 font-semibold gap-2 rounded-md cursor-pointer   hover:bg-purple-500 hover:text-white duration-300 hover:rotate-3">
          Learn more <FaLongArrowAltRight />
        </button>
      </div>
    </div>
  );
};

export default CourseCard;

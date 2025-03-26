import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Link } from "react-router";

const CourseCard = ({ item }) => {
  return (
    <div className=" p-4 bg-white  rounded-lg shadow-md hover:shadow-lg duration-300 cursor-pointer group overflow-hidden min-w-[400px]">
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
      {item.isEnrolled && (
        <div className="w-full  h-2 bg-gray-200  rounded-4xl z-0">
          <div
            className=" my-3 h-2 bg-purple-500 transition-all duration-500 rounded-4xl "
            style={{ width: `${item.progress}%` }}
          ></div>
        </div>
      )}

      <div className="flex items-center justify-between mt-5">
        <Link to={"/instructor/2"}>
          <div className="flex gap-4 items-center">
            <img
              src="/instu1.jpg"
              alt=""
              className="h-10 w-10 rounded-full object-cover"
            />
            <span className="font-bold ">{item.instructor}</span>
          </div>
        </Link>
        <Link to={"/course/2"}>
          <button className="flex  items-center justify-center w-fit py-2 px-4 bg-purple-300  text-purple-900 font-semibold gap-2 rounded-md cursor-pointer   hover:bg-purple-500 hover:text-white duration-300 hover:rotate-3">
            {item.isEnrolled ? (
            <Link to={"/course/learn/2"}>
              <div className="flex items-center gap-2">
                Complete <FaLongArrowAltRight />
              </div>
            </Link>
          ) : (
            <Link to={"/course/2"}>
              <div className="flex items-center gap-2">
                Learn more
                <FaLongArrowAltRight />
              </div>
            </Link>
          )}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;

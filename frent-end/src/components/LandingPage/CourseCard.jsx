import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Link } from "react-router";
import { motion } from "framer-motion";

const CourseCard = ({ item }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer group overflow-hidden min-w-[400px]"
    >
      <motion.img
        src="/Info1.jpg"
        alt=""
        className="h-[151px] object-cover w-full rounded-lg transition-transform duration-300 ease-in-out group-hover:scale-105"
      />
      <div className="flex gap-4 py-4 text-gray-500 font-medium text-sm">
        <span>{item.students} Lessons</span>
        <span>{item.lessons} Students</span>
      </div>

      <h3 className="font-bold text-xl text-gray-800">{item.title}</h3>
      <p className="text-gray-500 text-sm mt-2">{item.description}</p>
      {item.isEnrolled && (
        <div className="w-full h-2 bg-gray-200 rounded-full mt-4">
          <motion.div
            className="h-2 bg-purple-500 rounded-full"
            style={{ width: `${item.progress}%` }}
            initial={{ width: 0 }}
            animate={{ width: `${item.progress}%` }}
            transition={{ duration: 0.5 }}
          ></motion.div>
        </div>
      )}

      <div className="flex items-center justify-between mt-6">
        <Link to={"/instructor/2"}>
          <div className="flex gap-3 items-center">
            <img
              src="/instu1.jpg"
              alt=""
              className="h-12 w-12 rounded-full object-cover"
            />
            <span className="font-semibold text-gray-700">
              {item.instructor}
            </span>
          </div>
        </Link>
        <Link to={item.isEnrolled ? "/course/learn/2" : "/course/2"}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center py-2 px-5 bg-purple-500 text-white font-semibold gap-2 rounded-lg shadow-md hover:bg-purple-600 transition-all duration-300"
          >
            <span>{item.isEnrolled ? "Complete" : "Learn more"}</span>
            <FaLongArrowAltRight />
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
};

export default CourseCard;

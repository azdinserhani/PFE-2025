import React from "react";
import { FiPhone } from "react-icons/fi";
const Question = () => {
  return (
    <div className="flex flex-col justify-center items-center my-17 mt-32">
      <div className="text-center">
        <h1 className="font-bold text-4xl mb-5">Have Question ? Get in touch!</h1>
        <p className="text-gray-400 font-bold">
          Discover a world of knowledge and opportunities with <br />our online
          education platform pursue a new career.
        </p>
      </div>
      <div className="my-6 ">
        <button className="flex items-center px-4 py-2  text-purple-900 font-semibold bg-purple-300 rounded-md gap-2 cursor-pointer hover:bg-purple-500  hover:text-white duration-300">
          <FiPhone />
          Contact us
        </button>
      </div>
    </div>
  );
};

export default Question;

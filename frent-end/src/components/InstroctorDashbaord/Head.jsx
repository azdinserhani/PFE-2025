import React from "react";
import InputField from "../Auth/InputField";
import { FiPlusCircle } from "react-icons/fi";
const Head = () => {
  return (
    <div className="flex justify-between items-center">
      <div className="w-[50%]">
        <InputField
          id={"title"}
          type={"text"}
          placeholder={"Course title"}
        />
      </div>

      <button className="bg-purple-500 text-white px-4 py-1 flex items-center gap-2 rounded-md hover:bg-purple-600 cursor-pointer duration-300 h-[40px]"> 
        <FiPlusCircle />
        New Course
      </button>
    </div>
  );
};

export default Head;

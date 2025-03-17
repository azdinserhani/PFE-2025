import React from "react";

const ButtonAuth = ({ label }) => {
  return (
    <button className="bg-purple-700 text-white rounded-lg py-2 font-semibold cursor-pointer hover:bg-white hover:text-purple-500 hover:border-purple-500 border duration-300 ">
      {label}
    </button>
  );
};

export default ButtonAuth;

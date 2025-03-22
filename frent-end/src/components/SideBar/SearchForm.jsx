import React from "react";
import { IoClose } from "react-icons/io5";
const SearchForm = ({ setSearchOpen, searchOpen }) => {
  return (
    <div className="w-[100%] ">
      <div className="fixed top-16 left-1/2 transform -translate-x-1/2 w-[85%] z-[9999] ">
        <form action="">
          <div className="bg-white shadow-lg rounded-lg  relative w-[80%] mx-auto">
            <input
              type="text"
              placeholder="Search..."
              className="w-full p-5 border-none outline-none text-gray-700"
            />
            <button
              type="button"
              className="absolute top-2 right-2  cursor-pointer p-2 text-gray-500 rounded-full"
              onClick={() => setSearchOpen(false)}
            >
              <IoClose />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchForm;

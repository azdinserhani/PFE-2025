import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";

const SideBar = () => {
  const [price, setPrice] = useState(50);

  return (
    <div className="p-4">
      <div className="">
        <p className="font-semibold">Search course</p>
        <div className="flex items-center px-4 py-2 border border-gray-200 gap-3 ml-4 rounded-lg hover:border-purple-500 duration-300 mt-3">
          <BiSearch fontSize={25} />
          <input
            type="text"
            placeholder="Search"
            className="w-full outline-none"
          />
        </div>
      </div>
      <div className="mt-6 ml-4">
        <p className="font-semibold">Categories</p>
        <div className="mt-3 space-y-2">
          {[
            "Web Designing",
            "Data Science",
            "Machine Learning",
            "App Development",
            "Cyber Security",
          ].map((category, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="">
                <input
                  type="checkbox"
                  id={`check${index}`}
                  className="mr-2 accent-purple-500 "
                />
                <label
                  htmlFor={`check${index}`}
                  className="cursor-pointer text-gray-500 font-semibold"
                >
                  {category}
                </label>
              </div>
              <span className="text-purple-500 bg-purple-200  p-0.5 px-1 rounded-2xl">
                12
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6 ">
        <p className="font-semibold">Pricing</p>
        <div className="flex items-center justify-between ml-4">
          <span>$0</span>
          <input
            type="range"
            className="w-full accent-purple-500 mx-2 cursor-pointer bg-none"
            min="0"
            max="200"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <span>${price}</span>
        </div>
      </div>
      <div className="mt-6 ml-4">
        <p className="font-semibold">Levels</p>
        <div className="mt-3 space-y-2">
          {["Begining", "Intermediate", "Expert"].map((category, index) => (
            <div key={index} className="flex items-center justify-between ">
              <div className="">
                <input
                  type="checkbox"
                  id={`chec${index}`}
                  className="mr-2 accent-purple-500 "
                />
                <label
                  htmlFor={`chec${index}`}
                  className="cursor-pointer text-gray-500 font-semibold"
                >
                  {category}
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideBar;

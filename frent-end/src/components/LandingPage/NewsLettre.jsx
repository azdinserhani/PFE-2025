import React from "react";

const NewsLettre = () => {
  return (
    <div className=" bg-[#7C3AED] ">
      <div className="container mx-auto flex  flex-col md:flex-row h-auto md:h-[50vh]">
        <div className="flex-1 mt-10 md:flex-1/2 flex justify-center flex-col ml-7 text-center md:text-left">
          <h2 className="text-white font-bold text-4xl">
            Subscribe to Newsletter!
          </h2>
          <p className="text-gray-200">
            Subscribe to get latest updates and information.
          </p>
          <div className="flex rounded-4xl w-full md:w-[80%] mt-5 bg-purple-700 text-white h-[60px]">
            <input
              type="text"
              placeholder="Enter your email :"
              className="flex-2/3 outline-none text-white pl-3"
            />
            <button className="flex-1/3 bg-amber-500 h-[60px] rounded-4xl hover:bg-purple-700 duration-300 cursor-pointer hover:border-white hover:border-2">
              Subscribe
            </button>
          </div>
        </div>
        <div className="flex-1 md:flex-1/2 relative mt-5 md:mt-0">
          <img
            src="./newsPart.png"
            alt=""
            className="w-full md:h-[447px] object-contain md:absolute md:bottom-0"
          />
        </div>
      </div>
    </div>
  );
};

export default NewsLettre;

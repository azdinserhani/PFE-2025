import React from "react";

const NewsLettre = () => {
  return (
    <div className=" bg-[#7C3AED]">
      <div className="container mx-auto flex h-[50vh]">
        <div className="flex-1/2 flex  justify-center flex-col ml-7">
          <h2 className="text-white font-bold text-4xl">
            Subscribe to Newsletter!
          </h2>
          <p className="text-gray-200">
            Subscribe to get latest updates and information.
          </p>
          <div className="flex rounded-4xl w-[80%] mt-5  bg-purple-700 text-white h-[60px] ">
            <input
              type="text"
              placeholder="Enter your email :"
              className="flex-2/3 outline-none text-white pl-3"
            />
            <button className="flex-1/3 bg-amber-500 h-[60px] rounded-4xl  hover:bg-purple-700 duration-300 cursor-pointer hover:border-white hover:border-2">
              Subscribe
            </button>
          </div>
        </div>
        <div className="flex-1/2 relative">
          <img
            src="./newsPart.png"
            alt=""
            className="h-[447px] absolute bottom-0"
          />
        </div>
      </div>
    </div>
  );
};

export default NewsLettre;

//TODO: add the shape in news letter to make it better

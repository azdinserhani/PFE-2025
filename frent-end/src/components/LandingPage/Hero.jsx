import { FaDisplay } from "react-icons/fa6";
import { FaLongArrowAltRight } from "react-icons/fa";
const Hero = () => {
  return (
    <div className="container mx-auto flex  h-[calc(100vh-60px)]">
      <div className="flex flex-1/2  items-center h-full">
        <div className=" flex flex-col  justify-center space-y-4">
          <h2 className="text-5xl font-semibold">
            Best Online <br /> Courses <br /> From 3almni
          </h2>
          <p className="text-gray-500">
            Discover a world of knowledge and opportunities with our online{" "}
            <br />
            education platform pursue a new career.
          </p>
          <button className="flex items-center gap-2  bg-purple-500 p-4 rounded-sm text-white w-40 cursor-pointer hover:rotate-6 duration-300">
            View Courses
            <FaLongArrowAltRight />
          </button>
        </div>
      </div>
      <div className="flex-1/2 relative">
        <div className="absolute h-10 w-10 bg-purple-200 rounded-lg top-5 left-10 "></div>
        <div className="relative">
          <img src="./girl.png" alt="" className="h-180 absolute z-50" />
          <div className="h-150 w-150 bg-purple-500 absolute rounded-full top-6"></div>
        </div>

        <div className="flex absolute items-center gap-3 bg-white py-3 px-8 rounded-lg shadow-2xl top-24 left-5 animate-pulse ">
          <FaDisplay fontSize={25} />
          <div className="">
            <p className="text-gray-400">Online Course</p>
            <span className="font-semibold text-2xl">100+</span>
          </div>
        </div>
        <div className="flex flex-col absolute items-center gap-3 bg-white py-3 px-8 rounded-lg shadow-2xl bottom-40 right-100 z-100">
          <p className="text-gray-400">Our instructor</p>
          <div className="flex">
            <div className="h-7 w-7 bg-blue-400 rounded-full -ml-3 border border-white outline-1 cursor-pointer hover:z-10 duration-300"></div>
            <div className="h-7 w-7 bg-blue-400 rounded-full -ml-3 border border-white outline-1 cursor-pointer hover:z-10 duration-300"></div>
            <div className="h-7 w-7 bg-blue-400 rounded-full -ml-3 border border-white outline-1 cursor-pointer hover:z-10 duration-300"></div>
            <div className="h-7 w-7 bg-blue-400 rounded-full -ml-3 border border-white outline-1 cursor-pointer hover:z-10 duration-300"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

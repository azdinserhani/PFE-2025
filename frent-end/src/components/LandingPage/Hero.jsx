import { FaDisplay } from "react-icons/fa6";
import { FaLongArrowAltRight } from "react-icons/fa";
const Hero = () => {
  return (
    <div className="container mx-auto flex flex-col lg:flex-row h-[calc(100vh-60px)]">
      <div className="flex flex-1 lg:flex-1/2 items-center h-full">
        <div className="flex flex-col justify-center space-y-4 px-4 lg:px-0">
          <h2 className="text-5xl font-semibold">
            Best Online <br /> Courses <br /> From 3almni
          </h2>
          <p className="text-gray-500 text-sm lg:text-base">
            Discover a world of knowledge and opportunities with our online{" "}
            <br className="hidden lg:block" />
            education platform pursue a new career.
          </p>
          <button className="flex items-center gap-2 bg-purple-500 p-4 rounded-sm text-white w-40 cursor-pointer hover:rotate-6 duration-300">
            View Courses
            <FaLongArrowAltRight />
          </button>
        </div>
      </div>
      <div className="flex-1 lg:flex-1/2 relative mt-6 lg:mt-0">
        <div className="absolute h-6 w-6 lg:h-10 lg:w-10 bg-purple-200 rounded-lg top-2 lg:top-5 left-5 lg:left-10"></div>
        <div className="relative">
          <img
            src="./girl.png"
            alt=""
            className="h-120 lg:h-180 absolute z-50"
          />
          <div className="h-70 w-70  lg:h-150 lg:w-150 bg-purple-500 absolute rounded-full top-3 lg:top-6"></div>
        </div>

        <div className="flex absolute items-center gap-3 bg-white py-2 px-4 lg:py-3 lg:px-8 rounded-lg shadow-2xl top-12 lg:top-24 left-2 lg:left-5 animate-pulse">
          <FaDisplay fontSize={20} lg:fontSize={25} />
          <div>
            <p className="text-gray-400 text-sm lg:text-base">Online Course</p>
            <span className="font-semibold text-xl lg:text-2xl">100+</span>
          </div>
        </div>
        <div className="flex flex-col absolute items-center gap-3 bg-white py-2 px-4 lg:py-3 lg:px-8 rounded-lg shadow-2xl bottom-20 lg:bottom-40 right-10 lg:right-100 z-100">
          <p className="text-gray-400 text-sm lg:text-base">Our instructor</p>
          <div className="flex">
            <div className="h-5 w-5 lg:h-7 lg:w-7 bg-blue-400 rounded-full -ml-2 lg:-ml-3 border border-white outline-1 cursor-pointer hover:z-10 duration-300"></div>
            <div className="h-5 w-5 lg:h-7 lg:w-7 bg-blue-400 rounded-full -ml-2 lg:-ml-3 border border-white outline-1 cursor-pointer hover:z-10 duration-300"></div>
            <div className="h-5 w-5 lg:h-7 lg:w-7 bg-blue-400 rounded-full -ml-2 lg:-ml-3 border border-white outline-1 cursor-pointer hover:z-10 duration-300"></div>
            <div className="h-5 w-5 lg:h-7 lg:w-7 bg-blue-400 rounded-full -ml-2 lg:-ml-3 border border-white outline-1 cursor-pointer hover:z-10 duration-300"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

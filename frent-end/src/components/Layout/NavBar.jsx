import { VscSearch } from "react-icons/vsc";
import { IoCartOutline } from "react-icons/io5";
//fixed w-full z-10 transition-all duration-300
//   ${darkMode ? 'bg-gray-800' : 'bg-white'}
//   ${isScrolled ? 'shadow-lg bg-opacity-90 backdrop-blur-md' : 'shadow-md'}
const NavBar = () => {
  return (
    <div className="flex justify-between  top-0 w-full z-10 transition-all duration-300  p-4  bg-opacity-90 ">
      <div className="">Logo</div>
      <div className="flex list-none gap-6 text-[20px]">
        <li className="cursor-pointer hover:text-purple-400 duration-300">
          Home
        </li>
        <li className="cursor-pointer hover:text-purple-400 duration-300">
          Courses
        </li>
        <li className="cursor-pointer hover:text-purple-400 duration-300">
          About Us
        </li>
        <li className="cursor-pointer hover:text-purple-400 duration-300">
          Contact Us
        </li>
      </div>
      <div className="flex items-center gap-3">
        <div className="">
          <VscSearch fontSize={20} />
        </div>
        <div className="h-8 w-8 bg-purple-500 flex items-center justify-center border rounded-2xl  text-white">
          <IoCartOutline fontSize={22} />
        </div>
        <div className="rounded-2xl bg-amber-700 h-8 w-8"></div>
      </div>
    </div>
  );
};

export default NavBar;

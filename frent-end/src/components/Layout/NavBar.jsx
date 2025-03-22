import { VscSearch } from "react-icons/vsc";
import { IoCartOutline } from "react-icons/io5";
import { useState } from "react";
import ProfileMenu from "../ProfileMenu";
import { Link } from "react-router";
import SearchForm from "../SideBar/SearchForm";
const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="container mx-auto flex justify-between  top-0 w-full z-10 transition-all duration-300  p-4  bg-opacity-90 ">
      <div className="">Logo</div>
      <div className="flex list-none gap-6 text-[15px]">
        <li className="cursor-pointer hover:text-purple-400 duration-300">
          <Link to={"/"}>Home</Link>
        </li>
        <li className="cursor-pointer hover:text-purple-400 duration-300">
          <Link to={"/courses"}>Courses</Link>
        </li>
        <li className="cursor-pointer hover:text-purple-400 duration-300">
          <Link to={"/about"}>About Us</Link>
        </li>
        <li className="cursor-pointer hover:text-purple-400 duration-300">
          <Link to={"/contact"}>Contact Us</Link>
        </li>
      </div>
      <div className="flex items-center gap-3">
        {" "}
        <a className="cursor-pointer text-white duration-300 bg-purple-500 py-1 px-2 rounded-lg hover:text-purple-500 hover:bg-white border-purple-500 border">
          <Link to={"/signin"}>Sign In</Link>
        </a>
        <div className="cursor-pointer" onClick={() => setSearchOpen(true)}>
          <VscSearch fontSize={20} />
        </div>
        {searchOpen && (
          <div className="absolute">
            <SearchForm
              setSearchOpen={() => setSearchOpen()}
              searchOpen={searchOpen}
            />
            <div className="fixed z-[9998] left-0 top-0 bg-black/50 h-screen w-full"></div>
          </div>
        )}
        <div className="h-8 w-8 bg-purple-500 flex items-center justify-center border rounded-2xl  text-white">
          <IoCartOutline fontSize={22} />
        </div>
        <div
          className="rounded-2xl bg-amber-700 h-8 w-8 relative cursor-pointer"
          onClick={() => setMenuOpen(true)}
        >
          {menuOpen && <ProfileMenu />}
        </div>
      </div>
      {menuOpen && (
        <div
          className=" h-screen w-screen absolute top-0 right-0"
          onClick={() => setMenuOpen(!menuOpen)}
        ></div>
      )}
    </div>
  );
};

export default NavBar;

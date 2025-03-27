import React, { useState } from "react";
import { PiProjectorScreenChartLight } from "react-icons/pi";
import { GrHomeRounded } from "react-icons/gr";
import { IoIosArrowForward } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { FaTasks } from "react-icons/fa";
import { RiTeamFill } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { BiBookAlt } from "react-icons/bi";
import NavItem from "./NavItem";
import { Link } from "react-router";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { IoIosList } from "react-icons/io";
const SideBar = () => {
  const [open, setOpen] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <div
      className={`flex-col border-r border-gray-200 h-screen relative bg-purple-400 ${
        open ? "w-60" : "w-20"
      } duration-300`}
    >
      <div className="flex gap-1 items-center">
        <img src alt="" className="h-16 mt-2 ml-2 cursor-pointer" />
        <Link to={"/"}>
          <h1 className={`${!open && "hidden"} font-bold text-2xl text-white`}>
            3almni
          </h1>
        </Link>
      </div>
      <IoIosArrowForward
        color="white"
        onClick={() => {
          setOpen(!open);
          setMenuOpen(open);
        }}
        className={`absolute top-9 -right-3 bg-purple-800 rounded-full p-1 text-2xl cursor-pointer ${
          open && "rotate-180"
        }`}
      />
      <nav className="mt-10 ml-6 ">
        <ul className="space-y-4 text-gray-400 ">
          <div className={selectedItem === "profile" ? "text-purple-900" : ""}>
            <Link to="/myProfile">
              <NavItem
                label={"Account settings"}
                icon={FaUser}
                open={open}
                onClick={() => handleItemClick("profile")}
              />
            </Link>
          </div>

          <div className={selectedItem === "learning" ? "text-black" : ""}>
            <Link to="/myLearning">
              <NavItem
                label={"My Learning"}
                icon={BiBookAlt}
                open={open}
                onClick={() => handleItemClick("learning")}
              />
            </Link>
          </div>
          <div
            className={selectedItem === "instructorCourse" ? "text-black" : ""}
          >
            <Link to="/instructorCourse">
              <NavItem
                label={"My Courses"}
                icon={IoIosList}
                open={open}
                onClick={() => handleItemClick("instructorCourse")}
              />
            </Link>
          </div>
          <div className={selectedItem === "analytics" ? "text-black" : ""}>
            <Link to="/analytics">
              <NavItem
                label={"Analytics"}
                icon={TbBrandGoogleAnalytics}
                open={open}
                onClick={() => handleItemClick("analytics")}
              />
            </Link>
          </div>
        </ul>
      </nav>
      <nav className="absolute bottom-2 ml-6 flex-col">
        <ul className="text-gray-400 space-y-3">
          <div
            className={
              selectedItem === "Help & information" ? "text-black" : ""
            }
          >
            <Link to="/dashBoard/help">
              <NavItem
                label={"Help & information"}
                icon={IoIosInformationCircleOutline}
                open={open}
                onClick={() => handleItemClick("Help & information")}
              />
            </Link>
          </div>
          <div className={selectedItem === "Log out" ? "text-black" : ""}>
            <Link to="/logout">
              <NavItem
                label={"Log out"}
                icon={CiLogout}
                open={open}
                onClick={() => handleItemClick("Log out")}
              />
            </Link>
          </div>
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;

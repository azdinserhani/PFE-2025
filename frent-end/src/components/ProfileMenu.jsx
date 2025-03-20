import { BiBookAlt } from "react-icons/bi";
import { IoMdSettings } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { BiSolidDashboard } from "react-icons/bi";
import { Link } from "react-router";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { useState } from "react";
import { RiTranslate2 } from "react-icons/ri";
import { CgDarkMode } from "react-icons/cg";
const ProfileMenu = () => {
  const [isDark, setIsDark] = useState(false);
  const menuItems = [
    { icon: <FaUser />, label: "My Profile", link: "/myProfile" },
    {
      icon: <BiSolidDashboard />,
      label: "Instructor Dashboard",
      link: "/myDashboard",
    },

    { icon: <IoLogOut />, label: "Logout" },
  ];
  console.log(isDark);

  return (
    <div className="absolute top-10 right-0 w-[210px] p-3 rounded-lg shadow-2xl shadow-gray-200 bg-white z-50">
      <ul className="flex flex-col gap-3">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className="flex items-center gap-2 text-gray-400 hover:text-purple-500 duration-300 hover:pl-2"
          >
            <Link to={item.link} className="flex gap-2">
              {item.icon}
              {item.label}
            </Link>
          </li>
        ))}
        <li className="flex items-center gap-2 text-gray-400 hover:text-purple-500 duration-300 hover:pl-2 z-50">
          <CgDarkMode />
          <span onClick={() => setIsDark(!isDark)}>theme</span>
          {isDark ? (
            <MdDarkMode color="black" onClick={() => setIsDark(!isDark)} />
          ) : (
            <MdLightMode color="black" onClick={() => setIsDark(!isDark)} />
          )}
        </li>
        <li className="flex items-center gap-2 text-gray-400 hover:text-purple-500 duration-300 hover:pl-2 z-50">
          <RiTranslate2 />
          <span>language</span>
          <select
            name=""
            id=""
            className="p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">FR</option>
            <option value="">EN</option>
            <option value="">AR</option>
          </select>
        </li>
      </ul>
    </div>
  );
};

export default ProfileMenu;

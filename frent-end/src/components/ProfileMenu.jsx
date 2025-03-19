import { BiBookAlt } from "react-icons/bi";
import { IoMdSettings } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { BiSolidDashboard } from "react-icons/bi";
const ProfileMenu = () => {
  const menuItems = [
    { icon: <BiBookAlt />, label: "My Learning" },
    { icon: <FaUser />, label: "My Profile" },
    { icon: <BiSolidDashboard />, label: "Instructor Dashboard" },
    { icon: <IoMdSettings />, label: "Settings" },
    { icon: <IoLogOut />, label: "Logout" },
  ];

  return (
    <div className="absolute top-10 right-0 w-[210px] p-3 rounded-lg shadow-2xl shadow-gray-200 bg-white z-50">
      <ul className="flex flex-col gap-3">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className="flex items-center gap-2 text-gray-400 hover:text-purple-500 duration-300 hover:pl-2"
          >
            {item.icon}
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileMenu;

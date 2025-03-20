import { BiBookAlt } from "react-icons/bi";
import { IoMdSettings } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { BiSolidDashboard } from "react-icons/bi";
import { Link } from "react-router";
const ProfileMenu = () => {
  const menuItems = [
    { icon: <BiBookAlt />, label: "My Learning", link: "/myLearning" },
    { icon: <FaUser />, label: "My Profile", link: "/myProfile" },
    {
      icon: <BiSolidDashboard />,
      label: "Instructor Dashboard",
      link: "/myDashboard",
    },
    { icon: <IoMdSettings />, label: "Settings", link: "/setting" },
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
            <Link to={item.link} className="flex gap-2">
              {item.icon}
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileMenu;

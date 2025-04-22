import { FaUser, FaSignOutAlt } from "react-icons/fa";
import { BiSolidDashboard } from "react-icons/bi";
import { IoMdSettings } from "react-icons/io";
import { Link } from "react-router";
import { RiTranslate2 } from "react-icons/ri";
import { useTheme } from "../context/ThemeContext";

const ProfileMenu = () => {
  const { currentTheme, themes } = useTheme();
  const theme = themes[currentTheme];
  
  const menuItems = [
    { icon: <FaUser size={14} />, label: "Profile", link: "/myProfile" },
    { icon: <BiSolidDashboard size={14} />, label: "Dashboard", link: "/dashboard" },
    { icon: <IoMdSettings size={14} />, label: "Settings", link: "/settings" },
    { icon: <FaSignOutAlt size={14} />, label: "Logout", link: "/logout" },
  ];

  return (
    <div className="py-1">
      <div className="p-3 border-b mb-1" style={{ borderColor: theme.border }}>
        <p className="text-sm font-medium" style={{ color: theme.primary }}>user@example.com</p>
        <p className="text-xs opacity-70" style={{ color: theme.text }}>Free Account</p>
      </div>
      
      <ul>
        {menuItems.map((item, index) => (
          <li key={index}>
            <Link 
              to={item.link} 
              className="flex items-center gap-2 px-3 py-2 text-sm transition-colors hover:bg-opacity-5"
              style={{ 
                color: theme.text,
                ":hover": { backgroundColor: `${theme.primary}10` }
              }}
            >
              <span style={{ color: theme.primary }}>{item.icon}</span>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
      
      <div className="border-t mt-1 pt-2 px-3" style={{ borderColor: theme.border }}>
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5">
            <RiTranslate2 size={14} style={{ color: theme.primary }} />
            <span style={{ color: theme.text }}>Language</span>
          </div>
          <select
            className="rounded text-xs py-0.5 px-1.5 outline-none"
            style={{ 
              backgroundColor: theme.cardBg, 
              color: theme.text,
              border: `1px solid ${theme.border}`
            }}
          >
            <option value="en">English</option>
            <option value="fr">French</option>
            <option value="ar">Arabic</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ProfileMenu;

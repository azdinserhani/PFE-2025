import React from "react";
import { useTheme } from "../../context/ThemeContext";
import {
  FaDollarSign,
  FaUserGraduate,
  FaShoppingCart,
  FaBook,
} from "react-icons/fa";

const StatCard = ({ item }) => {
  const { currentTheme, themes } = useTheme();
  const theme = themes[currentTheme];

  const getIcon = () => {
    const title = item.title.toLowerCase();

    if (title.includes("revenue")) {
      return <FaDollarSign size={28} />;
    } else if (title.includes("completed")) {
      return <FaUserGraduate size={28} />;
    } else if (title.includes("pending")) {
      return <FaShoppingCart size={28} />;
    } else if (title.includes("enrolled")) {
      return <FaBook size={28} />;
    }
    return <FaBook size={28} />;
  };

  return (
    <div
      className="relative overflow-hidden flex flex-col items-center justify-center gap-4 p-8 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 group"
      style={{
        backgroundColor: theme.cardBg,
        borderColor: theme.border,
        borderWidth: "1px",
      }}
    >
      {/* Background Decoration */}
      <div
        className="absolute -right-6 -top-6 w-20 h-20 rounded-full transition-all duration-300 group-hover:scale-110"
        style={{
          backgroundColor: `${theme.primary}10`,
          borderColor: theme.primary,
        }}
      />

      {/* Icon */}
      <div
        className="relative z-10 p-4 rounded-xl transition-all duration-300 group-hover:scale-110"
        style={{
          backgroundColor: `${theme.primary}15`,
          color: theme.primary,
        }}
      >
        {getIcon()}
      </div>

      {/* Title */}
      <span
        className="text-lg font-medium text-center relative z-10"
        style={{ color: theme.text }}
      >
        {item.title}
      </span>

      {/* Number */}
      <span
        className="text-4xl font-bold relative z-10 transition-all duration-300 group-hover:scale-110"
        style={{ color: theme.primary }}
      >
        {item.number}
      </span>
    </div>
  );
};

export default StatCard;

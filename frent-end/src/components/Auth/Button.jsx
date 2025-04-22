import React from "react";
import { useTheme } from "../../context/ThemeContext";

const ButtonAuth = ({ label, onClick, type = "submit" }) => {
  const { currentTheme, themes } = useTheme();
  const theme = themes[currentTheme];

  return (
    <button
      type={type}
      onClick={onClick}
      className="py-3 font-semibold rounded-md cursor-pointer transition-all duration-300 text-center w-full shadow-sm hover:opacity-90 flex items-center justify-center"
      style={{
        backgroundColor: "#2563eb",
        color: "#ffffff",
        border: "none",
      }}
    >
      {label}
    </button>
  );
};

export default ButtonAuth;

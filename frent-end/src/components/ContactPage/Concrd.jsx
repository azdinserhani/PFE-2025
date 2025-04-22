import React from "react";
import { useTheme } from "../../context/ThemeContext";

const Concrd = ({ item, icon: Icon }) => {
  const { themes, currentTheme } = useTheme();
  const theme = themes[currentTheme];

  return (
    <div className="flex flex-col items-center py-6 transition-all duration-300 hover:transform hover:translate-y-[-5px]">
      <div 
        className="mb-6 rounded-full p-5 flex items-center justify-center"
        style={{ backgroundColor: `${theme.primary}20` }}
      >
        <Icon className="size-7" color={theme.primary} />
      </div>
      <h3 
        className="font-semibold text-lg mb-3"
        style={{ color: theme.text }}
      >{item.title}</h3>
      <p 
        className="text-center text-sm mb-4 px-4"
        style={{ color: `${theme.text}99` }}
      >{item.desc}</p>
      <a 
        href={item.link} 
        className="text-sm font-medium transition-all duration-300 hover:underline flex items-center gap-1"
        style={{ color: theme.primary }}
      >
        {item.title === "Our Location" ? "View on map" : item.title === "Call Us" ? "Call now" : "Send email"}
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 12L10 8L6 4" stroke={theme.primary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </a>
    </div>
  );
};

export default Concrd;

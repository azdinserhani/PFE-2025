import React from "react";
import { useTheme } from "../../context/ThemeContext";

const InstructorsCard = ({ item }) => {
  const { currentTheme, themes } = useTheme();
  const theme = themes[currentTheme];
  
  return (
    <div className="flex flex-col gap-4 p-4 w-[300px] transition-transform transform hover:scale-105" style={{ backgroundColor: theme.cardBg, borderRadius: '0.5rem', border: `1px solid ${theme.border}`, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <div className="relative mx-auto rounded-full overflow-hidden" style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
        <img src={item.Img} alt="Instructor" className="w-full h-full object-cover" />
      </div>
      <div className="flex flex-col content mt-3 items-center">
        <a
          href=""
          className="text-lg font-semibold duration-500"
          style={{ color: theme.text }}
          onMouseOver={(e) => e.currentTarget.style.color = theme.primary}
          onMouseOut={(e) => e.currentTarget.style.color = theme.text}
        >
          {item.name}
        </a>
        <p className="text-sm mt-1" style={{ color: theme.secondary }}>{item.desc}</p>
      </div>
    </div>
  );
};

export default InstructorsCard;

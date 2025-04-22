import React from "react";
import { useTheme } from "../../context/ThemeContext";

const InstructorsCard = ({ item }) => {
  const { currentTheme, themes } = useTheme();
  const theme = themes[currentTheme];
  
  return (
    <div className="flex flex-col gap-4 p-4 w-[300px]" style={{ backgroundColor: theme.cardBg, borderRadius: '0.5rem', border: `1px solid ${theme.border}` }}>
      <div className="relative mx-auto rounded-full overflow-hidden">
        <img src={item.Img} alt="" />
      </div>
      <div className="flex flex-col content mt-3 items-center">
        <a
          href=""
          className="text-lg font-medium duration-500"
          style={{ color: theme.text }}
          onMouseOver={(e) => e.currentTarget.style.color = theme.primary}
          onMouseOut={(e) => e.currentTarget.style.color = theme.text}
        >
          {item.name}
        </a>
        <p style={{ color: theme.secondary }}>{item.desc}</p>
      </div>
    </div>
  );
};

export default InstructorsCard;

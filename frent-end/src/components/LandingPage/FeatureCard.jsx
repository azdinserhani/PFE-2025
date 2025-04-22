import { FaLongArrowAltRight } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";

const FeatureCard = ({ item, icon: Icon }) => {
  const { currentTheme, themes } = useTheme();
  const theme = themes[currentTheme];
  
  return (
    <div 
      className="flex flex-col gap-4 shadow-md p-4 rounded-2xl hover:scale-105 cursor-pointer duration-300"
      style={{ 
        backgroundColor: theme.cardBg,
        border: `1px solid ${theme.border}`,
        color: theme.text
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.backgroundColor = theme.primary;
        e.currentTarget.style.color = '#ffffff';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.backgroundColor = theme.cardBg;
        e.currentTarget.style.color = theme.text;
      }}
    >
      <div 
        className="w-fit p-3 rounded-2xl shadow-sm"
        style={{ backgroundColor: `${theme.primary}20` }}
      >
        <Icon fontSize={25} style={{ color: theme.primary }} />
      </div>
      <span className="font-bold text-2xl">{item.title}</span>
      <p className="text-[17]" style={{ color: theme.secondary }}>{item.desc}</p>
      <button 
        className="w-fit mt-auto flex gap-2 items-center duration-300 cursor-pointer"
        style={{ color: theme.primary }}
        onMouseOver={(e) => e.currentTarget.style.color = '#ffffff'}
        onMouseOut={(e) => e.currentTarget.style.color = theme.primary}
      >
        Read More <FaLongArrowAltRight />
      </button>
    </div>
  );
};

export default FeatureCard;

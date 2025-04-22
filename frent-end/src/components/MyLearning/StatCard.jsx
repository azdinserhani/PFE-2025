import React from "react";
import { useTheme } from "../../context/ThemeContext";
import { FaDollarSign, FaUserGraduate, FaShoppingCart, FaBook } from "react-icons/fa";

const StatCard = ({ item }) => {
  const { currentTheme, themes } = useTheme();
  const theme = themes[currentTheme];
  
  // Get appropriate icon based on title
  const getIcon = () => {
    const title = item.title.toLowerCase();
    
    if (title.includes('revenue')) {
      return <FaDollarSign size={32} />;
    } else if (title.includes('student')) {
      return <FaUserGraduate size={32} />;
    } else if (title.includes('sales')) {
      return <FaShoppingCart size={32} />;
    } else if (title.includes('course')) {
      return <FaBook size={32} />;
    }
    
    // Default icon
    return <FaBook size={32} />;
  };
  
  return (
    <div 
      className="flex flex-col items-center justify-center gap-3 h-fit p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
      style={{
        backgroundColor: theme.cardBg,
        borderColor: theme.border,
        borderWidth: '1px'
      }}
    >
      <div 
        className="p-3 rounded-full mb-1"
        style={{ 
          backgroundColor: `${theme.primary}15`,
          color: theme.primary 
        }}
      >
        {getIcon()}
      </div>
      <span 
        className="text-lg font-medium"
        style={{ color: theme.text }}
      >
        {item.title}
      </span>
      <span 
        className="text-3xl font-bold"
        style={{ color: theme.primary }}
      >
        {item.number}
      </span>
    </div>
  );
};

export default StatCard;

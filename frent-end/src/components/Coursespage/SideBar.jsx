import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { IoFilterOutline } from "react-icons/io5";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useTheme } from "../../context/ThemeContext";

const SideBar = () => {
  const [price, setPrice] = useState(50);
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    pricing: true,
    levels: true
  });
  const { currentTheme, themes } = useTheme();
  const theme = themes[currentTheme];

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div 
      className="p-5 rounded-lg shadow-sm" 
      style={{ 
        backgroundColor: theme.cardBg, 
        border: `1px solid ${theme.border}`, 
        transition: "all 0.3s ease"
      }}
    >
      {/* Header with filter icon */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold" style={{ color: theme.text }}>Filters</h3>
        <IoFilterOutline size={20} style={{ color: theme.primary }} />
      </div>

      {/* Search */}
      <div className="mb-6">
        <div 
          className="flex items-center px-4 py-3 gap-3 rounded-lg border-2 hover:border-opacity-100 transition-all duration-300" 
          style={{ 
            borderColor: theme.border, 
            backgroundColor: `${theme.cardBg === '#ffffff' ? '#f9f9f9' : theme.background}` 
          }}
        >
          <BiSearch fontSize={20} style={{ color: theme.secondary }} />
          <input
            type="text"
            placeholder="Search courses..."
            className="w-full outline-none text-sm"
            style={{ 
              backgroundColor: 'transparent', 
              color: theme.text,
              caretColor: theme.primary,
              transition: "all 0.2s ease"
            }}
          />
        </div>
      </div>

      {/* Categories */}
      <div className="mb-6">
        <div 
          className="flex items-center justify-between cursor-pointer" 
          onClick={() => toggleSection('categories')}
        >
          <h4 className="font-semibold mb-3" style={{ color: theme.text }}>Categories</h4>
          <MdOutlineKeyboardArrowDown 
            size={20} 
            style={{ 
              color: theme.secondary,
              transform: expandedSections.categories ? 'rotate(0deg)' : 'rotate(-90deg)',
              transition: 'transform 0.3s ease'
            }} 
          />
        </div>
        
        {expandedSections.categories && (
          <div className="mt-3 space-y-3 pl-1">
            {[
              "Web Designing",
              "Data Science",
              "Machine Learning",
              "App Development",
              "Cyber Security",
            ].map((category, index) => (
              <div key={index} className="flex items-center justify-between group">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id={`check${index}`}
                    className="w-4 h-4 mr-3 cursor-pointer rounded"
                    style={{ 
                      accentColor: theme.primary,
                      transition: "all 0.2s ease"
                    }}
                  />
                  <label
                    htmlFor={`check${index}`}
                    className="cursor-pointer text-sm group-hover:font-medium transition-all"
                    style={{ color: theme.secondary }}
                  >
                    {category}
                  </label>
                </div>
                <span 
                  className="text-xs px-2 py-1 rounded-full text-center min-w-[30px]"
                  style={{ 
                    color: theme.primary, 
                    backgroundColor: `${theme.primary}15`, 
                    transition: "all 0.2s ease"
                  }}
                >
                  12
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pricing */}
      <div className="mb-6">
        <div 
          className="flex items-center justify-between cursor-pointer" 
          onClick={() => toggleSection('pricing')}
        >
          <h4 className="font-semibold mb-3" style={{ color: theme.text }}>Pricing</h4>
          <MdOutlineKeyboardArrowDown 
            size={20} 
            style={{ 
              color: theme.secondary,
              transform: expandedSections.pricing ? 'rotate(0deg)' : 'rotate(-90deg)',
              transition: 'transform 0.3s ease'
            }} 
          />
        </div>
        
        {expandedSections.pricing && (
          <div className="mt-3 px-1">
            <div className="flex items-center justify-between mb-3">
              <span 
                className="text-sm font-medium px-2" 
                style={{ color: theme.text }}
              >
                $0
              </span>
              <span 
                className="text-sm font-medium px-2" 
                style={{ color: theme.primary }}
              >
                ${price}
              </span>
            </div>
            <input
              type="range"
              className="w-full h-2 appearance-none rounded-lg cursor-pointer"
              style={{ 
                accentColor: theme.primary,
                background: `linear-gradient(to right, ${theme.primary} 0%, ${theme.primary} ${price/2}%, ${theme.border} ${price/2}%, ${theme.border} 100%)`,
                transition: "all 0.2s ease"
              }}
              min="0"
              max="200"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        )}
      </div>

      {/* Levels */}
      <div className="mb-4">
        <div 
          className="flex items-center justify-between cursor-pointer" 
          onClick={() => toggleSection('levels')}
        >
          <h4 className="font-semibold mb-3" style={{ color: theme.text }}>Levels</h4>
          <MdOutlineKeyboardArrowDown 
            size={20} 
            style={{ 
              color: theme.secondary,
              transform: expandedSections.levels ? 'rotate(0deg)' : 'rotate(-90deg)',
              transition: 'transform 0.3s ease'
            }} 
          />
        </div>
        
        {expandedSections.levels && (
          <div className="mt-3 space-y-3 pl-1">
            {["Beginner", "Intermediate", "Expert"].map((level, index) => (
              <div key={index} className="flex items-center group">
                <input
                  type="checkbox"
                  id={`level${index}`}
                  className="w-4 h-4 mr-3 cursor-pointer rounded"
                  style={{ 
                    accentColor: theme.primary,
                    transition: "all 0.2s ease"
                  }}
                />
                <label
                  htmlFor={`level${index}`}
                  className="cursor-pointer text-sm group-hover:font-medium transition-all"
                  style={{ color: theme.secondary }}
                >
                  {level}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Clear filters button */}
      <button
        className="w-full py-2 mt-4 text-sm font-medium rounded-lg transition-all duration-300 hover:opacity-90"
        style={{ 
          backgroundColor: `${theme.primary}20`,
          color: theme.primary,
          border: `1px solid ${theme.primary}50`
        }}
      >
        Clear All Filters
      </button>
    </div>
  );
};

export default SideBar;

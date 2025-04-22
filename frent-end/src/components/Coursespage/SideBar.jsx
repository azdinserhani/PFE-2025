import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useTheme } from "../../context/ThemeContext";

const SideBar = () => {
  const [price, setPrice] = useState(50);
  const { currentTheme, themes } = useTheme();
  const theme = themes[currentTheme];

  return (
    <div className="p-4" style={{ backgroundColor: theme.cardBg, border: `1px solid ${theme.border}`, borderRadius: '0.5rem' }}>
      <div className="">
        <p className="font-semibold" style={{ color: theme.text }}>Search course</p>
        <div className="flex items-center px-4 py-2 border gap-3 ml-4 rounded-lg hover:border-purple-500 duration-300 mt-3" 
          style={{ borderColor: theme.border }}>
          <BiSearch fontSize={25} style={{ color: theme.secondary }} />
          <input
            type="text"
            placeholder="Search"
            className="w-full outline-none"
            style={{ backgroundColor: 'transparent', color: theme.text }}
          />
        </div>
      </div>
      <div className="mt-6 ml-4">
        <p className="font-semibold" style={{ color: theme.text }}>Categories</p>
        <div className="mt-3 space-y-2">
          {[
            "Web Designing",
            "Data Science",
            "Machine Learning",
            "App Development",
            "Cyber Security",
          ].map((category, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="">
                <input
                  type="checkbox"
                  id={`check${index}`}
                  className="mr-2"
                  style={{ accentColor: theme.primary }}
                />
                <label
                  htmlFor={`check${index}`}
                  className="cursor-pointer font-semibold"
                  style={{ color: theme.secondary }}
                >
                  {category}
                </label>
              </div>
              <span style={{ 
                color: theme.primary, 
                backgroundColor: `${theme.primary}20`, 
                padding: '0.125rem 0.25rem', 
                borderRadius: '1rem' 
              }}>
                12
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6 ">
        <p className="font-semibold" style={{ color: theme.text }}>Pricing</p>
        <div className="flex items-center justify-between ml-4">
          <span style={{ color: theme.text }}>$0</span>
          <input
            type="range"
            className="w-full mx-2 cursor-pointer bg-none"
            style={{ accentColor: theme.primary }}
            min="0"
            max="200"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <span style={{ color: theme.text }}>${price}</span>
        </div>
      </div>
      <div className="mt-6 ml-4">
        <p className="font-semibold" style={{ color: theme.text }}>Levels</p>
        <div className="mt-3 space-y-2">
          {["Begining", "Intermediate", "Expert"].map((category, index) => (
            <div key={index} className="flex items-center justify-between ">
              <div className="">
                <input
                  type="checkbox"
                  id={`chec${index}`}
                  className="mr-2"
                  style={{ accentColor: theme.primary }}
                />
                <label
                  htmlFor={`chec${index}`}
                  className="cursor-pointer font-semibold"
                  style={{ color: theme.secondary }}
                >
                  {category}
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideBar;

import React from "react";
import { useTheme } from "../../context/ThemeContext";

const NewsLettre = () => {
  const { currentTheme, themes } = useTheme();
  const theme = themes[currentTheme];
  
  return (
    <div style={{ backgroundColor: theme.primary }}>
      <div className="container mx-auto flex flex-col md:flex-row h-auto md:h-[50vh]">
        <div className="flex-1 mt-10 md:flex-1/2 flex justify-center flex-col ml-7 text-center md:text-left">
          <h2 className="font-bold text-4xl" style={{ color: '#ffffff' }}>
            Subscribe to Newsletter!
          </h2>
          <p style={{ color: '#f0f0f0' }}>
            Subscribe to get latest updates and information.
          </p>
          <div className="flex rounded-4xl w-full md:w-[80%] mt-5 h-[60px]" style={{ backgroundColor: `${theme.primary}80` }}>
            <input
              type="text"
              placeholder="Enter your email :"
              className="flex-2/3 outline-none pl-3"
              style={{ backgroundColor: 'transparent', color: '#ffffff' }}
            />
            <button 
              className="flex-1/3 h-[60px] rounded-4xl duration-300 cursor-pointer hover:border-white hover:border-2"
              style={{ backgroundColor: theme.secondary }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = `${theme.primary}80`;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = theme.secondary;
              }}
            >
              Subscribe
            </button>
          </div>
        </div>
        <div className="flex-1 md:flex-1/2 relative mt-5 md:mt-0">
          <img
            src="./newsPart.png"
            alt=""
            className="w-full md:h-[447px] object-contain md:absolute md:bottom-0"
          />
        </div>
      </div>
    </div>
  );
};

export default NewsLettre;

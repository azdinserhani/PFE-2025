import React from "react";
import { IoClose } from "react-icons/io5";
import { useTheme } from "../../context/ThemeContext";

const SearchForm = ({ setSearchOpen, searchOpen }) => {
  const { currentTheme, themes } = useTheme();
  const theme = themes[currentTheme];

  return (
    <div className="w-[100%] ">
      <div className="fixed top-16 left-1/2 transform -translate-x-1/2 w-[85%] z-[9999] ">
        <form action="">
          <div
            className="shadow-lg rounded-lg relative w-[80%] mx-auto"
            style={{
              backgroundColor: theme.cardBg,
              border: `1px solid ${theme.border}`,
            }}
          >
            <input
              type="text"
              placeholder="Search..."
              className="w-full p-5 border-none outline-none"
              style={{
                backgroundColor: "transparent",
                color: theme.text,
              }}
            />
            <button
              type="button"
              className="absolute top-2 right-2 cursor-pointer p-2 rounded-full"
              onClick={() => setSearchOpen(false)}
              style={{ color: theme.secondary }}
            >
              <IoClose />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchForm;

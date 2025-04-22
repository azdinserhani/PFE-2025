import React from "react";
import { useTheme } from "../../context/ThemeContext";

const InputField = ({ label, type, id, placeholder, value, disabled, icon }) => {
  const { currentTheme, themes } = useTheme();
  const theme = themes[currentTheme];
  
  return (
    <div className="flex flex-col gap-2 w-full">
      <label 
        htmlFor={id} 
        className="font-semibold text-sm mb-1"
        style={{ color: theme.text }}
      >
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        <input
          disabled={disabled}
          value={value}
          type={type}
          id={id}
          placeholder={placeholder}
          className="w-full py-3 px-4 rounded-md outline-none transition-all duration-300"
          style={{ 
            backgroundColor: currentTheme === 'dark' ? '#2d3748' : theme.cardBg,
            color: theme.text,
            borderColor: 'transparent',
            paddingLeft: icon ? '2.5rem' : '1rem',
            caretColor: theme.primary,
          }}
        />
      </div>
    </div>
  );
};

export default InputField;

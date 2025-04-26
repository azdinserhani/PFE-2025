import React from "react";
import { useTheme } from "../../context/ThemeContext";
import { motion } from "framer-motion";

const ButtonAuth = ({
  label,
  onClick,
  type = "submit",
  variant = "primary",
  icon,
  disabled = false,
}) => {
  const { currentTheme, themes } = useTheme();
  const theme = themes[currentTheme];

  const getButtonStyles = () => {
    switch (variant) {
      case "secondary":
        return {
          backgroundColor: `${theme.primary}20`,
          color: theme.primary,
          border: `1px solid ${theme.primary}40`,
        };
      case "outline":
        return {
          backgroundColor: "transparent",
          color: theme.primary,
          border: `1px solid ${theme.primary}`,
        };
      default:
        return {
          backgroundColor: theme.primary,
          color: theme.cardBg,
          border: "none",
          boxShadow: `0 4px 14px ${theme.primary}30`,
        };
    }
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: 1.02, boxShadow: `0 6px 20px ${theme.primary}40` }}
      whileTap={{ scale: 0.98 }}
      className="py-3 px-6 font-medium rounded-lg cursor-pointer transition-all duration-300 text-center w-full flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
      style={{
        ...getButtonStyles(),
        opacity: disabled ? 0.7 : 1,
      }}
    >
      {icon && <span className="text-current">{icon}</span>}
      {label}
    </motion.button>
  );
};

export default ButtonAuth;

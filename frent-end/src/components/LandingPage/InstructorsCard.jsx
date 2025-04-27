import React from "react";
import { useTheme } from "../../context/ThemeContext";
import { motion } from "framer-motion";
import { FaStar, FaUserGraduate, FaBook } from "react-icons/fa";

const InstructorsCard = ({ item }) => {
  const { currentTheme, themes } = useTheme();
  const theme = themes[currentTheme];

  return (
    <motion.div
      className="flex flex-col gap-6 p-6 rounded-xl transition-all duration-300"
      style={{
        backgroundColor: theme.cardBg,
        border: `1px solid ${theme.border}`,
        boxShadow: `0 4px 6px -1px ${theme.primary}10`,
      }}
      whileHover={{
        y: -5,
        boxShadow: `0 8px 12px -1px ${theme.primary}20`,
      }}
    >
      <div className="relative">
        <motion.div
          className="w-28 h-28 mx-auto rounded-full overflow-hidden border-4"
          style={{ borderColor: theme.primary }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src={item.Img}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </motion.div>
        <motion.div
          className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-full text-sm font-medium"
          style={{
            backgroundColor: theme.primary,
            color: theme.cardBg,
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Top Rated
        </motion.div>
      </div>

      <div className="text-center space-y-2">
        <h3 className="text-xl font-bold" style={{ color: theme.text }}>
          {item.name}
        </h3>
        <p className="text-sm font-medium" style={{ color: theme.secondary }}>
          {item.desc}
        </p>
      </div>

      <div
        className="grid grid-cols-3 gap-2 pt-4 border-t"
        style={{ borderColor: `${theme.border}40` }}
      >
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <FaBook size={14} style={{ color: theme.primary }} />
            <span className="text-sm font-medium" style={{ color: theme.text }}>
              {item.stats.courses}
            </span>
          </div>
          <p className="text-xs" style={{ color: theme.secondary }}>
            Courses
          </p>
        </div>

        <div
          className="text-center border-x"
          style={{ borderColor: `${theme.border}40` }}
        >
          <div className="flex items-center justify-center gap-1 mb-1">
            <FaUserGraduate size={14} style={{ color: theme.primary }} />
            <span className="text-sm font-medium" style={{ color: theme.text }}>
              {item.stats.students}
            </span>
          </div>
          <p className="text-xs" style={{ color: theme.secondary }}>
            Students
          </p>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <FaStar size={14} style={{ color: theme.primary }} />
            <span className="text-sm font-medium" style={{ color: theme.text }}>
              {item.stats.rating}
            </span>
          </div>
          <p className="text-xs" style={{ color: theme.secondary }}>
            Rating
          </p>
        </div>
      </div>

      <motion.button
        className="w-full py-2 rounded-lg font-medium text-sm transition-all duration-300"
        style={{
          backgroundColor: `${theme.primary}15`,
          color: theme.primary,
          border: `1px solid ${theme.primary}40`,
        }}
        whileHover={{
          backgroundColor: theme.primary,
          color: theme.cardBg,
        }}
        whileTap={{ scale: 0.98 }}
      >
        View Profile
      </motion.button>
    </motion.div>
  );
};

export default InstructorsCard;

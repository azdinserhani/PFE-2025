import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { PiShoppingCartLight } from "react-icons/pi";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cartSlice";
import { useTheme } from "../../context/ThemeContext";

const CourseCard = ({ item }) => {
  const dispatch = useDispatch();
  const { currentTheme, themes } = useTheme();
  const theme = themes[currentTheme];

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart(item));
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="relative p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group overflow-hidden min-w-[400px] backdrop-blur-sm"
      style={{
        backgroundColor: `${theme.cardBg}ee`,
        border: `1px solid ${theme.border}`,
        boxShadow: `0 8px 32px -4px ${theme.primary}15`,
      }}
    >
      <div className="relative overflow-hidden rounded-xl mb-4">
        <motion.img
          src={item.image || "/Info1.jpg"}
          alt={item.title}
          className="h-[200px] w-full object-cover rounded-xl transition-transform duration-500 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div
        className="flex gap-4 py-2 font-medium text-sm items-center"
        style={{ color: theme.secondary }}
      >
        <span
          className="flex items-center gap-1 px-3 py-1 rounded-full text-xs"
          style={{
            backgroundColor: `${theme.primary}15`,
            color: theme.primary,
          }}
        >
          {item.students || 0} Students
        </span>
        <span
          className="flex items-center gap-1 px-3 py-1 rounded-full text-xs"
          style={{
            backgroundColor: `${theme.primary}15`,
            color: theme.primary,
          }}
        >
          {item.lessons || 0} Lessons
        </span>
      </div>

      <h3
        className="font-bold text-xl mt-2 transition-colors duration-300 group-hover:text-primary-600"
        style={{ color: theme.text }}
      >
        {item.title}
      </h3>

      <p
        className="text-sm mt-2 line-clamp-2"
        style={{ color: theme.secondary }}
      >
        {item.description}
      </p>

      {item.isEnrolled && (
        <div
          className="w-full h-2 rounded-full mt-4 overflow-hidden"
          style={{ backgroundColor: `${theme.border}50` }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{
              backgroundColor: theme.primary,
            }}
            initial={{ width: 0 }}
            animate={{ width: `${item.progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      )}

      <div
        className="flex justify-between items-center mt-6 pt-4"
        style={{ borderTop: `1px solid ${theme.border}30` }}
      >
        <div className="font-bold text-xl" style={{ color: theme.primary }}>
          ${item.price}
        </div>
        <div className="flex gap-3 items-center">
          <Link
            to={
              item.isEnrolled
                ? `/course/learn/${item.id}`
                : `/course/${item.id}`
            }
          >
            <motion.button
              whileHover={{ x: 5 }}
              className="flex items-center gap-2 transition-colors px-3 py-1 rounded-lg"
              style={{ color: theme.primary }}
            >
              <span className="text-sm font-medium">
                {item.isEnrolled ? "Continue Learning" : "View Details"}
              </span>
              <FaLongArrowAltRight />
            </motion.button>
          </Link>
          {!item.isEnrolled && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              className="flex items-center gap-2 py-2 px-4 rounded-lg transition-all duration-300 hover:shadow-lg"
              style={{
                backgroundColor: theme.primary,
                color: "#ffffff",
              }}
            >
              <PiShoppingCartLight />
              <span className="text-sm font-medium">Add to Cart</span>
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCard;

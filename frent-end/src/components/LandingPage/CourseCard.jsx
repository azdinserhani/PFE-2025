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

  console.log(item);
  
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer group overflow-hidden min-w-[400px]"
      style={{ 
        backgroundColor: theme.cardBg,
        border: `1px solid ${theme.border}`
      }}
    >
      <motion.img
        src={item.image || "/Info1.jpg"}
        alt={item.title}
        className="h-[151px] object-cover w-full rounded-lg transition-transform duration-300 ease-in-out group-hover:scale-105"
      />
      <div className="flex gap-4 py-4 font-medium text-sm" style={{ color: theme.secondary }}>
        <span>{item.students || 0} Students</span>
        <span>{item.lessons || 0} Lessons</span>
      </div>

      <h3 className="font-bold text-xl" style={{ color: theme.text }}>{item.title}</h3>
      <p className="text-sm mt-2" style={{ color: theme.secondary }}>{item.description}</p>
      {item.isEnrolled && (
        <div className="w-full h-2 rounded-full mt-4" style={{ backgroundColor: theme.border }}>
          <motion.div
            className="h-2 rounded-full"
            style={{ 
              width: `${item.progress}%`,
              backgroundColor: theme.primary
            }}
            initial={{ width: 0 }}
            animate={{ width: `${item.progress}%` }}
            transition={{ duration: 0.5 }}
          ></motion.div>
        </div>
      )}
      
      <div className="flex justify-between items-center mt-4">
        <div className="font-bold" style={{ color: theme.primary }}>${item.price}</div>
        <div className="flex gap-2 items-center">
          <Link to={item.isEnrolled ? `/course/learn/${item.id}` : `/course/${item.id}`}>
            <button 
              className="flex items-center gap-1 transition-colors cursor-pointer"
              style={{ color: theme.primary }}
            >
              <span>{item.isEnrolled ? "Continue Learning" : "View Details"}</span>
              <FaLongArrowAltRight />
            </button>
          </Link>
          {!item.isEnrolled && (
            <button 
              onClick={handleAddToCart}
              className="flex items-center gap-1 py-1 px-3 rounded-md transition-colors cursor-pointer"
              style={{ 
                backgroundColor: theme.primary,
                color: '#ffffff'
              }}
            >
              <PiShoppingCartLight />
              <span>Add to Cart</span>
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCard;

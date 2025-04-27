import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { PiShoppingCartLight } from "react-icons/pi";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cartSlice";
import { useTheme } from "../../context/ThemeContext";
import { fadeIn } from "../../utils/animations";

const CourseCard = ({ item, index }) => {
  const dispatch = useDispatch();
  const { currentTheme, themes } = useTheme();
  const theme = themes[currentTheme];

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart(item));
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        mass: 0.8,
        delay: index * 0.1,
      },
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
      },
    },
  };

  const imageVariants = {
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true, amount: 0.25 }}
      className="relative p-6 rounded-2xl shadow-lg transition-all duration-300 cursor-pointer group overflow-hidden min-w-[400px] backdrop-blur-sm"
      style={{
        backgroundColor: theme.cardBg,
        borderColor: theme.border,
        borderWidth: "1px",
      }}
    >
      <div className="relative overflow-hidden rounded-xl mb-4">
        <motion.img
          src={item.image || "/Info1.jpg"}
          alt={item.title}
          className="w-full h-48 object-cover"
          variants={imageVariants}
          loading="lazy"
        />
        <AnimatePresence>
          {item.isEnrolled && (
            <motion.div
              className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary to-primary/80"
              style={{
                backgroundColor: theme.primary,
                width: `${item.progress || 0}%`,
              }}
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: `${item.progress || 0}%`, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          )}
        </AnimatePresence>
      </div>

      <div className="space-y-4">
        <motion.h3
          className="text-xl font-semibold line-clamp-2"
          style={{ color: theme.text }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {item.title}
        </motion.h3>
        <motion.p
          className="text-sm line-clamp-2"
          style={{ color: theme.secondary }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {item.description}
        </motion.p>

        <div className="flex items-center justify-between">
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <span style={{ color: theme.text }}>{item.lessons} lessons</span>
            <span style={{ color: theme.secondary }}>•</span>
            <span style={{ color: theme.text }}>{item.students} students</span>
          </motion.div>
          <motion.span
            className="text-lg font-semibold"
            style={{ color: theme.primary }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            ${item.price}
          </motion.span>
        </div>

        <motion.div
          className="flex items-center justify-between gap-4 pt-4 border-t"
          style={{ borderColor: theme.border }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Link
            to={
              item.isEnrolled
                ? `/course/learn/${item.id}`
                : `/course/${item.id}`
            }
            className="flex-1"
          >
            <motion.button
              className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg transition-all duration-300"
              style={{
                backgroundColor: `${theme.primary}15`,
                color: theme.primary,
              }}
              whileHover={{
                backgroundColor: `${theme.primary}25`,
                gap: "12px",
              }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-sm font-medium">
                {item.isEnrolled ? "Continue Learning" : "View Details"}
              </span>
              <motion.div
                animate={{ x: item.isEnrolled ? 0 : [0, 4, 0] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
              >
                <FaLongArrowAltRight />
              </motion.div>
            </motion.button>
          </Link>

          {!item.isEnrolled && (
            <motion.button
              onClick={handleAddToCart}
              className="flex items-center gap-2 py-2 px-4 rounded-lg transition-all duration-300"
              style={{
                backgroundColor: theme.primary,
                color: "#ffffff",
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{
                  rotate: [0, 15, -15, 0],
                  scale: [1, 1.2, 1.2, 1],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
              >
                <PiShoppingCartLight />
              </motion.div>
              <span className="text-sm font-medium">Add to Cart</span>
            </motion.button>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CourseCard;

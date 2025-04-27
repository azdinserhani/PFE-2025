import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowUp } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const { currentTheme, themes } = useTheme();
  const theme = themes[currentTheme];

  // Handle route change scroll
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Toggle button visibility based on scroll position
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Smooth scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
              type: "spring",
              stiffness: 260,
              damping: 20,
            },
          }}
          exit={{
            opacity: 0,
            scale: 0,
            y: 20,
            transition: {
              duration: 0.2,
            },
          }}
          whileHover={{
            scale: 1.1,
            boxShadow: `0 8px 25px ${theme.primary}50`,
          }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-8 right-8 p-3 rounded-full shadow-lg z-50"
          style={{
            backgroundColor: theme.primary,
            color: "#fff",
            border: `2px solid ${theme.cardBg}`,
          }}
        >
          <motion.div
            animate={{
              y: [0, -3, 0],
              transition: {
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              },
            }}
          >
            <FaArrowUp size={20} />
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;

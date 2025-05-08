import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { useTheme } from "../../context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { BiSearch } from "react-icons/bi";
import { useNavigate } from "react-router";

const SearchForm = ({ setSearchOpen }) => {
  const { currentTheme, themes } = useTheme();
  const theme = themes[currentTheme];
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to courses page with search query
      navigate(`/courses?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
    }
  };

  const formVariants = {
    hidden: {
      opacity: 0,
      y: -20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.95,
      transition: {
        duration: 0.2,
      },
    },
  };

  const inputVariants = {
    focus: {
      boxShadow: `0 0 0 2px ${theme.primary}30`,
      scale: 1.01,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
      },
    },
  };

  return (
    <>
      <div className="fixed inset-0 z-[60]">
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={ () => setSearchOpen(false) }
        />
        <div className="relative w-full max-w-2xl mx-auto mt-20 px-4">
          <motion.form
            variants={ formVariants }
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative"
            onSubmit={ handleSearch }
          >
            <motion.div
              className="shadow-xl rounded-xl relative w-full overflow-hidden"
              style={ {
                backgroundColor: theme.cardBg,
                border: `1px solid ${theme.border}`,
              } }
              whileHover={ { boxShadow: `0 8px 30px ${theme.primary}20` } }
            >
              <motion.div
                className="flex items-center px-6 py-4 gap-4"
                variants={ inputVariants }
                whileFocus="focus"
              >
                <button
                  type="submit"
                  className="text-2xl flex-shrink-0 cursor-pointer"
                  style={ { color: theme.secondary } }
                >
                  <BiSearch />
                </button>
                <motion.input
                  type="text"
                  placeholder="Search courses, instructors, or topics..."
                  className="w-full border-none outline-none text-lg bg-transparent"
                  style={ {
                    color: theme.text,
                    caretColor: theme.primary,
                  } }
                  value={ searchQuery }
                  onChange={ (e) => setSearchQuery(e.target.value) }
                  initial={ { opacity: 0 } }
                  animate={ { opacity: 1 } }
                  transition={ { delay: 0.2 } }
                  autoFocus
                />
                <AnimatePresence>
                  { searchQuery && (
                    <motion.button
                      type="button"
                      className="p-2 rounded-full hover:bg-opacity-10 transition-colors flex-shrink-0"
                      onClick={ () => setSearchQuery("") }
                      style={ {
                        color: theme.secondary,
                        backgroundColor: `${theme.primary}10`,
                      } }
                      whileHover={ {
                        backgroundColor: `${theme.primary}20`,
                        scale: 1.1,
                      } }
                      whileTap={ { scale: 0.95 } }
                      initial={ { opacity: 0, scale: 0.8 } }
                      animate={ { opacity: 1, scale: 1 } }
                      exit={ { opacity: 0, scale: 0.8 } }
                    >
                      <IoClose className="text-xl" />
                    </motion.button>
                  ) }
                </AnimatePresence>
              </motion.div>
            </motion.div>

            <motion.button
              type="button"
              className="absolute -right-2 top-1/2 -translate-y-1/2 p-2 rounded-full"
              onClick={ () => setSearchOpen(false) }
              style={ {
                color: "#fff",
                backgroundColor: `${theme.primary}`,
              } }
              whileHover={ {
                scale: 1.1,
              } }
              whileTap={ { scale: 0.9 } }
            >
              <IoClose className="text-xl" />
            </motion.button>
          </motion.form>

          <AnimatePresence>
            { searchQuery && (
              <motion.div
                className="mt-2 rounded-xl shadow-xl overflow-hidden"
                style={ {
                  backgroundColor: theme.cardBg,
                  border: `1px solid ${theme.border}`,
                } }
                initial={ { opacity: 0, y: -10 } }
                animate={ { opacity: 1, y: 0 } }
                exit={ { opacity: 0, y: -10 } }
              >
                <div
                  className="p-6 text-center"
                  style={ { color: theme.secondary } }
                >
                  Press Enter to search for "{ searchQuery }"
                </div>
              </motion.div>
            ) }
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default SearchForm;

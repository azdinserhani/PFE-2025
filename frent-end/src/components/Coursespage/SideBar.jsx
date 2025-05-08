import React, { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { IoFilterOutline } from "react-icons/io5";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useTheme } from "../../context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { getCategories } from "../../redux/ApiCalls";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [categories, setCategories] = useState([]);
  const [price, setPrice] = useState(50);
  const [isHovered, setIsHovered] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    pricing: true,
    levels: true,
  });
  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getCategories();
      console.log(categories);
      setCategories(categories);
    };
    fetchCategories();
  }, [isOpen]);
  const { currentTheme, themes } = useTheme();
  const theme = themes[currentTheme];

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  };

  return (
    <div className="relative">
      {/* Toggle Button */ }
      <motion.button
        className="absolute -right-3 top-0 z-20 cursor-pointer p-2 rounded-full transition-all duration-300"
        style={ {
          backgroundColor: theme.cardBg,
          border: `1px solid ${theme.border}`,
          boxShadow: `0 2px 8px ${theme.primary}20`,
        } }
        onClick={ () => setIsOpen(!isOpen) }
        whileHover={ { scale: 1.1 } }
        whileTap={ { scale: 0.9 } }
      >
        <motion.div
          animate={ { rotate: isOpen ? 180 : 0 } }
          transition={ { duration: 0.3 } }
        >
          <IoFilterOutline size={ 20 } style={ { color: theme.primary } } />
        </motion.div>
      </motion.button>

      {/* Sidebar Content */ }
      <AnimatePresence>
        { isOpen && (
          <motion.div
            className="p-5 rounded-lg shadow-sm"
            style={ {
              backgroundColor: theme.cardBg,
              border: `1px solid ${theme.border}`,
            } }
            initial={ { width: 0, opacity: 0 } }
            animate={ {
              width: "auto",
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeInOut",
              },
            } }
            exit={ {
              width: 0,
              opacity: 0,
              transition: {
                duration: 0.3,
                ease: "easeInOut",
              },
            } }
          >
            <motion.div
              variants={ containerVariants }
              initial="hidden"
              animate="visible"
            >
              {/* Existing sidebar content */ }
              <motion.div
                className="flex items-center justify-between mb-6"
                variants={ itemVariants }
              >
                <h3 className="text-lg font-bold" style={ { color: theme.text } }>
                  Filters
                </h3>
              </motion.div>

              {/* Search */ }
              <motion.div className="mb-6" variants={ itemVariants }>
                <motion.div
                  className="flex items-center px-4 py-3 gap-3 rounded-lg border-2 hover:border-opacity-100 transition-all duration-300"
                  style={ {
                    borderColor: theme.border,
                    backgroundColor: `${theme.cardBg === "#ffffff" ? "#f9f9f9" : theme.background
                      }`,
                  } }
                  whileHover={ {
                    boxShadow: `0 4px 15px ${theme.primary}20`,
                    borderColor: theme.primary,
                  } }
                >
                  <BiSearch fontSize={ 20 } style={ { color: theme.secondary } } />
                  <motion.input
                    type="text"
                    placeholder="Search courses..."
                    className="w-full outline-none text-sm"
                    style={ {
                      backgroundColor: "transparent",
                      color: theme.text,
                      caretColor: theme.primary,
                    } }
                    whileFocus={ {
                      scale: 1.01,
                    } }
                  />
                </motion.div>
              </motion.div>

              {/* Categories */ }
              <motion.div className="mb-6" variants={ itemVariants }>
                <motion.div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={ () => toggleSection("categories") }
                  whileHover={ { x: 3 } }
                  whileTap={ { scale: 0.98 } }
                >
                  <h4
                    className="font-semibold mb-3"
                    style={ { color: theme.text } }
                  >
                    Categories
                  </h4>
                  <motion.div
                    animate={ {
                      rotate: expandedSections.categories ? 0 : -90,
                      color: expandedSections.categories
                        ? theme.primary
                        : theme.secondary,
                    } }
                    transition={ { duration: 0.3 } }
                  >
                    <MdOutlineKeyboardArrowDown size={ 20 } />
                  </motion.div>
                </motion.div>

                <AnimatePresence>
                  { expandedSections.categories && (
                    <motion.div
                      className="mt-3 space-y-3 pl-1"
                      initial={ { height: 0, opacity: 0 } }
                      animate={ { height: "auto", opacity: 1 } }
                      exit={ { height: 0, opacity: 0 } }
                      transition={ { duration: 0.3, ease: "easeInOut" } }
                    >
                      { categories?.map((category, index) => (
                        <motion.div
                          key={ index }
                          className="flex items-center justify-between group"
                          variants={ itemVariants }
                          whileHover={ { x: 3 } }
                        >
                          <div className="flex items-center">
                            <motion.input
                              type="checkbox"
                              id={ `check${index}` }
                              className="w-4 h-4 mr-3 cursor-pointer rounded"
                              style={ {
                                accentColor: theme.primary,
                              } }
                              whileHover={ { scale: 1.1 } }
                              whileTap={ { scale: 0.9 } }
                            />
                            <motion.label
                              htmlFor={ `check${index}` }
                              className="cursor-pointer text-sm group-hover:font-medium"
                              style={ { color: theme.secondary } }
                              whileHover={ { color: theme.primary } }
                            >
                              { category.name }
                            </motion.label>
                          </div>
                          <motion.span
                            className="text-xs px-2 py-1 rounded-full text-center min-w-[30px]"
                            style={ {
                              color: theme.primary,
                              backgroundColor: `${theme.primary}15`,
                            } }
                            whileHover={ {
                              backgroundColor: `${theme.primary}25`,
                              scale: 1.05,
                            } }
                          >
                            { category.course_count }
                          </motion.span>
                        </motion.div>
                      )) }
                    </motion.div>
                  ) }
                </AnimatePresence>
              </motion.div>

              {/* Pricing */ }
              <motion.div className="mb-6" variants={ itemVariants }>
                <motion.div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={ () => toggleSection("pricing") }
                  whileHover={ { x: 3 } }
                  whileTap={ { scale: 0.98 } }
                >
                  <h4
                    className="font-semibold mb-3"
                    style={ { color: theme.text } }
                  >
                    Pricing
                  </h4>
                  <motion.div
                    animate={ {
                      rotate: expandedSections.pricing ? 0 : -90,
                      color: expandedSections.pricing
                        ? theme.primary
                        : theme.secondary,
                    } }
                    transition={ { duration: 0.3 } }
                  >
                    <MdOutlineKeyboardArrowDown size={ 20 } />
                  </motion.div>
                </motion.div>

                <AnimatePresence>
                  { expandedSections.pricing && (
                    <motion.div
                      className="mt-3 px-1"
                      initial={ { height: 0, opacity: 0 } }
                      animate={ { height: "auto", opacity: 1 } }
                      exit={ { height: 0, opacity: 0 } }
                      transition={ { duration: 0.3, ease: "easeInOut" } }
                    >
                      <div className="flex items-center justify-between mb-3">
                        <motion.span
                          className="text-sm font-medium px-2"
                          style={ { color: theme.text } }
                          whileHover={ { scale: 1.05 } }
                        >
                          $0
                        </motion.span>
                        <motion.span
                          className="text-sm font-medium px-2"
                          style={ { color: theme.primary } }
                          whileHover={ { scale: 1.05 } }
                        >
                          ${ price }
                        </motion.span>
                      </div>
                      <motion.input
                        type="range"
                        className="w-full h-2 appearance-none rounded-lg cursor-pointer"
                        style={ {
                          accentColor: theme.primary,
                          background: `linear-gradient(to right, ${theme.primary
                            } 0%, ${theme.primary} ${price / 2}%, ${theme.border
                            } ${price / 2}%, ${theme.border} 100%)`,
                        } }
                        min="0"
                        max="200"
                        value={ price }
                        onChange={ (e) => setPrice(e.target.value) }
                        whileHover={ { scale: 1.02 } }
                        whileTap={ { scale: 0.98 } }
                      />
                    </motion.div>
                  ) }
                </AnimatePresence>
              </motion.div>

              {/* Levels */ }
              <motion.div className="mb-4" variants={ itemVariants }>
                <motion.div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={ () => toggleSection("levels") }
                  whileHover={ { x: 3 } }
                  whileTap={ { scale: 0.98 } }
                >
                  <h4
                    className="font-semibold mb-3"
                    style={ { color: theme.text } }
                  >
                    Levels
                  </h4>
                  <motion.div
                    animate={ {
                      rotate: expandedSections.levels ? 0 : -90,
                      color: expandedSections.levels
                        ? theme.primary
                        : theme.secondary,
                    } }
                    transition={ { duration: 0.3 } }
                  >
                    <MdOutlineKeyboardArrowDown size={ 20 } />
                  </motion.div>
                </motion.div>

                <AnimatePresence>
                  { expandedSections.levels && (
                    <motion.div
                      className="mt-3 space-y-3 pl-1"
                      initial={ { height: 0, opacity: 0 } }
                      animate={ { height: "auto", opacity: 1 } }
                      exit={ { height: 0, opacity: 0 } }
                      transition={ { duration: 0.3, ease: "easeInOut" } }
                    >
                      { ["Beginner", "Intermediate", "Expert"].map(
                        (level, index) => (
                          <motion.div
                            key={ index }
                            className="flex items-center group"
                            variants={ itemVariants }
                            whileHover={ { x: 3 } }
                          >
                            <motion.input
                              type="checkbox"
                              id={ `level${index}` }
                              className="w-4 h-4 mr-3 cursor-pointer rounded"
                              style={ {
                                accentColor: theme.primary,
                              } }
                              whileHover={ { scale: 1.1 } }
                              whileTap={ { scale: 0.9 } }
                            />
                            <motion.label
                              htmlFor={ `level${index}` }
                              className="cursor-pointer text-sm group-hover:font-medium"
                              style={ { color: theme.secondary } }
                              whileHover={ { color: theme.primary } }
                            >
                              { level }
                            </motion.label>
                          </motion.div>
                        )
                      ) }
                    </motion.div>
                  ) }
                </AnimatePresence>
              </motion.div>

              {/* Clear filters button */ }
              <motion.button
                className="w-full py-2 mt-4 text-sm font-medium rounded-lg transition-all duration-300"
                style={ {
                  backgroundColor: `${theme.primary}20`,
                  color: theme.primary,
                  border: `1px solid ${theme.primary}50`,
                } }
                whileHover={ {
                  scale: 1.02,
                  backgroundColor: `${theme.primary}30`,
                } }
                whileTap={ { scale: 0.98 } }
              >
                Clear All Filters
              </motion.button>
            </motion.div>
          </motion.div>
        ) }
      </AnimatePresence>
    </div>
  );
};

export default SideBar;

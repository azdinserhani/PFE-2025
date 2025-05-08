import { VscSearch } from "react-icons/vsc";
import { IoCartOutline } from "react-icons/io5";
import { useState, useEffect, useRef } from "react";
import ProfileMenu from "../ProfileMenu";
import { Link, useLocation } from "react-router";
import SearchForm from "../SideBar/SearchForm";
import { useSelector } from "react-redux";
import { useTheme } from "../../context/ThemeContext";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import { FaBookOpen, FaPalette, FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn, slideIn } from "../../utils/animations";
import { useTranslation } from "react-i18next";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { items } = useSelector((state) => state.cart);
  const { currentTheme, changeTheme, themes } = useTheme();
  const theme = themes[currentTheme];
  const itemCount = items.length;
  const profileRef = useRef(null);
  const themeRef = useRef(null);
  const location = useLocation();
  const currentPath = location.pathname;
  const { user } = useSelector((state) => state.user);
  const { t } = useTranslation();
  // Force re-render when cart changes
  useEffect(() => {
    // This empty effect will cause the component to re-render when items changes
  }, [items]);

  // Modified click handler that properly manages menu state
  const toggleProfileMenu = (e) => {
    e.stopPropagation(); // Prevent event bubbling
    setMenuOpen(!menuOpen);

    // Close theme menu when opening profile menu
    if (!menuOpen) {
      setThemeMenuOpen(false);
    }
  };

  const toggleThemeMenu = (e) => {
    e.stopPropagation(); // Prevent event bubbling
    setThemeMenuOpen(!themeMenuOpen);

    // Close profile menu when opening theme menu
    if (!themeMenuOpen) {
      setMenuOpen(false);
    }
  };

  // Close menus on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
      if (themeRef.current && !themeRef.current.contains(event.target)) {
        setThemeMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleThemeChange = (themeName) => {
    changeTheme(themeName);
    setThemeMenuOpen(false);
  };

  // Helper function to determine if a link is active
  const isActiveLink = (path) => {
    if (path === "/" && currentPath === "/") return true;
    if (path !== "/" && currentPath.startsWith(path)) return true;
    return false;
  };

  const navVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        mass: 0.5,
      },
    },
  };

  const menuVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.2,
      },
    },
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <motion.div
      variants={ navVariants }
      initial="hidden"
      animate="visible"
      className="sticky top-0 w-full backdrop-blur-sm transition-all duration-300 z-[9999]"
      style={ {
        backgroundColor: `${theme.background}99`,
        borderBottom: `1px solid ${theme.border}`,
      } }
    >
      <div className="container mx-auto flex justify-between items-center py-3 px-4">
        {/* Left section: Hamburger + Logo */ }
        <div className="flex items-center gap-2">
          {/* Mobile Menu Button */ }
          <button
            className="xl:hidden p-2 rounded-md hover:bg-opacity-10"
            onClick={ toggleMobileMenu }
            style={ { color: theme.text } }
          >
            { mobileMenuOpen ? <FaTimes size={ 24 } /> : <FaBars size={ 24 } /> }
          </button>
          <motion.div
            className="flex items-center"
            variants={ fadeIn("right", 0.2) }
            initial="hidden"
            animate="show"
          >
            <Link to={ "/" } className="flex items-center">
              <div
                className="flex items-center gap-1 text-lg md:text-xl font-bold"
                style={ { color: theme.primary } }
              >
                <FaBookOpen className="hidden md:block w-8 h-8 md:w-10 md:h-10" color={ theme.primary } />
                <span className="hidden sm:inline">EdClub</span>
              </div>
            </Link>
          </motion.div>
        </div>

        {/* Desktop Navigation */ }
        <motion.ul
          className="hidden xl:flex list-none gap-5 text-[14px] items-center font-medium"
          variants={ fadeIn("down", 0.3) }
          initial="hidden"
          animate="show"
        >
          <li className="cursor-pointer transition-colors duration-300">
            <Link
              to={ "/" }
              style={ {
                color: isActiveLink("/") ? theme.primary : theme.text,
                fontWeight: isActiveLink("/") ? "bold" : "medium",
                borderBottom: isActiveLink("/")
                  ? `2px solid ${theme.primary}`
                  : "none",
                paddingBottom: "2px",
              } }
            >
              { t("navbar.home") }
            </Link>
          </li>
          <li className="cursor-pointer transition-colors duration-300">
            <Link
              to={ "/courses" }
              style={ {
                color: isActiveLink("/courses") ? theme.primary : theme.text,
                fontWeight: isActiveLink("/courses") ? "bold" : "medium",
                borderBottom: isActiveLink("/courses")
                  ? `2px solid ${theme.primary}`
                  : "none",
                paddingBottom: "2px",
              } }
            >
              { t("navbar.courses") }
            </Link>
          </li>
          <li className="cursor-pointer transition-colors duration-300">
            <Link
              to={ "/about" }
              style={ {
                color: isActiveLink("/about") ? theme.primary : theme.text,
                fontWeight: isActiveLink("/about") ? "bold" : "medium",
                borderBottom: isActiveLink("/about")
                  ? `2px solid ${theme.primary}`
                  : "none",
                paddingBottom: "2px",
              } }
            >
              { t("navbar.about_us") }
            </Link>
          </li>
          <li className="cursor-pointer transition-colors duration-300">
            <Link
              to={ "/contact" }
              style={ {
                color: isActiveLink("/contact") ? theme.primary : theme.text,
                fontWeight: isActiveLink("/contact") ? "bold" : "medium",
                borderBottom: isActiveLink("/contact")
                  ? `2px solid ${theme.primary}`
                  : "none",
                paddingBottom: "2px",
              } }
            >
              { t("navbar.contact_us") }
            </Link>
          </li>
        </motion.ul>

        {/* Mobile Navigation Menu (slide from left) */ }
       
          <AnimatePresence>
            { mobileMenuOpen && (
              <motion.div
                initial={ { opacity: 0, x: -40 } }
                animate={ { opacity: 1, x: 0 } }
                exit={ { opacity: 0, x: -40 } }
                className="fixed top-16 left-0 bottom-0 w-3/4 max-w-xs xl:hidden z-[9999] shadow-lg "
                
              >
              <ul className="flex flex-col py-8 px-6 space-y-2 " style={ {
                backgroundColor: theme.background,
                borderRight: `1px solid ${theme.border}`,
              } }>
                  <li>
                    <Link
                      to="/"
                      className={ `block py-3 px-3 rounded-md text-base font-medium transition-colors duration-200 ${isActiveLink("/") ? "bg-[rgba(120,80,255,0.07)] text-[color:var(--tw-prose-links,theme(colors.purple.600))] font-bold" : "hover:bg-[rgba(120,80,255,0.04)]"}` }
                      style={ {
                        color: isActiveLink("/") ? theme.primary : theme.text,
                      } }
                      onClick={ () => setMobileMenuOpen(false) }
                    >
                      { t("navbar.home") }
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/courses"
                      className={ `block py-3 px-3 rounded-md text-base font-medium transition-colors duration-200 ${isActiveLink("/courses") ? "bg-[rgba(120,80,255,0.07)] text-[color:var(--tw-prose-links,theme(colors.purple.600))] font-bold" : "hover:bg-[rgba(120,80,255,0.04)]"}` }
                      style={ {
                        color: isActiveLink("/courses") ? theme.primary : theme.text,
                      } }
                      onClick={ () => setMobileMenuOpen(false) }
                    >
                      { t("navbar.courses") }
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/about"
                      className={ `block py-3 px-3 rounded-md text-base font-medium transition-colors duration-200 ${isActiveLink("/about") ? "bg-[rgba(120,80,255,0.07)] text-[color:var(--tw-prose-links,theme(colors.purple.600))] font-bold" : "hover:bg-[rgba(120,80,255,0.04)]"}` }
                      style={ {
                        color: isActiveLink("/about") ? theme.primary : theme.text,
                      } }
                      onClick={ () => setMobileMenuOpen(false) }
                    >
                      { t("navbar.about_us") }
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/contact"
                      className={ `block py-3 px-3 rounded-md text-base font-medium transition-colors duration-200 ${isActiveLink("/contact") ? "bg-[rgba(120,80,255,0.07)] text-[color:var(--tw-prose-links,theme(colors.purple.600))] font-bold" : "hover:bg-[rgba(120,80,255,0.04)]"}` }
                      style={ {
                        color: isActiveLink("/contact") ? theme.primary : theme.text,
                      } }
                      onClick={ () => setMobileMenuOpen(false) }
                    >
                      { t("navbar.contact_us") }
                    </Link>
                  </li>
                </ul>
              </motion.div>
            ) }
          </AnimatePresence>
        
        {/* Right section: Action buttons */ }
        <motion.div
          className="flex items-center gap-2 md:gap-3"
          variants={ fadeIn("left", 0.4) }
          initial="hidden"
          animate="show"
        >
          { !user ? (
            <motion.a
              whileHover={ { scale: 1.05 } }
              whileTap={ { scale: 0.95 } }
              className="cursor-pointer duration-300 py-1.5 px-2 md:px-3 rounded-md text-xs md:text-sm font-medium"
              style={ {
                backgroundColor: theme.primary,
                color: "#ffffff",
              } }
            >
              <Link to={ "/signin" }>{ t("navbar.sign_in") }</Link>
            </motion.a>
          ) : (
            <div ref={ profileRef } className="relative z-20">
              <motion.button
                whileHover={ { scale: 1.1 } }
                whileTap={ { scale: 0.9 } }
                className="rounded-full h-7 w-7 md:h-8 md:w-8 overflow-hidden cursor-pointer focus:outline-none"
                onClick={ toggleProfileMenu }
                style={ { border: `1px solid ${theme.border}` } }
                aria-label="Profile menu"
              >
                <img
                  src="https://ui-avatars.com/api/?background=random&name=User"
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              </motion.button>

              <AnimatePresence>
                { menuOpen && (
                  <motion.div
                    variants={ menuVariants }
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute top-full right-0 mt-2 shadow-lg rounded-md overflow-hidden z-[9999] w-48"
                    style={ {
                      backgroundColor: theme.cardBg,
                      border: `1px solid ${theme.border}`,
                    } }
                  >
                    <ProfileMenu />
                  </motion.div>
                ) }
              </AnimatePresence>
            </div>
          ) }

          <motion.button
            whileHover={ { scale: 1.1 } }
            whileTap={ { scale: 0.9 } }
            className="flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-full transition-colors"
            onClick={ () => setSearchOpen(true) }
            style={ { color: theme.text } }
          >
            <VscSearch size={ 16 } className="md:w-[18px] md:h-[18px]" />
          </motion.button>

          <AnimatePresence>
            { searchOpen && (
              <SearchForm setSearchOpen={ () => setSearchOpen(false) } />
            ) }
          </AnimatePresence>

          <div className="relative" ref={ themeRef }>
            <motion.button
              whileHover={ { scale: 1.1 } }
              whileTap={ { scale: 0.9 } }
              className="flex items-center cursor-pointer justify-center w-7 h-7 md:w-8 md:h-8 rounded-full transition-colors"
              style={ { color: theme.text } }
              onClick={ toggleThemeMenu }
              aria-label="Change theme"
            >
              { currentTheme === "dark" ? (
                <MdOutlineDarkMode size={ 16 } className="md:w-[18px] md:h-[18px]" />
              ) : currentTheme === "light" ? (
                <MdOutlineLightMode size={ 16 } className="md:w-[18px] md:h-[18px]" />
              ) : (
                <FaPalette size={ 16 } className="md:w-[18px] md:h-[18px]" />
              ) }
            </motion.button>

            <AnimatePresence>
              { themeMenuOpen && (
                <motion.div
                  variants={ menuVariants }
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute right-0 mt-2 py-1 rounded-md shadow-lg z-[9999] min-w-[140px]"
                  style={ {
                    backgroundColor: theme.cardBg,
                    border: `1px solid ${theme.border}`,
                  } }
                >
                  { Object.entries(themes).map(([themeKey, themeValue]) => (
                    <motion.button
                      key={ themeKey }
                      whileHover={ { x: 5 } }
                      className="block w-full text-left px-3 py-1.5 text-sm transition-colors cursor-pointer"
                      style={ {
                        color:
                          themeKey === currentTheme
                            ? theme.primary
                            : theme.text,
                        backgroundColor:
                          themeKey === currentTheme
                            ? `${theme.primary}10`
                            : "transparent",
                      } }
                      onClick={ () => handleThemeChange(themeKey) }
                    >
                      { themeValue.name }
                    </motion.button>
                  )) }
                </motion.div>
              ) }
            </AnimatePresence>
          </div>

          <motion.div whileHover={ { scale: 1.1 } } whileTap={ { scale: 0.9 } }>
            <Link
              to="/cart"
              className="relative flex items-center justify-center w-7 h-7 md:w-8 md:h-8"
            >
              <div
                className="flex items-center justify-center"
                style={ { color: theme.text } }
              >
                <IoCartOutline size={ 16 } className="md:w-[18px] md:h-[18px]" />
              </div>
              <AnimatePresence>
                { itemCount > 0 && (
                  <motion.span
                    initial={ { scale: 0 } }
                    animate={ { scale: 1 } }
                    exit={ { scale: 0 } }
                    className="absolute -top-1 -right-1 text-white text-[8px] md:text-[10px] rounded-full h-3 w-3 md:h-4 md:w-4 flex items-center justify-center"
                    style={ { backgroundColor: theme.primary } }
                  >
                    { itemCount }
                  </motion.span>
                ) }
              </AnimatePresence>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default NavBar;

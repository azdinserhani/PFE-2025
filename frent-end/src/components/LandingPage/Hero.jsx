import { FaDisplay } from "react-icons/fa6";
import { FaLongArrowAltRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { useTranslation } from "react-i18next";
const Hero = () => {
  const { currentTheme, themes } = useTheme();
  const theme = themes[currentTheme];
  const { t } = useTranslation();
  return (
    <motion.div
      className="container mx-auto flex flex-col lg:flex-row h-[calc(100vh-60px)]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{ backgroundColor: theme.background }}
    >
      <motion.div
        className="flex flex-1 lg:flex-1/2 items-center h-full"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex flex-col justify-center space-y-4 px-4 lg:px-0">
          <motion.h2
            className="text-5xl font-semibold w-[80%]"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ color: theme.text }}
          >
            {t("hero.title")}
          </motion.h2>
          <motion.p
            className="text-sm lg:text-base"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{ color: theme.secondary }}
          >
            {t("hero.description")}
          </motion.p>
          <motion.button
            className="flex items-center gap-2 p-4 rounded-sm text-white w-40 cursor-pointer hover:rotate-6 duration-300"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{ backgroundColor: theme.primary }}
          >
            {t("hero.view_courses")}
            <FaLongArrowAltRight />
          </motion.button>
        </div>
      </motion.div>
      <motion.div
        className="flex-1 lg:flex-1/2 relative mt-6 lg:mt-0"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div
          className="absolute h-6 w-6 lg:h-10 lg:w-10 rounded-lg top-2 lg:top-5 left-5 lg:left-10 animate-spin-slow"
          style={{ backgroundColor: `${theme.primary}20` }}
        ></div>
        <div className="relative">
          <motion.img
            src="./girl.png"
            alt=""
            className="h-120 lg:h-180 absolute z-50"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          />
          <div
            className="h-70 w-70 lg:h-150 lg:w-150 absolute rounded-full top-3 lg:top-6 animate-pulse"
            style={{ backgroundColor: theme.primary }}
          ></div>
        </div>

        <motion.div
          className="flex absolute items-center gap-3 py-2 px-4 lg:py-3 lg:px-8 rounded-lg shadow-2xl top-12 lg:top-24 left-2 lg:left-5"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          style={{ backgroundColor: theme.cardBg }}
        >
          <FaDisplay
            fontSize={20}
            lg:fontSize={25}
            style={{ color: theme.primary }}
          />
          <div>
            <p
              className="text-sm lg:text-base"
              style={{ color: theme.secondary }}
            >
              {t("hero.online_course")}
            </p>
            <span
              className="font-semibold text-xl lg:text-2xl"
              style={{ color: theme.text }}
            >
              100+
            </span>
          </div>
        </motion.div>
        <motion.div
          className="flex flex-col absolute items-center gap-3 py-2 px-4 lg:py-3 lg:px-8 rounded-lg shadow-2xl bottom-20 lg:bottom-40 right-10 lg:right-100 z-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          style={{ backgroundColor: theme.cardBg }}
        >
          <p
            className="text-sm lg:text-base"
            style={{ color: theme.secondary }}
          >
            {t("hero.our_instructors")}
          </p>
          <div className="flex">
            <div
              className="h-5 w-5 lg:h-7 lg:w-7 rounded-full -ml-2 lg:-ml-3 border border-white outline-1 cursor-pointer hover:z-10 duration-300"
              style={{ backgroundColor: theme.primary }}
            ></div>
            <div
              className="h-5 w-5 lg:h-7 lg:w-7 rounded-full -ml-2 lg:-ml-3 border border-white outline-1 cursor-pointer hover:z-10 duration-300"
              style={{ backgroundColor: theme.primary }}
            ></div>
            <div
              className="h-5 w-5 lg:h-7 lg:w-7 rounded-full -ml-2 lg:-ml-3 border border-white outline-1 cursor-pointer hover:z-10 duration-300"
              style={{ backgroundColor: theme.primary }}
            ></div>
            <div
              className="h-5 w-5 lg:h-7 lg:w-7 rounded-full -ml-2 lg:-ml-3 border border-white outline-1 cursor-pointer hover:z-10 duration-300"
              style={{ backgroundColor: theme.primary }}
            ></div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Hero;

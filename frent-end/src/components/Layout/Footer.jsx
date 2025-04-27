import React from "react";
import { CiLocationOn } from "react-icons/ci";
import { FaPhoneVolume } from "react-icons/fa6";
import { CiLinkedin } from "react-icons/ci";
import { LuFacebook } from "react-icons/lu";
import { FaInstagram } from "react-icons/fa";
import { CiTwitter } from "react-icons/ci";
import { MdOutlineEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";

const Footer = () => {
  const { currentTheme, themes } = useTheme();
  const theme = themes[currentTheme];

  const backgroundVariants = {
    dark: {
      background: "linear-gradient(to bottom, #111827, #000000)",
      transition: { duration: 0.5 },
    },
    light: {
      background: "linear-gradient(to bottom, #1a237e, #000051)",
      transition: { duration: 0.5 },
    },
  };

  const decorationVariants = {
    initial: { scale: 0.8, opacity: 0.5 },
    animate: {
      scale: [0.8, 1.2, 0.8],
      opacity: [0.5, 0.8, 0.5],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const childVariants = {
    initial: { y: 20, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const socialLinks = [
    { icon: <CiLinkedin className="text-xl" />, label: "LinkedIn" },
    { icon: <LuFacebook className="text-xl" />, label: "Facebook" },
    { icon: <FaInstagram className="text-xl" />, label: "Instagram" },
    { icon: <CiTwitter className="text-xl" />, label: "Twitter" },
    { icon: <MdOutlineEmail className="text-xl" />, label: "Email" },
  ];

  return (
    <motion.footer
      className="relative overflow-hidden text-white"
      variants={backgroundVariants}
      animate={currentTheme === "dark" ? "dark" : "light"}
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0">
        <motion.div
          variants={decorationVariants}
          initial="initial"
          animate="animate"
          className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full filter blur-3xl"
        />
        <motion.div
          variants={decorationVariants}
          initial="initial"
          animate="animate"
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-800/10 rounded-full filter blur-3xl"
        />
      </div>

      <div className="container relative mx-auto px-4 pt-20 pb-12">
        <motion.div
          variants={staggerChildren}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
        >
          {/* Company Info */}
          <motion.div variants={childVariants} className="space-y-8">
            <motion.h3
              className="font-bold text-2xl text-white relative inline-block"
              whileHover={{ x: 5 }}
            >
              Logo
              <motion.span
                className="absolute left-0 bottom-0 w-12 h-1 bg-gradient-to-r from-purple-600 to-purple-400"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </motion.h3>
            <motion.p
              className="text-gray-300 leading-relaxed text-sm"
              variants={childVariants}
            >
              Discover a world of knowledge and opportunities with our online
              education platform pursue a new career.
            </motion.p>
            <motion.div className="space-y-4" variants={staggerChildren}>
              <motion.div
                className="flex items-center gap-4 group cursor-pointer"
                whileHover={{ x: 10 }}
              >
                <motion.div
                  className="bg-gray-800/50 backdrop-blur-sm p-3 rounded-lg transition-all duration-300 shadow-lg"
                  whileHover={{
                    backgroundColor: "rgba(147, 51, 234, 0.9)",
                    scale: 1.1,
                  }}
                >
                  <FaLocationDot className="size-5" />
                </motion.div>
                <span className="font-medium text-gray-300 group-hover:text-white transition-colors">
                  Ksar el Kebir
                </span>
              </motion.div>
              <motion.div
                className="flex items-center gap-4 group cursor-pointer"
                whileHover={{ x: 10 }}
              >
                <motion.div
                  className="bg-gray-800/50 backdrop-blur-sm p-3 rounded-lg transition-all duration-300 shadow-lg"
                  whileHover={{
                    backgroundColor: "rgba(147, 51, 234, 0.9)",
                    scale: 1.1,
                  }}
                >
                  <FaPhoneVolume className="size-5" />
                </motion.div>
                <span className="font-medium text-gray-300 group-hover:text-white transition-colors">
                  +212636241246
                </span>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Useful Links */}
          <motion.div variants={childVariants} className="space-y-8">
            <motion.h3
              className="font-bold text-xl text-white relative inline-block"
              whileHover={{ x: 5 }}
            >
              Useful Links
              <motion.span
                className="absolute left-0 bottom-0 w-12 h-1 bg-gradient-to-r from-purple-600 to-purple-400"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              />
            </motion.h3>
            <motion.ul
              className="flex flex-col gap-3 text-gray-300"
              variants={staggerChildren}
            >
              {[
                "Course",
                "Mission & Vision",
                "Join a Career",
                "Zoom Meeting",
                "Pricing Plan",
              ].map((item, index) => (
                <motion.li key={index} variants={childVariants}>
                  <motion.a
                    href="#"
                    className="hover:text-white transition-all duration-300 flex items-center gap-3 group"
                    whileHover={{ x: 10 }}
                  >
                    <motion.span
                      className="h-[2px] w-0 group-hover:w-4 bg-purple-500 transition-all duration-300"
                      initial={{ width: 0 }}
                      whileHover={{ width: "1rem" }}
                    />
                    {item}
                  </motion.a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Our Institute */}
          <motion.div variants={childVariants} className="space-y-8">
            <motion.h3
              className="font-bold text-xl text-white relative inline-block"
              whileHover={{ x: 5 }}
            >
              Our Institute
              <motion.span
                className="absolute left-0 bottom-0 w-12 h-1 bg-gradient-to-r from-purple-600 to-purple-400"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
              />
            </motion.h3>
            <motion.ul
              className="flex flex-col gap-3 text-gray-300"
              variants={staggerChildren}
            >
              {[
                "Contact Us",
                "Mission & Vision",
                "Technology",
                "Instructors",
                "Pricing",
                "Services",
              ].map((item, index) => (
                <motion.li key={index} variants={childVariants}>
                  <motion.a
                    href="#"
                    className="hover:text-white transition-all duration-300 flex items-center gap-3 group"
                    whileHover={{ x: 10 }}
                  >
                    <motion.span
                      className="h-[2px] w-0 group-hover:w-4 bg-purple-500 transition-all duration-300"
                      initial={{ width: 0 }}
                      whileHover={{ width: "1rem" }}
                    />
                    {item}
                  </motion.a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Get In Touch */}
          <motion.div variants={childVariants} className="space-y-8">
            <motion.h3
              className="font-bold text-xl text-white relative inline-block"
              whileHover={{ x: 5 }}
            >
              Get In Touch
              <motion.span
                className="absolute left-0 bottom-0 w-12 h-1 bg-gradient-to-r from-purple-600 to-purple-400"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              />
            </motion.h3>
            <motion.div
              className="flex flex-col gap-5 mb-8"
              variants={staggerChildren}
            >
              <motion.a
                href="#"
                className="transform transition-all duration-300"
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <img
                  src="/AppStore.png"
                  alt="App Store"
                  className="rounded-xl shadow-md"
                />
              </motion.a>
              <motion.a
                href="#"
                className="transform transition-all duration-300"
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <img
                  src="/PlayStore.png"
                  alt="Play Store"
                  className="rounded-xl shadow-md"
                />
              </motion.a>
            </motion.div>
            <motion.div
              className="flex flex-wrap gap-4"
              variants={staggerChildren}
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href="#"
                  aria-label={social.label}
                  className="bg-gray-800/50 backdrop-blur-sm p-3 rounded-lg transition-all duration-300"
                  variants={childVariants}
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "rgba(147, 51, 234, 0.9)",
                    y: -5,
                  }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <motion.div
          className="border-t border-gray-800/60 my-12"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        />

        {/* Copyright */}
        <motion.div
          className="text-center text-gray-400 text-sm"
          variants={childVariants}
          initial="initial"
          animate="animate"
        >
          <p>© {new Date().getFullYear()} Your Company. All rights reserved.</p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;

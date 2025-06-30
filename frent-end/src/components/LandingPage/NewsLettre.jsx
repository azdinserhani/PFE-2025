import React, { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

const NewsLettre = () => {
  const { currentTheme, themes } = useTheme();
  const theme = themes[currentTheme];
  const [formData, setFormData] = useState({
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { t } = useTranslation();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ email: "" });
      }, 3000);
    }, 800);
  };

  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.15,
        duration: 0.6,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  return (
    <div
      className="relative overflow-hidden py-16 sm:py-20 rounded-xl"
      style={{
        backgroundColor: theme.primary,
        backgroundImage: `
          radial-gradient(circle at 10% 20%, ${theme.text}08 15%, transparent 30%),
          radial-gradient(circle at 90% 80%, ${theme.text}05 10%, transparent 20%)
        `,
      }}
    >
      {/* Enhanced background decorations */}
      <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-white/8 to-transparent"></div>
      <div
        className="absolute -right-16 -top-16 w-48 h-48 rounded-full"
        style={{
          background: `linear-gradient(45deg, ${theme.secondary}15, transparent)`,
        }}
      ></div>
      <div
        className="absolute -left-16 -bottom-16 w-48 h-48 rounded-full"
        style={{
          background: `linear-gradient(45deg, ${theme.secondary}15, transparent)`,
        }}
      ></div>

      <motion.div
        className="container mx-auto px-6 max-w-5xl relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Left side - Enhanced content and form */}
          <motion.div variants={itemVariants} className="w-full md:w-7/12">
            <motion.div variants={itemVariants} className="mb-8">
              <h2
                className="text-3xl md:text-4xl font-bold mb-4 leading-tight"
                style={{
                  color: theme.text,
                  textShadow: "0 2px 4px rgba(0,0,0,0.1)",
                }}
              >
                {t("newsletter.title")}
              </h2>

              <p
                className="text-base md:text-lg leading-relaxed"
                style={{ color: `${theme.text}90` }}
              >
                {t("newsletter.description")}
              </p>
            </motion.div>

            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-6 rounded-lg"
                  style={{
                    backgroundColor: `${theme.secondary}15`,
                    border: `1px solid ${theme.secondary}25`,
                  }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        viewBox="0 0 20 20"
                        fill={theme.secondary}
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </motion.div>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  variants={itemVariants}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <div className="relative">
                    <motion.input
                      whileFocus={{ scale: 1.01 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                      }}
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder={t("newsletter.email_placeholder")}
                      className="w-full p-4 rounded-lg outline-none transition-all"
                      style={{
                        backgroundColor: `${theme.background}95`,
                        border: `1px solid ${theme.background}`,
                        color: theme.text,
                        fontSize: "16px",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                      }}
                      required
                    />
                    <div
                      className="absolute inset-0 rounded-lg pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(45deg, transparent, rgba(255,255,255,0.1))",
                      }}
                    />
                  </div>

                  <motion.button
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 rounded-lg font-medium text-base transition-all relative overflow-hidden group"
                    style={{
                      background: `linear-gradient(135deg, ${theme.secondary} 0%, ${theme.secondary}ee 100%)`,
                      color: theme.cardBg,
                      boxShadow: `0 4px 15px ${theme.secondary}40`,
                      border: `1px solid ${theme.secondary}30`,
                    }}
                  >
                    <div
                      className="absolute inset-0 w-full h-full transition-all duration-300 ease-out opacity-0 group-hover:opacity-100"
                      style={{
                        background: `linear-gradient(135deg, ${theme.secondary}cc 0%, ${theme.secondary} 100%)`,
                      }}
                    />
                    <span className="flex items-center justify-center gap-2 relative z-10">
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Subscribing...
                        </>
                      ) : (
                        <>
                          {t("newsletter.subscribe")}
                          <motion.svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            animate={{ x: [0, 5, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                          </motion.svg>
                        </>
                      )}
                    </span>
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Right side - Enhanced illustration */}
          <motion.div
            variants={itemVariants}
            className="w-full md:w-5/12 flex justify-center"
          >
            <div className="relative max-w-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                  delay: 0.2,
                }}
                className="relative z-10"
              >
                <div
                  className="rounded-xl overflow-hidden bg-gradient-to-br from-white/15 to-white/5 p-1.5"
                  style={{ boxShadow: "0 20px 40px -12px rgba(0,0,0,0.25)" }}
                >
                  <div className="rounded-lg overflow-hidden">
                    <img
                      src="/newsPart.png"
                      alt="Learning Management System"
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>

                {/* Enhanced decorative elements */}
                <motion.div
                  className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full"
                  style={{ backgroundColor: theme.secondary, opacity: 0.2 }}
                  animate={{
                    y: [0, -8, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 5,
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  className="absolute -top-6 right-12 w-12 h-12 rounded-full"
                  style={{ backgroundColor: theme.text, opacity: 0.1 }}
                  animate={{
                    y: [0, 8, 0],
                    scale: [1, 0.9, 1],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 4,
                    delay: 1,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>

              {/* Enhanced floating notification */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="absolute -bottom-3 -right-3 md:right-0 bg-white rounded-lg p-3 shadow-xl z-20"
                style={{
                  maxWidth: "180px",
                  boxShadow: "0 12px 24px -8px rgba(0,0,0,0.2)",
                }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: theme.secondary }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="white"
                    >
                      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                    </svg>
                  </div>
                  <div>
                    <p
                      className="text-sm font-semibold"
                      style={{ color: theme.primary }}
                    >
                      New Course Alert!
                    </p>
                    <p
                      className="text-xs mt-0.5"
                      style={{ color: `${theme.primary}90` }}
                    >
                      Start learning today
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default NewsLettre;

import React, { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { motion } from "framer-motion";

const NewsLettre = () => {
  const { currentTheme, themes } = useTheme();
  const theme = themes[currentTheme];
  const [formData, setFormData] = useState({
    email: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Form submitted:", formData);
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ email: "" });
      }, 3000);
    }, 800);
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        duration: 0.5
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };
  
  return (
    <div 
      className="relative overflow-hidden py-10 sm:py-12 rounded-lg"
      style={{ 
        backgroundColor: theme.primary,
        backgroundImage: `radial-gradient(circle at 10% 20%, ${theme.text}05, transparent 25%)`,
      }}
    >
      {/* Subtle background decoration */}
      <div className="absolute top-0 inset-x-0 h-20 bg-gradient-to-b from-white/5 to-transparent"></div>
      
      <motion.div 
        className="container mx-auto px-4 max-w-4xl"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Left side - Content and form */}
          <motion.div 
            variants={itemVariants}
            className="w-full md:w-7/12"
          >
            <motion.div variants={itemVariants} className="mb-6">
              <h5 
                className="text-sm uppercase tracking-widest mb-2 font-medium"
                style={{ color: `${theme.text}90` }}
              >
                Course Updates
              </h5>
              <h2 
                className="text-2xl md:text-3xl font-bold mb-3 leading-tight"
                style={{ color: theme.text }}
              >
                Stay Updated with Your Courses
              </h2>
              
              <p 
                className="text-sm md:text-base"
                style={{ color: `${theme.text}95` }}
              >
                Get notified about new lessons, assignments, and exclusive learning resources directly to your inbox.
              </p>
            </motion.div>
            
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-lg"
                style={{ backgroundColor: `${theme.secondary}20` }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill={theme.secondary}>
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <h3 className="text-base font-bold" style={{ color: theme.text }}>Thank you!</h3>
                </div>
                <p className="text-sm" style={{ color: `${theme.text}90` }}>
                  You'll now receive course updates.
                </p>
              </motion.div>
            ) : (
              <motion.form 
                variants={itemVariants}
                onSubmit={handleSubmit}
                className="space-y-3"
              >
                <div>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Your email address"
                    className="w-full p-3 rounded-lg outline-none transition-all"
                    style={{ 
                      backgroundColor: `${theme.background}90`,
                      border: `1px solid ${theme.background}`,
                      color: theme.text,
                      fontSize: '15px',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
                    }}
                    required
                  />
                </div>
                
                <motion.button 
                  whileHover={{ scale: 1.01, boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 rounded-lg font-medium text-sm transition-all relative overflow-hidden"
                  style={{ 
                    backgroundColor: theme.secondary,
                    color: theme.cardBg,
                    border: 'none',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
                  }}
                >
                  <span className="flex items-center justify-center">
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      <>
                        Subscribe to Updates
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-4 w-4 ml-1" 
                          fill="none"
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </>
                    )}
                  </span>
                </motion.button>
                
                <p className="text-xs text-center mt-2" style={{ color: `${theme.text}70` }}>
                  You can unsubscribe at any time.
                </p>
              </motion.form>
            )}
          </motion.div>
          
          {/* Right side - Illustration */}
          <motion.div
            variants={itemVariants}
            className="w-full md:w-5/12 flex justify-center"
          >
            <div className="relative max-w-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
                className="relative z-10"
              >
                <div className="rounded-lg overflow-hidden bg-gradient-to-br from-white/10 to-white/5 p-1" 
                     style={{ boxShadow: '0 15px 30px -8px rgba(0,0,0,0.15)' }}>
                  <div className="rounded-lg overflow-hidden">
                    <img 
                      src="/lms-illustration.png" 
                      alt="Learning Management System" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/girl.png"; // Fallback to existing image if lms-illustration doesn't exist
                      }}
                    />
                  </div>
                </div>
                
                {/* Decorative elements */}
                <motion.div 
                  className="absolute -bottom-3 -left-3 w-12 h-12 rounded-full"
                  style={{ backgroundColor: theme.secondary, opacity: 0.15 }}
                  animate={{ 
                    y: [0, -5, 0],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 4,
                    ease: "easeInOut"
                  }}
                ></motion.div>
              </motion.div>
              
              {/* Floating notification */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.4 }}
                className="absolute -bottom-2 -right-2 md:right-0 bg-white rounded-md p-2 shadow-md z-20"
                style={{ maxWidth: "160px" }}
              >
                <div className="flex items-start gap-2">
                  <div 
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: theme.secondary }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="white">
                      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-medium" style={{ color: theme.primary }}>New Course</p>
                    <p className="text-xs" style={{ color: theme.primary }}>Data Science Basics</p>
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

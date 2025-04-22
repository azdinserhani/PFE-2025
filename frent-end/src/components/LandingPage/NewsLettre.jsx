import React, { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { motion } from "framer-motion";

const NewsLettre = () => {
  const { currentTheme, themes } = useTheme();
  const theme = themes[currentTheme];
  const [email, setEmail] = useState("");
  
  return (
    <div 
      style={{ 
        backgroundColor: theme.primary,
        borderTop: `1px solid ${theme.border}`,
        borderBottom: `1px solid ${theme.border}`
      } }
    >
      
      <div className="container mx-auto flex flex-col md:flex-row h-auto md:h-[60vh] py-16">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 mt-10 md:mt-0 md:flex-1/2 flex justify-center flex-col px-7 md:px-10 text-center md:text-left"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-bold text-5xl mb-4" 
            style={{ 
              color: theme.text,
              textShadow: `0 2px 4px ${theme.shadow}`
            }}
          >
            Subscribe to Newsletter!
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl mb-8" 
            style={{ 
              color: theme.text,
              opacity: 0.9
            }}
          >
            Stay updated with our latest news and exclusive offers.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col md:flex-row gap-4 md:gap-0"
          >
            <div 
              className="flex rounded-2xl w-full md:w-[80%] h-[60px] overflow-hidden backdrop-blur-sm" 
              style={{ 
                backgroundColor: `${theme.primary}80`,
                boxShadow: `0 4px 12px ${theme.shadow}`,
                border: `1px solid ${theme.border}`
              }}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-2/3 outline-none pl-6 text-lg border-r  border-r-white"
                style={{ 
                  backgroundColor: 'transparent',
                  color: theme.text,
                  borderColor: `${theme.border}40`,
                  '::placeholder': {
                    color: `${theme.text}70`
                  }
                }}
              />
              <motion.button 
                whileHover={{ 
                  scale: 1.02,
                  backgroundColor: theme.secondary,
                  boxShadow: `0 4px 15px ${theme.shadow}`
                }}
                whileTap={{ scale: 0.98 }}
                className="flex-1/3 h-[60px] duration-300 cursor-pointer font-medium text-lg transition-all border-none outline-none"
                style={{ 
                  background: `linear-gradient(135deg, ${theme.secondary}, ${theme.primary})`,
                  color: theme.text,
                  boxShadow: `0 2px 8px ${theme.shadow}`,
                  border: `1px solid ${theme.border}40`
                }}
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-4 text-sm"
            style={{ color: theme.text, opacity: 0.7 }}
          >
            We respect your privacy. Unsubscribe at any time.
          </motion.p>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 md:flex-1/2 relative mt-10 md:mt-0"
        >
          <motion.img
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            transition={{ 
              duration: 0.8,
              type: "spring",
              stiffness: 100
            }}
            src="./newsPart.png"
            alt="Newsletter illustration"
            className="w-full h-[447px] object-contain  absolute bottom-0 left-0"
            style={{
              filter: `drop-shadow(0 10px 15px ${theme.shadow})`
            }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default NewsLettre;

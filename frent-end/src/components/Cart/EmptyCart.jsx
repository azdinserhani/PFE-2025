import React from 'react';
import { Link } from 'react-router';
import { IoCartOutline } from 'react-icons/io5';
import { useTheme } from '../../context/ThemeContext';
import { motion } from 'framer-motion';

const EmptyCart = () => {
  const { currentTheme, themes } = useTheme();
  const theme = themes[currentTheme];
  
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <motion.div 
        className="p-6 rounded-full mb-6 flex items-center justify-center"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{ 
          backgroundColor: `${theme.primary}15`,
          border: `2px dashed ${theme.primary}40`
        }}
      >
        <IoCartOutline className="text-6xl" style={{ color: theme.primary }} />
      </motion.div>
      
      <motion.h2 
        className="text-2xl font-bold mb-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        style={{ color: theme.text }}
      >
        Your cart is empty
      </motion.h2>
      
      <motion.p 
        className="text-center mb-8 max-w-md"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        style={{ color: theme.secondary }}
      >
        Looks like you haven't added any courses to your cart yet. Browse our courses and find something you'd like to learn!
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Link 
          to="/courses" 
          className="py-3 px-6 rounded-md font-medium text-white transition-all duration-300 hover:shadow-lg flex items-center gap-2"
          style={{ backgroundColor: theme.primary }}
        >
          Browse Courses
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </Link>
      </motion.div>
    </div>
  );
};

export default EmptyCart; 
import React from 'react'
import Message from '../components/ContactPage/Message';
import Carddet from '../components/ContactPage/Carddet';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const ContactPage = () => {
  const { themes, currentTheme } = useTheme();
  const theme = themes[currentTheme];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ backgroundColor: theme.background }}
      className='min-h-screen'
    >
      {/* Hero Section with Background */}
      <div 
        className="relative bg-gradient-to-b py-24 overflow-hidden"
        style={{ 
          backgroundImage: `linear-gradient(to bottom, ${theme.primary}20, ${theme.background})`,
        }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-0 top-0 w-full h-full opacity-5">
            {/* Abstract pattern */}
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
              <path 
                d="M0,0 L100,0 L100,100 L0,100 Z" 
                fill="none" 
                stroke={theme.primary} 
                strokeWidth="0.5"
              ></path>
              {[...Array(10)].map((_, i) => (
                <circle 
                  key={i} 
                  cx={Math.random() * 100} 
                  cy={Math.random() * 100} 
                  r={Math.random() * 20 + 5} 
                  fill="none" 
                  stroke={theme.primary} 
                  strokeWidth="0.2"
                />
              ))}
            </svg>
          </div>
        </div>

        <div className='max-w-7xl mx-auto px-4 relative z-10'>
          <motion.div 
            className='text-center'
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h1 
              className='text-4xl md:text-5xl font-bold mb-4'
              style={{ color: theme.text }}
            >
              Contact Us
            </h1>
            <div 
              className="w-24 h-1 mx-auto mb-6"
              style={{ backgroundColor: theme.primary }}
            ></div>
            <p 
              className='max-w-2xl mx-auto'
              style={{ color: `${theme.text}99` }}
            >
              Have questions about our courses or services? We're here to help you find the right educational path for your career
            </p>
          </motion.div>
        </div>
      </div>

      {/* Contact Information and Form */}
      <div className='max-w-7xl mx-auto px-4'>
        <Carddet />
        <Message />
        
        {/* Map Section */}
        <motion.div 
          className="max-w-6xl mx-auto mb-20 rounded-xl overflow-hidden shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          style={{ border: `1px solid ${theme.border}` }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830894616!2d-74.11976383964465!3d40.69766374865766!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sin!4v1627309635190!5m2!1sen!2sin"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="Our Location"
          ></iframe>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default ContactPage

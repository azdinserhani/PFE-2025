import React from "react";
import InputField from "../Auth/InputField";
import ButtonAuth from "../Auth/Button";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";

const Message = () => {
  const { themes, currentTheme } = useTheme();
  const theme = themes[currentTheme];

  return (
    <section className="py-20 px-4 max-w-6xl mx-auto">
      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="hidden lg:block"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <img
            src="/pman.svg"
            alt="Person illustration"
            className="max-w-full"
          />
        </motion.div>      
        <div>
          <div className="mb-10 text-left">
            <h2 
              className="font-bold text-3xl mb-3"
              style={{ color: theme.text }}
            >
              Let's start a conversation
            </h2>
            <div 
              className="w-20 h-1 mb-4"
              style={{ backgroundColor: theme.primary }}
            ></div>
            <p
              style={{ color: `${theme.text}99` }}
            >
              We'd love to hear from you. Drop us a message and we'll get back to you as soon as possible.
            </p>
          </div>
          <motion.form
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            style={{ 
              backgroundColor: theme.cardBg,
              borderRadius: '1rem',
              padding: '2rem',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
              border: `1px solid ${theme.border}`
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label 
                  htmlFor="name" 
                  className="block text-sm font-medium mb-2"
                  style={{ color: theme.text }}
                >
                  Your Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  className="w-full rounded-lg p-3 text-sm transition-colors"
                  style={{ 
                    backgroundColor: theme.background,
                    color: theme.text,
                    border: `1px solid ${theme.border}`,
                  }}
                />
              </div>
              <div>
                <label 
                  htmlFor="email" 
                  className="block text-sm font-medium mb-2"
                  style={{ color: theme.text }}
                >
                  Your Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  className="w-full rounded-lg p-3 text-sm transition-colors"
                  style={{ 
                    backgroundColor: theme.background,
                    color: theme.text,
                    border: `1px solid ${theme.border}`,
                  }}
                />
              </div>
            </div>
            <div>
              <label 
                htmlFor="subject" 
                className="block text-sm font-medium mb-2"
                style={{ color: theme.text }}
              >
                Subject
              </label>
              <input
                id="subject"
                type="text"
                placeholder="How can we help you?"
                className="w-full rounded-lg p-3 text-sm transition-colors"
                style={{ 
                  backgroundColor: theme.background,
                  color: theme.text,
                  border: `1px solid ${theme.border}`,
                }}
              />
            </div>
            <div>
              <label 
                htmlFor="message" 
                className="block text-sm font-medium mb-2"
                style={{ color: theme.text }}
              >
                Message
              </label>
              <textarea
                id="message"
                rows="4"
                className="w-full rounded-lg p-3 text-sm transition-colors"
                placeholder="Your message here..."
                style={{ 
                  backgroundColor: theme.background,
                  color: theme.text,
                  border: `1px solid ${theme.border}`,
                }}
              ></textarea>
            </div>
            <button
              className="px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:opacity-90"
              style={{ 
                backgroundColor: theme.primary,
                color: "#ffffff"
              }}
            >
              Send Message
            </button>
          </motion.form>
        </div>
      </motion.div>
    </section>
  );
};

export default Message;

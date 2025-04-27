import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaTrash } from "react-icons/fa";

const QuestionForm = ({ theme }) => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState(null);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="w-full flex flex-col gap-4 p-4 rounded-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      style={{
        backgroundColor: `${theme.primary}08`,
        border: `1px dashed ${theme.primary}40`,
      }}
    >
      <div className="flex flex-col gap-2">
        <motion.label
          className="text-sm font-medium"
          style={{ color: theme.text }}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
        >
          Question Text
        </motion.label>
        <motion.textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full p-3 rounded-lg resize-none transition-all duration-200 focus:outline-none focus:ring-2"
          placeholder="Enter your question here..."
          rows={3}
          style={{
            backgroundColor: theme.background,
            color: theme.text,
            borderColor: `${theme.primary}40`,
            border: `1px solid ${theme.primary}40`,
            caretColor: theme.primary,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        />
      </div>

      <motion.div
        className="flex flex-col gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <label className="text-sm font-medium" style={{ color: theme.text }}>
          Answer Options
        </label>
        {options.map((option, index) => (
          <motion.div
            key={index}
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <motion.input
              type="radio"
              name="correctAnswer"
              checked={correctAnswer === index}
              onChange={() => setCorrectAnswer(index)}
              className="w-4 h-4 cursor-pointer"
              style={{
                accentColor: theme.primary,
              }}
            />
            <motion.input
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              placeholder={`Option ${index + 1}`}
              className="flex-1 p-2 rounded-md transition-all duration-200 focus:outline-none focus:ring-2"
              style={{
                backgroundColor: theme.background,
                color: theme.text,
                borderColor: `${theme.primary}40`,
                border: `1px solid ${theme.primary}40`,
                caretColor: theme.primary,
              }}
            />
            <motion.button
              type="button"
              className="p-2 rounded-md"
              whileHover={{
                scale: 1.1,
                backgroundColor: `${theme.secondary}20`,
              }}
              whileTap={{ scale: 0.9 }}
              style={{ color: theme.secondary }}
            >
              <FaTrash size={14} />
            </motion.button>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="flex justify-between mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <motion.button
          type="button"
          className="flex items-center gap-2 px-4 py-2 rounded-md font-medium"
          whileHover={{
            backgroundColor: `${theme.primary}20`,
            transform: "translateY(-2px)",
          }}
          whileTap={{ transform: "translateY(0)" }}
          style={{ color: theme.primary }}
        >
          <FaPlus size={12} />
          Add Option
        </motion.button>

        <div className="flex gap-3">
          <motion.button
            type="button"
            className="px-4 py-2 rounded-md transition-colors duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              color: theme.primary,
              backgroundColor: "transparent",
              border: `1px solid ${theme.primary}`,
            }}
          >
            Cancel
          </motion.button>
          <motion.button
            type="submit"
            className="px-4 py-2 rounded-md font-medium shadow-md"
            whileHover={{
              scale: 1.02,
              backgroundColor: `${theme.primary}e0`,
            }}
            whileTap={{ scale: 0.98 }}
            style={{
              backgroundColor: theme.primary,
              color: "#ffffff",
            }}
          >
            Save Question
          </motion.button>
        </div>
      </motion.div>
    </motion.form>
  );
};

export default QuestionForm;

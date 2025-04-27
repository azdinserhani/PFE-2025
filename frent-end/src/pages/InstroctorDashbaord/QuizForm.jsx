import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { createQuiz } from "../../redux/ApiCalls";
import { useDispatch } from "react-redux";
import { useTheme } from "../../context/ThemeContext";
import { motion } from "framer-motion";

const QuizForm = ({ setQuizFormOpen, sectionIndex, position }) => {
  const [quizTitle, setQuizTitle] = useState("");
  const dispatch = useDispatch();
  const { currentTheme, themes } = useTheme();
  const theme = themes[currentTheme];

  const handleInputChange = (e) => {
    if (e.target.value.length <= 80) {
      setQuizTitle(e.target.value);
    }
  };

  const handleAddQuiz = () => {
    if (quizTitle.trim()) {
      createQuiz(dispatch, { title: quizTitle }, sectionIndex, position);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full h-[180px] flex flex-col gap-4 p-5 rounded-lg relative"
      style={{
        backgroundColor: theme.cardBg,
        border: `1px solid ${theme.primary}`,
        boxShadow: `0 4px 12px ${theme.primary}15`,
        transition: "all 0.3s ease",
      }}
    >
      <motion.div
        className="absolute top-3 right-3"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <IoMdClose
          onClick={() => setQuizFormOpen(false)}
          className="h-6 w-6 cursor-pointer rounded-full p-1 transition-colors duration-200"
          style={{
            backgroundColor: `${theme.primary}20`,
            color: theme.primary,
          }}
        />
      </motion.div>

      <div className="flex items-center gap-3 w-full mt-2">
        <motion.span
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="w-[120px] font-semibold text-base"
          style={{ color: theme.primary }}
        >
          New Quiz:
        </motion.span>
        <div className="w-full flex items-center gap-2">
          <motion.input
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            type="text"
            placeholder="Enter a title for this quiz"
            className="rounded-md p-2.5 w-full transition-all duration-200 focus:outline-none focus:ring-2"
            style={{
              backgroundColor:
                currentTheme === "dark" ? "#2d3748" : theme.background,
              color: theme.text,
              borderColor: `${theme.primary}50`,
              border: `1px solid ${theme.primary}50`,
              caretColor: theme.primary,
              focusRing: theme.primary,
            }}
            value={quizTitle}
            onChange={handleInputChange}
          />
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="font-medium min-w-[30px] text-center"
            style={{ color: theme.secondary }}
          >
            {80 - quizTitle.length}
          </motion.span>
        </div>
      </div>

      <div className="flex absolute bottom-4 right-4 items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setQuizFormOpen(false)}
          className="px-4 py-2 rounded-md transition-colors duration-200"
          style={{
            color: theme.primary,
            backgroundColor: "transparent",
            border: `1px solid ${theme.primary}`,
          }}
        >
          Cancel
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02, backgroundColor: `${theme.primary}e0` }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            handleAddQuiz();
            setQuizFormOpen(false);
          }}
          className="px-4 py-2 h-10 flex justify-center items-center rounded-md gap-2 font-semibold cursor-pointer shadow-md"
          style={{
            backgroundColor: theme.primary,
            color: "#ffffff",
          }}
        >
          Add Quiz
        </motion.button>
      </div>
    </motion.div>
  );
};

export default QuizForm;

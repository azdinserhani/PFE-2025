import { CgNotes } from "react-icons/cg";
import { FaCheckCircle, FaPlus } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useState } from "react";
import ContentForm from "./ContentForm";
import { useDispatch } from "react-redux";
import { MdOutlineQuiz } from "react-icons/md";
import { motion } from "framer-motion";
import QuestionForm from "./QuestionForm";
import React from "react";

const QuizItem = React.memo(({ quiz, index, sectionId, theme }) => {
  const [questionFormOpen, setQuestionFormOpen] = useState(false);
  
  return (
    <motion.div
      className="flex flex-col px-4 py-2 rounded-md justify-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        backgroundColor: theme.cardBg,
        borderColor: theme.border,
        borderWidth: '1px',
        color: theme.text,
        boxShadow: 'none',
        transition: 'transform 0.2s ease-in-out',
      }}
    >
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-md font-medium flex items-center gap-2">
            <FaCheckCircle fontSize={12} style={{ color: theme.primary }} />
            <span className="font-semibold mr-2">Quiz {index + 1}:</span>
            <MdOutlineQuiz fontSize={12} style={{ color: theme.secondary }} />
            {quiz.title}
          </h2>
          <div className="flex items-center gap-2">
            <CiEdit 
              className="p-1 rounded-md transition-all duration-200 hover:bg-opacity-20"
              style={{ 
                color: theme.secondary, 
                cursor: 'pointer',
                transform: 'scale(1.2)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = `${theme.secondary}20`;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            />
            <MdOutlineDeleteOutline 
              className="p-1 rounded-md transition-all duration-200 hover:bg-opacity-20"
              style={{ 
                color: theme.secondary, 
                cursor: 'pointer',
                transform: 'scale(1.2)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = `${theme.secondary}20`;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            />
          </div>
        </div>

        <button
          onClick={() => setQuestionFormOpen(!questionFormOpen)}
          className="p-4 w-[150px] h-8 flex justify-center items-center rounded-md gap-2.5 font-semibold cursor-pointer transition-all duration-300"
          style={{
            backgroundColor: theme.background,
            color: theme.primary,
            borderColor: theme.primary,
            borderWidth: '1px'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = `${theme.primary}20`;
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = `0 4px 8px -2px ${theme.primary}30`;
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = theme.background;
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          {questionFormOpen ? (
            <>
              <FaPlus 
                style={{ color: theme.secondary }} 
                className="rotate-45 duration-300" 
              /> 
              Question
            </>
          ) : (
            <>
              <FaPlus style={{ color: theme.secondary }} /> Question
            </>
          )}
        </button>
      </div>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: questionFormOpen ? "auto" : 0,
          opacity: questionFormOpen ? 1 : 0,
        }}
        transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
        className="overflow-hidden"
      >
        {questionFormOpen && <QuestionForm theme={theme} />}
      </motion.div>
    </motion.div>
  );
});

export default QuizItem;

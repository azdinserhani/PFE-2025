import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import LectureForm from "./LectureForm";
import QuizForm from "./QuizForm";
import { useTheme } from "../../context/ThemeContext";
import { motion } from "framer-motion";

const CurriculumItemForm = ({ setCurriculumItemFormOpen, sectionId }) => {
  const [lectureFomOpen, setLectureFormOpen] = useState(false);
  const [quizFormOpen, setQuizFormOpen] = useState(false);
  const { currentTheme, themes } = useTheme();
  const theme = themes[currentTheme];

  const buttonVariants = {
    hover: {
      scale: 1.02,
      transition: { duration: 0.2 },
    },
    tap: {
      scale: 0.98,
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center"
    >
      {lectureFomOpen && (
        <LectureForm
          sectionId={sectionId}
          setLectureFormOpen={setLectureFormOpen}
        />
      )}
      {quizFormOpen && (
        <QuizForm setQuizFormOpen={setQuizFormOpen} sectionIndex={sectionId} />
      )}
      {!lectureFomOpen && !quizFormOpen && (
        <motion.div
          className="flex gap-4 p-4 py-1.5 rounded-md"
          style={{
            backgroundColor: theme.cardBg,
            border: `1px dashed ${theme.border}`,
          }}
        >
          <motion.div
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="flex items-center gap-2 font-semibold cursor-pointer p-2 rounded-md h-8"
            onClick={() => setLectureFormOpen(true)}
            style={{
              color: theme.primary,
              backgroundColor: `${theme.primary}10`,
            }}
          >
            <FaPlus style={{ color: theme.primary }} />
            <span>Lecture</span>
          </motion.div>

          <motion.div
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="flex items-center gap-2 font-semibold cursor-pointer p-2 rounded-md h-8"
            onClick={() => setQuizFormOpen(true)}
            style={{
              color: theme.primary,
              backgroundColor: `${theme.primary}10`,
            }}
          >
            <FaPlus style={{ color: theme.primary }} />
            <span>Quiz</span>
          </motion.div>
        </motion.div>
      )}
      {!lectureFomOpen && !quizFormOpen && (
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <IoMdClose
            onClick={() => setCurriculumItemFormOpen(false)}
            className="cursor-pointer m-2"
            size={20}
            style={{ color: theme.secondary }}
          />
        </motion.div>
      )}
    </motion.div>
  );
};

export default CurriculumItemForm;

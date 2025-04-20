import { CgNotes } from "react-icons/cg";
import { FaCheckCircle, FaPlus } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdDragIndicator, MdOutlineDeleteOutline } from "react-icons/md";
import { useState } from "react";
import ContentForm from "./ContentForm";
import { useDispatch } from "react-redux";
import { MdOutlineQuiz } from "react-icons/md";
import { motion } from "framer-motion";
import QuestionForm from "./QuestionForm";
const QuizItem = ({ quiz, index }) => {
  const [questionFormOpen, setQuestionFormOpen] = useState(false);
  return (
    <motion.div
      className="flex flex-col  bg-white px-4 py-2 rounded-md border border-gray-500 duration-700  justify-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <MdDragIndicator className="text-gray-400 cursor-grab" />
          <h2 className="text-md font-medium flex items-center gap-2">
            <FaCheckCircle fontSize={12} />
            <span className="font-semibold mr-2">Quiz {index + 1}:</span>{" "}
            <MdOutlineQuiz fontSize={12} />
            {quiz.title}
          </h2>
          <div className="flex items-center gap-2">
            <CiEdit className="text-gray-500 cursor-pointer hover:bg-gray-300 rounded-md duration-300" />
            <MdOutlineDeleteOutline className="text-gray-500 cursor-pointer hover:bg-gray-300 rounded-md duration-300" />
          </div>
        </div>

        <button
          onClick={() => setQuestionFormOpen(!questionFormOpen)}
          className={`p-4 w-[150px] h-8 flex justify-center items-center rounded-md gap-2.5 text-purple-700 font-semibold cursor-pointer border border-purple-500 hover:bg-purple-200 transition duration-300 ease-in-out`}
        >
          {questionFormOpen ? (
            <>
              <FaPlus className="text-gray-400 rotate-45 duration-300" />{" "}
              Question
            </>
          ) : (
            <>
              <FaPlus className="text-gray-400" /> Question
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
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        {questionFormOpen && <QuestionForm />}
      </motion.div>
    </motion.div>
  );
};

export default QuizItem;

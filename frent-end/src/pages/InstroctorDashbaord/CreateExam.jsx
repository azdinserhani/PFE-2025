import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useTheme } from "../../context/ThemeContext";
import { FaPlus, FaTrash, FaSave } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const CreateExam = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { currentTheme, themes } = useTheme();
  const theme = themes[currentTheme];
  const [isLoading, setIsLoading] = useState(false);
  const [examTitle, setExamTitle] = useState("");
  const [examDescription, setExamDescription] = useState("");
  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
    },
  ]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: questions.length + 1,
        question: "",
        options: ["", "", "", ""],
        correctAnswer: 0,
      },
    ]);
  };

  const removeQuestion = (questionId) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((q) => q.id !== questionId));
    }
  };

  const updateQuestion = (questionId, field, value) => {
    setQuestions(
      questions.map((q) =>
        q.id === questionId ? { ...q, [field]: value } : q
      )
    );
  };

  const updateOption = (questionId, optionIndex, value) => {
    setQuestions(
      questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: q.options.map((opt, idx) =>
                idx === optionIndex ? value : opt
              ),
            }
          : q
      )
    );
  };

  const validateExam = () => {
    if (!examTitle.trim()) {
      alert("Please enter an exam title");
      return false;
    }

    if (!examDescription.trim()) {
      alert("Please enter an exam description");
      return false;
    }

    for (const question of questions) {
      if (!question.question.trim()) {
        alert("Please fill in all questions");
        return false;
      }

      for (const option of question.options) {
        if (!option.trim()) {
          alert("Please fill in all options");
          return false;
        }
      }
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateExam()) return;

    try {
      setIsLoading(true);
      // TODO: Add API call to save exam
      const examData = {
        courseId,
        title: examTitle,
        description: examDescription,
        questions: questions.map((q) => ({
          question: q.question,
          options: q.options,
          correctAnswer: q.correctAnswer,
        })),
      };

      // Add your API call here
      // await createExam(examData);
      
      navigate(`/course/${courseId}`);
    } catch (error) {
      console.error("Error creating exam:", error);
      alert("Failed to create exam. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="container mx-auto p-6 min-h-screen"
      style={{ backgroundColor: theme.background }}
    >
      <div className="max-w-4xl mx-auto">
        <h1
          className="text-2xl font-bold mb-6"
          style={{ color: theme.primary }}
        >
          Create Course Exam
        </h1>

        {/* Exam Details */}
        <div
          className="shadow-md p-6 rounded-lg mb-6"
          style={{ backgroundColor: theme.cardBg }}
        >
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: theme.text }}
            >
              Exam Title
            </label>
            <input
              type="text"
              value={examTitle}
              onChange={(e) => setExamTitle(e.target.value)}
              className="w-full p-3 rounded-md"
              style={{
                backgroundColor: theme.background,
                color: theme.text,
                borderColor: theme.border,
                borderWidth: "1px",
              }}
              placeholder="Enter exam title"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: theme.text }}
            >
              Exam Description
            </label>
            <textarea
              value={examDescription}
              onChange={(e) => setExamDescription(e.target.value)}
              className="w-full p-3 rounded-md"
              rows="3"
              style={{
                backgroundColor: theme.background,
                color: theme.text,
                borderColor: theme.border,
                borderWidth: "1px",
              }}
              placeholder="Enter exam description"
            />
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-6">
          {questions.map((q, index) => (
            <div
              key={q.id}
              className="shadow-md p-6 rounded-lg"
              style={{ backgroundColor: theme.cardBg }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3
                  className="text-lg font-medium"
                  style={{ color: theme.text }}
                >
                  Question {index + 1}
                </h3>
                {questions.length > 1 && (
                  <button
                    onClick={() => removeQuestion(q.id)}
                    className="p-2 rounded-md hover:bg-red-100"
                    style={{ color: "#ef4444" }}
                  >
                    <FaTrash />
                  </button>
                )}
              </div>

              <div className="mb-4">
                <input
                  type="text"
                  value={q.question}
                  onChange={(e) =>
                    updateQuestion(q.id, "question", e.target.value)
                  }
                  className="w-full p-3 rounded-md mb-4"
                  style={{
                    backgroundColor: theme.background,
                    color: theme.text,
                    borderColor: theme.border,
                    borderWidth: "1px",
                  }}
                  placeholder="Enter your question"
                />

                <div className="space-y-3">
                  {q.options.map((option, optIndex) => (
                    <div key={optIndex} className="flex items-center gap-3">
                      <input
                        type="radio"
                        name={`question-${q.id}`}
                        checked={q.correctAnswer === optIndex}
                        onChange={() =>
                          updateQuestion(q.id, "correctAnswer", optIndex)
                        }
                        style={{ accentColor: theme.primary }}
                      />
                      <input
                        type="text"
                        value={option}
                        onChange={(e) =>
                          updateOption(q.id, optIndex, e.target.value)
                        }
                        className="flex-1 p-3 rounded-md"
                        style={{
                          backgroundColor: theme.background,
                          color: theme.text,
                          borderColor: theme.border,
                          borderWidth: "1px",
                        }}
                        placeholder={`Option ${optIndex + 1}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Question Button */}
        <button
          onClick={addQuestion}
          className="w-full p-3 mt-6 rounded-md flex items-center justify-center gap-2 font-medium"
          style={{
            backgroundColor: theme.background,
            color: theme.primary,
            borderColor: theme.primary,
            borderWidth: "1px",
          }}
        >
          <FaPlus /> Add Question
        </button>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className={`
            w-full p-3 mt-6 rounded-md font-medium cursor-pointer
            transition-all duration-300 transform flex items-center justify-center
            hover:-translate-y-[1px] ${isLoading ? "opacity-70 cursor-not-allowed" : ""}
          `}
          style={{
            backgroundColor: theme.primary,
            color: theme.cardBg,
            boxShadow: `0 2px 6px ${theme.primary}30`,
          }}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <AiOutlineLoading3Quarters className="animate-spin" size={20} />
              Creating Exam...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <FaSave /> Create Exam
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default CreateExam; 
import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { addQuizQuestion } from "../../redux/features/courseSlice";
import { useDispatch } from "react-redux";
const QuestionForm = () => {
  const dispatch = useDispatch();
  const [options, setOptions] = useState([]);
  const [correctAnswerIndex, setCorrectAnswer] = useState(null);
  const [questionTitle, setQuestionTitle] = useState("");
  const handleOptionChange = (id, value) => {
    setOptions((prevOptions) =>
      prevOptions.map((option) =>
        option.id === id ? { ...option, text: value } : option
      )
    );
  };

  const addOption = () => {
    setOptions((prevOptions) => [
      ...prevOptions,
      { id: prevOptions.length + 1, text: "" },
    ]);
  };

  const removeOption = (id) => {
    setOptions((prevOptions) =>
      prevOptions.filter((option) => option.id !== id)
    );
  };

  const removeAllOptions = () => {
    setOptions([]);
  };

  const handleAddQuestion = () => {
    dispatch(
      addQuizQuestion({
        sectionIndex,
        lectureIndex,
        questionText: "",
        options: options,
      })
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Create a Question
      </h2>

      <div>
        <label
          htmlFor="question"
          className="block text-sm font-medium text-gray-700"
        >
          Question:
        </label>
        <input
          type="text"
          id="question"
          name="question"
          placeholder="Enter your question"
          required
          onChange={(e) => setQuestionTitle(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
        />
      </div>

      {options.map((option, index) => (
        <div key={option.id} className="flex items-center space-x-2">
          <input
            type="text"
            placeholder={`Enter answer ${index + 1}`}
            value={option.text}
            onChange={(e) => handleOptionChange(option.id, e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
          />
          <button
            type="button"
            onClick={() => removeOption(option.id)}
            className="text-red-500 hover:text-red-700 cursor-pointer"
          >
            <MdDelete fontSize={30} />
          </button>
        </div>
      ))}

      <div className="flex space-x-2">
        <button
          type="button"
          onClick={addOption}
          className="mt-2 py-1 px-3 bg-purple-500 text-white font-semibold rounded-md shadow-sm hover:bg-purple-400 transition duration-300 ease-in-out cursor-pointer"
        >
          Add Option
        </button>
        <button
          type="button"
          onClick={removeAllOptions}
          className="mt-2 py-1 px-3 bg-red-500 text-white font-semibold rounded-md shadow-sm hover:bg-red-400 transition duration-300 ease-in-out cursor-pointer"
        >
          Delete All
        </button>
      </div>

      <div>
        <label
          htmlFor="correctAnswer"
          className="block text-sm font-medium text-gray-700"
        >
          Correct Answer:
        </label>
        <select
          id="correctAnswer"
          name="correctAnswer"
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
          onChange={(e) => setCorrectAnswer(parseInt(e.target.value))}
        >
          <option value="">Select correct answer</option>
          {options.map((option, index) => (
            <option key={option.id} value={index}>
              Answer {index + 1}
            </option>
          ))}
        </select>
      </div>

      <button className="w-full py-2 px-4 bg-purple-700 text-white font-semibold rounded-md shadow-sm hover:bg-purple-500 transition duration-300 ease-in-out">
        Save
      </button>
    </div>
  );
};

export default QuestionForm;

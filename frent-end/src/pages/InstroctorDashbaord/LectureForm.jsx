import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useDispatch } from "react-redux";
import { createLecture } from "../../redux/ApiCalls";
const LectureForm = ({
  
  setLectureFormOpen,
  sectionId,
}) => {
  const [lectureTitle, setLectureTitle] = useState("");
  const dispatch = useDispatch();
  const handleInputChange = (e) => {
    if (e.target.value.length <= 80) {
      setLectureTitle(e.target.value);
    }
  };

  const handleAddLecture = () => {
    if (lectureTitle.trim()) {
      createLecture(dispatch, { title: lectureTitle }, sectionId);
    }
  };
  return (
    <div className="w-full h-[180px] flex flex-col gap-4 bg-white p-4 rounded-md border border-purple-500 relative">
      <IoMdClose
        onClick={() => setLectureFormOpen(false)}
        className="h-5 w-5 text-purple-900 cursor-pointer"
      />
      <div className="flex items-center gap-2 w-full">
        <span className="w-[120px] font-semibold text-purple-900">
          New lecture:
        </span>
        <div className="w-full flex items-center gap-2">
          <input
            type="text"
            placeholder="Enter a title for this lecture"
            className="border border-purple-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 text-purple-800 w-full"
            value={lectureTitle}
            onChange={handleInputChange}
          />
          <span className="text-purple-700 font-medium">
            {80 - lectureTitle.length}
          </span>
        </div>
      </div>
      <div className="flex absolute bottom-4 right-4 items-center gap-4">
        <span
          onClick={() => setLectureFormOpen(false)}
          className=" text-purple-700 cursor-pointer "
        >
          Cancel
        </span>
        <button
          onClick={() => {
            handleAddLecture();
            setLectureFormOpen(false);
          }}
          className="p-4 w-[200px] h-12 flex justify-center items-center rounded-md gap-2.5 text-white bg-purple-700 font-semibold cursor-pointer hover:bg-purple-500 transition duration-300 ease-in-out "
        >
          Add lecture
        </button>
      </div>
    </div>
  );
};

export default LectureForm;

import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import LectureForm from "./LectureForm";
const CurriculumItemForm = ({
  setCurriculumItemFormOpen,

  sectionId,
}) => {
  const [lectureFomOpen, setLectureFormOpen] = useState(false);

  return (
    <div className="  flex items-center">
      {lectureFomOpen && (
        <LectureForm
          sectionId={sectionId}
          setLectureFormOpen={setLectureFormOpen}
        />
      )}
      {!lectureFomOpen && (
        <div className="flex gap-4 bg-white p-4 py-1.5 rounded-md border border-gray-500 border-dashed">
          <div
            className="flex items-center gap-2 text-purple-700 font-semibold cursor-pointer hover:bg-purple-100 p-2 rounded-md h-8"
            onClick={() => setLectureFormOpen(true)}
          >
            <FaPlus className="text-purple-400" /> Lecture
          </div>

          <div className="flex items-center gap-2 text-purple-700 font-semibold cursor-pointer hover:bg-purple-100 p-2 rounded-md h-8">
            <FaPlus className="text-purple-400" /> Quiz
          </div>
        </div>
      )}
      {!lectureFomOpen && (
        <IoMdClose
          onClick={() => setCurriculumItemFormOpen(false)}
          className=" cursor-pointer m-2"
        />
      )}
    </div>
  );
};

export default CurriculumItemForm;

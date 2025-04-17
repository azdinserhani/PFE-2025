import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import CurriculumItemForm from "./CurriculumItemForm";
import LectureItem from "./LectureItem";
import { useSelector } from "react-redux";
import { MdKeyboardArrowUp } from "react-icons/md";

const SectionItem = ({ section, index }) => {
  const [curriculumItemFormOpen, setCurriculumItemFormOpen] = useState(false);
  const lectures = useSelector((stat) => stat.course.sections[index].lecture);

  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`flex flex-col gap-4 bg-gray-100 px-4 py-2 rounded-md border border-gray-500 transition-all duration-700 ease-in-out overflow-hidden ${
        isExpanded ? "max-h-[1000px]" : "max-h-20"
      }`}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-md font-medium text-purple-950">
          <span className="font-semibold mr-2">Section {index + 1}:</span>
          {section}
        </h2>
        <div className="flex items-center gap-2">
          <CiEdit className="text-gray-500 cursor-pointer" />
          <MdOutlineDeleteOutline className="text-gray-500 cursor-pointer" />
          <MdKeyboardArrowUp
            className={`text-gray-500 cursor-pointer transform transition-transform ${
              isExpanded ? "" : "rotate-180"
            }`}
            onClick={() => setIsExpanded(!isExpanded)}
          />
        </div>
      </div>
      {isExpanded && (
        <>
          {lectures.map((lecture, y) => {
            return (
              <LectureItem
                lecture={lecture.title}
                index={y}
                key={y}
                sectionId={index}
              />
            );
          })}
          {curriculumItemFormOpen && (
            <CurriculumItemForm
              setCurriculumItemFormOpen={setCurriculumItemFormOpen}
              sectionId={index}
            />
          )}
          {!curriculumItemFormOpen && (
            <button
              onClick={() => setCurriculumItemFormOpen(!curriculumItemFormOpen)}
              className="p-4 w-[200px] h-12 flex justify-center items-center rounded-md gap-2.5 text-purple-700 font-semibold cursor-pointer border border-purple-500 hover:bg-purple-200 transition duration-300 ease-in-out"
            >
              <FaPlus className="text-gray-400" /> Curriculum item{" "}
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default SectionItem;

import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";
import { MdOutlineDeleteOutline, MdDragIndicator } from "react-icons/md";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import CurriculumItemForm from "./CurriculumItemForm";
import LectureItem from "./LectureItem";
import { useSelector } from "react-redux";
import { MdKeyboardArrowUp } from "react-icons/md";
import QuizItem from "./QuizItem";

const SectionItem = ({ section, index }) => {
  const [curriculumItemFormOpen, setCurriculumItemFormOpen] = useState(false);
  const lectures = useSelector((stat) => stat.course.sections[index].lecture);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Draggable draggableId={`section-${index}`} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={`flex flex-col gap-4 bg-gray-100 px-4 py-2 rounded-md border border-gray-500  overflow-hidden ${
            isExpanded ? "max-h-[1000px]" : "max-h-20"
          } ${snapshot.isDragging ? "shadow-lg" : ""}`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div {...provided.dragHandleProps}>
                <MdDragIndicator className="text-gray-400 cursor-grab" />
              </div>
              <h2 className="text-md font-medium text-purple-950">
                <span className="font-semibold mr-2">Section {index + 1}:</span>
                {section}
              </h2>
            </div>
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
            <div className="flex flex-col gap-4 mt-2">
              {lectures.map((lecture, y) => {
                console.log(lecture.type);

                return lecture.type === "lecture" ? (
                  <LectureItem
                    lecture={lecture.title}
                    index={y}
                    key={y}
                    sectionId={index}
                  />
                ) : (
                  <QuizItem
                    quiz={lecture}
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
                  onClick={() =>
                    setCurriculumItemFormOpen(!curriculumItemFormOpen)
                  }
                  className="p-4 w-[200px] h-12 flex justify-center items-center rounded-md gap-2.5 text-purple-700 font-semibold cursor-pointer border border-purple-500 hover:bg-purple-200 transition duration-300 ease-in-out"
                >
                  <FaPlus className="text-gray-400" /> Curriculum item{" "}
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default SectionItem;

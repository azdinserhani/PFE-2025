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

const SectionItem = ({ section, index, theme }) => {
  const [curriculumItemFormOpen, setCurriculumItemFormOpen] = useState(false);
  const lectures = useSelector((stat) => stat.course.sections[index].lecture);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Draggable draggableId={`section-${index}`} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={`flex flex-col gap-4 px-4 py-2 rounded-md overflow-hidden ${
            isExpanded ? "max-h-[1000px]" : "max-h-20"
          }`}
          style={{
            backgroundColor: theme.cardBg,
            borderColor: theme.border,
            borderWidth: '1px',
            boxShadow: snapshot.isDragging ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none',
            transform: snapshot.isDragging ? 'scale(1.05) rotate(1deg)' : 'none',
            transition: 'all 0.3s ease-in-out'
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div {...provided.dragHandleProps}>
                <MdDragIndicator style={{ color: theme.secondary, cursor: 'grab' }} />
              </div>
              <h2 className="text-md font-medium" style={{ color: theme.text }}>
                <span className="font-semibold mr-2">Section {index + 1}:</span>
                {section}
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <CiEdit style={{ color: theme.secondary, cursor: 'pointer' }} />
              <MdOutlineDeleteOutline style={{ color: theme.secondary, cursor: 'pointer' }} />
              <MdKeyboardArrowUp
                style={{ color: theme.secondary, cursor: 'pointer', transform: isExpanded ? 'none' : 'rotate(180deg)' }}
                onClick={() => setIsExpanded(!isExpanded)}
              />
            </div>
          </div>
          {isExpanded && (
            <div className="flex flex-col gap-4 mt-2">
              {lectures.map((lecture, y) => {
                return lecture.type === "lecture" ? (
                  <LectureItem
                    lecture={lecture.title}
                    index={y}
                    key={y}
                    sectionId={index}
                    theme={theme}
                  />
                ) : (
                  <QuizItem
                    quiz={lecture}
                    index={y}
                    key={y}
                    sectionId={index}
                    theme={theme}
                  />
                );
              })}
              {curriculumItemFormOpen && (
                <CurriculumItemForm
                  setCurriculumItemFormOpen={setCurriculumItemFormOpen}
                  sectionId={index}
                  theme={theme}
                />
              )}
              {!curriculumItemFormOpen && (
                <button
                  onClick={() =>
                    setCurriculumItemFormOpen(!curriculumItemFormOpen)
                  }
                  className="p-4 w-[200px] h-12 flex justify-center items-center rounded-md gap-2.5 font-semibold cursor-pointer transition duration-300 ease-in-out"
                  style={{
                    backgroundColor: theme.background,
                    color: theme.primary,
                    borderColor: theme.primary,
                    borderWidth: '1px'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = `${theme.primary}20`;
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = theme.background;
                  }}
                >
                  <FaPlus style={{ color: theme.secondary }} /> Curriculum item
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

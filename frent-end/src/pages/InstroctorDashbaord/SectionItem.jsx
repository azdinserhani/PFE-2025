import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import CurriculumItemForm from "./CurriculumItemForm";
import LectureItem from "./LectureItem";
import { useSelector, useDispatch } from "react-redux";
import { MdKeyboardArrowUp } from "react-icons/md";
import QuizItem from "./QuizItem";
import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { MdDragIndicator } from "react-icons/md";

const SectionItem = React.memo(({ section, index, theme, id }) => {
  const [curriculumItemFormOpen, setCurriculumItemFormOpen] = useState(false);
  const lectures = useSelector((stat) => stat.course.sections[index]?.lecture || []);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDragHandleHovered, setIsDragHandleHovered] = useState(false);
  const dispatch = useDispatch();
  
  // Setup sortable handlers
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id });

  // Apply drag styles with enhanced visual feedback
  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || 'all 0.3s cubic-bezier(0.2, 0, 0, 1)',
    backgroundColor: isDragging ? `${theme.primary}10` : theme.cardBg,
    color: theme.text,
    borderColor: isDragging ? theme.primary : theme.border,
    borderWidth: isDragging ? '2px' : '1px',
    borderStyle: isDragging ? 'dashed' : 'solid',
    boxShadow: isDragging 
      ? `0 10px 15px -3px ${theme.primary}30, 0 4px 6px -4px ${theme.primary}20` 
      : 'none',
    opacity: isDragging ? 0.8 : 1,
    zIndex: isDragging ? 999 : 'auto',
  };

  return (
    <div
      ref={setNodeRef}
      className={`flex flex-col gap-4 px-4 py-3 rounded-md overflow-hidden ${
        isExpanded ? "max-h-[1000px]" : "max-h-20"
      }`}
      style={{
        ...style,
        transition: 'all 0.3s cubic-bezier(0.2, 0, 0, 1)',
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`p-1.5 rounded-md cursor-move flex items-center justify-center transition-all duration-200 ${isDragging ? 'bg-opacity-20' : ''}`}
            style={{ 
              backgroundColor: isDragHandleHovered || isDragging ? `${theme.primary}20` : 'transparent',
              border: isDragHandleHovered || isDragging ? `1px solid ${theme.primary}40` : '1px solid transparent',
              transform: isDragHandleHovered && !isDragging ? 'scale(1.1)' : 'scale(1)',
            }}
            onMouseEnter={() => setIsDragHandleHovered(true)}
            onMouseLeave={() => setIsDragHandleHovered(false)}
            {...attributes}
            {...listeners}
          >
            <MdDragIndicator
              size={20}
              style={{ 
                color: isDragging || isDragHandleHovered ? theme.primary : theme.secondary,
              }}
            />
          </div>
          <div className={`flex flex-col ${isDragging ? 'transform-none' : ''}`}>
            <div className="flex items-center">
              <span 
                className="font-semibold mr-2 px-2 py-0.5 text-sm rounded-md" 
                style={{ 
                  backgroundColor: `${theme.primary}15`,
                  color: theme.primary
                }}
              >
                Section {index + 1}
              </span>
              <h2 
                className="text-md font-medium transition-all" 
                style={{ 
                  color: isDragging ? theme.primary : theme.text
                }}
              >
                {section}
              </h2>
            </div>
            {lectures && (
              <span 
                className="text-xs ml-1" 
                style={{ color: theme.secondary }}
              >
                {lectures.length} item{lectures.length !== 1 ? 's' : ''}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <CiEdit 
            className=" rounded-md hover:bg-opacity-20 transition-all duration-200"
            style={{ 
              color: theme.secondary, 
              cursor: 'pointer',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = `${theme.secondary}20`;
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          />
          <MdOutlineDeleteOutline 
            className=" rounded-md hover:bg-opacity-20 transition-all duration-200"
            style={{ 
              color: theme.secondary, 
              cursor: 'pointer',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = `${theme.secondary}20`;
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          />
          <div
            className="p-1.5 rounded-md hover:bg-opacity-20 transition-all duration-200 cursor-pointer"
            style={{ 
              backgroundColor: isExpanded ? `${theme.primary}15` : 'transparent'
            }}
            onClick={() => setIsExpanded(!isExpanded)}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = isExpanded ? `${theme.primary}25` : `${theme.secondary}20`;
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = isExpanded ? `${theme.primary}15` : 'transparent';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <MdKeyboardArrowUp
              style={{ 
                color: isExpanded ? theme.primary : theme.secondary,
                transform: isExpanded ? 'none' : 'rotate(180deg)',
                transition: 'transform 0.3s ease'
              }}
            />
          </div>
        </div>
      </div>
      {isExpanded && (
        <div 
          className="flex flex-col gap-4 mt-2 ml-8 pl-4 border-l-2 transition-all duration-300"
          style={{ 
            borderColor: `${theme.primary}30`,
          }}
        >
          <div className="flex flex-col gap-4">
            {lectures && lectures.map((lecture, y) => {
              return lecture.type === "lecture" ? (
                <LectureItem
                  lecture={lecture.title}
                  index={y}
                  key={lecture.id || `lecture-${index}-${y}`}
                  sectionId={index}
                  theme={theme}
                />
              ) : (
                <QuizItem
                  quiz={lecture}
                  index={y}
                  key={lecture.id || `quiz-${index}-${y}`}
                  sectionId={index}
                  theme={theme}
                />
              );
            })}
          </div>
          {curriculumItemFormOpen && (
            <CurriculumItemForm
              setCurriculumItemFormOpen={setCurriculumItemFormOpen}
              sectionId={index}
              theme={theme}
            />
          )}
          {!curriculumItemFormOpen && (
            <button
              onClick={() => setCurriculumItemFormOpen(!curriculumItemFormOpen)}
              className="p-4 w-[200px] h-12 flex justify-center items-center rounded-md gap-2.5 font-semibold cursor-pointer transition-all duration-300"
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
              <FaPlus style={{ color: theme.secondary }} /> Curriculum item
            </button>
          )}
        </div>
      )}
    </div>
  );
});

export default SectionItem;

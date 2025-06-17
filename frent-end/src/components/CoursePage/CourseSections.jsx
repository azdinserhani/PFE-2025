import { useState } from "react";
import { motion } from "framer-motion";
import { FaChevronDown, FaPlay, FaLock } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";

export default function CourseSections({
  module,
  onLessonClick,
  selectedLesson,
}) {
  const [open, setOpen] = useState(false);
  const { currentTheme, themes } = useTheme();
  const theme = themes[currentTheme];

  return (
    <div
      className="flex flex-col p-4 w-full min-w-md rounded-xl shadow-lg transition-all duration-300"
      style={{
        backgroundColor: theme.cardBg,
        border: `1px solid ${theme.border}`,
        boxShadow: `0 4px 12px ${theme.shadow || "rgba(0,0,0,0.1)"}`,
      }}
    >
      <motion.div
        className="flex justify-between items-center p-4 rounded-lg font-semibold cursor-pointer"
        onClick={() => setOpen(!open)}
        whileHover={{ backgroundColor: `${theme.primary}15` }}
        whileTap={{ scale: 0.98 }}
        style={{
          color: theme.text,
          borderBottom: open ? `1px solid ${theme.border}` : "none",
        }}
      >
        <div className="flex items-center gap-2.5">
          <motion.div
            className="flex justify-center items-center w-8 h-8 rounded-full"
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            style={{
              backgroundColor: `${theme.primary}20`,
              color: theme.primary,
            }}
          >
            <FaChevronDown />
          </motion.div>
          <span className="text-lg font-medium">{module?.title}</span>
        </div>

        <span
          className="flex items-center gap-2 text-sm px-3 py-1 rounded-full"
          style={{
            backgroundColor: `${theme.primary}15`,
            color: theme.primary,
          }}
        >
          {module?.duration}
        </span>
      </motion.div>

      <motion.div
        className={`overflow-hidden`}
        initial={{ maxHeight: 0 }}
        animate={{ maxHeight: open ? "1000px" : 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {module?.lessons?.map((lesson, index) => (
          <motion.div
            key={index}
            className="p-4 pl-14 flex justify-between items-center text-sm"
            style={{
              borderBottom:
                index < module?.lessons?.length - 1
                  ? `1px solid ${theme.border}30`
                  : "none",
              color: lesson.locked ? theme.secondary : theme.text,
              cursor: lesson.locked ? "not-allowed" : "pointer",
              backgroundColor:
                selectedLesson && selectedLesson.id === lesson.id
                  ? `${theme.primary}10`
                  : "transparent",
              fontWeight:
                selectedLesson && selectedLesson.id === lesson.id
                  ? "bold"
                  : "normal",
            }}
            whileHover={{
              backgroundColor: lesson.locked
                ? "transparent"
                : `${theme.primary}10`,
            }}
            onClick={() => {
              if (!lesson.locked && onLessonClick) onLessonClick(lesson);
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: lesson.locked
                    ? `${theme.secondary}20`
                    : `${theme.primary}20`,
                  color: lesson.locked ? theme.secondary : theme.primary,
                }}
              >
                {lesson.locked ? <FaLock size={12} /> : <FaPlay size={12} />}
              </div>
              <span>{lesson.title}</span>
            </div>
            <span
              className="px-2 py-1 rounded text-xs"
              style={{
                backgroundColor: lesson.locked
                  ? `${theme.secondary}15`
                  : `${theme.primary}15`,
                color: lesson.locked ? theme.secondary : theme.primary,
              }}
            >
              {lesson.duration}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

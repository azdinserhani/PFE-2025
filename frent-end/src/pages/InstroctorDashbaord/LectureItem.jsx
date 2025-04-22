import { CgNotes } from "react-icons/cg";
import { FaCheckCircle, FaPlus } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdDragIndicator, MdOutlineDeleteOutline } from "react-icons/md";
import { useState } from "react";
import ContentForm from "./ContentForm";
import { useDispatch } from "react-redux";
import { addVideoToLectureAction } from "../../redux/ApiCalls";
import { motion } from "framer-motion";

const LectureItem = ({ lecture, index, sectionId, theme }) => {
  const dispatch = useDispatch();
  const [contentFormOpen, setContentFormOpen] = useState(false);
  const [videoInfo, setVideoInfo] = useState(null);

  const handleVideoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const newVideoInfo = {
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
        uploadDate: new Date().toLocaleString(),
      };
      setVideoInfo(newVideoInfo);
      addVideoToLectureAction(dispatch, sectionId, index, newVideoInfo);
    }
  };
  console.log(lecture);

  return (
    <motion.div
      style={{
        backgroundColor: theme.cardBg,
        borderColor: theme.border,
        borderWidth: '1px',
        color: theme.text
      }}
      className="flex flex-col px-4 py-2 rounded-md duration-700 justify-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <MdDragIndicator style={{ color: theme.secondary, cursor: 'grab' }} />
          <h2 className="text-md font-medium flex items-center gap-2">
            <FaCheckCircle fontSize={12} style={{ color: theme.primary }} />
            <span className="font-semibold mr-2">
              Lecture {index + 1}:
            </span>
            <CgNotes fontSize={12} style={{ color: theme.secondary }} />
            {lecture.substring(0, 20)}
            {lecture.length > 20 ? "..." : ""}
          </h2>
          <div className="flex items-center gap-2">
            <CiEdit
              style={{ color: theme.secondary, cursor: 'pointer' }}
              className="hover:bg-opacity-20 rounded-md duration-300"
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = `${theme.secondary}20`;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            />
            <MdOutlineDeleteOutline
              style={{ color: theme.secondary, cursor: 'pointer' }}
              className="hover:bg-opacity-20 rounded-md duration-300"
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = `${theme.secondary}20`;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            />
          </div>
        </div>

        <button
          onClick={() => setContentFormOpen(!contentFormOpen)}
          className="p-4 w-[150px] h-8 flex justify-center items-center rounded-md gap-2.5 font-semibold cursor-pointer transition duration-300 ease-in-out"
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
          {contentFormOpen ? (
            <>
              <FaPlus style={{ color: theme.secondary }} className="rotate-45 duration-300" />
              Content
            </>
          ) : (
            <>
              <FaPlus style={{ color: theme.secondary }} /> Content
            </>
          )}
        </button>
      </div>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: contentFormOpen ? "auto" : 0,
          opacity: contentFormOpen ? 1 : 0,
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        {contentFormOpen && (
          <ContentForm
            lectureIndex={index}
            sectionIndex={sectionId}
            videoInfo={videoInfo}
            handleVideoUpload={handleVideoUpload}
            theme={theme}
          />
        )}
      </motion.div>
    </motion.div>
  );
};

export default LectureItem;

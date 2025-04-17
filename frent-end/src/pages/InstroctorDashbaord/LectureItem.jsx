import { CgNotes } from "react-icons/cg";
import { FaCheckCircle, FaPlus } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useState } from "react";
import ContentForm from "./ContentForm";
import { useDispatch } from "react-redux";
import { addVideoToLectureAction } from "../../redux/ApiCalls";
import { motion } from "framer-motion";

const LectureItem = ({ lecture, index, sectionId }) => {
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

  return (
    <motion.div
      className="flex flex-col  bg-white px-4 py-2 rounded-md border border-gray-500 duration-700  justify-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-md font-medium flex items-center gap-2">
            <FaCheckCircle fontSize={12} />
            <span className="font-semibold mr-2">Lecture {index + 1}:</span>{" "}
            <CgNotes fontSize={12} />
            {lecture}
          </h2>
          <div className="flex items-center gap-2">
            <CiEdit className="text-gray-500 cursor-pointer hover:bg-gray-300 rounded-md duration-300" />
            <MdOutlineDeleteOutline className="text-gray-500 cursor-pointer hover:bg-gray-300 rounded-md duration-300" />
          </div>
        </div>

        <button
          onClick={() => setContentFormOpen(!contentFormOpen)}
          className={`p-4 w-[150px] h-8 flex justify-center items-center rounded-md gap-2.5 text-purple-700 font-semibold cursor-pointer border border-purple-500 hover:bg-purple-200 transition duration-300 ease-in-out`}
        >
          {contentFormOpen ? (
            <>
              <FaPlus className="text-gray-400 rotate-45 duration-300" /> Content
            </>
          ) : (
            <>
              <FaPlus className="text-gray-400" /> Content
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
          />
        )}
      </motion.div>
    </motion.div>
  );
};

export default LectureItem;

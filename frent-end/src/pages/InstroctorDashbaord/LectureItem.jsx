import { CgNotes } from "react-icons/cg";
import { FaCheckCircle, FaPlus } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useState } from "react";
import ContentForm from "./ContentForm";
import { useDispatch, useSelector } from "react-redux";
import { addVideoToLectureAction, uploadFile } from "../../redux/ApiCalls";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";

const LectureItem = React.memo(({ lecture, index, sectionId, theme }) => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const [contentFormOpen, setContentFormOpen] = useState(false);

  const [videoFileUrl, setVideoFileurl] = useState(null);

  const handleVideoUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true); // Start loading

    try {
      const fileUrl = await uploadFile(file);

      setVideoFileurl(fileUrl.url);
      addVideoToLectureAction(dispatch, sectionId, index, fileUrl.url);
    } catch (error) {
      console.error("Video upload failed:", error);
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <motion.div
      style={{
        backgroundColor: theme.cardBg,
        borderColor: theme.border,
        borderWidth: "1px",
        color: theme.text,
        boxShadow: `0 2px 8px ${theme.primary}10`,
        transition: "all 0.3s ease-in-out",
      }}
      className="flex flex-col px-4 py-3 rounded-md justify-center"
      // initial={{ opacity: 0, y: 20 }}
      // animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{
        backgroundColor: `${theme.cardBg}`,
        boxShadow: `0 4px 12px ${theme.primary}20`,
        transform: "translateY(-2px)",
      }}
    >
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <motion.h2
            className="text-md font-medium flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <FaCheckCircle fontSize={12} style={{ color: theme.primary }} />
            </motion.div>
            <span className="font-semibold mr-2" style={{ color: theme.text }}>
              Lecture {index + 1}:
            </span>
            <CgNotes fontSize={12} style={{ color: theme.secondary }} />
            <span style={{ color: theme.text }}>
              {lecture.substring(0, 20)}
              {lecture.length > 20 ? "..." : ""}
            </span>
          </motion.h2>
          <div className="flex items-center gap-2">
            <motion.div
              whileHover={{
                scale: 1.1,
                backgroundColor: `${theme.secondary}20`,
              }}
              whileTap={{ scale: 0.9 }}
            >
              <CiEdit
                className="p-1 rounded-md cursor-pointer"
                style={{
                  color: theme.secondary,
                  transform: "scale(1.2)",
                }}
              />
            </motion.div>
            <motion.div
              whileHover={{
                scale: 1.1,
                backgroundColor: `${theme.secondary}20`,
              }}
              whileTap={{ scale: 0.9 }}
            >
              <MdOutlineDeleteOutline
                className="p-1 rounded-md cursor-pointer"
                style={{
                  color: theme.secondary,
                  transform: "scale(1.2)",
                }}
              />
            </motion.div>
          </div>
        </div>

        <motion.button
          onClick={() => setContentFormOpen(!contentFormOpen)}
          className="p-4 w-[150px] h-8 flex justify-center items-center rounded-md gap-2.5 font-semibold cursor-pointer"
          style={{
            backgroundColor: theme.background,
            color: theme.primary,
            borderColor: theme.primary,
            borderWidth: "1px",
          }}
          whileHover={{
            backgroundColor: `${theme.primary}20`,
            transform: "translateY(-2px)",
            boxShadow: `0 4px 8px -2px ${theme.primary}30`,
          }}
          whileTap={{ transform: "translateY(0)" }}
        >
          <AnimatePresence mode="wait">
            {contentFormOpen ? (
              <motion.div className="flex items-center gap-1">
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 45 }}
                  exit={{ rotate: 0 }}
                >
                  <FaPlus style={{ color: theme.secondary }} />
                </motion.div>
                <span>Content</span>
              </motion.div>
            ) : (
              <motion.div className="flex items-center gap-1">
                <motion.div
                  initial={{ rotate: 45 }}
                  animate={{ rotate: 0 }}
                  exit={{ rotate: 45 }}
                >
                  <FaPlus style={{ color: theme.secondary }} />
                </motion.div>
                <span>Content</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
      <AnimatePresence>
        {contentFormOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <ContentForm
              lectureIndex={index}
              sectionIndex={sectionId}
              handleVideoUpload={handleVideoUpload}
              theme={theme}
              loading={loading}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});

export default LectureItem;

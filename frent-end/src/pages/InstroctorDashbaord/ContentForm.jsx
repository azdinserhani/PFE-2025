import React from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

const ContentForm = ({
  handleVideoUpload,
  sectionIndex,
  lectureIndex,
  theme,
}) => {
  const video = useSelector((state) => {
    const section = state.course.sections[sectionIndex];
    return section?.lecture[lectureIndex]?.video || null;
  });

  return (
    <motion.div
      className="mx-auto flex flex-col gap-4 mt-4 p-4 rounded-lg w-full"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      style={{
        backgroundColor: `${theme.primary}08`,
        border: `1px dashed ${theme.primary}40`,
      }}
    >
      <motion.div className="mb-4" whileHover={{ scale: 1.02 }}>
        <motion.label
          htmlFor="video"
          className="flex items-center justify-center gap-3 cursor-pointer p-4 rounded-lg transition-all duration-300"
          style={{
            backgroundColor: `${theme.primary}15`,
            border: `1px dashed ${theme.primary}40`,
          }}
          whileHover={{
            backgroundColor: `${theme.primary}25`,
            boxShadow: `0 4px 12px ${theme.primary}20`,
          }}
          whileTap={{ scale: 0.98 }}
        >
          <FaCloudUploadAlt
            style={{ color: theme.primary }}
            className="text-2xl"
          />
          <span
            style={{ color: theme.primary }}
            className="font-medium text-lg"
          >
            Upload Video
          </span>
        </motion.label>
        <input
          id="video"
          type="file"
          accept="video/*"
          className="hidden"
          onChange={handleVideoUpload}
        />
      </motion.div>

      <AnimatePresence>
        {video && (
          <motion.div
            className="p-4 rounded-lg"
            style={{
              backgroundColor: theme.cardBg,
              border: `1px solid ${theme.border}`,
            }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <motion.h3
              className="text-lg font-medium mb-4"
              style={{ color: theme.primary }}
            >
              Video Information
            </motion.h3>
            <motion.div
              className="grid grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <InfoItem label="Name" value={video.name} theme={theme} />
              <InfoItem label="Size" value={video.size} theme={theme} />
              <InfoItem
                label="Uploaded On"
                value={video.uploadDate}
                theme={theme}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const InfoItem = ({ label, value, theme }) => (
  <div className="flex flex-col">
    <span
      className="text-sm font-medium mb-1"
      style={{ color: theme.secondary }}
    >
      {label}:
    </span>
    <span className="text-sm" style={{ color: theme.text }}>
      {value}
    </span>
  </div>
);

export default ContentForm;

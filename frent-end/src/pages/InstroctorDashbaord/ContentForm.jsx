import React from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

const ContentForm = ({ handleVideoUpload, sectionIndex, lectureIndex }) => {
  const video = useSelector((state) => {
    const section = state.course.sections[sectionIndex];
    return section?.lecture[lectureIndex]?.video || null;
  });

  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const videoInfoVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      className="mx-auto bg-white flex flex-col gap-4 mt-2 p-4 rounded-md border border-purple-500 w-full items-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="mb-4">
        <label htmlFor="video" className="flex items-center cursor-pointer">
          <FaCloudUploadAlt className="text-purple-500 text-2xl mr-2" />
          <span className="text-purple-700 font-medium text-lg">
            Upload Video
          </span>
        </label>
        <input
          id="video"
          type="file"
          accept="video/*"
          className="hidden"
          onChange={handleVideoUpload}
        />
      </div>
      <AnimatePresence>
        {video && (
          <motion.div
            className="mt-4 p-4 bg-gray-100 rounded-md w-full"
            variants={videoInfoVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              Video Information:
            </h3>
            <div className="flex justify-between text-gray-600">
              <div className="flex flex-col">
                <div className="font-medium text-gray-700">Name:</div>
                <div>{video.name}</div>
              </div>
              <div className="flex flex-col">
                <div className="font-medium text-gray-700">Size:</div>
                <div>{video.size}</div>
              </div>
              <div className="flex flex-col">
                <div className="font-medium text-gray-700">Uploaded On:</div>
                <div>{video.uploadDate}</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ContentForm;

import { CgNotes } from "react-icons/cg";
import { FaCheckCircle, FaPlus } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useState } from "react";
import ContentForm from "./ContentForm";
const LectureItem = ({ lecture, index }) => {
  const [contentFormOpen, setContentFormOpen] = useState(false);
  const [videoInfo, setVideoInfo] = useState(null);
  const handleVideoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setVideoInfo({
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
        uploadDate: new Date().toLocaleString(),
      });
    }
  };
  return (
    <div className="flex flex-col gap-4 bg-white px-4 py-2 rounded-md border border-gray-500">
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-md font-medium  flex items-center gap-2">
            <FaCheckCircle fontSize={12} />
            <span className="font-semibold mr-2">
              Lecture {index + 1}:
            </span>{" "}
            <CgNotes fontSize={12} />
            {lecture}
          </h2>
          <div className="flex items-center gap-2">
            <CiEdit className="text-gray-500 cursor-pointer hover:bg-gray-300 rounded-md duration-300" />
            <MdOutlineDeleteOutline className="text-gray-500 cursor-pointer hover:bg-gray-300 rounded-md duration-300" />
          </div>
        </div>

        <button
          onClick={() => setContentFormOpen(true)}
          className="p-4 w-[150px] h-8 flex justify-center items-center rounded-md gap-2.5 text-purple-700 font-semibold cursor-pointer border border-purple-500 hover:bg-purple-200 transition duration-300 ease-in-out"
        >
          <FaPlus className="text-gray-400" /> Content{" "}
        </button>
      </div>
      {contentFormOpen && (
        <ContentForm
          videoInfo={videoInfo}
          handleVideoUpload={handleVideoUpload}
        />
      )}
    </div>
  );
};

export default LectureItem;

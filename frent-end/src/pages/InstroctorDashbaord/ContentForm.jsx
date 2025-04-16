import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";

const ContentForm = ({videoInfo,handleVideoUpload}) => {
//   const [videoInfo, setVideoInfo] = useState(null);

//   const handleVideoUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setVideoInfo({
//         name: file.name,
//         size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
//         uploadDate: new Date().toLocaleString(),
//       });
//     }
//   };

  return (
    <div className="mx-auto bg-white flex flex-col gap-4 p-4 rounded-md border border-purple-500 w-full items-center">
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
      {videoInfo && (
        <div className="mt-4 p-4 bg-gray-100 rounded-md w-full">
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            Video Information:
          </h3>
          <div className="flex justify-between text-gray-600">
            <div className="flex flex-col">
              <div className="font-medium text-gray-700">Name:</div>
              <div>{videoInfo.name}</div>
            </div>
            <div className="flex flex-col">
              <div className="font-medium text-gray-700">Size:</div>
              <div>{videoInfo.size}</div>
            </div>
            <div className="flex flex-col">
              <div className="font-medium text-gray-700">Uploaded On:</div>
              <div>{videoInfo.uploadDate}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentForm;

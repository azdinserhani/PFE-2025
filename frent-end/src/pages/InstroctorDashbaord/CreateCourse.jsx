import React, { useState } from "react";
import { TbCategory } from "react-icons/tb";
import InputField from "../../components/Auth/InputField";
import { FaUserAlt } from "react-icons/fa";
import { LuListTodo } from "react-icons/lu";
import { FaImage } from "react-icons/fa";

const CreateCourse = () => {
    const [img, setImg] = useState(null);
    const [fileName, setFileName] = useState("");
    const [sections, setSections] = useState([]);
    const [sectionTitle, setSectionTitle] = useState("");

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name);
            setImg(URL.createObjectURL(file));
        }
    };

    const handleAddSection = () => {
        if (sectionTitle.trim()) {
            setSections([...sections, sectionTitle]);
            setSectionTitle("");
        }
    };

    return (
        <div className="container mx-auto p-3 overflow-y-scroll h-screen flex flex-col gap-4">
            <span>Complete all Field(1/6)</span>
            <div className="flex pt-20 gap-4">
                <div className="flex flex-col gap-4 flex-1/2 ">
                    <div className="flex gap-2 items-center">
                        <div className="bg-purple-100 p-2 rounded-full">
                            <TbCategory fontSize={30} className="text-purple-500" />
                        </div>
                        <h2 className="text-lg font-semibold">Customize your course</h2>
                    </div>
                    <div className="flex flex-col gap-4 bg-purple-100 p-4 rounded-md">
                        <h2 className="text-md font-medium text-purple-950">
                            Course Title
                        </h2>
                        <input
                            type="text"
                            placeholder="Course Title"
                            id={"title"}
                            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 text-purple-800"
                        />
                    </div>
                    <div className="flex flex-col gap-4 bg-purple-100 p-4 rounded-md">
                        <h2 className="text-md font-medium text-purple-950">
                            Course description
                        </h2>
                        <textarea
                            rows={4}
                            type="text"
                            placeholder="Course description"
                            id={"title"}
                            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 text-purple-800"
                        />
                    </div>
                    <div className="flex flex-col gap-4 bg-purple-100 p-4 rounded-md">
                        <h2 className="text-md font-medium text-purple-950">
                            Course image
                        </h2>
                        <input
                            type="file"
                            name="image"
                            id="image"
                            className="hidden"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                        <label
                            htmlFor="image"
                            className="w-full h-52   flex justify-center items-center cursor-pointer overflow-hidden border-gray-300 border"
                        >
                            {img ? (
                                <img
                                    src={img}
                                    alt="Selected Image"
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <FaImage className="text-gray-500 text-5xl" />
                            )}
                        </label>
                    </div>
                    <div className="flex flex-col gap-4 bg-purple-100 p-4 rounded-md">
                        <h2 className="text-md font-medium text-purple-950">
                            Course Price
                        </h2>
                        <input
                            type="number"
                            placeholder="Course description"
                            id={"title"}
                            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 text-purple-800"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-4 flex-1/2">
                    <div className="flex gap-2 items-center">
                        <div className="bg-purple-100 p-2 rounded-full">
                            <LuListTodo fontSize={30} className="text-purple-500" />
                        </div>
                        <h2 className="text-lg font-semibold">Course Content</h2>
                    </div>
                    <div className="flex flex-col gap-4 bg-purple-100 p-4 rounded-md">
                        <h2 className="text-md font-medium text-purple-950">
                            Course Section
                        </h2>
                        <div className="flex gap-1.5">
                            <input
                                type="text"
                                placeholder="Section Title"
                                value={sectionTitle}
                                onChange={(e) => setSectionTitle(e.target.value)}
                                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 text-purple-800 w-full"
                            />
                            <button
                                onClick={handleAddSection}
                                className="w-[100px] bg-purple-500 text-white rounded-md p-2 hover:bg-purple-600 transition-all cursor-pointer"
                            >
                                Add
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 bg-purple-100 p-4 rounded-md">
                        <h2 className="text-md font-medium text-purple-950">
                            Sections List
                        </h2>
                        <div className="flex flex-col gap-2">
                            {sections.map((section, index) => (
                                <div
                                    key={index}
                                    className="border border-gray-300 rounded-md p-2 text-purple-800"
                                >
                                    {section}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateCourse;

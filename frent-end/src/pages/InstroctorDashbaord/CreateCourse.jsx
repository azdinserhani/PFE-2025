import React, { useState, useEffect } from "react";
import { TbCategory } from "react-icons/tb";
import { FaUserAlt, FaImage, FaPlus } from "react-icons/fa";
import { LuListTodo } from "react-icons/lu";
import AddSectionForm from "./AddSectionForm";
import SectionItem from "./SectionItem";
import { useSelector, useDispatch } from "react-redux";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { reorderSections } from "../../redux/features/courseSlice";

const CreateCourse = () => {
  const [img, setImg] = useState(null);
  const [fileName, setFileName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [progress, setProgress] = useState(0);
  const sec = useSelector((stat) => stat.course.sections);
  const [sectionFormOpen, setSectionFormOpen] = useState(false);
  const dispatch = useDispatch();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      setImg(URL.createObjectURL(file));
    }
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    if (sourceIndex === destinationIndex) return;

    dispatch(reorderSections({ sourceIndex, destinationIndex }));
  };

  // Calculate progress
  useEffect(() => {
    let completed = 0;
    if (title) completed++;
    if (description) completed++;
    if (img) completed++;
    if (price) completed++;
    if (category) completed++;
    setProgress((completed / 5) * 100);
  }, [title, description, img, price, category]);

  return (
    <div className="container mx-auto p-6 h-screen flex flex-col gap-6 bg-gray-50">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-purple-700">
          Create a New Course
        </h1>
        <span className="text-sm text-gray-500">
          Complete all fields ({Math.round(progress / 20)}/5)
        </span>
      </div>
      <div className="w-full bg-purple-200 h-2 rounded-full">
        <div
          className="bg-purple-600 h-2 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="flex gap-6 overflow-y-scroll h-full">
        {/* Left Section */}
        <div className="flex flex-col gap-6 flex-1">
          <div className="flex gap-3 items-center">
            <div className="bg-purple-100 p-3 rounded-full">
              <TbCategory fontSize={30} className="text-purple-500" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">
              Customize Your Course
            </h2>
          </div>
          <div className="bg-white shadow-md p-6 rounded-lg">
            <h2 className="text-lg font-medium text-gray-700">Course Title</h2>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter course title"
              className="mt-2 border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="bg-white shadow-md p-6 rounded-lg">
            <h2 className="text-lg font-medium text-gray-700">
              Course Description
            </h2>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter course description"
              className="mt-2 border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="bg-white shadow-md p-6 rounded-lg">
            <h2 className="text-lg font-medium text-gray-700">Course Image</h2>
            <input
              type="file"
              id="image"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
            <label
              htmlFor="image"
              className="mt-2 w-full h-52 flex justify-center items-center cursor-pointer border border-dashed border-gray-300 rounded-md overflow-hidden"
            >
              {img ? (
                <img
                  src={img}
                  alt="Selected"
                  className="h-full w-full object-cover"
                />
              ) : (
                <FaImage className="text-gray-400 text-5xl" />
              )}
            </label>
          </div>
          <div className="flex gap-2">
            <div className="bg-white shadow-md p-6 rounded-lg flex-1/2">
              <h2 className="text-lg font-medium text-gray-700">
                Course Price
              </h2>
              <input
                min={0}
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter course price"
                className="mt-2 border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="bg-white shadow-md p-6 rounded-lg flex-1/2">
              <h2 className="text-lg font-medium text-gray-700">
                Course Category
              </h2>
              <div className="relative">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="appearance-auto mt-2 px-2 border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Select a category</option>
                  <option value="Programming">Programming</option>
                  <option value="Design">Design</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Business">Business</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col gap-6 flex-1">
          <div className="flex gap-3 items-center">
            <div className="bg-purple-100 p-3 rounded-full">
              <LuListTodo fontSize={30} className="text-purple-500" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">
              Course Content
            </h2>
          </div>
          <div className="bg-white shadow-md p-6 rounded-lg flex flex-col gap-4">
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="sections" type="section">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="flex flex-col gap-4"
                  >
                    {sec.map((section, index) => (
                      <SectionItem
                        section={section.title}
                        index={index}
                        key={section.id || index}
                      />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
            {!sectionFormOpen && (
              <button
                onClick={() => setSectionFormOpen(!sectionFormOpen)}
                className="p-3 w-full flex cursor-pointer justify-center items-center rounded-md gap-2 text-purple-700 font-semibold border border-purple-500 hover:bg-purple-100 transition duration-300"
              >
                <FaPlus className="text-gray-400" /> Add Section
              </button>
            )}
            {sectionFormOpen && (
              <AddSectionForm setSectionFormOpen={setSectionFormOpen} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCourse;

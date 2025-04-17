import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useDispatch } from "react-redux";
import { createSection } from "../../redux/ApiCalls";
const AddSectionForm = ({ setSectionFormOpen, setSections, sections }) => {
  const dispatch = useDispatch();
  const [sectionTitle, setSectionTitle] = useState("");
  const handleInputChange = (e) => {
    if (e.target.value.length <= 80) {
      setSectionTitle(e.target.value);
    }
  };

  const handleAddSection = () => {
    if (sectionTitle.trim()) {
      const newSection = {
        title: sectionTitle,
        lectures: [],
      };

      createSection(dispatch, newSection);
    }
  };
  return (
    <div className="w-full h-[180px] flex flex-col gap-4 bg-white p-4 rounded-md border border-purple-500 relative">
      <IoMdClose
        onClick={() => setSectionFormOpen(false)}
        className="bg-purple-200 h-5 w-5 text-purple-900 cursor-pointer"
      />
      <div className="flex items-center gap-2 w-full">
        <span className="w-[120px] font-semibold text-purple-900">
          New Section:
        </span>
        <div className="w-full flex items-center gap-2">
          <input
            type="text"
            placeholder="Enter a title for this section"
            className="border border-purple-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 text-purple-800 w-full"
            value={sectionTitle}
            onChange={handleInputChange}
          />
          <span className="text-purple-700 font-medium">
            {80 - sectionTitle.length}
          </span>
        </div>
      </div>
      <div className="flex absolute bottom-4 right-4 items-center gap-4">
        <span
          onClick={() => setSectionFormOpen(false)}
          className=" text-purple-700 cursor-pointer "
        >
          Cancel
        </span>
        <button
          onClick={() => {
            handleAddSection();
            setSectionFormOpen(false);
          }}
          className="p-4 w-[200px] h-12 flex justify-center items-center rounded-md gap-2.5 text-white bg-purple-700 font-semibold cursor-pointer hover:bg-purple-500 transition duration-300 ease-in-out "
        >
          Add Section
        </button>
      </div>
    </div>
  );
};

export default AddSectionForm;

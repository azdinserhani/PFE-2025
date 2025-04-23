import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useDispatch } from "react-redux";
import { createSection } from "../../redux/ApiCalls";
import { useTheme } from "../../context/ThemeContext";

const AddSectionForm = ({ setSectionFormOpen, setSections, sections }) => {
  const dispatch = useDispatch();
  const { currentTheme, themes } = useTheme();
  const theme = themes[currentTheme];
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
    <div 
      className="w-full h-[180px] flex flex-col gap-4 p-5 rounded-lg relative shadow-sm"
      style={{ 
        backgroundColor: theme.cardBg,
        border: `1px solid ${theme.primary}`,
        transition: "all 0.3s ease"
      }}
    >
      <div className="absolute top-3 right-3">
        <IoMdClose
          onClick={() => setSectionFormOpen(false)}
          className="h-6 w-6 cursor-pointer rounded-full p-1 transition-colors duration-200"
          style={{ 
            backgroundColor: `${theme.primary}20`,
            color: theme.primary
          }}
        />
      </div>
      
      <div className="flex items-center gap-3 w-full mt-2">
        <span 
          className="w-[120px] font-semibold text-base"
          style={{ color: theme.primary }}
        >
          New Section:
        </span>
        <div className="w-full flex items-center gap-2">
          <input
            type="text"
            placeholder="Enter a title for this section"
            className="rounded-md p-2.5 w-full transition-all duration-200 focus:outline-none focus:ring-2"
            style={{ 
              backgroundColor: currentTheme === 'dark' ? '#2d3748' : theme.background,
              color: theme.text,
              borderColor: `${theme.primary}50`,
              border: `1px solid ${theme.primary}50`,
              caretColor: theme.primary,
              focusRing: theme.primary
            }}
            value={sectionTitle}
            onChange={handleInputChange}
          />
          <span 
            className="font-medium min-w-[30px] text-center"
            style={{ color: theme.secondary }}
          >
            {80 - sectionTitle.length}
          </span>
        </div>
      </div>
      
      <div className="flex absolute bottom-4 right-4 items-center gap-4">
        <button
          onClick={() => setSectionFormOpen(false)}
          className="px-4 py-2 rounded-md transition-colors duration-200"
          style={{ 
            color: theme.primary,
            backgroundColor: 'transparent',
            border: `1px solid ${theme.primary}`
          }}
        >
          Cancel
        </button>
        <button
          onClick={() => {
            handleAddSection();
            setSectionFormOpen(false);
          }}
          className="px-4 py-2 h-10 flex justify-center items-center rounded-md gap-2 font-semibold cursor-pointer transition-colors duration-200"
          style={{ 
            backgroundColor: theme.primary,
            color: '#ffffff',
          }}
        >
          Add Section
        </button>
      </div>
    </div>
  );
};

export default AddSectionForm;

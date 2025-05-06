import React, { useState } from "react";
import Player from "../../components/PlayCourse/Player";
import CourseSections from "../../components/CoursePage/CourseSections";
import CourseOverview from "../../components/PlayCourse/CourseOverview";
import AIChat from "../../components/PlayCourse/AIChat";
import { useTheme } from "../../context/ThemeContext";
import {
  FaBook,
  FaRobot,
  FaChevronRight,
  FaChevronLeft,
  FaCode,
  FaEye,
} from "react-icons/fa";


const PlayCourse = () => {
  const [activeTab, setActiveTab] = useState("sections");
  const [contentTab, setContentTab] = useState("overview"); // NEW
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { currentTheme, themes } = useTheme();
  const theme = themes[currentTheme];

  return (
    <div className="flex p-5 gap-4 h-screen">
      {/* Left Side */ }
      <div
        className={ `transition-all duration-300 ${isSidebarOpen ? "flex-2/3" : "flex-[95%]"
          } overflow-y-scroll p-6` }
      >
        <Player />

        <span
          onClick={ () => setContentTab("overview") }
          className="flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-300 cursor-pointer"
          style={ {
            backgroundColor:
              contentTab === "overview" ? theme.primary : "transparent",
            color: contentTab === "overview" ? "#fff" : theme.text,

          } }
        >
          <FaEye />
          Overview
        </span>



        {/* Content for Overview or IDE */ }
        <div className="mt-4">
          { contentTab === "overview" ? (
            <CourseOverview />
          ) : (
            <LiveIde />
          ) }
        </div>
      </div>

      {/* Collapse/Expand Button */ }
      <button
        onClick={ () => setIsSidebarOpen(!isSidebarOpen) }
        className="self-center p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110 cursor-pointer"
        style={ { backgroundColor: theme.primary, color: "#fff" } }
      >
        { isSidebarOpen ? <FaChevronRight /> : <FaChevronLeft /> }
      </button>

      {/* Sidebar */ }
      <div
        className={ `transition-all duration-300 ${isSidebarOpen ? "flex-1/3 flex flex-col gap-3" : "w-0 opacity-0"
          } overflow-hidden max-h-screen` }
      >
        { isSidebarOpen && (
          <>
            {/* Tabs */ }
            <div
              className="flex gap-2 p-2"
              style={ { backgroundColor: theme.cardBg, borderRadius: "0.5rem" } }
            >
              <button
                onClick={ () => setActiveTab("sections") }
                className="flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-300 cursor-pointer"
                style={ {
                  backgroundColor:
                    activeTab === "sections" ? theme.primary : "transparent",
                  color: activeTab === "sections" ? "#fff" : theme.text,
                } }
              >
                <FaBook size={ 16 } />
                <span>Sections</span>
              </button>
              <button
                onClick={ () => setActiveTab("ai-chat") }
                className="flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-300 cursor-pointer"
                style={ {
                  backgroundColor:
                    activeTab === "ai-chat" ? theme.primary : "transparent",
                  color: activeTab === "ai-chat" ? "#fff" : theme.text,
                } }
              >
                <FaRobot size={ 16 } />
                <span>AI Chat</span>
              </button>
            </div>

            {/* Sidebar Content */ }
            <div className="flex-1 overflow-y-auto">
              { activeTab === "sections" ? (
                <div className="flex flex-col gap-3">
                  <CourseSections />
                  <CourseSections />
                  <CourseSections />
                </div>
              ) : (
                <div
                  className="h-full p-4 rounded-lg"
                  style={ { backgroundColor: theme.cardBg } }
                >
                  <AIChat />
                </div>
              ) }
            </div>
          </>
        ) }
      </div>
    </div>
  );
};

export default PlayCourse;

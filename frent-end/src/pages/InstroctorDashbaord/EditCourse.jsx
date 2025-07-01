import { TbCategory } from "react-icons/tb";
import { FaUserAlt, FaImage, FaPlus, FaFileAlt } from "react-icons/fa";
import { LuListTodo } from "react-icons/lu";
import AddSectionForm from "./AddSectionForm";
import SectionItem from "./SectionItem";
import { useSelector, useDispatch } from "react-redux";
import { useTheme } from "../../context/ThemeContext";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import {
  reorderSections,
  setCourseInfo,
  resetCourse,
  setSections,
} from "../../redux/features/courseSlice";
import { MdDragIndicator } from "react-icons/md";
import {
  uploadFile,
  getCategories,
  getCourseById,
  updateCourse,
  deleteModule,
  updateModule,
  updateLecture,
} from "../../redux/ApiCalls";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaExclamationTriangle } from "react-icons/fa";
import { deleteLecture } from "../../redux/ApiCalls";

const EditCourse = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [img, setImg] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);
  const [fileName, setFileName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [categoryId, setCategoryId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [courseData, setCourseData] = useState(null);
  const [progress, setProgress] = useState(0);
  const [courseLoaded, setCourseLoaded] = useState(false);
  
  // Editing states
  const [editingItem, setEditingItem] = useState({
    type: null, // 'module' or 'lesson'
    id: null,
    moduleId: null, // for lesson editing
    title: '',
    number: null
  });
  
  // Confirmation modal states
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    type: '', // 'module' or 'lesson'
    itemId: null,
    moduleId: null, // for lesson deletion
    title: '',
    message: ''
  });

  const { course, sec } = useSelector((stat) => ({
    sec: stat.course.sections,
    course: stat.course,
  }));

  const [sectionFormOpen, setSectionFormOpen] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const dispatch = useDispatch();
  const { currentTheme, themes } = useTheme();
  const theme = themes[currentTheme];
  const [isLoading, setIsLoading] = useState(false);

  // Fetch course details and categories
  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setIsLoading(true);
        const [courseData, categoriesData] = await Promise.all([
          getCourseById(courseId),
          getCategories(),
        ]);
        setCourseData(courseData);
        console.log(courseData);
        // Populate form fields with existing course data
        setTitle(courseData.title || "");
        setDescription(courseData.description || "");
        setPrice(courseData.price || "");
        setImgUrl(courseData.image || null);
        setImg(courseData.thumbnail || null);
        setCategoryId(courseData.category.id || null);
        
        // Find and set category name
        const selectedCategory = categoriesData.find(cat => cat.id === courseData.categoryId);
        setCategory(selectedCategory ? selectedCategory.name : "");
        
        setCategories(categoriesData);
        
        // Set sections in Redux store if available
        if (courseData.sections && courseData.sections.length > 0) {
          dispatch(setSections(courseData.sections));
        }
        
        setCourseLoaded(true);
      } catch (error) {
        console.error("Error fetching course data:", error);
        alert("Failed to load course data. Please try again.");
        navigate("/instructorCourse");
      } finally {
        setIsLoading(false);
      }
    };

    if (courseId) {
      fetchCourseData();
    }
  }, [courseId, dispatch, navigate]);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = ""; // Show confirmation popup
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const handleUpdateCourse = async () => {
    try {
      await updateCourse({
        id: courseId,
        title,
        description,
        price,
        categoryId,
        image: imgUrl,
      });
      navigate(`/course/${courseId}`);
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  // Function to cancel editing and go back
  const handleCancel = () => {
    if (confirm("Are you sure you want to cancel?")) {
      dispatch(resetCourse());
      navigate("/instructorCourse");
    }
  };

  // Delete Module
  const handleDeleteModule = async (moduleId) => {
    // Show confirmation popup before deleting
    if (!confirm("Are you sure you want to delete this module? This action cannot be undone.")) {
      return; // User cancelled deletion
    }
    
    try {
      await deleteModule(moduleId);
      setCourseData(prev => ({
        ...prev,
        modules: prev.modules.filter(module => module.id !== moduleId)
      }));
    } catch (error) {
      console.error("Error deleting module:", error);
      alert("Failed to delete module. Please try again.");
    }
  };
  // Dlete lecture
  const handleDeleteLecture = async (moduleId) => {
    
    
    try {
      await deleteLecture(moduleId);
      setCourseData(prev => ({
        ...prev,
        modules: prev.modules.filter(module => module.id !== moduleId)
      }));
    } catch (error) {
      console.error("Error deleting lecture:", error);
      alert("Failed to delete lecture. Please try again.");
    }
  };
  // Delete Lesson
  const handleDeleteLesson = async (moduleId, lessonId) => {
    // Show confirmation popup before deleting
    if (!confirm("Are you sure you want to delete this lesson? This action cannot be undone.")) {
      return; // User cancelled deletion
    }
    
    try {
      // You'll need to implement deleteLesson API call
      // await deleteLesson(lessonId);
      
      // For now, update the state to remove the lesson
      setCourseData(prev => ({
        ...prev,
        modules: prev.modules.map(module => 
          module.id === moduleId 
            ? {
                ...module,
                lessons: module.lessons.filter(lesson => lesson.id !== lessonId)
              }
            : module
        )
      }));
      
      console.log("Lesson deleted successfully");
    } catch (error) {
      console.error("Error deleting lesson:", error);
      alert("Failed to delete lesson. Please try again.");
    }
  };

  // Show confirmation modal for module deletion
  const showDeleteModuleConfirmation = (moduleId) => {
    setConfirmModal({
      isOpen: true,
      type: 'module',
      itemId: moduleId,
      moduleId: null,
      title: 'Delete Module',
      message: 'Are you sure you want to delete this module? This action cannot be undone and will permanently remove all content within this module.'
    });
  };

  // Show confirmation modal for lesson deletion
  const showDeleteLessonConfirmation = (moduleId, lessonId) => {
    setConfirmModal({
      isOpen: true,
      type: 'lesson',
      itemId: lessonId,
      moduleId: moduleId,
      title: 'Delete Lesson',
      message: 'Are you sure you want to delete this lesson? This action cannot be undone and will permanently remove this lesson from the module.'
    });
  };

  // Handle confirmation modal close
  const handleConfirmModalClose = () => {
    setConfirmModal({
      isOpen: false,
      type: '',
      itemId: null,
      moduleId: null,
      title: '',
      message: ''
    });
  };

  // Handle confirmed deletion
  const handleConfirmedDelete = async () => {
    try {
      if (confirmModal.type === 'module') {
        await deleteModule(confirmModal.itemId);
        setCourseData(prev => ({
          ...prev,
          modules: prev.modules.filter(module => module.id !== confirmModal.itemId)
        }));
      } else if (confirmModal.type === 'lesson') {
        // You'll need to implement deleteLesson API call
        // await deleteLesson(confirmModal.itemId);
        
        // For now, update the state to remove the lesson
        setCourseData(prev => ({
          ...prev,
          modules: prev.modules.map(module => 
            module.id === confirmModal.moduleId 
              ? {
                  ...module,
                  lessons: module.lessons.filter(lesson => lesson.id !== confirmModal.itemId)
                }
              : module
          )
        }));
      }
      
      // Close the modal
      handleConfirmModalClose();
      
    } catch (error) {
      console.error(`Error deleting ${confirmModal.type}:`, error);
      alert(`Failed to delete ${confirmModal.type}. Please try again.`);
    }
  };

  // Start editing module title
  const startEditingModule = (moduleId, currentTitle, currentNumber) => {
    setEditingItem({
      type: 'module',
      id: moduleId,
      moduleId: null,
      title: currentTitle,
      number: currentNumber
    });
  };

  // Start editing lesson title
  const startEditingLesson = (lessonId, moduleId, currentTitle, currentNumber) => {
    setEditingItem({
      type: 'lesson',
      id: lessonId,
      moduleId: moduleId,
      title: currentTitle,
      number: currentNumber
    });
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingItem({
      type: null,
      id: null,
      moduleId: null,
      title: '',
      number: null
    });
  };

  // Save module title
  const saveModuleTitle = async () => {
    try {
      await updateModule(editingItem.id, { title: editingItem.title, number: editingItem.number });
      
      // Update local state
      setCourseData(prev => ({
        ...prev,
        modules: prev.modules.map(module => 
          module.id === editingItem.id 
            ? { ...module, title: editingItem.title, number: editingItem.number }
            : module
        )
      }));
      
      cancelEditing();
    } catch (error) {
      console.error("Error updating module title:", error);
      alert("Failed to update module title. Please try again.");
    }
  };

  // Save lesson title
  const saveLessonTitle = async () => {
    try {
      await updateLecture(editingItem.id, { title: editingItem.title, moduleId: editingItem.moduleId });
      
      // Update local state
      setCourseData(prev => ({
        ...prev,
        modules: prev.modules.map(module => 
          module.id === editingItem.moduleId 
            ? {
                ...module,
                lessons: module.lessons.map(lesson => 
                  lesson.id === editingItem.id 
                    ? { ...lesson, title: editingItem.title, number: editingItem.number, module_id: editingItem.moduleId }
                    : lesson
                )
              }
            : module
        )
      }));
      
      cancelEditing();
    } catch (error) {
      console.error("Error updating lesson title:", error);
      alert("Failed to update lesson title. Please try again.");
    }
  };

  // Handle save action
  const handleSaveEdit = () => {
    if (editingItem.type === 'module') {
      saveModuleTitle();
    } else if (editingItem.type === 'lesson') {
      saveLessonTitle();
    }
  };

  // Handle key press in edit input
  const handleEditKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSaveEdit();
    } else if (e.key === 'Escape') {
      cancelEditing();
    }
  };

  // DnD sensors configuration
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor)
  );

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = await uploadFile(file);
      setImgUrl(url.url);
      setFileName(file.name);
      setImg(URL.createObjectURL(file));
    }
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

  // Handle drag start event to track the active item
  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  // Handle drag end event for reordering sections
  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);

    if (active.id !== over.id) {
      const activeIndex = sec.findIndex((section) => section.id === active.id);
      const overIndex = sec.findIndex((section) => section.id === over.id);

      dispatch(reorderSections({ activeIndex, overIndex }));
    }
  };

  // Find active section for DragOverlay
  const activeSection = sec.find((section) => section.id === activeId);
  const activeSectionIndex = sec.findIndex(
    (section) => section.id === activeId
  );

  // Show loading state while fetching course data
  if (!courseLoaded && isLoading) {
    return (
      <div
        className="container mx-auto p-6 h-screen flex items-center justify-center"
        style={{ backgroundColor: theme.background }}
      >
        <div className="flex flex-col items-center gap-4">
          <AiOutlineLoading3Quarters
            className="animate-spin"
            size={40}
            style={{ color: theme.primary }}
          />
          <p style={{ color: theme.text }}>Loading course data...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="container mx-auto p-6 h-screen flex flex-col gap-6 "
      style={{ backgroundColor: theme.background }}
    >
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold" style={{ color: theme.primary }}>
          Edit Course
        </h1>
        <span style={{ color: theme.secondary }}>
          Complete all fields ({Math.round(progress / 20)}/5)
        </span>
      </div>
      <div
        className="w-full h-2 rounded-full"
        style={{ backgroundColor: `${theme.primary}20` }}
      >
        <div
          className="h-2 rounded-full transition-all duration-500"
          style={{ backgroundColor: theme.primary, width: `${progress}%` }}
        ></div>
      </div>
      <div className="flex gap-6 overflow-y-scroll h-full">
        {/* Left Section */}
        <div className="flex flex-col gap-6 flex-1">
          <div className="flex gap-3 items-center">
            <div
              className="p-3 rounded-full"
              style={{ backgroundColor: `${theme.primary}20` }}
            >
              <TbCategory fontSize={30} style={{ color: theme.primary }} />
            </div>
            <h2 className="text-xl font-semibold" style={{ color: theme.text }}>
              Course Information
            </h2>
          </div>
          <div
            className="shadow-md p-6 rounded-lg"
            style={{ backgroundColor: theme.cardBg }}
          >
            <h2 className="text-lg font-medium" style={{ color: theme.text }}>
              Course Title
            </h2>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter course title"
              className="mt-2 rounded-md p-3 w-full focus:outline-none focus:ring-2"
              style={{
                backgroundColor: theme.background,
                color: theme.text,
                borderColor: theme.border,
                borderWidth: "1px",
              }}
            />
          </div>
          <div
            className="shadow-md p-6 rounded-lg"
            style={{ backgroundColor: theme.cardBg }}
          >
            <h2 className="text-lg font-medium" style={{ color: theme.text }}>
              Course Description
            </h2>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter course description"
              className="mt-2 rounded-md p-3 w-full focus:outline-none focus:ring-2"
              style={{
                backgroundColor: theme.background,
                color: theme.text,
                borderColor: theme.border,
                borderWidth: "1px",
              }}
            />
          </div>
          <div
            className="shadow-md p-6 rounded-lg"
            style={{ backgroundColor: theme.cardBg }}
          >
            <h2 className="text-lg font-medium" style={{ color: theme.text }}>
              Course Image
            </h2>
            <input
              type="file"
              id="image"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
            <label
              htmlFor="image"
              className="mt-2 w-full h-52 flex justify-center items-center cursor-pointer border-dashed rounded-md overflow-hidden"
              style={{
                borderColor: theme.border,
                borderWidth: "1px",
                backgroundColor: theme.background,
              }}
            >
              {img ? (
                <img
                  src={img}
                  alt="Selected"
                  className="h-full w-full object-cover"
                />
              ) : (
                <FaImage style={{ color: theme.secondary, fontSize: "3rem" }} />
              )}
            </label>
          </div>
          <div className="flex gap-2">
            <div
              className="shadow-md p-6 rounded-lg flex-1/2"
              style={{ backgroundColor: theme.cardBg }}
            >
              <h2 className="text-lg font-medium" style={{ color: theme.text }}>
                Course Price
              </h2>
              <input
                min={0}
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter course price"
                className="mt-2 rounded-md p-3 w-full focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: theme.background,
                  color: theme.text,
                  borderColor: theme.border,
                  borderWidth: "1px",
                }}
              />
            </div>
            <div
              className="shadow-md p-6 rounded-lg flex-1/2"
              style={{ backgroundColor: theme.cardBg }}
            >
              <h2 className="text-lg font-medium" style={{ color: theme.text }}>
                Course Category
              </h2>
              <div className="relative">
                <select
                  value={categoryId || ""}
                  onChange={(e) => {
                    setCategoryId(e.target.value);
                    const selectedCategory = categories.find(cat => cat.id === e.target.value);
                    setCategory(selectedCategory ? selectedCategory.name : "");
                  }}
                  className="appearance-auto mt-2 px-2 rounded-md p-3 w-full focus:outline-none focus:ring-2"
                  style={{
                    backgroundColor: theme.background,
                    color: theme.text,
                    borderColor: theme.border,
                    borderWidth: "1px",
                  }}
                >
                  <option value="">Select a category</option>
                  {categories?.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6 flex-1 ">
          <div className="flex gap-3 items-center">
            <div
              className="p-3 rounded-full"
              style={{ backgroundColor: `${theme.primary}20` }}
            >
              <LuListTodo fontSize={30} style={{ color: theme.primary }} />
            </div>
            <h2 className="text-xl font-semibold" style={{ color: theme.text }}>
              Course Content
            </h2>
          </div>
          <div
            className="shadow-md p-6 rounded-lg flex flex-col gap-4"
            style={{ backgroundColor: theme.cardBg }}
          >
            <div
              className="flex flex-col gap-4 p-2"
              style={{ minHeight: "100px" }}
            >
              {courseData?.modules?.map((module) => (
                <div
                  key={module.id}
                  className="border rounded-lg p-4 mb-4 transition-all duration-300 hover:shadow-lg"
                  style={{
                    backgroundColor: `${theme.primary}05`,
                    borderColor: `${theme.primary}30`,
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    {editingItem.type === 'module' && editingItem.id === module.id ? (
                      <div className="flex items-center gap-2 flex-1">
                        <input
                          type="text"
                          value={editingItem.title}
                          onChange={(e) => setEditingItem(prev => ({ ...prev, title: e.target.value }))}
                          onKeyDown={handleEditKeyPress}
                          className="text-lg font-semibold bg-transparent border-b-2 focus:outline-none flex-1"
                          style={{ 
                            color: theme.text,
                            borderColor: theme.primary
                          }}
                          autoFocus
                        />
                        <button
                          onClick={handleSaveEdit}
                          className="p-1 rounded-md transition-all duration-200 hover:bg-green-100"
                          style={{ color: '#10b981' }}
                          title="Save"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </button>
                        <button
                          onClick={cancelEditing}
                          className="p-1 rounded-md transition-all duration-200 hover:bg-red-100"
                          style={{ color: '#ef4444' }}
                          title="Cancel"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <>
                        <h3 
                          className="text-lg font-semibold"
                          style={{ color: theme.text }}
                        >
                          {module.title}
                        </h3>
                        <div className="flex items-center gap-2">
                          <button
                            className="p-2 rounded-md transition-all duration-200 hover:bg-blue-100"
                            style={{ color: theme.primary }}
                            title="Edit Module"
                            onClick={() => startEditingModule(module.id, module.title, module.order_index)}
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            className="p-2 rounded-md transition-all duration-200 hover:bg-red-100"
                            style={{ color: '#ef4444' }}
                            title="Delete Module"
                            onClick={() => showDeleteModuleConfirmation(module.id)}
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                  <p 
                    className="text-sm mb-3"
                    style={{ color: theme.secondary }}
                  >
                    {module.description}
                  </p>
                  <div className="space-y-2">
                    {module?.lessons?.map((lesson, index) => (
                      <div
                        key={lesson.id || index}
                        className="flex items-center justify-between p-2 rounded-md"
                        style={{
                          backgroundColor: `${theme.background}`,
                          border: `1px solid ${theme.border}`,
                        }}
                      >
                        {editingItem.type === 'lesson' && editingItem.id === lesson.id ? (
                          <div className="flex items-center gap-2 flex-1">
                            <input
                              type="text"
                              value={editingItem.title}
                              onChange={(e) => setEditingItem(prev => ({ ...prev, title: e.target.value }))}
                              onKeyDown={handleEditKeyPress}
                              className="text-sm bg-transparent border-b focus:outline-none flex-1"
                              style={{ 
                                color: theme.text,
                                borderColor: theme.primary
                              }}
                              autoFocus
                            />
                            <button
                              onClick={handleSaveEdit}
                              className="p-1 rounded transition-all duration-200 hover:bg-green-100"
                              style={{ color: '#10b981' }}
                              title="Save"
                            >
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </button>
                            <button
                              onClick={cancelEditing}
                              className="p-1 rounded transition-all duration-200 hover:bg-red-100"
                              style={{ color: '#ef4444' }}
                              title="Cancel"
                            >
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        ) : (
                          <>
                            <span 
                              className="text-sm"
                              style={{ color: theme.text }}
                            >
                              {lesson.title}
                            </span>
                            <div className="flex items-center gap-1">
                              <button
                                className="p-1 rounded transition-all duration-200 hover:bg-blue-100"
                                style={{ color: theme.primary }}
                                title="Edit Lesson"
                                onClick={() => {
                                  startEditingLesson(lesson.id, module.id, lesson.title, lesson.order_index, lesson.module_id); 
                                }}
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                              </button>
                              <button
                                className="p-1 rounded transition-all duration-200 hover:bg-red-100"
                                style={{ color: '#ef4444' }}
                                title="Delete Lesson"
                                onClick={() => showDeleteLessonConfirmation(module.id, lesson.id)}
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            
          </div>
          <div className="w-full flex items-center justify-end gap-3">
            <button
              onClick={handleCancel}
              className="px-4 py-1.5 rounded-md font-medium cursor-pointer h-12 flex-1 transition-all duration-300 transform flex items-center justify-center hover:-translate-y-[1px]"
              style={{
                backgroundColor: theme.background,
                color: theme.secondary,
                borderColor: theme.secondary,
                borderWidth: "1px",
                boxShadow: `0 2px 6px ${theme.secondary}20`,
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = `${theme.secondary}10`;
                e.currentTarget.style.boxShadow = `0 4px 10px ${theme.secondary}30`;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = theme.background;
                e.currentTarget.style.boxShadow = `0 2px 6px ${theme.secondary}20`;
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleUpdateCourse}
              className="px-4 py-1.5 rounded-md font-medium cursor-pointer h-12 flex-[2] transition-all duration-300 transform flex items-center justify-center hover:-translate-y-[1px]"
              style={{
                backgroundColor: theme.primary,
                color: theme.cardBg,
                boxShadow: `0 2px 6px ${theme.primary}30`,
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = `${theme.primary}e0`;
                e.currentTarget.style.boxShadow = `0 4px 10px ${theme.primary}50`;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = theme.primary;
                e.currentTarget.style.boxShadow = `0 2px 6px ${theme.primary}30`;
              }}
            >
              Update Course
            </button>
          </div>
        </div>
      </div>
      
      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={confirmModal.isOpen}
        onClose={handleConfirmModalClose}
        onConfirm={handleConfirmedDelete}
        title={confirmModal.title}
        message={confirmModal.message}
        theme={theme}
      />
    </div>
  );
};

export default EditCourse; 


// Custom Confirmation Modal Component
const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message, theme }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="rounded-lg shadow-xl max-w-md w-full mx-4 transform transition-all duration-300 scale-100"
        style={{ backgroundColor: theme.cardBg }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div 
              className="p-3 rounded-full"
              style={{ backgroundColor: '#fee2e2' }}
            >
              <FaExclamationTriangle 
                className="text-red-500" 
                size={24}
              />
            </div>
            <h3 
              className="text-lg font-semibold"
              style={{ color: theme.text }}
            >
              {title}
            </h3>
          </div>
          
          <p 
            className="text-sm mb-6 leading-relaxed"
            style={{ color: theme.secondary }}
          >
            {message}
          </p>
          
          <div className="flex gap-3 justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-md font-medium transition-all duration-200 hover:shadow-md"
              style={{
                backgroundColor: theme.background,
                color: theme.secondary,
                border: `1px solid ${theme.border}`,
              }}
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 rounded-md font-medium text-white transition-all duration-200 hover:shadow-md hover:bg-red-600"
              style={{
                backgroundColor: '#ef4444',
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
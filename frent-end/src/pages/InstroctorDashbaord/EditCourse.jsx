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
} from "../../redux/ApiCalls";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

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
  const [progress, setProgress] = useState(0);
  const [courseLoaded, setCourseLoaded] = useState(false);
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
        <div className="flex flex-col gap-6 flex-1">
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
              {sec && sec.length > 0 ? (
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext
                    items={sec.map((section) => section.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    {sec.map((section, index) => (
                      <SectionItem
                        section={section.name || section.title}
                        index={index}
                        key={section.id || `section-${index}`}
                        id={section.id}
                        theme={theme}
                      />
                    ))}
                  </SortableContext>
                  <DragOverlay adjustScale={true}>
                    {activeId ? (
                      <div
                        className="rounded-md px-4 py-3 opacity-90 w-full"
                        style={{
                          backgroundColor: `${theme.primary}05`,
                          borderColor: theme.primary,
                          borderWidth: "2px",
                          borderStyle: "dashed",
                          boxShadow: `0 10px 15px -3px ${theme.primary}30, 0 4px 6px -4px ${theme.primary}20`,
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center p-1.5 rounded-md">
                            <div
                              className="p-1.5 rounded-md flex items-center justify-center"
                              style={{
                                backgroundColor: `${theme.primary}20`,
                                border: `1px solid ${theme.primary}40`,
                              }}
                            >
                              <MdDragIndicator
                                size={20}
                                style={{ color: theme.primary }}
                              />
                            </div>
                          </div>
                          <div className="flex flex-col">
                            <div className="flex items-center">
                              <span
                                className="font-semibold mr-2 px-2 py-0.5 text-sm rounded-md"
                                style={{
                                  backgroundColor: `${theme.primary}15`,
                                  color: theme.primary,
                                }}
                              >
                                Section {activeSectionIndex + 1}
                              </span>
                              <h2
                                className="text-md font-medium"
                                style={{ color: theme.primary }}
                              >
                                {activeSection?.title || activeSection?.name}
                              </h2>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </DragOverlay>
                </DndContext>
              ) : (
                <div
                  className="text-center p-4"
                  style={{ color: theme.secondary }}
                >
                  No sections added yet. Add a section to get started.
                </div>
              )}
            </div>
            {!sectionFormOpen && (
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => setSectionFormOpen(!sectionFormOpen)}
                  className="p-3 w-full flex cursor-pointer justify-center items-center rounded-md gap-2 font-semibold transition duration-300"
                  style={{
                    backgroundColor: theme.background,
                    color: theme.primary,
                    borderColor: theme.primary,
                    borderWidth: "1px",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = `${theme.primary}20`;
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = theme.background;
                  }}
                >
                  <FaPlus style={{ color: theme.secondary }} /> Add Section
                </button>

                {sec && sec.length > 0 && (
                  <button
                    onClick={() => navigate(`/create-exam/${courseId}`)}
                    className="p-3 w-full flex cursor-pointer justify-center items-center rounded-md gap-2 font-semibold transition duration-300"
                    style={{
                      backgroundColor: theme.background,
                      color: theme.secondary,
                      borderColor: theme.secondary,
                      borderWidth: "1px",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = `${theme.secondary}20`;
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = theme.background;
                    }}
                  >
                    <FaFileAlt /> Edit Course Exam
                  </button>
                )}
              </div>
            )}
            {sectionFormOpen && (
              <AddSectionForm
                setSectionFormOpen={setSectionFormOpen}
                theme={theme}
              />
            )}
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
    </div>
  );
};

export default EditCourse; 
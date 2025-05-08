import categoryQueries from "../models/categoryQueries.js";
import courseQueries from "../models/courseQueries.js";
const courseService = {
  createCourse: async (courseData) => {
    const courseExists = await courseQueries.checkCourseExists(
      courseData.title
    );
    if (courseExists) {
      throw new Error("course title already exists");
    }
    const category = await categoryQueries.getCategoryById(
      courseData.categoryId
    );
    if (category.length === 0) {
      throw new Error("Category not found");
    }
    const course = await courseQueries.createCourse(courseData);
    console.log("Course created:", course);

    return course;
  },
  getAllCourses: async (skip = 0, limit = 10, filters = {}) => {
    const { courses, total } = await courseQueries.getAllCourses(skip, limit, filters);
    
    // Get additional statistics for each course
    const coursesWithStats = await Promise.all(
      courses.map(async (course) => {
        const [lessons, students] = await Promise.all([
          courseQueries.getCourseLessonsCount(course.id),
          courseQueries.getEnrollStudentsByCourseId(course.id)
        ]);
        
        return {
          ...course,
          lessonsCount: lessons.length,
          studentsCount: students.length
        };
      })
    );

    return {
      courses: coursesWithStats,
      total
    };
  },
  getCourseById: async (course_id) => {
    const course = await courseQueries.getCourseById(course_id);
    if (!course) {
      throw new Error("Course not found");
    }
    return course;
  },
  updateCourse: async (course_id, courseData) => {
    const courseExists = await courseQueries.getCourseById(course_id);
    if (!courseExists) {
      throw new Error("Course not found");
    }
    
    const updatedCourse = await courseQueries.updateCourse(
      course_id,
      courseData
    );
    return updatedCourse;
  },
  deleteCourse: async (course_id) => {
    const courseExists = await courseQueries.getCourseById(course_id);
    if (!courseExists) {
      throw new Error("Course not found");
    }
    const deletedCourse = await courseQueries.deleteCourse(course_id);
    return deletedCourse;
  },
  searchCourseByTitle: async (title) => {
    const courses = await courseQueries.searchCourseByTitle(title);
    return courses;
  },
  getCoursesByCategory: async (category_id) => {
    const courses = await courseQueries.getCoursesByCategory(category_id);
    return courses;
  },
  getCourseByInstructor: async (instructor_id) => {
    const courses = await courseQueries.getCourseByInstructorId(instructor_id);
    return courses;
  },
  getCourseContentByCourseId: async (course_id) => {
    const courseContent = await courseQueries.getCourseContentByCourseId(
      course_id
    );
    return courseContent;
  },
  getEnrollStudentsByCourseId: async (course_id) => {
    const enrollStudents = await courseQueries.getEnrollStudentsByCourseId(
      course_id
    );
    return enrollStudents;
  },
};

export default courseService;

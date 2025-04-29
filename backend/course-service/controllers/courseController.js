import courseService from "../services/courseService.js";

const courseController = {
  createCourse: async (req, res) => {
    try {
      const courseData = req.body;
      const createdCourse = await courseService.createCourse(courseData);
      res.status(201).json({
        success: true,
        message: "Course created successfully",
        data: createdCourse,
      });
    } catch (error) {
      const status = error.status || 500;
      const message =
        error.message || "An error occurred during crating the course";

      res.status(status).json({
        success: false,
        message,
      });
    }
  },
  updateCourse: async (req, res) => {
    try {
      const courseId = req.params.id;
      const courseData = req.body;
      const updatedCourse = await courseService.updateCourse(
        courseId,
        courseData
      );
      res.status(200).json({
        success: true,
        message: "Course updated successfully",
        data: updatedCourse,
      });
    } catch (error) {
      const status = error.status || 500;
      const message =
        error.message || "An error occurred during retrieving the courses";

      res.status(status).json({
        success: false,
        message,
      });
    }
  },
  deleteCourse: async (req, res) => {
    try {
      const courseId = req.params.id;
      await courseService.deleteCourse(courseId);
      res.status(200).json({
        success: true,
        message: "Course deleted successfully",
      });
    } catch (error) {
      const status = error.status || 500;
      const message =
        error.message || "An error occurred during deleting the course";

      res.status(status).json({
        success: false,
        message,
      });
    }
  },
  getAllCourses: async (req, res) => {
    try {
      const courses = await courseService.getAllCourses();
      res.status(200).json({
        success: true,
        message: "Courses retrieved successfully",
        result: courses.length,
        data: courses,
      });
    } catch (error) {
      const status = error.status || 500;
      const message =
        error.message || "An error occurred during retrieving the courses";

      res.status(status).json({
        success: false,
        message,
      });
    }
  },
  getCourseById: async (req, res) => {
    try {
      const courseId = req.params.id;
      const course = await courseService.getCourseById(courseId);
      res.status(200).json({
        success: true,
        message: "Course retrieved successfully",
        data: course,
      });
    } catch (error) {
      const status = error.status || 500;
      const message =
        error.message || "An error occurred during retrieving the course";

      res.status(status).json({
        success: false,
        message,
      });
    }
  },
  searchCourseByTitle: async (req, res) => { 
    try {
      const title = req.query.title;
      const courses = await courseService.searchCourseByTitle(title);
      res.status(200).json({
        success: true,
        message: "Courses retrieved successfully",
        result: courses.length,
        data: courses,
      });
    } catch (error) {
      const status = error.status || 500;
      const message =
        error.message || "An error occurred during retrieving the courses";

      res.status(status).json({
        success: false,
        message,
      });
    }
  },
  getCoursesByCategory: async (req, res) => { 
    try {
      const categoryId = req.params.category_id;
      const courses = await courseService.getCoursesByCategory(categoryId);
      res.status(200).json({
        success: true,
        message: "Courses retrieved successfully",
        result: courses.length,
        data: courses,
      });
    } catch (error) {
      const status = error.status || 500;
      const message =
        error.message || "An error occurred during retrieving the courses";

      res.status(status).json({
        success: false,
        message,
      });
    }
  },
  getCourseByInstructor: async (req, res) => {
    try {
      const instructorId = req.params.instructor_id;
      const courses = await courseService.getCourseByInstructor(instructorId);
      res.status(200).json({
        success: true,
        message: "Courses retrieved successfully",
        result: courses.length,
        data: courses,
      });
    } catch (error) {
      const status = error.status || 500;
      const message =
        error.message || "An error occurred during retrieving the courses";

      res.status(status).json({
        success: false,
        message,
      });
    }
  },
  getCourseContentByCourseId: async (req, res) => { 
    try {
      const courseId = req.params.id;
      const courseContent = await courseService.getCourseContentByCourseId(
        courseId
      );
      res.status(200).json({
        success: true,
        message: "Course content retrieved successfully",
        data: courseContent,
      });
    } catch (error) {
      const status = error.status || 500;
      const message =
        error.message || "An error occurred during retrieving the course";

      res.status(status).json({
        success: false,
        message,
      });
    }
  },
  getEnrollStudentsByCourseId: async (req, res) => {
    try {
      const courseId = req.params.id;
      const enrollStudents = await courseService.getEnrollStudentsByCourseId(
        courseId
      );
      res.status(200).json({
        success: true,
        message: "Enroll students retrieved successfully",
        data: enrollStudents,
      });
    } catch (error) {
      const status = error.status || 500;
      const message =
        error.message || "An error occurred during retrieving the students";

      res.status(status).json({
        success: false,
        message,
      });
    }
  },
};
export default courseController;

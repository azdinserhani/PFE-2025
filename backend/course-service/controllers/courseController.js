import courseService from "../services/courseService.js";

const courseController = {
  createCourse: async (req, res) => {
    try {
      const instructorId = req.user.id;
      const courseData = req.body;
      const createdCourse = await courseService.createCourse({
        ...courseData,
        instructor_id: instructorId,
      });
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
      const instructorId = req.user.id;
      const course = await courseService.getCourseById(courseId);

      if (course.instructor_id != instructorId) {
        return res.status(403).json({
          success: false,
          message: "You are not authorized to update this course",
        });
      }
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
      console.log("courseId", courseId);

      const instructorId = req.user.id;

      const course = await courseService.getCourseById(courseId);

      if (course.instructor_id != instructorId) {
        return res.status(403).json({
          success: false,
          message: "You are not authorized to delete this course",
        });
      }
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
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      // Extract filter parameters
      const filters = {
        category: req.query.category,
        search: req.query.search,
        level: req.query.level,
        maxPrice: req.query.maxPrice
          ? parseFloat(req.query.maxPrice)
          : undefined,
        sort: req.query.sort,
      };

      const { courses, total } = await courseService.getAllCourses(
        skip,
        limit,
        filters
      );

      res.status(200).json({
        success: true,
        message: "Courses retrieved successfully",
        result: courses.length,
        total,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
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
  getEnrollmentsByUserId: async (req, res) => {
        
    try {
      const userId = req.user.id;
     
      
      const enrollments = await courseService.getEnrollmentsByUserId(userId);
      res.status(200).json({
        success: true,
        message: "Enrollments retrieved successfully",
        data: enrollments,
      });
    } catch (error) {
      console.log("Error in getEnrollmentsByUserId:", error);
      
      const status = error.status || 500;
      const message =
        error.message || "An error occurred during retrieving the enrollments";

      res.status(status).json({
        success: false,
        message,
      });
    }
  }
};
export default courseController;

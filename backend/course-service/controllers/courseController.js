import courseService from "../services/courseService.js";

const courseController = {
  createCourse: async (req, res) => {
    try {
      console.log("Creating course with data:", req.body);

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
};
export default courseController;

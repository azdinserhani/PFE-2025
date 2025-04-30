import express from "express";
import courseController from "../controllers/courseController.js";
import validateRequest from "../middleware/validateRequest.js";
import { courseSchema } from "../validators/createCourseValidators.js";
import { authenticate } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post(
  "/create",
  validateRequest(courseSchema),
  courseController.createCourse
);
router.patch(
  "/course/:id",
  validateRequest(courseSchema),
  courseController.updateCourse
);
router.delete("/course/:id", courseController.deleteCourse);
router.get("/courses", courseController.getAllCourses);
router.get("/course/:id", courseController.getCourseById);
router.get("/courses/search", courseController.searchCourseByTitle);
router.get(
  "/courses/category/:category_id",
  courseController.getCoursesByCategory
);
router.get(
  "/courses/instructor/:instructor_id",
  courseController.getCourseByInstructor
);
router.get(
  "/course/content/:course_id",
  courseController.getCourseContentByCourseId
);
router.get(
  "/course/enroll-students/:course_id",
  courseController.getEnrollStudentsByCourseId
);
export default router;

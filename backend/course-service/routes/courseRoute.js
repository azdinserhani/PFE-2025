import express from "express";
import courseController from "../controllers/courseController.js";
import validateRequest from "../middleware/validateRequest.js";
import {
  courseSchema,
  updateCourseSchema,
} from "../validators/createCourseValidators.js";
import { authenticate, authorize } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post(
  "/create",
  authenticate,
  authorize(["admin", "teacher"]),
  validateRequest(courseSchema),
  courseController.createCourse
);
router.patch(
  "/update/:id",
  authenticate,
  authorize(["admin", "teacher"]),
  validateRequest(updateCourseSchema),
  courseController.updateCourse
);
router.delete(
  "/delete/:id",
  authenticate,
  authorize(["admin", "teacher"]),
  courseController.deleteCourse
);
router.get(
  "/course/enrollmentsByUserId",
  authenticate,
  courseController.getEnrollmentsByUserId
);
router.get("/courses", courseController.getAllCourses);
router.get("/course/:id", courseController.getCourseById);
router.get("/courses/search", courseController.searchCourseByTitle);
router.get(
  "/courses/category/:category_id",
  courseController.getCoursesByCategory
);
router.get(
  "/instructor/:instructor_id",
  courseController.getCourseByInstructor
);
router.get("/course/content/:id", courseController.getCourseContentByCourseId);
router.get(
  "/course/enroll-students/:course_id",
  courseController.getEnrollStudentsByCourseId
);

export default router;

import express from "express";
import courseController from "../controllers/courseController.js";
import validateRequest from "../middleware/validateRequest.js";
import { courseSchema } from "../validators/createCourseValidators.js";
const router = express.Router();

router.post(
  "/course",
  validateRequest(courseSchema),
  courseController.createCourse
);
router.get("/courses", courseController.getAllCourses);

export default router;

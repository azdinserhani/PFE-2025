import express from "express";
import lectureController from "../controllers/lectureController.js";
import validateRequest from "../middleware/validateRequest.js";
import {
  createLessonSchema,
  updateLessonSchema,
} from "../validators/createLectureValidators.js";
const router = express.Router();

// Route to create a new lesson
router.post(
  "/",
  validateRequest(createLessonSchema),
  lectureController.createLesson
);

// Route to get a lesson by ID
router.get("/:id", lectureController.getLessonById);

// Route to update a lesson by ID
router.put("/:id", lectureController.updateLesson);

// Route to delete a lesson by ID
router.delete("/:id", lectureController.deleteLesson);

// Route to get all lessons
router.get("/", lectureController.getAllLessons);

export default router;

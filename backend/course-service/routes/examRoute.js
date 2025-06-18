import express from "express";
import examController from "../controllers/examController.js";
const router = express.Router();

// Create exam
router.post("/create", examController.createExam);
// Get exam by id
router.get("/:id", examController.getExamById);
// Get all exams
router.get("/", examController.getAllExams);
// Update exam
router.put("/:id", examController.updateExam);
// Delete exam
router.delete("/:id", examController.deleteExam);

export default router;

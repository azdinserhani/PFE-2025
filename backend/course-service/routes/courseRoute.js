import express from "express";
import courseController from "../controllers/courseController";
const router = express.Router();

router.post("/course", courseController.createCourse);

export default router;

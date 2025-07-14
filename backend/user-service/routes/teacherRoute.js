import express from "express";
import teacherController from "../controllers/teacherController.js";

const router = express.Router();

router.get("/", teacherController.getAllTeachers);

export default router;
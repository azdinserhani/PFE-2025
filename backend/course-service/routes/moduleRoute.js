import express from "express";
import moduleController from "../controllers/moduleController.js";
import validateRequest from "../middleware/validateRequest.js";
import {
  createModuleSchema,
  updateModuleSchema,
} from "../validators/createModuleValidators.js";
const router = express.Router();

router.post(
  "/create",
  validateRequest(createModuleSchema),
  moduleController.createModule
);
router.put(
  "/update/:id",
  validateRequest(updateModuleSchema),
  moduleController.updateModule
);
router.delete("/delete/:id", moduleController.deleteModule);
router.get("/course/:course_id", moduleController.getModulesByCourseId);

export default router;

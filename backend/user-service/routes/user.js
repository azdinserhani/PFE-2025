import express from "express";
import { authenticate } from "../middleware/authAdmin.js";

import userController from "../controllers/userController.js";

const router = express.Router();

router.get("/userme", authenticate, userController.getUserMe);
router.patch("/userme", authenticate, userController.updateProfile);

export default router;

import express from "express";
import adminController from "../controllers/adminController.js";
import validateRequest from "../middleware/validateRequest.js";
import { authenticate, authorizeAdmin } from "../middleware/authAdmin.js";
import { createUserSchema, updateUserSchema } from "../validators/userValidators.js";

const router = express.Router();

router.post(
  "/create",
  authenticate,
  authorizeAdmin,
  validateRequest(createUserSchema),
  adminController.createUser
);

router.put(
  "/update/:id",
  authenticate,
  authorizeAdmin,
  validateRequest(updateUserSchema),
  adminController.updateUser
);

router.delete(
  "/delete/:id",
  authenticate,
  authorizeAdmin,
  adminController.deleteUser
);

router.get("/users", adminController.getAllUsers);
router.get("/user/:id", adminController.getUserById);
router.get("/users/username/:username", adminController.getUserByUsername);

export default router;

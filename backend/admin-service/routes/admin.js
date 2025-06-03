import express from "express";
import adminController from "../controllers/adminController.js";
import validateRequest from "../middleware/validateRequest.js";
import { authenticate, authorizeAdmin } from "../middleware/authAdmin.js";
import {
  createUserSchema,
  updateUserSchema,
} from "../validators/userValidators.js";

const router = express.Router();

// Create user (admin only)
router.post(
  "/create",
  authenticate,
  authorizeAdmin,
  validateRequest(createUserSchema),
  adminController.createUser
);

// Update user (admin only)
router.put(
  "/update/:id",
  authenticate,
  authorizeAdmin,
  validateRequest(updateUserSchema),
  adminController.updateUser
);

// Delete user (admin only)
router.delete(
  "/delete/:id",
  authenticate,
  authorizeAdmin,
  adminController.deleteUser
);

// Get all users (admin only)
router.get("/users", authenticate, authorizeAdmin, adminController.getAllUsers);

// Get user by id (admin only)
router.get(
  "/user/:id",
  authenticate,
  authorizeAdmin,
  adminController.getUserById
);

// Get user by username (admin only)
router.get(
  "/users/username/:username",
  authenticate,
  authorizeAdmin,
  adminController.getUserByUsername
);

export default router;

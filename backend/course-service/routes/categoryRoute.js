import express from "express";
import categoryController from "../controllers/categoryController.js";
import { categorySchema, updateCategorySchema } from "../validators/categoryValidators.js";
import validateRequest from "../middleware/validateRequest.js";
import { authenticate, authorize } from "../middleware/authMiddleware.js";
const router = express.Router();

// Create a new category
router.post(
  "/categories",
  validateRequest(categorySchema),
  authenticate,
  authorize(["admin"]),
  categoryController.createCategory
);

// Get all categories
router.get("/categories", categoryController.getAllCategories);

// Get category statistics
router.get("/categories/stats", categoryController.getCategoryStats);

// Get most popular categories
router.get("/categories/popular", categoryController.getMostPopularCategories);

// Get category by ID
router.get("/categories/:id", categoryController.getCategoryById);

// Update category
router.put(
  "/categories/:id",
  validateRequest(updateCategorySchema),
  authenticate,
  authorize(["admin"]),
  categoryController.updateCategory
);

// Delete category
router.delete("/categories/:id", authenticate, authorize(["admin"]), categoryController.deleteCategory);

export default router; 
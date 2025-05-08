import categoryService from "../services/categoryService.js";

const categoryController = {
  createCategory: async (req, res) => {
    try {
      const name = req.body.name;

      const category = await categoryService.createCategory(name);
      res.status(201).json({
        success: true,
        message: "Category created successfully",
        data: category,
      });
    } catch (error) {
      const status = error.message.includes("already exists") ? 409 : 500;
      res.status(status).json({
        success: false,
        message: error.message || "An error occurred during category creation",
      });
    }
  },

  getAllCategories: async (req, res) => {
    try {
      const categories = await categoryService.getAllCategories();
      res.status(200).json({
        success: true,
        message: "Categories retrieved successfully",
        result: categories.length,
        data: categories,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "An error occurred while retrieving categories",
      });
    }
  },

  getCategoryById: async (req, res) => {
    try {
      const categoryId = req.params.id;
      const category = await categoryService.getCategoryById(categoryId);
      res.status(200).json({
        success: true,
        message: "Category retrieved successfully",
        data: category,
      });
    } catch (error) {
      const status = error.message.includes("not found") ? 404 : 500;
      res.status(status).json({
        success: false,
        message: error.message || "An error occurred while retrieving the category",
      });
    }
  },

  updateCategory: async (req, res) => {
    try {
      const categoryId = req.params.id;
      const updatedCategory = await categoryService.updateCategory(categoryId, req.body);
      res.status(200).json({
        success: true,
        message: "Category updated successfully",
        data: updatedCategory,
      });
    } catch (error) {
      const status = error.message.includes("not found") ? 404 : 
                    error.message.includes("already exists") ? 409 : 500;
      res.status(status).json({
        success: false,
        message: error.message || "An error occurred while updating the category",
      });
    }
  },

  deleteCategory: async (req, res) => {
    try {
      const categoryId = req.params.id;
      const deletedCategory = await categoryService.deleteCategory(categoryId);
      res.status(200).json({
        success: true,
        message: "Category deleted successfully",
        data: deletedCategory,
      });
    } catch (error) {
      const status = error.message.includes("not found") ? 404 : 500;
      res.status(status).json({
        success: false,
        message: error.message || "An error occurred while deleting the category",
      });
    }
  },

  getCategoryStats: async (req, res) => {
    try {
      const stats = await categoryService.getCategoryStats();
      res.status(200).json({
        success: true,
        message: "Category statistics retrieved successfully",
        data: stats,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "An error occurred while retrieving category statistics",
      });
    }
  },

  getMostPopularCategories: async (req, res) => {
    try {
      const popularCategories = await categoryService.getMostPopularCategories();
      res.status(200).json({
        success: true,
        message: "Popular categories retrieved successfully",
        data: popularCategories,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "An error occurred while retrieving popular categories",
      });
    }
  }
};

export default categoryController; 
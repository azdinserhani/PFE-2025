import categoryQueries from "../models/categoryQueries.js";

const categoryService = {
  createCategory: async (name) => {
    const categoryExists = await categoryQueries.checkCategoryExists(name);
    if (categoryExists) {
      throw new Error("Category name already exists");
    }
    const category = await categoryQueries.createCategory(name);
    return category;
  },

  getAllCategories: async () => {
    const categories = await categoryQueries.getAllCategories();
    return categories;
  },

  getCategoryById: async (categoryId) => {
    const category = await categoryQueries.getCategoryById(categoryId);
    if (category.length === 0) {
      throw new Error("Category not found");
    }
    return category[0];
  },

  updateCategory: async (categoryId, categoryData) => {
    const categoryExists = await categoryQueries.getCategoryById(categoryId);
    if (categoryExists.length === 0) {
      throw new Error("Category not found");
    }
    
    if (categoryData.name) {
      const nameExists = await categoryQueries.checkCategoryExists(categoryData.name);
      if (nameExists && categoryExists[0].name !== categoryData.name) {
        throw new Error("Category name already exists");
      }
    }

    const updatedCategory = await categoryQueries.updateCategory(categoryId, categoryData);
    return updatedCategory;
  },

  deleteCategory: async (categoryId) => {
    const categoryExists = await categoryQueries.getCategoryById(categoryId);
    if (categoryExists.length === 0) {
      throw new Error("Category not found");
    }
    const deletedCategory = await categoryQueries.deleteCategory(categoryId);
    return deletedCategory;
  },

  getCategoryStats: async () => {
    const stats = await categoryQueries.getCategoryStats();
    return stats;
  },

  getMostPopularCategories: async () => {
    const popularCategories = await categoryQueries.getMostPopularCategories();
    return popularCategories;
  }
};

export default categoryService; 
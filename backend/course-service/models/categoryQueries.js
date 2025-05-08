import * as db from "../config/db.js";

const categoryQueries = {
  checkCategoryExists: async (name) => {
    const query = `SELECT EXISTS(SELECT 1 FROM category WHERE name = $1)`;
    const values = [name];
    const result = await db.query(query, values);
    return result.rows[0].exists;
  },
  getCategoryById: async (category_id) => {
    const query = `SELECT * FROM category
              WHERE category.id = $1`;
    const values = [category_id];
    const result = await db.query(query, values);

    return result.rows;
  },
  createCategory: async (name) => {
    const query = `INSERT INTO category (name) 
                    VALUES ($1) 
                    RETURNING *`;
    const values = [name];
    const result = await db.query(query, values);
    return result.rows[0];
  },
  getAllCategories: async () => {
    const query = `SELECT * FROM category`;
    const result = await db.query(query);
    return result.rows;
  },
  updateCategory: async (category_id, category) => {
    const { name } = category;
    const query = `UPDATE category SET name = $1 WHERE id = $2 RETURNING *`;
    const values = [name, category_id];
    const result = await db.query(query, values);
    return result.rows[0];
  },
  deleteCategory: async (category_id) => {
    const query = `DELETE FROM category WHERE id = $1 RETURNING *`;
    const values = [category_id];
    const result = await db.query(query, values);
    return result.rows[0];
  },
  getCategoryStats: async () => {
    const query = `SELECT 
                     c.id, 
                     c.name, 
                     COUNT(co.id) AS course_count, 
                     COUNT(DISTINCT co.instructor_id) AS unique_instructors
                   FROM category c
                   LEFT JOIN course co ON c.id = co.category_id
                   GROUP BY c.id`;
    const result = await db.query(query);
    return result.rows;
  },
  getMostPopularCategories: async () => {
    const query = `SELECT c.id, c.name, COUNT(co.id) AS course_count
                   FROM category c
                   LEFT JOIN course co ON c.id = co.category_id
                   GROUP BY c.id
                   ORDER BY course_count DESC
                   LIMIT 5`;
    const result = await db.query(query);
    return result.rows;
  },
};

export default categoryQueries;

import * as db from "../config/db.js";
const courseQueries = {
  createCourse: async (course) => {
    const { title, description, instructor_id, price, category_id } = course;
    const query = `INSERT INTO course (title, description, instructor_id, price, category_id) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
    const values = [title, description, instructor_id, price, category_id];
    const result = await db.query(query, values);
    return result.rows[0];
  },

  getAllCourses: async () => {
    const query = `SELECT * FROM course`;
    const result = await db.query(query);
    return result.rows;
  },
};

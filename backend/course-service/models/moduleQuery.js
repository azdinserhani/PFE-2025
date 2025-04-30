import * as db from "../config/db.js";
const moduleQueries = {
  createModule: async (module) => {
    const { name, course_id, number } = module;
    const query = `INSERT INTO module (course_id,name,number) 
                      VALUES ($1, $2, $3) 
                      RETURNING *`;
    const values = [course_id, name, number];
    const result = await db.query(query, values);
    return result.rows[0];
  },
  updateModule: async (id, module) => {
    const { name, number } = module;
    const query = `UPDATE module SET name = $1, number = $2 WHERE id = $3 RETURNING *`;
    const values = [name, number, id];
    const result = await db.query(query, values);
    return result.rows[0];
  },
  deleteModule: async (id) => {
    const query = `DELETE FROM module WHERE id = $1 RETURNING *`;
    const values = [id];
    const result = await db.query(query, values);
    return result.rows[0];
  },
  getModuleById: async (id) => {
    const query = `SELECT * FROM module WHERE id = $1`;
    const values = [id];
    const result = await db.query(query, values);
    return result.rows[0];
  },
  getModulesByCourseId: async (course_id) => {
    const query = `SELECT * FROM module WHERE course_id = $1`;
    const values = [course_id];
    const result = await db.query(query, values);
    return result.rows;
  },
  getModulesByCourseIdAndModuleId: async (course_id, module_id) => {
    const query = `SELECT * FROM module WHERE course_id = $1 AND id = $2`;
    const values = [course_id, module_id];
    const result = await db.query(query, values);
    return result.rows[0];
  },
};

export default moduleQueries;

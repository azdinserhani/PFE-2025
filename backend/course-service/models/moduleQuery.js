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
  updateModule: async (id, updatedFields) => {
    const setClause = Object.keys(updatedFields)
      .map((key, index) => `${key} = $${index + 2}`)
      .join(", ");
    console.log(setClause);
    const values = [id, ...Object.values(updatedFields)];
    console.log(values);
    const query = `UPDATE module SET ${setClause} WHERE id = $1 RETURNING *`;
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

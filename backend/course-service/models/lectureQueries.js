import * as db from "../config/db.js";

const lectureQueries = {
  createLesson: async (lesson) => {
    const { module_id, name, number, video_url, lessons_details, is_free } =
      lesson;
    const query = `INSERT INTO lesson (module_ID, name, number, video_url, lessons_details, is_free) 
                      VALUES ($1, $2, $3, $4, $5, $6) 
                      RETURNING *`;
    const values = [
      module_id,
      name,
      number,
      video_url,
      lessons_details,
      is_free,
    ];
    const result = await db.query(query, values);
    return result.rows[0];
  },

  getLessonById: async (id) => {
    const query = `SELECT * FROM lesson WHERE ID = $1`;
    const values = [id];
    const result = await db.query(query, values);
    return result.rows[0];
  },

  updateLesson: async (id, updatedFields) => {
    const setClause = Object.keys(updatedFields)
      .map((key, index) => `${key} = $${index + 2}`)
      .join(", ");
    const values = [id, ...Object.values(updatedFields)];
    const query = `UPDATE lesson SET ${setClause} WHERE ID = $1 RETURNING *`;
    const result = await db.query(query, values);
    return result.rows[0];
  },

  deleteLesson: async (id) => {
    const query = `DELETE FROM lesson WHERE ID = $1 RETURNING *`;
    const values = [id];
    const result = await db.query(query, values);
    return result.rows[0];
  },

  getAllLessons: async () => {
    const query = `SELECT * FROM lesson`;
    const result = await db.query(query);
    return result.rows;
  },
};

export default lectureQueries;

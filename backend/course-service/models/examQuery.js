import { query } from "../config/db.js";

const examQuery = {
  createExam: async (exam) => {
    const { course_id, title, description } = exam;
    const result = await query(
      "INSERT INTO exam (course_id, title, description, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *",
      [course_id, title, description]
    );
    return result.rows[0];
  },

  getExamById: async (id) => {
    const result = await query("SELECT * FROM exam WHERE id = $1", [id]);
    return result.rows[0];
  },

  getAllExams: async () => {
    const result = await query("SELECT * FROM exam");
    return result.rows;
  },

  updateExam: async (id, exam) => {
    const { title, description } = exam;
    const result = await query(
      "UPDATE exam SET title = $1, description = $2, updated_at = NOW() WHERE id = $3 RETURNING *",
      [title, description, id]
    );
    return result.rows[0];
  },

  deleteExam: async (id) => {
    await query("DELETE FROM exam WHERE id = $1", [id]);
    return { id };
  },
};

export default examQuery;

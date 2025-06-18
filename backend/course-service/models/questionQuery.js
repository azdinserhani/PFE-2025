import { query } from "../config/db.js";

const questionQuery = {
  createQuestion: async (question) => {
    const { exam_id, text, number } = question;
    const result = await query(
      "INSERT INTO question (exam_id, text, number) VALUES ($1, $2, $3) RETURNING *",
      [exam_id, text, number]
    );
    return result.rows[0];
  },

  getQuestionById: async (id) => {
    const result = await query("SELECT * FROM question WHERE id = $1", [id]);
    return result.rows[0];
  },

  getAllQuestions: async () => {
    const result = await query("SELECT * FROM question");
    return result.rows;
  },

  updateQuestion: async (id, question) => {
    const { text, number } = question;
    const result = await query(
      "UPDATE question SET text = $1, number = $2 WHERE id = $3 RETURNING *",
      [text, number, id]
    );
    return result.rows[0];
  },

  deleteQuestion: async (id) => {
    await query("DELETE FROM question WHERE id = $1", [id]);
    return { id };
  },
};

export default questionQuery; 
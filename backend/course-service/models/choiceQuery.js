import { query } from "../config/db.js";

const choiceQuery = {
  createChoice: async (choice) => {
    const { question_id, text, is_correct } = choice;
    const result = await query(
      "INSERT INTO choice (question_id, text, is_correct) VALUES ($1, $2, $3) RETURNING *",
      [question_id, text, is_correct]
    );
    return result.rows[0];
  },

  getChoiceById: async (id) => {
    const result = await query("SELECT * FROM choice WHERE id = $1", [id]);
    return result.rows[0];
  },

  getAllChoices: async () => {
    const result = await query("SELECT * FROM choice");
    return result.rows;
  },

  updateChoice: async (id, choice) => {
    const { text, is_correct } = choice;
    const result = await query(
      "UPDATE choice SET text = $1, is_correct = $2 WHERE id = $3 RETURNING *",
      [text, is_correct, id]
    );
    return result.rows[0];
  },

  deleteChoice: async (id) => {
    await query("DELETE FROM choice WHERE id = $1", [id]);
    return { id };
  },
};

export default choiceQuery; 
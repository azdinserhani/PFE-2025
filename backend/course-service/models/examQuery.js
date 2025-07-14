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
    const result = await query(`SELECT
  e.id AS exam_id,
  e.title AS exam_title,
  e.description AS exam_description,
  json_agg(
    json_build_object(
      'question_id', q.id,
      'question_text', q.text,
      'question_number', q.number,
      'choices', (
        SELECT json_agg(
          json_build_object(
            'choice_id', c.id,
            'choice_text', c.text
          )
        )
        FROM choice c
        WHERE c.question_id = q.id
      )
    )
    ORDER BY q.number
  ) AS questions
FROM exam e
JOIN question q ON q.exam_id = e.id
WHERE e.id = $1
GROUP BY e.id, e.title, e.description;
`, [id]);
    return result.rows[0];
  },

  getAllExams: async () => {
    const result = await query(`SELECT
  e.id AS exam_id,
  e.title AS exam_title,
  e.description AS exam_description,
  json_agg(
    json_build_object(
      'question_id', q.id,
      'question_text', q.text,
      'question_number', q.number,
      'choices', (
        SELECT json_agg(
          json_build_object(
            'choice_id', c.id,
            'choice_text', c.text
          )
        )
        FROM choice c
        WHERE c.question_id = q.id
      )
    )
    ORDER BY q.number
  ) AS questions
FROM exam e
JOIN question q ON q.exam_id = e.id
GROUP BY e.id, e.title, e.description;

`);
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

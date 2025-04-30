import * as db from "../config/db.js";
const courseQueries = {
  checkCourseExists: async (title) => {
    const query = `SELECT EXISTS(SELECT 1 FROM course WHERE title = $1)`;
    const values = [title];
    const result = await db.query(query, values);
    return result.rows[0].exists;
  },
  createCourse: async (course) => {
    const { title, description, instructor_id, price, categoryId, thumbnail } =
      course;
    const query = `INSERT INTO course (title, description, instructor_id, price, category_id, thumbnail) 
                  VALUES ($1, $2, $3, $4, $5, $6) 
                  RETURNING *`;
    const values = [
      title,
      description,
      instructor_id,
      price,
      categoryId,
      thumbnail,
    ];
    const result = await db.query(query, values);
    return result.rows[0];
  },

  getAllCourses: async () => {
    const query = `SELECT * FROM course`;
    const result = await db.query(query);
    return result.rows;
  },
  getCourseById: async (course_id) => {
    const query = `SELECT * FROM course WHERE id = $1`;
    const values = [course_id];
    const result = await db.query(query, values);
    return result.rows[0];
  },
  updateCourse: async (course_id, course) => {
    const { title, description, instructor_id, price, categoryId, thumbnail } =
      course;
    const query = `UPDATE course SET title = $1, description = $2, instructor_id = $3, price = $4, category_id = $5, thumbnail = $6 WHERE id = $7 RETURNING *`;
    const values = [
      title,
      description,
      instructor_id,
      price,
      categoryId,
      thumbnail,
      course_id,
    ];
    const result = await db.query(query, values);
    return result.rows[0];
  },
  deleteCourse: async (course_id) => {
    const query = `DELETE FROM course WHERE id = $1 RETURNING *`;
    const values = [course_id];
    const result = await db.query(query, values);
    return result.rows[0];
  },
  searchCourseByTitle: async (title) => {
    const query = `SELECT * FROM course WHERE title ILIKE $1`;
    const values = [`%${title}%`];
    const result = await db.query(query, values);
    return result.rows;
  },
  getCourseByCategoryId: async (category_id) => {
    const query = `SELECT * FROM course WHERE id = $1`;
    const values = [category_id];
    const result = await db.query(query, values);
    return result.rows;
  },
  getCourseByInstructorId: async (instructor_id) => {
    const query = `SELECT * FROM course WHERE instructor_id = $1`;
    const values = [instructor_id];
    const result = await db.query(query, values);
    return result.rows;
  },
  getCourseContentByCourseId: async (course_id) => {
    const query = `SELECT 
        json_build_object(
          'id', course.id,
          'title', course.title,
          'description', course.description,
          'thumbnail', course.thumbnail,
          'modules', (
            SELECT json_agg(
              json_build_object(
                'id', module.id,
                'title', module.name,
                'order_index', module.number,
                'lessons', (
                  SELECT json_agg(
                    json_build_object(
                      'id', lesson.id,
                      'title', lesson.name,
                      'content', lesson.video_url,
                      
                      'order_index', lesson.number
                    ) ORDER BY lesson.number
                  )
                  FROM lesson 
                  WHERE lesson.module_id = module.id
                )
              ) ORDER BY module.number
            )
            FROM module 
            WHERE module.course_id = course.id
          )
        ) as course_content
      FROM course
      WHERE course.id = $1`;
    const values = [course_id];
    const result = await db.query(query, values);

    return result.rows[0].course_content;
  },
  getEnrollStudentsByCourseId: async (course_id) => {
    const query = `SELECT 
        json_build_object(
          'id', user_acount.id,
          'username', user_acount.username,
          'email', user_acount.email,
          'enrollment_date', enrolment.enrolled_date
        ) as student
      FROM enrolment
      JOIN user_acount ON enrolment.user_id = user_acount.id
      WHERE enrolment.course_id = $1`;
    const values = [course_id];
    const result = await db.query(query, values);
    return result.rows.map((row) => row.student);
  },
};

export default courseQueries;

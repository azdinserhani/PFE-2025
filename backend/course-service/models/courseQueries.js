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

  getAllCourses: async (skip = 0, limit = 10, filters = {}) => {
    const { category, search, level, maxPrice, sort } = filters;
    let whereClause = [];
    let values = [];
    let paramCount = 1;

    // Build WHERE clause based on filters
    if (category) {
      whereClause.push(`c.category_id = $${paramCount}`);
      values.push(category);
      paramCount++;
    }

    if (search) {
      whereClause.push(
        `(c.title ILIKE $${paramCount} OR c.description ILIKE $${paramCount})`
      );
      values.push(`%${search}%`);
      paramCount++;
    }

    if (level) {
      whereClause.push(`c.level = $${paramCount}`);
      values.push(level);
      paramCount++;
    }

    if (maxPrice) {
      whereClause.push(`c.price <= $${paramCount}`);
      values.push(maxPrice);
      paramCount++;
    }

    // Build the WHERE clause string
    const whereClauseStr =
      whereClause.length > 0 ? `WHERE ${whereClause.join(" AND ")}` : "";

    // Add sorting
    let orderByClause = "ORDER BY c.created_at DESC";
    if (sort) {
      switch (sort) {
        case "price_asc":
          orderByClause = "ORDER BY c.price ASC";
          break;
        case "price_desc":
          orderByClause = "ORDER BY c.price DESC";
          break;
        case "popular":
          orderByClause = "ORDER BY student_count DESC";
          break;
        case "newest":
          orderByClause = "ORDER BY c.created_at DESC";
          break;
        default:
          orderByClause = "ORDER BY c.created_at DESC";
      }
    }

    // Count total with filters
    const countQuery = `
      SELECT COUNT(*) 
      FROM course c
      ${whereClauseStr}
    `;
    const countResult = await db.query(countQuery, values);
    const total = parseInt(countResult.rows[0].count);

    // Get courses with filters
    const query = `
      SELECT 
        c.*,
        (SELECT COUNT(*) FROM module m WHERE m.course_id = c.id) as module_count,
        (SELECT COUNT(*) FROM enrolment e WHERE e.course_id = c.id) as student_count,
        cat.name as category_name,
        u.username as instructor_name
      FROM course c
      LEFT JOIN category cat ON c.category_id = cat.id
      LEFT JOIN user_acount u ON c.instructor_id = u.id
      ${whereClauseStr}
      ${orderByClause}
      LIMIT $${paramCount} OFFSET $${paramCount + 1}
    `;

    values.push(limit, skip);
    const result = await db.query(query, values);

    return {
      courses: result.rows,
      total,
    };
  },
  getCourseById: async (course_id) => {
    const query = `SELECT * FROM course WHERE id = $1`;
    const values = [course_id];
    const result = await db.query(query, values);
    return result.rows[0];
  },
  updateCourse: async (course_id, course) => {
    const updateFields = [];
    const values = [];
    let paramCount = 0;

    // Dynamically build update query based on provided fields
    if (course.title !== undefined) {
      updateFields.push(`title = $${++paramCount}`);
      values.push(course.title);
    }
    if (course.description !== undefined) {
      updateFields.push(`description = $${++paramCount}`);
      values.push(course.description);
    }
    if (course.instructor_id !== undefined) {
      updateFields.push(`instructor_id = $${++paramCount}`);
      values.push(course.instructor_id);
    }
    if (course.price !== undefined) {
      updateFields.push(`price = $${++paramCount}`);
      values.push(course.price);
    }
    if (course.categoryId !== undefined) {
      updateFields.push(`category_id = $${++paramCount}`);
      values.push(course.categoryId);
    }
    if (course.thumbnail !== undefined) {
      updateFields.push(`thumbnail = $${++paramCount}`);
      values.push(course.thumbnail);
    }

    // Add updated_at timestamp
    updateFields.push(`updated_at = NOW()`);

    // Add course_id as the last parameter
    values.push(course_id);

    const query = `UPDATE course SET ${updateFields.join(', ')} WHERE id = $${++paramCount} RETURNING *`;
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
      'price', course.price,
      'created_at', course.created_at,
      'updated_at', course.updated_at,
      'category', (
        SELECT json_build_object(
          'id', category.id,
          'name', category.name
        )
        FROM category
        WHERE category.id = course.category_id
      ),
      'instructor', (
        SELECT json_build_object(
          'id', u.id,
          'userName', u.userName,
          'email', u.email,
          'profile_pic', u.profile_pic
        )
        FROM user_acount u
        WHERE u.id = course.instructor_id
      ),
      'enrollment_stats', (
        SELECT json_build_object(
          'total_students', COUNT(e.id),
          'completed_count', COUNT(CASE WHEN e.completed_date IS NOT NULL THEN 1 END)
        )
        FROM enrolment e
        WHERE e.course_id = course.id
      ),
      'modules', (
        SELECT json_agg(
          json_build_object(
            'id', module.id,
            'title', module.name,
            'order_index', module.number,
            'total_duration', (
              SELECT COALESCE(SUM(lesson.duration_seconds), 0)
              FROM lesson
              WHERE lesson.module_id = module.id
            ),
            'lessons', (
              SELECT json_agg(
                json_build_object(
                  'id', lesson.id,
                  'title', lesson.name,
                  'content', lesson.video_url,
                  'order_index', lesson.number,
                  'lesson_details', lesson.lessons_details,
                  'duration', lesson.duration_seconds,
                  'is_free', lesson.is_free,
                  'completion_stats', (
                    SELECT json_build_object(
                      'completed_count', COUNT(sl.id)
                    )
                    FROM student_lesson sl
                    WHERE sl.lesson_id = lesson.id AND sl.is_completed = true
                  )
                ) ORDER BY lesson.number
              )
              FROM lesson
              WHERE lesson.module_id = module.id
            ),
            'exams', (
              SELECT json_agg(
                json_build_object(
                  'id', exam.id,
                  'title', exam.title,
                  'description', exam.description,
                  'created_at', exam.created_at,
                  'updated_at', exam.updated_at,
                  'questions', (
                    SELECT json_agg(
                      json_build_object(
                        'id', q.id,
                        'text', q.text,
                        'number', q.number,
                        'choices', (
                          SELECT json_agg(
                            json_build_object(
                              'id', c.id,
                              'text', c.text,
                              'is_correct', c.is_correct
                            )
                          )
                          FROM choice c
                          WHERE c.question_id = q.id
                        )
                      ) ORDER BY q.number
                    )
                    FROM question q
                    WHERE q.exam_id = exam.id
                  ),
                  'attempt_stats', (
                    SELECT json_build_object(
                      'total_attempts', COUNT(se.id),
                      'average_score', ROUND(AVG(se.score), 2),
                      'highest_score', MAX(se.score),
                      'lowest_score', MIN(se.score)
                    )
                    FROM student_exam se
                    WHERE se.exam_id = exam.id
                  )
                )
              )
              FROM exam
              WHERE exam.course_id = course.id
            )
          ) ORDER BY module.number
        )
        FROM module
        WHERE module.course_id = course.id
      )
    ) as course_content
FROM course
WHERE course.id = $1;
`;
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
  getCourseLessonsCount: async (course_id) => {
    const query = `
      SELECT l.* 
      FROM lesson l
      JOIN module m ON l.module_id = m.id
      WHERE m.course_id = $1
    `;
    const values = [course_id];
    const result = await db.query(query, values);
    return result.rows;
  },
  getEnrollmentsByUserId: async (user_id) => {
    const query = `
      SELECT 
      c.*,
      true AS isEnroled
      FROM enrolment e
      JOIN course c ON e.course_id = c.id
      WHERE e.user_id = $1
      ORDER BY e.enrolled_date DESC
    `;
    const values = [user_id];
    const result = await db.query(query, values);
    return result.rows;
  },
};

export default courseQueries;

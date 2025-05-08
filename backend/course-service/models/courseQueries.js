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
      whereClause.push(`(c.title ILIKE $${paramCount} OR c.description ILIKE $${paramCount})`);
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
    const whereClauseStr = whereClause.length > 0 ? `WHERE ${whereClause.join(' AND ')}` : '';

    // Add sorting
    let orderByClause = 'ORDER BY c.created_at DESC';
    if (sort) {
      switch (sort) {
        case 'price_asc':
          orderByClause = 'ORDER BY c.price ASC';
          break;
        case 'price_desc':
          orderByClause = 'ORDER BY c.price DESC';
          break;
        case 'popular':
          orderByClause = 'ORDER BY student_count DESC';
          break;
        case 'newest':
          orderByClause = 'ORDER BY c.created_at DESC';
          break;
        default:
          orderByClause = 'ORDER BY c.created_at DESC';
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
      total
    };
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
              'userName', u.username,
              'email', u.email,
              'profile_pic', u.profile_pic
            )
            FROM "user_acount" u
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
                'lessons', (
                  SELECT json_agg(
                    json_build_object(
                      'id', lesson.id,
                      'title', lesson.name,
                      'content', lesson.video_url,
                      'order_index', lesson.number,
                      'lesson_details', lesson.lessons_details,
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
                'quizzes', (
                  SELECT json_agg(
                    json_build_object(
                      'id', quiz.id,
                      'name', quiz.name,
                      'min_pass_score', quiz.min_pass_score,
                      'questions', (
                        SELECT json_agg(
                          json_build_object(
                            'id', qq.id,
                            'title', qq.question_title,
                            'answers', (
                              SELECT json_agg(
                                json_build_object(
                                  'id', qa.id,
                                  'text', qa.answer_text,
                                  'is_correct', qa.is_correct
                                )
                              )
                              FROM quiz_answer qa
                              WHERE qa.question_id = qq.quiz_id
                            )
                          )
                        )
                        FROM quiz_question qq
                        WHERE qq.quiz_id = quiz.id
                      )
                    )
                  )
                  FROM quiz
                  WHERE quiz.course_id = course.id
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
};

export default courseQueries;

CREATE TABLE user_acount(
    id SERIAL PRIMARY KEY NOT NULL ,
    username VARCHAR(20) NOT NULL UNIQUE,
    email VARCHAR(20) NOT NULL UNIQUE,
    password_hash  VARCHAR(255) NOT NULL,
    role VARCHAR(15) NOT NULL CHECK(role IN ('student','teacher')),
    profile_pic VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

CREATE TABLE enrolment(
    id SERIAL PRIMARY KEY NOT NULL ,
    course_id INT NOT NULL,
    user_id INT NOT NULL,
    enrolled_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_date TIMESTAMP,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES user_acount(id),
    CONSTRAINT fk_course FOREIGN KEY (course_id) REFERENCES course(id)
)
CREATE TABLE course(
    id SERIAL PRIMARY KEY NOT NULL,
    title VARCHAR(255) NOT NULL UNIQUE,
    description TEXT NOT NULL,
    instructor_id INT NOT NULL,
    price FlOAT NOT NULL,
    category_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    CONSTRAINT fk_user FOREIGN KEY (instructor_id) REFERENCES user_acount(id),
    CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES category(id)
);

CREATE TABLE category(
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(50) NOT NULL
)
CREATE TABLE module(
    id SERIAL PRIMARY KEY NOT NULL,
    course_id INT NOT NULL,
    name VARCHAR(50) NOT NULL,
    number  INT NOT NULL,
    CONSTRAINT fk_course FOREIGN KEY (course_id) REFERENCES course(id)
)
CREATE TABLE quiz(
    id SERIAL PRIMARY KEY NOT NULL ,
    course_id INT NOT NULL,
    name VARCHAR(50) NOT NULL,
    number INT NOT NULL,
    min_pass_score INT NOT NULL,
    CONSTRAINT fk_course FOREIGN KEY (course_id) REFERENCES course(id)
)
CREATE TABLE quiz_question(
    id SERIAL PRIMARY KEY NOT NULL ,
    quiz_id INT NOT NULL,
    question_title VARCHAR(255) NOT NULL,
    CONSTRAINT fk_quiz FOREIGN KEY (quiz_id) REFERENCES quiz(id)
)

CREATE TABLE quiz_answer(
    id SERIAL PRIMARY KEY NOT NULL ,
    question_id INT NOT NULL,
    answer_text TEXT NOT NULL,
    is_correct BOOLEAN NOT NULL,
    CONSTRAINT fk_quiz_question FOREIGN KEY (question_id) REFERENCES quiz_question(id)
)

CREATE Table lesson(
    id SERIAL  PRIMARY KEY NOT NULL,
    module_id INT NOT NULL,
    name varchar(255) NOT NULL,
    number int NOT NULL,
    video_url VARCHAR(255) NOT NULL,
    lessons_details VARCHAR(255) NOT NULL,
    is_free BOOLEAN NOT NULL,
    CONSTRAINT fk_module FOREIGN KEY (module_id) REFERENCES module(id)
)
CREATE TABLE student_quiz_attempt (
    id SERIAL PRIMARY KEY NOT NULL,
    student_id  INT NOT NULL,
    quiz_id INT NOT NULL,
    score_archived int NOT NULL,
    CONSTRAINT fk_student FOREIGN KEY (student_id) REFERENCES user_acount(id)
)
CREATE TABLE student_lesson(
    id SERIAL PRIMARY KEY NOT NULL,
    student_id int NOT NULL,
    lesson_id int NOT NULL,
    is_completed BOOLEAN,
    CONSTRAINT fk_student FOREIGN KEY (student_id) REFERENCES user_acount(id),
    CONSTRAINT fk_lesson FOREIGN KEY (lesson_id) REFERENCES lesson(id)
)

ALTER TABLE course
ADD COLUMN thumbnail VARCHAR(255);
-- ******************************************************Application query********************************//

SELECT * FROM course 
WHERE id = 4

UPDATE course SET title = 'test', description = 'test'
WHERE id = 4 RETURNING *

SELECT * FROM course WHERE title LIKE '%t%' 

SELECT * FROM course
INNER JOIN module 
ON module.course_id = course.id
INNER JOIN lesson
ON lesson.module_id = module.id
SELECT 
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

SELECT 
        json_build_object(
          'id', user_acount.id,
          'username', user_acount.username,
          'email', user_acount.email,
          'enrollment_date', enrolment.enrolled_date
        ) as student
      FROM enrolment
      JOIN user_acount ON enrolment.user_id = user_acount.id
      WHERE enrollment.course_id = 

SELECT 
                     c.id, 
                     c.name, 
                     COUNT(co.id) AS course_count, 
                     AVG(co.rating) AS average_rating, 
                     MAX(co.rating) AS max_rating, 
                     MIN(co.rating) AS min_rating, 
                     COUNT(DISTINCT co.instructor_id) AS unique_instructors
                   FROM category c
                   LEFT JOIN course co ON c.id = co.category_id
                   GROUP BY c.id

-- ENROLMENT table: enrolment → user
ALTER TABLE enrolment
DROP CONSTRAINT IF EXISTS enrolment_user_id_fkey;

ALTER TABLE enrolment
ADD CONSTRAINT enrolment_user_id_fkey
FOREIGN KEY (user_ID) REFERENCES "user_acount"(ID) ON DELETE CASCADE;

-- STUDENT_QUIZ_ATTEMPT table: student_quiz_attempt → user
ALTER TABLE student_quiz_attempt
DROP CONSTRAINT IF EXISTS student_quiz_attempt_student_id_fkey;

ALTER TABLE student_quiz_attempt
ADD CONSTRAINT student_quiz_attempt_student_id_fkey
FOREIGN KEY (student_id) REFERENCES "user_acount"(ID) ON DELETE CASCADE;

-- STUDENT_LESSON table: student_lesson → user
ALTER TABLE student_lesson
DROP CONSTRAINT IF EXISTS student_lesson_student_id_fkey;

ALTER TABLE student_lesson
ADD CONSTRAINT student_lesson_student_id_fkey
FOREIGN KEY (student_id) REFERENCES "user_acount"(ID) ON DELETE CASCADE;

ALTER TABLE module
ADD COLUMN cours_ID INT;

ALTER TABLE module
DROP CONSTRAINT IF EXISTS fk_course;


ALTER TABLE module
ADD CONSTRAINT fk_course
FOREIGN KEY (cours_ID) REFERENCES course(ID) ON DELETE CASCADE;
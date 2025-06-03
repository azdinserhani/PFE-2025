-- Drop tables if they exist (for testing/demo purposes)
DROP TABLE IF EXISTS student_lesson CASCADE;
DROP TABLE IF EXISTS student_quiz_attempt CASCADE;
DROP TABLE IF EXISTS lesson CASCADE;
DROP TABLE IF EXISTS quiz_answer CASCADE;
DROP TABLE IF EXISTS quiz_question CASCADE;
DROP TABLE IF EXISTS quiz CASCADE;
DROP TABLE IF EXISTS module CASCADE;
DROP TABLE IF EXISTS enrolment CASCADE;
DROP TABLE IF EXISTS course CASCADE;
DROP TABLE IF EXISTS category CASCADE;
DROP TABLE IF EXISTS user_acount CASCADE;

-- Create tables
CREATE TABLE user_acount(
    id SERIAL PRIMARY KEY NOT NULL,
    username VARCHAR(20) NOT NULL UNIQUE,
    email VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(10) NOT NULL CHECK(role IN ('student','teacher','admin')) DEFAULT 'student',
    profile_pic VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE category(
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE course(
    id SERIAL PRIMARY KEY NOT NULL,
    title VARCHAR(255) NOT NULL UNIQUE,
    description TEXT NOT NULL,
    instructor_id INT NOT NULL,
    price FLOAT NOT NULL,
    category_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    thumbnail VARCHAR(255),
    CONSTRAINT fk_user FOREIGN KEY (instructor_id) REFERENCES user_acount(id) ON DELETE CASCADE,
    CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE CASCADE
);

CREATE TABLE module(
    id SERIAL PRIMARY KEY NOT NULL,
    course_id INT NOT NULL,
    name VARCHAR(50) NOT NULL,
    number INT NOT NULL,
    CONSTRAINT fk_course FOREIGN KEY (course_id) REFERENCES course(id) ON DELETE CASCADE
);

CREATE TABLE lesson(
    id SERIAL PRIMARY KEY NOT NULL,
    module_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    number INT NOT NULL,
    video_url VARCHAR(255) NOT NULL,
    lessons_details VARCHAR(255) NOT NULL,
    is_free BOOLEAN NOT NULL,
    CONSTRAINT fk_module FOREIGN KEY (module_id) REFERENCES module(id) ON DELETE CASCADE
);

CREATE TABLE quiz(
    id SERIAL PRIMARY KEY NOT NULL,
    course_id INT NOT NULL,
    name VARCHAR(50) NOT NULL,
    number INT NOT NULL,
    min_pass_score INT NOT NULL,
    CONSTRAINT fk_course FOREIGN KEY (course_id) REFERENCES course(id) ON DELETE CASCADE
);

CREATE TABLE quiz_question(
    id SERIAL PRIMARY KEY NOT NULL,
    quiz_id INT NOT NULL,
    question_title VARCHAR(255) NOT NULL,
    CONSTRAINT fk_quiz FOREIGN KEY (quiz_id) REFERENCES quiz(id) ON DELETE CASCADE
);

CREATE TABLE quiz_answer(
    id SERIAL PRIMARY KEY NOT NULL,
    question_id INT NOT NULL,
    answer_text TEXT NOT NULL,
    is_correct BOOLEAN NOT NULL,
    CONSTRAINT fk_quiz_question FOREIGN KEY (question_id) REFERENCES quiz_question(id) ON DELETE CASCADE
);

CREATE TABLE enrolment(
    id SERIAL PRIMARY KEY NOT NULL,
    course_id INT NOT NULL,
    user_id INT NOT NULL,
    enrolled_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_date TIMESTAMP,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES user_acount(id) ON DELETE CASCADE,
    CONSTRAINT fk_course FOREIGN KEY (course_id) REFERENCES course(id) ON DELETE CASCADE
);

CREATE TABLE student_quiz_attempt (
    id SERIAL PRIMARY KEY NOT NULL,
    student_id INT NOT NULL,
    quiz_id INT NOT NULL,
    score_archived INT NOT NULL,
    CONSTRAINT fk_student FOREIGN KEY (student_id) REFERENCES user_acount(id) ON DELETE CASCADE,
    CONSTRAINT fk_quiz FOREIGN KEY (quiz_id) REFERENCES quiz(id) ON DELETE CASCADE
);

CREATE TABLE student_lesson(
    id SERIAL PRIMARY KEY NOT NULL,
    student_id INT NOT NULL,
    lesson_id INT NOT NULL,
    is_completed BOOLEAN,
    CONSTRAINT fk_student FOREIGN KEY (student_id) REFERENCES user_acount(id) ON DELETE CASCADE,
    CONSTRAINT fk_lesson FOREIGN KEY (lesson_id) REFERENCES lesson(id) ON DELETE CASCADE
);

-- Add index and comment for role column
CREATE INDEX IF NOT EXISTS idx_user_role ON user_acount(role);
COMMENT ON COLUMN user_acount.role IS 'User role: student, teacher, or admin';

-- Sample data for testing
INSERT INTO user_acount (username, email, password_hash, role, profile_pic) VALUES
('student1', 'student1@example.com', 'hash1', 'student', 'pic1.jpg'),
('teacher1', 'teacher1@example.com', 'hash2', 'teacher', 'pic2.jpg'),
('admin1', 'admin1@example.com', 'hash3', 'admin', 'pic3.jpg');

INSERT INTO category (name) VALUES ('Programming'), ('Design');

INSERT INTO course (title, description, instructor_id, price, category_id, thumbnail) VALUES
('Intro to Python', 'Learn Python from scratch', 2, 49.99, 1, 'python.jpg'),
('UI Design Basics', 'Design beautiful interfaces', 2, 59.99, 2, 'ui.jpg');

INSERT INTO module (course_id, name, number) VALUES
(1, 'Basics', 1),
(1, 'Advanced', 2),
(2, 'Introduction', 1);

INSERT INTO lesson (module_id, name, number, video_url, lessons_details, is_free) VALUES
(1, 'Variables', 1, 'url1', 'Details about variables', true),
(2, 'OOP', 1, 'url2', 'Details about OOP', false),
(3, 'Welcome', 1, 'url3', 'Intro lesson', true);

INSERT INTO quiz (course_id, name, number, min_pass_score) VALUES
(1, 'Quiz 1', 1, 60),
(2, 'Quiz 1', 1, 70);

INSERT INTO quiz_question (quiz_id, question_title) VALUES
(1, 'What is a variable?'),
(2, 'What is UI?');

INSERT INTO quiz_answer (question_id, answer_text, is_correct) VALUES
(1, 'A storage for data', true),
(2, 'User Interface', true);

INSERT INTO enrolment (course_id, user_id) VALUES
(1, 1),
(2, 1);

INSERT INTO student_quiz_attempt (student_id, quiz_id, score_archived) VALUES
(1, 1, 80),
(1, 2, 75);

INSERT INTO student_lesson (student_id, lesson_id, is_completed) VALUES
(1, 1, true),
(1, 2, false);

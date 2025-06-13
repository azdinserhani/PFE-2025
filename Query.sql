-- Drop tables if they exist (for testing/demo purposes)
DROP TABLE IF EXISTS student_answer CASCADE;
DROP TABLE IF EXISTS student_exam CASCADE;
DROP TABLE IF EXISTS student_lesson CASCADE;
DROP TABLE IF EXISTS choice CASCADE;
DROP TABLE IF EXISTS question CASCADE;
DROP TABLE IF EXISTS exam CASCADE;
DROP TABLE IF EXISTS lesson CASCADE;
DROP TABLE IF EXISTS module CASCADE;
DROP TABLE IF EXISTS enrolment CASCADE;
DROP TABLE IF EXISTS course CASCADE;
DROP TABLE IF EXISTS category CASCADE;
DROP TABLE IF EXISTS user_acount CASCADE;

-- Create tables
CREATE TABLE user_acount(
    id SERIAL PRIMARY KEY NOT NULL,
    userName VARCHAR(20) NOT NULL UNIQUE,
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

CREATE TABLE exam(
    id SERIAL PRIMARY KEY NOT NULL,
    course_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    CONSTRAINT fk_course FOREIGN KEY (course_id) REFERENCES course(id) ON DELETE CASCADE
);

CREATE TABLE question(
    id SERIAL PRIMARY KEY NOT NULL,
    exam_id INT NOT NULL,
    text TEXT NOT NULL,
    number INT NOT NULL,
    CONSTRAINT fk_exam FOREIGN KEY (exam_id) REFERENCES exam(id) ON DELETE CASCADE
);

CREATE TABLE choice(
    id SERIAL PRIMARY KEY NOT NULL,
    question_id INT NOT NULL,
    text TEXT NOT NULL,
    is_correct BOOLEAN NOT NULL,
    CONSTRAINT fk_question FOREIGN KEY (question_id) REFERENCES question(id) ON DELETE CASCADE
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

CREATE TABLE student_exam(
    id SERIAL PRIMARY KEY NOT NULL,
    exam_id INT NOT NULL,
    student_id INT NOT NULL,
    score INT NOT NULL,
    completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_exam FOREIGN KEY (exam_id) REFERENCES exam(id) ON DELETE CASCADE,
    CONSTRAINT fk_student FOREIGN KEY (student_id) REFERENCES user_acount(id) ON DELETE CASCADE
);

CREATE TABLE student_lesson(
    id SERIAL PRIMARY KEY NOT NULL,
    student_id INT NOT NULL,
    lesson_id INT NOT NULL,
    is_completed BOOLEAN DEFAULT FALSE,
    CONSTRAINT fk_student FOREIGN KEY (student_id) REFERENCES user_acount(id) ON DELETE CASCADE,
    CONSTRAINT fk_lesson FOREIGN KEY (lesson_id) REFERENCES lesson(id) ON DELETE CASCADE
);

CREATE TABLE student_answer(
    id SERIAL PRIMARY KEY NOT NULL,
    student_exam_id INT NOT NULL,
    question_id INT NOT NULL,
    choice_id INT NOT NULL,
    CONSTRAINT fk_student_exam FOREIGN KEY (student_exam_id) REFERENCES student_exam(id) ON DELETE CASCADE,
    CONSTRAINT fk_question FOREIGN KEY (question_id) REFERENCES question(id) ON DELETE CASCADE,
    CONSTRAINT fk_choice FOREIGN KEY (choice_id) REFERENCES choice(id) ON DELETE CASCADE
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_role ON user(role);
CREATE INDEX IF NOT EXISTS idx_course_instructor ON course(instructor_id);
CREATE INDEX IF NOT EXISTS idx_course_category ON course(category_id);
CREATE INDEX IF NOT EXISTS idx_module_course ON module(course_id);
CREATE INDEX IF NOT EXISTS idx_lesson_module ON lesson(module_id);
CREATE INDEX IF NOT EXISTS idx_exam_course ON exam(course_id);
CREATE INDEX IF NOT EXISTS idx_question_exam ON question(exam_id);
CREATE INDEX IF NOT EXISTS idx_choice_question ON choice(question_id);
CREATE INDEX IF NOT EXISTS idx_enrolment_user ON enrolment(user_id);
CREATE INDEX IF NOT EXISTS idx_enrolment_course ON enrolment(course_id);
CREATE INDEX IF NOT EXISTS idx_student_exam_student ON student_exam(student_id);
CREATE INDEX IF NOT EXISTS idx_student_exam_exam ON student_exam(exam_id);
CREATE INDEX IF NOT EXISTS idx_student_lesson_student ON student_lesson(student_id);
CREATE INDEX IF NOT EXISTS idx_student_lesson_lesson ON student_lesson(lesson_id);

-- Add comments for clarity
COMMENT ON COLUMN user.role IS 'User role: student, teacher, or admin';
COMMENT ON TABLE student_answer IS 'Tracks individual answers given by students in exams';
COMMENT ON TABLE student_exam IS 'Tracks student exam attempts and scores';

-- Sample data for testing
INSERT INTO user (userName, email, password_hash, role, profile_pic) VALUES
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

INSERT INTO exam (course_id, title, description) VALUES
(1, 'Python Basics Quiz', 'Test your knowledge of Python fundamentals'),
(2, 'UI Design Quiz', 'Test your understanding of UI design principles');

INSERT INTO question (exam_id, text, number) VALUES
(1, 'What is a variable in Python?', 1),
(1, 'Which keyword is used to define a function?', 2),
(2, 'What does UI stand for?', 1);

INSERT INTO choice (question_id, text, is_correct) VALUES
(1, 'A storage location for data', true),
(1, 'A type of loop', false),
(1, 'A built-in function', false),
(2, 'def', true),
(2, 'function', false),
(2, 'func', false),
(3, 'User Interface', true),
(3, 'Universal Input', false),
(3, 'Unified Integration', false);

INSERT INTO enrolment (course_id, user_id) VALUES
(1, 1),
(2, 1);

INSERT INTO student_exam (student_id, exam_id, score) VALUES
(1, 1, 85),
(1, 2, 90);

INSERT INTO student_lesson (student_id, lesson_id, is_completed) VALUES
(1, 1, true),
(1, 2, false),
(1, 3, true);

-- Sample student answers
INSERT INTO student_answer (student_exam_id, question_id, choice_id) VALUES
(1, 1, 1),  -- Student chose correct answer for question 1
(1, 2, 4),  -- Student chose correct answer for question 2
(2, 3, 7);  -- Student chose correct answer for question 3
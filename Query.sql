CREATE TABLE user(
    id PRIMARY KEY NOT NULL SERIAL,
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
    completed_date TIMESTAMP
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES user(id),
    CONSTRAINT fk_course FOREIGN KEY (course_id) REFERENCES course(id)
)
CREATE TABLE course(
    id SERIAL PRIMARY KEY NOT NULL ,
    title VARCHAR(255) NOT NULL UNIQUE,
    description TEXT NOT NULL,
    instructor_id INT NOT NULL,
    price FlOAT NOT NULL,
    category_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    CONSTRAINT fk_user FOREIGN KEY (instructor_id) REFERENCES user(id),
    CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES category(id)
)

CREATE TABLE category(
    id PRIMARY KEY NOT NULL SERIAL,
    course_id INT NOT NULL,
    name VARCHAR(50) NOT NULL.
    CONSTRAINT fk_course FOREIGN KEY (course_id) REFERENCES course(id)
)
CREATE TABLE module(
    id PRIMARY KEY NOT NULL SERIAL,
    course_id INT NOT NULL,
    name VARCHAR(50) NOT NULL,
    number  INT NOT NULL,
    CONSTRAINT fk_course FOREIGN KEY (course_id) REFERENCES course(id)
)
CREATE TABLE quiz(
    id PRIMARY KEY NOT NULL SERIAL,
    course_id INT NOT NULL,
    name VARCHAR(50) NOT NULL,
    number INT NOT NULL,
    min_pass_score INT NOT NULL,
    CONSTRAINT fk_course FOREIGN KEY (course_id) REFERENCES course(id)
)
CREATE TABLE quiz_question(
    id PRIMARY KEY NOT NULL SERIAL,
    quiz_id INT NOT NULL,
    question_title VARCHAR(255) NOT NULL,
    CONSTRAINT fk_quiz FOREIGN KEY (quiz_id) REFERENCES quiz(id)
)

CREATE TABLE quiz_answer(
    id PRIMARY KEY NOT NULL SERIAL,
    question_id INT NOT NULL,
    answer_text TEXT NOT NULL,
    is_correct BOOLEAN NOT NULL,
    CONSTRAINT fk_quiz_question FOREIGN KEY (question_id) REFERENCES quiz_question(id)
)

CREATE Table lesson(
id SERIAL  PRIMARY KEY NOT NULL,
module_id int PRIMARY KEY NOT NULL,
name varchar(255) NOT NULL,
number int NOT NULL,
video_url VARCHAR(255) NOT NULL,
lessons_details VARCHAR(255) NOT NULL,
is_free BOOLEAN
CONSTRAINT fk_module FOREIGN KEY (module_id) REFERENCES module(id)
)
CREATE TABLE student_quiz_attempt (
id SERIAL PRIMARY KEY NOT NULL,
student_id  int PRIMARY KEY NOT NULL,
quiz_id int PRIMARY KEY NOT NULL,
score_archived int NOT NULL,
CONSTRAINT fk_student FOREIGN KEY (student_id) REFERENCES user(id)
)
CREATE TABLE student_lesson(
id SERIAL PRIMARY KEY NOT NULL,
student_id int NOT NULL,
lesson_id int NOT NULL,
is_completed BOOLEAN,
CONSTRAINT fk_student FOREIGN KEY (student_id) REFERENCES user(id),
CONSTRAINT fk_lesson FOREIGN KEY (lesson_id) REFERENCES lesson(id),
)
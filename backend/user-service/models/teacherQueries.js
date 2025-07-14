import * as db from "../config/db.js";

const teacherQueries = {
    getAllTeachers: async () => {
        const result = await db.query(`SELECT 
    u.id AS teacher_id,
    u.userName AS teacher_name,
    u.email AS teacher_email,
    u.profile_pic AS teacher_profile_pic,
    COUNT(DISTINCT c.id) AS number_of_courses,
    COUNT(DISTINCT e.user_id) AS number_of_students
FROM user_acount u
LEFT JOIN course c ON u.id = c.instructor_id
LEFT JOIN enrolment e ON c.id = e.course_id
WHERE u.role = 'teacher' 
GROUP BY u.id, u.userName, u.email
ORDER BY u.userName;`);
        return result.rows;
    },
    getTeacherInfo: async (id) => {
        const result = await db.query(`SELECT 
    u.id AS teacher_id,
    u.userName AS teacher_name,
    u.email AS teacher_email,
    u.profile_pic AS teacher_profile_pic,
    COUNT(DISTINCT c.id) AS number_of_courses,
    COUNT(DISTINCT e.user_id) AS number_of_students
FROM user_acount u
LEFT JOIN course c ON u.id = c.instructor_id
LEFT JOIN enrolment e ON c.id = e.course_id
WHERE u.role = 'teacher' and u.id = $1
GROUP BY u.id, u.userName, u.email
ORDER BY u.userName;`, [id]);
        return result.rows[0];
    }
}

export default teacherQueries;
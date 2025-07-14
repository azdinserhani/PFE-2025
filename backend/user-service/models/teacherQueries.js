import * as db from "../config/db.js";

const teacherQueries = {
    getAllTeachers: async () => {
        const result = await db.query(`SELECT * FROM user_acount WHERE role = 'teacher' ORDER BY created_at DESC LIMIT 4`);
        return result.rows;
    },
}

export default teacherQueries;
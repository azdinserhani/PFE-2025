import teacherQueries from "../models/teacherQueries.js";

const teacherService = {
    getAllTeachers: async () => {
        return await teacherQueries.getAllTeachers();
    },
    getTeacherInfo: async (id) => {
        return await teacherQueries.getTeacherInfo(id);
    }
}

export default teacherService;
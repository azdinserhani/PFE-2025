import teacherQueries from "../models/teacherQueries.js";

const teacherService = {
    getAllTeachers: async () => {
        return await teacherQueries.getAllTeachers();
    },
}

export default teacherService;
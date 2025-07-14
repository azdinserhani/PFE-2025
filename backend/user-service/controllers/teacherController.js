import teacherService from "../services/teacherService.js";

const teacherController = {
    getAllTeachers: async (req, res) => {
        const teachers = await teacherService.getAllTeachers();
        res.status(200).json(teachers);
    },
}

export default teacherController;
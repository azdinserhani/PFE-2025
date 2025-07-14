import teacherService from "../services/teacherService.js";

const teacherController = {
    getAllTeachers: async (req, res) => {
        const teachers = await teacherService.getAllTeachers();
        res.status(200).json({
            success: true,
            data: teachers
        });
    },
    getTeacherInfo: async (req, res) => {
        try {
            const teacher = await teacherService.getTeacherInfo(req.params.id);
            res.status(200).json({
                success: true,
                data: teacher
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
}

export default teacherController;
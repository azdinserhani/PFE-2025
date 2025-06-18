import examServices from "../services/examService.js";

const examController = {
  createExam: async (req, res) => {
    try {
      const createdExam = await examServices.createExam(req.body);
      res.status(201).json({
        success: true,
        data: createdExam,
      });
    } catch (error) {
      const status = error.status || 500;
      const message = error.message || "An error occurred during creating the exam";
      res.status(status).json({ success: false, message });
    }
  },

  getExamById: async (req, res) => {
    try {
      const exam = await examServices.getExamById(req.params.id);
      if (!exam) {
        return res.status(404).json({ success: false, message: "Exam not found" });
      }
      res.status(200).json({ success: true, data: exam });
    } catch (error) {
      const status = error.status || 500;
      const message = error.message || "An error occurred during fetching the exam";
      res.status(status).json({ success: false, message });
    }
  },

  getAllExams: async (req, res) => {
    try {
      const exams = await examServices.getAllExams();
      res.status(200).json({ success: true, data: exams });
    } catch (error) {
      const status = error.status || 500;
      const message = error.message || "An error occurred during fetching exams";
      res.status(status).json({ success: false, message });
    }
  },

  updateExam: async (req, res) => {
    try {
      const updatedExam = await examServices.updateExam(req.params.id, req.body);
      if (!updatedExam) {
        return res.status(404).json({ success: false, message: "Exam not found" });
      }
      res.status(200).json({ success: true, data: updatedExam });
    } catch (error) {
      const status = error.status || 500;
      const message = error.message || "An error occurred during updating the exam";
      res.status(status).json({ success: false, message });
    }
  },

  deleteExam: async (req, res) => {
    try {
      await examServices.deleteExam(req.params.id);
      res.status(200).json({ success: true, message: "Exam deleted successfully" });
    } catch (error) {
      const status = error.status || 500;
      const message = error.message || "An error occurred during deleting the exam";
      res.status(status).json({ success: false, message });
    }
  },
};

export default examController;

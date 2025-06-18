import examQuery from "../models/examQuery.js";

const examServices = {
  createExam: async (examData) => {
    return await examQuery.createExam(examData);
  },
  getExamById: async (id) => {
    return await examQuery.getExamById(id);
  },
  getAllExams: async () => {
    return await examQuery.getAllExams();
  },
  updateExam: async (id, examData) => {
    return await examQuery.updateExam(id, examData);
  },
  deleteExam: async (id) => {
    return await examQuery.deleteExam(id);
  },
};

export default examServices;

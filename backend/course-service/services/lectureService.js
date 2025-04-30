import lectureQueries from "../models/lectureQueries.js";
import moduleQueries from "../models/moduleQuery.js";

const lectureService = {
  createLesson: async (lesson) => {
    const { module_id } = lesson;
    const findModule = await moduleQueries.getModuleById(module_id);
    if (!findModule) {
      throw new Error("Module not found");
    }
    return await lectureQueries.createLesson(lesson);
  },

  getLessonById: async (id) => {
    return await lectureQueries.getLessonById(id);
  },

  updateLesson: async (id, updatedFields) => {
    const { module_id } = updatedFields;
    const findModule = await moduleQueries.getModuleById(module_id);
    if (!findModule) {
      throw new Error("Module not found");
    }
    const lesson = await lectureQueries.getLessonById(id);
    if (!lesson) {
      throw new Error("Lesson not found");
    }
    return await lectureQueries.updateLesson(id, updatedFields);
  },

  deleteLesson: async (id) => {
    return await lectureQueries.deleteLesson(id);
  },

  getAllLessons: async () => {
    return await lectureQueries.getAllLessons();
  },
};

export default lectureService;

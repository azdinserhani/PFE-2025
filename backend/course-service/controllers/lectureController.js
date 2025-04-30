import lectureService from "../services/lectureService.js";

const lectureController = {
  createLesson: async (req, res) => {
    try {
      const lesson = req.body;
      const newLesson = await lectureService.createLesson(lesson);
      res.status(201).json({
        status: "success",
        data: newLesson,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getLessonById: async (req, res) => {
    try {
      const { id } = req.params;
      const lesson = await lectureService.getLessonById(id);
      if (!lesson) {
        return res.status(404).json({ message: "Lesson not found" });
      }
      res.status(200).json(lesson);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateLesson: async (req, res) => {
    try {
      const { id } = req.params;
      const updatedFields = req.body;
      const updatedLesson = await lectureService.updateLesson(
        id,
        updatedFields
      );
      if (!updatedLesson) {
        return res.status(404).json({ message: "Lesson not found" });
      }
      res.status(200).json(updatedLesson);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteLesson: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedLesson = await lectureService.deleteLesson(id);
      if (!deletedLesson) {
        return res.status(404).json({ message: "Lesson not found" });
      }
      res.status(200).json(deletedLesson);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getAllLessons: async (req, res) => {
    try {
      const lessons = await lectureService.getAllLessons();
      res.status(200).json({
        status: "success",
        data: lessons,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default lectureController;

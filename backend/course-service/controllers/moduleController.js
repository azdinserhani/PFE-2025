import moduleService from "../services/moduleServices.js";

const moduleController = {
  createModule: async (req, res) => {
    try {
      const module = req.body;
      const moduleCreated = await moduleService.createModule(module);
      res.status(201).json({
        status: "success",
        message: "Module created successfully",
        data: moduleCreated,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Failed to create module. Please try again later.",
        error: error.message,
      });
    }
  },
  updateModule: async (req, res) => {
    try {
      const { id } = req.params;
      const module = req.body;
      const moduleUpdated = await moduleService.updateModule(id, module);
      res.status(200).json({
        status: "success",
        message: "Module updated successfully",
        data: moduleUpdated,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Failed to update module. Please try again later.",
        error: error.message,
      });
    }
  },
  deleteModule: async (req, res) => {
    try {
      const { id } = req.params;
      const moduleDeleted = await moduleService.deleteModule(id);
      res.status(200).json({
        status: "success",
        message: "Module deleted successfully",
        data: moduleDeleted,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Failed to delete module. Please try again later.",
        error: error.message,
      });
    }
  },
  getModulesByCourseId: async (req, res) => {
    try {
      const { course_id } = req.params;
      const modulesFound = await moduleService.getModulesByCourseId(course_id);
      res.status(200).json({
        status: "success",
        message: "Modules found successfully",
        results: modulesFound.length,
        data: modulesFound,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Failed to get modules. Please try again later.",
        error: error.message,
      });
    }
  },
};
export default moduleController;

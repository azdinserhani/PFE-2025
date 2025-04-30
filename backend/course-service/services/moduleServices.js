import courseQueries from "../models/courseQueries.js";
import moduleQueries from "../models/moduleQuery.js";

const moduleService = {
  createModule: async (module) => {
    const { name, course_id, number } = module;
    console.log("module", module);

    const findCours = await courseQueries.getCourseById(course_id);

    if (!findCours) {
      throw new Error("Course not found");
    }

    const moduleCreated = await moduleQueries.createModule({
      name,
      course_id: findCours.id,
      number,
    });
    return moduleCreated;
  },
  updateModule: async (id, module) => {
    const { name, number } = module;
    const moduleUpdated = await moduleQueries.updateModule(id, {
      name,
      number,
    });
    return moduleUpdated;
  },
  deleteModule: async (id) => {
    const moduleDeleted = await moduleQueries.deleteModule(id);
    return moduleDeleted;
  },

  getModulesByCourseId: async (course_id) => {
    const modulesFound = await moduleQueries.getModulesByCourseId(course_id);
    return modulesFound;
  },
  getModulesByCourseIdAndModuleId: async (course_id, module_id) => {
    const modulesFound = await moduleQueries.getModulesByCourseIdAndModuleId(
      course_id,
      module_id
    );
    return modulesFound;
  },
  };

export default moduleService;

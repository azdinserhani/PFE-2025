import { publicRequest, userRequest } from "../utils/axios";
import {
  addLectureToSection,
  addSection,
  setCourseInfo,
  addVideoToLecture,
  addQuizToSection,
} from "./features/courseSlice";
import {
  loginFailure,
  loginRequest,
  loginSuccess,
  logout,
  updateUser,
} from "./features/userSlice";
export const createSection = async (dispatch, section) => {
  try {
    // const res = await userRequest.post("/api/v1/course/module/create", section);

    dispatch(addSection(section));
  } catch (error) {}
};

export const createLecture = async (dispatch, lecture, sectionId) => {
  dispatch(
    addLectureToSection({
      sectionIndex: sectionId,
      title: lecture.title,
    })
  );
};

export const addVideoToLectureAction = async (
  dispatch,
  sectionId,
  lectureId,

  video_url
) => {
  dispatch(
    addVideoToLecture({
      sectionIndex: sectionId,
      lectureIndex: lectureId,
      video_url: video_url,
    })
  );
};

export const createQuiz = async (
  dispatch,
  quizData,
  sectionIndex,
  position
) => {
  try {
    dispatch(
      addQuizToSection({
        sectionIndex,
        title: quizData.title,
        position,
      })
    );

    return true;
  } catch (error) {
    console.error("Error creating quiz:", error);
    return false;
  }
};

// auth api calls
export const loginUser = async (dispatch, user) => {
  dispatch(loginRequest());
  try {
    const res = await publicRequest.post("/api/v1/auth/login", user);

    if (res.status === 200) {
      dispatch(loginSuccess(res.data.data));
    } else {
      dispatch(loginFailure(data.message));
    }
  } catch (error) {
    console.log("error", error.response.data.message);

    dispatch(loginFailure(error.response.data.message));
  }
};
export const updateUserMe = async (dispatch, user) => {
  try {
    // Only send allowed fields to backend
    const payload = {
      username: user.username,
      email: user.email,
      profile_pic: user.profile_pic,
    };
    const res = await userRequest.patch("/api/v1/user/userMe", payload);
    if (res.data && res.data.data && res.data.data.user) {
      dispatch(updateUser(res.data.data.user));
    } else {
      console.error("Unexpected response structure:", res.data);
    }
  } catch (error) {
    const errMsg =
      error?.response?.data?.message || error.message || "Unknown error";
    console.log("error", errMsg);
  }
};

export const logoutUser = async (dispatch) => {
  dispatch(logout());
};
export const registerUser = async (dispatch, user) => {
  dispatch(loginRequest());
  try {
    const res = await publicRequest.post("/api/v1/auth/register", user);

    if (res.status === 201) {
      dispatch(loginSuccess(res.data.data));
    } else {
      dispatch(loginFailure(data.message));
    }
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};

//course api calls
export const getAllCourses = async (params = {}) => {
  try {
    const {
      page = 1,
      limit = 8,
      category,
      search,
      level,
      maxPrice,
      sort,
    } = params;
    const queryParams = new URLSearchParams({
      page,
      limit,
      ...(category && { category }),
      ...(search && { search }),
      ...(level && { level }),
      ...(maxPrice && { maxPrice }),
      ...(sort && { sort }),
    });

    const res = await publicRequest.get(
      `/api/v1/course/courses?${queryParams}`
    );
    return {
      courses: res.data.data,
      totalPages: res.data.totalPages,
      currentPage: res.data.currentPage,
    };
  } catch (error) {
    console.error(`Error getting courses:`, error);
    throw error;
  }
};
export const createCourseWithContent = async (course) => {
  try {
    const { title, description, price, categoryId, image } = course;

    const res = await userRequest.post("/api/v1/course/create", {
      title,
      description,
      price,
      categoryId,
      thumbnail: image,
    });

    const courseId = res.data.data?.id;

    // Store sections and get their IDs
    const sectionPromises = course.sections.map(async (element) => {
      const sectionData = await storeSection({
        name: element.name,
        number: element.number,
        course_id: courseId,
      });
      return { ...sectionData, lectures: element.lecture };
    });

    const sectionsWithIds = await Promise.all(sectionPromises);

    // Store lectures for each section
    for (const section of sectionsWithIds) {
      const lecturePromises = section.lectures.map(async (lecture, index) => {
        if (lecture.type === "lecture") {
          return storeLecture({
            module_id: section.id,
            name: lecture.title,
            number: index + 1,
            video_url: lecture.video_url,
            lessons_details: "Lecture content",
            is_free: index === 0, // Make first lecture free
          });
        }
        return null; // Skip non-lecture content (like quizzes)
      });
      await Promise.all(lecturePromises.filter((p) => p !== null));
    }
    await createExam(courseId);
    return res.data.data;
  } catch (error) {
    console.error("Error creating course with content:", error);
    throw error;
  }
};

export const getCourseByInstructor = async (id) => {
  try {
    const res = await publicRequest.get(`/api/v1/course/instructor/${id}`);
    return res.data.data;
  } catch (error) {}
};

export const uploadFile = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const res = await publicRequest.post("/api/v1/media/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  } catch (error) {}
};

const storeSection = async (section) => {
  try {
    const res = await userRequest.post("/api/v1/course/module/create", section);

    return res.data.data;
  } catch (error) {
    console.error(`Error storing section "${section.name}":`, error);
  }
};

const storeLecture = async (lecture) => {
  try {
    const res = await userRequest.post("/api/v1/course/lecture", lecture);
    return res.data.data;
  } catch (error) {
    console.error(`Error storing lecture "${lecture.name}":`, error);
    throw error;
  }
};

export const deleteCourse = async (id) => {
  try {
    const res = await userRequest.delete(`/api/v1/course/delete/${id}`);
    return res.data.data;
  } catch (error) {
    console.error(`Error deleting course "${id}":`, error);
    throw error;
  }
};

export const getCourseById = async (id) => {
  try {
    const res = await publicRequest.get(`/api/v1/course/course/content/${id}`);
    return res.data.data;
  } catch (error) {
    console.error(`Error getting course "${id}":`, error);
    throw error;
  }
};

export const updateCourse = async (courseData) => {
  const { id, title, description, price, categoryId, image, sections } = courseData;
  try {
    
    const res = await userRequest.patch(`/api/v1/course/update/${id}`, {
      title,
      description,
      price,
      categoryId,
      thumbnail: image,
    });

    // TODO: Add logic to update sections if needed
    // For now, we're only updating the basic course information
    
    return res.data.data;
  } catch (error) {
    console.error(`Error updating course "${id}":`, error);
    throw error;
  }
};

//category api calls
export const createCategory = async (category) => {
  try {
    const res = await userRequest.post("/api/v1/course/categories", category);
    return res.data.data;
  } catch (error) {
    console.error(`Error creating category "${category.name}":`, error);
    throw error;
  }
};

export const getCategories = async () => {
  try {
    const res = await publicRequest.get("/api/v1/course/categories/stats");

    return res.data.data;
  } catch (error) {
    console.error(`Error getting categories:`, error);
    throw error;
  }
};

export const createExam = async (courseId) => {
  try {
    const exam = JSON.parse(localStorage.getItem("exams"));
    console.log(exam);
    const examData ={
      course_id: courseId,
      title: exam.title,
      description: exam.description,
    };
    console.log(examData);
    const res = await userRequest.post("/api/v1/course/exam/create", examData);
    return res.data.data;
  } catch (error) {
    console.error(`Error creating exam "${courseId}":`, error);
    throw error;
  }
};
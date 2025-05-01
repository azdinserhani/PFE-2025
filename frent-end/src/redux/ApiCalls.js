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
} from "./features/userSlice";
export const createSection = async (dispatch, section) => {
  try {

    // const res = await userRequest.post("/api/v1/course/module/create", section);
    // console.log("res", res.data.data);

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
    console.log("error", error);

    dispatch(loginFailure(error.message));
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
    console.log("error", error);
    dispatch(loginFailure(error.message));
  }
};

//course api calls
export const createCourse = async (course) => {
  try {
    const res = await userRequest.post("/api/v1/course/create", course);
    console.log("res", res.data.data);
  } catch (error) {
    console.log("error", error);
  }
};

export const getCourseByInstructor = async (id) => {
  try {
    const res = await publicRequest.get(`/api/v1/course/instructor/${id}`);
    return res.data.data;
  } catch (error) {
    console.log("error", error);
  }
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
  } catch (error) {
    console.log("error", error);
  }
};

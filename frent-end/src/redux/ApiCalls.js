import { publicRequest } from "../utils/axios";
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
  dispatch(addSection(section));
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
  video
) => {
  dispatch(
    addVideoToLecture({
      sectionIndex: sectionId,
      lectureIndex: lectureId,
      video,
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

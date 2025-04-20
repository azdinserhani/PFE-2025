import {
  addLectureToSection,
  addSection,
  setCourseInfo,
  addVideoToLecture,
  addQuizToSection,
} from "./features/courseSlice";

export const createSection = async (dispatch, section) => {
  dispatch(addSection(section));
};

export const createLecture = async (dispatch, lecture, sectionIndex) => {
  dispatch(addLectureToSection({ sectionIndex, ...lecture }));
};
export const addVideoToLectureAction = async (
  dispatch,
  sectionIndex,
  lectureIndex,
  video
) => {
  dispatch(addVideoToLecture({ sectionIndex, lectureIndex, video: video }));
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
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
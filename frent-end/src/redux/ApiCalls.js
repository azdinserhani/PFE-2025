import {
  addLectureToSection,
  addSection,
  setCourseInfo,
  addVideoToLecture,
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

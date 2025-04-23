import { createSlice, nanoid } from "@reduxjs/toolkit";
const initialState = {
  title: "",
  description: "",
  price: 0,
  category: "",
  image: "",
  sections: [],
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setCourseInfo: (state, action) => {
      state.title = action.payload.title;
      state.description = action.payload.description;
      state.price = action.payload.price;
      state.category = action.payload.category;
      state.image = action.payload.image;
    },
    addSection: (state, action) => {
      state.sections.push({
        id: nanoid(), // Add unique id for each section
        title: action.payload.title,
        lecture: [],
      });
    },
    addLectureToSection: (state, action) => {
      const { sectionIndex, title } = action.payload;
      state.sections[sectionIndex].lecture.push({
        id: nanoid(),
        type: "lecture",
        title,
        video: null,
      });
    },
    addVideoToLecture: (state, action) => {
      const { sectionIndex, lectureIndex, video } = action.payload;
      if (state.sections[sectionIndex]?.lecture[lectureIndex]) {
        state.sections[sectionIndex].lecture[lectureIndex].video = video;
      }
    },
    addQuizToSection: (state, action) => {
      const { sectionIndex, title } = action.payload;
      const quiz = {
        id: nanoid(),
        type: "quiz",
        title,
        question: {
          text: "",
          options: [],
          correctAnswer: null, // Single index for the correct answer
        },
      };
      state.sections[sectionIndex].lecture.splice(
        state.sections[sectionIndex].lecture.length,
        0,
        quiz
      );
    },
    addQuizQuestion: (state, action) => {
      const {
        sectionIndex,
        lectureIndex,
        questionText,
        options,
        correctAnswer,
      } = action.payload;

      const quiz = state.sections[sectionIndex].lecture[lectureIndex];
      if (quiz.type === "quiz") {
        quiz.question = {
          text: questionText,
          options: options,
          correctAnswer,
        };
      }
    },
    reorderSections: (state, action) => {
      const { activeIndex, overIndex } = action.payload;
      if (activeIndex !== overIndex) {
        const sections = [...state.sections];
        const [movedSection] = sections.splice(activeIndex, 1);
        sections.splice(overIndex, 0, movedSection);
        state.sections = sections;
      }
    },
  },
});

export const {
  setCourseInfo,
  addSection,
  addLectureToSection,
  addVideoToLecture,
  addQuizToSection,
  addQuizQuestion,
  reorderSections,
} = courseSlice.actions;

export default courseSlice.reducer;

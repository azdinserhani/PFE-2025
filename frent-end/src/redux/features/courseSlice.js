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
    resetCourse: (state) => {
      state.title = "";
      state.description = "";
      state.price = 0;
      state.category = "";
      state.image = "";
      state.sections = [];
    },
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
        name: action.payload.name,
        number: state.sections.length + 1,
        lecture: [],
      });
    },
    addLectureToSection: (state, action) => {
      const { sectionIndex, title } = action.payload;
      state.sections[sectionIndex].lecture.push({
        id: nanoid(),
        type: "lecture",
        title,
        video_url: null,
        duration_seconds: null,
      });
    },
    addVideoToLecture: (state, action) => {
      const { sectionIndex, lectureIndex, video_url, duration_seconds } = action.payload;

      const section = state.sections[sectionIndex];
      if (!section) {
        console.warn(`Section at index ${sectionIndex} not found.`);
        return;
      }

      const lecture = section.lecture[lectureIndex];
      if (!lecture) {
        console.warn(
          `Lecture at index ${lectureIndex} in section ${sectionIndex} not found.`
        );
        return;
      }

      if (lecture.type === "lecture") {
        lecture.video_url = video_url;
        lecture.duration_seconds = duration_seconds;
      } else {
        console.warn(`Item at lectureIndex ${lectureIndex} is not a lecture.`);
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

        // Update section numbers based on new order
        const updatedSections = sections.map((section, index) => ({
          ...section,
          number: index + 1,
        }));

        state.sections = updatedSections;
      }
    },
    setSections: (state, action) => {
      state.sections = action.payload;
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
  resetCourse,
  setSections,
} = courseSlice.actions;

export default courseSlice.reducer;

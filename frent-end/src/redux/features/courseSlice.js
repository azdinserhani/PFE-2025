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
        title,
        video: null, // Initialize video as null
      });
    },
    addVideoToLecture: (state, action) => {
      const { sectionIndex, lectureIndex, video } = action.payload;
      if (state.sections[sectionIndex]?.lecture[lectureIndex]) {
        state.sections[sectionIndex].lecture[lectureIndex].video = video;
      }
    },
    reorderSections: (state, action) => {
      const { sourceIndex, destinationIndex } = action.payload;
      const [removed] = state.sections.splice(sourceIndex, 1);
      state.sections.splice(destinationIndex, 0, removed);
    },
  },
});

export const {
  setCourseInfo,
  addSection,
  addLectureToSection,
  addVideoToLecture,
  reorderLectures,
  reorderSections,
} = courseSlice.actions;

export default courseSlice.reducer;

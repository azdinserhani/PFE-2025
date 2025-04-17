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
  },
});

export const {
  setCourseInfo,
  addSection,
  addLectureToSection,
  addVideoToLecture,
} = courseSlice.actions;

export default courseSlice.reducer;

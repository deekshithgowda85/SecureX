import { createSlice } from "@reduxjs/toolkit";

const quizSlice = createSlice({
  name: "quiz",
  initialState: {
    history: [], // stores quiz attempts
  },
  reducers: {
    saveQuizResult: (state, action) => {
      state.history.push(action.payload);
    },
    clearHistory: (state) => {
      state.history = [];
    },
  },
});

export const { saveQuizResult, clearHistory } = quizSlice.actions;
export default quizSlice.reducer;

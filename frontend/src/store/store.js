import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counterSlice';
import quizReducer from "../features/quizSlice";
import userReducer from "../features/UserSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    quiz: quizReducer,
    user: userReducer, 
  },
});

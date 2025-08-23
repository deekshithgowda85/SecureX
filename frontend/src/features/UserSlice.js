// src/redux/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  email: null,
  name: null,
  imageUrl: null,
  isSignedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { id, email, name, imageUrl } = action.payload;
      state.id = id;
      state.email = email;
      state.name = name;
      state.imageUrl = imageUrl;
      state.isSignedIn = true;
    },
    clearUser: (state) => {
      state.id = null;
      state.email = null;
      state.name = null;
      state.imageUrl = null;
      state.isSignedIn = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;

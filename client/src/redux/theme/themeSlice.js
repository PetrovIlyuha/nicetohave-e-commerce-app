import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
  name: 'theme',
  initialState: { darkMode: false },
  reducers: {
    setDarkMode(state, action) {
      state.darkMode = action.payload;
    },
    removeDarkMode(state, action) {
      state.darkMode = action.payload;
    },
  },
});

export const { setDarkMode, removeDarkMode } = themeSlice.actions;

export default themeSlice.reducer;

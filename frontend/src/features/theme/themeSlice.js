import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: true,
  status: 'idle',
  error: null,
};

export const themeSlice = createSlice({
  name: 'scores',
  initialState,
  reducers: {
    reset: (state) => {
      state.theme = true;
    },
    toggleTheme: (state) => {
      state.theme = !state.theme;
    },
  },
});

export const { reset, toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;

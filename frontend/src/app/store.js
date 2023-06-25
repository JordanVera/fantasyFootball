import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice.js';
import scoresReducer from '../features/scores/scoresSlice.js';
import themeReducer from '../features/theme/themeSlice.js';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    scores: scoresReducer,
    theme: themeReducer,
  },
});

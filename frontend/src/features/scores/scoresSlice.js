import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getScores = createAsyncThunk('scores/getScores', async () => {
  try {
    const response = await axios.get(`http://localhost:5555/api/scores`);

    return response.data;
  } catch (error) {
    console.log(error);
  }
});

const initialState = {
  winners: {},
  losers: {},
  status: 'idle',
  error: null,
};

export const scoresSlice = createSlice({
  name: 'scores',
  initialState,
  reducers: {
    reset: (state) => {
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getScores.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getScores.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.winners = action.payload[0].winners;
        state.losers = action.payload[0].losers;
      })
      .addCase(getScores.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload;
      });
  },
});

export const { reset } = scoresSlice.actions;
export default scoresSlice.reducer;

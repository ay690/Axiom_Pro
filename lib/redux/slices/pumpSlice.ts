import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  newStreams: [],
  topStreamTokens: [],
};

const pumpSlice = createSlice({
  name: 'pump',
  initialState,
  reducers: {
    setNewStreams: (state, action) => {
      state.newStreams = action.payload;
    },
    setTopStreamTokens: (state, action) => {
      state.topStreamTokens = action.payload;
    },
  },
});

export const { setNewStreams, setTopStreamTokens } = pumpSlice.actions;
export default pumpSlice.reducer;
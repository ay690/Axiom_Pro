import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  earlyTokens: [],
  surgingTokens: [],
};

const surgeSlice = createSlice({
  name: 'surge',
  initialState,
  reducers: {
    setEarlyTokens: (state, action) => {
      state.earlyTokens = action.payload;
    },
    setSurgingTokens: (state, action) => {
      state.surgingTokens = action.payload;
    },
  },
});

export const { setEarlyTokens, setSurgingTokens } = surgeSlice.actions;
export default surgeSlice.reducer;
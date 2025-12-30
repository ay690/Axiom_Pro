'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface HiddenTokensState {
  ids: string[];
}

const initialState: HiddenTokensState = {
  ids: [],
};

const hiddenTokensSlice = createSlice({
  name: 'hiddenTokens',
  initialState,
  reducers: {
    hideToken: (state, action: PayloadAction<string>) => {
      state.ids.push(action.payload);
    },
  },
});

export const { hideToken } = hiddenTokensSlice.actions;
export default hiddenTokensSlice.reducer;

'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SurgeFilterState, SurgeState, Token } from '@/types';

const initialState: SurgeState = {
  filters: {
    marketCap: { min: 0, max: 1000000 },
    liquidity: { min: 0, max: 1000000 },
    volume: { min: 0, max: 1000000 },
  },
  earlyTokens: [],
  surgingTokens: [],
};

const surgeSlice = createSlice({
  name: 'surge',
  initialState,
  reducers: {
    setSurgeFilters(state, action: PayloadAction<Partial<SurgeFilterState>>) {
      state.filters = { ...state.filters, ...action.payload };
    },
    setEarlyTokens(state, action: PayloadAction<Token[]>) {
      state.earlyTokens = action.payload;
    },
    setSurgingTokens(state, action: PayloadAction<Token[]>) {
      state.surgingTokens = action.payload;
    },
  },
});

export const { setSurgeFilters, setEarlyTokens, setSurgingTokens } = surgeSlice.actions;
export default surgeSlice.reducer;

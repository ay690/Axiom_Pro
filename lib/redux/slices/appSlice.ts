import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeTab: 'dex',
  timeFilter: '1h',
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    setTimeFilter: (state, action) => {
      state.timeFilter = action.payload;
    },
  },
});

export const { setActiveTab, setTimeFilter } = appSlice.actions;
export default appSlice.reducer;

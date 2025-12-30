import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
  activeTab: string;
  timeFilter: string;
  showHidden: boolean;
}

const initialState: AppState = {
  activeTab: 'dex',
  timeFilter: '1h',
  showHidden: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload;
    },
    setTimeFilter: (state, action: PayloadAction<string>) => {
      state.timeFilter = action.payload;
    },
    toggleShowHidden(state) {
      state.showHidden = !state.showHidden;
    },
  },
});

export const { setActiveTab, setTimeFilter, toggleShowHidden } = appSlice.actions;
export default appSlice.reducer;

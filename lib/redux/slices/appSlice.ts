import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
  activeTab: string;
  timeFilter: string;
  showHidden: boolean;
  searchQuery: string;
}

const initialState: AppState = {
  activeTab: 'dex',
  timeFilter: '1h',
  showHidden: false,
  searchQuery: '',
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
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { setActiveTab, setTimeFilter, toggleShowHidden, setSearchQuery } = appSlice.actions;
export default appSlice.reducer;

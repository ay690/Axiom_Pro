import { configureStore } from '@reduxjs/toolkit';
import appReducer from './slices/appSlice';
import pumpReducer from './slices/pumpSlice';
import surgeReducer from './slices/surgeSlice';
import tokensReducer from './slices/tokensSlice';
import hiddenTokensReducer from './slices/hiddenTokensSlice';

export const store = configureStore({
  reducer: {
    app: appReducer,
    pump: pumpReducer,
    surge: surgeReducer,
    tokens: tokensReducer,
    hiddenTokens: hiddenTokensReducer,
  },
});

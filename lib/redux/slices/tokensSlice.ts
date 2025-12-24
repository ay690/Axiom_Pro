import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  dexTokens: [],
  topTokens: [],
  trendingTokens: [],
  priceChanges: {}, // Track recent price changes for animations
};

const tokensSlice = createSlice({
  name: 'tokens',
  initialState,
  reducers: {
    setDexTokens: (state, action) => {
      state.dexTokens = action.payload;
    },
    setTopTokens: (state, action) => {
      state.topTokens = action.payload;
    },
    setTrendingTokens: (state, action) => {
      state.trendingTokens = action.payload;
    },
    updateTokenPrice: (state, action) => {
      const { id, newPrice, view } = action.payload;
      const tokenArray = view === 'dex' ? 'dexTokens' : view === 'top' ? 'topTokens' : 'trendingTokens';
      
      const tokenIndex = state[tokenArray].findIndex(t => t.id === id);
      if (tokenIndex !== -1) {
        const oldPrice = state[tokenArray][tokenIndex].marketCap;
        state[tokenArray][tokenIndex].marketCap = newPrice;
        state[tokenArray][tokenIndex].change = ((newPrice - oldPrice) / oldPrice * 100).toFixed(2);
        
        // Track price change direction for animation
        state.priceChanges[id] = {
          direction: newPrice > oldPrice ? 'up' : 'down',
          timestamp: Date.now(),
        };
      }
    },
    clearPriceChange: (state, action) => {
      delete state.priceChanges[action.payload];
    },
  },
});

export const { setDexTokens, setTopTokens, setTrendingTokens, updateTokenPrice, clearPriceChange } = tokensSlice.actions;
export default tokensSlice.reducer;

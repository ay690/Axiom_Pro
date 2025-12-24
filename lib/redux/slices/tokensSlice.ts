import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { PriceChange, Token } from '@/types';

type TokenView = 'dex' | 'top' | 'trending';
type TokenArrayKey = 'dexTokens' | 'topTokens' | 'trendingTokens';

type TokensSliceState = {
  dexTokens: Token[];
  topTokens: Token[];
  trendingTokens: Token[];
  priceChanges: Record<string, PriceChange>; // Track recent price changes for animations
};

const initialState: TokensSliceState = {
  dexTokens: [],
  topTokens: [],
  trendingTokens: [],
  priceChanges: {}, // Track recent price changes for animations
};

const tokensSlice = createSlice({
  name: 'tokens',
  initialState,
  reducers: {
    setDexTokens: (state, action: PayloadAction<Token[]>) => {
      state.dexTokens = action.payload;
    },
    setTopTokens: (state, action: PayloadAction<Token[]>) => {
      state.topTokens = action.payload;
    },
    setTrendingTokens: (state, action: PayloadAction<Token[]>) => {
      state.trendingTokens = action.payload;
    },
    updateTokenPrice: (state, action: PayloadAction<{ id: Token['id']; newPrice: number; view: TokenView }>) => {
      const { id, newPrice, view } = action.payload;
      const tokenArray: TokenArrayKey = view === 'dex' ? 'dexTokens' : view === 'top' ? 'topTokens' : 'trendingTokens';
      
      const tokenIndex = state[tokenArray].findIndex((t) => t.id === id);
      if (tokenIndex !== -1) {
        const oldPrice = state[tokenArray][tokenIndex].marketCap;
        state[tokenArray][tokenIndex].marketCap = newPrice;
        const percentChange = oldPrice ? ((newPrice - oldPrice) / oldPrice) * 100 : 0;
        state[tokenArray][tokenIndex].change = Number(percentChange.toFixed(2));
        
        // Track price change direction for animation
        state.priceChanges[String(id)] = {
          direction: newPrice > oldPrice ? 'up' : 'down',
          amount: newPrice - oldPrice,
          timestamp: Date.now(),
        };
      }
    },
    clearPriceChange: (state, action: PayloadAction<Token['id']>) => {
      delete state.priceChanges[String(action.payload)];
    },
  },
});

export const { setDexTokens, setTopTokens, setTrendingTokens, updateTokenPrice, clearPriceChange } = tokensSlice.actions;
export default tokensSlice.reducer;

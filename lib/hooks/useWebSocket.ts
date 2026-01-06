'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setDexTokens, setTopTokens, setTrendingTokens, updateTokenPrice } from '../redux/slices/tokensSlice';
import { setNewStreams, setTopStreamTokens } from '../redux/slices/pumpSlice';
import { setEarlyTokens, setSurgingTokens } from '../redux/slices/surgeSlice';
import { generateMockTokens, generateMockPumpTokens, generateMockSurgeTokens } from '../utils/utils';

// Correctly define the TokenView type
// This ensures that the 'view' property in updateTokenPrice action payload
// is of the correct type, resolving the TypeScript error.
type TokenView = 'dex' | 'top' | 'trending';

export function useWebSocket() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Initialize with mock data
    dispatch(setDexTokens(generateMockTokens('dex')));
    dispatch(setTopTokens(generateMockTokens('top')));
    dispatch(setTrendingTokens(generateMockTokens('trending')));
    dispatch(setNewStreams(generateMockPumpTokens('new')));
    dispatch(setTopStreamTokens(generateMockPumpTokens('top')));
    dispatch(setEarlyTokens(generateMockSurgeTokens('early')));
    dispatch(setSurgingTokens(generateMockSurgeTokens('surging')));

    // Simulate WebSocket updates every 2-5 seconds
    const interval = setInterval(() => {
      // Randomly update some token prices
      const views: TokenView[] = ['dex', 'top', 'trending'];
      const randomView = views[Math.floor(Math.random() * views.length)];
      const randomId = Math.floor(Math.random() * 6) + 1;
      
      // Generate a random price change (-5% to +5%)
      const changePercent = (Math.random() - 0.5) * 10;
      const basePrice = Math.random() * 10000000 + 10000; // Random base between 10K and 10M
      const newPrice = basePrice * (1 + changePercent / 100);
      
      dispatch(updateTokenPrice({
        id: String(randomId),
        newPrice: Math.floor(newPrice),
        view: randomView,
      }));
    }, Math.random() * 3000 + 2000); // Random interval between 2-5 seconds

    return () => clearInterval(interval);
  }, [dispatch]);
}

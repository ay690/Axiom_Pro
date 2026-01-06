'use client';

import { useSelector } from 'react-redux';
import TokenRow from '../tokens/TokenRow';
import { RootState, Token } from '@/types';
import { useMemo } from 'react';

export default function DexScreener() {
  const { dexTokens } = useSelector((state: RootState) => state.tokens);
  const hiddenTokenIds = useSelector((state: RootState) => state.hiddenTokens.ids);
  const { showHidden, timeFilter, searchQuery } = useSelector((state: RootState) => state.app);

  const filteredTokens = useMemo(() => {
    const now = Date.now();
    let timeThreshold = now;

    switch (timeFilter) {
      case '5m':
        timeThreshold = now - 5 * 60 * 1000;
        break;
      case '1h':
        timeThreshold = now - 60 * 60 * 1000;
        break;
      case '6h':
        timeThreshold = now - 6 * 60 * 60 * 1000;
        break;
      case '24h':
        timeThreshold = now - 24 * 60 * 60 * 1000;
        break;
      default:
        timeThreshold = now;
    }

    let tokens = showHidden ? dexTokens : dexTokens.filter(token => !hiddenTokenIds.includes(`dex-${token.id}`));

    if (timeFilter !== '24h') {
      tokens = tokens.filter(token => token.createdAt >= timeThreshold);
    }

    if (searchQuery) {
      const lowercasedQuery = searchQuery.toLowerCase();
      tokens = tokens.filter(token =>
        token.name.toLowerCase().includes(lowercasedQuery) ||
        token.symbol.toLowerCase().includes(lowercasedQuery)
      );
    }

    return tokens;
  }, [dexTokens, hiddenTokenIds, showHidden, timeFilter, searchQuery]);

  return (
    <div className="space-y-0">
      {/* Table Header */}
      <div className="grid grid-cols-[2fr_1.5fr_1fr_1fr_1fr_1.5fr_0.5fr] gap-4 px-4 py-3 text-xs text-gray-500 border-b border-gray-800">
        <div>Pair Info</div>
        <div className="text-center">Market Cap</div>
        <div className="text-center">Liquidity</div>
        <div className="text-center">Volume</div>
        <div className="text-center">TXNS</div>
        <div className="text-center">Audit Log</div>
        <div className="text-center">Action</div>
      </div>

      {/* Token Rows */}
      <div className="divide-y divide-gray-800">
        {filteredTokens.map((token: Token) => (
          <TokenRow key={`dex-${token.id}`} token={token} view="dex" />
        ))}
      </div>
    </div>
  );
}

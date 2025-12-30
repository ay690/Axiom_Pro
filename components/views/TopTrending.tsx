'use client';

import { useSelector } from 'react-redux';
import TokenRow from '../tokens/TokenRow';
import { useMemo } from 'react';
import { RootState, Token } from '@/types';

export default function TopTrending({ type }: { type: 'top' | 'trending' }) {
  const { topTokens, trendingTokens } = useSelector((state: RootState) => state.tokens);
  const hiddenTokenIds = useSelector((state: RootState) => state.hiddenTokens.ids);
  const showHidden = useSelector((state: RootState) => state.app.showHidden);

  const tokens = type === 'top' ? topTokens : trendingTokens;

  const filteredTokens = useMemo(() => {
    if (showHidden) {
      return tokens;
    }
    return tokens.filter(token => !hiddenTokenIds.includes(`${type}-${token.id}`));
  }, [tokens, hiddenTokenIds, showHidden, type]);

  return (
    <div className="space-y-0">
      {/* Table Header */}
      <div className="grid grid-cols-[2fr_1.5fr_1fr_1fr_1fr_1.5fr_0.5fr] gap-4 px-4 py-3 text-xs text-gray-500 border-b border-gray-800">
        <div>Pair Info</div>
        <div className="text-center">Market Cap</div>
        <div className="text-center">Liquidity</div>
        <div className="text-center">Volume</div>
        <div className="text-center">TXNS</div>
        <div className="text-center">Token Info</div>
        <div className="text-center">Action</div>
      </div>

      {/* Token Rows */}
      <div className="divide-y divide-gray-800">
        {filteredTokens.map((token: Token) => (
          <TokenRow key={`${type}-${token.id}`} token={token} view={type} />
        ))}
      </div>
    </div>
  );
}

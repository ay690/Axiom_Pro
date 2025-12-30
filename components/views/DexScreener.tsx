'use client';

import { useSelector } from 'react-redux';
import TokenRow from '../tokens/TokenRow';
import { RootState, Token } from '@/types';
import { useMemo } from 'react';

export default function DexScreener() {
  const { dexTokens } = useSelector((state: RootState) => state.tokens);
  const hiddenTokenIds = useSelector((state: RootState) => state.hiddenTokens.ids);
  const showHidden = useSelector((state: RootState) => state.app.showHidden);

  const filteredTokens = useMemo(() => {
    if (showHidden) {
      return dexTokens;
    }
    return dexTokens.filter(token => !hiddenTokenIds.includes(`dex-${token.id}`));
  }, [dexTokens, hiddenTokenIds, showHidden]);

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

'use client';

import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import { Zap } from 'lucide-react';
import { RootState, Token } from '@/types';
import { useMemo, useState } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Image from "next/image";
import { hideToken } from '@/lib/redux/slices/hiddenTokensSlice';

export default function Surge() {
  const { earlyTokens, surgingTokens } = useSelector((state: RootState) => state.surge);
  const hiddenTokenIds = useSelector((state: RootState) => state.hiddenTokens.ids);
  const { showHidden } = useSelector((state: RootState) => state.app);
  const [isHovered, setIsHovered] = useState<string | null>(null);
  const dispatch = useDispatch();

  const handleHideToken = (tokenId: string) => {
    dispatch(hideToken(tokenId));
  };

  const filteredEarlyTokens = useMemo(() => {
    return showHidden ? earlyTokens : earlyTokens.filter(token => !hiddenTokenIds.includes(`early-${token.id}`));
  }, [earlyTokens, hiddenTokenIds, showHidden]);

  const filteredSurgingTokens = useMemo(() => {
    return showHidden ? surgingTokens : surgingTokens.filter(token => !hiddenTokenIds.includes(`surging-${token.id}`));
  }, [surgingTokens, hiddenTokenIds, showHidden]);

  const renderToken = (token: Token, section: string) => (
    <div 
      key={`${section}-${token.id}`} 
      className="bg-gray-900/30 border border-gray-800 rounded-lg p-5 hover:border-gray-700 transition-colors"
      onMouseEnter={() => setIsHovered(`${section}-${token.id}`)}
      onMouseLeave={() => setIsHovered(null)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {/* Token Image */}
          <div className="relative">
            {isHovered === `${section}-${token.id}` && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div onClick={() => handleHideToken(`${section}-${token.id}`)} className="absolute -top-2 -left-2 z-10 cursor-pointer rounded-lg bg-gray-900/80 p-2 backdrop-blur-sm">
                        <Image src="/hide.svg" alt="Hide token" width={20} height={20} />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Hide token</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            <div className="w-20 h-20 bg-linear-to-br from-gray-700 to-gray-900 rounded-lg flex items-center justify-center text-3xl">
              {token.image}
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-yellow-500 rounded-full border-2 border-gray-900">⚡</div>
          </div>

          {/* Token Info */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-medium text-lg">{token.name}</span>
              <span className="text-gray-400">{token.symbol}</span>
              <span className="text-gray-500">📋</span>
            </div>
            <div className="text-sm">
              <span className="text-green-400">MC</span>{' '}
              <span className="text-white font-medium">${(token.marketCap / 1000).toFixed(1)}K</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span>⏱ {token.age}m</span>
              {token.badges.slice(0, 4).map((badge, i) => (
                <span key={i}>{badge}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Time Badge */}
        <div className="text-right">
          <div className="text-2xl font-light text-gray-400">{token.age}m</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between text-sm">
          <span className={token.change > 0 ? 'text-cyan-400' : 'text-red-400'}>
            {token.change > 0 ? '●' : '●'} ${(token.marketCap / 1000).toFixed(2)}K
          </span>
          <span className={token.change > 0 ? 'text-cyan-400' : 'text-red-400'}>
            {token.change > 0 ? '+' : ''}{token.change.toFixed(1)}%
          </span>
        </div>
        <div className="relative h-1.5 bg-gray-800 rounded-full overflow-hidden">
          <div
            className={`absolute left-0 top-0 h-full transition-all duration-1000 ${
              token.change > 0 ? 'bg-cyan-400' : 'bg-red-500'
            }`}
            style={{ width: `${Math.min(Math.abs(token.change), 100)}%` }}
          ></div>
        </div>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>ATH ${(token.ath / 1000).toFixed(2)}K</span>
          <span>{Math.floor(Math.abs(token.change))}x</span>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-4 gap-3 mb-4 text-xs">
        {token.metrics.percentages.map((metric: { value: number; color: string }, i: number) => (
          <div key={i} className="flex items-center gap-1">
            <span className={`text-${metric.color}-400`}>● {metric.value}%</span>
          </div>
        ))}
        <div className="text-green-400">● Paid</div>
      </div>

      {/* Bottom Stats */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-800">
        <div className="flex items-center gap-4 text-xs text-gray-400">
          <span>V ${(token.volume / 1000).toFixed(1)}K</span>
          <span>L ${(token.liquidity / 1000).toFixed(1)}K</span>
          <span>📊 {token.metrics.holders}</span>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 rounded-full cursor-pointer">
          <Zap className="w-4 h-4 mr-1" />
        </Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Two Column Layout */}
      <div className="grid grid-cols-2 gap-6">
        {/* Early Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-light">Early</h2>
          <div className="space-y-4">
            {filteredEarlyTokens.map((token: Token) => renderToken(token, 'early'))}
          </div>
        </div>

        {/* Surging Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-light">Surging</h2>
          <div className="space-y-4">
            {filteredSurgingTokens.map((token: Token) => renderToken(token, 'surging'))}
          </div>
        </div>
      </div>
    </div>
  );
}

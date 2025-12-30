'use client';

import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import SparklineChart from './SparklineChart';
import { TokenRowProps, RootState } from '@/types/index';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Image from "next/image";
import { hideToken } from '@/lib/redux/slices/hiddenTokensSlice';

export default function TokenRow({ token, view }: TokenRowProps) {
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();
  const priceChanges = useSelector((state: RootState) => state.tokens.priceChanges);

  const priceChange = priceChanges[token.id];

  const flashKey = priceChange?.timestamp ?? 0;
  const flashClass = priceChange ? (priceChange.direction === 'up' ? 'price-flash-green' : 'price-flash-red') : '';

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `$${(num / 1000000).toFixed(2)}M`;
    if (num >= 1000) return `$${(num / 1000).toFixed(1)}K`;
    return `$${num}`;
  };

  // Generate stable mock data for non-dex views
  const mockAuditData = useMemo(() => ({
    warning1: '-8.45',
    positive1: '3.2',
    diamond1: 234,
    warning2: '12.7',
    diamond2: 156
  }), []);

  const formatChange = (change: number) => {
    const formatted = Math.abs(change).toFixed(2);
    return change >= 0 ? `+${formatted}%` : `-${formatted}%`;
  };
  
  const showHideButton = useMemo(() => {
    return ['surge', 'top', 'trending', 'dex'].includes(view);
  }, [view]);

  const handleHideToken = () => {
    dispatch(hideToken(`${view}-${token.id}`));
  };


  return (
    <div className="grid grid-cols-[2fr_1.5fr_1fr_1fr_1fr_1.5fr_0.5fr] gap-4 px-4 py-4 hover:bg-gray-900/50 transition-colors items-center">
      {/* Pair Info */}
      <div className="flex items-center gap-3">
        <div
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {showHideButton && isHovered && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div onClick={handleHideToken} className="absolute -top-2 -left-2 z-10 cursor-pointer rounded-lg bg-gray-900/80 p-2 backdrop-blur-sm">
                    <Image src="/hide.svg" alt="Hide token" width={20} height={20} />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Hide token</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          <div className="w-14 h-14 bg-linear-to-br from-gray-700 to-gray-900 rounded-lg flex items-center justify-center text-2xl border-2 border-yellow-500/30">
            {token.image}
          </div>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-yellow-500 rounded-full border border-gray-900">⚡</div>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-medium">{token.name}</span>
            <span className="text-gray-400 text-sm">{token.symbol}</span>
            <span className="text-gray-500">📋</span>
          </div>
          <div className="flex items-center gap-2 text-xs mt-1">
            <span className="text-cyan-400">{token.age || 12}h</span>
            {token.badges.map((badge: string, i: number) => (
              <span key={i} className="text-gray-400">{badge}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Market Cap with Chart */}
      <div className="flex items-center justify-center gap-3">
        <div className="w-16 h-8">
          <SparklineChart data={token.chartData} change={token.change} />
        </div>
        <div className="text-right">
          <div key={flashKey} className={`font-medium transition-all duration-300 ${flashClass}`}>
            {formatNumber(token.marketCap)}
          </div>
          <div className={`text-xs ${
            token.change >= 0 ? 'text-green-400' : 'text-red-400'
          }`}>
            {formatChange(token.change)}
          </div>
        </div>
      </div>

      {/* Liquidity */}
      <div className="text-center">
        <div className="font-medium">{formatNumber(token.liquidity)}</div>
      </div>

      {/* Volume */}
      <div className="text-center">
        <div className="font-medium">{formatNumber(token.volume)}</div>
      </div>

      {/* TXNS */}
      <div className="text-center">
        <div className="font-medium">{token.txns}</div>
        <div className="text-xs mt-1">
          <span className="text-green-400">{token.txnsBuy || Math.floor(token.txns * 0.6)}</span>
          <span className="text-gray-500"> / </span>
          <span className="text-red-400">{token.txnsSell || Math.floor(token.txns * 0.4)}</span>
        </div>
      </div>

      {/* Audit Log / Token Info */}
      <div className="text-center space-y-1">
        {view === 'dex' ? (
          <>
            <div className={`text-xs ${
              token.auditMetrics.audit1.color === 'red' ? 'text-red-400' : 'text-green-400'
            }`}>
              ⚠ {token.auditMetrics.audit1.value > 0 ? '+' : ''}{token.auditMetrics.audit1.value.toFixed(2)}%
            </div>
            <div className="text-xs text-green-400">
              ◆ {token.auditMetrics.audit2.value.toFixed(2)}%
            </div>
            <div className="text-xs text-green-400">
              {token.auditMetrics.paid ? '◉ Paid' : ''}
            </div>
          </>
        ) : (
          <>
            <div className="text-xs space-y-1">
              <div className="flex items-center justify-center gap-2">
                <span className="text-red-400">⚠ {mockAuditData.warning1}%</span>
                <span className="text-green-400">◆ {mockAuditData.positive1}%</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="text-gray-400">♦ {mockAuditData.diamond1}</span>
                <span className="text-red-400">⚠ {mockAuditData.warning2}%</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="text-gray-400">◆ {mockAuditData.diamond2}</span>
                <span className="text-green-400">◉ Paid</span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Action */}
      <div className="flex justify-center">
        <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full px-6">
          Buy
        </Button>
      </div>
    </div>
  );
}
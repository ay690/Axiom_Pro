'use client';
import { Button } from '@/components/ui/button';
import { Flame, Globe, Hand, Search, User, Trophy, Crown, Send, Sigma, Droplet, TestTube, Zap } from 'lucide-react';
import React from 'react';

const iconMap: { [key: string]: React.ReactElement } = {
  flame: <Flame className="w-3 h-3" />,
  globe: <Globe className="w-3 h-3" />,
  hand: <Hand className="w-3 h-3" />,
  search: <Search className="w-3 h-3" />,
  user: <User className="w-3 h-3" />,
  trophy: <Trophy className="w-3 h-3" />,
  crown: <Crown className="w-3 h-3" />,
  send: <Send className="w-3 h-3" />,
};

interface Stat {
  type: 'danger' | 'info' | 'success';
  value: string;
}

const StatBadge: React.FC<{ stat: Stat }> = ({ stat }) => {
  const colorClasses = {
    danger: 'border-red-500/50 text-red-400',
    info: 'border-blue-500/50 text-blue-400',
    success: 'border-green-500/50 text-green-400',
  };

  return (
    <div className={`flex items-center gap-1.5 text-xs px-2 py-1 border rounded-full ${colorClasses[stat.type]}`}>
      {stat.type === 'danger' && <Droplet className="w-3 h-3" />}
      {stat.type === 'info' && <Sigma className="w-3 h-3" />}
      {stat.type === 'success' && <TestTube className="w-3 h-3" />}
      {stat.value}
    </div>
  );
};

export interface FinalStretchToken {
    id: string;
    image: string;
    name: string;
    symbol: string;
    description: string;
    age: string;
    volume: number;
    marketCap: number;
    transactions: number;
    icons: string[];
    stats: Stat[];
    bnb: number;
    creator: string;
    userIcons: string[];
    userStats: (string | number)[];
    progress: { green: number; red: number };
}

const FinalStretchTokenRow: React.FC<{ token: FinalStretchToken }> = ({ token }) => {
  const formatNumber = (num: number) => {
    if (num >= 1000) return `$${(num / 1000).toFixed(0)}K`;
    return `$${num}`;
  };

  return (
    <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-3 flex gap-4 hover:border-gray-700 transition-colors duration-200">
      {/* Left section: Image and Creator */}
      <div className="flex flex-col items-center justify-between gap-2 w-24">
        <div className="w-24 h-24 bg-gray-800 rounded-md flex items-center justify-center text-center text-xs font-bold p-1">
          {token.image}
        </div>
        <span className="text-xs text-gray-500">{token.creator}</span>
      </div>

      {/* Middle section: Token Info */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-md">{token.name}</span>
            <span className="text-gray-400 text-xs">{token.symbol}</span>
            <span className="text-gray-500 text-xs cursor-pointer">📋</span>
          </div>
          <p className="text-xs text-gray-400 mt-1">{token.description}</p>
        </div>
        
        <div className="space-y-2">
            <div className="flex items-center gap-3 text-xs text-gray-400">
              <span>{token.age}</span>
              <div className="flex items-center gap-1.5">
                {token.icons.map((icon, i) => <span key={i}>{iconMap[icon]}</span>)}
              </div>
              <div className="flex items-center gap-1.5">
                {token.userIcons.map((icon, i) => <span key={i}>{iconMap[icon]}</span>)}
                {token.userStats.map((stat, i) => <span key={i}>{stat}</span>)}
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              {token.stats.map((stat, i) => <StatBadge key={i} stat={stat} />)}
            </div>
        </div>
      </div>

      {/* Right section: Financials */}
      <div className="flex flex-col justify-between items-end w-40">
        <div className="text-right text-xs">
          <div className="text-gray-400">V {formatNumber(token.volume)} MC <span className="text-green-400">{formatNumber(token.marketCap)}</span></div>
          <div className="text-gray-400">TX {token.transactions}</div>
        </div>
        
        <div className="w-full bg-red-500/30 h-1 rounded-full">
            <div className="bg-green-500 h-1 rounded-full" style={{width: `${token.progress.green}%`}}></div>
        </div>

        <Button className="bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-full px-4 py-2 text-xs w-full">
          <Zap className="w-4 h-4 mr-1"/> {token.bnb} BNB
        </Button>
      </div>
    </div>
  );
};

export default FinalStretchTokenRow;
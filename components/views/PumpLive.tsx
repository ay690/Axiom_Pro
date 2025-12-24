'use client';

import { useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';

export default function PumpLive() {
  const { newStreams, topStreamTokens } = useSelector((state) => state.pump);

  return (
    <div className="grid grid-cols-2 gap-6">
      {/* New Streams */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-light">New Streams</h2>
          <input
            type="text"
            placeholder="Search by ticker or name"
            className="bg-gray-900 border border-gray-700 rounded px-3 py-1.5 text-xs w-48 focus:outline-none focus:border-gray-600"
          />
        </div>

        <div className="space-y-3">
          {newStreams.map((token) => (
            <div key={token.id} className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 hover:border-gray-700 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Token Image */}
                  <div className="relative">
                    <div className="w-16 h-16 bg-linear-to-br from-gray-700 to-gray-800 rounded-lg flex items-center justify-center text-2xl">
                      {token.image}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-yellow-500 rounded-full border-2 border-gray-900">⚡</div>
                  </div>

                  {/* Token Info */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{token.name}</span>
                      <span className="text-gray-400 text-sm">{token.symbol}</span>
                      <span className="text-gray-500">📋</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <span>⏱ {token.age}m</span>
                      {token.badges.map((badge, i) => (
                        <span key={i}>{badge}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Side */}
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-xs text-green-400">● {token.age}m</div>
                    <div className="text-sm font-medium">MC ${(token.marketCap / 1000).toFixed(1)}K</div>
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700 rounded-full w-10 h-10 p-0">
                    <ArrowUp className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Stream Tokens */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-light">Top Stream Tokens</h2>
          <input
            type="text"
            placeholder="Search by ticker or name"
            className="bg-gray-900 border border-gray-700 rounded px-3 py-1.5 text-xs w-48 focus:outline-none focus:border-gray-600"
          />
        </div>

        <div className="space-y-3">
          {topStreamTokens.map((token) => (
            <div key={token.id} className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 hover:border-gray-700 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Token Image */}
                  <div className="relative">
                    <div className="w-16 h-16 bg-linear-to-br from-blue-900 to-cyan-900 rounded-lg flex items-center justify-center text-2xl overflow-hidden">
                      {token.image}
                    </div>
                  </div>

                  {/* Token Info */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{token.name}</span>
                      <span className="text-gray-400 text-sm">{token.symbol}</span>
                      <span className="text-gray-500">📋</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <span>⏱ {token.age}m</span>
                      {token.badges.map((badge, i) => (
                        <span key={i}>{badge}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Side */}
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-sm font-medium">MC ${(token.marketCap / 1000).toFixed(1)}K</div>
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700 rounded-full w-10 h-10 p-0">
                    <ArrowUp className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

'use client'
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveTab, setTimeFilter } from '@/lib/redux/slices/appSlice';
import { Button } from '@/components/ui/button';
import DexScreener from '@/components/views/DexScreener';
import PumpLive from '@/components/views/PumpLive';
import Surge from '@/components/views/Surge';
import TopTrending from '@/components/views/TopTrending';
import ExchangeDepositModal from '@/components/modals/ExchangeDepositModal';
import { useWebSocket } from '@/lib/hooks/useWebSocket';
import { Search, Star, Bell, Wallet, ChevronDown, Filter, Bookmark, EyeIcon } from 'lucide-react';
import { RootState } from '@/types';
import PulseSidebar from '@/components/views/PulseSidebar'; // Import PulseSidebar

export default function Home() {
  const dispatch = useDispatch();
  const { activeTab, timeFilter } = useSelector((state: RootState) => state.app);
  const [depositOpen, setDepositOpen] = useState(false);
  const [pulseOpen, setPulseOpen] = useState(true); // State for Pulse sidebar

  // Initialize WebSocket connection for real-time updates
  useWebSocket();

  const tabs = [
    { id: 'top', label: 'Top' },
    { id: 'trending', label: 'Trending' },
    { id: 'surge', label: 'Surge' },
    { id: 'dex', label: 'DEX Screener' },
    { id: 'pump', label: 'Pump Live' },
  ];

  const timeFilters = ['5m', '1h', '6h', '24h'];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <ExchangeDepositModal open={depositOpen} onOpenChange={setDepositOpen} />
      {/* Header */}
      <header className="border-b border-gray-800 px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-white" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}></div>
              <span className="text-xl font-bold">AXIOM</span>
              <span className="text-sm text-gray-400">Pro</span>
            </div>

            {/* Main Navigation */}
            <nav className="flex items-center gap-6">
              <span className="text-blue-400 text-sm cursor-pointer">Discover</span>
              <span className="text-gray-400 text-sm cursor-pointer hover:text-gray-300">Pulse</span>
              <span className="text-gray-400 text-sm cursor-pointer hover:text-gray-300">Trackers</span>
              <span className="text-gray-400 text-sm cursor-pointer hover:text-gray-300">Perpetuals</span>
              <span className="text-gray-400 text-sm cursor-pointer hover:text-gray-300">Yield</span>
              <span className="text-gray-400 text-sm cursor-pointer hover:text-gray-300">Vision</span>
              <span className="text-gray-400 text-sm cursor-pointer hover:text-gray-300">P...</span>
            </nav>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search by token or CA..."
                className="bg-gray-900 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-sm w-64 focus:outline-none focus:border-gray-600"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">/</span>
            </div>

            {/* SQL Dropdown */}
            <Button variant="ghost" className="bg-gray-900 border border-gray-700 text-sm gap-2">
              <span className="text-blue-400">≡</span>
              <span>SOL</span>
              <ChevronDown className="w-4 h-4" />
            </Button>

            {/* Deposit */}
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6"
              onClick={() => setDepositOpen(true)}
            >
              Deposit
            </Button>

            {/* Icons */}
            <button className="p-2 hover:bg-gray-800 rounded-lg">
              <Star className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-gray-800 rounded-lg">
              <Bell className="w-5 h-5" />
            </button>

            {/* Wallet */}
            <div className="flex items-center gap-2 bg-gray-900 border border-gray-700 rounded-lg px-3 py-2">
              <Wallet className="w-4 h-4" />
              <span className="text-sm">= 0</span>
              <ChevronDown className="w-4 h-4" />
            </div>

            {/* Profile */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-linear-to-br from-cyan-400 to-blue-500"></div>
              <button className="p-2 hover:bg-gray-800 rounded-lg">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" stroke="currentColor" strokeWidth="2" />
                  <path d="M12 3v3m0 12v3m9-9h-3M6 12H3m15.364-6.364l-2.121 2.121M8.757 15.243l-2.121 2.121m12.728 0l-2.121-2.121M8.757 8.757L6.636 6.636" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Sub Header with breadcrumb */}
      <div className="px-6 py-4 flex items-center gap-3 text-sm text-gray-500">
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <Star className="w-4 h-4" />
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M8.5 11a4 4 0 100-8 4 4 0 000 8z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div className="flex flex-1 min-w-0">
        <PulseSidebar isOpen={pulseOpen} onClose={() => setPulseOpen(false)} />
        <div className="flex-1 flex flex-col min-w-0">
          {/* Tabs Navigation */}
          <div className="px-6 py-4 flex items-center justify-between border-b border-gray-800">
            <div className="flex items-center gap-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => dispatch(setActiveTab(tab.id))}
                  className={`text-lg font-light transition-colors ${activeTab === tab.id
                      ? 'text-white'
                      : 'text-gray-500 hover:text-gray-300'
                    } ${tab.id === 'dex' && activeTab === 'dex' ? 'underline underline-offset-8 decoration-2' : ''}`}
                >
                  {tab.label}
                  {tab.id === 'pump' && (
                    <ChevronDown className="inline w-4 h-4 ml-1" />
                  )}
                </button>
              ))}
            </div>

            {/* Right side controls */}
            <div className="flex items-center gap-3">
              {/* Time Filters */}
              {(activeTab === 'dex' || activeTab === 'top' || activeTab === 'trending') && (
                <div className="flex items-center gap-2">
                  {timeFilters.map((time) => (
                    <button
                      key={time}
                      onClick={() => dispatch(setTimeFilter(time))}
                      className={`px-3 py-1 text-sm rounded transition-colors ${timeFilter === time
                          ? 'text-blue-400'
                          : 'text-gray-500 hover:text-gray-300'
                        }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              )}

              {/* Filter Button */}
              <Button variant="ghost" className="bg-gray-900 border border-gray-700 text-sm gap-2">
                <Filter className="w-4 h-4" />
                <span>Filter</span>
                <ChevronDown className="w-4 h-4" />
              </Button>

              {/* Action Icons */}
              <button className="p-2 hover:bg-gray-800 rounded-lg">
                <Bookmark className="w-4 h-4" />
              </button>
              <button className="p-2 hover:bg-gray-800 rounded-lg">
                <EyeIcon className="w-4 h-4" />
              </button>

              {/* Wallet Display */}
              <div className="flex items-center gap-2 bg-gray-900 border border-gray-700 rounded-lg px-3 py-2">
                <span className="text-xs">📁</span>
                <span className="text-sm">1</span>
                <span className="text-blue-400">=</span>
                <span className="text-sm">0</span>
                <ChevronDown className="w-4 h-4" />
              </div>

              {/* Quick Buy */}
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-500">Quick Buy</span>
                <span className="text-gray-400">0.0</span>
              </div>

              {/* Presets */}
              <div className="flex items-center gap-2">
                <span className="text-blue-400 text-sm">≡</span>
                <span className="text-sm">P1</span>
                <span className="text-sm">P2</span>
                <span className="text-sm text-blue-400">P3</span>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <main className="px-6 py-4 flex-1 overflow-y-auto">
            {activeTab === 'dex' && <DexScreener />}
            {activeTab === 'pump' && <PumpLive />}
            {activeTab === 'surge' && <Surge />}
            {(activeTab === 'top' || activeTab === 'trending') && <TopTrending type={activeTab} />}
          </main>
        </div>
      </div>

      {/* Bottom Status Bar */}
      <footer className="bg-gray-950 border-t border-gray-800 px-6 py-2">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-blue-400">
              <span>☰ PRESET 3</span>
            </div>
            <div className="flex items-center gap-2">
              <span>📁 1 = 0 ∨</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🎯</span>
              <span>🗘 Wallet</span>
            </div>
            <div className="flex items-center gap-2">
              <span>𝕏 Twitter</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🔍 Discover</span>
            </div>
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setPulseOpen(true)}>
              <span>⚡ Pulse</span>
            </div>
            <div className="flex items-center gap-2">
              <span>📊 PnL</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-orange-500">🎨 $875K</span>
              <span className="text-cyan-400">💎 $2.96B</span>
              <span className="text-green-400">💲 $124.12</span>
              <span className="text-yellow-400">💰 $51K</span>
              <span className="text-gray-500">📊 0.0:24</span>
              <span className="text-gray-500">⏱ 0.0:03</span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-gray-500">
            <div className="flex items-center gap-2 text-green-400">
              <span>● Connection is stable</span>
            </div>
            <div className="flex items-center gap-2">
              <span>ASIA ∨</span>
            </div>
            <span>📱</span>
            <span>🔔</span>
            <span>❓</span>
            <span>💬</span>
            <span>𝕏</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

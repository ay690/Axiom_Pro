'use client';
import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveTab, setTimeFilter, toggleShowHidden } from '@/lib/redux/slices/appSlice';
import { Button } from '@/components/ui/button';
import DexScreener from '@/components/views/DexScreener';
import PumpLive from '@/components/views/PumpLive';
import TopStreams from '@/components/views/TopStreams';
import Surge from '@/components/views/Surge';
import TopTrending from '@/components/views/TopTrending';
import ExchangeDepositModal from '@/components/modals/ExchangeDepositModal';
import { useWebSocket } from '@/lib/hooks/useWebSocket';
import { Search, Star, Bell, Wallet, ChevronDown, Filter, Bookmark, EyeIcon, EyeOffIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { RootState } from '@/types';
import WalletDropdown from '@/components/views/WalletDropdown';
import PulseSidebar from '@/components/views/PulseSidebar';
import FilterControls from '@/components/views/FilterControls';
import FilterModal from '@/components/views/FilterModal';
import WalletModal from '@/components/modals/WalletModal';

export default function Home() {
  const dispatch = useDispatch();
  const { activeTab, timeFilter, showHidden } = useSelector((state: RootState) => state.app);
  const [depositOpen, setDepositOpen] = useState(false);
  const [pulseOpen, setPulseOpen] = useState(false);
  const [filterModal, setFilterModal] = useState(false);
  const [walletOpen, setWalletOpen] = useState(false);
  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const [pumpLiveView, setPumpLiveView] = useState('live-tracker');
  const [isPumpDropdownOpen, setIsPumpDropdownOpen] = useState(false);
  const navContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState('Discover');

  useWebSocket();

  const tabs = [
    { id: 'top', label: 'Top' },
    { id: 'trending', label: 'Trending' },
    { id: 'surge', label: 'Surge' },
    { id: 'dex', label: 'DEX Screener' },
    { id: 'pump', label: 'Pump Live' },
  ];

  const timeFilters = ['5m', '1h', '6h', '24h'];

  const navItems = [
    { label: 'Discover', href: '#' },
    { label: 'Pulse', href: '#' },
    { label: 'Trackers', href: '#' },
    { label: 'Perpetuals', href: '#' },
    { label: 'Yield', href: '#' },
    { label: 'Vision', href: '#' },
    { label: 'Portfolio', href: '#' },
    { label: 'Rewards', href: '#' },
  ];

  const handleNavScroll = () => {
    const container = navContainerRef.current;
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setCanScrollPrev(scrollLeft > 0);
      setCanScrollNext(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    const container = navContainerRef.current;
    if (container) {
      handleNavScroll();
      container.addEventListener('scroll', handleNavScroll);
      window.addEventListener('resize', handleNavScroll);

      return () => {
        container.removeEventListener('scroll', handleNavScroll);
        window.removeEventListener('resize', handleNavScroll);
      };
    }
  }, [navItems]);

  const scrollNav = (direction: 'prev' | 'next') => {
    const container = navContainerRef.current;
    if (container) {
      const scrollAmount = direction === 'prev' ? -200 : 200;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handlePumpTabClick = () => {
    dispatch(setActiveTab('pump'));
    setIsPumpDropdownOpen(!isPumpDropdownOpen);
  };

  const handleToggleShowHidden = () => {
    dispatch(toggleShowHidden());
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <ExchangeDepositModal open={depositOpen} onOpenChange={setDepositOpen} />
      <header className="border-b border-gray-800 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-white" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}></div>
              <span className="text-xl font-bold">AXIOM</span>
              <span className="text-sm text-gray-400">Pro</span>
            </div>
            <nav className="flex items-center gap-2 max-w-lg">
              {canScrollPrev && (
                <button onClick={() => scrollNav('prev')} className="p-1 rounded-full bg-gray-800/50 hover:bg-gray-700/80 transition-colors">
                  <ChevronLeft className="w-4 h-4 text-gray-300" />
                </button>
              )}
              <div ref={navContainerRef} className="flex items-center gap-6 overflow-x-auto no-scrollbar whitespace-nowrap">
                {navItems.map((item) => (
                  <span
                    key={item.label}
                    onClick={() => setActiveNavItem(item.label)}
                    className={`text-sm cursor-pointer flex-shrink-0 ${
                      activeNavItem === item.label
                        ? 'text-blue-400'
                        : 'text-gray-400 hover:text-gray-300'
                    }`}>
                    {item.label}
                  </span>
                ))}
              </div>
              {canScrollNext && (
                <button onClick={() => scrollNav('next')} className="p-1 rounded-full bg-gray-800/50 hover:bg-gray-700/80 transition-colors">
                  <ChevronRight className="w-4 h-4 text-gray-300" />
                </button>
              )}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search by token or CA..."
                className="bg-gray-900 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-sm w-64 focus:outline-none focus:border-gray-600"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">/</span>
            </div>
            <Button variant="ghost" className="bg-gray-900 border border-gray-700 text-sm gap-2">
              <span className="text-blue-400">≡</span>
              <span>SOL</span>
              <ChevronDown className="w-4 h-4" />
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-black font-bold px-6 rounded-full"
              onClick={() => setDepositOpen(true)}
            >
              Deposit
            </Button>
            <button className="p-2 hover:bg-gray-800 rounded-lg">
              <Star className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-gray-800 rounded-lg">
              <Bell className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 cursor-pointer" onClick={() => setWalletOpen((prev) => !prev)}>
              <Wallet className="w-4 h-4" />
              <span className="text-sm">= 0</span>
              <ChevronDown className="w-4 h-4" />

              {walletOpen && (
                <div className="absolute right-0 mt-2 z-50">
                  <WalletDropdown />
                </div>
              )}

            </div>
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
          <div className="px-6 py-4 flex items-center justify-between border-b border-gray-800">
            <div className="flex items-center gap-6">
              {tabs.map((tab) => (
                <div key={tab.id} className="relative">
                  <button
                    onClick={() => tab.id === 'pump' ? handlePumpTabClick() : dispatch(setActiveTab(tab.id))}
                    className={`text-lg font-medium transition-colors cursor-pointer ${activeTab === tab.id
                      ? 'text-white'
                      : 'text-gray-500 hover:text-gray-300'
                      } ${tab.id === 'dex' && activeTab === 'dex' ? 'underline underline-offset-8 decoration-2' : ''}`}
                  >
                    {tab.label}
                    {tab.id === 'pump' && (
                      <ChevronDown className={`inline w-4 h-4 ml-1 transition-transform ${isPumpDropdownOpen ? 'rotate-180' : ''}`} />
                    )}
                  </button>
                  {tab.id === 'pump' && activeTab === 'pump' && isPumpDropdownOpen && (
                    <div className="absolute top-full mt-2 w-56 bg-gray-800 rounded-md shadow-lg z-10">

                      <button
                        onClick={() => {
                          setPumpLiveView('live-tracker');
                          setIsPumpDropdownOpen(false);
                        }}
                        className="block w-full cursor-pointer text-left px-4 py-3 text-sm text-gray-300 hover:bg-gray-700"
                      >
                        <p className="font-medium text-white">Live Tracker</p>
                        <p className="text-xs text-gray-400">
                          New Streams and Top Streams
                        </p>
                      </button>

                      <button
                        onClick={() => {
                          setPumpLiveView('top-streams');
                          setIsPumpDropdownOpen(false);
                        }}
                        className="block w-full cursor-pointer text-left px-4 py-3 text-sm text-gray-300 hover:bg-gray-700"
                      >
                        <p className="font-medium text-white">Top Streams</p>
                        <p className="text-xs text-gray-400">
                          Highest Market Cap Streams
                        </p>
                      </button>

                    </div>
                  )}

                </div>
              ))}
            </div>

            <div className="flex items-center gap-3">
              {activeTab === 'pump' && pumpLiveView === 'top-streams' && (
                <>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400">MC</span>
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400">Time</span>
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="text"
                      placeholder="Search tokens..."
                      className="bg-gray-900 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-sm w-64 focus:outline-none focus:border-gray-600"
                    />
                  </div>
                </>
              )}

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
              {activeTab === 'surge' ? (
                <FilterControls />
              ) : (
                <>
                  <Button
                    variant="ghost"
                    className="bg-gray-900 border border-gray-700 text-sm gap-2 cursor-pointer"
                    onClick={() => setFilterModal((prev) => !prev)}
                  >
                    <Filter className="w-4 h-4" />
                    <span>Filter</span>
                    <ChevronDown className="w-4 h-4" />
                  </Button>

                  {filterModal && (
                    <div>
                      <FilterModal onClose={() => setFilterModal(false)} />
                    </div>
                  )}
                </>
              )}
              {activeTab === 'surge' ? (
                <div></div>
              ) : (
                <button className="p-2 hover:bg-gray-800 rounded-lg">
                  <Bookmark className="w-4 h-4" />
                </button>
              )}
              <button onClick={handleToggleShowHidden} className="p-2 hover:bg-gray-800 rounded-lg">
                {showHidden ? <EyeOffIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
              </button>
              <div className="relative">
                <div className="flex items-center gap-2 bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 cursor-pointer" onClick={() => setWalletModalOpen(prev => !prev)}>
                  <span className="text-xs">📁</span>
                  <span className="text-sm">1</span>
                  <span className="text-blue-400">=</span>
                  <span className="text-sm">0</span>
                  <ChevronDown className="w-4 h-4" />
                </div>
                {walletModalOpen && <WalletModal />}
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-500">Quick Buy</span>
                <span className="text-gray-400">0.0</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-400 text-sm">≡</span>
                <span className="text-sm">P1</span>
                <span className="text-sm">P2</span>
                <span className="text-sm text-blue-400">P3</span>
              </div>
            </div>
          </div>

          <main className="px-6 py-4 flex-1 overflow-y-auto">
            {activeTab === 'dex' && <DexScreener />}
            {activeTab === 'pump' && pumpLiveView === 'live-tracker' && <PumpLive />}
            {activeTab === 'pump' && pumpLiveView === 'top-streams' && <TopStreams />}
            {activeTab === 'surge' && <Surge />}
            {(activeTab === 'top' || activeTab === 'trending') && <TopTrending type={activeTab} />}
          </main>
        </div>
      </div>

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

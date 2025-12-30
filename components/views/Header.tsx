'use client';
import { useState, useRef, useEffect } from 'react';
import { Search, Wallet, ChevronDown, Bell, Star } from 'lucide-react';
import { SolanaMark } from '@/components/marks/SolanaMark';
import WalletDropdown from '@/components/views/WalletDropdown';

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="flex items-center justify-between p-4 bg-gray-900 border-b border-gray-800">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2L2 7L12 12L22 7L12 2Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 17L12 22L22 17"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 12L12 17L22 12"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-lg font-bold">AXIOM</span>
        </div>
        <nav className="flex items-center gap-6 text-sm text-gray-400">
          <a href="#" className="hover:text-white">
            Pro
          </a>
          <a href="#" className="text-white">
            Discover
          </a>
          <a href="#" className="hover:text-white">
            Pulse
          </a>
          <a href="#" className="hover:text-white">
            Trackers
          </a>
          <a href="#" className="hover:text-white">
            Perpetuals
          </a>
          <a href="#" className="hover:text-white">
            Yield
          </a>
          <a href="#" className="hover:text-white">
            Vision
          </a>
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by token or CA..."
            className="bg-gray-800 border border-gray-700 rounded-lg pl-9 pr-4 py-2 text-sm w-64"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">/</span>
        </div>
        <div className="flex items-center gap-2 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2">
          <SolanaMark className="w-4 h-4" />
          <span className="text-sm">SOL</span>
          <ChevronDown className="w-4 h-4" />
        </div>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-semibold">
          Deposit
        </button>
        <div className="flex items-center gap-4 text-gray-400">
          <Star className="w-5 h-5" />
          <Bell className="w-5 h-5" />
          <div className="relative" ref={dropdownRef}>
            <div
              className="flex items-center gap-2 bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 cursor-pointer"
              onClick={toggleDropdown}
            >
              <Wallet className="w-4 h-4" />
              <span className="text-sm">= 0</span>
              <ChevronDown className="w-4 h-4" />
            </div>
            {isDropdownOpen && <WalletDropdown />}
          </div>
        </div>
        <div className="w-8 h-8 bg-gray-800 rounded-full"></div>
      </div>
    </header>
  );
}

'use client';

import { useState } from 'react';
import FinalStretch from './FinalStretch';
import NewPairs from './NewPairs';
import Migrated from './Migrated';
import { X, ExternalLink, List } from 'lucide-react';

interface PulseSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const PulseSidebar: React.FC<PulseSidebarProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('new-pairs');

  if (!isOpen) return null;

  return (
    <div className="w-[550px] bg-gray-950/90 backdrop-blur-sm border-r border-gray-800 shadow-2xl shadow-black flex flex-col">
      <header className="flex items-center justify-between p-3 border-b border-gray-800">
        <div className="flex items-center gap-2 text-sm">
          <button
            onClick={() => setActiveTab('new-pairs')}
            className={`px-3 py-1 rounded transition-colors ${activeTab === 'new-pairs' ? 'bg-gray-700 text-white' : 'text-gray-500 hover:text-gray-300'}`}
          >
            New Pairs
          </button>
          <button
            onClick={() => setActiveTab('final-stretch')}
            className={`px-3 py-1 rounded transition-colors font-semibold ${activeTab === 'final-stretch' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-gray-300'}`}
          >
            Final Stretch
          </button>
          <button
            onClick={() => setActiveTab('migrated')}
            className={`px-3 py-1 rounded transition-colors ${activeTab === 'migrated' ? 'bg-gray-700 text-white' : 'text-gray-500 hover:text-gray-300'}`}
          >
            Migrated
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 text-gray-400 hover:bg-gray-800 rounded-lg">
            <List className="w-4 h-4" />
          </button>
          <button className="p-2 text-gray-400 hover:bg-gray-800 rounded-lg">
            <ExternalLink className="w-4 h-4" />
          </button>
          <button onClick={onClose} className="p-2 text-gray-400 hover:bg-gray-800 rounded-lg">
            <X className="w-4 h-4" />
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto no-scrollbar">
        {activeTab === 'new-pairs' && <NewPairs />}
        {activeTab === 'final-stretch' && <FinalStretch />}
        {activeTab === 'migrated' && <Migrated />}
      </div>
    </div>
  );
};

export default PulseSidebar;
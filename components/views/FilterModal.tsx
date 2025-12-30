import { Check, ChevronDown, RefreshCcw, X } from 'lucide-react';

const protocols = [
  { name: 'Pump', color: '#4CAF50' },
  { name: 'Mayhem', color: '#F44336' },
  { name: 'Bonk', color: '#FF9800' },
  { name: 'Bags', color: '#4CAF50' },
  { name: 'Moonshot', color: '#9C27B0' },
  { name: 'Heaven', color: '#607D8B' },
  { name: 'Daos.fun', color: '#4CAF50' },
  { name: 'Candle', color: '#F44336' },
  { name: 'Sugar', color: '#E91E63' },
  { name: 'Believe', color: '#4CAF50' },
  { name: 'Jupiter Studio', color: '#FF9800' },
  { name: 'Moonit', color: '#CDDC39' },
  { name: 'Boop', color: '#4CAF50' },
  { name: 'LaunchLab', color: '#00BCD4' },
  { name: 'Dynamic BC', color: '#F44336' },
  { name: 'Raydium', color: '#009688' },
  { name: 'Meteora AMM', color: '#F44336' },
  { name: 'Meteora AMM V2', color: '#F44336' },
  { name: 'Pump AMM', color: '#607D8B' },
  { name: 'Orca', color: '#FFC107' },
  { name: 'Wavebreak', color: '#FFC107' },
];

export default function FilterModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-start pt-20">
      <div className="bg-[#18181B] rounded-2xl border border-gray-700/50 w-[500px] text-white shadow-lg">
        <div className="p-4 border-b border-gray-700/50 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Filters</h2>
          <div className="flex items-center gap-2">
            <button className="p-1.5 hover:bg-gray-700 rounded-md">
              <RefreshCcw className="w-5 h-5 text-gray-400" />
            </button>
            <button onClick={onClose} className="p-1.5 hover:bg-gray-700 rounded-md">
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-semibold text-gray-400">Protocols</h3>
              <button className="text-sm text-blue-500 hover:underline">Unselect All</button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {protocols.map((protocol) => (
                <button
                  key={protocol.name}
                  className="px-3 py-1.5 text-sm rounded-full flex items-center justify-center gap-2 border border-gray-700/50"
                  style={{ backgroundColor: `${protocol.color}20`, borderColor: protocol.color }}
                >
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: protocol.color }}></span>
                  {protocol.name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-gray-400 mb-2 block">Search Keywords</label>
              <input type="text" placeholder="keyword1, keyword2..." className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-sm" />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-400 mb-2 block">Exclude Keywords</label>
              <input type="text" placeholder="keyword1, keyword2..." className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-sm" />
            </div>
          </div>

          <div>
            <div className="flex border-b border-gray-700/50 text-sm">
              <button className="py-2 px-4 text-white border-b-2 border-white font-semibold">Audit</button>
              <button className="py-2 px-4 text-gray-400 hover:text-white">Metrics</button>
            </div>
            <div className="pt-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <div className="w-4 h-4 rounded border-2 border-gray-600 flex items-center justify-center bg-gray-900">
                  {/* Checkbox state would go here */}
                </div>
                <span className="text-sm">Dex Paid</span>
              </label>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 items-end">
            <div>
              <label className="text-sm font-semibold text-gray-400 mb-2 block">Age</label>
              <div className="flex gap-2">
                <input type="text" placeholder="Min" className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-sm" />
                <button className="bg-gray-800 border border-gray-700 rounded-lg px-2.5 flex items-center">
                  m <ChevronDown className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
            <div className="flex gap-2">
              <input type="text" placeholder="Max" className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-sm" />
               <button className="bg-gray-800 border border-gray-700 rounded-lg px-2.5 flex items-center">
                  m <ChevronDown className="w-4 h-4 ml-1" />
                </button>
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-400 mb-2 block">Top 10 Holders %</label>
            <div className="grid grid-cols-2 gap-4">
                 <input type="text" placeholder="Min" className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-sm" />
                 <input type="text" placeholder="Max" className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-sm" />
            </div>
          </div>
        </div>

        <div className="p-4 bg-[#202023] border-t border-gray-700/50 flex justify-between items-center rounded-b-2xl">
          <div>
            <button className="text-sm font-semibold px-4 py-2 rounded-lg hover:bg-gray-700">Import</button>
            <button className="text-sm font-semibold px-4 py-2 rounded-lg hover:bg-gray-700">Export</button>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg text-sm">Apply All</button>
        </div>
      </div>
    </div>
  );
}

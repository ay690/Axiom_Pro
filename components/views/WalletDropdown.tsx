import { ArrowRightLeft } from 'lucide-react';
import { SolanaMark } from '@/components/marks/SolanaMark';
import { CopyIcon } from 'lucide-react';

export default function WalletDropdown() {
  return (
    <div className="absolute top-full right-0 mt-2 w-[320px] rounded-xl bg-[#18181B] border border-gray-700/50 p-4 text-white shadow-lg z-50">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-400">Total Value</span>
        <div className="flex gap-1  p-1 rounded-lg">
          <button className="flex items-center gap-1 text-sm bg-zinc-700 rounded-md px-3 py-1">
            <CopyIcon className="w-3.5 h-3.5 text-gray-300" />
            Solana
          </button>

          <button className="flex items-center gap-1 text-sm text-gray-400 px-3 py-1 hover:text-white">
            <CopyIcon className="w-3.5 h-3.5" />
            Perps
          </button>
        </div>
      </div>
      <div className="text-3xl font-bold mb-4">$0</div>

      <div className="flex items-center justify-between bg-zinc-900/50 p-3 rounded-lg mb-4">
        <div className="flex items-center gap-2">
          <SolanaMark className="w-5 h-5" />
          <span className="font-semibold text-sm">0</span>
        </div>
        <ArrowRightLeft className="w-5 h-5 text-gray-400" />
        <div className="flex items-center gap-2">
          <SolanaMark className="w-5 h-5" />
          <span className="font-semibold text-sm">0</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg text-sm">
          Deposit
        </button>
        <button className="bg-zinc-800 hover:bg-zinc-700 text-white font-semibold py-2 px-4 rounded-lg text-sm">
          Withdraw
        </button>
      </div>
    </div>
  );
}

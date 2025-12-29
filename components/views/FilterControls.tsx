'use client';

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/types';
import { setSurgeFilters } from '@/lib/redux/slices/surgeSlice';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function FilterControls() {
  const dispatch = useDispatch();
  const { marketCap } = useSelector((state: RootState) => state.surge.filters);
  const [mcValue, setMcValue] = useState(marketCap.max);

  const maxMc = 100000;

  useEffect(() => {
    setMcValue(marketCap.max);
  }, [marketCap.max]);

  const handleMcChange = (increment: boolean) => {
    const step = 10000;
    const newValue = increment
      ? Math.min(mcValue + step, maxMc)
      : Math.max(mcValue - step, 0);
    setMcValue(newValue);
    dispatch(setSurgeFilters({ marketCap: { min: 0, max: newValue } }));
  };

  const formatMcValue = (value: number) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${Math.round(value / 1000)}K`;
    return value.toString();
  };

  const progressPercentage = (mcValue / maxMc) * 100;

  const buttonStyle = {
    background: `linear-gradient(to right, #2563EB ${progressPercentage}%, #111827 ${progressPercentage}%)`,
    transition: 'background 0.3s ease-in-out',
  };

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => handleMcChange(false)}
        className="px-4 py-2 bg-gray-900 hover:bg-gray-800 rounded-lg text-sm border border-gray-700"
      >
        −
      </button>
      <div
        className="relative w-32 h-10 border border-gray-700 rounded-lg flex items-center justify-center"
        style={buttonStyle}
      >
        <span className="relative z-10 font-medium text-white">
          {formatMcValue(mcValue)}
        </span>
      </div>
      <button
        onClick={() => handleMcChange(true)}
        className="px-4 py-2 bg-gray-900 hover:bg-gray-800 rounded-lg text-sm border border-gray-700"
      >
        +
      </button>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button className="w-10 h-10 bg-gray-900 hover:bg-gray-800 rounded-lg border border-gray-700 flex items-center justify-center">
              ⓘ
            </button>
          </TooltipTrigger>
          <TooltipContent className="text-center">
            <p>
              Surge alerts are algorithmic calls.
              <br />
              Use at your own risk.
            </p>
          </TooltipContent>

        </Tooltip>
      </TooltipProvider>
    </div>
  );
}

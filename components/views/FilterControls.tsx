'use client';

import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@/components/ui/button';
import { Filter, ChevronDown } from 'lucide-react';
import { RootState } from '@/types';
import { setSurgeFilters } from '@/lib/redux/slices/surgeSlice';

export default function FilterControls() {
  const dispatch = useDispatch();
  const { filters } = useSelector((state: RootState) => state.surge);

  const handleFilterChange = (filterName: string, value: number) => {
    // Dispatch action to update filters in Redux store
  };

  return (
    <div className="flex items-center gap-4">
        <button className="px-4 py-2 bg-gray-900 hover:bg-gray-800 rounded-lg text-sm border border-gray-700">
          −
        </button>
        <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium ">
          5OK
        </button>
        <button className="px-4 py-2 bg-gray-900 hover:bg-gray-800 rounded-lg text-sm border border-gray-700">
          +
        </button>
        <button className="w-10 h-10 bg-gray-900 hover:bg-gray-800 rounded-lg border border-gray-700 flex items-center justify-center">
          ⓘ
        </button>
      </div>
  );
}

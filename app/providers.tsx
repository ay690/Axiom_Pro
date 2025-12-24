'use client';

import { Provider } from 'react-redux';
import { store } from '@/lib/redux/store';
import { ProvidersProps } from '@/types';

export function Providers({ children }: ProvidersProps) {
  return <Provider store={store}>{children}</Provider>;
}
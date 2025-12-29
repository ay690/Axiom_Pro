// Application-wide type definitions

export interface AppState {
  activeTab: string;
  timeFilter: string;
}

export interface PumpToken {
    id: string;
    image: string;
    name: string;
    symbol: string;
    age: number;
    badges: string[];
    marketCap: number;
}

export interface PumpState {
    newStreams: PumpToken[];
    topStreamTokens: PumpToken[];
}

export interface TokenState {
  dexTokens: Token[];
  topTokens: Token[];
  trendingTokens: Token[];
  priceChanges: Record<string, PriceChange>;
}

export interface PriceChange {
  direction: 'up' | 'down';
  amount: number;
  timestamp: number;
}

export interface Token {
  id: string;
  name: string;
  symbol: string;
  image: string;
  age?: number;
  badges: string[];
  marketCap: number;
  liquidity: number;
  volume: number;
  txns: number;
  txnsBuy?: number;
  txnsSell?: number;
  change: number;
  chartData: number[];
  auditMetrics: AuditMetrics;
}

export interface AuditMetrics {
  audit1: AuditValue;
  audit2: AuditValue;
  paid: boolean;
}

export interface AuditValue {
  value: number;
  color: 'red' | 'green';
}

export interface TabItem {
  id: string;
  label: string;
}

export type ViewType = 'dex' | 'surge' | 'pump' | 'top' | 'trending';

export type TimeFilter = '5m' | '1h' | '6h' | '24h';

export interface SparklineChartProps {
  data: number[];
  change: number;
}

export interface TokenRowProps {
  token: Token;
  view: ViewType;
}

export interface ProvidersProps {
  children: React.ReactNode;
}

export interface RootState {
  app: AppState;
  tokens: TokenState;
  pump: PumpState;
}

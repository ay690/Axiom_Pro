export function generateMockTokens(type = 'dex') {
  const tokenNames = [
    { name: 'Burnv2', symbol: 'Burning Till...', image: '🔥' },
    { name: 'snowball', symbol: 'snowball', image: '❄️' },
    { name: 'USEFUL', symbol: 'Useful coin', image: '🔰' },
    { name: 'NOBODY', symbol: 'Nobody Sa...', image: '👥' },
    { name: 'domino', symbol: 'domino', image: '🎲' },
    { name: 'PUMPv2', symbol: 'Pumpfun v2', image: '🚀' },
  ];

  return tokenNames.map((token, index) => ({
    id: index + 1,
    name: token.name,
    symbol: token.symbol,
    image: token.image,
    marketCap: Math.floor(Math.random() * 10000000) + 10000,
    change: (Math.random() - 0.5) * 100,
    liquidity: Math.floor(Math.random() * 1000000) + 10000,
    volume: Math.floor(Math.random() * 500000) + 1000,
    txns: Math.floor(Math.random() * 1000) + 1,
    txnsBuy: Math.floor(Math.random() * 500),
    txnsSell: Math.floor(Math.random() * 500),
    chartData: generateSparklineData(),
    badges: generateBadges(),
    auditMetrics: generateAuditMetrics(),
  }));
}

export function generateMockPumpTokens(type = 'new') {
  const newTokens = [
    { name: 'Salesman', symbol: 'Salesma...', image: '👔', mc: 21600 },
    { name: '$CATM', symbol: 'Millionaire Cat', image: '💎', mc: 3970 },
    { name: 'Stone', symbol: 'Stone in the...', image: '🪨', mc: 3500 },
    { name: 'CYCLE', symbol: 'FULL CYCLE', image: '🔄', mc: 3490 },
    { name: 'AVA', symbol: 'Ava AI', image: '🤖', mc: 3660 },
  ];

  const topTokens = [
    { name: 'GBACK', symbol: 'GIVEBACK', image: '🏖️', mc: 105000 },
    { name: 'Groyper', symbol: 'Groyper', image: '🐸', mc: 117000 },
    { name: 'Stormball', symbol: 'Stormball', image: '⚡', mc: 6840 },
    { name: 'FIREBALL', symbol: 'Fireball', image: '🔥', mc: 493000 },
    { name: 'FTP', symbol: 'Feed The People', image: '📋', mc: 372000 },
  ];

  const tokens = type === 'new' ? newTokens : topTokens;

  return tokens.map((token, index) => ({
    id: index + 1,
    name: token.name,
    symbol: token.symbol,
    image: token.image,
    marketCap: token.mc,
    age: Math.floor(Math.random() * 60) + 1,
    badges: generateBadges(),
  }));
}

export function generateMockSurgeTokens(type = 'early') {
  const earlyTokens = [
    { name: 'Bubble', symbol: 'Bubble', image: '💫', mc: 7350, ath: 989000, change: -51.9 },
    { name: 'GOOBY', symbol: 'GOOBY', image: '🎭', mc: 7190, ath: 22900, change: -42.4 },
    { name: 'BBI', symbol: 'Blockbuster', image: '🎬', mc: 7200, ath: 14700, change: 79.29 },
  ];

  const surgingTokens = [
    { name: 'REINVEST', symbol: 'Reindeer In Vest', image: '🦌', mc: 51500, ath: 64400, change: -1.69 },
    { name: 'FLUSH', symbol: 'FLUSH', image: '🌊', mc: 117000, ath: 173000, change: 31.17 },
    { name: 'Quesadilla', symbol: 'Quesadilla', image: '🌮', mc: 92300, ath: 114000, change: 2.081 },
  ];

  const tokens = type === 'early' ? earlyTokens : surgingTokens;

  return tokens.map((token, index) => ({
    id: index + 1,
    name: token.name,
    symbol: token.symbol,
    image: token.image,
    marketCap: token.mc,
    ath: token.ath,
    change: token.change,
    progress: Math.abs(token.change),
    age: Math.floor(Math.random() * 60) + 1,
    volume: Math.floor(Math.random() * 100000) + 1000,
    liquidity: Math.floor(Math.random() * 50000) + 1000,
    badges: generateBadges(),
    metrics: generateMetrics(),
  }));
}

function generateSparklineData() {
  const points = 20;
  const data = [];
  let value = Math.random() * 100 + 50;
  
  for (let i = 0; i < points; i++) {
    value += (Math.random() - 0.5) * 20;
    value = Math.max(10, Math.min(200, value));
    data.push(value);
  }
  
  return data;
}

function generateBadges() {
  const allBadges = ['🕐', '⭐', '🔒', '💧', '🎯', '📱', '160'];
  const count = Math.floor(Math.random() * 4) + 2;
  return allBadges.slice(0, count);
}

function generateAuditMetrics() {
  return {
    audit1: { value: Math.random() * 30 - 15, color: Math.random() > 0.5 ? 'red' : 'green' },
    audit2: { value: Math.random() * 10, color: 'green' },
    paid: Math.random() > 0.3,
  };
}

function generateMetrics() {
  return {
    v: Math.floor(Math.random() * 10000) + 1000,
    l: Math.floor(Math.random() * 20000) + 5000,
    holders: Math.floor(Math.random() * 500) + 50,
    percentages: [
      { value: Math.floor(Math.random() * 30), color: 'red' },
      { value: Math.floor(Math.random() * 10), color: 'green' },
      { value: Math.floor(Math.random() * 5), color: 'yellow' },
    ],
  };
}

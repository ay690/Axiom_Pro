'use client';
import FinalStretchTokenRow, { Token } from '../tokens/FinalStretchTokenRow';
import { Shuffle, List } from 'lucide-react';

const FinalStretch = () => {
  const tokens: Token[] = [
    {
        id: '1',
        image: '神秘的东方力量',
        name: '东方力量',
        symbol: '神秘的东方力量',
        description: 'Eastern Power Mysterious Eastern Power',
        age: '12h',
        volume: 165000,
        marketCap: 18000,
        transactions: 2860,
        icons: ['flame', 'globe', 'hand', 'search'],
        stats: [{type: 'danger', value: '21%'}, {type: 'info', value: 'DS'}, {type: 'success', value: '1%'}],
        bnb: 0,
        creator: '0x2c...4444',
        userIcons: ['user', 'trophy', 'crown'],
        userStats: [201, 3, '1/117'],
        progress: { green: 95, red: 5 }
    },
    {
        id: '2',
        image: '九阳豆浆',
        name: '我嘞个豆',
        symbol: '九阳豆浆新品',
        description: 'Oh my god. Joyoung Soy Milk New Product',
        age: '4h',
        volume: 89000,
        marketCap: 14000,
        transactions: 1382,
        icons: ['flame', 'globe', 'hand', 'search'],
        stats: [{type: 'danger', value: '17%'}, {type: 'info', value: 'DS'}, {type: 'success', value: '0%'}],
        bnb: 0,
        creator: '0xb7...4444',
        userIcons: ['user', 'trophy', 'crown'],
        userStats: [98, 1, '1/129'],
        progress: { green: 80, red: 20 }
    },
    {
        id: '3',
        image: '懒惰虫',
        name: '懒惰虫',
        symbol: '懒惰虫',
        description: 'Lazy bug Lazy bug',
        age: '4h',
        volume: 123000,
        marketCap: 13000,
        transactions: 1727,
        icons: ['flame', 'globe', 'hand', 'search'],
        stats: [{type: 'danger', value: '21%'}, {type: 'info', value: 'DS'}, {type: 'success', value: '8%'}],
        bnb: 0,
        creator: '0x0f...4444',
        userIcons: ['user', 'trophy', 'crown'],
        userStats: [69, 2, '3/234'],
        progress: { green: 70, red: 30 }
    },
    {
        id: '4',
        image: '赤馬年',
        name: '赤馬年',
        symbol: '赤馬年',
        description: 'Red Horse Year Red Horse Year',
        age: '6h',
        volume: 20000,
        marketCap: 12000,
        transactions: 498,
        icons: ['flame', 'globe', 'hand', 'search'],
        stats: [{type: 'danger', value: '27%'}, {type: 'info', value: '3%'}, {type: 'success', value: '4%'}],
        bnb: 0,
        creator: '0xb2...4444',
        userIcons: ['user', 'trophy', 'crown'],
        userStats: [50, 0, '0/1'],
        progress: { green: 60, red: 40 }
    },
    {
        id: '5',
        image: 'beefcoin',
        name: 'Beefcoin',
        symbol: 'Beefcoin',
        description: '',
        age: '19h',
        volume: 12000,
        marketCap: 9000,
        transactions: 230,
        icons: ['user', 'globe', 'send','hand', 'search'],
        stats: [],
        bnb: 0,
        creator: '',
        userIcons: ['user', 'trophy', 'crown'],
        userStats: [34, 0, '0/2'],
        progress: { green: 50, red: 50 }
    }
  ];

  return (
    <div className="text-white">
      <div className="px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs">
          <button className="p-2 bg-gray-800 rounded-md">⚡ 0</button>
          <button className="px-3 py-1 bg-yellow-500 text-black rounded-md">P1</button>
          <button className="px-3 py-1 bg-gray-800 rounded-md">P2</button>
          <button className="px-3 py-1 bg-gray-800 rounded-md">P3</button>
        </div>
        <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-800 rounded-lg">
                <Shuffle className="w-4 h-4" />
            </button>
             <button className="p-2 hover:bg-gray-800 rounded-lg">
                <List className="w-4 h-4" />
            </button>
        </div>
      </div>
      <div className="space-y-2 p-4">
        {tokens.map(token => (
          <FinalStretchTokenRow key={token.id} token={token} />
        ))}
      </div>
    </div>
  );
};

export default FinalStretch;
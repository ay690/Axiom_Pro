'use client';
import NewPairsTokenRow, { Token } from '../tokens/NewPairsTokenRow';
import { Shuffle, List } from 'lucide-react';

const NewPairs = () => {
  const tokens: Token[] = [
    {
        id: '1',
        image: 'cache',
        name: 'cache',
        symbol: 'is king',
        description: '',
        age: '25s',
        volume: 0,
        marketCap: 13000,
        transactions: 0,
        icons: ['diamond', 'search'],
        stats: [{type: 'success', value: '0%'}, {type: 'info', value: '0%'}, {type: 'warning', value: '2mo'}, {type: 'success', value: '0%'}],
        bnb: 0,
        creator: '0x44...48dc',
        userIcons: ['user', 'trophy', 'crown'],
        userStats: [0, 0, '0/993'],
        progress: { green: 0, red: 100 }
    },
    {
        id: '2',
        image: 'Wabooe',
        name: 'Wabooe',
        symbol: 'Wabooe',
        description: '',
        age: '36s',
        volume: 2000,
        marketCap: 5000,
        transactions: 14,
        icons: ['instagram', 'hand', 'search'],
        stats: [{type: 'success', value: '3%'}, {type: 'info', value: 'DS'}, {type: 'danger', value: '6%'}],
        bnb: 0,
        creator: '0xeb...4444',
        userIcons: ['user', 'trophy', 'crown'],
        userStats: [1, 0, '0/34'],
        progress: { green: 28, red: 72 }
    },
    {
        id: '3',
        image: '小皮',
        name: '小皮',
        symbol: '震撼首发,全网训人第一狗',
        description: 'Little Pi Shocking debut! The first dog on...',
        age: '1m',
        volume: 1000,
        marketCap: 5000,
        transactions: 13,
        icons: ['leaf', 'globe', 'hand', 'search'],
        stats: [{type: 'success', value: '1%'}, {type: 'info', value: 'DS'}, {type: 'success', value: '0%'}],
        bnb: 0,
        creator: '0x92...4444',
        userIcons: ['user', 'trophy', 'crown'],
        userStats: [1, 0, '0/35'],
        progress: { green: 20, red: 80 }
    },
    {
        id: '4',
        image: '消费陷阱',
        name: '消费陷阱',
        symbol: '微博热搜第5“爱你老己消费陷阱”',
        description: 'Consumer traps The fifth trending topic on Weib...',
        age: '1m',
        volume: 3000,
        marketCap: 5000,
        transactions: 24,
        icons: ['leaf', 'globe', 'hand', 'search'],
        stats: [{type: 'success', value: '0%'}, {type: 'info', value: 'DS'}, {type: 'danger', value: '16%'}],
        bnb: 0,
        creator: '0x7e...4444',
        userIcons: ['user', 'trophy', 'crown'],
        userStats: [0, 0, '0/155'],
        progress: { green: 37, red: 63 }
    },
    {
        id: '5',
        image: '白银',
        name: '白银',
        symbol: '贵金属白银',
        description: 'silver precious metal silver',
        age: '2m',
        volume: 1000,
        marketCap: 5000,
        transactions: 32,
        icons: ['globe', 'hand', 'search'],
        stats: [{type: 'success', value: '2%'}, {type: 'info', value: 'DS'}, {type: 'success', value: '1%'}],
        bnb: 0,
        creator: '',
        userIcons: ['user', 'trophy', 'crown'],
        userStats: [2, 0, '0/2'],
        progress: { green: 17, red: 83 }
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
          <NewPairsTokenRow key={token.id} token={token} />
        ))}
      </div>
    </div>
  );
};

export default NewPairs;
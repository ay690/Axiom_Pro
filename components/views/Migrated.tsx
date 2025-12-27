'use client';
import MigratedTokenRow, { Token } from '../tokens/MigratedTokenRow';
import { Shuffle, List } from 'lucide-react';

const Migrated = () => {
  const tokens: Token[] = [
    {
        id: '1',
        image: '新年新气象',
        name: '新年新气象',
        symbol: '新年新气象',
        description: 'New Year, New Look New Year, New Look',
        age: '32m',
        volume: 316000,
        marketCap: 230000,
        transactions: 1703,
        icons: ['leaf', 'hand', 'search'],
        stats: [{type: 'success', value: '10%'}, {type: 'info', value: 'DS'}, {type: 'danger', value: '80%'}],
        bnb: 0,
        creator: '0x92...4444',
        userIcons: ['user', 'trophy', 'crown'],
        userStats: [426, 0, '1/1'],
        progress: { green: 80, red: 20 }
    },
    {
        id: '2',
        image: 'Golden Horse',
        name: 'Golden Horse...',
        symbol: '金马腾飞',
        description: 'Golden Horse Soars',
        age: '40m',
        volume: 10000,
        marketCap: 9000,
        transactions: 534,
        icons: ['user', 'send', 'hand', 'search'],
        stats: [{type: 'danger', value: '35%'}, {type: 'success', value: '10%'}, {type: 'danger', value: '80%'}],
        bnb: 0,
        creator: '0x9e...4444',
        userIcons: ['user', 'trophy', 'crown'],
        userStats: [318, 0, '1/1'],
        progress: { green: 20, red: 80 }
    },
    {
        id: '3',
        image: '硬币之力',
        name: '硬币之力',
        symbol: '硬币之力',
        description: 'The power of a coin The power of a coin',
        age: '1h',
        volume: 656000,
        marketCap: 121000,
        transactions: 7959,
        icons: ['leaf', 'globe', 'hand', 'search'],
        stats: [{type: 'danger', value: '17%'}, {type: 'info', value: 'DS'}, {type: 'success', value: '3%'}],
        bnb: 0,
        creator: '0xf8...4444',
        userIcons: ['user', 'trophy', 'crown'],
        userStats: [516, 4, '1/66'],
        progress: { green: 85, red: 15 }
    },
    {
        id: '4',
        image: '新年新气象',
        name: '新年新气象',
        symbol: '新年新气象',
        description: 'New Year, New Look New Year, New Look',
        age: '1h',
        volume: 305000,
        marketCap: 4000,
        transactions: 2759,
        icons: ['hand', 'search'],
        stats: [{type: 'danger', value: '13%'}, {type: 'info', value: 'DS'}, {type: 'success', value: '0%'}],
        bnb: 0,
        creator: '0x3f...4444',
        userIcons: ['user', 'trophy', 'crown'],
        userStats: [87, 0, '1/1'],
        progress: { green: 95, red: 5 }
    },
    {
        id: '5',
        image: '橘总',
        name: '橘总',
        symbol: '九阳豆浆刚官宣的吉祥物',
        description: 'Orange General Joyoung Soy Milk\'s newly annou...',
        age: '1h',
        volume: 706000,
        marketCap: 54000,
        transactions: 8161,
        icons: ['leaf', 'hand', 'search'],
        stats: [{type: 'danger', value: '18%'}, {type: 'info', value: 'DS'}, {type: 'warning', value: '2mo'}, {type: 'success', value: '0%'}],
        bnb: 0,
        creator: '0x...4444',
        userIcons: ['user', 'trophy', 'crown'],
        userStats: [432, 6, '5/709'],
        progress: { green: 90, red: 10 }
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
          <MigratedTokenRow key={token.id} token={token} />
        ))}
      </div>
    </div>
  );
};

export default Migrated;
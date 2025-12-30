'use client'

import { Button } from '../ui/button';
import { Zap } from 'lucide-react';

const streams = [
    {
      name: 'GIVEBACK',
      mc: '9.39M',
      description: 'GiveBack Coin is a community-driven cryto...',
      time: '3mo ago',
      image: '🏖️',
      views: 103,
      age: '21h ago'
    },
    {
      name: 'EXARION',
      mc: '1.93M',
      description: 'Exarion is a road-like character linked to...',
      time: '1mo ago',
      image: '🤖',
      views: 877,
      age: '21h ago'
    },
    {
      name: 'Groyper',
      mc: '1.56M',
      description: 'Groyper is a toad-like character linked t...',
      time: '7mo ago',
      image: '🐸',
      views: 877,
      age: '1mo ago'
    },
    {
      name: 'spinning cat',
      mc: '763K',
      description: 'oliaolia spinning cat',
      time: '1y ago',
      image: '🐈',
      views: 294,
      age: '1y ago'
    },
    {
      name: 'HODL BOYZ',
      mc: '723K',
      description: 'Welcome to the official home of HODL BOYZ! Our debut album \"WAGMI\" is the firs...',
      time: '6d ago',
      image: '💎',
      views: 183,
      age: '6d ago'
    },
    {
      name: 'Butthole Col...',
      mc: '713K',
      description: 'A fart cannot exist without a butthole',
      image: '🍑',
      views: 0,
      age: ''
    },
    {
      name: 'Crypto Liqu...',
      mc: '442K',
      description: 'Streaming 30s crypto liquidation levels for traders',
      image: '💸',
      views: 0,
      age: ''
    },
    {
      name: 'Lea Ai',
      mc: '439K',
      description: 'Unleash the power of Lea',
      image: '🤖',
      views: 0,
      age: ''
    },
    {
      name: 'Launchr',
      mc: '384K',
      description: 'Launchr is a programmable creator fee engine designed to adapt to every stage of...',
      image: '🚀',
      views: 0,
      age: ''
    },
    {
      name: 'had to take...',
      mc: '326K',
      description: '',
      image: '🤷',
      views: 0,
      age: ''
    },
  
  ];
  
  const TopStreams = () => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {streams.map((stream, index) => (
          <div key={index} className="bg-gray-900 rounded-lg overflow-hidden">
            <div className="relative h-40 flex items-center justify-center bg-gray-800 text-5xl">
              {stream.image}
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-lg">{stream.name}</h3>
                <p className="text-sm text-gray-400">MC <span className="text-white">{stream.mc}</span></p>
              </div>
              <p className="text-sm text-gray-400 mt-1 truncate">{stream.description}</p>
              <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                <span>{stream.time}</span>
                <div className="flex items-center gap-2">
                  <span>{stream.views}</span>
                  <span>{stream.age}</span>
                </div>
              </div>
              <div className='flex items-center justify-between'>
  
                <div className="flex items-center gap-2 mt-3">
                  <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">S</div>
                  <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs">P</div>
                  </div>
                  <div className='mt-2'>
                    <Button className="bg-blue-600 hover:bg-blue-700 rounded-full w-10 h-10 p-0">
                      <Zap className="w-5 h-5" />
                    </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default TopStreams;

import React from 'react';

const TruckAnimation: React.FC = () => {
  return (
    <div className="relative w-full h-24 overflow-hidden border-t border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-black/40 backdrop-blur-sm">
      <div className="absolute bottom-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>
      
      {/* Road Markings */}
      <div className="absolute bottom-4 w-full flex justify-around opacity-30">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="w-16 h-1 bg-zinc-400 dark:bg-white"></div>
        ))}
      </div>

      {/* The Moving Truck */}
      <div className="animate-truck absolute bottom-2 flex items-end">
        <div className="relative">
          {/* Truck Body (Simplified CSS Art) */}
          <div className="flex items-end">
            {/* Cab */}
            <div className="relative w-20 h-12 bg-zinc-900 dark:bg-zinc-800 rounded-t-lg border-l-4 border-red-600 shadow-lg">
                <div className="absolute top-2 right-2 w-8 h-5 bg-blue-400/30 rounded-sm"></div> {/* Window */}
                <div className="absolute -top-4 left-4 w-1 h-6 bg-zinc-500 dark:bg-zinc-400"></div> {/* Exhaust */}
            </div>
            {/* Trailer Connection */}
            <div className="w-4 h-4 bg-zinc-900"></div>
            {/* Trailer / Recovery Bed */}
            <div className="w-48 h-10 bg-red-700 relative rounded-tr-lg shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent"></div>
                <div className="absolute top-2 left-4 text-[8px] font-bold text-white/90 tracking-tighter uppercase">Gibbs Towing & Recovery</div>
            </div>
          </div>
          
          {/* Wheels */}
          <div className="flex justify-between px-2 -mt-2 relative z-10">
            <div className="flex gap-1">
                <div className="w-5 h-5 bg-black border-2 border-zinc-500 rounded-full flex items-center justify-center">
                    <div className="w-1 h-1 bg-zinc-400 rounded-full"></div>
                </div>
                <div className="w-5 h-5 bg-black border-2 border-zinc-500 rounded-full flex items-center justify-center">
                    <div className="w-1 h-1 bg-zinc-400 rounded-full"></div>
                </div>
            </div>
            <div className="flex gap-1">
                <div className="w-5 h-5 bg-black border-2 border-zinc-500 rounded-full flex items-center justify-center">
                    <div className="w-1 h-1 bg-zinc-400 rounded-full"></div>
                </div>
                <div className="w-5 h-5 bg-black border-2 border-zinc-500 rounded-full flex items-center justify-center">
                    <div className="w-1 h-1 bg-zinc-400 rounded-full"></div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TruckAnimation;


import React from 'react';

const TruckAnimation: React.FC = () => {
  return (
    <div className="relative w-full h-40 overflow-hidden border-t border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-black/40 backdrop-blur-sm">
      <div className="absolute bottom-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>
      
      {/* Road Markings */}
      <div className="absolute bottom-4 w-full flex justify-around opacity-30">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="w-24 h-2 bg-zinc-300 dark:bg-zinc-700"></div>
        ))}
      </div>

      {/* The Moving Truck Container - Moves Left to Right */}
      {/* We use flex-row. Since it moves Right, the Cab must be the LAST element (Right side) to lead. */}
      <div className="animate-truck absolute bottom-6 flex items-end">
        
        {/* 1. REAR SECTION: The Heavy Wrecker Body (Left Side) */}
        <div className="relative -mr-1">
            {/* The Main Boxy Wrecker Body */}
            <div className="w-56 h-20 bg-red-700 rounded-tl-md border-r border-black/20 relative z-10 shadow-lg">
                {/* Stripe */}
                <div className="absolute top-8 w-full h-4 bg-white/10"></div>
                <div className="absolute top-9 left-4 text-white font-black italic text-[10px] tracking-widest uppercase">GIBBS HEAVY DUTY</div>
                
                {/* The Boom / Crane Arm (Angled Backwards) */}
                <div className="absolute -top-12 right-10 w-40 h-6 bg-red-800 origin-bottom-right -rotate-[25deg] border-2 border-red-900 rounded-sm z-0">
                    <div className="absolute top-1 left-2 w-32 h-1 bg-black/30"></div>
                    {/* Hydraulic Piston */}
                    <div className="absolute -bottom-6 right-10 w-2 h-16 bg-zinc-400 origin-top -rotate-[10deg]"></div>
                </div>

                {/* Rear Light Bar */}
                <div className="absolute top-1 left-1 w-1 h-12 bg-zinc-800"></div>
            </div>

            {/* Rear Wheels (Tandem Axle for Heavy Loads) */}
            <div className="absolute -bottom-5 left-4 flex gap-2 z-20">
                <div className="w-10 h-10 bg-black rounded-full border-4 border-zinc-600 flex items-center justify-center animate-[spin_1s_linear_infinite]">
                    <div className="w-6 h-6 border border-zinc-500 rounded-full bg-zinc-800"></div>
                </div>
                <div className="w-10 h-10 bg-black rounded-full border-4 border-zinc-600 flex items-center justify-center animate-[spin_1s_linear_infinite]">
                    <div className="w-6 h-6 border border-zinc-500 rounded-full bg-zinc-800"></div>
                </div>
                <div className="w-10 h-10 bg-black rounded-full border-4 border-zinc-600 flex items-center justify-center animate-[spin_1s_linear_infinite]">
                    <div className="w-6 h-6 border border-zinc-500 rounded-full bg-zinc-800"></div>
                </div>
            </div>
            
            {/* Mudflap */}
            <div className="absolute -bottom-2 left-0 w-1 h-6 bg-black"></div>
        </div>

        {/* 2. FRONT SECTION: The Cab (Right Side) - Leads the way */}
        <div className="relative z-20">
            {/* The Cab Body */}
            <div className="w-28 h-28 bg-zinc-900 dark:bg-zinc-900 rounded-tr-md rounded-tl-sm shadow-2xl relative">
                {/* Windshield */}
                <div className="absolute top-2 right-1 w-14 h-12 bg-gradient-to-tr from-sky-900 to-sky-600 rounded-tr-md opacity-80 border-r-2 border-zinc-800"></div>
                
                {/* Side Window */}
                <div className="absolute top-4 left-4 w-10 h-10 bg-gradient-to-tr from-sky-900 to-sky-600 rounded-sm opacity-80 border border-zinc-800"></div>

                {/* Grill */}
                <div className="absolute bottom-2 right-0 w-1.5 h-16 bg-zinc-400 opacity-70"></div>
                
                {/* Bumper */}
                <div className="absolute bottom-0 -right-2 w-32 h-6 bg-zinc-300 rounded-r-md flex items-center px-1">
                     <div className="w-4 h-2 bg-yellow-500 rounded-full ml-auto animate-pulse"></div>
                </div>

                {/* Exhaust Stack */}
                <div className="absolute -top-10 left-2 w-3 h-16 bg-gradient-to-r from-zinc-300 to-zinc-500 rounded-t-full border border-zinc-600"></div>
                
                {/* Air Horn */}
                <div className="absolute -top-2 right-8 w-6 h-2 bg-zinc-400"></div>
            </div>

            {/* Front Wheel */}
            <div className="absolute -bottom-5 right-6 z-20">
                <div className="w-10 h-10 bg-black rounded-full border-4 border-zinc-600 flex items-center justify-center animate-[spin_1s_linear_infinite]">
                     <div className="w-6 h-6 border border-zinc-500 rounded-full bg-zinc-800"></div>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default TruckAnimation;


import React from 'react';

const TruckAnimation: React.FC = () => {
  return (
    <div className="relative w-full h-64 overflow-hidden border-t border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-black/40 backdrop-blur-sm mt-auto">
      <div className="absolute bottom-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent z-10"></div>
      
      {/* Road Markings */}
      <div className="absolute bottom-4 w-full flex justify-around opacity-30 z-0">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="w-24 h-2 bg-zinc-300 dark:bg-zinc-700"></div>
        ))}
      </div>

      {/* The Moving Truck Container - Moves Left to Right */}
      <div className="animate-truck absolute bottom-6 flex items-end z-20">
        
        {/* 1. REAR SECTION: The Heavy Wrecker Body (Left Side) */}
        <div className="relative -mr-1">
            {/* The Main Boxy Wrecker Body - BLACK */}
            <div className="w-64 h-24 bg-black rounded-tl-md border-r border-zinc-800 relative z-10 shadow-lg">
                
                {/* RED STRIPE Graphic */}
                <div className="absolute top-8 w-full h-6 bg-red-600 skew-x-[-20deg] border-y border-red-700"></div>
                <div className="absolute top-10 w-full h-1 bg-white/20 skew-x-[-20deg]"></div>

                {/* Gibbs Script Text */}
                <div className="absolute top-6 left-6 z-20 transform -rotate-2">
                    <span className="font-script text-white text-3xl drop-shadow-md tracking-wider">Gibbs</span>
                </div>
                
                {/* The Boom / Crane Arm (Angled Backwards) - BLACK/CHROME */}
                <div className="absolute -top-24 right-12 w-56 h-10 bg-black origin-bottom-right -rotate-[25deg] border-2 border-zinc-700 rounded-sm z-0">
                    <div className="absolute top-2 left-2 w-48 h-2 bg-gradient-to-r from-zinc-400 to-white opacity-50 rounded-full"></div>
                    {/* Hydraulic Piston */}
                    <div className="absolute -bottom-8 right-12 w-4 h-24 bg-zinc-300 origin-top -rotate-[10deg] border border-zinc-500"></div>
                </div>

                {/* Rear Light Bar */}
                <div className="absolute top-1 left-1 w-1 h-16 bg-red-900 shadow-[0_0_10px_red]"></div>
            </div>

            {/* Rear Wheels (Tri-Axle for Heavy Loads) */}
            <div className="absolute -bottom-6 left-6 flex gap-1 z-20">
                {[1, 2, 3].map((_, i) => (
                    <div key={i} className="w-12 h-12 bg-black rounded-full border-[3px] border-zinc-400 flex items-center justify-center animate-[spin_1s_linear_infinite] shadow-lg">
                        <div className="w-8 h-8 border border-zinc-600 rounded-full bg-zinc-900 flex items-center justify-center">
                            <div className="w-2 h-2 bg-zinc-400 rounded-full"></div>
                        </div>
                    </div>
                ))}
            </div>
            
            {/* Mudflap */}
            <div className="absolute -bottom-2 left-0 w-2 h-8 bg-black border-t border-zinc-700 flex items-end justify-center">
                <div className="w-full h-2 bg-red-600"></div>
            </div>
        </div>

        {/* 2. FRONT SECTION: The Cab (Right Side) - BLACK */}
        <div className="relative z-20">
            {/* The Cab Body - BLACK */}
            <div className="w-36 h-32 bg-black rounded-tr-xl rounded-tl-sm shadow-2xl relative border-l border-zinc-800">
                
                {/* Red Stripe Continuation */}
                <div className="absolute top-14 -left-2 w-full h-6 bg-red-600 skew-x-[-20deg] border-y border-red-700"></div>

                {/* Windshield */}
                <div className="absolute top-2 right-2 w-16 h-14 bg-gradient-to-tr from-sky-900 via-sky-800 to-sky-400 rounded-tr-lg opacity-90 border-r border-t border-zinc-700"></div>
                
                {/* Side Window */}
                <div className="absolute top-6 left-6 w-12 h-10 bg-gradient-to-tr from-sky-900 to-sky-600 rounded-sm opacity-90 border border-zinc-700"></div>

                {/* Chrome Grill */}
                <div className="absolute bottom-2 right-0 w-3 h-20 bg-gradient-to-b from-zinc-200 via-white to-zinc-300 border-l border-zinc-400"></div>
                
                {/* Bumper */}
                <div className="absolute -bottom-1 -right-3 w-40 h-8 bg-gradient-to-b from-zinc-300 to-zinc-500 rounded-r-md flex items-center px-2 shadow-md">
                     <div className="w-6 h-3 bg-yellow-500 rounded-full ml-auto animate-pulse shadow-[0_0_10px_yellow]"></div>
                </div>

                {/* Dual Chrome Exhaust Stacks - Higher to ensure visibility */}
                <div className="absolute -top-24 left-4 flex gap-2">
                    <div className="w-4 h-32 bg-gradient-to-r from-zinc-300 via-white to-zinc-400 rounded-t-full border border-zinc-500 shadow-sm"></div>
                    <div className="w-4 h-32 bg-gradient-to-r from-zinc-300 via-white to-zinc-400 rounded-t-full border border-zinc-500 shadow-sm"></div>
                </div>
                
                {/* Air Horns */}
                <div className="absolute -top-3 right-10 flex gap-1">
                    <div className="w-8 h-3 bg-zinc-300 rounded-sm"></div>
                    <div className="w-8 h-3 bg-zinc-300 rounded-sm"></div>
                </div>

                {/* Visor */}
                <div className="absolute top-1 right-2 w-18 h-1 bg-zinc-800 rotate-1"></div>
            </div>

            {/* Front Wheel */}
            <div className="absolute -bottom-6 right-8 z-20">
                <div className="w-12 h-12 bg-black rounded-full border-[3px] border-zinc-400 flex items-center justify-center animate-[spin_1s_linear_infinite] shadow-lg">
                     <div className="w-8 h-8 border border-zinc-600 rounded-full bg-zinc-900 flex items-center justify-center">
                        <div className="w-2 h-2 bg-zinc-400 rounded-full"></div>
                     </div>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default TruckAnimation;

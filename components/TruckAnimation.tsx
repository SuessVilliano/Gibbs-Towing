
import React from 'react';

const TruckAnimation: React.FC = () => {
  return (
    <div className="relative w-full h-32 md:h-48 overflow-hidden border-t border-zinc-800 bg-zinc-950 mt-auto">
      {/* Road line */}
      <div className="absolute bottom-6 md:bottom-8 w-full h-[2px] bg-zinc-800"></div>
      <div className="absolute bottom-6 md:bottom-8 w-full flex gap-8 animate-[slide_2s_linear_infinite]">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="w-12 h-[2px] bg-zinc-600 flex-shrink-0"></div>
        ))}
      </div>

      {/* The Moving Truck */}
      <div className="animate-truck absolute bottom-8 md:bottom-10 flex items-end">

        {/* Wrecker Body (Back) */}
        <div className="relative">
          {/* Main body - BLACK */}
          <div className="w-32 md:w-48 h-12 md:h-16 bg-black rounded-tl-sm relative shadow-lg border-t border-zinc-700">
            {/* RED STRIPE */}
            <div className="absolute top-4 md:top-6 w-full h-3 md:h-4 bg-gradient-to-r from-red-700 via-red-600 to-red-700"></div>
            <div className="absolute top-5 md:top-7 w-full h-[2px] bg-yellow-500/60"></div>

            {/* Gibbs text */}
            <div className="absolute top-2 md:top-3 left-2 md:left-4 z-20">
              <span className="font-script text-white text-lg md:text-2xl italic">Gibbs</span>
            </div>

            {/* Boom arm */}
            <div className="absolute -top-6 md:-top-10 right-4 md:right-8 w-20 md:w-32 h-2 md:h-3 bg-zinc-900 origin-bottom-right -rotate-[20deg] border border-zinc-700">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-zinc-600 to-zinc-400 opacity-50"></div>
            </div>
            {/* Hydraulic */}
            <div className="absolute -top-2 md:-top-4 right-6 md:right-12 w-1 md:w-2 h-6 md:h-10 bg-zinc-400 origin-top -rotate-[5deg]"></div>
          </div>

          {/* Rear wheels - simplified, no spin animation on mobile */}
          <div className="absolute -bottom-3 md:-bottom-4 left-2 md:left-4 flex gap-[2px] md:gap-1">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="w-6 h-6 md:w-8 md:h-8 bg-zinc-900 rounded-full border-2 border-zinc-500 flex items-center justify-center md:animate-[spin_0.5s_linear_infinite]">
                <div className="w-2 h-2 md:w-3 md:h-3 bg-zinc-600 rounded-full"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Cab (Front) */}
        <div className="relative -ml-1">
          {/* Cab body - BLACK */}
          <div className="w-16 md:w-24 h-14 md:h-20 bg-black rounded-tr-lg relative shadow-lg border-t border-l border-zinc-700">
            {/* Red stripe continuation */}
            <div className="absolute top-6 md:top-8 -left-1 w-full h-3 md:h-4 bg-gradient-to-r from-red-700 via-red-600 to-red-700"></div>
            <div className="absolute top-7 md:top-9 -left-1 w-full h-[2px] bg-yellow-500/60"></div>

            {/* Windshield */}
            <div className="absolute top-1 right-1 w-8 md:w-12 h-6 md:h-10 bg-gradient-to-br from-sky-900 to-sky-600 rounded-tr-md opacity-80"></div>

            {/* Side window */}
            <div className="absolute top-2 md:top-3 left-2 md:left-3 w-4 md:w-6 h-4 md:h-6 bg-sky-800 rounded-sm opacity-80"></div>

            {/* Grill */}
            <div className="absolute bottom-0 right-0 w-2 md:w-3 h-10 md:h-14 bg-gradient-to-b from-zinc-300 to-zinc-500"></div>

            {/* Exhaust stacks */}
            <div className="absolute -top-8 md:-top-12 left-1 md:left-2 flex gap-1">
              <div className="w-2 md:w-3 h-10 md:h-14 bg-gradient-to-b from-zinc-400 to-zinc-300 rounded-t-full"></div>
              <div className="w-2 md:w-3 h-10 md:h-14 bg-gradient-to-b from-zinc-400 to-zinc-300 rounded-t-full"></div>
            </div>

            {/* Headlight */}
            <div className="absolute bottom-1 right-1 w-2 h-2 md:w-3 md:h-3 bg-yellow-400 rounded-full shadow-[0_0_8px_rgba(250,204,21,0.8)]"></div>
          </div>

          {/* Front wheel */}
          <div className="absolute -bottom-3 md:-bottom-4 right-2 md:right-4">
            <div className="w-6 h-6 md:w-8 md:h-8 bg-zinc-900 rounded-full border-2 border-zinc-500 flex items-center justify-center md:animate-[spin_0.5s_linear_infinite]">
              <div className="w-2 h-2 md:w-3 md:h-3 bg-zinc-600 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Company name */}
      <div className="absolute bottom-1 right-4 text-[8px] md:text-xs text-zinc-600 uppercase tracking-widest">
        Gibbs Towing & Recovery
      </div>
    </div>
  );
};

export default TruckAnimation;

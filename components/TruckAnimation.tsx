
import React from 'react';
import { motion } from 'framer-motion';

const TruckAnimation: React.FC = () => {
  return (
    <div className="relative w-full h-48 overflow-hidden bg-zinc-100 dark:bg-black border-t border-zinc-200 dark:border-white/5 flex items-center">
      {/* Background Static Text Elements for Enterprise Feel */}
      <div className="absolute inset-0 flex items-center justify-around opacity-[0.03] select-none pointer-events-none">
         {[...Array(5)].map((_, i) => (
           <span key={i} className="font-brand font-black text-7xl italic uppercase">LOGISTICS</span>
         ))}
      </div>

      {/* The Enterprise Logo Motion Container */}
      <div className="animate-logo-scroll flex items-center gap-24 whitespace-nowrap">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex items-center gap-6 group">
            <div className="w-12 h-12 bg-red-700 flex items-center justify-center rounded-sm">
                <svg viewBox="0 0 24 24" className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M10 17h4V5H2v12h3m11 0h2l3-3v-3h-5v6ZM5 17a2 2 0 1 0 4 0 2 2 0 0 0-4 0Zm11 0a2 2 0 1 0 4 0 2 2 0 0 0-4 0Z" />
                </svg>
            </div>
            <div className="flex flex-col">
                <span className="font-brand font-black text-4xl tracking-tighter italic leading-none text-zinc-900 dark:text-white group-hover:text-red-600 transition-colors logo-glow">GIBBS</span>
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-red-600">Logistics & Recovery</span>
            </div>
            
            <div className="h-10 w-px bg-zinc-300 dark:bg-zinc-800 ml-8"></div>
            
            <span className="text-zinc-400 dark:text-zinc-600 font-brand font-bold uppercase tracking-widest text-xs">
                Multi-State Coverage
            </span>
          </div>
        ))}
      </div>

      {/* Decorative Overlay Gradient */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-zinc-100 dark:from-black to-transparent z-10"></div>
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-zinc-100 dark:from-black to-transparent z-10"></div>
    </div>
  );
};

export default TruckAnimation;

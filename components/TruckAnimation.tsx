
import React from 'react';
import { motion } from 'framer-motion';

const TruckAnimation: React.FC = () => {
  return (
    <div className="relative w-full h-32 overflow-hidden bg-zinc-950 border-t border-white/5">
      {/* Background Pattern - GIBBS text */}
      <div className="absolute inset-0 flex items-center justify-around opacity-[0.03] select-none pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <span key={i} className="font-brand font-black text-6xl italic uppercase text-white whitespace-nowrap">GIBBS</span>
        ))}
      </div>

      {/* Single Truck Rolling Animation */}
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 h-24"
        initial={{ x: '-100%' }}
        animate={{ x: '100vw' }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <img
          src="/images/gibbs-hero-truck.png"
          alt="Gibbs Heavy Duty Wrecker"
          className="h-full w-auto object-contain drop-shadow-2xl"
        />
      </motion.div>

      {/* Road Line */}
      <div className="absolute bottom-4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-600/30 to-transparent"></div>
    </div>
  );
};

export default TruckAnimation;

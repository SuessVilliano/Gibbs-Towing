
import React from 'react';
import { motion } from 'framer-motion';

const TruckAnimation: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 pointer-events-none h-36 sm:h-44 overflow-hidden">
      {/* Subtle road line */}
      <div className="absolute bottom-6 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-600/20 to-transparent"></div>

      {/* Rolling Truck */}
      <motion.div
        className="absolute bottom-6 h-28 sm:h-36"
        initial={{ x: '-300px' }}
        animate={{ x: '100vw' }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <img
          src="/images/gibbs-hero-truck.png"
          alt="Gibbs Heavy Duty Wrecker"
          className="h-full w-auto object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)] opacity-80"
        />
      </motion.div>
    </div>
  );
};

export default TruckAnimation;

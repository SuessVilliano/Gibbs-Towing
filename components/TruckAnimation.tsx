
import React from 'react';
import { motion } from 'framer-motion';

const Truck: React.FC<{ delay: number }> = ({ delay }) => (
  <motion.div
    className="absolute bottom-1 h-20 sm:h-28"
    initial={{ x: '-250px' }}
    animate={{ x: '100vw' }}
    transition={{
      duration: 14,
      repeat: Infinity,
      ease: 'linear',
      delay,
    }}
  >
    <img
      src="/images/gibbs-hero-truck.png"
      alt="Gibbs Heavy Duty Wrecker"
      className="h-full w-auto object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)] opacity-80"
    />
  </motion.div>
);

const TruckAnimation: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 pointer-events-none h-24 sm:h-32 overflow-hidden">
      {/* Subtle road line */}
      <div className="absolute bottom-2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-600/20 to-transparent"></div>

      {/* Two trucks rolling with equal spacing */}
      <Truck delay={0} />
      <Truck delay={7} />
    </div>
  );
};

export default TruckAnimation;


import React from 'react';

const TruckAnimation: React.FC = () => {
  // Actual Gibbs company truck images
  const truckImages = [
    "/images/gibbs-truck-1.png",
    "/images/gibbs-truck-2.png",
    "/images/gibbs-truck-3.png",
    "/images/gibbs-truck-4.png",
  ];

  return (
    <div className="relative w-full h-48 overflow-hidden bg-white dark:bg-black border-t border-zinc-200 dark:border-white/5">
      {/* Background Pattern */}
      <div className="absolute inset-0 flex items-center justify-around opacity-[0.02] select-none pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="font-brand font-black text-7xl italic uppercase text-zinc-900 dark:text-white">GIBBS</span>
        ))}
      </div>

      {/* Scrolling Truck Images - Actual Company Fleet */}
      <div className="animate-logo-scroll flex items-center gap-12 whitespace-nowrap h-full">
        {[...Array(10)].map((_, groupIndex) => (
          <React.Fragment key={groupIndex}>
            {truckImages.map((imgUrl, imgIndex) => (
              <div key={`${groupIndex}-${imgIndex}`} className="flex items-center justify-center h-full px-4 flex-shrink-0">
                <img
                  src={imgUrl}
                  alt="Gibbs Towing Fleet"
                  className="h-32 w-auto object-contain filter drop-shadow-2xl hover:scale-110 transition-transform duration-300"
                />
              </div>
            ))}
            {/* Divider between groups */}
            <div className="h-20 w-px bg-red-600/20 mx-4"></div>
          </React.Fragment>
        ))}
      </div>

      {/* Edge Fade Gradients */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white dark:from-black to-transparent z-10 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white dark:from-black to-transparent z-10 pointer-events-none"></div>
    </div>
  );
};

export default TruckAnimation;


import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Truck } from 'lucide-react';
import { GalleryImage } from '../types';

interface FleetGalleryProps {
  isOpen: boolean;
  onClose: () => void;
  images: GalleryImage[];
}

const FleetGallery: React.FC<FleetGalleryProps> = ({ isOpen, onClose, images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') paginate(-1);
      if (e.key === 'ArrowRight') paginate(1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    setImageLoaded(false);
    setImageError(false);
  }, [currentIndex]);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = images.length - 1;
      if (nextIndex >= images.length) nextIndex = 0;
      return nextIndex;
    });
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-md overflow-hidden"
        >
          {/* Backdrop (Allows closing when clicking background) */}
          <div className="absolute inset-0 z-0" onClick={onClose} />

          {/* Close Button - Force High Z-Index and Pointer Events */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="absolute top-6 right-6 z-[210] p-4 bg-white/10 hover:bg-red-600 rounded-full text-white transition-all backdrop-blur-sm pointer-events-auto flex items-center justify-center active:scale-90"
            aria-label="Close Gallery"
          >
            <X size={32} />
          </button>

          {/* Background Blurred Image for Ambiance */}
          <div className="absolute inset-0 overflow-hidden z-0 opacity-20 pointer-events-none">
             {!imageError && (
               <motion.img 
                 key={currentIndex + "-bg"}
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ duration: 1 }}
                 src={images[currentIndex].url} 
                 className="w-full h-full object-cover blur-3xl scale-110" 
               />
             )}
          </div>

          {/* Main Content */}
          <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-4 md:p-10 pointer-events-none">
            
            <div className="relative w-full max-w-6xl h-[60vh] md:h-[70vh] flex items-center justify-center pointer-events-auto">
              <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={1}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipe = Math.abs(offset.x) * velocity.x;
                    if (swipe < -10000) {
                      paginate(1);
                    } else if (swipe > 10000) {
                      paginate(-1);
                    }
                  }}
                  className="absolute w-full h-full flex items-center justify-center"
                >
                  {!imageLoaded && !imageError && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}

                  {imageError && (
                     <div className="w-full h-full flex flex-col items-center justify-center text-zinc-500 bg-zinc-900 rounded-lg border border-zinc-800 p-10">
                        <Truck size={64} className="text-red-700 opacity-50 mb-4" />
                        <h4 className="text-xl font-brand font-bold text-white uppercase mb-2">Asset Loading...</h4>
                        <p className="text-sm uppercase tracking-widest text-center max-w-xs">Connecting to secure asset server for high-resolution recovery photography.</p>
                     </div>
                  )}
                  
                  {!imageError && (
                    <img
                        src={images[currentIndex].url}
                        alt={images[currentIndex].title}
                        onLoad={() => setImageLoaded(true)}
                        onError={() => setImageError(true)}
                        className={`max-w-full max-h-full object-contain rounded-lg shadow-2xl bg-black/50 transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                    />
                  )}
                </motion.div>
              </AnimatePresence>

              <button
                className="hidden md:flex absolute left-4 bg-black/50 hover:bg-red-700 text-white p-4 rounded-full backdrop-blur-sm transition-all z-20 hover:scale-110 active:scale-95 pointer-events-auto"
                onClick={() => paginate(-1)}
              >
                <ChevronLeft size={24} />
              </button>
              <button
                className="hidden md:flex absolute right-4 bg-black/50 hover:bg-red-700 text-white p-4 rounded-full backdrop-blur-sm transition-all z-20 hover:scale-110 active:scale-95 pointer-events-auto"
                onClick={() => paginate(1)}
              >
                <ChevronRight size={24} />
              </button>
            </div>

            <motion.div 
               key={currentIndex + "-text"}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="mt-6 text-center z-20 pointer-events-auto"
            >
              <h3 className="text-xl md:text-3xl font-brand font-black italic text-white uppercase tracking-wider drop-shadow-lg">
                {images[currentIndex].title}
              </h3>
              <p className="text-red-500 text-xs font-bold uppercase tracking-[0.3em] mt-2">
                 Logistics Recovery Archive {currentIndex + 1} / {images.length}
              </p>
            </motion.div>

            <div className="mt-8 flex gap-2 md:gap-4 overflow-x-auto max-w-full pb-2 px-4 scrollbar-hide w-full justify-center z-20 pointer-events-auto">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className={`relative flex-shrink-0 w-16 h-12 md:w-24 md:h-16 rounded-md overflow-hidden transition-all duration-300 border-2 ${
                    index === currentIndex ? 'border-red-600 scale-110 shadow-lg shadow-red-900/50' : 'border-transparent opacity-50 hover:opacity-100'
                  }`}
                >
                  <img src={img.url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FleetGallery;

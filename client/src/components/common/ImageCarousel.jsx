import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";

const ImageCarousel = ({ images = [], alt = "Image" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

  // Reset index when images change
  React.useEffect(() => {
    setCurrentIndex(0);
    setImageError(false);
  }, [images]);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-700">
        <div className="text-center">
          <ImageIcon className="w-16 h-16 text-slate-600 mx-auto mb-2" />
          <p className="text-slate-500 text-sm">No images</p>
        </div>
      </div>
    );
  }

  const goToPrevious = React.useCallback((e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    setImageError(false);
  }, [images.length]);

  const goToNext = React.useCallback((e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    setImageError(false);
  }, [images.length]);

  const currentImage = React.useMemo(() => images[currentIndex], [images, currentIndex]);

  return (
    <div className="relative w-full h-full group/carousel">
      {/* Image Area with separate hover group */}
      <div className="relative w-full h-full group/image">
        {/* Main Image */}
        {!imageError ? (
          <>
            <img
              src={currentImage.imageUrl}
              alt={currentImage.caption || alt}
              loading="lazy"
              className="w-full h-full object-contain transition-transform duration-700 group-hover/image:scale-105"
              onError={() => setImageError(true)}
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-60 group-hover/image:opacity-40 transition-opacity"></div>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-700">
            <div className="text-center">
              <ImageIcon className="w-16 h-16 text-slate-600 mx-auto mb-2" />
              <p className="text-slate-500 text-sm">Image not available</p>
            </div>
          </div>
        )}

        {/* Caption - Compact Terminal Style - Only shows when hovering over image area */}
        {currentImage.caption && !imageError && (
          <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover/image:translate-y-0 transition-all duration-500 ease-out z-30">
            <div className="relative bg-black/98 backdrop-blur-md border-t border-emerald-500/50 shadow-lg shadow-emerald-500/20">
              {/* Compact Terminal Content */}
              <div className="px-2.5 py-1.5 flex items-center gap-1.5">
                <span className="text-emerald-400 text-[10px] font-mono font-bold">$</span>
                <div className="w-0.5 h-2.5 bg-emerald-400 animate-pulse"></div>
                <p className="text-emerald-300 text-[10px] font-mono tracking-wide animate-typing flex-1 truncate">
                  <span className="text-emerald-500 font-bold">echo</span>
                  <span className="text-slate-400 mx-1">"</span>
                  <span className="text-emerald-200">{currentImage.caption}</span>
                  <span className="text-slate-400">"</span>
                </p>
              </div>
              
              {/* Scan Line Effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 via-transparent to-emerald-500/5 pointer-events-none animate-scan"></div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation - Only show if multiple images */}
      {images.length > 1 && (
        <>
          {/* Previous Button */}
          <button
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-slate-900/80 hover:bg-slate-900/95 text-white rounded-full opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 hover:scale-110 z-10"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Next Button */}
          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-slate-900/80 hover:bg-slate-900/95 text-white rounded-full opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 hover:scale-110 z-10"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Counter */}
          <div className="absolute top-3 right-3 px-3 py-1.5 bg-slate-900/80 backdrop-blur-sm rounded-full text-white text-xs font-medium z-10">
            {currentIndex + 1} / {images.length}
          </div>
        </>
      )}
    </div>
  );
};

// Add hacker terminal animations once
if (typeof document !== 'undefined') {
  const style = document.createElement("style");
  style.textContent = `
    @keyframes typing {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
    
    @keyframes scan {
      0%, 100% {
        transform: translateY(-100%);
      }
      50% {
        transform: translateY(100%);
      }
    }
    
    .animate-typing {
      animation: typing 0.5s ease-out;
    }
    
    .animate-scan {
      animation: scan 8s linear infinite;
    }
  `;
  if (!document.getElementById('carousel-animations')) {
    style.id = 'carousel-animations';
    document.head.appendChild(style);
  }
}

export default React.memo(ImageCarousel);

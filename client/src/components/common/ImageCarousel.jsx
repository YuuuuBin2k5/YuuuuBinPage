import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";

const ImageCarousel = ({ images = [], alt = "Image" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

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

  const goToPrevious = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    setImageError(false);
  };

  const goToNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    setImageError(false);
  };

  const currentImage = images[currentIndex];

  return (
    <div className="relative w-full h-full group">
      {/* Main Image */}
      {!imageError ? (
        <>
          <img
            src={currentImage.imageUrl}
            alt={currentImage.caption || alt}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            onError={() => setImageError(true)}
            loading="lazy"
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
        </>
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-700">
          <div className="text-center">
            <ImageIcon className="w-16 h-16 text-slate-600 mx-auto mb-2" />
            <p className="text-slate-500 text-sm">Image not available</p>
          </div>
        </div>
      )}

      {/* Caption */}
      {currentImage.caption && !imageError && (
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-slate-900/90 to-transparent">
          <p className="text-white text-sm text-center">{currentImage.caption}</p>
        </div>
      )}

      {/* Navigation - Only show if multiple images */}
      {images.length > 1 && (
        <>
          {/* Previous Button */}
          <button
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-slate-900/80 hover:bg-slate-900/95 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 z-10"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Next Button */}
          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-slate-900/80 hover:bg-slate-900/95 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 z-10"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(index);
                  setImageError(false);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-blue-400 w-6"
                    : "bg-white/50 hover:bg-white/80"
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>

          {/* Counter */}
          <div className="absolute top-3 right-3 px-3 py-1.5 bg-slate-900/80 backdrop-blur-sm rounded-full text-white text-xs font-medium z-10">
            {currentIndex + 1} / {images.length}
          </div>
        </>
      )}
    </div>
  );
};

export default ImageCarousel;

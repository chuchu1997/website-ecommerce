import { useState, useRef, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { ImageInterface } from '@/types/product';
import { ImageLoader } from '@/components/ui/image-loader';
import { Badge } from '@/components/ui/badge';

interface PropsProductImageGallery { 
  images: ImageInterface[];
}

export const ProductImageGallery = ({ images }: PropsProductImageGallery) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const displayImages = images.length > 0 ? images : [];

  // Check if device is mobile with improved breakpoints
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px is md breakpoint in Tailwind
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Minimum swipe distance (in pixels)
  const minSwipeDistance = 50;

  const handleTouchStart = (e: React.TouchEvent) => {
    touchEndX.current = null;
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentIndex < displayImages.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
    if (isRightSwipe && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Mouse event handlers for desktop support
  const handleMouseDown = (e: React.MouseEvent) => {
    touchStartX.current = e.clientX;
    touchEndX.current = null;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (touchStartX.current !== null) {
      touchEndX.current = e.clientX;
    }
  };

  const handleMouseUp = () => {
    if (!touchStartX.current || !touchEndX.current) {
      touchStartX.current = null;
      return;
    }
    
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentIndex < displayImages.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
    if (isRightSwipe && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      } else if (e.key === 'ArrowRight' && currentIndex < displayImages.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, displayImages.length]);

  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex(Math.max(0, currentIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex(Math.min(displayImages.length - 1, currentIndex + 1));
  };

  return (
    <div className="relative rounded-md w-full">
      {/* Desktop Layout */}
      {!isMobile ? (
        <div className="flex gap-3 sm:gap-4">
          {/* Thumbnails Column - Desktop Only */}
          <div className="flex flex-col gap-2 w-16 sm:w-20 lg:w-24 shrink-0">
            {displayImages.map((image, index) => (
              <button
                key={index}
                onClick={() => handleThumbnailClick(index)}
                className={`relative w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 
                           rounded-lg overflow-hidden border-2 transition-all duration-200 
                           hover:opacity-80 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  index === currentIndex 
                    ? 'border-blue-500 ring-2 ring-blue-200 shadow-lg' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <ImageLoader
                  src={image.url}
                  alt={`Thumbnail ${index + 1}`}
                  className="object-cover object-center"
           
                  fill
                />
              </button>
            ))}
          </div>

          {/* Main Image - Desktop */}
          <div className="flex-1 min-w-0">
            <div 
              ref={imageContainerRef}
              className="aspect-square relative overflow-hidden cursor-grab active:cursor-grabbing 
                         select-none rounded-lg bg-gray-100 shadow-lg"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <div className="relative w-full h-full overflow-hidden">
                {displayImages.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
                      index === currentIndex ? 'translate-x-0' : 
                      index < currentIndex ? '-translate-x-full' : 'translate-x-full'
                    }`}
                  >
                    <ImageLoader
                      src={image.url}
                      alt={`Product image ${index + 1}`}
                      className="object-cover object-center pointer-events-none"
                      fill
                    
                    />
                  </div>
                ))}
              </div>
              
              {/* Navigation Arrows - Desktop (Always Visible) */}
              {displayImages.length > 1 && (
                <>
                  <button
                    onClick={goToPrevious}
                    className={`absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 
                               p-2 sm:p-3 bg-white/95 backdrop-blur-sm rounded-full shadow-lg 
                               transition-all duration-200 ease-in-out group z-30
                               border border-gray-200/50 hover:shadow-xl hover:scale-110 ${
                      currentIndex === 0 
                        ? 'opacity-40 cursor-not-allowed' 
                        : 'opacity-90 hover:opacity-100 hover:bg-white'
                    }`}
                    disabled={currentIndex === 0}
                    aria-label="Previous image"
                  >
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 group-hover:text-gray-900" 
                         fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  
                  <button
                    onClick={goToNext}
                    className={`absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 
                               p-2 sm:p-3 bg-white/95 backdrop-blur-sm rounded-full shadow-lg 
                               transition-all duration-200 ease-in-out group z-30
                               border border-gray-200/50 hover:shadow-xl hover:scale-110 ${
                      currentIndex === displayImages.length - 1 
                        ? 'opacity-40 cursor-not-allowed' 
                        : 'opacity-90 hover:opacity-100 hover:bg-white'
                    }`}
                    disabled={currentIndex === displayImages.length - 1}
                    aria-label="Next image"
                  >
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 group-hover:text-gray-900" 
                         fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}

              {/* Image Counter - Desktop */}
              {displayImages.length > 1 && (
                <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 
                               bg-black/70 text-white px-3 sm:px-4 py-1.5 sm:py-2 
                               rounded-full text-sm font-medium backdrop-blur-sm shadow-lg z-10">
                  {currentIndex + 1}/{displayImages.length}
                </div>
              )}

              {/* Badges - Desktop */}
              <div className="absolute bottom-0 left-0 z-30">
                <div className="flex items-end scale-90 lg:scale-100 origin-bottom-left">
                  {/* XTRA Badge */}
                  <div className="flex flex-col justify-center px-3 py-2.5 lg:px-4 lg:py-3
                                 bg-gradient-to-br from-cyan-500 via-cyan-400 to-cyan-600 
                                 text-white rounded-tr-2xl shadow-lg hover:shadow-xl 
                                 transition-all duration-200 min-w-0 group cursor-pointer">
                    <span className="text-sm lg:text-base font-bold italic leading-tight mb-1 
                                   tracking-wide drop-shadow-sm group-hover:scale-105 transition-transform">
                      XTRA
                    </span>
                    <Badge className="bg-white text-cyan-600 font-semibold text-xs lg:text-sm 
                                    px-2 py-1 rounded shadow-sm whitespace-nowrap 
                                    group-hover:bg-gray-50 transition-colors">
                      Freeship*
                    </Badge>
                  </div>
                  
                  {/* EXTRA Badge */}
                  <div className="flex flex-col justify-center px-3 py-2.5 lg:px-4 lg:py-3
                                 bg-gradient-to-br from-green-600 via-green-500 to-green-400 
                                 text-white rounded-tr-xl shadow-lg hover:shadow-xl
                                 transition-all duration-200 -ml-2 min-w-0 group cursor-pointer">
                    <span className="text-sm lg:text-base font-bold italic leading-tight mb-1 
                                   tracking-wide drop-shadow-sm group-hover:scale-105 transition-transform">
                      EXTRA
                    </span>
                    <Badge className="bg-red-500 text-white font-semibold text-xs lg:text-sm 
                                    px-2 py-1 rounded-sm shadow-sm whitespace-nowrap
                                    group-hover:bg-red-600 transition-colors">
                      lên đến 14%*
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Mobile Layout - Fully Responsive */
        <div 
          ref={imageContainerRef}
          className="h-100 sm:h-80 md:h-96 relative overflow-hidden cursor-grab active:cursor-grabbing 
                     select-none rounded-lg bg-gray-100 shadow-lg"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="relative w-full h-full overflow-hidden">
            {displayImages.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
                  index === currentIndex ? 'translate-x-0' : 
                  index < currentIndex ? '-translate-x-full' : 'translate-x-full'
                }`}
              >
                <ImageLoader
                  src={image.url}
                  alt={`Product image ${index + 1}`}
                  className="object-cover object-center pointer-events-none"
                  fill
                
                />
              </div>
            ))}
          </div>
          
          {/* Navigation Arrows - Mobile (Always Visible) */}
          {displayImages.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className={`absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 
                           p-2 sm:p-2.5 bg-white/95 backdrop-blur-sm rounded-full shadow-lg 
                           transition-all duration-200 ease-in-out group z-30
                           border border-gray-200/50 hover:shadow-xl hover:scale-110 ${
                  currentIndex === 0 
                    ? 'opacity-40 cursor-not-allowed' 
                    : 'opacity-90 hover:opacity-100 hover:bg-white'
                }`}
                disabled={currentIndex === 0}
                aria-label="Previous image"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 group-hover:text-gray-900" 
                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                onClick={goToNext}
                className={`absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 
                           p-2 sm:p-2.5 bg-white/95 backdrop-blur-sm rounded-full shadow-lg 
                           transition-all duration-200 ease-in-out group z-30
                           border border-gray-200/50 hover:shadow-xl hover:scale-110 ${
                  currentIndex === displayImages.length - 1 
                    ? 'opacity-40 cursor-not-allowed' 
                    : 'opacity-90 hover:opacity-100 hover:bg-white'
                }`}
                disabled={currentIndex === displayImages.length - 1}
                aria-label="Next image"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 group-hover:text-gray-900" 
                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Image Counter - Mobile */}
          {displayImages.length > 1 && (
            <div className="absolute top-3 sm:top-4 right-3 sm:right-4 
                           bg-black/60 text-white px-2.5 sm:px-3 py-1 sm:py-1.5 
                           rounded-full text-xs sm:text-sm font-medium backdrop-blur-sm z-10">
              {currentIndex + 1}/{displayImages.length}
            </div>
          )}

          {/* Swipe Indicator Dots - Mobile */}
          {displayImages.length > 1 && (
            <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 
                           flex gap-1.5 sm:gap-2 z-10">
              {displayImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-200 
                             hover:scale-125 focus:outline-none focus:ring-2 focus:ring-white/50 ${
                    index === currentIndex 
                      ? 'bg-white shadow-lg' 
                      : 'bg-white/50 hover:bg-white/70'
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          )}

          {/* Badges - Mobile */}
          <div className="absolute bottom-0 left-0 z-30">
            <div className="flex items-end scale-75 sm:scale-90 origin-bottom-left">
              {/* XTRA Badge */}
              <div className="flex flex-col justify-center px-2 py-1.5 sm:px-2.5 sm:py-2
                             bg-gradient-to-br from-cyan-500 via-cyan-400 to-cyan-600 
                             text-white rounded-tr-xl shadow-md hover:shadow-lg 
                             transition-all duration-200 min-w-0">
                <span className="text-[10px] sm:text-xs font-bold italic leading-tight mb-0.5 
                               tracking-wide drop-shadow-sm">
                  XTRA
                </span>
                <Badge className="bg-white text-cyan-600 font-semibold text-[9px] sm:text-xs 
                                px-1.5 py-0.5 rounded shadow-sm whitespace-nowrap">
                  Freeship*
                </Badge>
              </div>
              
              {/* EXTRA Badge */}
              <div className="flex flex-col justify-center px-2 py-1.5 sm:px-2.5 sm:py-2
                             bg-gradient-to-br from-green-600 via-green-500 to-green-400 
                             text-white rounded-tr-lg shadow-md hover:shadow-lg
                             transition-all duration-200 -ml-1 min-w-0">
                <span className="text-[10px] sm:text-xs font-bold italic leading-tight mb-0.5 
                               tracking-wide drop-shadow-sm">
                  EXTRA
                </span>
                <Badge className="bg-red-500 text-white font-semibold text-[9px] sm:text-xs 
                                px-1.5 py-0.5 rounded-sm shadow-sm whitespace-nowrap">
                  lên đến 14%*
                </Badge>
              </div>
            </div>
          </div>

          {/* Loading Indicator */}
          <div className="absolute inset-0 bg-gray-200 animate-pulse -z-10" />
        </div>
      )}
      
      {/* Thumbnail Navigation for Mobile (Optional - Shows on larger mobile screens) */}
      {isMobile && displayImages.length > 1 && window.innerWidth >= 640 && (
        <div className="flex items-center justify-center gap-2 mt-4 px-4 overflow-x-auto">
          {displayImages.map((image, index) => (
            <button
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={`relative w-12 h-12 sm:w-16 sm:h-12 shrink-0
                         rounded-lg overflow-hidden border-2 transition-all duration-200 
                         hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                index === currentIndex 
                  ? 'border-blue-500 ring-2 ring-blue-200 shadow-lg' 
                  : 'border-gray-200 hover:border-gray-300 opacity-70 hover:opacity-100'
              }`}
            >
              <ImageLoader
                src={image.url}
                alt={`Thumbnail ${index + 1}`}
                className="object-cover object-center"
                fill
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;
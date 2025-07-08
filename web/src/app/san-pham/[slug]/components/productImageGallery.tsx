import { useState, useRef, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { ImageInterface } from '@/types/product';
import { ImageLoader } from '@/components/ui/image-loader';
import { Badge } from '@/components/ui/badge';
interface propsProductImageGaller { 
    images:ImageInterface[]

}
export const ProductImageGallery = ({images}:propsProductImageGaller) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const displayImages = images.length>0 ? images : [];

  // Check if device is mobile
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

  return (
    <div className="relative  rounded-md">
      {/* Desktop Layout */}
      {!isMobile ? (
        <div className="flex gap-4">
          {/* Thumbnails Column - Desktop Only */}
          <div className="flex flex-col gap-2 w-20">
            {displayImages.map((image, index) => (
              <button
                key={index}
                onClick={() => handleThumbnailClick(index)}
                className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all hover:opacity-80 ${
                  index === currentIndex 
                    ? 'border-blue-500 ring-2 ring-blue-200' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <ImageLoader
                  src={image.url}
                  alt={`Thumbnail ${index + 1}`}
                  className="object-cover"
                  fill
                />
              </button>
            ))}
          </div>

          {/* Main Image - Desktop */}
          <div className="flex-1">
            <div 
              ref={imageContainerRef}
              className="aspect-square relative overflow-hidden cursor-grab active:cursor-grabbing select-none rounded-lg"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <ImageLoader
                src={displayImages[currentIndex]?.url}
                alt="Product image"
                className="object-cover pointer-events-none"
                fill
                priority
              />
              
              {/* Navigation Arrows - Desktop */}
              {displayImages.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
                    className={`absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg transition-all ${
                      currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'opacity-100 hover:bg-white hover:shadow-xl'
                    }`}
                    disabled={currentIndex === 0}
                  >
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  
                  <button
                    onClick={() => setCurrentIndex(Math.min(displayImages.length - 1, currentIndex + 1))}
                    className={`absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg transition-all ${
                      currentIndex === displayImages.length - 1 ? 'opacity-50 cursor-not-allowed' : 'opacity-100 hover:bg-white hover:shadow-xl'
                    }`}
                    disabled={currentIndex === displayImages.length - 1}
                  >
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}

              {/* Wishlist Button - Desktop */}
           

              {/* Image Counter - Desktop */}
              {displayImages.length > 1 && (
                <div className="absolute bottom-4 right-4 bg-black/70 text-white px-4 py-2 rounded-full text-sm font-medium">
                  {currentIndex + 1}/{displayImages.length}
                </div>
              )}

              {/* Badges - Desktop */}
              <div className="absolute bottom-0 left-0 z-10">
                <div className="flex rounded-r-4xl overflow-hidden">
                  <div className="flex flex-col justify-center p-3 bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-600 text-white scale-90 -translate-x-2 translate-y-4">
                    <span className="text-sm font-bold italic">XTRA</span>
                    <Badge className="bg-white text-cyan-600 font-semibold">Freeship*</Badge>
                  </div>
                  
                  <div className="flex flex-col justify-center p-3 bg-gradient-to-r from-green-600 via-green-500 to-green-400 text-white scale-90 -translate-x-4 translate-y-4 rounded-r-md">
                    <span className="text-sm font-bold italic">EXTRA</span>
                    <Badge className="bg-[#fb2150] text-white py-1 rounded-sm font-semibold">
                      lên đến 14%*
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Mobile Layout */
        <div 
          ref={imageContainerRef}
          className="h-[300px] relative overflow-hidden cursor-grab active:cursor-grabbing select-none"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <ImageLoader
            src={displayImages[currentIndex]?.url}
            alt="Product image"
            className="object-contain pointer-events-none"
            fill
            priority
          />
          
          {/* Navigation Arrows - Mobile */}
          {displayImages.length > 1 && (
            <>
              <button
                onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
                className={`absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg transition-opacity ${
                  currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'opacity-100 hover:bg-white'
                }`}
                disabled={currentIndex === 0}
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                onClick={() => setCurrentIndex(Math.min(displayImages.length - 1, currentIndex + 1))}
                className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg transition-opacity ${
                  currentIndex === displayImages.length - 1 ? 'opacity-50 cursor-not-allowed' : 'opacity-100 hover:bg-white'
                }`}
                disabled={currentIndex === displayImages.length - 1}
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

   

          {/* Image Counter - Mobile */}
          {displayImages.length > 1 && (
            <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              {currentIndex + 1}/{displayImages.length}
            </div>
          )}

          {/* Swipe Indicator Dots - Mobile */}
          {displayImages.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {displayImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Badges - Mobile */}
          <div className="absolute bottom-0 left-0 z-10">
            <div className="flex rounded-r-4xl overflow-hidden">
              <div className="flex flex-col justify-center p-2 bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-600 text-white scale-80 -translate-x-2 translate-y-3">
                <span className="text-xs font-bold italic">XTRA</span>
                <Badge className="bg-white text-cyan-600">Freeship*</Badge>
              </div>
              
              <div className="flex flex-col justify-center p-2 bg-gradient-to-r from-green-600 via-green-500 to-green-400 text-white scale-80 -translate-x-4/12 translate-y-3 rounded-r-md">
                <span className="text-xs font-bold italic">EXTRA</span>
                <Badge className="bg-[#fb2150] py-0 rounded-sm text-white">
                  lên đến 14%*
                </Badge>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;
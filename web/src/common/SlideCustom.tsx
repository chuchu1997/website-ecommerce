"use client";

import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SliderProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  onItemClick?: (item: T, index: number) => void;
  itemsPerView?: number;
  gap?: number;
  className?: string;
  showArrows?: boolean;
  showDots?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export function Slider<T>({
  items,
  renderItem,
  onItemClick,
  itemsPerView = 3,
  gap = 16,
  className = '',
  showArrows = true,
  showDots = true,
  autoPlay = false,
  autoPlayInterval = 4000
}: SliderProps<T>) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Calculate max index - this represents the last possible starting position
  const maxIndex = Math.max(0, items.length - itemsPerView);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (autoPlay && maxIndex > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex(prev => prev >= maxIndex ? 0 : prev + 1);
      }, autoPlayInterval);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [autoPlay, autoPlayInterval, maxIndex]);

  if (!isMounted) return null;

  const goToSlide = (index: number) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex(Math.max(0, Math.min(index, maxIndex)));
    
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      goToSlide(currentIndex - 1);
    }
  };

  const goToNext = () => {
    if (currentIndex < maxIndex) {
      goToSlide(currentIndex + 1);
    }
  };

  const handleItemClick = (item: T, index: number) => {
    if (onItemClick && !isTransitioning) {
      onItemClick(item, index);
    }
  };
  
  // Calculate item width accounting for gaps
  const itemWidth = `calc((100% - ${(itemsPerView - 1) * gap}px) / ${itemsPerView})`;
  
  // Fixed translation calculation
  const slideWidth = 100 / itemsPerView;
  const gapPercentage = (gap / (sliderRef.current?.offsetWidth || 1)) * 100;
  const translateX = -(currentIndex * (slideWidth + gapPercentage));
  
  return (
    <div className={`relative w-full ${className}`}>
      {/* Main slider container */}
      <div className="relative overflow-hidden">
        {/* Slider track */}
        <div
          ref={sliderRef}
          className="flex transition-transform duration-300 ease-out"
          style={{
            transform: `translateX(${translateX}%)`,
            gap: `${gap}px`,
          }}
        >
          {items.map((item, index) => (
            <div
              key={index}
              className={`h-full flex-shrink-0 ${onItemClick ? 'cursor-pointer' : ''}`}
              style={{ width: itemWidth }}
              onClick={() => handleItemClick(item, index)}
            >
              <div className="h-full">
                {renderItem(item, index)}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation arrows - Refined design matching your aesthetic */}
        {showArrows && items.length > itemsPerView && (
          <>
            <button
              onClick={goToPrevious}
              disabled={currentIndex === 0 || isTransitioning}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 p-2.5 rounded-lg bg-white/95 backdrop-blur-sm border border-stone-200 text-stone-600 hover:bg-white hover:text-stone-800 hover:border-amber-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <ChevronLeft size={18} />
            </button>
            
            <button
              onClick={goToNext}
              disabled={currentIndex >= maxIndex || isTransitioning}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 p-2.5 rounded-lg bg-white/95 backdrop-blur-sm border border-stone-200 text-stone-600 hover:bg-white hover:text-stone-800 hover:border-amber-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}
      </div>

      {/* Dots indicator - Refined with stone/amber colors */}
      {showDots && items.length > itemsPerView && (
        <div className="flex justify-center items-center gap-2 mt-4 sm:mt-6">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              disabled={isTransitioning}
              className={`transition-all duration-200 rounded-full ${
                currentIndex === index
                  ? 'w-6 h-2.5 bg-amber-500 shadow-sm'
                  : 'w-2.5 h-2.5 bg-stone-300 hover:bg-stone-400'
              }`}
            />
          ))}
        </div>
      )}

      {/* Progress indicator - Optional elegant addition */}
      {items.length > itemsPerView && (
        <div className="mt-3 sm:mt-4">
          <div className="w-full bg-stone-200 rounded-full h-1 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-300 ease-out"
              style={{ 
                width: `${((currentIndex + 1) / (maxIndex + 1)) * 100}%` 
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
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
  autoPlayInterval = 3000
}: SliderProps<T>) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [isMounted,setIsMounted] = useState(false)

  const maxIndex = Math.max(0, items.length - itemsPerView);
 useEffect(()=>{
    setIsMounted(true)
 },[])

  useEffect(() => {
    if (autoPlay) {
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
  if(!isMounted) return null;
  const goToSlide = (index: number) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex(Math.max(0, Math.min(index, maxIndex)));
    
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const goToPrevious = () => {
    goToSlide(currentIndex - 1);
  };

  const goToNext = () => {
    goToSlide(currentIndex + 1);
  };

  const handleItemClick = (item: T, index: number) => {
    if (onItemClick && !isTransitioning) {
      onItemClick(item, index);
    }
  };
  
  const itemWidth = `calc((100% - ${(itemsPerView - 1) * gap}px) / ${itemsPerView})`;
  const translateX = -(currentIndex * (100 / itemsPerView + gap * currentIndex / itemsPerView));
  
  return (
    <div className={`relative w-full ${className}`}>
      {/* Main slider container */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 shadow-lg">
        {/* Slider track */}
        <div
          ref={sliderRef}
          className="flex transition-transform duration-300 ease-out"
          style={{
            transform: `translateX(${translateX}%)`,
            gap: `${gap}px`,
            padding: '24px'
          }}
        >
          {items.map((item, index) => (
            <div
              key={index}
              className={`h-full flex-shrink-0 ${onItemClick ? 'cursor-pointer' : ''}`}
              style={{ width: itemWidth }}
              onClick={() => handleItemClick(item, index)}
            >
              <div className="h-full transform transition-all duration-200 hover:scale-105 hover:shadow-lg rounded-lg overflow-hidden  border border-slate-200/60">
                {renderItem(item, index)}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation arrows */}
        {showArrows && items.length > itemsPerView && (
          <>
            <button
              onClick={goToPrevious}
              disabled={currentIndex === 0}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/90 backdrop-blur-sm shadow-lg border border-slate-200/60 text-slate-700 hover:bg-white hover:text-slate-900 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 hover:scale-110"
            >
              <ChevronLeft size={20} />
            </button>
            
            <button
              onClick={goToNext}
              disabled={currentIndex >= maxIndex}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/90 backdrop-blur-sm shadow-lg border border-slate-200/60 text-slate-700 hover:bg-white hover:text-slate-900 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 hover:scale-110"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>

      {/* Dots indicator */}
      {showDots && items.length > itemsPerView && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                currentIndex === index
                  ? 'bg-blue-500 scale-125 shadow-md'
                  : 'bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
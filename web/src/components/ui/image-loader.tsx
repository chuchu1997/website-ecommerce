"use client";
import React, { useState, useRef, useEffect } from 'react';
import Image from "next/image";
import { ImageLoaderInterface } from '@/types/image';
import { cn } from '@/lib/utils';

// Generate inline SVG placeholder
const generatePlaceholder = (width: number = 300, height: number = 128, text?: string) => {
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#e5e7eb"/>
      <g transform="translate(${width/2}, ${height/2})">
        <circle r="16" fill="#9ca3af" opacity="0.5"/>
        <path d="M-8,-4 L-4,-8 L4,0 L8,-4 L8,8 L-8,8 Z" fill="#6b7280"/>
      </g>
      ${text ? `<text x="50%" y="85%" text-anchor="middle" fill="#6b7280" font-family="Arial, sans-serif" font-size="12">${text}</text>` : ''}
    </svg>
  `;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
};

export const ImageLoader: React.FC<ImageLoaderInterface> = ({
  src,
  alt,
  width,
  height,
  className,
  skeletonClassName = "w-full h-full",
  fadeInDuration = 300,
  showShimmer = true,
  fallbackSrc = null,
  onLoad = null,
  onError = null,
  fill = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  quality = 75,
  priority = false,
  ...props
}) => {
  const [imageState, setImageState] = useState<'loading' | 'loaded' | 'error'>('loading');
  const [imageSrc, setImageSrc] = useState(src);
  const [hasTriedFallback, setHasTriedFallback] = useState(false);

  // Debug logging
  const isDebugMode = process.env.NODE_ENV === 'development';

  useEffect(() => {
  
    setImageState('loading');
    setImageSrc(src);
    setHasTriedFallback(false);
  }, [src, isDebugMode]);

  const handleImageLoad = () => {
 
    setImageState('loaded');
    if (onLoad) onLoad();
  };

  const handleImageError = () => {
   
    // Try fallback if available and not already tried
    if (fallbackSrc && !hasTriedFallback && imageSrc !== fallbackSrc) {
  
      setImageSrc(fallbackSrc);
      setHasTriedFallback(true);
      return;
    }

    // No fallback or fallback also failed
    setImageState('error');
    if (onError) onError();
  };

  // Generate default fallback if none provided
  const defaultFallback = !fallbackSrc ? generatePlaceholder(
    fill ? 300 : (width || 300), 
    fill ? 128 : (height || 128), 
    'No Image'
  ) : fallbackSrc;
// object-cover group-hover/item:scale-110 transition-transform duration-500



//   const baseImageClasses = `object-cover group-hover/item:scale-110 transition-transform transition-opacity duration-${fadeInDuration} ${className}`;
//   const skeletonBaseClasses = `animate-pulse bg-gray-200 ${skeletonClassName || className}`;
//   const shimmerClasses = showShimmer 
//     ? "relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent" 
//     : "";



  const mergedImageClasses = 
    cn(
      `transition-opacity duration-${fadeInDuration}`,
      'object-center',
      'object-cover', // default base
      'group-hover/item:scale-110 transition-transform transition-opacity',
      className // override từ props
    )
  

  const mergedSkeletonClasses = 
    cn(
      'animate-pulse bg-gray-200',
      skeletonClassName || className
    )


  const shimmerWrapperClasses = cn(
    showShimmer && 'relative overflow-hidden',
    showShimmer &&
      'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent'
  );




  // When using fill, the container must be positioned
  const containerClasses = fill ? "relative w-full h-full" : "";

  return (
    <div className={containerClasses}>
      {/* Skeleton/Loading State */}
      {imageState === 'loading' && (
        <div className={`${mergedSkeletonClasses} ${shimmerWrapperClasses} flex items-center justify-center`}>
          <svg 
            className="w-8 h-8 text-gray-400" 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path 
              fillRule="evenodd" 
              d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" 
              clipRule="evenodd" 
            />
          </svg>
        </div>
      )}

      {/* Error State - Show generated placeholder */}
      {imageState === 'error' && (
        <div className={`${mergedSkeletonClasses} flex items-center justify-center`}>
          <Image
            src={defaultFallback}
            alt={`${alt} (placeholder)`}
            width={fill ? undefined : width}
            height={fill ? undefined : height}
            fill={fill}
            className={className}
            priority={priority}
          />
        </div>
      )}

      {/* Next.js Image */}
      <Image
        src={imageSrc}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        sizes={sizes}
        quality={quality}
        priority={priority}
        className={`${mergedImageClasses} ${
          imageState === 'loaded' ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={handleImageLoad}
        onError={handleImageError}
        {...props}
      />

      {/* Add shimmer keyframe styles */}
      <style jsx>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
};
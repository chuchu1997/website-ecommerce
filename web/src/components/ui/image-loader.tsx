"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { ImageLoaderInterface } from "@/types/image";
import { cn } from "@/lib/utils";

// Generate inline SVG placeholder matching image size
const generatePlaceholder = (
  width: number = 1200,
  height: number = 600,
  text?: string
) => {
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <rect width="100%" height="100%" fill="#e5e7eb"/>
      <text x="50%" y="50%" text-anchor="middle" fill="#9ca3af" font-size="24" font-family="Arial" dy=".3em">
        ${text || "Loading..."}
      </text>
    </svg>
  `;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
};

// Generate low quality placeholder for progressive loading
const generateLowQualityPlaceholder = (
  width: number = 1200,
  height: number = 600
) => {
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#f3f4f6;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#e5e7eb;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)"/>
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
  const [imageState, setImageState] = useState<"loading" | "loaded" | "error">(
    "loading"
  );
  const [imageSrc, setImageSrc] = useState(src);
  const [hasTriedFallback, setHasTriedFallback] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(priority); // Initialize based on priority
  const [showLowQuality, setShowLowQuality] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Ensure component is mounted before using intersection observer
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Custom image loader to handle cache issues
  const customImageLoader = useCallback(({ src, width, quality }: { src: string; width: number; quality?: number }) => {
    if (!src || src.startsWith('data:')) return src;
    
    try {
      const url = new URL(src);
      url.searchParams.set('w', width.toString());
      if (quality) {
        url.searchParams.set('q', quality.toString());
      }
      // Add cache-busting for development or when specifically needed
      if (process.env.NODE_ENV === 'development') {
        url.searchParams.set('cb', Date.now().toString());
      }
      return url.toString();
    } catch {
      // If URL parsing fails, return original src
      return src;
    }
  }, []);

  // Intersection Observer for lazy loading - only run on client
  useEffect(() => {
    if (!isMounted || !imgRef.current || priority || isIntersecting) {
      if (priority && !isIntersecting) {
        setIsIntersecting(true);
      }
      return;
    }

    // Clean up previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          if (observerRef.current) {
            observerRef.current.disconnect();
          }
        }
      },
      {
        rootMargin: "50px",
        threshold: 0.01, // Trigger when even 1% is visible
      }
    );

    if (imgRef.current) {
      observerRef.current.observe(imgRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [isMounted, priority, isIntersecting]);

  // Reset states when src changes
  useEffect(() => {
    if (imageSrc !== src) {
      setImageState("loading");
      setImageSrc(src);
      setHasTriedFallback(false);
      setShowLowQuality(true);
    }
  }, [src, imageSrc]);

  const handleImageLoad = useCallback(() => {
    setImageState("loaded");
    // Hide low quality after high quality loads
    const timer = setTimeout(() => setShowLowQuality(false), fadeInDuration);
    if (onLoad) onLoad();
    
    return () => clearTimeout(timer);
  }, [fadeInDuration, onLoad]);

  const handleImageError = useCallback(() => {
    console.error(`Failed to load image: ${imageSrc}`);
    
    if (fallbackSrc && !hasTriedFallback && imageSrc !== fallbackSrc) {
      console.log(`Trying fallback image: ${fallbackSrc}`);
      setImageSrc(fallbackSrc);
      setHasTriedFallback(true);
      setImageState("loading"); // Reset to loading state for fallback
      return;
    }
    
    setImageState("error");
    if (onError) onError();
  }, [imageSrc, fallbackSrc, hasTriedFallback, onError]);

  const defaultFallback = !fallbackSrc
    ? generatePlaceholder(
        fill ? 1200 : width || 1200,
        fill ? 600 : height || 600,
        "No Image"
      )
    : fallbackSrc;

  const lowQualityPlaceholder = generateLowQualityPlaceholder(
    fill ? 1200 : width || 1200,
    fill ? 600 : height || 600
  );

  const mergedImageClasses = cn(
    `transition-opacity duration-${fadeInDuration}`,
    "object-center object-cover",
    "group-hover/item:scale-110 transition-transform",
    className
  );

  const mergedSkeletonClasses = cn(
    "animate-pulse bg-gray-200",
    "absolute inset-0",
    skeletonClassName || className
  );

  const containerClasses = cn(
    "relative",
    fill ? "w-full h-full" : "",
    !fill && width && height ? `w-[${width}px] h-[${height}px]` : ""
  );

  // Don't render anything until mounted to prevent hydration issues
  if (!isMounted) {
    return (
      <div ref={imgRef} className={containerClasses}>
        <div
          className={`${mergedSkeletonClasses} flex items-center justify-center`}
          style={
            !fill && width && height
              ? { width: `${width}px`, height: `${height}px` }
              : undefined
          }
        >
          <div className="w-8 h-8 border-4 border-gray-300 border-t-amber-500 rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div ref={imgRef} className={containerClasses}>
      {/* Skeleton loading */}
      {imageState === "loading" && (
        <div
          className={`${mergedSkeletonClasses} flex items-center justify-center`}
          style={
            !fill && width && height
              ? { width: `${width}px`, height: `${height}px` }
              : undefined
          }
        >
          {/* Circle Spinner */}
          <div className="w-8 h-8 border-4 border-gray-300 border-t-amber-500 rounded-full animate-spin" />
        </div>
      )}

      {/* Low quality placeholder (loads first) */}
      {isIntersecting && showLowQuality && imageState !== "error" && (
        <div className="absolute inset-0 z-10">
          <Image
            src={lowQualityPlaceholder}
            alt={`${alt} (loading)`}
            width={fill ? undefined : width}
            height={fill ? undefined : height}
            fill={fill}
            className={cn(
              "object-cover transition-opacity duration-300",
              imageState === "loaded" ? "opacity-50" : "opacity-100"
            )}
            priority={priority}
            unoptimized={true} // Skip optimization for placeholder
          />
        </div>
      )}

      {/* High quality image */}
      {isIntersecting && imageState !== "error" && (
        <Image
          src={imageSrc}
          alt={alt}
          width={fill ? undefined : width}
          height={fill ? undefined : height}
          fill={fill}
          placeholder="blur"
          blurDataURL={lowQualityPlaceholder}
          sizes={sizes}
          quality={quality}
          priority={priority}
          loader={customImageLoader}
          className={cn(
            mergedImageClasses,
            "absolute inset-0 z-20",
            imageState === "loaded" ? "opacity-100" : "opacity-0"
          )}
          onLoad={handleImageLoad}
          onError={handleImageError}
          {...props}
        />
      )}

      {/* Fallback placeholder image */}
      {imageState === "error" && (
        <div
          className={`${mergedSkeletonClasses} flex items-center justify-center z-30`}
          style={
            !fill && width && height
              ? { width: `${width}px`, height: `${height}px` }
              : undefined
          }
        >
          <Image
            src={defaultFallback}
            alt={`${alt} (placeholder)`}
            width={fill ? undefined : width}
            height={fill ? undefined : height}
            fill={fill}
            className={cn("object-cover", fill && "absolute inset-0", className)}
            priority={priority}
            unoptimized={true} // Skip optimization for fallback
          />
        </div>
      )}

      {/* Shimmer animation keyframe */}
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
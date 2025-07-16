"use client";

import React, { useState, useEffect, useRef } from "react";
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
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [showLowQuality, setShowLowQuality] = useState(true);
  const imgRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!imgRef.current || priority) {
      setIsIntersecting(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "50px", // Start loading 50px before the image comes into view
      }
    );

    observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, [priority]);

  useEffect(() => {
    setImageState("loading");
    setImageSrc(src);
    setHasTriedFallback(false);
    setShowLowQuality(true);
  }, [src]);

  const handleImageLoad = () => {
    setImageState("loaded");
    // Hide low quality after high quality loads
    setTimeout(() => setShowLowQuality(false), fadeInDuration);
    if (onLoad) onLoad();
  };

  const handleImageError = () => {
    if (fallbackSrc && !hasTriedFallback && imageSrc !== fallbackSrc) {
      setImageSrc(fallbackSrc);
      setHasTriedFallback(true);
      return;
    }
    setImageState("error");
    if (onError) onError();
  };

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
    "absolute inset-0", // Ensure full coverage
    skeletonClassName || className
  );

  const shimmerWrapperClasses = cn(
    showShimmer && "relative overflow-hidden",
    showShimmer &&
      "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent"
  );

  const containerClasses = cn(
    "relative",
    fill ? "w-full h-full" : "",
    !fill && width && height ? `w-[${width}px] h-[${height}px]` : ""
  );

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
          />
        </div>
      )}

      {/* High quality image */}
      {isIntersecting && (
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
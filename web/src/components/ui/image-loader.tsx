"use client";

import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    setImageState("loading");
    setImageSrc(src);
    setHasTriedFallback(false);
  }, [src]);

  const handleImageLoad = () => {
    setImageState("loaded");
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

  const mergedImageClasses = cn(
    `transition-opacity duration-${fadeInDuration}`,
    "object-center object-cover",
    "group-hover/item:scale-110 transition-transform",
    className
  );

  const mergedSkeletonClasses = cn(
    "animate-pulse bg-gray-200",
    skeletonClassName || className
  );

  const shimmerWrapperClasses = cn(
    showShimmer && "relative overflow-hidden",
    showShimmer &&
      "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent"
  );

  const containerClasses = fill ? "relative w-full h-full" : "";

  return (
    <div className={containerClasses}>
      {/* Skeleton loading */}
      {imageState === "loading" && (
        <div
          className={`${mergedSkeletonClasses} ${shimmerWrapperClasses} flex items-center justify-center`}
        >
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

      {/* Fallback placeholder image */}
      {imageState === "error" && (
        <div
          className={`${mergedSkeletonClasses} flex items-center justify-center`}
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

      {/* Actual image */}
      <Image
        src={imageSrc}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        placeholder="blur"
        blurDataURL="/blur-placeholder.png"
        sizes={sizes}
        quality={quality}
        priority={priority}
        className={`${mergedImageClasses} ${
          imageState === "loaded" ? "opacity-100" : "opacity-0"
        }`}
        onLoad={handleImageLoad}
        onError={handleImageError}
        {...props}
      />

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

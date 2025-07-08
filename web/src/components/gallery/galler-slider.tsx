/** @format */

"use client";

import { Billboard } from "@/types/ProjectInterface";
import clsx from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SkeletonImage from "../skeleton/custom-skeleton";

export interface GalleryProps {
  images: Billboard[];
  autoplayInterval?: number;
  minHeight: "lg" | "md" | "sm";
  columns?: 1 | 2 | 3;
}

const getHeightClass = (minHeight: GalleryProps["minHeight"]) => {
  switch (minHeight) {
    case "lg":
      return "min-h-[300px] h-[300px] md:min-h-[500px] md:h-[500px] xl:min-h-[850px] xl:h-[850px]";
    case "md":
      return "min-h-[250px] h-[250px] md:min-h-[400px] md:h-[400px] xl:min-h-[700px] xl:h-[700px]";
    case "sm":
    default:
      return "min-h-[200px] h-[200px] md:min-h-[300px] md:h-[300px] xl:min-h-[500px] xl:h-[500px]";
  }
};

const getGridClass = (columns: number) => {
  switch (columns) {
    case 3:
      return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
    case 2:
      return "grid-cols-1 sm:grid-cols-2";
    case 1:
    default:
      return ""; // Không dùng grid khi là slider
  }
};

const GallerySlider: React.FC<GalleryProps> = ({
  images,
  autoplayInterval = 5000,
  minHeight,
  columns = 1,
}) => {
  const heightClass = getHeightClass(minHeight);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || images.length <= 1 || columns > 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, autoplayInterval);
    return () => clearInterval(timer);
  }, [images.length, autoplayInterval, isMounted, columns]);

  const goToSlide = (index: number) => setCurrentIndex(index);
  const previousSlide = () =>
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % images.length);

  // ✅ Nếu >1 cột: Hiển thị dạng grid
  if (columns > 1) {
    return (
      <div className={`grid gap-6 ${getGridClass(columns)}`}>
        {images.map((image, index) => (
          <div
            key={index}
            className={clsx(
              "relative w-full rounded-lg overflow-hidden",
              getHeightClass(minHeight)
            )}>
         
            <SkeletonImage   imageSrc={image.imageUrl} imageLabel={image.label} />
            <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-center px-4">
              <h2 className="text-white text-xl font-bold italic drop-shadow">
                {image.label || "Nội dung quảng cáo"}
              </h2>
              {image.linkHref && (
                <Link
                  href={image.linkHref}
                  className="mt-4 bg-white text-black rounded-full py-1.5 px-4 text-sm font-medium hover:bg-gray-200 transition">
                  Xem thêm
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // ✅ Nếu là 1 cột: chạy slider như cũ
  return (
    <div className="relative w-full">
      <div
        className={clsx(
          "relative w-full rounded-lg overflow-hidden",
          heightClass
        )}>
        {images.map((image, index) => (
          <div
            key={index}
            className={clsx(
              "absolute inset-0 transition-opacity duration-500",
              index === currentIndex ? "opacity-100" : "opacity-0"
            )}>
            <SkeletonImage imageSrc={image.imageUrl} imageLabel={image.label} priority = {index === 1 } />
          
            <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-center px-4">
              <h2 className="text-white text-2xl md:text-4xl font-bold italic leading-snug tracking-wide drop-shadow-md">
                {image.label || "Nội dung quảng cáo"}
              </h2>
              {image.linkHref && (
                <Link
                  href={image.linkHref}
                  className="cursor-pointer mt-[20px] bg-white text-black rounded-full py-2 px-6 font-semibold text-sm md:text-base hover:bg-gray-200 transition-colors">
                  Xem thêm
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <>
          <button
            onClick={previousSlide}
            className="absolute left-6 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors"
            aria-label="Previous slide">
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-6 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors"
            aria-label="Next slide">
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={clsx(
                  "w-2.5 h-2.5 rounded-full transition-colors",
                  index === currentIndex ? "bg-white" : "bg-white/50"
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default GallerySlider;

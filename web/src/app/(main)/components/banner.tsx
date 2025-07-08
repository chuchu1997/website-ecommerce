/** @format */

"use client";

import { useState, useEffect } from "react";

import { ImageLoader } from "@/components/ui/image-loader";
import { BannerAPI } from "@/api/banner/banner.api";
import { BannerInterface } from "@/types/banner";

const Banner = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [banners, setBanners] = useState<BannerInterface[]>([]);

  const fetchBanners = async () => {
    const response = await BannerAPI.getAllBannerFromStore();
    if (response.status === 200) {
      setBanners(response.data.banners as BannerInterface[]);
    }
  };

  useEffect(() => {
    setIsMounted(true);
    fetchBanners();
  }, []);

  useEffect(() => {
    if (banners.length === 0) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [banners]);

  if (!isMounted || banners.length === 0) {
    return (
      <section className="relative h-96 sm:h-[500px] bg-gray-100 flex items-center justify-center">
        <div className="text-center px-6">
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-500 animate-pulse">
            Đang tải banner...
          </h1>
          <p className="text-md text-gray-400 mt-2">
            Vui lòng đợi trong giây lát.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative h-96 sm:h-[500px] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent z-10"></div>

      {banners.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}>
          <ImageLoader
            src={slide.imageUrl}
            alt={slide.title || `banner-${index}`}
            fill
            priority={index === 0}
            quality={80}
          />
        </div>
      ))}

      <div className="absolute inset-0 z-20 flex items-center">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
              {banners[currentSlide]?.title}
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              {banners[currentSlide]?.description}
            </p>
            {banners[currentSlide]?.cta && (
              <a
                href={banners[currentSlide].cta.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black px-8 py-4 rounded-full text-lg font-bold shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300 transform hover:scale-105">
                {banners[currentSlide].cta.title}
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-yellow-400 w-8"
                : "bg-white/50 hover:bg-white/75"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Banner;

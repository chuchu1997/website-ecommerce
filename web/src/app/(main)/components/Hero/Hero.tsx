/** @format */
"use client";

import { useEffect, useState } from "react";
import { HeroMotion } from "./HeroMotion";
import { BannerAPI } from "@/api/banner/banner.api";
import { BannerInterface } from "@/types/banner";
import { ImageLoader } from "@/components/ui/image-loader";

export const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [banners, setBanners] = useState<BannerInterface[]>([]);

  const fetchBanners = async () => {
    const response = await BannerAPI.getAllBannerFromStore();
    if (response.status === 200) {
      setBanners(response.data.banners as BannerInterface[]);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  useEffect(() => {
    if (banners.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [banners]);

  if (banners.length === 0) {
    return null;

    return (
      <section className="relative h-screen flex items-center justify-center bg-gray-100">
        {/* <div className="absolute inset-0 z-0">
          <ImageLoader
            fill
            priority
            quality={60}
            src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1920&h=1080&fit=crop"
            alt="Beautiful wooden furniture"
            className="w-full h-full"
            style={{ objectFit: "cover" }}
          />
          <div className="absolute inset-0 bg-black/40 z-10"></div>
        </div> */}

        {/* Loading text */}
        <div className="relative z-20 text-center text-white">
          <div className="animate-pulse">
            <h2 className="text-2xl font-semibold mb-2">Loading...</h2>
            <p className="text-gray-300">
              Please wait while we load the content
            </p>
          </div>
        </div>
      </section>
    );
  }

  const currentBanner = banners[currentSlide];

  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <ImageLoader
          src={currentBanner.imageUrl}
          alt={currentBanner.title || "banner"}
          fill
          priority={currentSlide === 0}
          quality={90}
          className="w-full h-full"
          style={{ objectFit: "cover" }}
          sizes="100vw"
          fadeInDuration={500}
          showShimmer={true}
          skeletonClassName="bg-gray-800"
        />
        <div className="absolute inset-0 bg-black/30 z-40" />
      </div>

      {/* Text and CTA */}
      <div className="relative z-20 text-center text-white max-w-4xl mx-auto px-4">
        <HeroMotion
        // mainTitle={currentBanner.title || "Máy xây dựng mới "}
        // subTitle={currentBanner.description || "Sản phẩm tiêu chuẩn"}
        // action={currentBanner.cta?.title || "Khám phá"}
        // link={currentBanner.cta?.link}
        />
      </div>

      {/* Dot navigation */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex space-x-3">
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

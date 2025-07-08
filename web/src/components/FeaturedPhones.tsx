'use client'
import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const phones = [
  {
    name: "iPhone 16 Pro Max 256GB",
    price: "31.290.000đ",
    oldPrice: "34.990.000đ",
    discount: "Giảm 11%",
    memberDiscount: "313.000đ",
    studentDiscount: "",
    imageUrl: "/images/iphone16.jpg",
    rating: 5,
  },
  {
    name: "Samsung Galaxy S25 Ultra 12GB 256GB",
    price: "28.490.000đ",
    oldPrice: "33.990.000đ",
    discount: "Giảm 16%",
    memberDiscount: "285.000đ",
    studentDiscount: "600.000đ",
    imageUrl: "/images/galaxy-s25-ultra.jpg",
    rating: 5,
  },
  {
    name: "Xiaomi Redmi Note 14 6GB 128GB",
    price: "4.990.000đ",
    oldPrice: "4.990.000đ",
    discount: "",
    memberDiscount: "47.000đ",
    studentDiscount: "235.000đ",
    imageUrl: "/images/redmi-note-14.jpg",
    rating: 5,
  },
  {
    name: "Xiaomi 15 5G 12GB 256GB",
    price: "21.990.000đ",
    oldPrice: "24.990.000đ",
    discount: "Giảm 12%",
    memberDiscount: "300.000đ",
    studentDiscount: "",
    imageUrl: "/images/xiaomi-15.jpg",
    rating: 5,
  },
  {
    name: "Samsung Galaxy S25 256GB",
    price: "19.990.000đ",
    oldPrice: "22.990.000đ",
    discount: "Giảm 13%",
    memberDiscount: "200.000đ",
    studentDiscount: "600.000đ",
    imageUrl: "/images/galaxy-s25.jpg",
    rating: 5,
  },
  {
    name: "Samsung Galaxy S25 256GB 111",
    price: "19.990.000đ",
    oldPrice: "22.990.000đ",
    discount: "Giảm 13%",
    memberDiscount: "200.000đ",
    studentDiscount: "600.000đ",
    imageUrl: "/images/galaxy-s25.jpg",
    rating: 5,
  },
];

export const FeaturedPhones = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    window.addEventListener('resize', checkScrollButtons);
    return () => window.removeEventListener('resize', checkScrollButtons);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const width = window.innerWidth;
      let itemsPerView = 2; // mobile default

      if (width >= 1536) { // 2xl breakpoint
        itemsPerView = 5;
      } else if (width >= 1024) { // lg breakpoint
        itemsPerView = 4;
      } else if (width >= 768) { // md breakpoint
        itemsPerView = 3;
      }

      const cardWidth = sliderRef.current.offsetWidth / itemsPerView;
      const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setTimeout(checkScrollButtons, 300);
    }
  };

  return (
    <section className="relative container mx-auto py-8 px-4">
      <h2 className="text-2xl font-bold mb-6">ĐIỆN THOẠI NỔI BẬT NHẤT</h2>
      
      {/* Slider Controls */}
      <div className="absolute top-1/2 -translate-y-1/2 left-2 right-2 z-20 pointer-events-none">
        <div className="flex justify-between">
          <button 
            onClick={() => scroll('left')}
            className={`pointer-events-auto p-2 rounded-full bg-white/90 shadow-lg hover:bg-gray-100 transition-opacity ${
              !canScrollLeft ? 'opacity-0' : 'opacity-100'
            }`}
            disabled={!canScrollLeft}
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button 
            onClick={() => scroll('right')}
            className={`pointer-events-auto p-2 rounded-full bg-white/90 shadow-lg hover:bg-gray-100 transition-opacity ${
              !canScrollRight ? 'opacity-0' : 'opacity-100'
            }`}
            disabled={!canScrollRight}
            aria-label="Next"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Phone Cards Slider */}
      <div 
        ref={sliderRef}
        className="flex gap-4 overflow-x-hidden scroll-smooth relative z-10"
        onScroll={checkScrollButtons}
      >
        {phones.map((phone, index) => (
          <div 
            key={index} 
            className="w-[calc(50%-8px)] md:w-[calc(33.333%-12px)] lg:w-[calc(25%-12px)] 2xl:w-[calc(20%-16px)] flex-shrink-0" // 2 items on mobile, 5 on desktop
          >
            <div className="border rounded-lg p-4 h-full">
              <div className="relative h-40 md:h-44 lg:h-48 mb-4">
                <Image 
                  src={phone.imageUrl} 
                  alt={phone.name} 
                  fill
                  className="object-cover rounded-md"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                  priority={index < 2}
                />
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold line-clamp-2">{phone.name}</h3>
                <div className="text-red-500 font-bold">{phone.price}</div>
                {phone.oldPrice && (
                  <div className="text-gray-500 line-through text-sm">{phone.oldPrice}</div>
                )}
                {phone.discount && (
                  <div className="text-green-500 text-sm">{phone.discount}</div>
                )}
                <div className="text-gray-500 text-sm">
                  Member giảm thêm {phone.memberDiscount}
                </div>
                {phone.studentDiscount && (
                  <div className="text-gray-500 text-sm">
                    S-Student giảm thêm {phone.studentDiscount}
                  </div>
                )}
                <div className="flex">
                  {Array.from({ length: phone.rating }).map((_, i) => (
                    <span key={i} className="text-yellow-500">★</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// 'use client'
// import React, { useRef, useState, useEffect } from 'react';
// import Image from 'next/image';
// import { ChevronLeft, ChevronRight } from 'lucide-react';
// import { ProductInterface } from '@/types/ProjectInterface';
// import Link from 'next/link';

// interface SliderWithProductsProps { 
//     title?:string;
//     products:ProductInterface[]
// }

// const SliderWithProducts = ({
//     title = "ĐIỆN THOẠI NỔI BẬT NHẤT",
//     products
// }:SliderWithProductsProps) => {
//   const sliderRef = useRef<HTMLDivElement>(null);
//   const [canScrollLeft, setCanScrollLeft] = useState(false);
//   const [canScrollRight, setCanScrollRight] = useState(true);
//   const [touchStart, setTouchStart] = useState<number | null>(null);
//   const [touchEnd, setTouchEnd] = useState<number | null>(null);
  
//   // Minimum swipe distance (in px)
//   const minSwipeDistance = 50;

//   const checkScrollButtons = () => {
//     if (sliderRef.current) {
//       const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
//       setCanScrollLeft(scrollLeft > 0);
//       setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
//     }
//   };

//   useEffect(() => {
//     checkScrollButtons();
//     window.addEventListener('resize', checkScrollButtons);
//     return () => window.removeEventListener('resize', checkScrollButtons);
//   }, []);

//   const scroll = (direction: 'left' | 'right') => {
//     if (sliderRef.current) {
//       const width = window.innerWidth;
//       let itemsPerView = 2; // mobile default

//       if (width >= 1536) { // 2xl breakpoint
//         itemsPerView = 5;
//       } else if (width >= 1024) { // lg breakpoint
//         itemsPerView = 4;
//       } else if (width >= 768) { // md breakpoint
//         itemsPerView = 3;
//       }

//       const cardWidth = sliderRef.current.offsetWidth / itemsPerView;
//       const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
//       sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
//       setTimeout(checkScrollButtons, 300);
//     }
//   };

//   // Touch event handlers
//   const onTouchStart = (e: React.TouchEvent) => {
//     setTouchEnd(null);
//     setTouchStart(e.targetTouches[0].clientX);
//   };

//   const onTouchMove = (e: React.TouchEvent) => {
//     setTouchEnd(e.targetTouches[0].clientX);
//   };

//   const onTouchEnd = () => {
//     if (!touchStart || !touchEnd) return;
    
//     const distance = touchStart - touchEnd;
//     const isLeftSwipe = distance > minSwipeDistance;
//     const isRightSwipe = distance < -minSwipeDistance;
    
//     if (isLeftSwipe && canScrollRight) {
//       scroll('right');
//     } else if (isRightSwipe && canScrollLeft) {
//       scroll('left');
//     }
//   };

//   return (
//     <div className="relative container mx-auto py-8 px-4 ">
//       <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 md:mb-6">
//         {title}
//       </h2>
      
//       {/* Slider Controls */}
//       <div className="absolute top-1/2 -translate-y-1/2 left-2 right-2 z-20 pointer-events-none">
//         <div className="flex justify-between">
//           <button 
//             onClick={() => scroll('left')}
//             className={`pointer-events-auto p-2 rounded-full bg-white/90 shadow-lg hover:bg-gray-100 transition-opacity ${
//               !canScrollLeft ? 'opacity-0' : 'opacity-100'
//             }`}
//             disabled={!canScrollLeft}
//             aria-label="Previous"
//           >
//             <ChevronLeft className="w-6 h-6" />
//           </button>
          
//           <button 
//             onClick={() => scroll('right')}
//             className={`pointer-events-auto p-2 rounded-full bg-white/90 shadow-lg hover:bg-gray-100 transition-opacity ${
//               !canScrollRight ? 'opacity-0' : 'opacity-100'
//             }`}
//             disabled={!canScrollRight}
//             aria-label="Next"
//           >
//             <ChevronRight className="w-6 h-6" />
//           </button>
//         </div>
//       </div>

//       {/* Phone Cards Slider with touch events */}
//       <div 
//         ref={sliderRef}
//         className="flex gap-4 overflow-x-hidden scroll-smooth relative z-10"
//         onScroll={checkScrollButtons}
//         onTouchStart={onTouchStart}
//         onTouchMove={onTouchMove}
//         onTouchEnd={onTouchEnd}
//       >
//         {products.map((phone, index) => (
//           <Link
//           target='_blank'
//             href={phone.href ?? '/'}
//             key={index} 
//             className="w-[calc(50%-8px)] md:w-[calc(33.333%-12px)] lg:w-[calc(25%-12px)] 2xl:w-[calc(20%-16px)] flex-shrink-0 cursor-pointer" // 2 items on mobile, 5 on desktop
//           >
//             <div className="border rounded-lg p-3 md:p-4 h-full">
//               <div className="relative h-40 md:h-44 lg:h-48 mb-3 md:mb-4">
//                 <Image 
//                   src={phone.imageUrl!} 
//                   alt={phone.name} 
//                   fill
//                   className="object-contain rounded-md"
//                   sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
//                   priority={index < 2}
//                 />
//               </div>
//               <div className="space-y-1 md:space-y-2">
//                 <h3 className="text-sm md:text-base lg:text-lg font-semibold line-clamp-2">
//                   {phone.name}
//                 </h3>
//                 <div className="text-base md:text-lg lg:text-xl font-bold text-red-500">
//                   {phone.price ?? 'Liên hệ'}
//                 </div>
//                 {phone.oldPrice && (
//                   <div className="text-xs md:text-sm text-gray-500 line-through">
//                     {phone.oldPrice}
//                   </div>
//                 )}
//                 {phone.discount && (
//                   <div className="text-xs md:text-sm text-green-500">
//                     {phone.discount}
//                   </div>
//                 )}
//                 <div className="text-xs md:text-sm text-gray-500">
//                   Member giảm thêm {phone.memberDiscount}
//                 </div>
//                 {phone.studentDiscount && (
//                   <div className="text-xs md:text-sm text-gray-500">
//                     S-Student giảm thêm {phone.studentDiscount}
//                   </div>
//                 )}
//                 <div className="flex text-sm md:text-base">
//                   {Array.from({ length: phone.rating ?? 5  }).map((_, i) => (
//                     <span key={i} className="text-yellow-500">★</span>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };


// export default SliderWithProducts
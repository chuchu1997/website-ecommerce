"use client";
import { motion } from "framer-motion";
import { BrandInterface } from "@/types/brands";
import { ImageLoader } from "@/components/ui/image-loader";
import { useEffect, useState } from "react";

interface Props {
  brands: BrandInterface[];
  industry: string;
}

export const PartnerBrandsMotion: React.FC<Props> = ({ brands, industry }) => {
  const [isMounted, setIsMounted] = useState(false);
  
  // Create multiple rows for different scroll speeds
  const duplicatedBrands = [...brands, ...brands, ...brands];
  const animationDuration = 60; // Slower, more elegant scrolling

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 40,
      scale: 0.9 
    },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        duration: 1, 
        ease: [0.4, 0, 0.2, 1] 
      },
    },
  };

  const floatingVariants = {
    animate: {
      y: [-6, 6, -6],
      rotate: [0, 0.5, -0.5, 0],
      transition: {
        duration: 12,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-gradient-to-br from-stone-50 via-gray-50 to-stone-100">
      {/* Dynamic Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated background elements */}
        <motion.div 
          variants={floatingVariants}
          animate="animate"
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-amber-200/10 to-yellow-300/15 rounded-full blur-3xl"
        />
        <motion.div 
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: "4s" }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-stone-200/10 to-gray-300/15 rounded-full blur-3xl"
        />
        <motion.div 
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: "8s" }}
          className="absolute top-1/3 left-1/2 w-64 h-64 bg-gradient-to-bl from-amber-300/8 to-orange-400/12 rounded-full blur-2xl"
        />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(120,113,108,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(120,113,108,0.03)_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Hero Header */}
          <motion.div variants={itemVariants} className="text-center mb-20 lg:mb-28">
            {/* Floating icon with enhanced design */}
            <motion.div 
              className="inline-flex items-center justify-center w-24 h-24 lg:w-28 lg:h-28 mb-10"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full blur-xl opacity-30" />
                <div className="relative bg-gradient-to-r from-amber-500 to-yellow-600 rounded-full p-6 lg:p-7 shadow-2xl border border-amber-300/30">
                  <span className="text-4xl lg:text-5xl">🤝</span>
                </div>
              </div>
            </motion.div>

            {/* Main title */}
            <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-6 lg:mb-8 flex items-center justify-center gap-x-2 leading-[0.9] tracking-tight">
              <span className="block bg-gradient-to-r from-stone-700 via-gray-800 to-stone-700 bg-clip-text text-transparent py-2">
                Đối Tác
              </span>
              <span className="block bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700 bg-clip-text text-transparent py-2">
                Tin Cậy
              </span>
            </h1>

            {/* Description */}
            <motion.p 
              variants={itemVariants}
              className="text-base sm:text-lg lg:text-xl xl:text-2xl text-stone-600 max-w-4xl mx-auto leading-relaxed font-light"
            >
              Hợp tác cùng các thương hiệu hàng đầu trong ngành {industry}
            </motion.p>

            {/* Animated divider */}
            <motion.div 
              variants={itemVariants}
              className="flex items-center justify-center mt-10 lg:mt-12"
            >
              <div className="flex items-center space-x-4">
                <motion.div 
                  className="w-20 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent"
                  animate={{ scaleX: [0, 1, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                <div className="flex space-x-2">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-2.5 h-2.5 bg-amber-500 rounded-full"
                      animate={{ 
                        scale: [1, 1.4, 1],
                        opacity: [0.4, 1, 0.4] 
                      }}
                      transition={{ 
                        duration: 2.5, 
                        repeat: Infinity,
                        delay: i * 0.4 
                      }}
                    />
                  ))}
                </div>
                <motion.div 
                  className="w-20 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent"
                  animate={{ scaleX: [0, 1, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 2 }}
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Multi-directional Brand Carousel */}
          <motion.div variants={itemVariants} className="space-y-8 lg:space-y-12">
            {/* First Row - Left to Right */}
            <div className="relative overflow-hidden">
              <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-stone-50 via-stone-50/80 to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-stone-50 via-stone-50/80 to-transparent z-10 pointer-events-none" />
              
              <motion.div
                className="flex items-center gap-8 lg:gap-12"
                animate={{
                  x: ["0%", `-${50}%`],
                }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: animationDuration,
                    ease: "linear",
                  },
                }}
                style={{ width: `${duplicatedBrands.length * 280}px` }}
              >
                {duplicatedBrands.map((brand, index) => (
                  <motion.div
                    key={`row1-${brand.id}-${index}`}
                    className="flex-shrink-0 group"
                    whileHover={{ scale: 1.05, y: -8 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <div className="relative w-56 h-36 lg:w-64 lg:h-40">
                      {/* Glow effect */}
                      <div className="absolute -inset-2 bg-gradient-to-r from-amber-400/15 to-yellow-500/15 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500" />
                      
                      {/* Main card */}
                      <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl border border-stone-200/50 hover:border-amber-300/50 transition-all duration-500 overflow-hidden h-full flex items-center justify-center p-6 shadow-lg hover:shadow-xl">
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                        
                        <div className="relative z-10 w-full h-full">
                          <ImageLoader
                            src={brand.imageUrl}
                            alt={brand.name}
                            fill
                            className="object-contain filter brightness-95 group-hover:brightness-105 transition-all duration-500"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Second Row - Right to Left (reverse) */}
            <div className="relative overflow-hidden">
              <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-stone-50 via-stone-50/80 to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-stone-50 via-stone-50/80 to-transparent z-10 pointer-events-none" />
              
              <motion.div
                className="flex items-center gap-8 lg:gap-12"
                animate={{
                  x: [`-${50}%`, "0%"],
                }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: animationDuration * 0.8, // Slightly different speed
                    ease: "linear",
                  },
                }}
                style={{ width: `${duplicatedBrands.length * 280}px` }}
              >
                {duplicatedBrands.reverse().map((brand, index) => (
                  <motion.div
                    key={`row2-${brand.id}-${index}`}
                    className="flex-shrink-0 group"
                    whileHover={{ scale: 1.05, y: -8 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <div className="relative w-56 h-36 lg:w-64 lg:h-40">
                      {/* Glow effect */}
                      <div className="absolute -inset-2 bg-gradient-to-r from-stone-400/15 to-amber-500/15 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500" />
                      
                      {/* Main card */}
                      <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl border border-stone-200/50 hover:border-stone-300/50 transition-all duration-500 overflow-hidden h-full flex items-center justify-center p-6 shadow-lg hover:shadow-xl">
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                        
                        <div className="relative z-10 w-full h-full">
                          <ImageLoader
                            src={brand.imageUrl}
                            alt={brand.name}
                            fill
                            className="object-contain filter brightness-95 group-hover:brightness-105 transition-all duration-500"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Enhanced Stats Badge */}
          <motion.div variants={itemVariants} className="flex justify-center mt-20 lg:mt-24">
            <div className="relative group">
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full blur opacity-20 group-hover:opacity-30 transition duration-500" />
              
              <div className="relative bg-white/90 backdrop-blur-xl rounded-full border border-amber-300/40 shadow-xl px-8 py-5 lg:px-12 lg:py-6">
                <div className="flex items-center gap-4">
                  {/* Animated status indicator */}
                  <div className="flex items-center gap-2">
                    <motion.div 
                      className="w-3 h-3 bg-emerald-500 rounded-full"
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.7, 1, 0.7] 
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <div className="w-2 h-2 bg-emerald-400/60 rounded-full animate-pulse" />
                  </div>
                  
                  <span className="text-lg lg:text-xl text-stone-700 font-medium">
                    Tin cậy bởi <span className="font-bold text-amber-600">{brands.length}+</span> thương hiệu hàng đầu
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
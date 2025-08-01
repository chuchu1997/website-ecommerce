'use client';

import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

interface Props {
  industry: string;
}

export const InteriorContent: React.FC<Props> = ({ industry }) => {
  const [isMounted, setIsMounted] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1]
      },
    },
  };

  // Simplified floating animation - less intensive
  const floatingVariants = {
    animate: {
      y: [-8, 8, -8],
      transition: {
        duration: 12,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Optimized subtle floating for background elements
  const subtleFloatVariants = {
    animate: {
      y: [-15, 15, -15],
      x: [-10, 10, -10],
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const services = [
    {
      title: 'Phân Phối Máy Móc Công Trình',
      description:
        'Cung cấp các dòng máy xây dựng chất lượng cao như máy xúc, máy ủi, máy trộn bê tông... từ các thương hiệu uy tín.',
      icon: '🚜',
      gradient: 'from-amber-500 to-yellow-600',
      hoverGradient: 'from-amber-600 to-yellow-700',
    },
    {
      title: 'Bảo Trì & Sửa Chữa Nhanh Chóng',
      description:
        'Dịch vụ bảo dưỡng và sửa chữa tận nơi, giúp máy móc hoạt động ổn định, giảm thời gian ngưng trệ thi công.',
      icon: '🔧',
      gradient: 'from-stone-400 to-gray-500',
      hoverGradient: 'from-stone-500 to-gray-600',
    },
    {
      title: 'Cho Thuê Máy Xây Dựng',
      description:
        'Giải pháp thuê máy xây dựng linh hoạt theo ngày, tuần hoặc dự án. Tiết kiệm chi phí đầu tư ban đầu.',
      icon: '📦',
      gradient: 'from-amber-600 to-orange-700',
      hoverGradient: 'from-amber-700 to-orange-800',
    },
  ];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-gradient-to-br from-stone-50 via-gray-50 to-stone-100">
      {/* Optimized Background - Reduced elements and complexity */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Primary background elements - reduced from 5 to 3 */}
        <motion.div 
          variants={subtleFloatVariants}
          animate="animate"
          className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-amber-200/10 to-yellow-300/15 rounded-full blur-2xl will-change-transform"
        />
        <motion.div 
          variants={subtleFloatVariants}
          animate="animate"
          style={{ animationDelay: "10s" }}
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-stone-200/10 to-gray-300/15 rounded-full blur-2xl will-change-transform"
        />
        <motion.div 
          variants={subtleFloatVariants}
          animate="animate"
          style={{ animationDelay: "5s" }}
          className="absolute top-1/2 right-1/4 w-72 h-72 bg-gradient-to-bl from-amber-300/8 to-orange-400/12 rounded-full blur-xl will-change-transform"
        />
        
        {/* Simplified grid pattern - lighter and less intensive */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(120,113,108,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(120,113,108,0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Optimized Hero Header */}
          <motion.div variants={itemVariants} className="text-center mb-20 lg:mb-28">
            {/* Simplified floating icon */}
            <motion.div 
              className="inline-flex items-center justify-center w-24 h-24 lg:w-28 lg:h-28 mb-10"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full blur-lg opacity-20" />
                <div className="relative bg-gradient-to-r from-amber-500 to-yellow-600 rounded-full p-6 lg:p-7 shadow-xl border border-amber-300/20">
                  <span className="text-4xl lg:text-5xl">🏗️</span>
                </div>
              </div>
            </motion.div>

            {/* Optimized title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-6 lg:mb-8 leading-[0.9] tracking-tight">
              <span className="py-4 block bg-gradient-to-r from-stone-700 via-gray-800 to-stone-700 bg-clip-text text-transparent mb-2">
                Giải Pháp Máy Móc
              </span>
              <span className="py-4 block bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700 bg-clip-text text-transparent">
                Công Trình
              </span>
            </h1>

            <motion.p 
              variants={itemVariants}
              className="text-base sm:text-lg lg:text-xl xl:text-2xl text-stone-600 max-w-4xl mx-auto leading-relaxed font-light"
            >
              Cung cấp – bảo trì – cho thuê máy móc công trình hiện đại cho mọi dự án xây dựng tại {industry || "Việt Nam"}
            </motion.p>

            {/* Simplified animated divider */}
            <motion.div 
              variants={itemVariants}
              className="flex items-center justify-center mt-10 lg:mt-12"
            >
              <div className="flex items-center space-x-6">
                <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
                <div className="flex space-x-3">
                  <motion.div
                    className="w-3 h-3 bg-amber-500 rounded-full"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 1, 0.5] 
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <motion.div
                    className="w-3 h-3 bg-stone-400 rounded-full"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 1, 0.5] 
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity,
                      delay: 1,
                      ease: "easeInOut"
                    }}
                  />
                  <motion.div
                    className="w-3 h-3 bg-amber-600 rounded-full"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 1, 0.5] 
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity,
                      delay: 2,
                      ease: "easeInOut"
                    }}
                  />
                </div>
                <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
              </div>
            </motion.div>
          </motion.div>

          {/* Optimized Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {services.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative"
                whileHover={{ 
                  y: -8,
                  transition: { type: "spring", stiffness: 400, damping: 25 }
                }}
              >
                {/* Simplified card design */}
                <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl border border-stone-200/50 hover:border-amber-300/40 transition-all duration-300 overflow-hidden p-8 lg:p-10 shadow-lg hover:shadow-xl will-change-transform">
                  
                  {/* Icon section - simplified animation */}
                  <div className="relative z-10 mb-8">
                    <motion.div 
                      className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${item.gradient} rounded-2xl shadow-md border border-white/20 group-hover:bg-gradient-to-r group-hover:${item.hoverGradient}`}
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <span className="text-3xl lg:text-4xl">
                        {item.icon}
                      </span>
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-xl lg:text-2xl font-bold text-stone-800 mb-4 group-hover:text-stone-900 transition-colors duration-200">
                      {item.title}
                    </h3>
                    <p className="text-base lg:text-lg text-stone-600 leading-relaxed group-hover:text-stone-700 transition-colors duration-200">
                      {item.description}
                    </p>
                  </div>

                  {/* Bottom accent - simplified */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-200`} />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Optimized Stats Badge */}
          <motion.div variants={itemVariants} className="flex justify-center mt-20 lg:mt-24">
            <div className="relative group">
              <div className="relative bg-white/95 backdrop-blur-xl rounded-full border border-amber-300/30 shadow-lg hover:shadow-xl px-12 py-6 lg:px-16 lg:py-7 transition-all duration-300">
                <div className="flex items-center gap-4">
                  {/* Simplified status indicators */}
                  <div className="flex items-center gap-3">
                    <motion.div 
                      className="w-3 h-3 bg-amber-500 rounded-full"
                      animate={{ 
                        opacity: [0.7, 1, 0.7] 
                      }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <div className="w-2.5 h-2.5 bg-stone-400 rounded-full opacity-60" />
                    <div className="w-2 h-2 bg-amber-600 rounded-full opacity-50" />
                  </div>
                  
                  <span className="text-lg lg:text-xl text-stone-700 font-medium">
                    Phục vụ <span className="font-bold text-amber-600">500+</span> dự án xây dựng
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
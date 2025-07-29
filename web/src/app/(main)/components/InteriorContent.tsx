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
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.9,
      rotateX: -10
    },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.4, 0, 0.2, 1] 
      },
    },
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [0, 2, -2, 0],
      scale: [1, 1.05, 1],
      transition: {
        duration: 18,
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
      gradient: 'from-amber-500 to-orange-600',
      glowColor: 'amber-500/20',
    },
    {
      title: 'Bảo Trì & Sửa Chữa Nhanh Chóng',
      description:
        'Dịch vụ bảo dưỡng và sửa chữa tận nơi, giúp máy móc hoạt động ổn định, giảm thời gian ngưng trệ thi công.',
      icon: '🔧',
      gradient: 'from-blue-500 to-indigo-600',
      glowColor: 'blue-500/20',
    },
    {
      title: 'Cho Thuê Máy Xây Dựng',
      description:
        'Giải pháp thuê máy xây dựng linh hoạt theo ngày, tuần hoặc dự án. Tiết kiệm chi phí đầu tư ban đầu.',
      icon: '📦',
      gradient: 'from-rose-500 to-red-600',
      glowColor: 'rose-500/20',
    },
  ];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900">
      {/* Enhanced Dynamic Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Primary animated background elements */}
        <motion.div 
          variants={floatingVariants}
          animate="animate"
          className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-amber-500/12 to-orange-600/12 rounded-full blur-3xl"
        />
        <motion.div 
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: "6s" }}
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-500/12 to-indigo-600/12 rounded-full blur-3xl"
        />
        <motion.div 
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: "12s" }}
          className="absolute top-1/2 right-1/4 w-72 h-72 bg-gradient-to-bl from-rose-500/10 to-red-600/10 rounded-full blur-2xl"
        />
        
        {/* Secondary floating elements */}
        <motion.div 
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: "3s" }}
          className="absolute top-1/4 left-1/3 w-64 h-64 bg-gradient-to-r from-purple-500/8 to-pink-500/8 rounded-full blur-2xl"
        />
        <motion.div 
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: "9s" }}
          className="absolute bottom-1/3 right-1/3 w-56 h-56 bg-gradient-to-l from-green-500/8 to-emerald-500/8 rounded-full blur-xl"
        />
        
        {/* Sophisticated grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />
        
        {/* Animated circuit-like pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(245, 158, 11, 0.1)" />
              <stop offset="30%" stopColor="rgba(59, 130, 246, 0.15)" />
              <stop offset="70%" stopColor="rgba(244, 63, 94, 0.1)" />
              <stop offset="100%" stopColor="rgba(245, 158, 11, 0.1)" />
            </linearGradient>
          </defs>
          <motion.path
            d="M0,200 L200,200 L200,400 L600,400 L600,100 L1000,100"
            stroke="url(#circuitGradient)"
            strokeWidth="1"
            fill="none"
            strokeDasharray="5,5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.5 }}
            transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
          />
          <motion.path
            d="M100,600 L400,600 L400,300 L800,300 L800,500 L1200,500"
            stroke="url(#circuitGradient)"
            strokeWidth="1"
            fill="none"
            strokeDasharray="3,7"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.3 }}
            transition={{ duration: 5, repeat: Infinity, repeatType: "reverse", delay: 1 }}
          />
        </svg>

        {/* Subtle noise texture */}
        {/* <div className="absolute inset-0 opacity-[0.015] bg-[url('data:image/svg+xml,%3Csvg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noiseFilter)"/%3E%3C/svg%3E')]" /> */}
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Enhanced Hero Header */}
          <motion.div variants={itemVariants} className="text-center mb-20 lg:mb-28">
            {/* Floating icon with sophisticated design */}
            <motion.div 
              className="inline-flex items-center justify-center w-24 h-24 lg:w-28 lg:h-28 mb-10"
              whileHover={{ scale: 1.15, rotate: 8 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full blur-xl opacity-60" />
                <div className="relative bg-gradient-to-r from-amber-500 to-orange-600 rounded-full p-6 lg:p-7 shadow-2xl border border-white/10">
                  <span className="text-4xl lg:text-5xl">🏗️</span>
                </div>
              </div>
            </motion.div>

            {/* Main title with enhanced styling */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-6 lg:mb-8 leading-[0.9] tracking-tight">
              <span className="py-4 block bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent mb-2">
                Giải Pháp Máy Móc
              </span>
              <span className="py-4 block bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                Công Trình
              </span>
            </h1>

            {/* Enhanced description */}
            <motion.p 
              variants={itemVariants}
              className="text-base sm:text-lg lg:text-xl xl:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light"
            >
              Cung cấp – bảo trì – cho thuê máy móc công trình hiện đại cho mọi dự án xây dựng tại {industry || "Việt Nam"}
            </motion.p>

            {/* Enhanced animated divider */}
            <motion.div 
              variants={itemVariants}
              className="flex items-center justify-center mt-10 lg:mt-12"
            >
              <div className="flex items-center space-x-6">
                <motion.div 
                  className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent"
                  animate={{ scaleX: [0, 1, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                <div className="flex space-x-3">
                  <motion.div
                    className="w-3 h-3 bg-amber-400 rounded-full"
                    animate={{ 
                      scale: [1, 1.4, 1],
                      opacity: [0.4, 1, 0.4] 
                    }}
                    transition={{ 
                      duration: 2.5, 
                      repeat: Infinity,
                      delay: 0
                    }}
                  />
                  <motion.div
                    className="w-3 h-3 bg-blue-400 rounded-full"
                    animate={{ 
                      scale: [1, 1.4, 1],
                      opacity: [0.4, 1, 0.4] 
                    }}
                    transition={{ 
                      duration: 2.5, 
                      repeat: Infinity,
                      delay: 0.5
                    }}
                  />
                  <motion.div
                    className="w-3 h-3 bg-rose-400 rounded-full"
                    animate={{ 
                      scale: [1, 1.4, 1],
                      opacity: [0.4, 1, 0.4] 
                    }}
                    transition={{ 
                      duration: 2.5, 
                      repeat: Infinity,
                      delay: 1
                    }}
                  />
                </div>
                <motion.div 
                  className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent"
                  animate={{ scaleX: [0, 1, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 2 }}
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Enhanced Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {services.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative"
                whileHover={{ 
                  y: -15, 
                  scale: 1.02,
                  rotateX: 5 
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {/* Enhanced glow effect */}
                <div className={`absolute -inset-3 bg-gradient-to-r from-${item.glowColor} to-${item.glowColor} rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500`} />
                
                {/* Main card */}
                <div className="relative bg-white/8 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-500 overflow-hidden p-8 lg:p-10">
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  
                  {/* Icon section */}
                  <div className="relative z-10 mb-8">
                    <motion.div 
                      className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${item.gradient} rounded-2xl shadow-lg`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <span className="text-3xl lg:text-4xl filter drop-shadow-sm">
                        {item.icon}
                      </span>
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-xl lg:text-2xl font-bold text-white mb-4 group-hover:text-gray-100 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-base lg:text-lg text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors">
                      {item.description}
                    </p>
                  </div>

                  {/* Bottom accent line */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Enhanced Stats Badge */}
          <motion.div variants={itemVariants} className="flex justify-center mt-20 lg:mt-24">
            <div className="relative group">
              {/* Multi-layer glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 rounded-full blur opacity-40 group-hover:opacity-60 transition duration-500" />
              
              <div className="relative bg-white/10 backdrop-blur-xl rounded-full border border-white/20 shadow-2xl px-12 py-6 lg:px-16 lg:py-7">
                <div className="flex items-center gap-4">
                  {/* Animated status indicators */}
                  <div className="flex items-center gap-3">
                    <motion.div 
                      className="w-3 h-3 bg-amber-400 rounded-full"
                      animate={{ 
                        scale: [1, 1.3, 1],
                        opacity: [0.7, 1, 0.7] 
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <motion.div 
                      className="w-2.5 h-2.5 bg-blue-400 rounded-full"
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 1, 0.5] 
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    />
                    <motion.div 
                      className="w-2 h-2 bg-rose-400 rounded-full"
                      animate={{ 
                        scale: [1, 1.1, 1],
                        opacity: [0.4, 1, 0.4] 
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                    />
                  </div>
                  
                  <span className="text-lg lg:text-xl text-white/90 font-medium">
                    Phục vụ <span className="font-bold text-amber-300">500+</span> dự án xây dựng
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
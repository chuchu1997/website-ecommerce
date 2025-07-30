"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { NewsInterface } from "@/types/news";
import { NewsCard } from "@/components/ui/NewsCard";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Props {
  news: NewsInterface[];
  industry: string;
}

export const NewsMotion: React.FC<Props> = ({ news, industry }) => {
  const [isMounted, setIsMounted] = useState(false);
  
  // Create multiple rows for different scroll speeds (for news items)
  const duplicatedNews = [...news, ...news, ...news];
  const animationDuration = 80; // Slower scrolling for news content

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
      y: [-8, 8, -8],
      rotate: [0, 1, -1, 0],
      scale: [1, 1.02, 1],
      transition: {
        duration: 15,
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
    <section className="relative py-24 lg:py-32 overflow-hidden bg-gradient-to-br from-gray-50 via-stone-50 to-gray-100">
      {/* Enhanced Background with different floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated background elements with varied positioning */}
        <motion.div 
          variants={floatingVariants}
          animate="animate"
          className="absolute -top-32 -right-32 w-72 h-72 bg-gradient-to-br from-stone-300/12 to-amber-200/15 rounded-full blur-3xl"
        />
        <motion.div 
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: "5s" }}
          className="absolute -bottom-48 -left-48 w-96 h-96 bg-gradient-to-tr from-gray-200/10 to-stone-300/12 rounded-full blur-3xl"
        />
        <motion.div 
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: "10s" }}
          className="absolute top-1/4 right-1/3 w-56 h-56 bg-gradient-to-bl from-amber-300/8 to-yellow-200/10 rounded-full blur-2xl"
        />
        
        {/* Additional floating elements for more dynamic feel */}
        <motion.div 
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: "2s" }}
          className="absolute bottom-1/4 left-1/4 w-40 h-40 bg-gradient-to-r from-stone-400/6 to-gray-300/8 rounded-full blur-xl"
        />
        <motion.div 
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: "7s" }}
          className="absolute top-2/3 right-1/4 w-48 h-48 bg-gradient-to-l from-amber-400/6 to-stone-200/8 rounded-full blur-2xl"
        />
        
        {/* Refined grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(120,113,108,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(120,113,108,0.025)_1px,transparent_1px)] bg-[size:90px_90px]" />
        
        {/* Subtle geometric pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-stone-400 rotate-45 rounded-lg"></div>
          <div className="absolute bottom-1/3 right-1/3 w-24 h-24 border border-amber-400 rotate-12 rounded-lg"></div>
          <div className="absolute top-2/3 left-2/3 w-28 h-28 border border-gray-400 -rotate-12 rounded-lg"></div>
        </div>
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
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-stone-400 to-amber-500 rounded-full blur-xl opacity-25" />
                <div className="relative bg-gradient-to-r from-stone-500 to-amber-600 rounded-full p-6 lg:p-7 shadow-2xl border border-stone-300/40">
                  <span className="text-4xl lg:text-5xl">📰</span>
                </div>
              </div>
            </motion.div>

            {/* Main title with enhanced styling */}
            <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-6 lg:mb-8 flex items-center justify-center gap-x-2 leading-[0.9] tracking-tight">
              <span className="block bg-gradient-to-r from-stone-800 via-gray-700 to-stone-800 bg-clip-text text-transparent py-2">
                Tin Tức
              </span>
              <span className="block bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700 bg-clip-text text-transparent py-2">
                Mới Nhất
              </span>
            </h1>

            {/* Enhanced description */}
            <motion.p 
              variants={itemVariants}
              className="text-base sm:text-lg lg:text-xl xl:text-2xl text-stone-600 max-w-4xl mx-auto leading-relaxed font-light"
            >
              Cập nhật những xu hướng, bài viết và thông tin mới nhất trong ngành {industry}
            </motion.p>

            {/* Enhanced animated divider with different style */}
            <motion.div 
              variants={itemVariants}
              className="flex items-center justify-center mt-10 lg:mt-12"
            >
              <div className="flex items-center space-x-6">
                <motion.div 
                  className="w-16 h-0.5 bg-gradient-to-r from-transparent via-stone-400 to-transparent"
                  animate={{ scaleX: [0, 1, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity }}
                />
                <div className="flex items-center space-x-3">
                  <motion.div
                    className="w-2 h-2 bg-stone-400 rounded-full"
                    animate={{ 
                      scale: [1, 1.3, 1],
                      opacity: [0.5, 1, 0.5] 
                    }}
                    transition={{ 
                      duration: 2.2, 
                      repeat: Infinity,
                      delay: 0
                    }}
                  />
                  <motion.div
                    className="w-3 h-3 bg-amber-500 rounded-full"
                    animate={{ 
                      scale: [1, 1.4, 1],
                      opacity: [0.4, 1, 0.4] 
                    }}
                    transition={{ 
                      duration: 2.2, 
                      repeat: Infinity,
                      delay: 0.3
                    }}
                  />
                  <motion.div
                    className="w-2.5 h-2.5 bg-stone-500 rounded-full"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.6, 1, 0.6] 
                    }}
                    transition={{ 
                      duration: 2.2, 
                      repeat: Infinity,
                      delay: 0.6
                    }}
                  />
                </div>
                <motion.div 
                  className="w-16 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent"
                  animate={{ scaleX: [0, 1, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, delay: 1.5 }}
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Enhanced News Grid Layout */}
          <motion.div variants={itemVariants} className="mb-20 lg:mb-24">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {news.map((newsItem, index) => (
                <motion.div
                  key={newsItem.id}
                  variants={itemVariants}
                  className="group relative"
                  whileHover={{ y: -12, scale: 1.03, rotateX: 2 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  style={{ 
                    animationDelay: `${index * 0.15}s` 
                  }}
                >
                  {/* Enhanced glow effect with different colors */}
                  <div className={`absolute -inset-3 bg-gradient-to-r ${
                    index % 3 === 0 ? 'from-amber-400/15 to-yellow-500/15' :
                    index % 3 === 1 ? 'from-stone-400/15 to-gray-500/15' :
                    'from-amber-500/15 to-stone-400/15'
                  } rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-600`} />
                  
                  {/* Enhanced main card */}
                  <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl border border-stone-200/60 hover:border-amber-300/60 transition-all duration-500 overflow-hidden shadow-lg hover:shadow-2xl">
                    {/* Enhanced shimmer effect */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1200 bg-gradient-to-r from-transparent via-amber-100/40 to-transparent" />
                    
                    {/* Accent corner */}
                    <div className={`absolute top-0 right-0 w-16 h-16 ${
                      index % 3 === 0 ? 'bg-gradient-to-bl from-amber-400/20' :
                      index % 3 === 1 ? 'bg-gradient-to-bl from-stone-400/20' :
                      'bg-gradient-to-bl from-gray-400/20'
                    } to-transparent rounded-bl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                    
                    <div className="relative z-10">
                      <NewsCard news={newsItem} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Enhanced Call to Action Button */}
          <motion.div variants={itemVariants} className="flex justify-center mt-20 lg:mt-24">
            <Link href="/danh-muc/tin-tuc">
              <div className="relative group">
                {/* Multi-layer glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 via-stone-500 to-amber-600 rounded-2xl blur opacity-20 group-hover:opacity-35 transition-all duration-500" />
                <div className="absolute -inset-2 bg-gradient-to-r from-stone-400 via-amber-400 to-stone-500 rounded-2xl blur-lg opacity-10 group-hover:opacity-20 transition-all duration-500" />
                
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative bg-gradient-to-r from-stone-600 via-amber-600 to-stone-700 hover:from-stone-700 hover:via-amber-700 hover:to-stone-800 text-white px-12 py-5 rounded-2xl text-lg font-semibold transition-all duration-400 shadow-lg hover:shadow-2xl border border-stone-300/30 overflow-hidden"
                >
                  {/* Enhanced button shimmer effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-800 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                  
                  <span className="relative flex items-center gap-3">
                    <span>Xem Tất Cả Tin Tức</span>
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 2.5, repeat: Infinity }}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.div>
                  </span>
                </motion.button>
              </div>
            </Link>
          </motion.div>

          {/* Enhanced Stats Badge with different design */}
          <motion.div variants={itemVariants} className="flex justify-center mt-20 lg:mt-24">
            <div className="relative group">
              {/* Enhanced glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-stone-500 via-amber-500 to-stone-600 rounded-full blur opacity-25 group-hover:opacity-40 transition duration-500" />
              
              <div className="relative bg-white/95 backdrop-blur-xl rounded-full border border-stone-300/50 shadow-xl px-10 py-6 lg:px-14 lg:py-7">
                <div className="flex items-center gap-5">
                  {/* Enhanced animated status indicator */}
                  <div className="flex items-center gap-3">
                    <motion.div 
                      className="w-3.5 h-3.5 bg-emerald-500 rounded-full shadow-lg"
                      animate={{ 
                        scale: [1, 1.3, 1],
                        opacity: [0.7, 1, 0.7],
                        boxShadow: ["0 0 0 0 rgba(16, 185, 129, 0.4)", "0 0 0 8px rgba(16, 185, 129, 0)", "0 0 0 0 rgba(16, 185, 129, 0.4)"]
                      }}
                      transition={{ duration: 2.5, repeat: Infinity }}
                    />
                    <div className="w-2.5 h-2.5 bg-emerald-400/70 rounded-full animate-pulse" />
                    <div className="w-2 h-2 bg-emerald-300/50 rounded-full animate-pulse" style={{ animationDelay: "0.5s" }} />
                  </div>
                  
                  <span className="text-lg lg:text-xl text-stone-700 font-medium">
                    Cập nhật <span className="font-bold text-amber-600">{news.length}</span> tin tức mới nhất
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
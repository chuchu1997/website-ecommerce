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
    <section className="relative py-24 lg:py-32 overflow-hidden bg-white">
      {/* White Background with subtle elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated background elements - subtle colors for white background */}
        <motion.div 
          variants={floatingVariants}
          animate="animate"
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-100/30 to-purple-100/20 rounded-full blur-3xl"
        />
        <motion.div 
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: "4s" }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-indigo-100/25 to-cyan-100/15 rounded-full blur-3xl"
        />
        <motion.div 
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: "8s" }}
          className="absolute top-1/3 left-1/2 w-64 h-64 bg-gradient-to-bl from-violet-100/20 to-pink-100/15 rounded-full blur-2xl"
        />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />
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
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-xl opacity-60" />
                <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 rounded-full p-6 lg:p-7 shadow-2xl border border-gray-200">
                  <span className="text-4xl lg:text-5xl">📰</span>
                </div>
              </div>
            </motion.div>

            {/* Main title */}
            <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-6 lg:mb-8 flex items-center justify-center gap-x-2 leading-[0.9] tracking-tight">
              <span className="block bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent py-2">
                Tin Tức
              </span>
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 bg-clip-text text-transparent py-2">
                Mới Nhất
              </span>
            </h1>

            {/* Description */}
            <motion.p 
              variants={itemVariants}
              className="text-base sm:text-lg lg:text-xl xl:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light"
            >
              Cập nhật những xu hướng, bài viết và thông tin mới nhất trong ngành {industry}
            </motion.p>

            {/* Animated divider */}
            <motion.div 
              variants={itemVariants}
              className="flex items-center justify-center mt-10 lg:mt-12"
            >
              <div className="flex items-center space-x-4">
                <motion.div 
                  className="w-20 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent"
                  animate={{ scaleX: [0, 1, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                <div className="flex space-x-2">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-2.5 h-2.5 bg-blue-400 rounded-full"
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
                  className="w-20 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent"
                  animate={{ scaleX: [0, 1, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 2 }}
                />
              </div>
            </motion.div>
          </motion.div>

          {/* News Grid Layout */}
          <motion.div variants={itemVariants} className="mb-20 lg:mb-24">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {news.map((newsItem, index) => (
                <motion.div
                  key={newsItem.id}
                  variants={itemVariants}
                  className="group relative"
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  style={{ 
                    animationDelay: `${index * 0.1}s` 
                  }}
                >
                  {/* Glow effect */}
                  <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  
                  {/* Main card */}
                  <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200 hover:border-gray-300 transition-all duration-500 overflow-hidden shadow-lg hover:shadow-xl">
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-gray-100/30 to-transparent" />
                    
                    <div className="relative z-10">
                      <NewsCard news={newsItem} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Call to Action Button */}
          <motion.div variants={itemVariants} className="flex justify-center mt-20 lg:mt-24">
            <Link href="/danh-muc/tin-tuc">
              <div className="relative group">
                {/* Glow effect */}
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 rounded-2xl blur-lg opacity-20 group-hover:opacity-30 transition-all duration-500" />
                
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 hover:from-blue-700 hover:via-purple-700 hover:to-blue-800 text-white px-10 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl border border-white/20 overflow-hidden"
                >
                  {/* Button shimmer effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  
                  <span className="relative flex items-center gap-3">
                    <span>Xem Tất Cả Tin Tức</span>
                    <motion.div
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.div>
                  </span>
                </motion.button>
              </div>
            </Link>
          </motion.div>

          {/* Enhanced Stats Badge */}
          <motion.div variants={itemVariants} className="flex justify-center mt-20 lg:mt-24">
            <div className="relative group">
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-30 group-hover:opacity-50 transition duration-500" />
              
              <div className="relative bg-white/90 backdrop-blur-xl rounded-full border border-gray-200 shadow-2xl px-8 py-5 lg:px-12 lg:py-6">
                <div className="flex items-center gap-4">
                  {/* Animated status indicator */}
                  <div className="flex items-center gap-2">
                    <motion.div 
                      className="w-3 h-3 bg-green-400 rounded-full"
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.7, 1, 0.7] 
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <div className="w-2 h-2 bg-green-400/60 rounded-full animate-pulse" />
                  </div>
                  
                  <span className="text-lg lg:text-xl text-gray-700 font-medium">
                    Cập nhật <span className="font-bold text-blue-600">{news.length}</span> tin tức mới nhất
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
"use client";

import { motion } from "framer-motion";
import { ArrowRight, Clock, TrendingUp } from "lucide-react";
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

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: [0.25, 0.46, 0.45, 0.94]
      },
    },
  };

  const floatingVariants = {
    animate: {
      y: [-6, 6, -6],
      transition: {
        duration: 8,
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
    <section 
      className="relative py-20 lg:py-28 overflow-hidden"
      style={{ 
        background: 'var(--gradient-secondary)',
        color: 'var(--color-text-primary)'
      }}
    >
      {/* Sophisticated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Geometric patterns with CSS variables */}
        <motion.div 
          variants={floatingVariants}
          animate="animate"
          className="absolute top-20 right-20 w-64 h-64 rounded-full opacity-30"
          style={{ 
            background: 'radial-gradient(circle, var(--color-primary-light) 0%, transparent 70%)',
            filter: 'blur(40px)'
          }}
        />
        <motion.div 
          variants={floatingVariants}
          animate="animate"
    
          className="absolute bottom-32 left-16 w-80 h-80 rounded-full opacity-20"
          style={{ 
            background: 'radial-gradient(circle, var(--color-accent-green) 0%, transparent 70%)',
            filter: 'blur(50px)',
            animationDelay: "4s"
          }}
        />
        
        {/* Elegant grid overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
        
        {/* Decorative elements */}
        <div className="absolute top-1/3 left-1/4 w-2 h-32 opacity-10 rounded-full" style={{ background: 'var(--color-primary)' }} />
        <div className="absolute bottom-1/3 right-1/3 w-2 h-24 opacity-10 rounded-full" style={{ background: 'var(--color-accent-green)' }} />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Modern Header Section */}
          <motion.div variants={itemVariants} className="mb-16 lg:mb-20">
            <div className="max-w-4xl mx-auto text-center">
              {/* Minimalist badge */}
              <motion.div 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 border"
                style={{ 
                  background: 'var(--color-bg)',
                  borderColor: 'var(--color-border)',
                  color: 'var(--color-text-muted)'
                }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <TrendingUp className="w-4 h-4" style={{ color: 'var(--color-primary)' }} />
                <span className="text-sm font-medium">Tin Tức Mới Nhất</span>
              </motion.div>

              {/* Clean, modern title */}
                  <h2 
              className="font-bold text-4xl sm:text-5xl lg:text-6xl  mb-6 leading-tight capitalize"
              style={{ color: 'var(--color-text-primary)' }}
            >
             Cập nhật {""}
              <span style={{ color: 'var(--color-primary)' }}>
               Tin tức
              </span>
            </h2>
              {/* Subtitle */}
              <motion.p 
                variants={itemVariants}
                className="text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                Khám phá những xu hướng, ý tưởng và thông tin chuyên sâu mới nhất 
                trong lĩnh vực thiết kế nội thất hiện đại
              </motion.p>

              {/* Elegant divider */}
              <motion.div 
                variants={itemVariants}
                className="flex items-center justify-center mt-8"
              >
                <motion.div 
                  className="h-px w-24 rounded-full"
                  style={{ background: 'linear-gradient(90deg, transparent, var(--color-primary), transparent)' }}
                  animate={{ scaleX: [0.5, 1, 0.5] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Modern Card Layout */}
          <motion.div variants={itemVariants} className="mb-16">
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
              {news.map((newsItem, index) => (
                <motion.div
                  key={newsItem.id}
                  variants={itemVariants}
                  className="group relative"
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                >
                  {/* Subtle glow effect */}
                  <div 
                    className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ 
                      background: 'var(--gradient-primary)',
                      filter: 'blur(8px)'
                    }}
                  />
                  
                  {/* Main card */}
                  <div 
                    className="relative rounded-2xl border transition-all duration-300 overflow-hidden"
                    style={{ 
                      background: 'var(--color-bg)',
                      borderColor: 'var(--color-border)',
                      boxShadow: 'var(--shadow-default)'
                    }}
                  >
                    {/* Hover overlay */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ 
                        background: 'linear-gradient(135deg, transparent 0%, var(--color-bg-accent) 100%)'
                      }}
                    />
                    
                    {/* Card accent line */}
                    <div 
                      className="absolute top-0 left-0 right-0 h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                      style={{ background: 'var(--gradient-primary)' }}
                    />
                    
                    <div className="relative z-10 ">
                      <NewsCard news={newsItem} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Modern CTA Section */}
          <motion.div variants={itemVariants} className="text-center">
            <div className="inline-flex flex-col items-center gap-6">
              {/* Stats indicator */}
              <div className="flex items-center gap-3">
                <div 
                  className="flex items-center gap-2 px-3 py-2 rounded-full"
                  style={{ 
                    background: 'var(--color-accent-green-light)',
                    color: 'var(--color-accent-green)'
                  }}
                >
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-medium">{news.length} bài viết mới</span>
                </div>
                
                <motion.div 
                  className="w-2 h-2 rounded-full"
                  style={{ background: 'var(--color-accent-green)' }}
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5] 
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity
                  }}
                />
              </div>

              {/* CTA Button */}
              <Link href="/danh-muc/tin-tuc">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative"
                >
                  <div 
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ 
                      background: 'var(--gradient-primary)',
                      filter: 'blur(12px)',
                      transform: 'scale(1.1)'
                    }}
                  />
                  
                  <button
                    className="relative px-8 py-4 rounded-full border-2 font-medium transition-all duration-300 flex items-center gap-3"
                    style={{ 
                      background: 'var(--color-bg)',
                      borderColor: 'var(--color-primary)',
                      color: 'var(--color-primary)'
                    }}
                  >
                    <span>Xem Tất Cả Bài Viết</span>
                    <motion.div
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.div>
                  </button>
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
/** @format */

"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ProjectInterface } from "@/types/project";
import Link from "next/link";
import { useEffect, useState, useMemo } from "react";

interface Props {
  projects: ProjectInterface[];
  industry: string;
}

export const HighlightedProjectsMotion: React.FC<Props> = ({
  projects,
  industry,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  // Memoize animation variants to prevent recreation on each render
  const animationVariants = useMemo(
    () => ({
      containerVariants: {
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            duration: 0.6,
            staggerChildren: 0.1, // Reduced from 0.15 for faster animations
          },
        },
      },
      itemVariants: {
        hidden: {
          opacity: 0,
          y: 20, // Reduced from 30 for subtler effect
          scale: 0.98, // Reduced from 0.95 for subtler effect
        },
        show: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: 0.5, // Reduced from 0.8
            ease: [0.25, 0.1, 0.25, 1], // More optimized easing
          },
        },
      },
      // Simplified floating animation - only one property animated at a time for better performance
      floatingVariants: {
        animate: {
          y: [-5, 5, -5], // Reduced range for subtler effect
          transition: {
            duration: 6, // Reduced from 8
            repeat: Infinity,
            ease: "easeInOut",
          },
        },
      },
    }),
    []
  );

  // Memoize static content to prevent unnecessary re-renders
  const statsData = useMemo(
    () => [
      {
        icon: "📊",
        value: projects.length,
        label: "Dự án hoàn thành",
        gradient: "from-amber-500 to-yellow-600",
        glow: "amber-500/20",
      },
      {
        icon: "⭐",
        value: "100%",
        label: "Hài lòng",
        gradient: "from-stone-400 to-gray-500",
        glow: "stone-400/20",
      },
      {
        icon: "🎯",
        value: "5+",
        label: "Năm kinh nghiệm",
        gradient: "from-amber-600 to-orange-700",
        glow: "amber-600/20",
      },
      {
        icon: "🏅",
        value: "24/7",
        label: "Hỗ trợ",
        gradient: "from-zinc-500 to-gray-600",
        glow: "zinc-500/20",
      },
    ],
    [projects.length]
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <section className="relative min-h-screen py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-stone-50 via-gray-50 to-stone-100">
      {/* Optimized Background Elements - Use will-change and transform3d */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ willChange: "transform" }}>
        {/* Simplified animated gradient orbs - removed rotation for better performance */}
        <motion.div
          variants={animationVariants.floatingVariants}
          animate="animate"
          className="absolute -top-32 -right-32 w-72 h-72 bg-gradient-to-br from-amber-200/15 to-yellow-300/20 rounded-full blur-3xl"
          style={{ willChange: "transform" }}
        />
        <motion.div
          variants={animationVariants.floatingVariants}
          animate="animate"
          style={{
            animationDelay: "2s", // Reduced from 3s
            willChange: "transform",
          }}
          className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr from-stone-200/15 to-gray-300/20 rounded-full blur-3xl"
        />
        <motion.div
          variants={animationVariants.floatingVariants}
          animate="animate"
          style={{
            animationDelay: "4s", // Reduced from 6s
            willChange: "transform",
          }}
          className="absolute top-1/4 right-1/3 w-56 h-56 bg-gradient-to-bl from-amber-300/10 to-orange-400/15 rounded-full blur-2xl"
        />

        {/* Static geometric pattern - no animation needed */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(120,113,108,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(120,113,108,0.03)_1px,transparent_1px)] bg-[size:48px_48px]" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          variants={animationVariants.containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}>
          {/* Hero Header */}
          <motion.div
            variants={animationVariants.itemVariants}
            className="text-center mb-16 lg:mb-24">
            {/* Optimized floating icon badge */}
            <motion.div
              className="inline-flex items-center justify-center w-20 h-20 lg:w-24 lg:h-24 mb-8"
              whileHover={{
                scale: 1.05, // Reduced from 1.1
                rotate: 2, // Reduced from 5
              }}
              transition={{
                type: "spring",
                stiffness: 400, // Increased for snappier response
                damping: 25, // Added damping for smoother motion
              }}
              style={{ willChange: "transform" }}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-3xl blur-lg opacity-30" />
                <div className="relative bg-gradient-to-r from-amber-500 to-yellow-600 rounded-3xl p-4 lg:p-5 shadow-2xl border border-amber-300/30">
                  <span className="text-3xl lg:text-4xl">🏆</span>
                </div>
              </div>
            </motion.div>

            {/* Main title */}
            <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black lg:mb-8 flex items-center gap-x-2 justify-center tracking-tight">
              <span className="block bg-gradient-to-r from-stone-700 via-gray-800 to-stone-700 bg-clip-text text-transparent py-2">
                Dự Án
              </span>
              <span className="block bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700 bg-clip-text text-transparent py-2">
                Nổi Bật
              </span>
            </h1>

            {/* Description */}
            <motion.p
              variants={animationVariants.itemVariants}
              className="text-base sm:text-lg lg:text-xl xl:text-2xl text-stone-600 max-w-4xl mx-auto leading-relaxed font-light">
              Khám phá những dự án tiêu biểu thể hiện tay nghề và sự sáng tạo
              trong ngành {industry}
            </motion.p>

            {/* Simplified animated divider - removed complex animations */}
            <motion.div
              variants={animationVariants.itemVariants}
              className="flex items-center justify-center mt-10 lg:mt-12">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
                <div className="flex space-x-1.5">
                  <div className="w-2 h-2 bg-amber-500 rounded-full opacity-80" />
                  <div className="w-2 h-2 bg-stone-400 rounded-full opacity-60" />
                  <div className="w-2 h-2 bg-amber-600 rounded-full opacity-80" />
                </div>
                <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
              </div>
            </motion.div>
          </motion.div>

          {/* Optimized Projects Grid */}
          <motion.div
            variants={animationVariants.itemVariants}
            className="mb-16 lg:mb-24">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  variants={animationVariants.itemVariants}
                  whileHover={{
                    y: -8, // Reduced from -12
                    transition: {
                      duration: 0.3, // Reduced from 0.4
                      ease: "easeOut",
                    },
                  }}
                  className="group relative"
                  style={{ willChange: "transform" }}>
                  <ProjectCard project={project} />

                  {/* Simplified glow effect - single layer for better performance */}
                  <div className="absolute -inset-2 bg-gradient-to-r from-amber-400/15 to-yellow-500/15 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Optimized CTA Section */}
          <motion.div
            variants={animationVariants.itemVariants}
            className="text-center mb-16 lg:mb-24">
            <Link href="/danh-muc/du-an">
              <motion.button
                whileHover={{
                  scale: 1.03, // Reduced from 1.05
                  boxShadow: "0 20px 40px rgba(217, 119, 6, 0.25)", // Reduced shadow
                }}
                whileTap={{ scale: 0.97 }} // Reduced from 0.95
                transition={{
                  duration: 0.2, // Faster transition
                  ease: "easeOut",
                }}
                className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700 hover:from-amber-700 hover:via-yellow-700 hover:to-amber-800 text-white px-8 py-4 lg:px-12 lg:py-6 rounded-2xl text-base lg:text-xl font-bold transition-all duration-300 shadow-2xl hover:shadow-amber-500/25 overflow-hidden"
                style={{ willChange: "transform" }}>
                {/* Simplified background overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <span className="relative z-10 flex items-center gap-3">
                  Xem Tất Cả Dự Án
                  <ArrowRight className="w-5 h-5 lg:w-6 lg:h-6 transition-transform group-hover:translate-x-1" />
                </span>
              </motion.button>
            </Link>
          </motion.div>

          {/* Optimized Stats Section */}
          {projects.length > 0 && (
            <motion.div
              variants={animationVariants.itemVariants}
              className="mb-16 lg:mb-20">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 lg:gap-8">
                {statsData.map((stat, index) => (
                  <motion.div
                    key={index}
                    variants={animationVariants.itemVariants}
                    whileHover={{
                      scale: 1.03, // Reduced from 1.05
                      y: -3, // Reduced from -5
                    }}
                    transition={{
                      duration: 0.2,
                      ease: "easeOut",
                    }}
                    className="group text-center"
                    style={{ willChange: "transform" }}>
                    <div className="relative mb-4">
                      <div
                        className={`absolute -inset-1 bg-gradient-to-r ${stat.gradient} rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity duration-300`}
                      />
                      <div
                        className={`relative inline-flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-r ${stat.gradient} rounded-2xl shadow-lg border border-white/20`}>
                        <span className="text-2xl lg:text-3xl">
                          {stat.icon}
                        </span>
                      </div>
                    </div>
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-stone-800 mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm lg:text-base text-stone-600 font-medium">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Simplified Portfolio Showcase Hint */}
          <motion.div
            variants={animationVariants.itemVariants}
            className="flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 rounded-full blur opacity-25 group-hover:opacity-40 transition-opacity duration-300" />

              <div className="relative bg-white/80 backdrop-blur-xl rounded-full border border-stone-300/40 shadow-2xl px-8 py-4 lg:px-10 lg:py-5">
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-3">
                    {[1, 2, 3].map((i) => (
                      <motion.div
                        key={i}
                        className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-amber-400 to-stone-500 rounded-full border-3 border-white flex items-center justify-center shadow-lg"
                        whileHover={{
                          scale: 1.05, // Reduced from 1.1
                          zIndex: 10,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 25,
                        }}
                        style={{ willChange: "transform" }}>
                        <span className="text-white text-sm lg:text-base font-bold">
                          {i}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  <span className="text-base lg:text-lg text-stone-700 font-medium">
                    Và nhiều dự án khác đang chờ bạn khám phá
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

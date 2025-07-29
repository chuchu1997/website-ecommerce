/** @format */

"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { ProjectCard } from "@/components/ui/ProjectCard";
import { ProjectInterface } from "@/types/project";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Props {
  projects: ProjectInterface[];
  industry: string;
}

export const HighlightedProjectsMotion: React.FC<Props> = ({
  projects,
  industry,
}) => {
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
      scale: 0.95,
    },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  const floatingVariants = {
    animate: {
      y: [-8, 8, -8],
      rotate: [0, 1, -1, 0],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <section className="relative min-h-screen py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-emerald-50/50 via-slate-50 to-teal-50/30">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated gradient orbs */}
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute -top-32 -right-32 w-72 h-72 bg-gradient-to-br from-emerald-400/20 to-teal-600/20 rounded-full blur-3xl"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: "3s" }}
          className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr from-blue-400/15 to-indigo-600/15 rounded-full blur-3xl"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: "6s" }}
          className="absolute top-1/4 right-1/3 w-56 h-56 bg-gradient-to-bl from-teal-400/20 to-emerald-600/20 rounded-full blur-2xl"
        />

        {/* Subtle geometric pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:48px_48px]" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}>
          {/* Hero Header */}
          <motion.div
            variants={itemVariants}
            className="text-center mb-16 lg:mb-24">
            {/* Floating icon badge with enhanced design */}
            <motion.div
              className="inline-flex items-center justify-center w-20 h-20 lg:w-24 lg:h-24 mb-8"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl blur-lg opacity-75" />
                <div className="relative bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-4 lg:p-5 shadow-2xl">
                  <span className="text-3xl lg:text-4xl">🏆</span>
                </div>
              </div>
            </motion.div>

            {/* Main title with specified sizing */}
            <h1 className=" text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black lg:mb-8 flex items-center gap-x-2 justify-center tracking-tight">
              <span className="block bg-gradient-to-r from-slate-900 via-emerald-900 to-slate-900 bg-clip-text text-transparent py-2">
                Dự Án
              </span>
              <span className="block bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 bg-clip-text text-transparent py-2 ">
                Nổi Bật
              </span>
            </h1>

            {/* Enhanced description with specified sizing */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg lg:text-xl xl:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-light">
              Khám phá những dự án tiêu biểu thể hiện tay nghề và sự sáng tạo
              trong ngành {industry}
            </motion.p>

            {/* Animated divider */}
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center mt-10 lg:mt-12">
              <div className="flex items-center space-x-4">
                <motion.div
                  className="w-16 h-0.5 bg-gradient-to-r from-transparent via-emerald-500 to-transparent"
                  animate={{ scaleX: [0, 1, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <div className="flex space-x-1.5">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 bg-emerald-500 rounded-full"
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.3,
                      }}
                    />
                  ))}
                </div>
                <motion.div
                  className="w-16 h-0.5 bg-gradient-to-r from-transparent via-emerald-500 to-transparent"
                  animate={{ scaleX: [0, 1, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Projects Grid with enhanced layout */}
          <motion.div variants={itemVariants} className="mb-16 lg:mb-24">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  whileHover={{
                    y: -12,
                    transition: { duration: 0.4, ease: "easeOut" },
                  }}
                  className="group relative">
                  <ProjectCard project={project} />

                  {/* Enhanced glow effect */}
                  <div className="absolute -inset-2 bg-gradient-to-r from-emerald-400/10 to-teal-400/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl -z-10" />
                  <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 -z-10" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Enhanced CTA Section */}
          <motion.div
            variants={itemVariants}
            className="text-center mb-16 lg:mb-24">
            <Link href="/danh-muc/du-an">
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 25px 50px rgba(16, 185, 129, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
                className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:via-teal-700 hover:to-emerald-800 text-white px-8 py-4 lg:px-12 lg:py-6 rounded-2xl text-base lg:text-xl font-bold transition-all duration-500 shadow-2xl hover:shadow-emerald-500/25 overflow-hidden">
                {/* Animated background overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Shimmer effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />

                <span className="relative z-10 flex items-center gap-3">
                  Xem Tất Cả Dự Án
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}>
                    <ArrowRight className="w-5 h-5 lg:w-6 lg:h-6" />
                  </motion.div>
                </span>
              </motion.button>
            </Link>
          </motion.div>

          {/* Enhanced Stats Section */}
          {projects.length > 0 && (
            <motion.div variants={itemVariants} className="mb-16 lg:mb-20">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 lg:gap-8">
                {[
                  {
                    icon: "📊",
                    value: projects.length,
                    label: "Dự án hoàn thành",
                    gradient: "from-emerald-500 to-teal-600",
                  },
                  {
                    icon: "⭐",
                    value: "100%",
                    label: "Hài lòng",
                    gradient: "from-blue-500 to-indigo-600",
                  },
                  {
                    icon: "🎯",
                    value: "5+",
                    label: "Năm kinh nghiệm",
                    gradient: "from-purple-500 to-pink-600",
                  },
                  {
                    icon: "🏅",
                    value: "24/7",
                    label: "Hỗ trợ",
                    gradient: "from-amber-500 to-orange-600",
                  },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="group text-center">
                    <div className="relative mb-4">
                      <div
                        className={`absolute -inset-1 bg-gradient-to-r ${stat.gradient} rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-500`}
                      />
                      <div
                        className={`relative inline-flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-r ${stat.gradient} rounded-2xl shadow-lg`}>
                        <span className="text-2xl lg:text-3xl">
                          {stat.icon}
                        </span>
                      </div>
                    </div>
                    <motion.div
                      className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 mb-2"
                      whileHover={{ scale: 1.1 }}>
                      {stat.value}
                    </motion.div>
                    <div className="text-sm lg:text-base text-slate-600 font-medium">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Enhanced Portfolio Showcase Hint */}
          <motion.div variants={itemVariants} className="flex justify-center">
            <div className="relative group">
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full blur opacity-25 group-hover:opacity-40 transition duration-500" />

              <div className="relative bg-white/80 backdrop-blur-xl rounded-full border border-white/60 shadow-2xl px-8 py-4 lg:px-10 lg:py-5">
                <div className="flex items-center gap-4">
                  {/* Avatar stack */}
                  <div className="flex -space-x-3">
                    {[1, 2, 3].map((i) => (
                      <motion.div
                        key={i}
                        className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full border-3 border-white flex items-center justify-center shadow-lg"
                        whileHover={{ scale: 1.1, zIndex: 10 }}
                        transition={{ type: "spring", stiffness: 300 }}>
                        <span className="text-white text-sm lg:text-base font-bold">
                          {i}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  <span className="text-base lg:text-lg text-slate-700 font-medium">
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

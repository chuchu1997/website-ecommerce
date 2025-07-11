/** @format */

"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { ProjectCard } from "@/components/ui/ProjectCard";
import { ProjectInterface } from "@/types/project";
import Link from "next/link";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.25, 0.25, 0.75] },
  },
};

interface Props {
  projects: ProjectInterface[];
}

export const HighlightedProjectsMotion: React.FC<Props> = ({ projects }) => {
  return (
    <section className="order-t border-white/30 shadow-inner relative py-12 sm:py-16 lg:py-24 bg-gradient-to-br from-slate-50 via-white to-slate-100 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-200/30 to-teal-300/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-200/30 to-indigo-300/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-amber-200/20 to-orange-300/20 rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}>
          {/* Header Section */}
          <motion.div
            variants={fadeInUp}
            className="text-center mb-12 sm:mb-16 lg:mb-20">
            {/* Icon Badge */}
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl mb-6 sm:mb-8 shadow-lg">
              <span className="text-2xl sm:text-3xl">🏆</span>
            </div>

            {/* Main Title */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold mb-4 sm:mb-6 leading-tight">
              <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                Dự Án
              </span>

              <span className="ml-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 bg-clip-text text-transparent">
                Nổi Bật
              </span>
            </h2>

            {/* Description */}
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-2xl lg:max-w-4xl mx-auto leading-relaxed">
              Khám phá những dự án tiêu biểu thể hiện tay nghề và sự sáng tạo
              trong thiết kế nội thất
            </p>

            {/* Decorative Line */}
            <div className="flex items-center justify-center mt-8 sm:mt-10">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse delay-150" />
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse delay-300" />
              </div>
            </div>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                variants={fadeInUp}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="group">
                <div className="relative">
                  <ProjectCard project={project} />

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <Link href="/danh-muc/du-an">
            <motion.div
              variants={fadeInUp}
              className="text-center mt-12 sm:mt-16 lg:mt-20">
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(16, 185, 129, 0.4)",
                }}
                whileTap={{ scale: 0.98 }}
                className="group relative bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-xl sm:rounded-2xl text-sm sm:text-base lg:text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-2xl overflow-hidden">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Xem Tất Cả Dự Án
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}>
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </motion.div>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.button>
            </motion.div>
          </Link>

          {/* Stats Section */}
          {projects.length > 0 && (
            <motion.div variants={fadeInUp} className="mt-16 sm:mt-20 lg:mt-24">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl mb-3 sm:mb-4">
                    <span className="text-lg sm:text-2xl">📊</span>
                  </div>
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1">
                    {projects.length}
                  </div>
                  <div className="text-sm sm:text-base text-gray-600">
                    Dự án hoàn thành
                  </div>
                </div>

                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl mb-3 sm:mb-4">
                    <span className="text-lg sm:text-2xl">⭐</span>
                  </div>
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1">
                    100%
                  </div>
                  <div className="text-sm sm:text-base text-gray-600">
                    Hài lòng
                  </div>
                </div>

                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl mb-3 sm:mb-4">
                    <span className="text-lg sm:text-2xl">🎯</span>
                  </div>
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1">
                    5+
                  </div>
                  <div className="text-sm sm:text-base text-gray-600">
                    Năm kinh nghiệm
                  </div>
                </div>

                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl mb-3 sm:mb-4">
                    <span className="text-lg sm:text-2xl">🏅</span>
                  </div>
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1">
                    24/7
                  </div>
                  <div className="text-sm sm:text-base text-gray-600">
                    Hỗ trợ
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Portfolio Showcase Hint */}
          <motion.div
            variants={fadeInUp}
            className="mt-12 sm:mt-16 lg:mt-20 text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/60 backdrop-blur-sm rounded-full border border-white/60 shadow-lg">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full border-2 border-white flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{i}</span>
                  </div>
                ))}
              </div>
              <span className="text-sm sm:text-base text-gray-700 font-medium">
                Và nhiều dự án khác đang chờ bạn khám phá
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

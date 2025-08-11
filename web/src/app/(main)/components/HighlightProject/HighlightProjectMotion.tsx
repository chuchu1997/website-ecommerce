/** @format */

"use client";

import { motion } from "framer-motion";
import { ArrowRight, Grid3x3, Users, Clock, Award } from "lucide-react";
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

  // Refined animation variants for interior design aesthetic
  const animationVariants = useMemo(
    () => ({
      containerVariants: {
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            duration: 0.8,
            staggerChildren: 0.12,
            ease: [0.25, 0.1, 0.25, 1],
          },
        },
      },
      itemVariants: {
        hidden: {
          opacity: 0,
          y: 30,
          scale: 0.96,
        },
        show: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: 0.6,
            ease: [0.25, 0.1, 0.25, 1],
          },
        },
      },
      slideInLeft: {
        hidden: {
          opacity: 0,
          x: -40,
        },
        show: {
          opacity: 1,
          x: 0,
          transition: {
            duration: 0.7,
            ease: [0.25, 0.1, 0.25, 1],
          },
        },
      },
      slideInRight: {
        hidden: {
          opacity: 0,
          x: 40,
        },
        show: {
          opacity: 1,
          x: 0,
          transition: {
            duration: 0.7,
            ease: [0.25, 0.1, 0.25, 1],
          },
        },
      },
      floatingVariants: {
        animate: {
          y: [-3, 3, -3],
          transition: {
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          },
        },
      },
    }),
    []
  );

  // Redesigned stats with interior design focus
  const statsData = useMemo(
    () => [
      {
        icon: Grid3x3,
        value: projects.length,
        label: "Dự án hoàn thành",
        description: "Không gian được thiết kế",
      },
      {
        icon: Users,
        value: "100%",
        label: "Khách hàng hài lòng",
        description: "Đánh giá tích cực",
      },
      {
        icon: Clock,
        value: "5+",
        label: "Năm kinh nghiệm",
        description: "Chuyên môn sâu",
      },
      {
        icon: Award,
        value: "24/7",
        label: "Tư vấn thiết kế",
        description: "Hỗ trợ liên tục",
      },
    ],
    [projects.length]
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <section
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{
        backgroundColor: "var(--color-bg-secondary)",
        background: "var(--gradient-secondary)",
      }}>
      {/* Sophisticated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Geometric pattern overlay */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, var(--color-primary-light) 1px, transparent 1px),
                             radial-gradient(circle at 75% 75%, var(--color-border) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Elegant floating elements */}
        <motion.div
          variants={animationVariants.floatingVariants}
          animate="animate"
          className="absolute top-20 right-20 w-64 h-64 rounded-full opacity-30 blur-3xl"
          style={{
            background: "var(--gradient-primary)",
            willChange: "transform",
          }}
        />

        <motion.div
          variants={animationVariants.floatingVariants}
          animate="animate"
          className="absolute bottom-20 left-20 w-80 h-80 rounded-full opacity-20 blur-3xl"
          style={{
            background: "var(--gradient-accent)",
            willChange: "transform",
            animationDelay: "4s",
          }}
        />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header Section - Interior Design Inspired */}
        <motion.div
          variants={animationVariants.containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-20 lg:mb-28">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column - Text Content */}
            <motion.div
              variants={animationVariants.slideInLeft}
              className="space-y-8">
              {/* Elegant Badge */}
              <motion.div
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full border shadow-sm"
                style={{
                  backgroundColor: "var(--color-bg)",
                  borderColor: "var(--color-border)",
                  boxShadow: "var(--shadow-default)",
                }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}>
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: "var(--color-primary)" }}
                />
                <span
                  className="text-sm font-medium uppercase tracking-wider"
                  style={{ color: "var(--color-text-secondary)" }}>
                  Portfolio Thiết Kế
                </span>
              </motion.div>

              {/* Main Title */}
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light leading-tight">
                  <span
                    className="block font-extralight"
                    style={{ color: "var(--color-text-secondary)" }}>
                    Dự Án
                  </span>
                  <span
                    className="block font-bold bg-clip-text text-transparent"
                    style={{
                      backgroundImage: "var(--gradient-primary)",
                      WebkitBackgroundClip: "text",
                    }}>
                    Tinh Hoa
                  </span>
                </h1>

                <div className="flex items-center gap-4 mt-6">
                  <div
                    className="w-12 h-0.5"
                    style={{ backgroundColor: "var(--color-primary)" }}
                  />
                  <span
                    className="text-sm uppercase tracking-widest font-medium"
                    style={{ color: "var(--color-text-muted)" }}>
                    {industry}
                  </span>
                  <div
                    className="w-12 h-0.5"
                    style={{ backgroundColor: "var(--color-border-accent)" }}
                  />
                </div>
              </div>

              {/* Description */}
              <p
                className="text-lg lg:text-xl leading-relaxed max-w-lg font-light"
                style={{ color: "var(--color-text-secondary)" }}>
                Những không gian sống được thiết kế tinh tế, thể hiện phong cách
                và cá tính riêng của từng gia chủ.
              </p>
            </motion.div>

            {/* Right Column - Featured Stats in Card Layout */}
            <motion.div variants={animationVariants.slideInRight}>
              <div className="grid grid-cols-2 gap-4 lg:gap-6">
                {statsData.map((stat, index) => (
                  <motion.div
                    key={index}
                    variants={animationVariants.itemVariants}
                    whileHover={{
                      y: -5,
                      transition: { duration: 0.3 },
                    }}
                    className="relative group">
                    <div
                      className="p-6 lg:p-8 rounded-2xl border backdrop-blur-sm transition-all duration-300"
                      style={{
                        backgroundColor: "var(--color-bg)",
                        borderColor: "var(--color-border-light)",
                        boxShadow: "var(--shadow-default)",
                      }}>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <stat.icon
                            className="w-8 h-8 lg:w-10 lg:h-10"
                            style={{ color: "var(--color-primary)" }}
                          />
                          <div
                            className="w-2 h-2 rounded-full"
                            style={{
                              backgroundColor: "var(--color-accent-green)",
                            }}
                          />
                        </div>

                        <div>
                          <div
                            className="text-2xl lg:text-3xl font-bold mb-1"
                            style={{ color: "var(--color-text-primary)" }}>
                            {stat.value}
                          </div>
                          <div
                            className="text-sm font-medium mb-1"
                            style={{ color: "var(--color-text-secondary)" }}>
                            {stat.label}
                          </div>
                          <div
                            className="text-xs"
                            style={{ color: "var(--color-text-muted)" }}>
                            {stat.description}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Projects Gallery - Interior Design Layout */}
        <motion.div
          variants={animationVariants.containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-20 lg:mb-28">
          {/* Section Header */}
          <motion.div
            variants={animationVariants.itemVariants}
            className="text-center mb-12 lg:mb-16">
            <h2
              className="text-2xl lg:text-3xl font-light mb-4"
              style={{ color: "var(--color-text-primary)" }}>
              Không Gian <span className="font-bold">Đã Thực Hiện</span>
            </h2>
            <div className="flex items-center justify-center gap-3">
              <div
                className="w-8 h-px"
                style={{ backgroundColor: "var(--color-border-accent)" }}
              />
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: "var(--color-primary)" }}
              />
              <div
                className="w-8 h-px"
                style={{ backgroundColor: "var(--color-border-accent)" }}
              />
            </div>
          </motion.div>

          {/* Projects Grid - Masonry-style for Interior Design */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={animationVariants.itemVariants}
                whileHover={{
                  y: -8,
                  transition: {
                    duration: 0.4,
                    ease: [0.25, 0.1, 0.25, 1],
                  },
                }}
                className="group relative"
                style={{ willChange: "transform" }}>
                {/* Elegant wrapper with custom styling */}
                <div
                  className="relative overflow-hidden rounded-3xl border transition-all duration-500"
                  style={{
                    backgroundColor: "var(--color-bg)",
                    borderColor: "var(--color-border-light)",
                    boxShadow: "var(--shadow-default)",
                  }}>
                  <ProjectCard project={project} />

                  {/* Overlay for additional design appeal */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none"
                    style={{ backgroundColor: "var(--color-primary)" }}
                  />
                </div>

                {/* Subtle glow effect */}
                <div
                  className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl -z-10"
                  style={{ backgroundColor: "var(--color-primary)" }}
                />

                {/* Project number indicator */}
                <motion.div
                  className="absolute -top-3 -right-3 w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    backgroundColor: "var(--color-bg)",
                    borderColor: "var(--color-primary)",
                    color: "var(--color-primary)",
                  }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 }}>
                  {index + 1}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Elegant CTA Section */}
        <motion.div
          variants={animationVariants.containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center mb-20 lg:mb-24">
          <motion.div
            variants={animationVariants.itemVariants}
            className="space-y-8">
            {/* Call to Action */}
            <div className="space-y-4">
              <h3
                className="text-xl lg:text-2xl font-light"
                style={{ color: "var(--color-text-secondary)" }}>
                Khám phá thêm những dự án thiết kế độc đáo
              </h3>

              <Link href="/danh-muc/du-an">
                <motion.button
                  whileHover={{
                    scale: 1.02,
                    y: -2,
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{
                    duration: 0.3,
                    ease: "easeOut",
                  }}
                  className="group relative inline-flex items-center gap-4 px-10 py-5 lg:px-12 lg:py-6 rounded-full text-lg font-medium transition-all duration-300 overflow-hidden"
                  style={{
                    backgroundColor: "var(--color-primary)",
                    color: "var(--color-text-white)",
                    boxShadow: "var(--shadow-hover)",
                  }}>
                  {/* Button background overlay */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ backgroundColor: "var(--color-primary-hover)" }}
                  />

                  <span className="relative z-10 flex items-center gap-3">
                    Xem Toàn Bộ Portfolio
                    <ArrowRight className="w-5 h-5 lg:w-6 lg:h-6 transition-transform group-hover:translate-x-2" />
                  </span>
                </motion.button>
              </Link>
            </div>

            {/* Decorative element */}
            <motion.div
              variants={animationVariants.itemVariants}
              className="flex items-center justify-center">
              <div className="flex items-center gap-3">
                <div
                  className="w-16 h-px"
                  style={{ backgroundColor: "var(--color-border-accent)" }}
                />
                <div className="flex gap-2">
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: "var(--color-primary)" }}
                  />
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: "var(--color-accent-green)" }}
                  />
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: "var(--color-border-accent)" }}
                  />
                </div>
                <div
                  className="w-16 h-px"
                  style={{ backgroundColor: "var(--color-border-accent)" }}
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Bottom Design Element - Interior Design Quote */}
        <motion.div
          variants={animationVariants.containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}>
          <motion.div
            variants={animationVariants.itemVariants}
            className="relative max-w-4xl mx-auto">
            <div
              className="relative p-8 lg:p-12 rounded-3xl border backdrop-blur-sm"
              style={{
                backgroundColor: "var(--color-bg)",
                borderColor: "var(--color-border)",
                boxShadow: "var(--shadow-default)",
              }}>
              {/* Quote marks */}
              <div
                className="absolute top-6 left-6 text-4xl font-serif opacity-20"
                style={{ color: "var(--color-primary)" }}>
                "
              </div>

              <div className="text-center space-y-6 relative z-10">
                <blockquote
                  className="text-xl lg:text-2xl font-light leading-relaxed italic"
                  style={{ color: "var(--color-text-primary)" }}>
                  Thiết kế không chỉ là cách mọi thứ trông như thế nào. Thiết kế
                  là cách mọi thứ vận hành và cảm nhận.
                </blockquote>

                <div className="flex items-center justify-center gap-4">
                  <div
                    className="w-12 h-px"
                    style={{ backgroundColor: "var(--color-border-accent)" }}
                  />
                  <span
                    className="text-sm font-medium tracking-wider"
                    style={{ color: "var(--color-text-muted)" }}>
                    TRIẾT LÝ THIẾT KẾ
                  </span>
                  <div
                    className="w-12 h-px"
                    style={{ backgroundColor: "var(--color-border-accent)" }}
                  />
                </div>
              </div>

              {/* Decorative corner elements */}
              <div
                className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 rounded-tr-2xl opacity-30"
                style={{ borderColor: "var(--color-primary)" }}
              />
              <div
                className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 rounded-bl-2xl opacity-30"
                style={{ borderColor: "var(--color-primary)" }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

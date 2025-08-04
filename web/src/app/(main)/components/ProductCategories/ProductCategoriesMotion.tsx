/** @format */

"use client";

import CategoryCard from "@/components/ui/CategoryCard";
import { CategoryInterface } from "@/types/category";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Props {
  title: string;
  description: string;
  categories: CategoryInterface[];
}

export const ProductCategoriesMotion = (props: Props) => {
  const [isMounted, setIsMounted] = useState(false);
  const { title, description, categories } = props;

  // Simplified animation variants for better performance
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
        ease: "easeOut",
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  // Simplified floating animation
  const floatingVariants = {
    animate: {
      y: [-5, 5, -5],
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
    <section className="relative py-16 lg:py-24 overflow-hidden bg-white">
      {/* Warm gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-yellow-50/30 to-amber-50/20" />

      {/* Subtle background elements with earth tones */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute top-20 -right-20 w-40 h-40 bg-gradient-to-br from-yellow-200/30 to-amber-200/20 rounded-full blur-3xl"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: "4s" }}
          className="absolute -bottom-10 -left-20 w-60 h-60 bg-gradient-to-tr from-amber-100/25 to-yellow-100/15 rounded-full blur-3xl"
        />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}>
          {/* Header Section */}
          <motion.div
            variants={itemVariants}
            className="text-center mb-16 lg:mb-20">
            {/* Earth-toned icon */}
            <motion.div
              className="inline-flex items-center justify-center w-16 h-16 mb-8 bg-gradient-to-br from-amber-600 to-yellow-600 rounded-2xl shadow-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}>
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </motion.div>

            {/* Earth brown title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 text-amber-900 leading-tight">
              {title}
            </h1>

            {/* Light gray description */}
            <motion.p
              variants={itemVariants}
              className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {description}
            </motion.p>
          </motion.div>

          {/* Categories Grid */}
          <motion.div variants={itemVariants} className="mb-16 lg:mb-20">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {categories.map((category, index) => (
                <motion.div
                  key={category.id}
                  variants={itemVariants}
                  whileHover={{
                    y: -4,
                    transition: { duration: 0.2, ease: "easeOut" },
                  }}
                  style={{ animationDelay: `${index * 0.1}s` }}>
                  <CategoryCard category={category} />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Call-to-Action with warm colors */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <Link href="/danh-muc" passHref>
              <motion.button
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 20px 40px rgba(217, 119, 6, 0.2)",
                }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white px-8 py-4 lg:px-12 lg:py-5 rounded-xl text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl">
                Khám Phá Tất Cả Danh Mục
                <motion.svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ x: [0, 4, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </motion.svg>
              </motion.button>
            </Link>
          </motion.div>

          {/* Stats Section with earth tones */}
          {categories.length > 0 && (
            <motion.div variants={itemVariants} className="flex justify-center">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200/60 shadow-xl p-8 lg:p-12">
                <div className="flex items-center gap-12 lg:gap-16">
                  <div className="text-center">
                    <motion.div
                      className="text-4xl lg:text-5xl font-bold text-amber-700 mb-2"
                      whileHover={{ scale: 1.05 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}>
                      {categories.length}
                    </motion.div>
                    <div className="text-sm lg:text-base text-gray-500 font-medium uppercase tracking-wider">
                      Danh mục
                    </div>
                  </div>

                  <div className="w-px h-16 bg-gradient-to-b from-transparent via-gray-300 to-transparent" />

                  <div className="text-center">
                    <motion.div
                      className="text-4xl lg:text-5xl font-bold text-yellow-600 mb-2"
                      whileHover={{ scale: 1.05 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}>
                      500+
                    </motion.div>
                    <div className="text-sm lg:text-base text-gray-500 font-medium uppercase tracking-wider">
                      Sản phẩm
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

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

  // Animation variants for staggered appearance
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

  // Animation variants for individual items
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
        ease: [0.4, 0, 0.2, 1], // Custom cubic-bezier for smooth motion
      },
    },
  };

  // Animation variants for floating background elements
  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [0, 2, -2, 0], // Subtle rotation
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Prevent hydration mismatch by rendering null on initial mount
  if (!isMounted) return null;

  return (
    <section className="relative min-h-screen py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-white via-amber-50/50 to-orange-50/50">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated gradient orbs */}
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute -top-32 -right-32 w-64 h-64 bg-gradient-to-br from-yellow-300/20 to-amber-500/20 rounded-full blur-3xl"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: "2s" }}
          className="absolute -bottom-32 -left-32 w-80 h-80 bg-gradient-to-tr from-orange-400/20 to-red-300/20 rounded-full blur-3xl"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: "4s" }}
          className="absolute top-1/3 right-1/4 w-48 h-48 bg-gradient-to-bl from-amber-200/15 to-yellow-400/15 rounded-full blur-2xl"
        />

        {/* Subtle geometric pattern (e.g., dots or lines) */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.01)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }} // Trigger animation when 50px of element is in view
        >
          {/* Hero Header Section */}
          <motion.div
            variants={itemVariants}
            className="text-center mb-16 lg:mb-24">
            {/* Floating icon badge */}
            <motion.div
              className="inline-flex items-center justify-center w-20 h-20 lg:w-24 lg:h-24 mb-8"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-3xl blur-lg opacity-75" />
                <div className="relative bg-gradient-to-r from-amber-500 to-yellow-600 rounded-3xl p-4 lg:p-5 shadow-2xl">
                  <span className="text-3xl lg:text-4xl">🌟</span>{" "}
                  {/* Star icon for a golden feel */}
                </div>
              </div>
            </motion.div>

            {/* Main title with enhanced typography */}
            <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-6 lg:mb-8 leading-tight tracking-tight">
              <span className="block bg-gradient-to-r from-gray-900 via-amber-900 to-gray-900 bg-clip-text text-transparent py-2">
                {title}
              </span>
            </h1>

            {/* Enhanced description */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg lg:text-xl xl:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-light">
              {description}
            </motion.p>

            {/* Animated divider with subtle animation */}
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center mt-10 lg:mt-12">
              <div className="flex items-center space-x-4">
                <motion.div
                  className="w-16 h-0.5 bg-gradient-to-r from-transparent via-yellow-500 to-transparent"
                  animate={{ scaleX: [0, 1, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <div className="flex space-x-1.5">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 bg-yellow-500 rounded-full"
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
                  className="w-16 h-0.5 bg-gradient-to-r from-transparent via-yellow-500 to-transparent"
                  animate={{ scaleX: [0, 1, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Categories Grid with improved spacing and responsiveness */}
          <motion.div variants={itemVariants} className="mb-16 lg:mb-24">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 lg:gap-8">
              {categories.map((category) => (
                <motion.div
                  key={category.id}
                  variants={itemVariants}
                  whileHover={{
                    y: -8, // Lift on hover
                    transition: { duration: 0.3, ease: "easeOut" },
                  }}
                  className="group" // Add group class for nested hover effects
                >
                  <CategoryCard category={category} />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Enhanced Call-to-Action Section */}
          <motion.div
            variants={itemVariants}
            className="text-center mb-16 lg:mb-20">
            <Link href="/danh-muc" passHref>
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 25px 50px rgba(251, 191, 36, 0.3)", // Amber shadow for hover
                }}
                whileTap={{ scale: 0.95 }}
                className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-700 hover:from-amber-600 hover:via-orange-700 hover:to-yellow-800 text-white px-8 py-4 lg:px-12 lg:py-6 rounded-2xl text-base lg:text-xl font-bold transition-all duration-500 shadow-2xl hover:shadow-amber-500/25 overflow-hidden">
                {/* Animated background overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Shimmer effect for button */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />

                <span className="relative z-10 flex items-center gap-3">
                  Khám Phá Tất Cả Danh Mục
                  <motion.span
                    animate={{ x: [0, 4, 0] }} // Arrow animation
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-xl">
                    →
                  </motion.span>
                </span>
              </motion.button>
            </Link>
          </motion.div>

          {/* Enhanced Stats Section (only show if categories exist) */}
          {categories.length > 0 && (
            <motion.div variants={itemVariants} className="flex justify-center">
              <div className="relative group">
                {/* Glow effect around the stats card */}
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-500" />

                <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl border border-gray-200 shadow-2xl p-8 lg:p-10">
                  <div className="flex items-center gap-8 lg:gap-16">
                    {/* Categories count */}
                    <div className="text-center">
                      <motion.div
                        className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-amber-600 to-yellow-700 bg-clip-text text-transparent mb-2"
                        whileHover={{ scale: 1.1 }}>
                        {categories.length}
                      </motion.div>
                      <div className="text-sm lg:text-base text-gray-600 font-medium uppercase tracking-wider">
                        Danh mục
                      </div>
                    </div>

                    {/* Animated separator */}
                    <motion.div
                      className="w-px h-16 bg-gradient-to-b from-transparent via-gray-300 to-transparent"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />

                    {/* Placeholder Products count */}
                    {/* Note: If `CategoryInterface` included a `products` array with `length`,
                        you could uncomment and use the commented-out code below.
                        For now, I'm using a static '500' for demonstration. */}
                    <div className="text-center">
                      <motion.div
                        className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-orange-600 to-red-500 bg-clip-text text-transparent mb-2"
                        whileHover={{ scale: 1.1 }}>
                        500
                        {/* {categories.reduce(
                          (total, cat) => total + (cat.products?.length || 0),
                          0
                        )} */}
                      </motion.div>
                      <div className="text-sm lg:text-base text-gray-600 font-medium uppercase tracking-wider">
                        Sản phẩm
                      </div>
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

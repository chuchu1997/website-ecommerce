/** @format */

"use client";

import CategoryCard from "@/components/ui/CategoryCard";
import { CategoryInterface } from "@/types/category";
import { motion } from "framer-motion";
import Link from "next/link";

interface Props {
  title: string;
  description: string;
  categories: CategoryInterface[];
}

export const ProductCategoriesMotion = (props: Props) => {
  const { title, description, categories } = props;

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

  const cardHover = {
    hover: {
      y: -12,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  return (
    <section className="order-t border-white/30 shadow-inner relative py-12 sm:py-16 lg:py-24 bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-200/30 to-pink-300/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-200/30 to-cyan-300/30 rounded-full blur-3xl" />
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
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl mb-6 sm:mb-8 shadow-lg">
              <span className="text-2xl sm:text-3xl">🏷️</span>
            </div>

            {/* Main Title */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold mb-4 sm:mb-6 leading-tight">
              <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                {title}
              </span>
            </h2>

            {/* Description */}
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-2xl lg:max-w-4xl mx-auto leading-relaxed">
              {description}
            </p>

            {/* Decorative Line */}
            <div className="flex items-center justify-center mt-8 sm:mt-10">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse delay-150" />
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-300" />
              </div>
            </div>
          </motion.div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {categories.map((category) => (
              <CategoryCard category={category} key={category.id} />
            ))}
          </div>

          {/* Call to Action */}
          <Link href={`/danh-muc`}>
            <motion.div
              variants={fadeInUp}
              className="text-center mt-12 sm:mt-16 lg:mt-20">
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(168, 85, 247, 0.4)",
                }}
                whileTap={{ scale: 0.98 }}
                className="group relative bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-xl sm:rounded-2xl text-sm sm:text-base lg:text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-2xl overflow-hidden">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Khám Phá Tất Cả Danh Mục
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}>
                    →
                  </motion.span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.button>
            </motion.div>
          </Link>

          {/* Stats Section */}
          {categories.length > 0 && (
            <motion.div
              variants={fadeInUp}
              className="mt-16 sm:mt-20 lg:mt-24 text-center">
              <div className="inline-flex items-center gap-8 sm:gap-12 px-6 py-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/60 shadow-lg">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
                    {categories.length}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600">
                    Danh mục
                  </div>
                </div>
                <div className="w-px h-8 bg-gray-300" />
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
                    {categories.reduce(
                      (total, cat) => total + (cat.products?.length || 0),
                      0
                    )}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600">
                    Sản phẩm
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

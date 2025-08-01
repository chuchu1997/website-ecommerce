/** @format */
"use client";
import { CategoryInterface } from "@/types/category";
import { motion } from "framer-motion";
import Link from "next/link";
import { ImageLoader } from "../image-loader";

interface Props {
  category: CategoryInterface;
}

const CategoryCard = (props: Props) => {
  const { category } = props;
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
    <Link href={`/danh-muc/${category.slug}`} aria-label={category.name}>
      <motion.div
        variants={fadeInUp}
        whileHover="hover"
        className="group cursor-pointer">
        <motion.div
          variants={cardHover}
          className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 bg-white/50 backdrop-blur-sm border border-white/60">
          {/* Image Container */}
          <div className="relative aspect-[4/3] sm:aspect-[16/12] overflow-hidden">
            <ImageLoader
              src={category.imageUrl}
              alt={category.name}
              fill
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
            />

            {/* Overlay Gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 group-hover:opacity-85 transition-opacity duration-300" />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Shimmer Effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            </div>
          </div>

          {/* Content Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white transform group-hover:scale-105 transition-transform duration-300">
              <motion.h3
                className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3 drop-shadow-lg"
                whileHover={{ scale: 1.05 }}>
                {category.name}
              </motion.h3>

              <div className="flex items-center justify-center gap-2 text-gray-200 group-hover:text-white transition-colors">
                <span className="text-sm sm:text-base lg:text-lg">
                  {category.products && category.products.length} Sản phẩm
                </span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  →
                </motion.span>
              </div>
            </div>
          </div>

          {/* Category Badge */}
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 sm:px-4 sm:py-2 border border-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-white text-xs sm:text-sm font-medium">
                Danh mục
              </span>
            </div>
          </div>

          {/* Bottom Accent */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.div>
      </motion.div>
    </Link>
  );
};

export default CategoryCard;

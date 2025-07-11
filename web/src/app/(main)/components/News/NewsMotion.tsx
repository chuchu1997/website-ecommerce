"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { NewsInterface } from "@/types/news";
import { NewsCard } from "@/components/ui/NewsCard";
import Link from "next/link";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

interface Props {
  news: NewsInterface[];
}

export const NewsMotion: React.FC<Props> = ({ news }) => {
  return (
    <section className="order-t border-white/30 shadow-inner relative py-12 sm:py-16 lg:py-24 bg-gradient-to-br from-orange-50 via-white to-rose-50 overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute -top-32 -right-32 w-80 h-80 bg-gradient-to-br from-rose-200/30 to-pink-300/30 rounded-full blur-3xl z-0" />
      <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-gradient-to-br from-orange-200/30 to-yellow-300/30 rounded-full blur-3xl z-0" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Header */}
          <motion.div variants={fadeInUp} className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-rose-500 to-pink-600 rounded-2xl mb-6 sm:mb-8 shadow-lg">
              <span className="text-2xl sm:text-3xl">📰</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
              Tin Tức
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Cập nhật những xu hướng, bài viết và thông tin mới nhất trong ngành nội thất
            </p>
          </motion.div>

          {/* News Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {news.map((newItem) => (
              <motion.div key={newItem.id} variants={fadeInUp}>
                <NewsCard news={newItem} />
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
            <Link href = "/danh-muc/tin-tuc">
              <motion.div variants={fadeInUp} className="text-center mt-12 sm:mt-16">
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(244, 63, 94, 0.4)" // rose-500 glow
              }}
              whileTap={{ scale: 0.97 }}
              className="group relative bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-2xl"
            >
              <span className="flex items-center gap-2">
                Xem Tất Cả Tin Tức
                <ArrowRight className="w-5 h-5" />
              </span>
              <div className="absolute inset-0 bg-white/10 group-hover:opacity-100 opacity-0 transition-opacity duration-300" />
            </motion.button>
          </motion.div>
            </Link>
        
        </motion.div>
      </div>
    </section>
  );
};

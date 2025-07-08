"use client";

import { motion } from "framer-motion";
import { Brand } from "@/types/brand";

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
  brands: Brand[];
}

export const PartnerBrandsMotion: React.FC<Props> = ({ brands }) => {
  return (
    <section className="order-t border-white/30 shadow-inner relative py-12 sm:py-16 lg:py-24 bg-gradient-to-br from-slate-50 via-white to-slate-100 overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute -top-32 -right-32 w-80 h-80 bg-gradient-to-br from-teal-200/30 to-emerald-300/30 rounded-full blur-3xl z-0" />
      <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-gradient-to-br from-indigo-200/30 to-blue-300/30 rounded-full blur-3xl z-0" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Section Header */}
          <motion.div variants={fadeInUp} className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-teal-500 to-emerald-600 rounded-2xl mb-6 sm:mb-8 shadow-lg">
              <span className="text-2xl sm:text-3xl">🤝</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
              Đối Tác Tin Cậy
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Hợp tác cùng các thương hiệu hàng đầu trong ngành nội thất
            </p>
          </motion.div>

          {/* Brand Logos */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
            {brands.map((brand) => (
              <motion.div
                key={brand.id}
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="bg-white rounded-2xl px-6 py-8 shadow-md hover:shadow-xl transition-shadow flex items-center justify-center"
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="h-12 sm:h-14 object-contain max-w-full grayscale hover:grayscale-0 transition-all duration-300"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

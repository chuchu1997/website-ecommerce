'use client';

import { motion } from 'framer-motion';
import React from 'react';

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
    y: -8,
    transition: { duration: 0.3, ease: 'easeOut' }
  }
};

interface Props {
  industry: string;
}

export const InteriorContent: React.FC<Props> = ({ industry }) => {
  const services = [
    {
      title: 'Nội Thất Gia Đình',
      description:
        'Mang đến giải pháp nội thất hoàn hảo cho phòng khách, phòng ngủ, phòng bếp với thiết kế hiện đại và tinh tế.',
      icon: '🛋️',
      gradient: 'from-yellow-600 to-orange-500',
      bgGradient: 'from-yellow-50 to-orange-50',
    },
    {
      title: 'Thiết Kế & Thi Công Trọn Gói',
      description:
        'Đội ngũ kiến trúc sư và thợ lành nghề sẽ đồng hành từ thiết kế 3D đến thi công hoàn thiện nội thất cho không gian sống của bạn.',
      icon: '📐',
      gradient: 'from-rose-500 to-red-600',
      bgGradient: 'from-rose-50 to-red-50',
    },
    {
      title: 'Bảo Hành & Dịch Vụ Hậu Mãi',
      description:
        'Chính sách bảo hành rõ ràng, hỗ trợ bảo trì – sửa chữa tận nơi nhằm đảm bảo chất lượng sản phẩm bền lâu.',
      icon: '🛠️',
      gradient: 'from-blue-500 to-indigo-600',
      bgGradient: 'from-blue-50 to-indigo-50',
    },
  ];

  return (
    <section className="relative py-12 sm:py-16 lg:py-24 bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-amber-200/30 to-orange-300/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-200/30 to-purple-300/30 rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Header Section */}
          <motion.div variants={fadeInUp} className="text-center mb-12 sm:mb-16 lg:mb-20">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl mb-6 sm:mb-8">
              <span className="text-2xl sm:text-3xl">🏠</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold mb-4 sm:mb-6 leading-tight">
              <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                Kiến Tạo Không Gian Sống Đẳng Cấp
              </span>
              <br />
              <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 bg-clip-text text-transparent">
                {industry || "Happy Furniture"}
              </span>
            </h2>

            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-2xl lg:max-w-4xl mx-auto leading-relaxed">
              Từ nội thất gia đình đến giải pháp thiết kế thi công trọn gói – Happy Furniture đồng hành cùng bạn.
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {services.map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover="hover"
                className="group cursor-pointer"
              >
                <motion.div
                  variants={cardHover}
                  className={`relative bg-gradient-to-br ${item.bgGradient} backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/50 overflow-hidden`}
                >
                  {/* Hover Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Icon */}
                  <div className="relative z-10 mb-6 sm:mb-8">
                    <div className={`inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r ${item.gradient} rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <span className="text-2xl sm:text-3xl lg:text-4xl filter drop-shadow-sm">
                        {item.icon}
                      </span>
                    </div>
                  </div>

                  {/* Title + Description */}
                  <div className="relative z-10">
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 group-hover:text-gray-800 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                      {item.description}
                    </p>
                  </div>

                  {/* Bottom Accent */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

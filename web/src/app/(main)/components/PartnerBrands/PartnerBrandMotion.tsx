"use client";
import { motion } from "framer-motion";
import { BrandInterface } from "@/types/brands";
import { ImageLoader } from "@/components/ui/image-loader";

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
  brands: BrandInterface[];
}

export const PartnerBrandsMotion: React.FC<Props> = ({ brands }) => {
  // Duplicate brands array for seamless looping
  const duplicatedBrands = [...brands, ...brands];
  
  // Calculate animation duration based on number of brands (adjust speed as needed)
  const animationDuration = brands.length * 4; // 4 seconds per brand
  
  return (
    <div className="relative py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.div variants={fadeInUp} className="flex justify-center mb-6">
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
              <span className="text-2xl">🤝</span>
            </div>
          </motion.div>
          
          <motion.h2
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-4"
          >
            Đối Tác Tin Cậy
          </motion.h2>
          
          <motion.p
            variants={fadeInUp}
            className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
          >
            Hợp tác cùng các thương hiệu hàng đầu trong ngành nội thất
          </motion.p>
        </motion.div>

        {/* Continuous Sliding Brand Logos */}
        <div className="relative">
          {/* Gradient fade edges */}
          <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-white via-white to-transparent z-20 pointer-events-none"></div>
          <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-white via-white to-transparent z-20 pointer-events-none"></div>
          
          {/* Sliding container */}
          <div className="overflow-hidden">
            <motion.div
              className="flex items-center gap-12"
              animate={{
                x: [`0%`, `-${100 * brands.length / duplicatedBrands.length}%`],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: animationDuration,
                  ease: "linear",
                },
              }}
              style={{
                width: `${duplicatedBrands.length * 200}px`, // Adjust based on brand width
              }}
            >
              {duplicatedBrands.map((brand, index) => (
                <motion.div
                  key={`${brand.id}-${index}`}
                  className="flex-shrink-0 group"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-2  w-48 h-32 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-blue-50 group-hover:to-purple-50 border border-gray-100">
                    {/* Hover glow effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <div className="relative z-10 h-full w-full rounded-2xl overflow-hidden">
                      <ImageLoader
                        src={brand.imageUrl}
                        alt={brand.name}
                    fill
                        className="object-cover filter  transition-all duration-300 group-hover:brightness-110"
                      />
                    </div>
                    
                    {/* Subtle border animation */}
                    <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-gradient-to-br group-hover:from-blue-300 group-hover:to-purple-300 transition-all duration-300"></div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
          
          {/* Optional: Pause on hover */}
          <style jsx>{`
            .overflow-hidden:hover .flex {
              animation-play-state: paused;
            }
          `}</style>
        </div>
        
        {/* Stats or additional info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-gray-200">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gray-700">
              Tin cậy bởi {brands.length}+ thương hiệu hàng đầu
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Props {
  mainTitle?: string;
  subTitle?: string;
  description?: string;
  action?: string;
  link?: string;
}

export const HeroMotion = (props: Props) => {
  const { mainTitle, subTitle, description, action, link } = props;
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
      setIsMounted(true);
    }, []);
    if (!isMounted) return null;

  const staggerContainer = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const fadeInUpStagger = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeOut" }
  };

  return (
    <motion.div 
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20"
    >
      {/* Main Title */}
      <motion.h1 
        variants={fadeInUpStagger}
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-4 lg:mb-6 leading-tight tracking-tight"
      >
        <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          {mainTitle}
        </span>
        {subTitle && (
          <span className="block bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 bg-clip-text text-transparent mt-2">
            {subTitle}
          </span>
        )}
      </motion.h1>

      {/* Description */}
      {description && (
        <motion.p 
          variants={fadeInUpStagger}
          className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 lg:mb-12 text-gray-300 max-w-2xl mx-auto leading-relaxed"
        >
          {description}
        </motion.p>
      )}

      {/* Action Button */}
      {action && (
        <motion.div 
          variants={fadeInUpStagger}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(245, 158, 11, 0.3)"
            }}
            whileTap={{ scale: 0.98 }}
            className="group relative bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-sm sm:text-base md:text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-2xl overflow-hidden"
          >
            <span className="relative z-10">{action}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.button>
          
          {/* Optional secondary action */}
          {link && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="text-gray-300 hover:text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-sm sm:text-base md:text-lg font-medium transition-all duration-300 border border-gray-600 hover:border-gray-400 hover:bg-gray-800/50"
            >
              Learn More
            </motion.button>
          )}
        </motion.div>
      )}

      {/* Decorative Elements */}
      {/* <motion.div 
        variants={fadeInUpStagger}
        className="mt-12 lg:mt-16 flex justify-center"
      >
        <div className="flex space-x-2">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ 
                y: [0, -10, 0],
                opacity: [0.4, 1, 0.4]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                delay: i * 0.2
              }}
              className="w-2 h-2 bg-amber-500 rounded-full"
            />
          ))}
        </div>
      </motion.div> */}
    </motion.div>
  );
};
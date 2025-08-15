"use client";
import { motion } from "framer-motion";
import Link from "next/link";
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
    transition: { duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }
  };

  return (
    <motion.div 
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="text-center max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 mt-auto mb-16"
    >
      {/* Main Title */}
      <motion.h1 
        variants={fadeInUpStagger}
        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-4 lg:mb-6 leading-[0.9] tracking-tight"
        style={{
          letterSpacing: '-0.02em',
          fontWeight: '900'
        }}
      >
        <motion.span 
          className="bg-clip-text text-transparent drop-shadow-2xl"
          style={{
            backgroundImage: 'linear-gradient(135deg, var(--color-text-white) 0%, var(--color-primary-light) 60%, var(--color-primary) 100%)',
            backgroundSize: '200% 200%'
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {mainTitle}
        </motion.span>
        {subTitle && (
          <motion.span 
            className="block bg-clip-text text-transparent mt-3 drop-shadow-lg"
            style={{
              backgroundImage: 'var(--gradient-primary)',
              fontWeight: '800'
            }}
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1, ease: [0.25, 0.4, 0.25, 1] }}
          >
            {subTitle}
          </motion.span>
        )}
      </motion.h1>

      {/* Description */}
      {description && (
        <motion.p 
          variants={fadeInUpStagger}
          className="text-sm sm:text-base md:text-lg lg:text-xl mb-6 lg:mb-8 max-w-2xl mx-auto leading-relaxed font-light tracking-wide"
          style={{ 
            color: 'var(--color-text-muted)',
            textShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
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
              y: -2
            }}
            whileTap={{ scale: 0.98 }}
            className="group relative px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-sm sm:text-base md:text-lg font-semibold transition-all duration-300 overflow-hidden"
            style={{
              background: 'var(--gradient-primary)',
              color: 'var(--color-text-white)',
              boxShadow: 'var(--shadow-default)'
            }}
            animate={{
              boxShadow: [
                'var(--shadow-default)',
                'var(--shadow-hover)',
                'var(--shadow-default)'
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Link href={link ?? ""}>
              <span className="relative z-10 flex items-center gap-2">
                {action}
                <motion.span
                  animate={{
                    x: [0, 4, 0]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  →
                </motion.span>
              </span>
              <motion.div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'linear-gradient(135deg, var(--color-primary-hover) 0%, var(--color-primary-dark) 100%)'
                }}
              />
              
              {/* Shimmer Effect */}
              <motion.div
                className="absolute inset-0 -translate-x-full"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)'
                }}
                animate={{
                  translateX: ['-100%', '200%']
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1,
                  ease: "linear"
                }}
              />
            </Link>
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
};
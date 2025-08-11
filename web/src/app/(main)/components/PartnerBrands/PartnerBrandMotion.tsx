"use client";
import { motion } from "framer-motion";
import { BrandInterface } from "@/types/brands";
import { ImageLoader } from "@/components/ui/image-loader";
import { Award, Users, Star } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  brands: BrandInterface[];
  industry: string;
}

export const PartnerBrandsMotion: React.FC<Props> = ({ brands, industry }) => {
  const [isMounted, setIsMounted] = useState(false);
  
  // Create seamless loop animation data
  const duplicatedBrands = [...brands, ...brands];
  const animationDuration = 40;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
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
        ease: [0.25, 0.46, 0.45, 0.94]
      },
    },
  };

  const floatingVariants = {
    animate: {
      y: [-4, 4, -4],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <section 
      className="relative py-20 lg:py-28 overflow-hidden"
      style={{ 
        background: 'var(--color-bg-secondary)',
        color: 'var(--color-text-primary)'
      }}
    >
      {/* Refined Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Subtle floating elements */}
        <motion.div 
          variants={floatingVariants}
          animate="animate"
          className="absolute top-1/4 right-1/4 w-72 h-72 rounded-full opacity-20"
          style={{ 
            background: 'radial-gradient(circle, var(--color-primary-light) 0%, transparent 60%)',
            filter: 'blur(60px)'
          }}
        />
        <motion.div 
          variants={floatingVariants}
          animate="animate"
     
          className="absolute bottom-1/4 left-1/5 w-64 h-64 rounded-full opacity-15"
          style={{ 
            background: 'radial-gradient(circle, var(--color-accent-green) 0%, transparent 60%)',
            filter: 'blur(50px)',
            animationDelay: "3s"
          }}
        />
        
        {/* Elegant pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, var(--color-border) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Sophisticated Header */}
          <motion.div variants={itemVariants} className="text-center mb-16 lg:mb-20">
            <div className="max-w-4xl mx-auto">
              {/* Premium badge */}
              <motion.div 
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full mb-8 border"
                style={{ 
                  background: 'var(--color-bg)',
                  borderColor: 'var(--color-border)',
                  color: 'var(--color-text-secondary)'
                }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Award className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
                <span className="font-medium">Đối Tác Tin Cậy</span>
                <div 
                  className="w-2 h-2 rounded-full"
                  style={{ background: 'var(--color-accent-green)' }}
                />
              </motion.div>

              {/* Elegant title */}
            
                  <h2 
              className="font-bold text-4xl sm:text-5xl lg:text-6xl  mb-6 leading-tight capitalize"
              style={{ color: 'var(--color-text-primary)' }}
            >
              Các đối tác{" "}
              <span style={{ color: 'var(--color-primary)' }}>
               hàng đầu
              </span>
            </h2>

              {/* Professional description */}
              <motion.p 
                variants={itemVariants}
                className="text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                Chúng tôi tự hào hợp tác cùng những thương hiệu uy tín nhất trong ngành {industry}, 
                mang đến giải pháp toàn diện cho mọi dự án
              </motion.p>

              {/* Trust indicators */}
              <motion.div 
                variants={itemVariants}
                className="flex items-center justify-center gap-8 mt-8"
              >
                {[
                  { icon: Users, label: `${brands.length}+ Đối Tác`, color: 'var(--color-accent-green)' },
                  { icon: Star, label: "Chất Lượng Cao", color: 'var(--color-primary)' },
                  { icon: Award, label: "Uy Tín Hàng Đầu", color: 'var(--color-accent-red)' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <item.icon className="w-5 h-5" style={{ color: item.color }} />
                    <span 
                      className="text-sm font-medium"
                      style={{ color: 'var(--color-text-muted)' }}
                    >
                      {item.label}
                    </span>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Premium Brand Showcase */}
          <motion.div variants={itemVariants} className="mb-16">
            {/* Featured Partners Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 lg:gap-8 mb-12">
              {brands.slice(0, 10).map((brand, index) => (
                <motion.div
                  key={brand.id}
                  variants={itemVariants}
                  className="group relative"
                  whileHover={{ y: -6, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {/* Elegant glow */}
                  <div 
                    className="absolute -inset-2 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ 
                      background: 'linear-gradient(135deg, var(--color-primary-light), var(--color-accent-green-light))',
                      filter: 'blur(12px)'
                    }}
                  />
                  
                  {/* Brand card */}
                  <div 
                    className="relative aspect-[4/3] rounded-2xl border transition-all duration-300 overflow-hidden group"
                    style={{ 
                      background: 'var(--color-bg)',
                      borderColor: 'var(--color-border)',
                      boxShadow: 'var(--shadow-default)'
                    }}
                  >
                    {/* Subtle hover overlay */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ 
                        background: 'linear-gradient(135deg, var(--color-bg-accent) 0%, transparent 100%)'
                      }}
                    />
                    
                    {/* Premium accent */}
                    <div 
                      className="absolute top-0 left-0 right-0 h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                      style={{ background: 'var(--gradient-primary)' }}
                    />
                    
                    <div className="relative z-10 p-6 h-full flex items-center justify-center">
                      <div className="relative w-full h-full">
                        <ImageLoader
                          src={brand.imageUrl}
                          alt={brand.name}
                          fill
                          className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Infinite Scroll Carousel */}
            {brands.length > 10 && (
              <div className="relative overflow-hidden">
                {/* Fade edges */}
                <div 
                  className="absolute left-0 top-0 w-20 h-full z-10 pointer-events-none"
                  style={{ 
                    background: 'linear-gradient(90deg, var(--color-bg-secondary) 0%, transparent 100%)'
                  }}
                />
                <div 
                  className="absolute right-0 top-0 w-20 h-full z-10 pointer-events-none"
                  style={{ 
                    background: 'linear-gradient(270deg, var(--color-bg-secondary) 0%, transparent 100%)'
                  }}
                />
                
                <motion.div
                  className="flex items-center gap-6"
                  animate={{
                    x: ["0%", "-50%"],
                  }}
                  transition={{
                    x: {
                      repeat: Infinity,
                      repeatType: "loop",
                      duration: animationDuration,
                      ease: "linear",
                    },
                  }}
                  style={{ width: `${duplicatedBrands.length * 200}px` }}
                >
                  {duplicatedBrands.map((brand, index) => (
                    <div
                      key={`carousel-${brand.id}-${index}`}
                      className="flex-shrink-0 group"
                    >
                      <div 
                        className="w-40 h-24 rounded-xl border flex items-center justify-center p-4 transition-all duration-300"
                        style={{ 
                          background: 'var(--color-bg)',
                          borderColor: 'var(--color-border-light)'
                        }}
                      >
                        <div className="relative w-full h-full">
                          <ImageLoader
                            src={brand.imageUrl}
                            alt={brand.name}
                            fill
                            className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>
            )}
          </motion.div>

          {/* Professional Stats Section */}
          <motion.div variants={itemVariants} className="text-center">
            <div 
              className="inline-flex items-center gap-6 px-8 py-4 rounded-full border"
              style={{ 
                background: 'var(--color-bg)',
                borderColor: 'var(--color-border)',
                boxShadow: 'var(--shadow-default)'
              }}
            >
              {/* Trust indicator */}
              <div className="flex items-center gap-3">
                <motion.div 
                  className="w-3 h-3 rounded-full"
                  style={{ background: 'var(--color-accent-green)' }}
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7] 
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span 
                  className="text-sm font-medium"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  Đang Hoạt Động
                </span>
              </div>

              {/* Divider */}
              <div 
                className="w-px h-6"
                style={{ background: 'var(--color-border)' }}
              />

              {/* Main stat */}
              <span 
                className="font-medium"
                style={{ color: 'var(--color-text-primary)' }}
              >
                <span style={{ color: 'var(--color-primary)' }} className="font-semibold">
                  {brands.length}+
                </span>{' '}
                Thương hiệu đối tác tin cậy
              </span>

              {/* Quality badge */}
              <div 
                className="flex items-center gap-2 px-3 py-1 rounded-full"
                style={{ 
                  background: 'var(--color-accent-green-light)',
                  color: 'var(--color-accent-green)'
                }}
              >
                <Star className="w-4 h-4 fill-current" />
                <span className="text-sm font-medium">Chất Lượng Cao</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
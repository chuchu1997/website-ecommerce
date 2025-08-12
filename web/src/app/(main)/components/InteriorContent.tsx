'use client';

import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { Palette, Home, Lightbulb, Ruler, Sparkles, CheckCircle } from 'lucide-react';

interface Props {
  industry: string;
}

export const InteriorContent: React.FC<Props> = ({ industry }) => {
  const [isMounted, setIsMounted] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 24,
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
      y: [-6, 6, -6],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const services = [
    {
      title: 'Thiết Kế Nội Thất Cao Cấp',
      description: 'Tạo ra những không gian sống đẳng cấp với phong cách hiện đại, tối giản và sang trọng. Từ concept đến hoàn thiện.',
      icon: Palette,
      color: 'var(--color-primary)',
      bgColor: 'var(--color-accent-green-light)',
      features: ['Thiết kế 3D chuyên nghiệp', 'Tư vấn phong thủy', 'Phong cách đa dạng']
    },
    {
      title: 'Thi Công & Giám Sát',
      description: 'Đội ngũ thợ lành nghề với kinh nghiệm nhiều năm, đảm bảo chất lượng thi công theo đúng thiết kế và tiến độ.',
      icon: Home,
      color: 'var(--color-accent-green)',
      bgColor: 'var(--color-primary-light)',
      features: ['Thi công chuyên nghiệp', 'Giám sát chặt chẽ', 'Bảo hành dài hạn']
    },
    {
      title: 'Tư Vấn & Lập Kế Hoạch',
      description: 'Phân tích không gian, tư vấn bố trí hợp lý và lập kế hoạch chi tiết cho từng giai đoạn thực hiện dự án.',
      icon: Lightbulb,
      color: 'var(--color-accent-red)',
      bgColor: 'var(--color-accent-red-light)',
      features: ['Khảo sát miễn phí', 'Tư vấn chuyên sâu', 'Lập kế hoạch chi tiết']
    },
    {
      title: 'Đo Đạc & Thiết Kế 3D',
      description: 'Sử dụng công nghệ hiện đại để đo đạc chính xác và tạo mô hình 3D chân thực, giúp khách hàng hình dung rõ ràng.',
      icon: Ruler,
      color: 'var(--color-primary)',
      bgColor: 'var(--color-bg-accent)',
      features: ['Đo đạc laser chính xác', 'Mô hình 3D chân thực', 'Render chất lượng cao']
    }
  ];

  const achievements = [
    { number: '500+', label: 'Dự Án Hoàn Thành', icon: Home },
    { number: '15+', label: 'Năm Kinh Nghiệm', icon: CheckCircle },
    { number: '50+', label: 'Đối Tác Tin Cậy', icon: Sparkles },
  ];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <section 
      className="relative py-20 lg:py-28 overflow-hidden"
      style={{ 
        background: 'linear-gradient(135deg, var(--color-bg) 0%, var(--color-bg-secondary) 100%)',
        color: 'var(--color-text-primary)'
      }}
    >
      {/* Elegant Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Refined floating elements */}
        <motion.div 
          variants={floatingVariants}
          animate="animate"
          className="absolute top-1/4 right-1/5 w-80 h-80 rounded-full opacity-15"
          style={{ 
            background: 'radial-gradient(circle, var(--color-primary-light) 0%, transparent 70%)',
            filter: 'blur(60px)'
          }}
        />
        <motion.div 
          variants={floatingVariants}
          animate="animate"
       
          className="absolute bottom-1/4 left-1/6 w-72 h-72 rounded-full opacity-12"
          style={{ 
            background: 'radial-gradient(circle, var(--color-accent-green) 0%, transparent 70%)',
            filter: 'blur(50px)',
            animationDelay: "4s" 
          }}
        />
        
        {/* Sophisticated pattern */}
        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, var(--color-border) 2px, transparent 2px)`,
            backgroundSize: '60px 60px'
          }}
        />
        
        {/* Decorative lines */}
        <div className="absolute top-1/3 left-10 w-px h-24 opacity-20" style={{ background: 'var(--color-primary)' }} />
        <div className="absolute bottom-1/3 right-16 w-px h-32 opacity-15" style={{ background: 'var(--color-accent-green)' }} />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Premium Header Section */}
          <motion.div variants={itemVariants} className="text-center mb-16 lg:mb-20">
            <div className="max-w-5xl mx-auto">
              {/* Professional badge */}
              <motion.div 
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full mb-8 border"
                style={{ 
                  background: 'var(--color-bg)',
                  borderColor: 'var(--color-border)',
                  color: 'var(--color-text-secondary)',
                  boxShadow: 'var(--shadow-default)'
                }}
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Sparkles className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
                <span className="font-medium">Dịch Vụ Chuyên Nghiệp</span>
                <motion.div 
                  className="w-2 h-2 rounded-full"
                  style={{ background: 'var(--color-accent-green)' }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>

              {/* Modern title with better hierarchy */}
                <h2
                  className="font-bold text-4xl sm:text-5xl lg:text-6xl  mb-6 leading-tight capitalize"
                  style={{ color: "var(--color-text-primary)" }}>
                  Giải pháp {""}
                  <span style={{ color: "var(--color-primary)" }}>
                    nội thất hoàn hảo
                  </span>
                </h2>
              {/* Enhanced description */}
              <motion.p 
                variants={itemVariants}
                className="text-lg lg:text-xl xl:text-2xl max-w-4xl mx-auto leading-relaxed mb-8"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                Từ ý tưởng đến hiện thực - chúng tôi tạo nên những không gian sống đẳng cấp, 
                phản ánh cá tính và phong cách riêng của bạn trong ngành {industry}
              </motion.p>

              {/* Professional stats */}
              <motion.div 
                variants={itemVariants}
                className="flex items-center justify-center gap-8 lg:gap-12"
              >
                {achievements.map((achievement, index) => (
                  <div key={index} className="text-center">
                    <div 
                      className="text-2xl lg:text-3xl font-bold mb-1"
                      style={{ color: 'var(--color-primary)' }}
                    >
                      {achievement.number}
                    </div>
                    <div 
                      className="text-sm lg:text-base font-medium"
                      style={{ color: 'var(--color-text-muted)' }}
                    >
                      {achievement.label}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Enhanced Services Grid */}
          <motion.div variants={itemVariants} className="mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="group relative"
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                >
                  {/* Elegant glow effect */}
                  <div 
                    className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ 
                      background: service.color,
                      filter: 'blur(12px)',
                      opacity: '0.1'
                    }}
                  />
                  
                  {/* Main service card */}
                  <div 
                    className="relative rounded-3xl border transition-all duration-300 overflow-hidden"
                    style={{ 
                      background: 'var(--color-bg)',
                      borderColor: 'var(--color-border)',
                      boxShadow: 'var(--shadow-default)'
                    }}
                  >
                    {/* Premium accent line */}
                    <div 
                      className="absolute top-0 left-0 right-0 h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                      style={{ background: service.color }}
                    />
                    
                    {/* Card content */}
                    <div className="p-8 lg:p-10">
                      {/* Icon and title section */}
                      <div className="flex items-start gap-6 mb-6">
                        <motion.div 
                          className="flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center border"
                          style={{ 
                            background: service.bgColor,
                            borderColor: 'var(--color-border-light)'
                          }}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <service.icon 
                            className="w-8 h-8" 
                            style={{ color: service.color }}
                          />
                        </motion.div>
                        
                        <div className="flex-1">
                          <h3 
                            className="text-xl lg:text-2xl font-semibold mb-3"
                            style={{ color: 'var(--color-text-primary)' }}
                          >
                            {service.title}
                          </h3>
                          <p 
                            className="text-base lg:text-lg leading-relaxed"
                            style={{ color: 'var(--color-text-secondary)' }}
                          >
                            {service.description}
                          </p>
                        </div>
                      </div>

                      {/* Features list */}
                      <div className="space-y-3">
                        {service.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center gap-3">
                            <CheckCircle 
                              className="w-5 h-5 flex-shrink-0" 
                              style={{ color: service.color }}
                            />
                            <span 
                              className="text-sm lg:text-base"
                              style={{ color: 'var(--color-text-muted)' }}
                            >
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Subtle corner accent */}
                    <div 
                      className="absolute bottom-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ 
                        background: `linear-gradient(135deg, transparent 50%, ${service.color}15 100%)`,
                        borderRadius: '1.5rem 0 1.5rem 0'
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Professional Call-to-Action */}
          <motion.div variants={itemVariants} className="">
            <div 
              className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-10 py-6 rounded-2xl border"
              style={{ 
                background: 'var(--color-bg)',
                borderColor: 'var(--color-border)',
                boxShadow: 'var(--shadow-hover)'
              }}
            >
              {/* Quality indicator */}
              <div className="flex items-center gap-3">
                <motion.div 
                  className="relative"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles 
                    className="w-6 h-6" 
                    style={{ color: 'var(--color-primary)' }}
                  />
                </motion.div>
                <div>
                  <div 
                    className="text-lg font-semibold"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    Chất Lượng Đảm Bảo
                  </div>
                  <div 
                    className="text-sm"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    Bảo hành dài hạn
                  </div>
                </div>
              </div>

              {/* Divider */}
          

              {/* Main message */}
              <div className="">
                <div 
                  className="text-lg font-medium mb-1"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  Tư vấn miễn phí cho dự án của bạn
                </div>
                <div 
                  className="text-sm"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  Liên hệ ngay để được hỗ trợ tốt nhất
                </div>
              </div>

              {/* Status indicator */}
              <div className="flex items-center gap-2">
                <motion.div 
                  className="w-3 h-3 rounded-full"
                  style={{ background: 'var(--color-accent-green)' }}
                  animate={{ 
                    scale: [1, 1.3, 1],
                    opacity: [0.7, 1, 0.7] 
                  }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                />
                <span 
                  className="text-sm font-medium"
                  style={{ color: 'var(--color-accent-green)' }}
                >
                  Đang hoạt động
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
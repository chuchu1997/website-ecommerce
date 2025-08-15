'use client';

import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { Building2, MapPin, TrendingUp, Users, Sparkles, CheckCircle, Home, Shield } from 'lucide-react';

interface Props {
  industry: string;
}

export const RealEstateServices: React.FC<Props> = ({ industry }) => {
  const [isMounted, setIsMounted] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94]
      },
    },
  };

  const floatingVariants = {
    animate: {
      y: [-8, 8, -8],
      x: [-4, 4, -4],
      transition: {
        duration: 12,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const services = [
    {
      title: 'Phát Triển Dự Án Cao Cấp',
      description: 'Phát triển những dự án bất động sản đẳng cấp với vị trí vàng, thiết kế hiện đại và tiện ích hoàn hảo. Từ khảo sát đến bàn giao.',
      icon: Building2,
      color: 'var(--color-primary)',
      bgColor: 'var(--color-primary-light)',
      features: ['Vị trí đắc địa', 'Thiết kế hiện đại', 'Tiện ích 5 sao']
    },
    {
      title: 'Tư Vấn Đầu Tư Thông Minh',
      description: 'Đội ngũ chuyên gia với kinh nghiệm nhiều năm, phân tích thị trường và tư vấn các cơ hội đầu tư sinh lời cao.',
      icon: TrendingUp,
      color: 'var(--color-success)',
      bgColor: 'var(--color-success-light)',
      features: ['Phân tích chuyên sâu', 'ROI tối ưu', 'Rủi ro thấp']
    },
    {
      title: 'Quản Lý & Phân Phối',
      description: 'Hệ thống phân phối chuyên nghiệp với mạng lưới đại lý rộng khắp, đảm bảo tiến độ bán hàng và dịch vụ tốt nhất.',
      icon: Users,
      color: 'var(--color-accent-orange)',
      bgColor: 'var(--color-accent-orange-light)',
      features: ['Mạng lưới rộng khắp', 'Dịch vụ chuyên nghiệp', 'Hỗ trợ 24/7']
    },
    {
      title: 'Pháp Lý & Thủ Tục',
      description: 'Đảm bảo tính minh bạch và đầy đủ các thủ tục pháp lý, giúp khách hàng an tâm trong quá trình mua bán.',
      icon: Shield,
      color: 'var(--color-accent-blue)',
      bgColor: 'var(--color-accent-blue-light)',
      features: ['Pháp lý minh bạch', 'Thủ tục nhanh chóng', 'Bảo vệ quyền lợi']
    }
  ];

  const achievements = [
    { number: '150+', label: 'Dự Án Hoàn Thành', icon: Building2 },
    { number: '25+', label: 'Năm Kinh Nghiệm', icon: CheckCircle },
    { number: '10K+', label: 'Khách Hàng Tin Tưởng', icon: Users },
  ];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <section 
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ 
        background: 'linear-gradient(135deg, var(--color-bg) 0%, var(--color-bg-secondary) 100%)',
        color: 'var(--color-text-primary)'
      }}
    >
      {/* Modern Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating geometric shapes */}
        <motion.div 
          variants={floatingVariants}
          animate="animate"
          className="absolute top-1/5 right-1/4 w-96 h-96 rounded-full opacity-8"
          style={{ 
            background: 'radial-gradient(circle, var(--color-primary) 0%, transparent 65%)',
            filter: 'blur(80px)'
          }}
        />
        <motion.div 
          variants={floatingVariants}
          animate="animate"
          className="absolute bottom-1/5 left-1/5 w-80 h-80 rounded-full opacity-6"
          style={{ 
            background: 'radial-gradient(circle, var(--color-success) 0%, transparent 65%)',
            filter: 'blur(70px)',
            animationDelay: "6s" 
          }}
        />
        
        {/* Professional grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
        
        {/* Accent lines */}
        <div className="absolute top-1/4 left-16 w-px h-32 opacity-15" style={{ background: 'var(--color-primary)' }} />
        <div className="absolute bottom-1/4 right-20 w-px h-40 opacity-12" style={{ background: 'var(--color-success)' }} />
        
        {/* Floating icons */}
        <motion.div
          className="absolute top-1/6 left-1/3 opacity-5"
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity }}
        >
          <Building2 className="w-12 h-12" style={{ color: 'var(--color-primary)' }} />
        </motion.div>
        <motion.div
          className="absolute bottom-1/6 right-1/3 opacity-5"
          animate={{ rotate: -360, scale: [1.2, 1, 1.2] }}
          transition={{ duration: 25, repeat: Infinity }}
        >
          <Home className="w-10 h-10" style={{ color: 'var(--color-success)' }} />
        </motion.div>
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-120px" }}
        >
          {/* Premium Header Section */}
          <motion.div variants={itemVariants} className="text-center mb-20 lg:mb-24">
            <div className="max-w-6xl mx-auto">
              
              {/* Professional Badge */}
              <motion.div 
                className="inline-flex items-center gap-4 px-8 py-4 rounded-full mb-10 border backdrop-blur-sm"
                style={{ 
                  background: 'rgba(255, 255, 255, 0.95)',
                  borderColor: 'var(--color-border-accent)',
                  color: 'var(--color-text-secondary)',
                  boxShadow: 'var(--shadow-default)'
                }}
                whileHover={{ scale: 1.05, y: -3 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div
                  className="w-3 h-3 rounded-full animate-pulse"
                  style={{ background: 'var(--color-primary)' }}
                />
                <Sparkles className="w-6 h-6" style={{ color: 'var(--color-primary)' }} />
                <span className="font-bold text-lg">Dịch Vụ Bất Động Sản Chuyên Nghiệp</span>
                <motion.div 
                  className="w-3 h-3 rounded-full"
                  style={{ background: 'var(--color-success)' }}
                  animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                />
              </motion.div>

              {/* Hero Title */}
              <h2 className="font-black text-5xl sm:text-6xl lg:text-7xl xl:text-8xl mb-8 leading-[0.9]">
                <div style={{ color: "var(--color-text-primary)" }} className="mb-4">
                  Giải Pháp
                </div>
                <div 
                  className="bg-clip-text text-transparent mb-4"
                  style={{
                    background: "var(--gradient-primary)",
                    WebkitBackgroundClip: "text",
                  }}
                >
                  Bất Động Sản
                </div>
                <div 
                  className="text-3xl lg:text-5xl xl:text-6xl font-light"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  Toàn Diện
                </div>
              </h2>

              {/* Enhanced Description */}
              <motion.p 
                variants={itemVariants}
                className="text-xl lg:text-2xl xl:text-3xl max-w-5xl mx-auto leading-relaxed mb-12"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                Từ phát triển dự án đến tư vấn đầu tư - chúng tôi mang đến những cơ hội 
                <span style={{ color: 'var(--color-primary)', fontWeight: 'bold' }}> đầu tư sinh lời </span>
                và <span style={{ color: 'var(--color-success)', fontWeight: 'bold' }}>an cư lập nghiệp</span> tốt nhất 
                trong lĩnh vực {industry}
              </motion.p>

              {/* Professional Achievement Stats */}
              <motion.div 
                variants={itemVariants}
                className="flex flex-col sm:flex-row items-center justify-center gap-12 lg:gap-16"
              >
                {achievements.map((achievement, index) => (
                  <motion.div 
                    key={index} 
                    className="group text-center"
                    whileHover={{ scale: 1.1, y: -5 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <div className="relative">
                      {/* Icon Background */}
                      <div 
                        className="w-20 h-20 mx-auto rounded-2xl flex items-center justify-center mb-4 border-2 transition-all duration-300 group-hover:scale-110"
                        style={{ 
                          backgroundColor: 'var(--color-bg)',
                          borderColor: 'var(--color-border-accent)',
                          boxShadow: 'var(--shadow-default)'
                        }}
                      >
                        <achievement.icon 
                          className="w-10 h-10" 
                          style={{ color: 'var(--color-primary)' }}
                        />
                      </div>
                      
                      {/* Achievement Number */}
                      <div 
                        className="text-3xl lg:text-4xl font-black mb-2 bg-clip-text text-transparent"
                        style={{
                          background: "var(--gradient-primary)",
                          WebkitBackgroundClip: "text",
                        }}
                      >
                        {achievement.number}
                      </div>
                      
                      {/* Achievement Label */}
                      <div 
                        className="text-base lg:text-lg font-bold"
                        style={{ color: 'var(--color-text-muted)' }}
                      >
                        {achievement.label}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Enhanced Services Grid */}
          <motion.div variants={itemVariants} className="mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="group relative"
                  whileHover={{ y: -12, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 150, damping: 15 }}
                >
                  {/* Premium Glow Effect */}
                  <div 
                    className="absolute -inset-2 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-700"
                    style={{ 
                      background: `linear-gradient(135deg, ${service.color}15, ${service.color}05)`,
                      filter: 'blur(20px)'
                    }}
                  />
                  
                  {/* Main Service Card */}
                  <div 
                    className="relative rounded-3xl border-2 transition-all duration-500 overflow-hidden backdrop-blur-sm"
                    style={{ 
                      background: 'rgba(255, 255, 255, 0.98)',
                      borderColor: 'var(--color-border-light)',
                      boxShadow: 'var(--shadow-hover)'
                    }}
                  >
                    {/* Top Accent Bar */}
                    <div 
                      className="absolute top-0 left-0 right-0 h-1.5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700"
                      style={{ background: `linear-gradient(90deg, ${service.color}, ${service.color}80)` }}
                    />
                    
                    {/* Card Content */}
                    <div className="p-10 lg:p-12">
                      {/* Header Section */}
                      <div className="flex items-start gap-8 mb-8">
                        <motion.div 
                          className="flex-shrink-0 relative"
                          whileHover={{ scale: 1.15, rotate: 10 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          {/* Icon Container */}
                          <div 
                            className="w-20 h-20 rounded-2xl flex items-center justify-center border-2 relative overflow-hidden"
                            style={{ 
                              background: service.bgColor,
                              borderColor: 'var(--color-border-accent)'
                            }}
                          >
                            <service.icon 
                              className="w-10 h-10 relative z-10" 
                              style={{ color: service.color }}
                            />
                            
                            {/* Icon Background Effect */}
                            <div 
                              className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                              style={{ background: service.color }}
                            />
                          </div>
                          
                          {/* Floating Badge */}
                          <div 
                            className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                            style={{ background: service.color }}
                          >
                            <Sparkles className="w-3 h-3 text-white" />
                          </div>
                        </motion.div>
                        
                        <div className="flex-1">
                          <h3 
                            className="text-2xl lg:text-3xl font-black mb-4 leading-tight"
                            style={{ color: 'var(--color-text-primary)' }}
                          >
                            {service.title}
                          </h3>
                          <p 
                            className="text-lg lg:text-xl leading-relaxed"
                            style={{ color: 'var(--color-text-secondary)' }}
                          >
                            {service.description}
                          </p>
                        </div>
                      </div>

                      {/* Features List */}
                      <div className="space-y-4">
                        {service.features.map((feature, featureIndex) => (
                          <motion.div 
                            key={featureIndex} 
                            className="flex items-center gap-4 p-3 rounded-xl transition-all duration-300 hover:scale-105"
                            style={{ backgroundColor: 'var(--color-bg-secondary)' }}
                            whileHover={{ x: 8 }}
                          >
                            <div
                              className="w-6 h-6 rounded-full flex items-center justify-center"
                              style={{ background: service.color }}
                            >
                              <CheckCircle 
                                className="w-4 h-4 text-white" 
                              />
                            </div>
                            <span 
                              className="text-base lg:text-lg font-medium"
                              style={{ color: 'var(--color-text-primary)' }}
                            >
                              {feature}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Corner Accent */}
                    <div 
                      className="absolute bottom-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"
                      style={{ 
                        background: `radial-gradient(circle at bottom right, ${service.color}10 0%, transparent 50%)`,
                        borderRadius: '3rem 0 1.5rem 0'
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Professional Call-to-Action */}
          <motion.div variants={itemVariants} className="max-w-5xl mx-auto">
            <div 
              className="relative rounded-3xl border-2 overflow-hidden backdrop-blur-sm"
              style={{ 
                background: 'rgba(255, 255, 255, 0.95)',
                borderColor: 'var(--color-border-accent)',
                boxShadow: 'var(--shadow-hover)'
              }}
            >
              {/* Background Pattern */}
              <div 
                className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage: `radial-gradient(circle at 25% 25%, var(--color-primary) 2px, transparent 2px)`,
                  backgroundSize: '30px 30px'
                }}
              />
              
              <div className="relative p-10 lg:p-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                  
                  {/* Trust Badge */}
                  <div className="md:col-span-1">
                    <div className="flex items-center gap-4">
                      <motion.div 
                        className="relative"
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      >
                        <div
                          className="w-16 h-16 rounded-2xl flex items-center justify-center border-2"
                          style={{
                            background: 'var(--color-success-light)',
                            borderColor: 'var(--color-success)'
                          }}
                        >
                          <Shield className="w-8 h-8" style={{ color: 'var(--color-success)' }} />
                        </div>
                      </motion.div>
                      <div>
                        <div 
                          className="text-xl font-black mb-1"
                          style={{ color: 'var(--color-text-primary)' }}
                        >
                          Đáng Tin Cậy
                        </div>
                        <div 
                          className="text-sm font-medium"
                          style={{ color: 'var(--color-success)' }}
                        >
                          Uy tín 25+ năm
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Main CTA Message */}
                  <div className="md:col-span-2">
                    <div className="text-center md:text-left">
                      <div 
                        className="text-2xl lg:text-3xl font-black mb-3 bg-clip-text text-transparent"
                        style={{
                          background: "var(--gradient-primary)",
                          WebkitBackgroundClip: "text",
                        }}
                      >
                        Tư vấn miễn phí dự án của bạn
                      </div>
                      <div 
                        className="text-lg lg:text-xl mb-4"
                        style={{ color: 'var(--color-text-secondary)' }}
                      >
                        Liên hệ ngay để được hỗ trợ và tư vấn từ đội ngũ chuyên gia hàng đầu
                      </div>
                      
                      {/* Status Indicators */}
                      <div className="flex flex-wrap items-center justify-center md:justify-start gap-6">
                        <div className="flex items-center gap-2">
                          <motion.div 
                            className="w-4 h-4 rounded-full"
                            style={{ background: 'var(--color-success)' }}
                            animate={{ 
                              scale: [1, 1.3, 1],
                              opacity: [0.7, 1, 0.7] 
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                          <span 
                            className="text-sm font-bold"
                            style={{ color: 'var(--color-success)' }}
                          >
                            Online 24/7
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <CheckCircle 
                            className="w-4 h-4" 
                            style={{ color: 'var(--color-primary)' }}
                          />
                          <span 
                            className="text-sm font-medium"
                            style={{ color: 'var(--color-text-muted)' }}
                          >
                            Tư vấn miễn phí
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Sparkles 
                            className="w-4 h-4" 
                            style={{ color: 'var(--color-accent-orange)' }}
                          />
                          <span 
                            className="text-sm font-medium"
                            style={{ color: 'var(--color-text-muted)' }}
                          >
                            Ưu đãi đặc biệt
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
'use client';

import React from 'react';
import { Separator } from '@/components/ui/separator';
import { Heart, Github, Linkedin, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-br from-white via-slate-50 to-white text-slate-700 border-t border-slate-200">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent mb-4">
                Bảng Điều Khiển Quản Trị
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed max-w-md">
                Quản lý doanh nghiệp của bạn với các công cụ quản trị mạnh mẽ và hiện đại nhất.
              </p>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-blue-600 mb-4">Thông Tin Liên Hệ</h3>
              <div className="flex items-center space-x-3 hover:text-blue-600 transition-colors">
                <Mail className="h-5 w-5 text-blue-500" />
                <span>tuilanguyencuong@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3 hover:text-blue-600 transition-colors">
                <Phone className="h-5 w-5 text-blue-500" />
                <span>032 580 5893</span>
              </div>
              <div className="flex items-center space-x-3 hover:text-blue-600 transition-colors">
                <MapPin className="h-5 w-5 text-blue-500" />
                <span>Việt Nam</span>
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold text-blue-600 mb-6">Liên Kết Nhanh</h3>
            <ul className="space-y-3">
              {['Bảng Điều Khiển', 'Người Dùng', 'Cài Đặt', 'Trung Tâm Trợ Giúp'].map((link, i) => (
                <li key={i}>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="text-xl font-semibold text-blue-600 mb-6">Dịch Vụ</h3>
            <ul className="space-y-3">
              {['Phân Tích Dữ Liệu', 'Báo Cáo', 'Tích Hợp API', 'Bảo Mật'].map((service, i) => (
                <li key={i}>
                  <a href="#" className="hover:text-blue-600 transition-colors">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      {/* Decorative Separator */}
      <Separator className="bg-slate-200" />
      
      {/* Bottom Footer */}
      <div className="bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
            
            {/* Copyright */}
            <p className="text-slate-500 text-sm">
              © {currentYear} Admin Company. Tất cả quyền được bảo lưu.
            </p>
            
            {/* Designer Credit */}
            <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-8">
              <div className="flex items-center space-x-2 text-slate-500 text-sm">
                <span>Thiết kế website bởi</span>
                <span className="font-semibold text-blue-600">Nguyễn Cường</span>
                <Heart className="h-4 w-4 text-red-500 animate-pulse" />
              </div>
              
              {/* Contact Designer */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-slate-500 text-sm">
                  <Phone className="h-4 w-4" />
                  <a href="tel:0325805893" className="hover:text-blue-600 transition-colors">
                    0325805893
                  </a>
                </div>
                
                {/* Social Links */}
                <div className="flex space-x-3">
                  <a 
                    href="#" 
                    className="p-2 rounded-full bg-slate-100 hover:bg-blue-500 hover:text-white text-slate-500 transition-all duration-200 hover:scale-110"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                  <a 
                    href="#" 
                    className="p-2 rounded-full bg-slate-100 hover:bg-blue-500 hover:text-white text-slate-500 transition-all duration-200 hover:scale-110"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

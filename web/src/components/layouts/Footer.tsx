import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, CreditCard, Shield, Truck, Star } from 'lucide-react';
import { ImageLoader } from '../ui/image-loader';

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const Footer: React.FC = () => {
  const footerSections: FooterSection[] = [
    {
      title: "Cửa Hàng",
      links: [
        { label: "Sản Phẩm Mới", href: "#" },
        { label: "Bán Chạy Nhất", href: "#" },
        { label: "Khuyến Mãi", href: "#" },
        { label: "Thẻ Quà Tặng", href: "#" },
        { label: "Bộ Sưu Tập", href: "#" }
      ]
    },
    {
      title: "Hỗ Trợ Khách Hàng",
      links: [
        { label: "Liên Hệ", href: "#" },
        { label: "Câu Hỏi Thường Gặp", href: "#" },
        { label: "Hướng Dẫn Size", href: "#" },
        { label: "Thông Tin Vận Chuyển", href: "#" },
        { label: "Đổi Trả", href: "#" }
      ]
    },
    {
      title: "Công Ty",
      links: [
        { label: "Về Chúng Tôi", href: "#" },
        { label: "Tuyển Dụng", href: "#" },
        { label: "Báo Chí", href: "#" },
        { label: "Phát Triển Bền Vững", href: "#" },
        { label: "Bán Sỉ", href: "#" }
      ]
    },
    {
      title: "Chính Sách",
      links: [
        { label: "Chính Sách Bảo Mật", href: "#" },
        { label: "Điều Khoản Dịch Vụ", href: "#" },
        { label: "Chính Sách Cookie", href: "#" },
        { label: "Khả Năng Tiếp Cận", href: "#" },
        { label: "Bảo Mật Thông Tin", href: "#" }
      ]
    }
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "YouTube" }
  ];

  const features = [
    { icon: Truck, text: "Miễn Phí Vận Chuyển Đơn Từ 500k" },
    { icon: Shield, text: "Thanh Toán An Toàn 100%" },
    { icon: Star, text: "Đổi Trả Trong 30 Ngày" }
  ];

  return (
    <footer className="bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-400 rounded-full blur-3xl transform -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-yellow-300 rounded-full blur-3xl transform translate-y-1/2"></div>
      </div>
      
      <div className="relative z-10">
        {/* Features Bar */}
        {/* <div className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 text-black py-6">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-wrap justify-center lg:justify-between items-center space-y-3 lg:space-y-0">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3 mx-6 group">
                  <div className="bg-black p-2 rounded-full group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-5 w-5 text-yellow-400" />
                  </div>
                  <span className="font-bold text-lg">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div> */}

        {/* Newsletter Signup */}
        {/* <div className="py-16 bg-gradient-to-r from-transparent via-yellow-400/5 to-transparent">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="bg-gradient-to-r from-yellow-400/10 to-yellow-300/10 backdrop-blur-sm rounded-3xl p-12 border border-yellow-400/20">
              <h3 className="text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent">
                  Tham Gia Hội Viên VIP
                </span>
              </h3>
              <p className="text-gray-300 mb-8 text-lg max-w-2xl mx-auto">
                Nhận quyền truy cập độc quyền vào các bộ sưu tập mới, ưu đãi đặc biệt và tin tức nội bộ được gửi thẳng đến hộp thư của bạn.
              </p>
              <div className="flex flex-col sm:flex-row max-w-lg mx-auto space-y-4 sm:space-y-0 sm:space-x-4">
                <input
                  type="email"
                  placeholder="Nhập địa chỉ email của bạn"
                  className="flex-1 px-6 py-4 rounded-2xl bg-black/50 border border-yellow-400/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 backdrop-blur-sm"
                />
                <button className="bg-gradient-to-r from-yellow-400 to-yellow-300 text-black px-8 py-4 rounded-2xl font-bold hover:from-yellow-300 hover:to-yellow-200 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-yellow-400/25">
                  Đăng Ký Ngay
                </button>
              </div>
            </div>
          </div>
        </div> */}

        {/* Main Footer Content */}
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
              {/* Brand Section */}
              <div className="lg:col-span-2">
                <div className="mb-8">
                  {/* <h2 className="text-4xl font-bold mb-6">
                    <span className="bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent">
                      Cửa Hàng Của Bạn
                    </span>
                  </h2> */}
                  <ImageLoader src = "/logo.jpg" height={140} width={140} alt = "logo"  className='rounded-full'/>
                  <p className="text-gray-300 mb-8 leading-relaxed text-lg mt-2">
                    Chất lượng cao cấp kết hợp với thiết kế đặc biệt. Chúng tôi đam mê mang đến những sản phẩm vượt trội mong đợi và nâng tầm phong cách sống của bạn.
                  </p>
                </div>
                
                {/* Contact Info */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 group cursor-pointer">
                    <div className="bg-yellow-400/10 p-3 rounded-xl group-hover:bg-yellow-400/20 transition-colors duration-300">
                      <Phone className="h-5 w-5 text-yellow-400" />
                    </div>
                    <span className="text-gray-300 group-hover:text-white transition-colors duration-300">(028) 1234-5678</span>
                  </div>
                  <div className="flex items-center space-x-4 group cursor-pointer">
                    <div className="bg-yellow-400/10 p-3 rounded-xl group-hover:bg-yellow-400/20 transition-colors duration-300">
                      <Mail className="h-5 w-5 text-yellow-400" />
                    </div>
                    <span className="text-gray-300 group-hover:text-white transition-colors duration-300">lienhe@cuahangcuaban.com</span>
                  </div>
                  <div className="flex items-center space-x-4 group cursor-pointer">
                    <div className="bg-yellow-400/10 p-3 rounded-xl group-hover:bg-yellow-400/20 transition-colors duration-300">
                      <MapPin className="h-5 w-5 text-yellow-400" />
                    </div>
                    <span className="text-gray-300 group-hover:text-white transition-colors duration-300">123 Đường Nguyễn Huệ, Q.1, TP.HCM</span>
                  </div>
                </div>
              </div>

              {/* Footer Links */}
              {footerSections.map((section, index) => (
                <div key={index} className="lg:col-span-1">
                  <h3 className="text-yellow-400 font-bold text-xl mb-6 relative">
                    {section.title}
                    <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-yellow-400 to-transparent"></div>
                  </h3>
                  <ul className="space-y-3">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <a
                          href={link.href}
                          className="text-gray-300 hover:text-yellow-400 transition-all duration-300 hover:translate-x-1 inline-block relative group"
                        >
                          {link.label}
                          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 group-hover:w-full transition-all duration-300"></span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 bg-black/50 backdrop-blur-sm py-8">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
              {/* Copyright */}
              <div className="text-gray-400 text-center lg:text-left">
                © 2025 Copyright. Tất cả quyền được bảo lưu. Được tạo bởi NguyenCuong .
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="bg-gray-800 p-3 rounded-xl text-gray-400 hover:bg-yellow-400 hover:text-black transition-all duration-300 transform hover:scale-110 hover:rotate-6"
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>

              {/* Payment Methods */}
              <div className="flex items-center space-x-4 text-gray-400">
                <span className="font-medium">Thanh Toán An Toàn:</span>
                <div className="flex space-x-2">
                  <div className="bg-gradient-to-r from-yellow-400 to-yellow-300 text-black px-3 py-2 rounded-lg text-sm font-bold transform hover:scale-105 transition-transform duration-300">VISA</div>
                  <div className="bg-gradient-to-r from-yellow-400 to-yellow-300 text-black px-3 py-2 rounded-lg text-sm font-bold transform hover:scale-105 transition-transform duration-300">MC</div>
                  <div className="bg-gradient-to-r from-yellow-400 to-yellow-300 text-black px-3 py-2 rounded-lg text-sm font-bold transform hover:scale-105 transition-transform duration-300">AMEX</div>
                  <div className="bg-gradient-to-r from-yellow-400 to-yellow-300 text-black px-3 py-2 rounded-lg text-sm font-bold transform hover:scale-105 transition-transform duration-300">MOMO</div>
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
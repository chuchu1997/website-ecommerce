/** @format */

import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import Image from "next/image";
import { StoreAPI } from "@/api/stores/store.api";
import { SocialInterface, StoreInterface } from "@/types/store";
import { SocialIcon } from "react-social-icons";
import Link from "next/link";
import { ZaloIcon } from "@/common/ZaloPhoneFloating";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const Footer: React.FC = async () => {
  const storeInfo = (await StoreAPI.getStoreInfo()).data
    .store as StoreInterface;
  let socials: SocialInterface[] = [];
  if (storeInfo && storeInfo.socials && storeInfo.socials.length > 0) {
    socials = storeInfo.socials;
  }

  const footerSections: FooterSection[] = [
    {
      title: "Hướng Dẫn & Chính Sách",
      links: [
        { label: "Hướng dẫn mua hàng", href: "/huong-dan-mua-hang" },
        { label: "Hướng dẫn thanh toán", href: "/huong-dan-thanh-toan" },
        { label: "Các hình thức mua hàng", href: "/cac-hinh-thuc-mua-hang" },
        { label: "Đăng ký làm đại lý", href: "/dang-ky-lam-dai-ly" },
        { label: "Chính sách bán hàng", href: "/chinh-sach-ban-hang" },
      ],
    },
    {
      title: "Chính Sách & Bảo Hành",
      links: [
        {
          label: "Chính sách quy định chung",
          href: "/chinh-sach-quy-dinh-chung",
        },
        { label: "Chính sách bảo hành sản phẩm", href: "/chinh-sach-bao-hanh" },
        { label: "Chính sách bảo mật thông tin", href: "/chinh-sach-bao-mat" },
        { label: "Chính sách vận chuyển", href: "/chinh-sach-van-chuyen" },
        { label: "Chính sách đổi trả hàng", href: "/chinh-sach-doi-tra" },
      ],
    },
  ];

  function formatPhoneNumber(phone: string): string {
    const cleaned = phone.replace(/\D/g, "");
    if (cleaned.length === 10) {
      return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(
        7
      )}`;
    }
    return phone;
  }

  return (
    <footer className=" bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white overflow-hidden border-t border-slate-700/50 relative">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-amber-400 rounded-full blur-3xl transform -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-amber-300 rounded-full blur-3xl transform translate-y-1/2"></div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              {/* Brand Section */}
              <div className="lg:col-span-4">
                <div className="mb-6">
                  <Image
                    src="/logo.png"
                    height={60}
                    width={60}
                    alt="logo"
                    className="mb-4"
                  />
                  <p className="text-gray-300 text-sm leading-relaxed max-w-sm">
                    Chất lượng cao cấp kết hợp với thiết kế đặc biệt. Chúng tôi
                    đam mê mang đến những sản phẩm vượt trội và nâng tầm phong
                    cách sống.
                  </p>
                </div>

                {/* Contact Info */}
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 group">
                    <div className="bg-amber-500/10 p-2 rounded-lg group-hover:bg-amber-500/20 transition-colors duration-200 mt-0.5">
                      <Phone className="h-4 w-4 text-amber-400" />
                    </div>
                    <div className="flex-1">
                      <span className="text-gray-300 text-sm group-hover:text-white transition-colors duration-200">
                        {formatPhoneNumber(storeInfo.phone ?? "")}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 group">
                    <div className="bg-amber-500/10 p-2 rounded-lg group-hover:bg-amber-500/20 transition-colors duration-200 mt-0.5">
                      <Mail className="h-4 w-4 text-amber-400" />
                    </div>
                    <div className="flex-1">
                      <span className="text-gray-300 text-sm group-hover:text-white transition-colors duration-200 break-all">
                        {storeInfo.email ?? ""}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 group">
                    <div className="bg-amber-500/10 p-2 rounded-lg group-hover:bg-amber-500/20 transition-colors duration-200 mt-0.5">
                      <MapPin className="h-4 w-4 text-amber-400" />
                    </div>
                    <div className="flex-1">
                      <span className="text-gray-300 text-sm group-hover:text-white transition-colors duration-200 leading-relaxed">
                        {storeInfo.address ?? ""}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Links Sections */}
              <div className="lg:col-span-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12">
                  {footerSections.map((section, index) => (
                    <div key={index} className="space-y-4">
                      <h3 className="text-amber-400 font-semibold text-base lg:text-lg relative pb-2">
                        {section.title}
                        <div className="absolute bottom-0 left-0 w-6 h-0.5 bg-gradient-to-r from-amber-400 to-transparent"></div>
                      </h3>
                      <ul className="space-y-2">
                        {section.links.map((link, linkIndex) => (
                          <li key={linkIndex}>
                            <Link
                              href={link.href}
                              className="text-gray-300 hover:text-amber-400 text-sm transition-all duration-200 hover:translate-x-1 inline-block relative group">
                              {link.label}
                              <span className="absolute bottom-0 left-0 w-0 h-px bg-amber-400 group-hover:w-full transition-all duration-300"></span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700/50 bg-black/30 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
              {/* Certification */}
              <div className="flex items-center">
                <Image
                  src="/bo-cong-thuong.png"
                  alt="Bộ Công Thương"
                  height={80}
                  width={80}
                  className="opacity-80"
                />
              </div>

              {/* Social Links */}
              <div className="flex items-center space-x-3">
                {socials.map((social) => (
                  <div
                    key={social.id}
                    className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-800/80 text-gray-400 hover:bg-amber-500 hover:text-black transition-all duration-300 transform hover:scale-105">
                    {social.type === "ZALO" ? (
                      <Link
                        href={social.url}
                        target="_blank"
                        className="flex items-center justify-center w-full h-full">
                        <ZaloIcon />
                      </Link>
                    ) : (
                      <SocialIcon
                        target="_blank"
                        url={social.url}
                        bgColor="transparent"
                        fgColor="currentColor"
                        style={{ width: "100%", height: "100%" }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-gray-700/30 mt-6 pt-4">
              <p className="text-gray-400 text-xs text-center leading-relaxed">
                © 2025 Tất cả quyền được bảo lưu. Được phát triển bởi
                NguyenCuong
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

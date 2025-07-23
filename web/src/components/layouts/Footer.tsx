/** @format */

import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Shield,
  Truck,
  Star,
} from "lucide-react";
import { ImageLoader } from "../ui/image-loader";
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
    // Xoá các ký tự không phải số
    const cleaned = phone.replace(/\D/g, "");

    // Nếu đủ 10 số, format theo kiểu 4-3-3
    if (cleaned.length === 10) {
      return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(
        7
      )}`;
    }

    // Nếu là số tổng đài hoặc số lẻ khác, trả về nguyên gốc
    return phone;
  }

  return (
    <footer className="bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-400 rounded-full blur-3xl transform -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-yellow-300 rounded-full blur-3xl transform translate-y-1/2"></div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
              {/* Brand Section */}
              <div className="lg:col-span-2">
                <div className="mb-8">
                  <Image
                    src="/logo.png"
                    height={120}
                    width={120}
                    alt="logo"
                    className=""
                  />
                  <p className="text-gray-300 mb-8 leading-relaxed text-sm italic mt-2 ">
                    Chất lượng cao cấp kết hợp với thiết kế đặc biệt. Chúng tôi
                    đam mê mang đến những sản phẩm vượt trội mong đợi và nâng
                    tầm phong cách sống của bạn.
                  </p>
                </div>

                {/* Contact Info */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 group cursor-pointer">
                    <div className="bg-yellow-400/10 p-3 rounded-xl group-hover:bg-yellow-400/20 transition-colors duration-300">
                      <Phone className="h-5 w-5 text-yellow-400" />
                    </div>
                    <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                      {formatPhoneNumber(storeInfo.phone ?? "")}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 group cursor-pointer">
                    <div className="bg-yellow-400/10 p-3 rounded-xl group-hover:bg-yellow-400/20 transition-colors duration-300">
                      <Mail className="h-5 w-5 text-yellow-400" />
                    </div>
                    <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                      {storeInfo.email ?? ""}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 group cursor-pointer">
                    <div className="bg-yellow-400/10 p-3 rounded-xl group-hover:bg-yellow-400/20 transition-colors duration-300">
                      <MapPin className="h-5 w-5 text-yellow-400" />
                    </div>
                    <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                      {storeInfo.address ?? ""}
                    </span>
                  </div>
                </div>
              </div>

              {/* Footer Links */}
              {footerSections.map((section, index) => (
                <div key={index} className="lg:col-span-2 px-2 ">
                  <h3 className="text-yellow-400 font-bold text-xl mb-6 relative">
                    {section.title}
                    <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-yellow-400 to-transparent"></div>
                  </h3>
                  <ul className="space-y-3">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <Link
                          href={link.href}
                          className="text-gray-300 hover:text-yellow-400 transition-all duration-300 hover:translate-x-1 inline-block relative group">
                          {link.label}
                          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 group-hover:w-full transition-all duration-300"></span>
                        </Link>
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
                <Image
                  src="/bo-cong-thuong.png"
                  alt="bocongthuong"
                  height={120}
                  width={120}
                />
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                {/* {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="bg-gray-800 p-3 rounded-xl text-gray-400 hover:bg-yellow-400 hover:text-black transition-all duration-300 transform hover:scale-110 hover:rotate-6"
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))} */}
                {socials.map((social) => (
                  <div
                    key={social.id}
                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-800 text-gray-400 hover:bg-yellow-400 hover:text-black transition-all duration-300 transform hover:scale-110 hover:rotate-6">
                    {social.type === "ZALO" ? (
                      <Link href={social.url} target="_blank">
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

              {/* Payment Methods */}
            </div>
            <div className="border-t border-gray-300 my-2 py-2 italic text-sm text-center">
              © 2025 Copyright. Tất cả quyền được bảo lưu. Được tạo bởi
              NguyenCuong .
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

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
interface Props {
  storeInfo: StoreInterface;
}

const Footer: React.FC<Props> = async ({ storeInfo }) => {
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
    <footer className="bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] overflow-hidden border-t border-[var(--color-border-light)] relative">
      {/* Ambient Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-[var(--color-accent-yellow-light)] rounded-full blur-[120px] opacity-20 -translate-y-1/3" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[var(--color-primary-light)] rounded-full blur-[100px] opacity-20 translate-y-1/3" />
      </div>

      <div className="relative z-10">
        <div className="py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Brand / About */}
              <div className="lg:col-span-4">
                <Image
                  src="/logo.png"
                  height={60}
                  width={60}
                  alt="Logo"
                  className="mb-5"
                />
                <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed max-w-sm mb-6">
                  Chất lượng cao cấp kết hợp với thiết kế đặc biệt. Chúng tôi
                  đam mê mang đến những sản phẩm vượt trội và nâng tầm phong
                  cách sống.
                </p>

                {/* Contact Info */}
                <div className="space-y-3">
                  {[
                    {
                      icon: Phone,
                      text: formatPhoneNumber(storeInfo.phone ?? ""),
                    },
                    { icon: Mail, text: storeInfo.email ?? "" },
                    { icon: MapPin, text: storeInfo.address ?? "" },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 group hover:translate-x-0.5 transition-transform duration-300">
                      <div className="bg-[var(--color-accent-yellow-light)] p-2 rounded-lg border border-[var(--color-border-accent)] group-hover:bg-[var(--color-accent-yellow)] transition-colors duration-200">
                        <item.icon className="h-4 w-4 text-[var(--color-accent-yellow-dark)]" />
                      </div>
                      <span className="text-sm text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors duration-200 break-words">
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="lg:col-span-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12">
                  {footerSections.map((section, index) => (
                    <div key={index} className="space-y-4">
                      <h3 className="text-[var(--color-primary-dark)] font-semibold text-base lg:text-lg relative pb-2">
                        {section.title}
                        <span className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-[var(--color-primary)] to-transparent rounded-full" />
                      </h3>
                      <ul className="space-y-2">
                        {section.links.map((link, linkIndex) => (
                          <li key={linkIndex}>
                            <Link
                              href={link.href}
                              className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary-dark)] transition-all duration-200 inline-flex items-center gap-1 group">
                              <span>{link.label}</span>
                              <span className="block w-0 group-hover:w-3 h-0.5 bg-[var(--color-primary)] transition-all duration-300"></span>
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
        <div className="border-t border-[var(--color-border-light)] bg-[var(--color-bg-secondary)] backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
              {/* Certification */}
              <Image
                src="/bo-cong-thuong.png"
                alt="Bộ Công Thương"
                height={80}
                width={80}
                className="opacity-80"
              />

              {/* Social Icons */}
              <div className="flex items-center gap-3">
                {socials.map((social) => (
                  <Link
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    className="w-9 h-9 flex items-center justify-center rounded-full border border-[var(--color-border-accent)] bg-[var(--color-bg-primary)] text-[var(--color-text-secondary)] hover:bg-[var(--color-primary)] hover:text-white transition-all duration-300 transform hover:scale-105 shadow-sm">
                    {social.type === "ZALO" ? (
                      <ZaloIcon />
                    ) : (
                      <SocialIcon
                        target="_blank"
                        url={social.url}
                        bgColor="transparent"
                        fgColor="currentColor"
                        style={{ width: "100%", height: "100%" }}
                      />
                    )}
                  </Link>
                ))}
              </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-[var(--color-border-light)] mt-6 pt-4">
              <p className="text-xs text-center text-[var(--color-text-muted)]">
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

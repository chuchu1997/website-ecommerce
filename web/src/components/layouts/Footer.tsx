/** @format */

import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Award,
  Users,
  Home,
  TrendingUp,
} from "lucide-react";
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

  // Real estate statistics (you can make these dynamic from your API)
  const realEstateStats = [
    { icon: Home, number: "1,200+", label: "Bất Động Sản Đã Bán" },
    { icon: Users, number: "850+", label: "Khách Hàng Hài Lòng" },
    { icon: Award, number: "15+", label: "Năm Kinh Nghiệm" },
    { icon: TrendingUp, number: "98%", label: "Tỷ Lệ Thành Công" },
  ];

  const services = [
    "Tư vấn đầu tư bất động sản",
    "Định giá chuyên nghiệp",
    "Hỗ trợ pháp lý miễn phí",
    "Dịch vụ hậu mãi trọn đời",
  ];

  return (
    <footer className="bg-gradient-to-br from-[var(--color-bg)] via-[var(--color-bg-secondary)] to-[var(--color-bg-accent)] text-[var(--color-text-primary)] overflow-hidden border-t border-[var(--color-border-light)] relative">
      {/* Enhanced Ambient Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-[var(--color-primary-light)] to-[var(--color-primary)] rounded-full blur-[150px] opacity-10 -translate-y-1/2" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-l from-[var(--color-accent-orange-light)] to-[var(--color-primary-light)] rounded-full blur-[120px] opacity-15 translate-y-1/2" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[var(--color-bg-hover)] rounded-full blur-[100px] opacity-20" />

        {/* Subtle Pattern Overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 25px 25px, var(--color-primary) 2px, transparent 2px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Stats Section */}
        <div className="py-8 lg:py-12 border-b border-[var(--color-border-light)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {realEstateStats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="inline-flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 rounded-2xl bg-gradient-to-br from-[var(--color-primary-light)] to-[var(--color-primary)] mb-4 group-hover:scale-110 transition-all duration-300 shadow-lg">
                    <stat.icon className="w-8 h-8 lg:w-10 lg:h-10 text-[var(--color-text-white)]" />
                  </div>
                  <div className="text-2xl lg:text-3xl font-bold text-[var(--color-primary-dark)] mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm lg:text-base text-[var(--color-text-secondary)] font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Brand / About - Enhanced */}
              <div className="lg:col-span-5">
                <div className="flex items-center gap-3 mb-6">
                  <Image
                    src="/logo.png"
                    height={80}
                    width={80}
                    alt="Logo"
                    className="rounded-xl shadow-lg"
                  />
                  <div>
                    <h3 className="text-2xl font-bold text-[var(--color-text-primary)]">
                      {storeInfo.name || "Real Estate Pro"}
                    </h3>
                    <p className="text-sm text-[var(--color-primary)]">
                      Đối Tác Tin Cậy Của Bạn
                    </p>
                  </div>
                </div>

                <p className="text-[var(--color-text-secondary)] text-base leading-relaxed mb-8 max-w-lg">
                  Chúng tôi tự hào là đối tác đáng tin cậy trong lĩnh vực bất
                  động sản, mang đến những giải pháp toàn diện và chuyên nghiệp
                  cho mọi nhu cầu đầu tư và an cư của khách hàng.
                </p>

                {/* Services List */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-[var(--color-primary-dark)] mb-4">
                    Dịch Vụ Chuyên Nghiệp
                  </h4>
                  <ul className="space-y-2">
                    {services.map((service, idx) => (
                      <li key={idx} className="flex items-center gap-3 group">
                        <div className="w-2 h-2 rounded-full bg-[var(--color-primary)] group-hover:scale-150 transition-transform duration-200"></div>
                        <span className="text-sm text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors duration-200">
                          {service}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contact Info - Enhanced */}
                <div>
                  <h4 className="text-lg font-semibold text-[var(--color-primary-dark)] mb-4">
                    Liên Hệ Ngay
                  </h4>
                  <div className="space-y-4">
                    {[
                      {
                        icon: Phone,
                        text: formatPhoneNumber(storeInfo.phone ?? ""),
                        label: "Hotline 24/7",
                      },
                      {
                        icon: Mail,
                        text: storeInfo.email ?? "",
                        label: "Email liên hệ",
                      },
                      {
                        icon: MapPin,
                        text: storeInfo.address ?? "",
                        label: "Địa chỉ văn phòng",
                      },
                    ].map((item, idx) => (
                      <div key={idx} className="group">
                        <div className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-[var(--color-bg-secondary)] to-[var(--color-bg-accent)] border border-[var(--color-border-light)] hover:border-[var(--color-primary)] hover:shadow-lg transition-all duration-300">
                          <div className="bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-hover)] p-3 rounded-xl shadow-md group-hover:scale-110 transition-transform duration-200">
                            <item.icon className="h-5 w-5 text-[var(--color-text-white)]" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs text-[var(--color-text-muted)] mb-1 font-medium uppercase tracking-wide">
                              {item.label}
                            </div>
                            <div className="text-sm text-[var(--color-text-primary)] font-medium break-words">
                              {item.text}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Trust & Quality Section */}
              <div className="lg:col-span-7">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
                  {/* Trust Badges */}
                  <div className="bg-gradient-to-br from-[var(--color-bg-secondary)] to-[var(--color-bg-accent)] p-8 rounded-2xl border border-[var(--color-border-light)] shadow-lg">
                    <h4 className="text-xl font-bold text-[var(--color-primary-dark)] mb-6">
                      Cam Kết Chất Lượng
                    </h4>
                    <div className="space-y-6">
                      {[
                        {
                          title: "Minh Bạch 100%",
                          desc: "Thông tin pháp lý rõ ràng, giá cả công khai",
                        },
                        {
                          title: "Hỗ Trợ Trọn Đời",
                          desc: "Tư vấn và hỗ trợ khách hàng suốt quá trình",
                        },
                        {
                          title: "Đội Ngũ Chuyên Nghiệp",
                          desc: "Chứng chỉ hành nghề và kinh nghiệm dày dặn",
                        },
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-start gap-4 group">
                          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-[var(--color-success)] to-[var(--color-primary)] mt-2 group-hover:scale-150 transition-transform duration-200"></div>
                          <div>
                            <h5 className="font-semibold text-[var(--color-text-primary)] mb-1">
                              {item.title}
                            </h5>
                            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                              {item.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Call to Action */}
                  <div className="bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-hover)] p-8 rounded-2xl text-white shadow-xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
                    <div className="relative z-10">
                      <h4 className="text-2xl font-bold mb-4">
                        Bắt Đầu Hành Trình
                        <br />
                        Đầu Tư Ngay Hôm Nay
                      </h4>
                      <p className="text-white/90 text-base leading-relaxed mb-6">
                        Để lại thông tin liên hệ, chúng tôi sẽ tư vấn miễn phí
                        những cơ hội đầu tư tốt nhất phù hợp với ngân sách của
                        bạn.
                      </p>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-white/90">
                          <div className="w-2 h-2 rounded-full bg-white"></div>
                          <span className="text-sm">Tư vấn miễn phí 24/7</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/90">
                          <div className="w-2 h-2 rounded-full bg-white"></div>
                          <span className="text-sm">
                            Báo cáo thị trường chi tiết
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-white/90">
                          <div className="w-2 h-2 rounded-full bg-white"></div>
                          <span className="text-sm">
                            Hỗ trợ pháp lý chuyên nghiệp
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Enhanced */}
        <div className="border-t border-[var(--color-border-light)] bg-gradient-to-r from-[var(--color-bg-secondary)] via-[var(--color-bg)] to-[var(--color-bg-secondary)] backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
              {/* Certification */}
              <div className="flex items-center gap-4">
                <Image
                  src="/bo-cong-thuong.png"
                  alt="Bộ Công Thương"
                  height={60}
                  width={60}
                  className="opacity-80 hover:opacity-100 transition-opacity duration-200"
                />
                <div className="text-center lg:text-left">
                  <div className="text-xs text-[var(--color-text-muted)] mb-1">
                    Đã đăng ký với
                  </div>
                  <div className="text-sm font-medium text-[var(--color-text-primary)]">
                    Bộ Công Thương Việt Nam
                  </div>
                </div>
              </div>

              {/* Social Icons - Enhanced */}
              <div>
                <div className="text-center mb-3">
                  <span className="text-sm text-[var(--color-text-secondary)]">
                    Kết nối với chúng tôi
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  {socials.map((social) => (
                    <Link
                      key={social.id}
                      href={social.url}
                      target="_blank"
                      className="w-12 h-12 flex items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--color-bg)] to-[var(--color-bg-secondary)] border border-[var(--color-border-accent)] text-[var(--color-text-secondary)] hover:bg-gradient-to-br hover:from-[var(--color-primary)] hover:to-[var(--color-primary-hover)] hover:text-white hover:border-[var(--color-primary)] transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-xl group">
                      {social.type === "ZALO" ? (
                        <ZaloIcon />
                      ) : (
                        <SocialIcon
                          target="_blank"
                          url={social.url}
                          bgColor="transparent"
                          fgColor="currentColor"
                          style={{ width: "70%", height: "70%" }}
                        />
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Copyright - Enhanced */}
            <div className="border-t border-[var(--color-border-light)] mt-8 pt-6">
              <div className="text-center">
                <p className="text-sm text-[var(--color-text-secondary)] mb-2">
                  © 2025 Tất cả quyền được bảo lưu.
                </p>
                <p className="text-xs text-[var(--color-text-muted)]">
                  Website được phát triển bởi{" "}
                  <span className="text-[var(--color-primary)] font-medium">
                    NguyenCuong
                  </span>{" "}
                  | Thiết kế chuyên nghiệp cho ngành bất động sản
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

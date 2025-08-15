/** @format */

import { ProductAPI } from "@/api/products/product.api";
import { ProjectAPI } from "@/api/projects/projects.api";
import { ProductListMotionWrapper } from "@/components/ui/product/ProductListMotionWrapper";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ProductInterface } from "@/types/product";
import { ProjectInterface } from "@/types/project";
import { PromotionInterface, ProductPromotion } from "@/types/promotion";
import { StoreInterface } from "@/types/store";
import { fetchSafe } from "@/utils/fetchSafe";
import Link from "next/link";

interface Props {
  storeInfo: StoreInterface;
}

const getCachedProjects = async (): Promise<ProjectInterface[]> => {
  const res = await fetchSafe(
    () =>
      ProjectAPI.getProjects({
        currentPage: 1,
        limit: 4,
      }),
    {
      projects: [],
    }
  );
  const projects = res.projects;
  return projects;
};

export const FeatureProperties = async ({ storeInfo }: Props) => {
  let featureProjects: ProjectInterface[] = [];
  let promotions: PromotionInterface[] = [];

  featureProjects = await getCachedProjects();

  // Lấy danh sách promotion duy nhất

  const achievements = [
    {
      number: featureProjects.length,
      label: "Dự án hoàn thành",
      subtitle: "Khắp Việt Nam",
      icon: "🏢",
    },
    {
      number: "15K+",
      label: "Gia đình hạnh phúc",
      subtitle: "Đã có nhà mới",
      icon: "🏡",
    },
    {
      number: promotions.length || 8,
      label: "Ưu đãi hấp dẫn",
      subtitle: "Chính sách linh hoạt",
      icon: "💰",
    },
  ];

  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: "var(--color-bg)" }}>
      {/* Hero Section with Modern Design */}
      <div className="relative">
        {/* Main Hero Section */}
        <div
          className="relative py-24 lg:py-32"
          style={{ background: "var(--gradient-secondary)" }}>
          {/* Floating Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
              className="absolute top-1/4 -left-20 w-96 h-96 rounded-full blur-3xl opacity-10"
              style={{ background: "var(--gradient-primary)" }}
            />
            <div
              className="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full blur-3xl opacity-8"
              style={{ background: "var(--gradient-accent)" }}
            />
          </div>

          <div className="container mx-auto px-4 lg:px-6 relative">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Left: Main Content */}
              <div className="space-y-8">
                <div className="space-y-6">
                  {/* Premium Badge */}
                  <div
                    className="inline-flex items-center gap-3 rounded-full px-6 py-3 backdrop-blur-sm border"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      borderColor: "var(--color-border-accent)",
                      boxShadow: "var(--shadow-default)",
                    }}>
                    <div
                      className="w-2.5 h-2.5 rounded-full animate-pulse"
                      style={{ backgroundColor: "var(--color-primary)" }}
                    />
                    <span
                      className="text-sm font-semibold uppercase tracking-widest"
                      style={{ color: "var(--color-text-primary)" }}>
                      Bất Động Sản Cao Cấp
                    </span>
                  </div>

                  {/* Main Hero Heading */}
                  <h1 className="text-5xl lg:text-7xl xl:text-8xl font-black leading-[0.9]">
                    <div
                      className="mb-3"
                      style={{ color: "var(--color-text-primary)" }}>
                      Kiến Tạo
                    </div>
                    <div
                      className="bg-clip-text text-transparent mb-2"
                      style={{
                        background: "var(--gradient-primary)",
                        WebkitBackgroundClip: "text",
                      }}>
                      Tương Lai
                    </div>
                    <div
                      className="text-3xl lg:text-5xl xl:text-6xl font-light"
                      style={{ color: "var(--color-text-secondary)" }}>
                      An Cư Lập Nghiệp
                    </div>
                  </h1>

                  {/* Hero Description */}
                  <p
                    className="text-xl lg:text-2xl leading-relaxed max-w-2xl"
                    style={{ color: "var(--color-text-secondary)" }}>
                    Những dự án bất động sản đẳng cấp với vị trí vàng, thiết kế
                    hiện đại và tiện ích hoàn hảo. Đầu tư thông minh cho cuộc
                    sống thịnh vượng.
                  </p>

                  {/* CTA Section */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Link
                      href="/danh-muc/du-an"
                      className="group px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center justify-center gap-3"
                      style={{
                        background: "var(--gradient-primary)",
                        color: "var(--color-text-white)",
                        boxShadow: "var(--shadow-default)",
                      }}>
                      <span className="group-hover:scale-110 transition-transform duration-300">
                        🏠
                      </span>
                      Xem Dự Án Hot
                    </Link>
                    <Link
                      target="_blank"
                      href={`tel:${storeInfo.phone}`}
                      className="group px-10 py-5 rounded-2xl font-bold text-lg border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center gap-3"
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                        borderColor: "var(--color-primary)",
                        color: "var(--color-primary)",
                        backdropFilter: "blur(10px)",
                      }}>
                      <span className="group-hover:scale-110 transition-transform duration-300">
                        📞
                      </span>
                      Tư Vấn Miễn Phí
                    </Link>
                  </div>
                </div>
              </div>

              {/* Right: Floating Achievement Cards */}
              <div className="relative">
                <div className="grid gap-8">
                  {achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className={`group relative p-8 rounded-3xl backdrop-blur-sm border transition-all duration-500 hover:scale-105 hover:-translate-y-2 ${
                        index === 1 ? "lg:ml-16" : index === 2 ? "lg:ml-32" : ""
                      }`}
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 0.95)",
                        borderColor: "var(--color-border-light)",
                        boxShadow: "var(--shadow-hover)",
                      }}>
                      {/* Card Glow Effect */}
                      <div
                        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                        style={{ background: "var(--gradient-primary)" }}
                      />

                      <div className="relative flex items-center gap-6">
                        <div
                          className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-12"
                          style={{
                            background: "var(--gradient-accent)",
                          }}>
                          {achievement.icon}
                        </div>
                        <div>
                          <div
                            className="text-4xl lg:text-5xl font-black bg-clip-text text-transparent mb-2"
                            style={{
                              background: "var(--gradient-primary)",
                              WebkitBackgroundClip: "text",
                            }}>
                            {achievement.number}
                          </div>
                          <div
                            className="text-lg font-bold mb-1"
                            style={{ color: "var(--color-text-primary)" }}>
                            {achievement.label}
                          </div>
                          <div
                            className="text-sm font-medium"
                            style={{ color: "var(--color-text-muted)" }}>
                            {achievement.subtitle}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Properties Section */}
        <div className="relative py-24 lg:py-32">
          {/* Section Background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
              className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full blur-3xl opacity-5"
              style={{ background: "var(--gradient-primary)" }}
            />
            <div
              className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-5"
              style={{ background: "var(--gradient-accent)" }}
            />
          </div>

          <div className="container mx-auto px-4 lg:px-6 relative">
            {/* Section Header */}
            <div className="max-w-4xl mb-20">
              <div className="flex flex-col lg:flex-row lg:items-center gap-8">
                {/* Icon & Badge */}
                <div className="flex-shrink-0">
                  <div
                    className="w-24 h-24 rounded-3xl flex items-center justify-center text-3xl border-2"
                    style={{
                      backgroundColor: "var(--color-bg)",
                      borderColor: "var(--color-border-accent)",
                      boxShadow: "var(--shadow-default)",
                    }}>
                    🏆
                  </div>
                </div>

                <div className="flex-1">
                  {/* Section Title */}
                  <div
                    className="inline-block px-4 py-2 rounded-full text-sm font-bold uppercase tracking-widest mb-6"
                    style={{
                      backgroundColor: "var(--color-bg-accent)",
                      color: "var(--color-primary)",
                    }}>
                    Dự Án Bán Chạy Nhất
                  </div>

                  <h2
                    className="text-4xl lg:text-6xl font-black mb-6 leading-tight"
                    style={{ color: "var(--color-text-primary)" }}>
                    Những Dự Án
                    <span
                      className="block bg-clip-text text-transparent"
                      style={{
                        background: "var(--gradient-primary)",
                        WebkitBackgroundClip: "text",
                      }}>
                      Đáng Đầu Tư Nhất
                    </span>
                  </h2>

                  <p
                    className="text-xl lg:text-2xl leading-relaxed"
                    style={{ color: "var(--color-text-secondary)" }}>
                    Khám phá những dự án bất động sản hot nhất thị trường với vị
                    trí đắc địa, pháp lý rõ ràng và tiềm năng tăng giá vượt
                    trội.
                  </p>
                </div>
              </div>
            </div>

            {/* Properties Grid */}
            <div className="relative">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                {featureProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
              {/* <ProductListMotionWrapper products={featureProjects} /> */}
            </div>

            {/* View All CTA */}
            <div className="text-center mt-16">
              <Link
                href="/danh-muc/du-an"
                className="group px-12 max-w-2xl py-5 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center justify-center gap-4 mx-auto"
                style={{
                  backgroundColor: "var(--color-bg-accent)",
                  color: "var(--color-primary)",
                  border: `2px solid var(--color-border-accent)`,
                }}>
                <span>Xem Tất Cả Dự Án</span>
                <span className="group-hover:translate-x-2 transition-transform duration-300">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Trust & Investment Section */}
        <div
          className="relative py-20 lg:py-28"
          style={{ backgroundColor: "var(--color-bg-accent)" }}>
          <div className="container mx-auto px-4 lg:px-6">
            <div className="grid lg:grid-cols-5 gap-12 items-center">
              {/* Left: Investment Promise */}
              <div className="lg:col-span-3 space-y-10">
                <div className="space-y-8">
                  {/* Badge */}
                  <div
                    className="inline-flex items-center gap-3 px-6 py-3 rounded-full"
                    style={{
                      backgroundColor: "var(--color-success-light)",
                      color: "var(--color-success)",
                    }}>
                    <div className="w-2 h-2 bg-current rounded-full animate-pulse" />
                    <span className="font-bold text-sm uppercase tracking-wide">
                      Đầu Tư An Toàn & Sinh Lời
                    </span>
                  </div>

                  {/* Main Heading */}
                  <h3
                    className="text-3xl lg:text-5xl font-black leading-tight"
                    style={{ color: "var(--color-text-primary)" }}>
                    Mỗi dự án là một
                    <span
                      className="bg-clip-text text-transparent block"
                      style={{
                        background: "var(--gradient-primary)",
                        WebkitBackgroundClip: "text",
                      }}>
                      cơ hội vàng để đầu tư
                    </span>
                  </h3>

                  {/* Description */}
                  <p
                    className="text-xl leading-relaxed max-w-3xl"
                    style={{ color: "var(--color-text-secondary)" }}>
                    Chúng tôi không chỉ phát triển bất động sản, mà kiến tạo
                    những cộng đồng sống hiện đại. Từ nghiên cứu thị trường đến
                    hoàn thiện dự án, mọi bước đều được thực hiện với tiêu chuẩn
                    quốc tế.
                  </p>
                </div>

                {/* Investment Process */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      step: "01",
                      title: "Khảo sát",
                      desc: "Nghiên cứu vị trí & thị trường",
                      icon: "📊",
                    },
                    {
                      step: "02",
                      title: "Phát triển",
                      desc: "Thiết kế & xây dựng chuyên nghiệp",
                      icon: "🏗️",
                    },
                    {
                      step: "03",
                      title: "Bàn giao",
                      desc: "Hoàn thiện & hỗ trợ khách hàng",
                      icon: "🔑",
                    },
                  ].map((process, index) => (
                    <div key={index} className="group text-center">
                      <div
                        className="relative w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-2 border-2"
                        style={{
                          backgroundColor: "var(--color-bg)",
                          borderColor: "var(--color-border-accent)",
                        }}>
                        {/* Step Number */}
                        <div
                          className="absolute -top-3 -right-3 w-8 h-8 rounded-full flex items-center justify-center text-xs font-black"
                          style={{
                            background: "var(--gradient-primary)",
                            color: "var(--color-text-white)",
                          }}>
                          {process.step}
                        </div>

                        <span className="text-2xl">{process.icon}</span>
                      </div>

                      <h4
                        className="font-bold text-lg mb-3"
                        style={{ color: "var(--color-text-primary)" }}>
                        {process.title}
                      </h4>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: "var(--color-text-muted)" }}>
                        {process.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Stats & Trust Indicators */}
              <div className="lg:col-span-2">
                <div className="space-y-8">
                  {/* Main Stats Card */}
                  <div
                    className="relative rounded-3xl p-10 border-2 overflow-hidden"
                    style={{
                      backgroundColor: "var(--color-bg)",
                      borderColor: "var(--color-border-accent)",
                      boxShadow: "var(--shadow-hover)",
                    }}>
                    {/* Background Pattern */}
                    <div
                      className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-5"
                      style={{ background: "var(--gradient-primary)" }}
                    />

                    <div className="relative">
                      {/* Header */}
                      <div className="text-center mb-8">
                        <div
                          className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center text-3xl mb-4"
                          style={{ backgroundColor: "var(--color-bg-accent)" }}>
                          📈
                        </div>
                        <h4
                          className="text-2xl font-black mb-2"
                          style={{ color: "var(--color-text-primary)" }}>
                          Thành Tích Nổi Bật
                        </h4>
                        <p
                          className="text-sm"
                          style={{ color: "var(--color-text-muted)" }}>
                          Con số không nói dối
                        </p>
                      </div>

                      {/* Stats */}
                      <div className="space-y-6">
                        {achievements.map((achievement, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-4 group p-4 rounded-xl transition-all duration-300 hover:scale-105"
                            style={{
                              backgroundColor: "var(--color-bg-secondary)",
                            }}>
                            <div
                              className="w-14 h-14 rounded-xl flex items-center justify-center text-xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12"
                              style={{ background: "var(--gradient-accent)" }}>
                              {achievement.icon}
                            </div>

                            <div className="flex-1">
                              <div className="flex items-baseline gap-3 mb-1">
                                <span
                                  className="text-2xl font-black bg-clip-text text-transparent"
                                  style={{
                                    background: "var(--gradient-primary)",
                                    WebkitBackgroundClip: "text",
                                  }}>
                                  {achievement.number}
                                </span>
                                <span
                                  className="text-sm font-bold"
                                  style={{
                                    color: "var(--color-text-primary)",
                                  }}>
                                  {achievement.label}
                                </span>
                              </div>
                              <div
                                className="text-xs"
                                style={{ color: "var(--color-text-muted)" }}>
                                {achievement.subtitle}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Trust Indicators */}
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      {
                        icon: "🏅",
                        title: "Chứng nhận",
                        desc: "Uy tín quốc tế",
                      },
                      { icon: "🤝", title: "Đối tác", desc: "Ngân hàng lớn" },
                      {
                        icon: "📋",
                        title: "Pháp lý",
                        desc: "Đầy đủ & rõ ràng",
                      },
                      {
                        icon: "💎",
                        title: "Chất lượng",
                        desc: "Tiêu chuẩn cao",
                      },
                    ].map((trust, index) => (
                      <div
                        key={index}
                        className="group p-6 rounded-2xl text-center transition-all duration-300 hover:scale-105 hover:-translate-y-1"
                        style={{
                          backgroundColor: "var(--color-bg)",
                          border: `1px solid var(--color-border)`,
                        }}>
                        <div
                          className="w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center text-xl transition-transform duration-300 group-hover:scale-110"
                          style={{
                            backgroundColor: "var(--color-bg-secondary)",
                          }}>
                          {trust.icon}
                        </div>
                        <h5
                          className="font-bold text-sm mb-1"
                          style={{ color: "var(--color-text-primary)" }}>
                          {trust.title}
                        </h5>
                        <p
                          className="text-xs"
                          style={{ color: "var(--color-text-muted)" }}>
                          {trust.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact & CTA Section */}
        <div
          className="relative py-20 lg:py-24"
          style={{ backgroundColor: "var(--color-bg)" }}>
          <div className="container mx-auto px-4 lg:px-6">
            <div className="max-w-5xl mx-auto">
              {/* Final CTA Card */}
              <div
                className="relative rounded-3xl p-12 lg:p-16 border-2 overflow-hidden text-center"
                style={{
                  background: "var(--gradient-secondary)",
                  borderColor: "var(--color-border-accent)",
                }}>
                {/* Background Effects */}
                <div
                  className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-5"
                  style={{ background: "var(--gradient-primary)" }}
                />
                <div
                  className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-5"
                  style={{ background: "var(--gradient-accent)" }}
                />

                <div className="relative">
                  {/* Badge */}
                  <div
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full mb-8"
                    style={{
                      backgroundColor: "var(--color-warning-light)",
                      color: "var(--color-warning)",
                    }}>
                    <span className="animate-pulse">⚡</span>
                    <span className="font-bold text-sm uppercase tracking-wide">
                      Cơ Hội Có Hạn
                    </span>
                  </div>

                  {/* Main CTA */}
                  <h4
                    className="text-3xl lg:text-5xl font-black mb-6 leading-tight"
                    style={{ color: "var(--color-text-primary)" }}>
                    Sẵn sàng sở hữu
                    <span
                      className="bg-clip-text text-transparent block"
                      style={{
                        background: "var(--gradient-primary)",
                        WebkitBackgroundClip: "text",
                      }}>
                      bất động sản đáng mơ ước?
                    </span>
                  </h4>

                  <p
                    className="text-xl lg:text-2xl mb-10 max-w-3xl mx-auto leading-relaxed"
                    style={{ color: "var(--color-text-secondary)" }}>
                    Đội ngũ chuyên gia tư vấn của chúng tôi sẽ giúp bạn tìm được
                    dự án phù hợp nhất với nhu cầu và khả năng tài chính.
                  </p>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                    <Link
                      target="_blank"
                      href={storeInfo.phone ? `tel:${storeInfo.phone}` : "/"}
                      className="group px-12 py-5 rounded-2xl font-bold text-xl transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center gap-4"
                      style={{
                        background: "var(--gradient-primary)",
                        color: "var(--color-text-white)",
                        boxShadow: "var(--shadow-hover)",
                      }}>
                      <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                        📞
                      </span>
                      Hotline: {storeInfo.phone || "1900 123 456"}
                    </Link>

                    <button
                      className="group px-12 py-5 rounded-2xl font-bold text-xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center gap-4"
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                        borderColor: "var(--color-primary)",
                        color: "var(--color-primary)",
                        backdropFilter: "blur(10px)",
                      }}>
                      <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                        💬
                      </span>
                      Tư Vấn Online
                    </button>
                  </div>

                  {/* Trust Line */}
                  <div
                    className="flex items-center justify-center gap-6 mt-8 pt-8 border-t border-opacity-20"
                    style={{ borderColor: "var(--color-border-accent)" }}>
                    <span
                      className="text-sm font-medium"
                      style={{ color: "var(--color-text-muted)" }}>
                      🔒 Thông tin được bảo mật tuyệt đối
                    </span>
                    <span
                      className="text-sm font-medium"
                      style={{ color: "var(--color-text-muted)" }}>
                      ⚡ Tư vấn miễn phí 24/7
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/** @format */

import { ProductAPI } from "@/api/products/product.api";
import { ProductListMotionWrapper } from "@/components/ui/product/ProductListMotionWrapper";
import { ProductInterface } from "@/types/product";
import { PromotionInterface, ProductPromotion } from "@/types/promotion";
import { fetchSafe } from "@/utils/fetchSafe";

interface Props {
  industry: string;
}

const getCacheFeatureProductSSR = async (): Promise<ProductInterface[]> => {
  const res = await fetchSafe(
    () => ProductAPI.getFeatureProducts({ limit: 5 }),
    {
      products: [],
    }
  );

  const products = res.products ?? [];
  return products;
};

export const FeatureProducts = async ({ industry }: Props) => {
  let featureProducts: ProductInterface[] = [];
  let promotions: PromotionInterface[] = [];

  featureProducts = await getCacheFeatureProductSSR();

  // Lấy danh sách promotion duy nhất
  const allPromotions: ProductPromotion[] = featureProducts.flatMap(
    (p) => p.promotionProducts
  );

  const uniquePromotionsMap = new Map<number, PromotionInterface>();
  for (const promo of allPromotions) {
    if (promo.promotion && !uniquePromotionsMap.has(promo.promotionId)) {
      uniquePromotionsMap.set(promo.promotionId, promo.promotion);
    }
  }
  promotions = Array.from(uniquePromotionsMap.values());

  const achievements = [
    {
      number: featureProducts.length,
      label: "Bộ sưu tập độc quyền",
      subtitle: "Thiết kế riêng biệt",
      icon: "🎨",
    },
    {
      number: "2.5K+",
      label: "Không gian hoàn thiện",
      subtitle: "Khách hàng hài lòng",
      icon: "🏠",
    },
    {
      number: promotions.length || 5,
      label: "Ưu đãi đặc biệt",
      subtitle: "Giá tốt nhất thị trường",
      icon: "💎",
    },
  ];

  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: "var(--color-bg)" }}>
      {/* Modern Asymmetric Layout */}
      <div className="relative">
        {/* Top Diagonal Section */}
        <div
          className="relative py-20 lg:py-32"
          style={{ background: "var(--gradient-secondary)" }}>
          <div className="">
            <div className="container mx-auto px-4 lg:px-6">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                {/* Left: Content */}
                <div className="space-y-8">
                  <div className="space-y-6">
                    {/* Badge */}
                    <div
                      className="inline-flex items-center gap-3 rounded-full px-6 py-3 border"
                      style={{
                        backgroundColor: "var(--color-bg)",
                        borderColor: "var(--color-border)",
                        boxShadow: "var(--shadow-default)",
                      }}>
                      <div
                        className="w-2 h-2 rounded-full animate-pulse"
                        style={{ backgroundColor: "var(--color-accent-green)" }}
                      />
                      <span
                        className="text-sm font-semibold uppercase tracking-wide"
                        style={{ color: "var(--color-text-primary)" }}>
                        {industry} Cao Cấp
                      </span>
                    </div>

                    {/* Main Heading */}
                    <h1 className="text-4xl lg:text-6xl xl:text-7xl font-black leading-tight">
                      <div
                        className="mb-2"
                        style={{ color: "var(--color-text-primary)" }}>
                        Nghệ Thuật
                      </div>
                      <div
                        className="bg-clip-text text-transparent"
                        style={{
                          background: "var(--gradient-primary)",
                          WebkitBackgroundClip: "text",
                        }}>
                        Kiến Tạo
                      </div>
                      <div
                        className="text-3xl lg:text-5xl xl:text-6xl font-light"
                        style={{ color: "var(--color-text-secondary)" }}>
                        Không Gian
                      </div>
                    </h1>

                    {/* Description */}
                    <p
                      className="text-lg lg:text-xl leading-relaxed max-w-lg"
                      style={{ color: "var(--color-text-secondary)" }}>
                      Mỗi sản phẩm trong bộ sưu tập được tuyển chọn kỹ lưỡng,
                      mang đến sự hài hòa hoàn hảo giữa thẩm mỹ và công năng cho
                      ngôi nhà của bạn.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <button
                        className="px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                        style={{
                          background: "var(--gradient-primary)",
                          color: "var(--color-text-white)",
                          boxShadow: "var(--shadow-default)",
                        }}>
                        Khám Phá Bộ Sưu Tập
                      </button>
                      <button
                        className="px-8 py-4 rounded-xl font-semibold border-2 transition-all duration-300 hover:scale-105"
                        style={{
                          backgroundColor: "transparent",
                          borderColor: "var(--color-primary)",
                          color: "var(--color-primary)",
                        }}>
                        Tư Vấn Miễn Phí
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right: Achievement Cards */}
                <div className="relative">
                  <div className="grid gap-6">
                    {achievements.map((achievement, index) => (
                      <div
                        key={index}
                        className={`group p-6 rounded-2xl border transition-all duration-500 hover:scale-105 ${
                          index === 1
                            ? "lg:ml-12"
                            : index === 2
                            ? "lg:ml-24"
                            : ""
                        }`}
                        style={{
                          backgroundColor: "var(--color-bg)",
                          borderColor: "var(--color-border-light)",
                          boxShadow: "var(--shadow-default)",
                        }}>
                        <div className="flex items-center gap-4">
                          <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-transform duration-300 group-hover:scale-110"
                            style={{
                              backgroundColor:
                                "var(--color-accent-green-light)",
                            }}>
                            {achievement.icon}
                          </div>
                          <div>
                            <div
                              className="text-2xl lg:text-3xl font-bold bg-clip-text text-transparent"
                              style={{
                                background: "var(--gradient-primary)",
                                WebkitBackgroundClip: "text",
                              }}>
                              {achievement.number}
                            </div>
                            <div
                              className="text-sm font-semibold"
                              style={{ color: "var(--color-text-primary)" }}>
                              {achievement.label}
                            </div>
                            <div
                              className="text-xs"
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
        </div>

        {/* Products Section with Creative Layout */}
        <div className="relative py-20 lg:py-32">
          {/* Floating Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
              className="absolute top-1/4 left-10 w-32 h-32 rounded-full blur-2xl opacity-20 animate-float"
              style={{ background: "var(--gradient-primary)" }}
            />
            <div
              className="absolute bottom-1/4 right-10 w-40 h-40 rounded-full blur-2xl opacity-15 animate-float"
              style={{
                background: "var(--gradient-accent)",
                animationDelay: "2s",
              }}
            />
          </div>

          <div className="container mx-auto px-4 lg:px-6">
            {/* Section Introduction */}
            <div className="max-w-3xl mb-16 lg:mb-20">
              <div className="flex items-start gap-6">
                <div
                  className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl flex items-center justify-center text-2xl lg:text-3xl border"
                  style={{
                    backgroundColor: "var(--color-bg-secondary)",
                    borderColor: "var(--color-border)",
                  }}>
                  ✨
                </div>
                <div>
                  <h2
                    className="text-3xl lg:text-5xl font-bold mb-4 leading-tight"
                    style={{ color: "var(--color-text-primary)" }}>
                    Sản Phẩm Được
                    <span
                      className="block bg-clip-text text-transparent"
                      style={{
                        background: "var(--gradient-primary)",
                        WebkitBackgroundClip: "text",
                      }}>
                      Yêu Thích Nhất
                    </span>
                  </h2>
                  <p
                    className="text-lg lg:text-xl leading-relaxed"
                    style={{ color: "var(--color-text-secondary)" }}>
                    Từng chi tiết được chăm chút tỉ mỉ, từng đường nét thể hiện
                    phong cách sống đẳng cấp và tinh tế của gia chủ.
                  </p>
                </div>
              </div>
            </div>

            {/* Products Display */}
            <div className="relative">
              <ProductListMotionWrapper products={featureProducts} />
            </div>
          </div>
        </div>

        {/* Bottom Section: Brand Promise */}
        <div
          className="relative py-16 lg:py-24"
          style={{ backgroundColor: "var(--color-bg-accent)" }}>
          <div className="container mx-auto px-4 lg:px-6">
            <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 items-center">
              {/* Left: Brand Promise */}
              <div className="lg:col-span-2 space-y-8">
                <div className="space-y-6">
                  <div
                    className="inline-block px-4 py-2 rounded-full text-sm font-semibold"
                    style={{
                      backgroundColor: "var(--color-accent-green-light)",
                      color: "var(--color-accent-green)",
                    }}>
                    Cam Kết Chất Lượng
                  </div>

                  <h3
                    className="text-2xl lg:text-4xl font-bold leading-tight"
                    style={{ color: "var(--color-text-primary)" }}>
                    Mỗi sản phẩm là một
                    <span
                      className="bg-clip-text text-transparent block"
                      style={{
                        background: "var(--gradient-primary)",
                        WebkitBackgroundClip: "text",
                      }}>
                      tác phẩm nghệ thuật
                    </span>
                  </h3>

                  <p
                    className="text-lg leading-relaxed max-w-2xl"
                    style={{ color: "var(--color-text-secondary)" }}>
                    Chúng tôi không chỉ bán nội thất, mà tạo ra những trải
                    nghiệm sống. Từ việc lựa chọn nguyên liệu cho đến hoàn thiện
                    sản phẩm, mọi bước đều được thực hiện với sự tỉ mỉ và đam
                    mê.
                  </p>
                </div>

                {/* Process Steps */}
                <div className="grid sm:grid-cols-3 gap-6">
                  {[
                    {
                      step: "01",
                      title: "Tư vấn",
                      desc: "Thiết kế theo yêu cầu",
                    },
                    {
                      step: "02",
                      title: "Sản xuất",
                      desc: "Chất liệu cao cấp",
                    },
                    {
                      step: "03",
                      title: "Hoàn thiện",
                      desc: "Lắp đặt chuyên nghiệp",
                    },
                  ].map((process, index) => (
                    <div key={index} className="text-center group">
                      <div
                        className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center font-bold text-lg transition-all duration-300 group-hover:scale-110 border"
                        style={{
                          backgroundColor: "var(--color-bg)",
                          borderColor: "var(--color-border)",
                          color: "var(--color-primary)",
                        }}>
                        {process.step}
                      </div>
                      <h4
                        className="font-semibold mb-2"
                        style={{ color: "var(--color-text-primary)" }}>
                        {process.title}
                      </h4>
                      <p
                        className="text-sm"
                        style={{ color: "var(--color-text-muted)" }}>
                        {process.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Floating Stats Card */}
              <div className="relative">
                <div
                  className="rounded-3xl p-8 border-2 relative overflow-hidden"
                  style={{
                    backgroundColor: "var(--color-bg)",
                    borderColor: "var(--color-border)",
                    boxShadow: "var(--shadow-hover)",
                  }}>
                  {/* Card Background Pattern */}
                  <div
                    className="absolute top-0 right-0 w-32 h-32 opacity-5"
                    style={{ background: "var(--gradient-primary)" }}
                  />

                  <div className="relative space-y-6">
                    <div className="text-center">
                      <div
                        className="w-12 h-12 mx-auto rounded-2xl flex items-center justify-center text-2xl mb-4"
                        style={{
                          backgroundColor: "var(--color-accent-green-light)",
                        }}>
                        📊
                      </div>
                      <h4
                        className="text-xl font-bold mb-2"
                        style={{ color: "var(--color-text-primary)" }}>
                        Thống Kê Nổi Bật
                      </h4>
                    </div>

                    <div className="space-y-4">
                      {achievements.map((achievement, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-4 group">
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center text-lg transition-transform duration-300 group-hover:scale-110"
                            style={{
                              backgroundColor: "var(--color-bg-secondary)",
                            }}>
                            {achievement.icon}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-baseline gap-2">
                              <span
                                className="text-xl font-bold bg-clip-text text-transparent"
                                style={{
                                  background: "var(--gradient-primary)",
                                  WebkitBackgroundClip: "text",
                                }}>
                                {achievement.number}
                              </span>
                              <span
                                className="text-sm font-medium"
                                style={{ color: "var(--color-text-primary)" }}>
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
              </div>
            </div>
          </div>
        </div>

        {/* Bottom: Trust & Contact Section */}
        <div
          className="relative py-16 lg:py-20"
          style={{ backgroundColor: "var(--color-bg)" }}>
          <div className="container mx-auto px-4 lg:px-6">
            <div className="max-w-4xl mx-auto text-center">
              {/* Trust Indicators */}
              <div className="grid sm:grid-cols-3 gap-8 mb-12">
                {[
                  { icon: "🏅", title: "Chứng nhận", desc: "ISO 9001:2015" },
                  { icon: "🚚", title: "Giao hàng", desc: "Toàn quốc 24h" },
                  { icon: "🛠️", title: "Bảo hành", desc: "Lên tới 10 năm" },
                ].map((trust, index) => (
                  <div key={index} className="group">
                    <div
                      className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center text-2xl transition-transform duration-300 group-hover:scale-110 border"
                      style={{
                        backgroundColor: "var(--color-bg-secondary)",
                        borderColor: "var(--color-border)",
                      }}>
                      {trust.icon}
                    </div>
                    <h5
                      className="font-semibold mb-2"
                      style={{ color: "var(--color-text-primary)" }}>
                      {trust.title}
                    </h5>
                    <p
                      className="text-sm"
                      style={{ color: "var(--color-text-muted)" }}>
                      {trust.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Final CTA */}
              <div
                className="rounded-2xl p-8 lg:p-12 border-2 relative overflow-hidden"
                style={{
                  background: "var(--gradient-secondary)",
                  borderColor: "var(--color-border)",
                }}>
                <div
                  className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-10"
                  style={{ background: "var(--gradient-primary)" }}
                />

                <div className="relative">
                  <h4
                    className="text-2xl lg:text-3xl font-bold mb-4"
                    style={{ color: "var(--color-text-primary)" }}>
                    Sẵn sàng biến ước mơ thành hiện thực?
                  </h4>
                  <p
                    className="text-lg mb-8 max-w-2xl mx-auto"
                    style={{ color: "var(--color-text-secondary)" }}>
                    Đội ngũ chuyên gia của chúng tôi sẽ giúp bạn tạo ra không
                    gian sống hoàn hảo với những sản phẩm nội thất đẳng cấp
                    nhất.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      className="px-10 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3"
                      style={{
                        background: "var(--gradient-primary)",
                        color: "var(--color-text-white)",
                        boxShadow: "var(--shadow-default)",
                      }}>
                      <span>📞</span>
                      Liên Hệ Ngay
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animation Styles */}
      {/* <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-10px) rotate(1deg);
          }
          66% {
            transform: translateY(5px) rotate(-1deg);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style> */}
    </section>
  );
};

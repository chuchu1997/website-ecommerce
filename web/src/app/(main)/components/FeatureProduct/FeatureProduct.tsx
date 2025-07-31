/** @format */

import { ProductAPI } from "@/api/products/product.api";
import { ProductListMotionWrapper } from "@/components/ui/product/ProductListMotionWrapper";
import { ProductInterface } from "@/types/product";
import { PromotionInterface, ProductPromotion } from "@/types/promotion";
import { fetchSafe } from "@/utils/fetchSafe";

interface Props {
  industry: string;
}

export const FeatureProducts = async ({ industry }: Props) => {
  let featureProducts: ProductInterface[] = [];
  let promotions: PromotionInterface[] = [];
  const response = await fetchSafe(
    () => ProductAPI.getFeatureProducts({ limit: 5 }),
    { data: { products: [] } }
  );

  featureProducts = response.data.products as ProductInterface[];

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

  // try {
  //   const response = await fetchSafe(
  //     () => ProductAPI.getFeatureProducts({ limit: 5 }),
  //     { data: { products: [] } }
  //   );

  //   featureProducts = response.data.products as ProductInterface[];

  //   const allProductPromotions: ProductPromotion[] = featureProducts.flatMap(
  //     (product) => product.promotionProducts
  //   );

  //   const uniquePromotionsMap = new Map<number, PromotionInterface>();

  //   for (const promo of allProductPromotions) {
  //     if (promo.promotion && !uniquePromotionsMap.has(promo.promotionId)) {
  //       uniquePromotionsMap.set(promo.promotionId, promo.promotion);
  //     }
  //   }
  //   promotions = Array.from(uniquePromotionsMap.values());
  // } catch (error) {
  //   console.error("Failed to fetch featured products:", error);
  // }

  const stats = [
    {
      value: featureProducts.length,
      label: "Sản phẩm nổi bật",
      color: "from-yellow-600 to-yellow-700",
      bgColor: "from-yellow-50 to-yellow-100",
      shadowColor: "shadow-yellow-200/50",
      icon: "🌟",
    },
    {
      value: "100%",
      label: "Chất lượng cao cấp",
      color: "from-amber-700 to-yellow-800",
      bgColor: "from-amber-50 to-yellow-50",
      shadowColor: "shadow-amber-200/50",
      icon: "✨",
    },
    {
      value: "24/7",
      label: "Hỗ trợ tận tâm",
      color: "from-stone-600 to-stone-700",
      bgColor: "from-stone-50 to-gray-100",
      shadowColor: "shadow-stone-200/50",
      icon: "🤝",
    },
    {
      value: promotions.length || 0,
      label: "Ưu đãi độc quyền",
      color: "from-yellow-600 to-amber-600",
      bgColor: "from-yellow-50 to-amber-50",
      shadowColor: "shadow-yellow-200/50",
      icon: "🎁",
    },
  ];

  return (
    <section className="relative py-20 px-2 lg:py-28 bg-gradient-to-br from-white via-gray-50 to-yellow-50/40 overflow-hidden">
      {/* Sophisticated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Elegant floating shapes */}
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-yellow-100/30 to-amber-200/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-br from-stone-100/25 to-yellow-200/15 rounded-full blur-3xl animate-pulse animation-delay-2000" />
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-64 h-64 bg-gradient-to-br from-gray-100/20 to-yellow-100/10 rounded-full blur-2xl animate-pulse animation-delay-4000" />

        {/* Refined grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(156,163,175,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(156,163,175,0.03)_1px,transparent_1px)] bg-[size:80px_80px]" />

        {/* Premium curves */}
        <svg
          className="absolute inset-0 w-full h-full opacity-15"
          xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient
              id="premiumGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%">
              <stop offset="0%" stopColor="rgba(245, 158, 11, 0.15)" />
              <stop offset="50%" stopColor="rgba(217, 119, 6, 0.12)" />
              <stop offset="100%" stopColor="rgba(120, 113, 108, 0.08)" />
            </linearGradient>
          </defs>
          <path
            d="M0,120 Q500,60 1000,140 T2000,120"
            stroke="url(#premiumGradient)"
            strokeWidth="3"
            fill="none"
            className="animate-pulse"
          />
          <path
            d="M0,250 Q700,180 1400,220 T2800,250"
            stroke="url(#premiumGradient)"
            strokeWidth="2"
            fill="none"
            className="animate-pulse"
            style={{ animationDelay: "1.5s" }}
          />
        </svg>
      </div>

      <div className="relative container mx-auto">
        {/* Luxurious Header Section */}
        <div className="text-center mb-16 lg:mb-24">
          {/* Premium Icon Container */}
          <div className="inline-flex items-center justify-center w-20 h-20 lg:w-28 lg:h-28 mb-8 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 rounded-3xl blur-xl opacity-25 animate-pulse" />
            <div className="absolute inset-2 bg-gradient-to-r from-yellow-100 to-amber-100 rounded-2xl opacity-50" />
            <div className="relative bg-white rounded-2xl p-5 lg:p-7 shadow-2xl border border-yellow-200/50 backdrop-blur-sm">
              <span className="text-3xl lg:text-5xl filter drop-shadow-sm">
                ⭐
              </span>
            </div>
          </div>

          {/* Sophisticated Title */}
          <h2 className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-black mb-6 leading-tight tracking-tight flex items-center justify-center gap-x-2">
            <span className="block text-gray-800 ">Sản Phẩm</span>
            <span className="block bg-gradient-to-r from-yellow-600 via-amber-600 to-yellow-700 bg-clip-text text-transparent drop-shadow-sm">
              Nổi Bật
            </span>
          </h2>

          {/* Refined Description */}
          <div className="max-w-4xl mx-auto">
            <p className="text-base sm:text-xl lg:text-2xl text-gray-600 leading-relaxed font-light mb-4">
              Khám phá những sản phẩm{" "}
              <span className="font-semibold text-yellow-700 bg-yellow-50 px-2 py-1 rounded-lg">
                {industry}
              </span>{" "}
              được chế tác tinh xảo, thiết kế hiện đại và được yêu thích nhất từ
              bộ sưu tập của chúng tôi
            </p>
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full px-6 py-3 shadow-lg">
              <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600 font-medium">
                Được tuyển chọn kỹ lưỡng
              </span>
            </div>
          </div>

          {/* Elegant Divider */}
          <div className="flex items-center justify-center mt-12 lg:mt-16">
            <div className="flex items-center space-x-6">
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-yellow-400/60 to-transparent"></div>
              <div className="bg-white rounded-full p-3 shadow-lg border border-yellow-100">
                <div className="flex space-x-1">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse"
                      style={{ animationDelay: `${i * 0.3}s` }}
                    />
                  ))}
                </div>
              </div>
              <div className="w-24 h-px bg-gradient-to-r from-transparent via-yellow-400/60 to-transparent"></div>
            </div>
          </div>
        </div>

        {/* Enhanced Products Section */}
        <div className="relative mb-20 lg:mb-28">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-50/50 via-transparent to-yellow-50/50 rounded-3xl blur-3xl opacity-60"></div>
          <div className="relative">
            <ProductListMotionWrapper products={featureProducts} />
          </div>
        </div>

        {/* Luxury Stats Section */}
        {featureProducts.length > 0 && (
          <div className="relative">
            {/* Stats Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-full px-8 py-4 border border-yellow-200/50 shadow-lg mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <span className="text-yellow-800 font-semibold text-sm uppercase tracking-wider">
                  Uy tín & Chất lượng
                </span>
              </div>

              <h3 className="text-2xl lg:text-4xl font-black text-gray-800 mb-6">
                Tại Sao Chọn Chúng Tôi?
              </h3>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Những con số minh chứng cho chất lượng và uy tín hàng đầu trong
                ngành
              </p>
            </div>

            {/* Premium Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={`group relative bg-white rounded-3xl p-6 lg:p-8 shadow-xl hover:shadow-2xl ${stat.shadowColor} transition-all duration-700 hover:-translate-y-3 border border-gray-100 hover:border-yellow-200 overflow-hidden`}>
                  {/* Premium Background Gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${stat.bgColor} rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-700`}
                  />

                  {/* Floating Accent */}
                  <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-yellow-100 to-amber-100 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm"></div>

                  {/* Content */}
                  <div className="relative text-center">
                    {/* Icon with Enhanced Styling */}
                    <div className="relative mb-6">
                      <div className="absolute inset-0 bg-gradient-to-r from-yellow-200 to-amber-200 rounded-2xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                      <div className="relative bg-gradient-to-br from-gray-50 to-white rounded-2xl p-4 border border-gray-100 group-hover:border-yellow-200 transition-all duration-500">
                        <div className="text-2xl lg:text-4xl transform group-hover:scale-110 transition-transform duration-500 filter drop-shadow-sm">
                          {stat.icon}
                        </div>
                      </div>
                    </div>

                    {/* Value with Premium Typography */}
                    <div
                      className={`text-2xl lg:text-4xl xl:text-5xl font-black mb-4 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent filter drop-shadow-sm`}>
                      {stat.value}
                    </div>

                    {/* Label */}
                    <div className="text-sm lg:text-base text-gray-600 font-semibold leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                      {stat.label}
                    </div>
                  </div>

                  {/* Sophisticated Hover Effect */}
                  <div
                    className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${stat.bgColor} opacity-0 group-hover:opacity-20 transition-all duration-700`}
                  />

                  {/* Corner Accent */}
                  <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-yellow-100/50 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Premium Trust Badge */}
        <div className="flex justify-center mt-20 lg:mt-24">
          <div className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 rounded-full blur-lg opacity-20 group-hover:opacity-30 transition duration-700" />
            <div className="relative bg-white/95 backdrop-blur-lg rounded-full border-2 border-yellow-200/50 shadow-2xl px-10 py-6 lg:px-16 lg:py-8">
              <div className="flex items-center gap-6">
                {/* Animated Status Indicators */}
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-4 h-4 bg-yellow-500 rounded-full animate-pulse shadow-lg"></div>
                    <div className="absolute inset-0 w-4 h-4 bg-yellow-400 rounded-full animate-ping opacity-50"></div>
                  </div>
                  <div
                    className="w-3 h-3 bg-amber-400 rounded-full animate-pulse shadow-md"
                    style={{ animationDelay: "0.3s" }}
                  />
                  <div
                    className="w-2 h-2 bg-yellow-600 rounded-full animate-pulse shadow-sm"
                    style={{ animationDelay: "0.6s" }}
                  />
                </div>

                {/* Trust Message */}
                <div className="text-center">
                  <div className="text-lg lg:text-xl text-gray-700 font-bold">
                    Được tin tưởng bởi{" "}
                    <span className="text-2xl font-black bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">
                      1000+
                    </span>{" "}
                    khách hàng
                  </div>
                  <div className="text-sm text-gray-500 font-medium mt-1">
                    Chất lượng được công nhận toàn quốc
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

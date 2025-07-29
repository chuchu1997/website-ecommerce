import { ProductAPI } from "@/api/products/product.api";
import { ProductListMotionWrapper } from "@/components/ui/product/ProductListMotionWrapper";
import { ProductInterface } from "@/types/product";
import { PromotionInterface, ProductPromotion } from "@/types/promotion";

interface Props {
  industry: string;
}

export const FeatureProducts = async ({ industry }: Props) => {
  let featureProducts: ProductInterface[] = [];
  let promotions: PromotionInterface[] = [];

  try {
    const response = await ProductAPI.getFeatureProducts({
      limit: 5,
    });

    featureProducts = response.data.products as ProductInterface[];

    const allProductPromotions: ProductPromotion[] = featureProducts.flatMap(
      (product) => product.promotionProducts
    );

    const uniquePromotionsMap = new Map<number, PromotionInterface>();

    for (const promo of allProductPromotions) {
      if (promo.promotion && !uniquePromotionsMap.has(promo.promotionId)) {
        uniquePromotionsMap.set(promo.promotionId, promo.promotion);
      }
    }
    promotions = Array.from(uniquePromotionsMap.values());
  } catch (error) {
    console.error("Failed to fetch featured products:", error);
  }

  const stats = [
    {
      value: featureProducts.length,
      label: "Sản phẩm nổi bật",
      color: "from-blue-600 to-blue-700",
      bgColor: "from-blue-50 to-blue-100",
      icon: "🌟"
    },
    {
      value: "100%",
      label: "Chất lượng cao cấp",
      color: "from-emerald-600 to-emerald-700", 
      bgColor: "from-emerald-50 to-emerald-100",
      icon: "✨"
    },
    {
      value: "24/7",
      label: "Hỗ trợ tận tâm",
      color: "from-purple-600 to-purple-700",
      bgColor: "from-purple-50 to-purple-100", 
      icon: "🤝"
    },
    {
      value: promotions.length || 0,
      label: "Ưu đãi độc quyền",
      color: "from-pink-600 to-pink-700",
      bgColor: "from-pink-50 to-pink-100",
      icon: "🎁"
    }
  ];

  return (
    <section className="relative py-20 px-2 lg:py-28 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 overflow-hidden">
      {/* Elegant Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating geometric shapes */}
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-100/40 to-indigo-200/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-br from-purple-100/30 to-pink-200/20 rounded-full blur-3xl animate-pulse animation-delay-2000" />
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-64 h-64 bg-gradient-to-br from-emerald-100/25 to-teal-200/15 rounded-full blur-2xl animate-pulse animation-delay-4000" />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.015)_1px,transparent_1px)] bg-[size:60px_60px]" />
        
        {/* Elegant curves */}
        <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="elegantGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0.1)" />
              <stop offset="50%" stopColor="rgba(139, 92, 246, 0.08)" />
              <stop offset="100%" stopColor="rgba(16, 185, 129, 0.06)" />
            </linearGradient>
          </defs>
          <path
            d="M0,100 Q400,50 800,120 T1600,100"
            stroke="url(#elegantGradient)"
            strokeWidth="2"
            fill="none"
            className="animate-pulse"
          />
          <path
            d="M0,200 Q600,150 1200,180 T2400,200"
            stroke="url(#elegantGradient)"
            strokeWidth="1.5"
            fill="none"
            className="animate-pulse"
            style={{ animationDelay: "1s" }}
          />
        </svg>
      </div>

      <div className="relative container mx-auto">
        {/* Premium Header Section */}
        <div className="text-center mb-16 lg:mb-24">
          {/* Floating Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 lg:w-24 lg:h-24 mb-8 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-lg opacity-30 animate-pulse" />
            <div className="relative bg-white rounded-2xl p-5 lg:p-6 shadow-xl border border-gray-100">
              <span className="text-3xl lg:text-4xl">⭐</span>
            </div>
          </div>

          {/* Professional Title */}
          <h2 className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-black mb-6 leading-tight tracking-tight gap-x-2 flex items-center justify-center">
            <span className="block text-gray-900 ">Sản Phẩm</span>
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent">
              Nổi Bật
            </span>
          </h2>

          {/* Elegant Description */}
          <p className="text-base sm:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
            Khám phá những sản phẩm <span className="font-semibold text-blue-700">{industry}</span> được chế tác tinh xảo, 
            thiết kế hiện đại và được yêu thích nhất từ bộ sưu tập của chúng tôi
          </p>

          {/* Modern Divider */}
          <div className="flex items-center justify-center mt-10 lg:mt-12">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
              <div className="flex space-x-2">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"
                    style={{ animationDelay: `${i * 0.4}s` }}
                  />
                ))}
              </div>
              <div className="w-20 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
            </div>
          </div>
        </div>

        {/* Products Section with Enhanced Styling */}
        <div className="relative mb-20 lg:mb-28">
          <ProductListMotionWrapper products={featureProducts} />
        </div>

        {/* Premium Stats Section */}
        {featureProducts.length > 0 && (
          <div className="relative">
            {/* Stats Header */}
            <div className="text-center mb-12">
              <h3 className="text-xl lg:text-3xl font-bold text-gray-900 mb-4">
                Tại Sao Chọn Chúng Tôi?
              </h3>
              <p className="text-sm text-gray-600 max-w-2xl mx-auto">
                Những con số minh chứng cho chất lượng và uy tín của chúng tôi
              </p>
            </div>

            {/* Modern Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="group relative bg-white rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
                >
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgColor} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  {/* Content */}
                  <div className="relative text-center">
                    {/* Icon */}
                    <div className="text-xl lg:text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                      {stat.icon}
                    </div>
                    
                    {/* Value */}
                    <div className={`text-xl lg:text-4xl xl:text-5xl font-black mb-3 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                      {stat.value}
                    </div>
                    
                    {/* Label */}
                    <div className="text-sm lg:text-base text-gray-600 font-medium leading-relaxed">
                      {stat.label}
                    </div>
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Premium Call to Action */}
     

        {/* Trust Badge */}
        <div className="flex justify-center mt-16 lg:mt-20">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-full blur opacity-25 group-hover:opacity-40 transition duration-500" />
            <div className="relative bg-white/90 backdrop-blur-sm rounded-full border border-gray-200 shadow-lg px-8 py-4 lg:px-12 lg:py-5">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: "0.5s" }} />
                </div>
                <span className="text-base text-gray-700 font-medium">
                  Được tin tưởng bởi <span className="font-bold text-blue-600">1000+</span> khách hàng
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
import { ProductAPI } from "@/api/products/product.api";
import { ProductListMotionWrapper } from "@/components/ui/product/ProductListMotionWrapper";
import { Brand } from "@/types/brand";
import { ProductInterface } from "@/types/product";
import { ProductPromotion, PromotionInterface } from "@/types/promotion";




interface Props  { 
  industry:string;

}
export const FeatureProducts = async ({industry}:Props) => {
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

  return (
    <section className="order-t border-white/30 shadow-inner relative py-12 sm:py-16 lg:py-24 bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-gradient-to-br from-amber-200/20 to-orange-300/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-gradient-to-br from-blue-200/20 to-purple-300/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-green-200/10 to-teal-300/10 rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto px-1 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          {/* Icon Badge */}
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl mb-6 sm:mb-8 shadow-lg">
            <span className="text-2xl sm:text-3xl">⭐</span>
          </div>

          {/* Main Title */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold mb-4 sm:mb-6 leading-tight">
            <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
              Sản Phẩm
            </span>
            
            <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 bg-clip-text text-transparent ml-4">
              Nổi Bật
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-2xl lg:max-w-4xl mx-auto leading-relaxed">
            Khám phá những sản phẩm trong ngành {industry} được yêu thích nhất, được chế tác tinh xảo và thiết kế hiện đại.
          </p>

          {/* Decorative Line */}
          <div className="flex items-center justify-center mt-4 sm:mt-10">
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse delay-150" />
              <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse delay-300" />
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="relative">
          {/* Products Grid/List */}
          <div className="relative z-10">
            <ProductListMotionWrapper products={featureProducts} />
          </div>
       
        </div>

        {/* Call to Action */}
        {/* <div className="text-center mt-12 sm:mt-16 lg:mt-20">
          <button className="group relative bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-xl sm:rounded-2xl text-sm sm:text-base lg:text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-2xl overflow-hidden transform hover:scale-105">
            <span className="relative z-10 flex items-center justify-center gap-2">
              Xem Tất Cả Sản Phẩm
              <span className="group-hover:translate-x-1 transition-transform duration-300">
                →
              </span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div> */}

        {/* Stats Section (Optional Enhancement) */}
        {featureProducts.length > 0 && (
          <div className="mt-16 sm:mt-20 lg:mt-24">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                  {featureProducts.length}
                </div>
                <div className="text-sm sm:text-base text-gray-600">
                  Sản phẩm nổi bật
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                  100%
                </div>
                <div className="text-sm sm:text-base text-gray-600">
                  Chất lượng cao
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                  24/7
                </div>
                <div className="text-sm sm:text-base text-gray-600">
                  Hỗ trợ khách hàng
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                  {promotions.length || 0}
                </div>
                <div className="text-sm sm:text-base text-gray-600">
                  Ưu đãi hiện tại
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
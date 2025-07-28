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

  return (
    <section className="relative py-16 sm:py-24 lg:py-32 bg-white overflow-hidden">
      {/* Subtle background gradient and shapes for depth */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-full mix-blend-multiply filter blur-xl animate-blob" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-br from-purple-100 to-pink-200 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-green-100 to-teal-200 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Header Section */}
        <div className="text-center mb-16 sm:mb-20 lg:mb-24">
          {/* Main Title */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight tracking-tight">
            <span className="block">Sản Phẩm</span>
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-700">
              Nổi Bật
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Khám phá những sản phẩm **{industry}** được chế tác tinh xảo, thiết
            kế hiện đại và được yêu thích nhất từ bộ sưu tập của chúng tôi.
          </p>

          {/* Decorative Separator */}
          <div className="flex justify-center mt-8">
            <div className="h-1 w-24 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full" />
          </div>
        </div>

        {/* Products Section */}
        <div className="relative">
          <ProductListMotionWrapper products={featureProducts} />
        </div>

        {/* Stats Section */}
        {featureProducts.length > 0 && (
          <div className="mt-20 sm:mt-24 lg:mt-32 border-t border-gray-200 pt-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center bg-gray-50 p-6 rounded-lg shadow-sm transform hover:scale-105 transition duration-300 ease-in-out">
                <div className="text-4xl font-bold text-indigo-700 mb-2">
                  {featureProducts.length}
                </div>
                <div className="text-md text-gray-600 font-medium">
                  Sản phẩm nổi bật
                </div>
              </div>
              <div className="text-center bg-gray-50 p-6 rounded-lg shadow-sm transform hover:scale-105 transition duration-300 ease-in-out">
                <div className="text-4xl font-bold text-purple-700 mb-2">
                  100%
                </div>
                <div className="text-md text-gray-600 font-medium">
                  Chất lượng cao cấp
                </div>
              </div>
              <div className="text-center bg-gray-50 p-6 rounded-lg shadow-sm transform hover:scale-105 transition duration-300 ease-in-out">
                <div className="text-4xl font-bold text-teal-700 mb-2">
                  24/7
                </div>
                <div className="text-md text-gray-600 font-medium">
                  Hỗ trợ tận tâm
                </div>
              </div>
              <div className="text-center bg-gray-50 p-6 rounded-lg shadow-sm transform hover:scale-105 transition duration-300 ease-in-out">
                <div className="text-4xl font-bold text-pink-700 mb-2">
                  {promotions.length || 0}
                </div>
                <div className="text-md text-gray-600 font-medium">
                  Ưu đãi độc quyền
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Optional Call to Action */}
        <div className="text-center mt-20">
          <button className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-700 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 overflow-hidden">
            <span className="relative z-10 flex items-center gap-2">
              Xem Tất Cả Sản Phẩm
              <svg
                className="w-5 h-5 ml-1 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </span>
            <div className="absolute inset-0 bg-white opacity-20 transform scale-0 group-hover:scale-100 rounded-full transition-all duration-500 ease-out" />
          </button>
        </div>
      </div>
    </section>
  );
};
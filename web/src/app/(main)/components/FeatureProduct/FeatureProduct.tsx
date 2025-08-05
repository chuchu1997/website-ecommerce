import { ProductAPI } from "@/api/products/product.api";
import { ProductListMotionWrapper } from "@/components/ui/product/ProductListMotionWrapper";
import { Brand } from "@/types/brand";
import { ProductInterface } from "@/types/product";
import { ProductPromotion, PromotionInterface } from "@/types/promotion";
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

  try {
    const response = await ProductAPI.getFeatureProducts({
      limit: 5,
    });

    featureProducts = await getCacheFeatureProductSSR();

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
    <section className="py-16 lg:py-24 bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-yellow-100 border border-yellow-200 rounded-full mb-6">
            <svg className="w-4 h-4 text-yellow-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm font-medium text-yellow-800">Sản phẩm nổi bật</span>
          </div>

          {/* Main Title */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Sản Phẩm 
            <span className="text-yellow-600 ml-2">Được Yêu Thích Nhất</span>
          </h2>

          {/* Subtitle */}
          <p className="text-base text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Khám phá bộ sưu tập sản phẩm chất lượng cao trong ngành <span className="font-semibold text-gray-900">{industry}</span>, được khách hàng tin tựng và đánh giá cao nhất.
          </p>
        </div>

        {/* Products Section */}
        <div className="mb-16">
          <ProductListMotionWrapper products={featureProducts} />
        </div>

        {/* Stats Section */}
        {featureProducts.length > 0 && (
          <div className="border-t border-gray-200 pt-16">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                  {featureProducts.length}
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  Sản phẩm nổi bật
                </div>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                  100%
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  Chất lượng đảm bảo
                </div>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 110 19.5 9.75 9.75 0 010-19.5z" />
                  </svg>
                </div>
                <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                  24/7
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  Hỗ trợ khách hàng
                </div>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                </div>
                <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                  {promotions.length}
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  Ưu đãi đặc biệt
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
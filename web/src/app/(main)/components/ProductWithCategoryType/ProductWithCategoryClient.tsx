"use client";

import { ImageLoader } from "@/components/ui/image-loader";
import { CategoryInterface } from "@/types/category";
import { ProductInterface } from "@/types/product";
import { PromotionInterface } from "@/types/promotion";
import Link from "next/link";
import { ArrowRight, Star, TrendingUp, Package, Tag } from "lucide-react";
import { Slider } from "@/common/SlideCustom";
import { ProductCard } from "@/components/ui/product/product-card";
import { useWindowSize } from "@/hooks/useWindowSize";

interface ClientProps {
  category: CategoryInterface;
  products: ProductInterface[];
  promotions: PromotionInterface[];
  slug: string;
  industry: string;
  isGrayBg?:boolean;
}

export const ProductWithCategoryClient = ({
  category,
  products,
  promotions,
  slug,
  industry,
  isGrayBg
}: ClientProps) => {
  const windowSize = useWindowSize();

  return (
    <section className={`py-3 sm:py-6 lg:py-8 ${isGrayBg ? "bg-none" :"bg-white"}`}>
      <div className="container mx-auto px-2">
        
        {/* Category Header - Simplified */}
        <div className="mb-4 sm:mb-6">
          <div className="flex items-center gap-3 sm:gap-4 mb-3">
            
            {/* Compact Category Image */}
            <div className="flex-shrink-0">
              <div className="relative w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-xl overflow-hidden border border-gray-200">
                <ImageLoader
                  src={category?.imageUrl ?? ""}
                  alt={category?.name ?? ""}
                  fill
                  quality={85}
                  className="object-cover"
                />
                
                {/* Simplified badge */}
                <div className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-medium rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center">
                  {products.length}
                </div>
              </div>
            </div>

            {/* Category Info - Condensed */}
            <div className="flex-1 min-w-0">
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-1 truncate">
                {category?.name}
              </h1>
              
              <p className="text-gray-600 text-sm hidden sm:block mb-2">
                Khám phá bộ sưu tập {category?.name.toLowerCase()} chất lượng cao
              </p>

              {/* Inline Stats - Mobile Optimized */}
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Package className="w-4 h-4 text-blue-600" />
                  <span className="font-medium text-gray-900">{products.length}</span>
                  <span className="text-gray-500 hidden sm:inline">sản phẩm</span>
                </div>

                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="font-medium text-gray-900">5.0</span>
                </div>

                {promotions.length > 0 && (
                  <div className="flex items-center gap-1 text-red-600">
                    <Tag className="w-4 h-4" />
                    <span className="font-medium">{promotions.length}</span>
                    <span className="hidden sm:inline text-gray-500">khuyến mãi</span>
                  </div>
                )}
              </div>
            </div>

            {/* Desktop View All Button - Compact */}
            <div className="hidden lg:block">
              <Link
                href={`/danh-muc/${slug}`}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm">
                Xem tất cả
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Products Section - Minimal Design */}
        <div className="space-y-3 sm:space-y-4">
          
          {/* Section Header - Compact */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">
                Sản phẩm nổi bật
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">
                Những sản phẩm được yêu thích nhất
              </p>
            </div>

            {/* Trending indicator - Simplified */}
            <div className="hidden sm:flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
              <TrendingUp className="w-3 h-3" />
              <span>Hot</span>
            </div>
          </div>

          {/* Product Grid/Slider - Clean Background */}
          {products.length > 0 ? (
            <div className="rounded-xl ">
              <Slider
                items={products}
                renderItem={(product) => <ProductCard product={product}  />}
                onItemClick={(product, index) => {
                  console.log("Product clicked:", product);
                }}
                itemsPerView={
                  windowSize.width < 640 ? 2 : 
                  windowSize.width < 768 ? 3 :
                  windowSize.width < 1024 ? 3 : 4
                }
                gap={4}
                showArrows={windowSize.width >= 768}
                showDots={true}
                autoPlay={true}
                autoPlayInterval={5000}
                className="w-full"
              />
            </div>
          ) : (
            <div className="border border-gray-200 rounded-xl p-2 sm:p-8">
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                  <Package className="w-6 h-6 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-900 mb-1">
                    Chưa có sản phẩm
                  </h3>
                  <p className="text-gray-500 text-sm max-w-md mx-auto">
                    Danh mục này hiện chưa có sản phẩm nào. Vui lòng quay lại sau.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Actions - Simplified */}
        <div className="mt-4 sm:mt-6 space-y-3">
          
          {/* Mobile View All Button - Full Width */}
          <div className="lg:hidden">
            <Link
              href={`/danh-muc/${slug}`}
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-colors w-full">
              Xem tất cả sản phẩm
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Additional Products Info - Subtle */}
          {products.length > 4 && (
            <div className="hidden lg:block text-center">
              <div className="inline-flex items-center gap-2 text-gray-600 text-sm">
                <span>Và còn {products.length - 4} sản phẩm khác</span>
                <Link
                  href={`/danh-muc/${slug}`}
                  className="text-blue-600 hover:text-blue-700 font-medium transition-colors flex items-center gap-1">
                  Khám phá
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          )}

          {/* Promotions Banner - Minimal */}
          {promotions.length > 0 && (
            <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 text-red-800 rounded-lg p-3 sm:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-sm sm:text-base mb-1">🔥 Khuyến mãi đặc biệt</h3>
                  <p className="text-red-600 text-xs sm:text-sm">
                    {promotions.length} chương trình đang diễn ra
                  </p>
                </div>
                <div className="flex items-center gap-1 bg-red-100 rounded-md px-2 py-1">
                  <Star className="w-3 h-3 text-red-600 fill-current" />
                  <span className="font-medium text-xs text-red-700">Hot</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
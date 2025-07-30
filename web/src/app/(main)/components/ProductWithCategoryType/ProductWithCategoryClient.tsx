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
  isGrayBg?: boolean;
}

export const ProductWithCategoryClient = ({
  category,
  products,
  promotions,
  slug,
  industry,
  isGrayBg,
}: ClientProps) => {
  const windowSize = useWindowSize();

  return (
    <section className={`py-3 sm:py-6 lg:py-8 ${isGrayBg ? "bg-stone-50" : "bg-white"}`}>
      <div className="container mx-auto px-2">
        {/* Category Header - Refactored for Light Scheme & no increased spacing */}
        <div className="mb-4 sm:mb-6">
          <div className="flex items-center gap-3 sm:gap-4 mb-3">
            {/* Compact Category Image - Refactored colors */}
            <div className="flex-shrink-0">
              <div className="relative w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-xl overflow-hidden border border-stone-200 shadow-sm">
                <ImageLoader
                  src={category?.imageUrl ?? ""}
                  alt={category?.name ?? ""}
                  fill
                  quality={85}
                  className="object-cover"
                />
                {/* Product Count Badge - Highlighted with amber */}
                <div className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs font-medium rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center">
                  {products.length}
                </div>
              </div>
            </div>

            {/* Category Info - Refactored Typography & Colors */}
            <div className="flex-1 min-w-0">
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-stone-800 mb-1 truncate">
                {category?.name}
              </h1>

              <p className="text-stone-600 text-sm hidden sm:block mb-2">
                Khám phá bộ sưu tập{" "}
                <span className="font-semibold text-amber-600">
                  {category?.name?.toLowerCase()}
                </span>{" "}
                chất lượng cao cho ngành {industry}.
              </p>

              {/* Inline Stats - Refactored Colors */}
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Package className="w-4 h-4 text-stone-500" />
                  <span className="font-medium text-stone-800">
                    {products.length}
                  </span>
                  <span className="text-stone-600 hidden sm:inline">sản phẩm</span>
                </div>

                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="font-medium text-stone-800">5.0</span>
                </div>

                {promotions.length > 0 && (
                  <div className="flex items-center gap-1 text-red-600">
                    <Tag className="w-4 h-4" />
                    <span className="font-medium">{promotions.length}</span>
                    <span className="hidden sm:inline text-stone-600">khuyến mãi</span>
                  </div>
                )}
              </div>
            </div>

            {/* Desktop View All Button - Refactored Style */}
            <div className="hidden lg:block">
              <Link
                href={`/danh-muc/${slug}`}
                className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm">
                Xem tất cả
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Products Section - Minimal Design with new colors */}
        <div className="space-y-3 sm:space-y-4">
          {/* Section Header - Refactored Typography & Highlight */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base sm:text-lg lg:text-xl font-bold text-stone-800">
                Sản phẩm <span className="text-amber-600">Nổi Bật</span>
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 hidden sm:block">
                Những sản phẩm được yêu thích nhất
              </p>
            </div>

            {/* Trending indicator - Highlighted with yellow */}
            <div className="hidden sm:flex items-center gap-1 bg-yellow-50 text-yellow-700 px-2 py-1 rounded-full text-xs font-medium border border-yellow-200">
              <TrendingUp className="w-3 h-3" />
              <span>Hot</span>
            </div>
          </div>

          {/* Product Grid/Slider - Clean Background */}
          {products.length > 0 ? (
            <div className="rounded-xl">
              <Slider
                items={products}
                renderItem={(product) => <ProductCard product={product} />}
                onItemClick={(product, index) => {
                  console.log("Product clicked:", product.name);
                }}
                itemsPerView={
                  windowSize.width < 640
                    ? 2
                    : windowSize.width < 768
                      ? 3
                      : windowSize.width < 1024
                        ? 3
                        : 4
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
            <div className="border border-stone-200 rounded-xl p-2 sm:p-8">
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center mx-auto">
                  <Package className="w-6 h-6 text-stone-400" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-stone-800 mb-1">
                    Chưa có sản phẩm
                  </h3>
                  <p className="text-stone-500 text-sm max-w-md mx-auto">
                    Danh mục này hiện chưa có sản phẩm nào. Vui lòng quay lại
                    sau.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Actions - Refactored Styles */}
        <div className="mt-4 sm:mt-6 space-y-3">
          {/* Mobile View All Button - Full Width */}
          <div className="lg:hidden">
            <Link
              href={`/danh-muc/${slug}`}
              className="flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-3 rounded-lg font-medium transition-colors w-full">
              Xem tất cả sản phẩm
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Additional Products Info - Subtle */}
          {products.length > 4 && (
            <div className="hidden lg:block text-center">
              <div className="inline-flex items-center gap-2 text-stone-600 text-sm">
                <span>
                  Và còn{" "}
                  <span className="font-bold text-amber-600">
                    {products.length - 4}
                  </span>{" "}
                  sản phẩm khác
                </span>
                <Link
                  href={`/danh-muc/${slug}`}
                  className="text-amber-600 hover:text-amber-700 font-medium transition-colors flex items-center gap-1">
                  Khám phá
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          )}

          {/* Promotions Banner - Refactored with Warm Colors */}
          {promotions.length > 0 && (
            <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 text-stone-800 rounded-lg p-3 sm:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-sm sm:text-base mb-1">
                    🔥 Khuyến mãi đặc biệt
                  </h3>
                  <p className="text-amber-700 text-xs sm:text-sm">
                    {promotions.length} chương trình đang diễn ra
                  </p>
                </div>
                <div className="flex items-center gap-1 bg-yellow-100 rounded-md px-2 py-1 border border-yellow-300">
                  <Star className="w-3 h-3 text-yellow-600 fill-current" />
                  <span className="font-medium text-xs text-yellow-800">Hot</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
"use client";

import { ImageLoader } from "@/components/ui/image-loader";
import { CategoryInterface } from "@/types/category";
import { ProductInterface } from "@/types/product";
import { PromotionInterface } from "@/types/promotion";
import Link from "next/link";
import { ArrowRight, Star, TrendingUp, Package, Tag, Sparkles } from "lucide-react";

import { ProductCard } from "@/components/ui/product/product-card";
import { useWindowSize } from "@/hooks/useWindowSize";
import { ProductListMotionWrapper } from "@/components/ui/product/ProductListMotionWrapper";

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
    <section className={`py-8 lg:py-12 ${isGrayBg ? "bg-gray-50" : "bg-white"}`}>
      <div className="container mx-auto  ">
        {/* Category Banner Header */}
        <div className="mb-8 lg:mb-12">
          {/* Category Banner */}
          <div className="relative h-40 sm:h-50 lg:h-100 rounded-2xl overflow-hidden mb-6 shadow-lg">
            <ImageLoader
              src={category?.imageUrl ?? ""}
              alt={category?.name ?? ""}
              fill
              quality={90}
              className="object-cover"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
            
            {/* Category Info Overlay */}
            <div className="absolute z-30 bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8">
              <div className="flex items-end justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-semibold">
                      Hơn 100 sản phẩm
                    </span>
                    {promotions.length > 0 && (
                      <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        2 ưu đãi
                      </span>
                    )}
                  </div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
                    {category?.name}
                  </h1>
                  <p className="text-dark text-sm sm:text-base max-w-2xl italic">
                    Khám phá bộ sưu tập {category?.name?.toLowerCase()} chất lượng cao cho ngành {industry}
                  </p>
                </div>
                
                {/* Desktop CTA */}
                <div className="hidden lg:block ml-6">
                  <Link
                    href={`/danh-muc/${slug}`}
                    className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Xem tất cả
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 shadow-sm">
            <div className="grid grid-cols-3 gap-4 sm:gap-8">
              <div className="text-center">
                <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg mb-2 mx-auto">
                  <Package className="w-5 h-5 text-gray-600" />
                </div>
                <div className="text-xl sm:text-2xl font-bold text-gray-900">
                  {products.length}
                </div>
                <div className="text-xs sm:text-sm text-gray-600 font-medium">
                  Sản phẩm (Nổi bật)
                </div>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center w-10 h-10 bg-yellow-100 rounded-lg mb-2 mx-auto">
                  <Star className="w-5 h-5 text-yellow-600 fill-current" />
                </div>
                <div className="text-xl sm:text-2xl font-bold text-gray-900">
                  5.0
                </div>
                <div className="text-xs sm:text-sm text-gray-600 font-medium">
                  Đánh giá
                </div>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center w-10 h-10 bg-red-100 rounded-lg mb-2 mx-auto">
                  <Tag className="w-5 h-5 text-red-600" />
                </div>
                <div className="text-xl sm:text-2xl font-bold text-gray-900">
                 2
                </div>
                <div className="text-xs sm:text-sm text-gray-600 font-medium">
                 Ưu đãi
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="space-y-6">
          {/* Section Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 bg-yellow-500 rounded-full"></div>
              <div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                Danh mục {category.name}
                </h2>
                <p className="text-gray-600 text-sm sm:text-base">
                 Các sản phẩm thuộc danh mục {category.name}
                </p>
              </div>
            </div>

            {/* Trending Badge */}
            <div className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-4 py-2 rounded-full text-sm font-semibold shadow-md">
              <TrendingUp className="w-4 h-4" />
              <span>{category.name}</span>
            </div>
          </div>

          {/* Products Grid would go here */}
          <div className="bg-gray-50rounded-xl p-1 text-center">
                         <div className="relative z-10">
            <ProductListMotionWrapper products={products} />
          </div>
         
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="mt-8 space-y-4">
          {/* Mobile CTA */}
          <div className="lg:hidden">
            <Link
              href={`/danh-muc/${slug}`}
              className="flex items-center justify-center gap-3 w-full mx-auto bg-gray-900 hover:bg-black text-white px-6 py-2 rounded-xl font-semibold transition-all duration-200 shadow-lg"
            >
              Xem tất cả sản phẩm
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Additional Products Info */}
          <div className="hidden lg:block text-center">
              <div className="inline-flex items-center gap-2 text-gray-600">
                <span className="text-sm">
                  Và còn các
               
                  sản phẩm khác
                </span>
                <Link
                  href={`/danh-muc/${slug}`}
                  className="text-yellow-600 hover:text-yellow-700 font-semibold transition-colors flex items-center gap-1 ml-2"
                >
                  Khám phá ngay
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          {/* Promotions Banner */}
          {promotions.length > 0 && (
            <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 border border-yellow-200 rounded-xl p-4 sm:p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-base sm:text-lg">
                      Ưu đãi đặc biệt
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base">
                      {promotions.length} chương trình khuyến mãi đang diễn ra
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 bg-yellow-500 text-black px-4 py-2 rounded-lg font-semibold text-sm">
                  <span>HOT</span>
                  <Star className="w-4 h-4 fill-current" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
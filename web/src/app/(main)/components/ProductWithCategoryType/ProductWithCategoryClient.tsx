"use client";

import { ImageLoader } from "@/components/ui/image-loader";
import { CategoryInterface } from "@/types/category";
import { ProductInterface } from "@/types/product";
import { PromotionInterface } from "@/types/promotion";
import Link from "next/link";
import { ArrowRight, Star, TrendingUp, Package, Tag, Sparkles, Award, Users } from "lucide-react";
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
    <section 
      className="py-8 lg:py-16"
      style={{
        backgroundColor: isGrayBg ? 'var(--color-bg-secondary)' : 'var(--color-bg)',
      }}
    >
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* Hero Category Section - Completely New Design */}
        <div 
          className="relative mb-12 rounded-3xl overflow-hidden"
          style={{
            background: 'var(--gradient-secondary)',
            border: '1px solid var(--color-border-light)',
          }}
        >
          {/* Background Pattern */}
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23${encodeURIComponent('C8A165').substring(1)}' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
          
          <div className="relative p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              
              {/* Left Content */}
              <div className="space-y-6">
                {/* Category Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
                  style={{
                    backgroundColor: 'var(--color-accent-green-light)',
                    border: '1px solid var(--color-accent-green)',
                  }}
                >
                  <Award className="w-4 h-4" style={{ color: 'var(--color-accent-green)' }} />
                  <span 
                    className="text-sm font-semibold"
                    style={{ color: 'var(--color-accent-green)' }}
                  >
                    DANH MUC PREMIUM
                  </span>
                </div>

                {/* Main Title */}
                <div>
                  <h1 
                    className="text-3xl lg:text-5xl font-bold leading-tight mb-4"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    {category?.name}
                  </h1>
                  <p 
                    className="text-lg leading-relaxed max-w-lg"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    Khám phá bộ sưu tập nội thất{" "}
                    <span 
                      className="font-bold"
                      style={{ color: 'var(--color-primary)' }}
                    >
                      {category?.name?.toLowerCase()}
                    </span>{" "}
                    cao cấp, thiết kế hiện đại cho không gian sống hoàn hảo.
                  </p>
                </div>

                {/* Statistics Row */}
                <div className="flex items-center gap-8">
                  <div className="text-center">
                    <div 
                      className="text-2xl font-bold"
                      style={{ color: 'var(--color-primary)' }}
                    >
                      {products.length}+
                    </div>
                    <div 
                      className="text-sm font-medium"
                      style={{ color: 'var(--color-text-muted)' }}
                    >
                      Sản phẩm
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div 
                      className="text-2xl font-bold"
                      style={{ color: 'var(--color-primary)' }}
                    >
                      5.0★
                    </div>
                    <div 
                      className="text-sm font-medium"
                      style={{ color: 'var(--color-text-muted)' }}
                    >
                      Đánh giá
                    </div>
                  </div>

                  <div className="text-center">
                    <div 
                      className="text-2xl font-bold"
                      style={{ color: 'var(--color-primary)' }}
                    >
                      12K+
                    </div>
                    <div 
                      className="text-sm font-medium"
                      style={{ color: 'var(--color-text-muted)' }}
                    >
                      Khách hàng
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="pt-4">
                  <Link
                    href={`/danh-muc/${slug}`}
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold transition-all duration-300 text-lg group"
                    style={{
                      background: 'var(--gradient-primary)',
                      color: 'var(--color-text-white)',
                      boxShadow: 'var(--shadow-default)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = 'var(--shadow-hover)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'var(--shadow-default)';
                    }}
                  >
                    Khám phá bộ sưu tập
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </div>

              {/* Right Content - Category Showcase */}
              <div className="relative">
                <div 
                  className="relative rounded-2xl overflow-hidden aspect-[4/3]"
                  style={{
                    border: '1px solid var(--color-border)',
                    boxShadow: 'var(--shadow-default)',
                  }}
                >
                  <ImageLoader
                    src={category?.imageUrl ?? ""}
                    alt={category?.name ?? ""}
                    fill
                    quality={90}
                    className="object-cover"
                  />
                  
                  {/* Overlay with gradient */}
                  <div 
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(135deg, rgba(200, 161, 101, 0.1) 0%, rgba(58, 47, 40, 0.05) 100%)'
                    }}
                  />
                  
                  {/* Quality Badge */}
                  <div 
                    className="absolute top-4 right-4 px-3 py-2 rounded-lg backdrop-blur-sm"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      border: '1px solid var(--color-border-light)',
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <Sparkles 
                        className="w-4 h-4" 
                        style={{ color: 'var(--color-primary)' }}
                      />
                      <span 
                        className="text-sm font-bold"
                        style={{ color: 'var(--color-text-primary)' }}
                      >
                        PREMIUM
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Products Section */}
        <div className="space-y-8">
          
          {/* Section Header with Professional Styling */}
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
              style={{
                backgroundColor: 'var(--color-primary-light)',
                border: '1px solid var(--color-primary)',
              }}
            >
              <TrendingUp 
                className="w-4 h-4" 
                style={{ color: 'var(--color-primary)' }}
              />
              <span 
                className="text-sm font-semibold"
                style={{ color: 'var(--color-primary)' }}
              >
                SẢN PHẨM NỔI BẬT
              </span>
            </div>
            
            <h2 
              className="text-2xl lg:text-4xl font-bold mb-4"
              style={{ color: 'var(--color-text-primary)' }}
            >
              Bộ Sưu Tập{" "}
              <span style={{ color: 'var(--color-primary)' }}>
                Đặc Biệt
              </span>
            </h2>
            
            <p 
              className="text-lg leading-relaxed"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Những sản phẩm nội thất được tuyển chọn kỹ lưỡng, 
              kết hợp hoàn hảo giữa thẩm mỹ và công năng.
            </p>
          </div>

          {/* Enhanced Stats Bar */}
          <div 
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-6 rounded-2xl"
            style={{
              backgroundColor: 'var(--color-bg)',
              border: '1px solid var(--color-border-light)',
              boxShadow: 'var(--shadow-default)',
            }}
          >
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl mx-auto"
                style={{ backgroundColor: 'var(--color-primary-light)' }}
              >
                <Package 
                  className="w-6 h-6" 
                  style={{ color: 'var(--color-primary)' }}
                />
              </div>
              <div>
                <div 
                  className="text-xl font-bold"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  {products.length}
                </div>
                <div 
                  className="text-sm font-medium"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  Sản phẩm
                </div>
              </div>
            </div>

            <div className="text-center space-y-2">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl mx-auto"
                style={{ backgroundColor: 'var(--color-accent-green-light)' }}
              >
                <Star 
                  className="w-6 h-6 fill-current" 
                  style={{ color: 'var(--color-accent-green)' }}
                />
              </div>
              <div>
                <div 
                  className="text-xl font-bold"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  5.0
                </div>
                <div 
                  className="text-sm font-medium"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  Đánh giá
                </div>
              </div>
            </div>

            <div className="text-center space-y-2">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl mx-auto"
                style={{ backgroundColor: 'var(--color-accent-red-light)' }}
              >
                <Users 
                  className="w-6 h-6" 
                  style={{ color: 'var(--color-accent-red)' }}
                />
              </div>
              <div>
                <div 
                  className="text-xl font-bold"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  15K+
                </div>
                <div 
                  className="text-sm font-medium"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  Khách hàng
                </div>
              </div>
            </div>

            <div className="text-center space-y-2">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl mx-auto"
                style={{ backgroundColor: 'var(--color-primary-light)' }}
              >
                <Tag 
                  className="w-6 h-6" 
                  style={{ color: 'var(--color-primary)' }}
                />
              </div>
              <div>
                <div 
                  className="text-xl font-bold"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  {promotions.length}
                </div>
                <div 
                  className="text-sm font-medium"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  Khuyến mãi
                </div>
              </div>
            </div>
          </div>

          {/* Products Showcase */}
          {products.length > 0 ? (
            <div className="space-y-6">
              
              {/* Products Grid/Slider */}
              <div 
                className="p-6 lg:p-8 rounded-2xl"
                style={{
                  backgroundColor: 'var(--color-bg)',
                  border: '1px solid var(--color-border-light)',
                  boxShadow: 'var(--shadow-default)',
                }}
              >
                <Slider
                  items={products}
                  renderItem={(product) => <ProductCard product={product} />}
                  onItemClick={(product, index) => {
                    console.log("Product clicked:", product.name);
                  }}
                  itemsPerView={
                    windowSize.width < 640
                      ? 1
                      : windowSize.width < 768
                        ? 2
                        : windowSize.width < 1024
                          ? 3
                          : 4
                  }
                  gap={6}
                  showArrows={windowSize.width >= 768}
                  showDots={true}
                  autoPlay={true}
                  autoPlayInterval={6000}
                  className="w-full"
                />
              </div>

              {/* Special Promotions Section */}
              {promotions.length > 0 && (
                <div 
                  className="relative p-8 rounded-2xl overflow-hidden"
                  style={{
                    background: 'var(--gradient-accent)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  {/* Decorative Elements */}
                  <div 
                    className="absolute top-4 right-4 w-20 h-20 rounded-full opacity-10"
                    style={{ backgroundColor: 'var(--color-primary)' }}
                  />
                  <div 
                    className="absolute bottom-4 left-4 w-16 h-16 rounded-full opacity-10"
                    style={{ backgroundColor: 'var(--color-accent-green)' }}
                  />
                  
                  <div className="relative grid lg:grid-cols-2 gap-6 items-center">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div 
                          className="p-3 rounded-xl"
                          style={{ backgroundColor: 'var(--color-accent-red-light)' }}
                        >
                          <Sparkles 
                            className="w-6 h-6" 
                            style={{ color: 'var(--color-accent-red)' }}
                          />
                        </div>
                        <div>
                          <h3 
                            className="text-xl font-bold"
                            style={{ color: 'var(--color-text-primary)' }}
                          >
                            Ưu Đãi Đặc Biệt
                          </h3>
                          <p 
                            className="text-sm"
                            style={{ color: 'var(--color-text-secondary)' }}
                          >
                            {promotions.length} chương trình khuyến mãi hấp dẫn
                          </p>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: 'var(--color-accent-green)' }}
                          />
                          <span 
                            className="text-sm"
                            style={{ color: 'var(--color-text-secondary)' }}
                          >
                            Miễn phí giao hàng toàn quốc
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: 'var(--color-accent-green)' }}
                          />
                          <span 
                            className="text-sm"
                            style={{ color: 'var(--color-text-secondary)' }}
                          >
                            Bảo hành chính hãng 24 tháng
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: 'var(--color-accent-green)' }}
                          />
                          <span 
                            className="text-sm"
                            style={{ color: 'var(--color-text-secondary)' }}
                          >
                            Tư vấn thiết kế miễn phí
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-center lg:text-right">
                      <Link
                        href={`/danh-muc/${slug}?promotions=true`}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 group"
                        style={{
                          backgroundColor: 'var(--color-bg)',
                          color: 'var(--color-text-primary)',
                          border: '1px solid var(--color-border)',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'var(--color-primary)';
                          e.currentTarget.style.color = 'var(--color-text-white)';
                          e.currentTarget.style.borderColor = 'var(--color-primary)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'var(--color-bg)';
                          e.currentTarget.style.color = 'var(--color-text-primary)';
                          e.currentTarget.style.borderColor = 'var(--color-border)';
                        }}
                      >
                        Xem khuyến mãi
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}

            </div>
          ) : (
            /* Empty State - Professional Design */
            <div 
              className="text-center py-16 px-8 rounded-2xl"
              style={{
                backgroundColor: 'var(--color-bg)',
                border: '1px solid var(--color-border-light)',
              }}
            >
              <div className="max-w-md mx-auto space-y-6">
                <div 
                  className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto"
                  style={{ backgroundColor: 'var(--color-bg-accent)' }}
                >
                  <Package 
                    className="w-10 h-10" 
                    style={{ color: 'var(--color-text-muted)' }}
                  />
                </div>
                
                <div>
                  <h3 
                    className="text-xl font-bold mb-2"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    Đang Cập Nhật Sản Phẩm
                  </h3>
                  <p 
                    className="text-lg leading-relaxed"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    Chúng tôi đang bổ sung những sản phẩm nội thất tuyệt vời cho danh mục này. 
                    Vui lòng quay lại sau để khám phá bộ sưu tập hoàn chỉnh.
                  </p>
                </div>
                
                <Link
                  href="/lien-he"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300"
                  style={{
                    backgroundColor: 'var(--color-primary)',
                    color: 'var(--color-text-white)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-primary-hover)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-primary)';
                  }}
                >
                  Liên hệ tư vấn
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )}

          {/* Additional Information Panel */}
          {products.length > 4 && (
            <div 
              className="text-center p-6 rounded-xl"
              style={{
                backgroundColor: 'var(--color-bg-secondary)',
                border: '1px solid var(--color-border-light)',
              }}
            >
              <p 
                className="text-lg mb-4"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                Còn{" "}
                <span 
                  className="font-bold text-xl"
                  style={{ color: 'var(--color-primary)' }}
                >
                  {products.length - 4}+
                </span>{" "}
                sản phẩm tuyệt vời khác đang chờ bạn khám phá
              </p>
              
              <Link
                href={`/danh-muc/${slug}`}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold transition-all duration-300 text-lg group"
                style={{
                  backgroundColor: 'var(--color-primary)',
                  color: 'var(--color-text-white)',
                  boxShadow: 'var(--shadow-default)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-hover)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-default)';
                }}
              >
                Xem toàn bộ bộ sưu tập
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
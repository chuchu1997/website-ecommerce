/** @format */

import { ProductInterface } from "@/types/product";
import { FormatUtils } from "@/utils/format";
import { Badge } from "@/components/ui/badge";
import {
  BadgePercent,
  Star,
  Info,
  Truck,
  ShieldCheck,
  ChevronRight,
  ShoppingCart,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ProductImageGallery } from "./productImageGallery";
import { ProductWidgets } from "@/components/ui/product/product";
import EditorClientWrapper from "@/components/editor/editor-wrapper";
import { discountTypeEnum } from "@/types/promotion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAddToCart } from "@/hooks/use-addToCart";
import SoldInfo from "@/components/ui/soldInfo";
import ProductSuggess from "./productSuggest";

interface propsProductMobile {
  product: ProductInterface;
}

export default function ProductMobile({ product }: propsProductMobile) {
  const cart = useAddToCart();

  const promotion = product.promotionProducts[0];

  const discountPercentage = (() => {
    if (promotion) {
      const basePrice = product.price;
      const promotionPrice =
        promotion.discountType === discountTypeEnum.PERCENT
          ? basePrice * (1 - promotion.discount / 100)
          : basePrice - promotion.discount;

      return Math.round(((basePrice - promotionPrice) / basePrice) * 100);
    }

    if (product.originalPrice && product.originalPrice > product.price) {
      return Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      );
    }

    return 0;
  })();

  const showLineThroughPrice = promotion
    ? product.price
    : product.originalPrice &&
      product.originalPrice > 0 &&
      product.originalPrice > product.price
    ? product.originalPrice
    : null;

  const getDiscountedPrice = () => {
    const promotionProductFlashSale = product.promotionProducts[0];
    if (!promotionProductFlashSale) return product.price;

    if (promotionProductFlashSale.discountType === discountTypeEnum.PERCENT) {
      return product.price * (1 - promotionProductFlashSale.discount / 100);
    }

    return product.price - promotionProductFlashSale.discount;
  };

  const StickyBottomActions = () => {
    if (product.price === 0) return null;

    return (
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 sm:p-4 z-50 shadow-lg">
        <div className="flex gap-2 sm:gap-3 max-w-md mx-auto">
          <button
            className="flex-1 bg-gray-900 hover:bg-black text-white py-3 px-4 rounded-lg font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 min-h-[48px] active:scale-95"
            onClick={async () => {
              await cart.addToCart({
                product,
                isCheckout: false,
              });
            }}>
            <ShoppingCart className="w-4 h-4" />
            <span className="whitespace-nowrap">Thêm vào giỏ</span>
          </button>

          <button
            className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 text-sm min-h-[48px] active:scale-95"
            onClick={async () => {
              await cart.addToCart({
                product,
                isCheckout: true,
              });
            }}>
            <span className="whitespace-nowrap">Mua Ngay</span>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mobile-product-version block md:hidden max-w-md mx-auto bg-white shadow-sm">
        <ProductImageGallery images={product.images} />

        {/* Product Info Container */}
        <div className="px-3 sm:px-4 pb-20">
          {/* Price Section - Redesigned for better mobile experience */}
          <div className="py-4 bg-white">
            <div className="space-y-3">
              {/* Main Price Display */}
              <div className="flex items-start gap-3">
                <div className="flex-1">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="text-lg sm:text-3xl font-bold text-red-500 leading-none">
                      {getDiscountedPrice() === 0
                        ? "Liên hệ"
                        : FormatUtils.formatPriceVND(getDiscountedPrice())}
                    </span>

                    {/* Discount Badge */}
                    {discountPercentage > 0 && (
                      <div className="inline-flex items-center gap-1 bg-red-100 text-red-600 rounded-full px-2 py-1">
                        <BadgePercent size={14} />
                        <span className="text-xs font-semibold">
                          -{discountPercentage}%
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Original Price */}
                  {showLineThroughPrice && showLineThroughPrice > 0 && (
                    <div className="mt-1">
                      <span className="text-base sm:text-lg text-gray-500 line-through">
                        {FormatUtils.formatPriceVND(showLineThroughPrice)}
                      </span>
                    </div>
                  )}
                </div>
                <Badge className="scale-80 border-none py-1 px-2 bg-gradient-to-r from-green-600 to-green-500 text-white text-xs font-medium flex-shrink-0 rounded-md">
                  HÀNG VIỆT
                </Badge>
              </div>
            </div>
          </div>

          {/* Product Title & Badge */}
          <div className="mb-4 ">
            <h1 className="text-sm sm:text-xl font-semibold text-gray-800 leading-relaxed line-clamp-2 mb-3">
              {product.name}
            </h1>
          </div>

          {/* Rating & Sales Info */}
          <div className="flex items-center gap-3 mb-4 text-sm">
            <SoldInfo sold={product.saleCount ?? 10000} />
          </div>

          <Separator className="my-4" />

          {/* Shipping Info */}
          <div className="py-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-50 rounded-lg flex-shrink-0">
                <Truck size={20} className="text-blue-600" />
              </div>

              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded-md text-xs font-semibold">
                    Miễn phí vận chuyển
                  </span>
                </div>

                <p className="text-sm font-medium text-gray-800">
                  Đảm bảo giao vào 14 tháng 6
                </p>

                <div className="space-y-1 text-sm text-gray-600">
                  <p className="flex items-center gap-2">
                    <span>Nhận voucher ít nhất 15K đ nếu đơn giao trễ</span>
                    <Info size={14} className="text-gray-400 flex-shrink-0" />
                  </p>
                  <p>
                    Phí vận chuyển:
                    <span className="line-through ml-1 text-gray-500">
                      69.000đ
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-4" />

          {/* Policy */}
          <div className="flex items-center py-4 gap-3">
            <div className="p-2 bg-green-50 rounded-lg flex-shrink-0">
              <ShieldCheck size={20} className="text-green-600" />
            </div>
            <p className="text-gray-800 text-sm font-medium flex-1">
              Thanh toán khi giao - Trả hàng miễn phí trong 15 ngày
            </p>
          </div>

          <Separator className="my-4" />

          {/* Gift Products */}
          {product.giftProducts && product.giftProducts.length > 0 && (
            <>
              <div className="py-4">
                <h3 className="font-semibold text-green-700 mb-3 text-sm flex items-center gap-2">
                  🎁 <span>Quà tặng kèm theo</span>
                </h3>
                <div className="space-y-2">
                  {product.giftProducts.map((giftContainer: any) => {
                    const gift: ProductInterface = giftContainer.gift;
                    return (
                      <div key={gift.id} className="bg-green-50 p-3 rounded-lg">
                        <ProductWidgets.giftItem gift={gift} />
                      </div>
                    );
                  })}
                </div>
              </div>
              <Separator className="my-4" />
            </>
          )}

          {/* Reviews Section */}
          <div className="py-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-sm text-gray-800">
                Đánh giá của khách hàng ({product.fakeComments.length})
              </h3>
              <div className="flex items-center gap-1 text-gray-500 text-sm">
                <span>Xem thêm</span>
                <ChevronRight size={16} />
              </div>
            </div>

            {/* Rating Summary */}
            <div className="flex items-center gap-3 mb-4 p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-gray-900">5</span>
                <span className="text-sm text-gray-500">/5</span>
              </div>
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-yellow-400 fill-current"
                  />
                ))}
              </div>
            </div>

            {/* Sample Reviews */}
            <div className="space-y-3">
              {product.fakeComments.map((fakeComment) => (
                <div
                  className="bg-gray-50 p-3 rounded-lg border border-gray-100"
                  key={fakeComment.id}>
                  <div className="flex items-center gap-3 mb-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={fakeComment.avatarUrl} />
                      <AvatarFallback className="text-xs">
                        {fakeComment.authorName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-gray-800 truncate">
                          {fakeComment.authorName}
                        </span>
                        <div className="flex">
                          {Array.from({ length: fakeComment.ratingCount }).map(
                            (_, i) => (
                              <Star
                                key={i}
                                className="w-3 h-3 text-yellow-400 fill-current"
                              />
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {fakeComment.content}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <Separator className="my-4" />

          {/* Product Description */}
          <div className="py-4">
            <h3 className="font-semibold text-sm mb-3 text-gray-800">
              Giới thiệu về sản phẩm này
            </h3>
            <div className="prose prose-sm max-w-none text-gray-700 ">
              <EditorClientWrapper jsonString={product.description} />
            </div>
          </div>

          <Separator className="my-4" />

          {/* Suggested Products */}
          <div className="py-4">
            <ProductSuggess product={product} />
          </div>
        </div>

        <StickyBottomActions />
      </div>
    </div>
  );
}

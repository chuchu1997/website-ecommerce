/** @format */

import FlashSaleComponent from "@/components/ui/Flashsale/flashsale";
import { RenderGiftItems } from "@/components/ui/product/product-card";
import { cn } from "@/lib/utils";
import { CartItemType } from "@/types/cart";
import { ProductInterface } from "@/types/product";
import { discountTypeEnum } from "@/types/promotion";
import { FormatUtils } from "@/utils/format";
import { Separator } from "@radix-ui/react-separator";
import { Minus, Plus, Trash2 } from "lucide-react";

export function CartItem({
  product,
  quantity,
  isShowDelete = true,
  hiddenUpdateQuantity = false,
  onUpdateQuantity,
  onDeleteCartItem,
  className,
}: {
  product: ProductInterface;
  quantity: number;
  isShowDelete?: boolean;
  hiddenUpdateQuantity?: boolean;
  className?: string;
  onDeleteCartItem: (id: number) => void;
  onUpdateQuantity: (id: number, newQuantity: number, stock: number) => void;
}) {
  const getDiscountedPrice = (item: ProductInterface) => {
    const promotion = item.promotionProducts?.[0];
    if (!promotion) return item.price;

    if (promotion.discountType === discountTypeEnum.PERCENT) {
      return item.price * (1 - promotion.discount / 100);
    }

    return item.price - promotion.discount;
  };

  const hasPromotion = product.promotionProducts?.length > 0;
  const hasGifts = product.giftProducts && product.giftProducts.length > 0;
  const discountedPrice = getDiscountedPrice(product);
  const originalPrice = product.price;

  return (
    <div
      className={cn(
        "bg-white rounded-xl p-4 hover:shadow-md transition-all duration-200",
        className
      )}>
      <div className="flex gap-4">
        {/* Product Image */}
        <div className="flex-shrink-0">
          <div className="relative">
            <img
              src={product.images[0].url}
              alt={product.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg object-cover border border-gray-100"
            />
            {hasPromotion && (
              <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                Sale
              </div>
            )}
          </div>
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          {/* Product Name */}
          <h3 className="font-semibold text-gray-900 text-sm sm:text-base line-clamp-2 mb-2 leading-tight">
            {product.name}
          </h3>

          {/* Price Section */}
          <div className="mb-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-lg sm:text-xl font-bold text-red-600">
                {FormatUtils.formatPriceVND(discountedPrice * quantity)}
              </span>

              {hasPromotion && (
                <>
                  <span className="text-xs sm:text-sm text-gray-400 line-through">
                    {FormatUtils.formatPriceVND(originalPrice * quantity)}
                  </span>
                  <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-sm">
                    Flash Sale
                  </span>
                </>
              )}
            </div>

            {/* Unit Price (Mobile) */}
            <div className="text-xs text-gray-500 mt-1">
              {FormatUtils.formatPriceVND(discountedPrice)} / sản phẩm
            </div>
          </div>

          {/* Quantity and Actions Row */}
          <div className="flex items-center justify-between">
            {/* Quantity Controls */}
            <div className="flex items-center">
              {!hiddenUpdateQuantity ? (
                <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50">
                  <button
                    onClick={() =>
                      onUpdateQuantity(product.id, quantity - 1, product.stock)
                    }
                    disabled={quantity === 1}
                    className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed rounded-l-lg transition-colors">
                    <Minus size={14} />
                  </button>

                  <div className="w-12 sm:w-14 h-8 sm:h-9 flex items-center justify-center bg-white border-x border-gray-200 text-sm font-semibold">
                    {quantity}
                  </div>

                  <button
                    onClick={() => {
                      onUpdateQuantity(product.id, quantity + 1, product.stock);
                    }}
                    disabled={quantity >= product.stock}
                    className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed rounded-r-lg transition-colors">
                    <Plus size={14} />
                  </button>
                </div>
              ) : (
                <div className="bg-gray-100 px-3 py-2 rounded-lg">
                  <span className="text-sm font-semibold text-gray-700">
                    Số lượng: {quantity}
                  </span>
                </div>
              )}
            </div>

            {/* Delete Button */}
            {isShowDelete && (
              <button
                onClick={() => {
                  onDeleteCartItem(product.id);
                }}
                className="flex items-center gap-1 px-3 py-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200 text-sm font-medium">
                <Trash2 size={16} />
                <span className="hidden sm:inline">Xóa</span>
              </button>
            )}
          </div>

          {/* Stock Warning */}
          {quantity >= product.stock && (
            <div className="mt-2 text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded">
              Đã đạt số lượng tối đa trong kho
            </div>
          )}
        </div>
      </div>

      {/* Gift Items Section */}
      {hasGifts && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm font-semibold text-green-700">
              🎁 Quà tặng kèm
            </span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {product.giftProducts &&
              product.giftProducts.map((item) => {
                const gift = item.gift;
                return (
                  <div
                    key={item.id}
                    className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg p-2">
                    <RenderGiftItems
                      gift={gift}
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded border"
                    />
                    <span className="text-xs text-green-700 font-medium">
                      {gift.name}
                    </span>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}

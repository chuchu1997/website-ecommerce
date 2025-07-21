/** @format */

"use client";

import { cn } from "@/lib/utils";
import { ProductInterface } from "@/types/product";
import { ImageLoader } from "../image-loader";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../card";
import { Badge } from "../badge";
import { Star, Gift, Truck, ShoppingBasket, Heart } from "lucide-react";
import { FormatUtils } from "@/utils/format";
import { BadgeFreeship } from "../Badge/freeship";
import { DiscountComponent } from "../Discount/discount";
import { BadgeFlashSale } from "../Badge/flashsale";
import { discountTypeEnum, PromotionInterface } from "@/types/promotion";
import { useCookies } from "react-cookie";
import { UserCartAPI } from "@/api/cart/cart.api";
import { CartItemSSR } from "@/app/(main)/gio-hang/components/cart";
import { useCartContext } from "@/context/cart-context";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FreeshipBadVer2 } from "../Badge/freeship-ver2";
import { useAddToCart } from "@/hooks/use-addToCart";
import { useEffect, useState } from "react";

export const RenderGiftItems = ({
  gift,
  className,
}: {
  gift: ProductInterface;
  className?: string;
}) => {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        window.location.href = `/san-pham/${gift.slug}`;
      }}
      className={cn(
        "relative group cursor-pointer overflow-hidden rounded-lg bg-white border border-gray-200 hover:border-gray-300 transition-all duration-200",
        className
      )}>
      <div className="relative w-full h-full">
        <ImageLoader
          alt={gift.name}
          src={gift.images[0].url}
          fill
          className="object-cover transition-transform duration-200 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      </div>

      {/* Gift indicator */}
      <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center shadow-sm">
        <Gift className="w-3 h-3 text-white" />
      </div>
    </div>
  );
};

interface ProductCardProps {
  product: ProductInterface;
  promotion?: PromotionInterface;
  isSingleColumn?: boolean;
}

export const ProductCard = ({
  product,
  promotion,
  isSingleColumn = false,
}: ProductCardProps) => {
  const [isMounted, setIsMounted] = useState(false);

  const { addToCart } = useAddToCart();

  const promotionProduct = product.promotionProducts;
  const showLineThroughPrice = promotion
    ? product.price
    : product.originalPrice && product.originalPrice > product.price
    ? product.originalPrice
    : null;

  const getDiscountedPrice = () => {
    const promotionProductFlashSale = promotionProduct[0];
    if (!promotionProductFlashSale) return product.price;

    if (promotionProductFlashSale.discountType === discountTypeEnum.PERCENT) {
      return product.price * (1 - promotionProductFlashSale.discount / 100);
    }

    return product.price - promotionProductFlashSale.discount;
  };

  const hasPromotion = promotionProduct.length > 0 && promotion;
  const hasGifts = product.giftProducts && product.giftProducts.length > 0;
  const discountedPrice = getDiscountedPrice();

  const handleAddToCart = async (e: React.MouseEvent, isCheckout: boolean) => {
    e.preventDefault();
    e.stopPropagation();
    await addToCart({
      product,
      isCheckout,
    });
  };
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;

  // Single Column Layout (Mobile-like horizontal layout)
  if (isSingleColumn) {
    return (
      <Link href={`/san-pham/${product.slug}`} className="block group">
        <div className="flex bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-md hover:border-gray-300">
          {/* Product Image Container */}
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 bg-gray-50 flex-shrink-0">
            <ImageLoader
              src={product.images[0].url}
              alt={product.name}
              fill
              className="object-cover"
            />

            {/* Promotional badges */}
            {hasPromotion && (
              <div className="absolute top-2 left-2">
                <Badge className="bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-md shadow-sm">
                  SALE
                </Badge>
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="flex-1 p-4 flex flex-col justify-between min-w-0">
            {/* Top Section */}
            <div className="space-y-2">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-1">
                <Badge className="bg-emerald-100 text-emerald-700 text-xs px-2 py-1 rounded-full border-0">
                  HÀNG VIỆT
                </Badge>
                <Badge className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full border-0">
                  <Truck className="w-3 h-3 mr-1" />
                  Freeship
                </Badge>
              </div>

              {/* Title */}
              <h3 className="font-semibold text-sm text-gray-900 leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
                {product.name}
              </h3>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3 h-3 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <span className="text-gray-500 text-xs">5.0 (19.3k)</span>
              </div>

              {/* Gift indicator */}
              {hasGifts && (
                <div className="flex items-center gap-1 text-xs text-emerald-600">
                  <Gift className="w-3 h-3" />
                  <span>Có quà tặng</span>
                </div>
              )}
            </div>

            {/* Bottom Section */}
            <div className="flex items-center justify-between gap-2 mt-3">
              <div className="flex flex-col">
                <span className="text-lg font-bold text-red-600">
                  {FormatUtils.formatPriceVND(discountedPrice)}
                </span>
                {showLineThroughPrice && (
                  <span className="text-sm text-gray-400 line-through">
                    {FormatUtils.formatPriceVND(showLineThroughPrice)}
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={(e: any) => {
                    handleAddToCart(e, false);
                  }}
                  className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200">
                  <ShoppingBasket className="w-4 h-4 text-gray-600" />
                </button>
                <button
                  onClick={(e) => {
                    handleAddToCart(e, true);
                  }}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors duration-200">
                  Mua
                </button>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // Grid Layout (Card design)
  return (
    <Link href={`/san-pham/${product.slug}`} className="block h-full">
      <Card className="group relative h-full overflow-hidden bg-white border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 flex flex-col">
        {/* Image Section */}
        <CardHeader className="p-0 m-0 relative">
          <div className="relative aspect-square bg-gray-50 overflow-hidden">
            <ImageLoader
              src={product.images[0].url}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />

            {/* Promotional badges */}
            {hasPromotion && (
              <div className="absolute top-2 left-2 md:top-3 md:left-3 z-10">
                <BadgeFlashSale
                  promotion={promotion}
                  className="shadow-md text-xs md:text-sm"
                />
              </div>
            )}

            {/* Wishlist button */}
            <button className="absolute top-2 right-2 md:top-3 md:right-3 z-10 p-1.5 md:p-2 bg-white/90 hover:bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-200">
              <Heart className="w-3 h-3 md:w-4 md:h-4 text-gray-600 hover:text-red-500" />
            </button>
          </div>
        </CardHeader>

        {/* Content Section */}
        <CardContent className="p-3 md:p-4 flex-1 flex flex-col space-y-2 md:space-y-3">
          {/* Product Title */}

          <CardTitle className=" text-sm md:text-base font-semibold text-gray-900 leading-snug line-clamp-2 break-words">
            {product.name}
          </CardTitle>

          <CardDescription className="hidden md:block text-xs lg:text-sm text-gray-600 leading-snug line-clamp-2 break-words">
            {product.shortDescription}
          </CardDescription>

          {/* Rating and Badges */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-3 h-3 md:w-4 md:h-4 text-yellow-400 fill-current"
                />
              ))}
              <span className="text-xs md:text-sm text-gray-500 ml-1">
                (5.0)
              </span>
            </div>

            {/* Responsive Free Ship Badge */}
            <div className="flex items-center">
              <FreeshipBadVer2 />
            </div>
          </div>

          {/* Price Section */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-lg md:text-xl font-bold text-red-600">
                {FormatUtils.formatPriceVND(discountedPrice)}
              </span>
              {showLineThroughPrice && (
                <span className="text-xs md:text-sm text-gray-400 line-through">
                  {FormatUtils.formatPriceVND(showLineThroughPrice)}
                </span>
              )}
            </div>
          </div>

          {/* Gift Products Section */}
          {hasGifts && (
            <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg p-2 md:p-3 border border-emerald-200">
              <div className="flex items-center gap-2 mb-2">
                <Gift className="w-3 h-3 md:w-4 md:h-4 text-emerald-600" />
                <span className="text-xs md:text-sm font-medium text-emerald-800">
                  Quà tặng kèm
                </span>
              </div>

              <div className="grid grid-cols-3 gap-1.5 md:gap-2">
                {product.giftProducts &&
                  product.giftProducts.slice(0, 3).map((giftContainer) => {
                    const gift = giftContainer.gift;
                    return (
                      <RenderGiftItems
                        key={gift.id}
                        gift={gift}
                        className="aspect-square"
                      />
                    );
                  })}

                {product.giftProducts && product.giftProducts.length > 3 && (
                  <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
                    <span className="text-[10px] md:text-xs font-medium text-gray-600">
                      +{product.giftProducts.length - 3}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 mt-auto pt-2">
            <button
              onClick={(e) => {
                handleAddToCart(e, true);
              }}
              className="cursor-pointer flex-1 bg-red-600 hover:bg-red-700 text-white text-xs md:text-sm font-medium py-2 md:py-2.5 rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md">
              Mua ngay
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleAddToCart(e, false);
              }}
              className="px-3 md:px-4 cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200">
              <ShoppingBasket className="w-3 h-3 md:w-4 md:h-4" />
            </button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

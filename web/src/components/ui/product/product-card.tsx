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
import { FreeshipBadVer2 } from "../Badge/freeship-ver2";
import { BadgeFlashSale } from "../Badge/flashsale";
import { discountTypeEnum, PromotionInterface } from "@/types/promotion";
import { useRouter } from "next/navigation";
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
        "relative group cursor-pointer overflow-hidden rounded-lg bg-white border border-stone-200 hover:border-amber-300 transition-all duration-200 hover:shadow-sm",
        className
      )}>
      <div className="relative w-full h-full">
        <ImageLoader
          alt={gift.name}
          src={gift.images[0].url}
          fill
          className="object-cover transition-transform duration-200 group-hover:scale-[1.02]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      </div>

      {/* Premium gift indicator */}
      <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full flex items-center justify-center shadow-sm border border-white">
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
  const router = useRouter();
  const { addToCart } = useAddToCart();

  const promotionProduct = product.promotionProducts;
  const hasPromotion = promotionProduct.length > 0 && promotion;
  const hasGifts = product.giftProducts && product.giftProducts.length > 0;

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

  const discountedPrice = getDiscountedPrice();
  const isOutOfStock = product.stock <= 0;

  const handleAddToCart = async (e: React.MouseEvent, isCheckout: boolean) => {
    e.preventDefault();
    e.stopPropagation();
    await addToCart({
      product,
      isCheckout,
    });
  };

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    router.push("/lien-he");
  };

  const renderStars = (size: "sm" | "md" = "md") => {
    const starSize = size === "sm" ? "w-3 h-3" : "w-3 h-3 md:w-4 md:h-4";
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`${starSize} text-yellow-500 fill-current`}
          />
        ))}
      </div>
    );
  };

  const renderPrice = () => {
    const priceText =
      discountedPrice === 0
        ? "Liên hệ"
        : FormatUtils.formatPriceVND(discountedPrice);
    const priceClass = isSingleColumn
      ? "text-lg font-bold text-amber-600"
      : "text-lg md:text-xl font-bold text-amber-600";

    return (
      <div className={isSingleColumn ? "flex flex-col" : "space-y-1"}>
        <div
          className={isSingleColumn ? "" : "flex items-center justify-between"}>
          <span className={priceClass}>{priceText}</span>
          {!isSingleColumn && isOutOfStock && (
            <Badge className="bg-stone-500 text-white border-0 font-medium">
              Hết hàng
            </Badge>
          )}
        </div>
        {showLineThroughPrice && (
          <span
            className={
              isSingleColumn
                ? "text-sm text-stone-400 line-through font-medium"
                : "text-xs md:text-sm text-stone-400 line-through font-medium"
            }>
            {FormatUtils.formatPriceVND(showLineThroughPrice)}
          </span>
        )}
      </div>
    );
  };

  const renderActionButtons = () => {
    if (product.price === 0) {
      return (
        <button
          onClick={handleContactClick}
          className={cn(
            "cursor-pointer bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition-colors duration-200",
            isSingleColumn
              ? "w-full flex-1 text-xs md:text-sm py-2.5 md:py-3"
              : "w-full text-xs md:text-sm py-2.5 md:py-3"
          )}>
          Liên hệ ngay
        </button>
      );
    }

    if (isSingleColumn) {
      return (
        <div className="flex items-center gap-3">
          <button
            disabled={isOutOfStock}
            onClick={(e) => handleAddToCart(e, false)}
            className="p-3 bg-stone-50 hover:bg-stone-100 rounded-lg transition-colors duration-200 disabled:opacity-50 border border-stone-200">
            <ShoppingBasket className="w-4 h-4 text-stone-600" />
          </button>
          <button
            disabled={isOutOfStock}
            onClick={(e) => handleAddToCart(e, true)}
            className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium rounded-lg transition-colors duration-200 disabled:opacity-50">
            Mua ngay
          </button>
        </div>
      );
    }

    return (
      <div className="flex gap-3 mt-auto pt-3">
        <button
          disabled={isOutOfStock}
          onClick={(e) => handleAddToCart(e, true)}
          className="cursor-pointer flex-1 bg-amber-500 hover:bg-amber-600 text-white text-xs md:text-sm font-medium py-2.5 md:py-3 rounded-lg transition-colors duration-200 disabled:opacity-50">
          Mua ngay
        </button>
        <button
          disabled={isOutOfStock}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleAddToCart(e, false);
          }}
          className="px-3 md:px-4 cursor-pointer bg-stone-50 hover:bg-stone-100 text-stone-600 rounded-lg transition-colors duration-200 disabled:opacity-50 border border-stone-200">
          <ShoppingBasket className="w-3 h-3 md:w-4 md:h-4" />
        </button>
      </div>
    );
  };

  const renderGiftSection = () => {
    if (!hasGifts) return null;

    if (isSingleColumn) {
      return (
        <div className="flex items-center gap-2 text-xs bg-amber-50 px-3 py-1.5 rounded-full border border-amber-200">
          <Gift className="w-3 h-3 text-amber-600" />
          <span className="font-medium text-amber-700">Có quà tặng</span>
        </div>
      );
    }

    return (
      <div className="bg-amber-50 rounded-lg p-3 md:p-4 border border-amber-200">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-1.5 bg-amber-500 rounded-lg">
            <Gift className="w-3 h-3 md:w-4 md:h-4 text-white" />
          </div>
          <span className="text-xs md:text-sm font-medium text-amber-800">
            Quà tặng kèm
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 md:gap-3">
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
            <div className="aspect-square bg-stone-100 rounded-lg flex items-center justify-center border border-stone-200">
              <span className="text-[10px] md:text-xs font-medium text-stone-600">
                +{product.giftProducts.length - 3}
              </span>
            </div>
          )}
        </div>
      </div>
    );
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  // Single Column Layout (Mobile-like horizontal layout)
  if (isSingleColumn) {
    return (
      <Link href={`/san-pham/${product.slug}`} className="block group">
        <div className="flex bg-white rounded-xl border border-stone-200 overflow-hidden transition-all duration-200 hover:shadow-sm hover:border-amber-300">
          {/* Product Image Container */}
          <div className="relative w-28 h-28 sm:w-36 sm:h-36 bg-stone-50 flex-shrink-0">
            <ImageLoader
              src={product.images[0].url}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-200 group-hover:scale-[1.02]"
            />

            {/* Enhanced overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

            {/* Promotional badges */}
            {hasPromotion && (
              <div className="absolute top-2 left-2">
                <Badge className="bg-amber-500 text-white text-xs font-medium px-3 py-1 rounded-full border-0">
                  SALE
                </Badge>
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between min-w-0">
            {/* Top Section */}
            <div className="space-y-3">
              {/* Enhanced Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="bg-amber-50 text-amber-800 text-xs px-3 py-1 rounded-full border border-amber-200 font-medium">
                  HÀNG VIỆT
                </Badge>
                <Badge className="bg-stone-100 text-stone-700 text-xs px-3 py-1 rounded-full border border-stone-300 font-medium">
                  <Truck className="w-3 h-3 mr-1" />
                  Freeship
                </Badge>
              </div>

              {/* Title */}
              <h3 className="font-bold text-sm sm:text-base text-stone-800 leading-tight line-clamp-2 group-hover:text-amber-700 transition-colors duration-200">
                {product.name}
              </h3>

              {/* Rating */}
              <div className="flex items-center gap-3">
                {renderStars("sm")}
                <span className="text-stone-500 text-xs font-medium">
                  (5.0) • 19.3k đánh giá
                </span>
              </div>

              {/* Gift indicator */}
              {renderGiftSection()}
            </div>

            {/* Bottom Section */}
            <div className="flex items-center justify-between gap-3 mt-4">
              {renderPrice()}
              {renderActionButtons()}
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // Grid Layout (Card design)
  return (
    <Link href={`/san-pham/${product.slug}`} className="block h-full" prefetch>
      <Card className="group relative h-full overflow-hidden bg-white border border-stone-200 transition-all duration-200 hover:shadow-sm hover:border-amber-300 flex flex-col rounded-xl">
        {/* Image Section */}
        <CardHeader className="p-0 m-0 relative">
          <div className="relative aspect-square bg-stone-50 overflow-hidden rounded-t-xl">
            <ImageLoader
              src={product.images[0].url}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-200 group-hover:scale-[1.02]"
            />

            {/* Subtle Overlay Enhancement */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

            {/* Promotional badges */}
            {hasPromotion && (
              <div className="absolute top-3 left-3 z-10">
                <BadgeFlashSale
                  promotion={promotion}
                  className="text-xs md:text-sm bg-amber-500 border-0 font-medium"
                />
              </div>
            )}

            {/* Enhanced Wishlist button */}
            <button className="absolute top-3 right-3 z-10 p-2 bg-white/90 hover:bg-white rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 border border-stone-200">
              <Heart className="w-4 h-4 text-stone-600 hover:text-red-500 transition-colors duration-200" />
            </button>

            {/* Quick View Button - appears on hover */}
            <div className="absolute  inset-x-3 bottom-3 z-30 opacity-0 group-hover:opacity-100 transition-all duration-200">
              <button className="cursor-pointer w-full py-2.5 bg-white/95 hover:bg-white rounded-lg text-sm font-medium text-stone-800 hover:text-amber-600 transition-colors duration-200 border border-stone-200">
                Xem nhanh
              </button>
            </div>
          </div>
        </CardHeader>

        {/* Content Section */}
        <CardContent className="p-4 md:p-5 flex-1 flex flex-col space-y-3">
          {/* Product Title */}
          <CardTitle className="text-sm md:text-base font-bold text-stone-800 leading-snug line-clamp-2 break-words group-hover:text-stone-900 transition-colors duration-200">
            {product.name}
          </CardTitle>

          <CardDescription className="hidden md:block text-xs lg:text-sm text-stone-600 leading-relaxed line-clamp-2 break-words font-medium">
            {product.shortDescription}
          </CardDescription>

          {/* Rating and Badges */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              {renderStars("md")}
              <span className="text-xs md:text-sm text-stone-500 ml-1 font-medium">
                (5.0)
              </span>
            </div>

            {/* Enhanced Free Ship Badge */}
            <div className="flex items-center">
              <div className="rounded-full text-xs font-medium">
                <FreeshipBadVer2 />
              </div>
            </div>
          </div>

          {/* Price Section */}
          <div>{renderPrice()}</div>

          {/* Gift Products Section */}
          <div>{renderGiftSection()}</div>

          {/* Action Buttons */}
          <div className="mt-auto pt-2">{renderActionButtons()}</div>
        </CardContent>
      </Card>
    </Link>
  );
};

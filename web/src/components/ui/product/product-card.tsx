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
import { Star, Gift, Truck, ShoppingCart, Heart, Package } from "lucide-react";
import { FormatUtils } from "@/utils/format";
import { FreeshipBadVer2 } from "../Badge/freeship-ver2";
import { BadgeFlashSale } from "../Badge/flashsale";
import { discountTypeEnum, PromotionInterface } from "@/types/promotion";
import { useRouter } from "next/navigation";
import { useAddToCart } from "@/hooks/use-addToCart";
import { useEffect, useState } from "react";
import { useWindowSize } from "@/hooks/useWindowSize";

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
        "relative group cursor-pointer overflow-hidden rounded-lg bg-white border border-gray-200 hover:border-yellow-600 transition-all duration-200 hover:shadow-md",
        className
      )}>
      <div className="relative w-full h-full">
        <ImageLoader
          alt={gift.name}
          src={gift.images[0].url}
          fill
          className="object-cover transition-transform duration-200 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-200" />
      </div>

      {/* Gift indicator */}
      <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-600 rounded-full flex items-center justify-center shadow-md">
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

  const windowSize = useWindowSize();

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

  const renderStars = () => {
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-3 h-3 text-yellow-500 fill-current" />
        ))}
      </div>
    );
  };

  const renderPrice = () => {
    const priceText =
      discountedPrice === 0
        ? "Liên hệ"
        : FormatUtils.formatPriceVND(discountedPrice);

    return (
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-lg lg:text-xl font-bold text-gray-900">
            {priceText}
          </span>
          {isSingleColumn && isOutOfStock && (
            <Badge className="bg-gray-100 text-gray-700 text-xs font-medium border-gray-200">
              Hết hàng
            </Badge>
          )}
        </div>
        {showLineThroughPrice && (
          <span className="text-sm text-gray-500 line-through">
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
          className="cursor-pointer w-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md text-sm">
          Liên hệ báo giá
        </button>
      );
    }

    if (isSingleColumn) {
      return (
        <div className="flex items-center gap-2">
          <button
            disabled={isOutOfStock}
            onClick={(e) => handleAddToCart(e, false)}
            className="cursor-pointer p-2.5 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-200">
            <ShoppingCart className="w-4 h-4 text-gray-700" />
          </button>
          <button
            disabled={isOutOfStock}
            onClick={(e) => handleAddToCart(e, true)}
            className="cursor-pointer flex-1 bg-yellow-600 hover:bg-yellow-700 text-white text-sm font-semibold py-2.5 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
            Mua ngay
          </button>
        </div>
      );
    }

    return (
      <div className="flex gap-2 ">
        <button
          disabled={isOutOfStock}
          onClick={(e) => handleAddToCart(e, true)}
          className=" cursor-pointer flex-1 bg-yellow-600 hover:bg-yellow-700 text-white text-sm font-semibold py-2.5 px-4 rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed">
          Mua ngay
        </button>
        <button
          disabled={isOutOfStock}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleAddToCart(e, false);
          }}
          className="cursor-pointer p-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200 border border-gray-200 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed">
          <ShoppingCart className="w-4 h-4" />
        </button>
      </div>
    );
  };

  const renderGiftSection = () => {
    if (!hasGifts) return null;

    if (isSingleColumn) {
      return (
        <div className="flex items-center gap-2 bg-yellow-50 text-yellow-800 px-3 py-1.5 rounded-full text-xs font-medium border border-yellow-200">
          <Gift className="w-3 h-3" />
          <span>Có quà tặng</span>
        </div>
      );
    }

    return (
      <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-200">
        <div className="flex items-center gap-2 mb-2">
          <Gift className="w-4 h-4 text-yellow-700" />
          <span className="text-sm font-semibold text-yellow-800">
            Quà tặng kèm
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2">
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
            <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200 hover:border-yellow-600 transition-colors duration-200">
              <span className="text-xs font-semibold text-gray-600">
                +{product.giftProducts.length - 3}
              </span>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderBadges = () => {
    return (
      <div className="flex flex-wrap items-center gap-1 sm:gap-1.5">
        <Badge className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 sm:py-1 rounded-full border border-yellow-200 font-medium scale-90 sm:scale-100">
          CHÍNH HÃNG
        </Badge>
        {/* Keep old FreeshipBadVer2 component with scaling */}
        <div className="scale-90 sm:scale-100">
          <FreeshipBadVer2 />
        </div>
        {isOutOfStock && !isSingleColumn && (
          <Badge className="bg-gray-100 text-gray-700 text-xs px-2 py-0.5 sm:py-1 rounded-full border border-gray-200 font-medium flex items-center gap-1 scale-90 sm:scale-100">
            <Package className="w-3 h-3" />
            Hết hàng
          </Badge>
        )}
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
        <div className="flex bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-md hover:border-gray-300">
          {/* Product Image Container */}
          <div className="relative w-32 h-32 sm:w-36 sm:h-36 bg-gray-50 flex-shrink-0">
            <ImageLoader
              src={product.images[0].url}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />

            {/* Promotional badges */}
            {hasPromotion && (
              <div className="absolute top-2 left-2">
                <Badge className="bg-yellow-600 text-white text-xs font-semibold px-2 py-1 rounded-md shadow-sm">
                  SALE
                </Badge>
              </div>
            )}

            {/* Out of stock overlay */}
            {isOutOfStock && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="text-white text-xs font-semibold bg-gray-900 px-2 py-1 rounded">
                  Hết hàng
                </span>
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="flex-1 p-4 flex flex-col justify-between min-w-0">
            {/* Top Section */}
            <div className="space-y-2">
              {/* Badges */}
              <div className="mb-2">
                <div className="flex items-center gap-1">
                  <Badge className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full border border-yellow-200 font-medium scale-90">
                    CHÍNH HÃNG
                  </Badge>
                  <div className="scale-90">
                    <FreeshipBadVer2 />
                  </div>
                </div>
              </div>

              {/* Title */}
              <h3 className="font-semibold text-sm lg:text-base text-gray-900 leading-tight line-clamp-2 group-hover:text-yellow-700 transition-colors duration-200">
                {product.name}
              </h3>

              {/* Rating */}
              <div className="flex items-center gap-2">
                {renderStars()}
                <span className="text-gray-500 text-xs font-medium">
                  5.0 (1.2k)
                </span>
              </div>

              {/* Gift indicator */}
              {renderGiftSection()}
            </div>

            {/* Bottom Section */}
            <div className="space-y-3 mt-3">
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
    <Link
      href={`/san-pham/${product.slug}`}
      className="block h-full"
      prefetch={true}>
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
              <div className="absolute top-3 left-3 z-10">
                <Badge className="bg-yellow-600 text-white text-xs font-semibold px-2 py-1 rounded-md shadow-md">
                  SALE
                </Badge>
              </div>
            )}

            {/* Wishlist button */}
            <button className="absolute top-3 right-3 z-10 p-2 bg-white/90 hover:bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-105">
              <Heart className="w-4 h-4 text-gray-600 hover:text-yellow-600" />
            </button>

            {/* Out of stock overlay */}
            {isOutOfStock && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-20">
                <span className="text-white text-sm font-semibold bg-gray-900 px-3 py-1.5 rounded-lg">
                  Hết hàng
                </span>
              </div>
            )}
          </div>
        </CardHeader>

        {/* Content Section */}
        <CardContent className="p-4 flex-1 flex flex-col">
          {/* Product Title */}
          <CardTitle className="text-sm lg:text-base font-semibold text-gray-900 leading-snug line-clamp-2 break-words group-hover:text-yellow-700 transition-colors duration-200 mb-2">
            {product.name}
          </CardTitle>

          <CardDescription className="hidden lg:block text-sm text-gray-600 leading-snug line-clamp-2 break-words mb-3">
            {product.shortDescription}
          </CardDescription>

          {/* Badges */}
          <div className="mb-3">{renderBadges()}</div>

          {/* Rating and Price Section */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1">
              {renderStars()}
              <span className="text-sm text-gray-500 ml-1 font-medium">
                5.0
              </span>
            </div>
            <span className="text-xs text-gray-500 font-medium">
              (1.2k đánh giá)
            </span>
          </div>

          {/* Price Section */}
          <div className="mb-3">{renderPrice()}</div>

          {/* Gift Products Section */}
          {hasGifts && <div className="mb-3">{renderGiftSection()}</div>}

          {/* Action Buttons */}
          <div className="mt-auto">{renderActionButtons()}</div>
        </CardContent>
      </Card>
    </Link>
  );
};

/** @format */
"use client";
import { ProductInterface, ProductQuickView } from "@/types/product";
import { FormatUtils } from "@/utils/format";
import Image from "next/image";
import { ImageLoader } from "../image-loader";
import { Badge } from "../badge";
import {
  Eye,
  Gift,
  Heart,
  Palette,
  Play,
  ShoppingBasket,
  ShoppingCart,
  Star,
} from "lucide-react";
import FlashSaleComponent from "../Flashsale/flashsale";
import { Separator } from "../separator";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useRouter } from "next/router";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../card";
import { Button } from "../button";
import { DiscountComponent } from "../Discount/discount";
import { BadgeFreeship } from "../Badge/freeship";
import { BadgeFlashSale } from "../Badge/flashsale";
import { ProductCard, RenderGiftItems } from "./product-card";

export const ProductWidgets = {
  cardSkeleton: () => {
    return (
      <div className="group relative bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden animate-pulse">
        <div className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 relative overflow-hidden"></div>
        <div className="p-6 space-y-4">
          <div className="h-6 bg-gray-200 rounded-full w-24"></div>
          <div className="h-5 bg-gray-200 rounded w-3/4"></div>
          <div className="space-y-2">
            <div className="h-3 bg-gray-200 rounded w-full"></div>
            <div className="h-3 bg-gray-200 rounded w-2/3"></div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-4 h-4 bg-gray-200 rounded"></div>
              ))}
            </div>
            <div className="h-3 bg-gray-200 rounded w-16"></div>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-6 bg-gray-200 rounded w-20"></div>
            <div className="h-4 bg-gray-200 rounded w-16"></div>
          </div>
          <div className="bg-gray-100 rounded-2xl p-4">
            <div className="h-4 bg-gray-200 rounded w-32 mb-3"></div>
            <div className="grid grid-cols-2 gap-3">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 bg-gray-200 rounded-lg p-2">
                  <div className="w-8 h-8 bg-gray-300 rounded-md"></div>
                  <div className="h-3 bg-gray-300 rounded flex-1"></div>
                </div>
              ))}
            </div>
          </div>
          <div className="h-12 bg-gray-200 rounded-xl w-full"></div>
        </div>
      </div>
    );
  },

  giftItem: ({
    gift,
    className,
  }: {
    gift: ProductInterface;
    className?: string;
  }) => {
    return (
      <div
        onClick={(e) => {
          e.stopPropagation(); // Ngăn click lan ra ngoài
          window.location.href = `/san-pham/${gift.slug}`;
        }}
        className={cn(
          "cursor-pointer flex items-center gap-2 rounded-lg p-2 transition-transform duration-200 hover:scale-[1.03] hover:bg-gray-100",
          className
        )}>
        <ImageLoader
          width={0}
          height={0}
          alt={gift.name}
          src={gift.images[0].url}
          className="w-8 h-8 object-cover rounded-md flex-shrink-0"
        />
        <span className="text-xs text-gray-700 font-medium truncate">
          {gift.name}
        </span>
      </div>
    );
  },
  productCardQuickView: (product: ProductQuickView) => {
    return (
      <div className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-yellow-100">
        <div className="relative overflow-hidden ">
          <ImageLoader
            src={product.image}
            alt={product.name}
            height={60}
            width={60}
            className="w-full"
          />
          {/* <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
          /> */}
          {product.badge && (
            <div className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-3 py-1 rounded-full text-xs font-bold shadow-lg">
              {product.badge}
            </div>
          )}
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button className="bg-black/80 hover:bg-black text-white p-2 rounded-full shadow-lg">
              <ShoppingCart size={16} />
            </button>
          </div>
        </div>
        <div className="p-2">
          <h3 className="font-bold text-sm md:text-lg text-gray-800 mb-2 group-hover:text-yellow-600 transition-colors duration-300">
            {product.name}
          </h3>
          <div className="flex items-center justify-between ">
            <div className="flex items-center space-x-2">
              <span className=" text-sm md:text-lg font-bold text-price">
                {FormatUtils.formatPriceVND(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xs md:text-base text-gray-500 line-through">
                  {FormatUtils.formatPriceVND(product.originalPrice)}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  },
  productCardMasterPage: ({
    product,
    isShowOptionView,
  }: {
    product: ProductInterface;
    isShowOptionView?: boolean;
  }) => {
    return (
      <div>
        <Link href={`/san-pham/${product.slug}`}>
          <Card
            key={product.id}
            className="relative overflow-hidden bg-gradient-to-br from-yellow-50 via-white to-amber-50 border border-yellow-200/50 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 group flex flex-col">
            {/* Gradient overlay for modern effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 via-transparent to-black/5 pointer-events-none" />

            <CardHeader className="p-0 mt-[-30px] sm:mt-[-20px] md:mt-[-25px] relative mb-0">
              <div className="relative overflow-hidden">
                <div className="relative h-[150px]  md:h-[200px]  lg:h-[250px] xl:h-[300px]">
                  <ImageLoader
                    src={product.images[0].url}
                    alt={product.name}
                    fill
                    className="rounded-md"
                  />
                </div>

                {/* Premium gradient overlay on image */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <Badge className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 md:top-4 md:left-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold px-1.5 py-0.5 sm:px-2 sm:py-1 md:px-3 md:py-1 shadow-md text-xs sm:text-sm">
                  SALE
                </Badge>

                {/* Premium corner accent */}
                <div className="absolute top-0 right-0 w-0 h-0 border-l-[30px] sm:border-l-[40px] md:border-l-[50px] border-l-transparent border-t-[30px] sm:border-t-[40px] md:border-t-[50px] border-t-yellow-400/20" />
              </div>
            </CardHeader>

            <CardContent className="mt-[-20px] p-2 sm:p-1 md:p-2 lg:p-4 relative z-10 flex-1 flex flex-col ">
              <CardTitle className="line-clamp-2 text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-yellow-600 transition-colors duration-300 ">
                {product.name}
              </CardTitle>

              <div className="hidden sm:block">
                <CardDescription className=" line-clamp-2   mb-2 text-xs sm:text-sm text-gray-600 overflow-hidden">
                  {product.shortDescription}
                </CardDescription>
              </div>

              {/* Rating section with better styling */}

              <div className="hidden sm:block">
                <div className="flex items-center gap-1 sm:gap-2 mb-2 sm:mb-3 md:mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4 text-yellow-400 fill-yellow-400"
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 hidden sm:inline">
                    {/* ({product.ratingCount} reviews) */}
                  </span>
                </div>
              </div>

              <div className="">
                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-yellow-600 to-yellow-500 bg-clip-text text-transparent">
                  {FormatUtils.formatPriceVND(product.price)}
                </p>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-500 line-through font-medium">
                  {product.originalPrice &&
                    product.originalPrice > product.price &&
                    FormatUtils.formatPriceVND(product.originalPrice)}
                </p>
              </div>

              {/* Gift products section with improved styling */}
              {product.giftProducts && product.giftProducts.length > 0 && (
                <div className="bg-gradient-to-br from-yellow-50 to-amber-50 border-2 border-yellow-200/50 rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4 mb-2 sm:mb-3 md:mb-4">
                  <div className="flex items-center gap-1 sm:gap-2 mb-2 sm:mb-3">
                    <Badge className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold text-xs px-2 py-0.5 sm:px-3 sm:py-1">
                      Quà tặng
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                    {product.giftProducts.map((giftContainer: any) => {
                      const gift: ProductInterface = giftContainer.gift;
                      return (
                        <div
                          key={gift.id}
                          className="bg-white rounded-md sm:rounded-lg p-1.5 sm:p-2 shadow-sm border border-yellow-100">
                          <ProductWidgets.giftItem
                            gift={gift}
                            className="bg-transparent"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </CardContent>
            {/* 
            <CardFooter className="p-2  pt-0 relative z-10 mt-auto hidden md:block">
              <Button className="w-full bg-gradient-to-r from-amber-900 via-yellow-800 to-amber-900 hover:from-yellow-800 hover:via-amber-900 hover:to-yellow-800 text-amber-100 font-semibold py-2 sm:py-2.5 md:py-3 transition-all duration-300 shadow-lg hover:shadow-xl group-hover:scale-[1.02] text-xs sm:text-sm md:text-base">
                <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Thêm vào giỏ hàng</span>
                <span className="sm:hidden">Thêm</span>
              </Button>
            </CardFooter> */}

            {/* Subtle bottom accent */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400" />
          </Card>
        </Link>
      </div>
    );
  },

  productCardSameTiktok: (product: ProductInterface) => {
    return (
      <div>
        {/* PC DISPLAY */}

        <div className="hidden sm:block">
          <ProductCard product={product} />
        </div>

        {/* MOBILE DISPLAY */}
        <div className=" flex flex-row sm:hidden relative bg-white rounded-md shadow-lg border border-gray-100 overflow-hidden transition-all duration-700 hover:shadow-2xl hover:shadow-gray-900/15 hover:-translate-y-3 hover:border-gray-200">
          {/* Product Image */}
          <div className="relative aspect-square min-w-[160px]  bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
            {/* Main Product Image */}
            <ImageLoader
              src={product.images[0].url}
              alt={product.name}
              fill
              className="rounded-sm"
            />

            <div className="absolute bottom-0 left-0 ">
              <div className="flex  rounded-r-4xl  overflow-hidden ">
                <div className="flex flex-col justify-center p-2 bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-600 text-white scale-60 -translate-x-5 translate-y-3">
                  <span className="text-xs font-bold italic">XTRA</span>
                  <Badge className="">Freeship*</Badge>
                </div>

                <div className="flex flex-col justify-center p-2 bg-gradient-to-r from-green-600 via-green-500 to-green-400 text-white scale-60 -translate-x-7/12 translate-y-3 rounded-r-md">
                  <span className="text-xs font-bold italic">EXTRA</span>
                  <Badge className="bg-[#fb2150] py-0 rounded-sm">
                    lên đến 14%*
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Product Information */}
          <div className="p-6 pt-4 space-y-1 flex flex-col justify-between  w-full">
            <div className="top-info space-y-1">
              <div className="flex items-center">
                <span className="inline-flex transform scale-75 origin-left">
                  <Badge className=" bg-gradient-to-r from-green-600 via-green-500 to-green-400 text-white">
                    HÀNG VIỆT
                  </Badge>
                </span>
                <h3 className="max-w-[150px] ml-[-12px] font-semibold text-sm text-gray-900 leading-tight overflow-hidden text-ellipsis whitespace-nowrap group-hover:text-blue-600 transition-colors duration-300">
                  {product.name}
                </h3>
              </div>
              <span className="inline-flex transform scale-90 origin-left">
                <Badge className=" bg-[#def6f6] text-[#248f8d]">Freeship</Badge>
              </span>
              <div className="rating flex gap-x-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 text-yellow-400 fill-current`}
                    />
                  ))}
                </div>
                <div>
                  <p className="text-gray-400 text-[11px]">
                    5 | Bán 19.3k trực tuyến
                  </p>
                </div>
              </div>
            </div>

            <div className="bottom-info space-y-1">
              {/* Pricing */}
              <div className="space-y-1">
                <div className="flex items-center justify-between ">
                  <div className="flex flex-col gap-1">
                    <span className="text-base font-bold text-[#fb2150] tracking-tight">
                      {FormatUtils.formatPriceVND(product.price)}
                    </span>
                    {product.originalPrice &&
                      product.originalPrice > product.price && (
                        <span className="text-sm text-gray-400 line-through font-semibold">
                          {FormatUtils.formatPriceVND(product.originalPrice)}
                        </span>
                      )}
                  </div>

                  <div className=" rounded-sm overflow-hidden flex ">
                    <button className="px-2 py-1 bg-[#fde6ee]">
                      <Link href={`/danh-muc/san-pham/`}>
                        <ShoppingBasket className="text-[#ec5073]" size={20} />
                      </Link>
                    </button>
                    <Link
                      href={`/san-pham/${product.slug}`}
                      className="px-4 bg-[#fe2b54] text-white text-sm font-bold flex items-center">
                      <span>Mua</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            {product.giftProducts && product.giftProducts.length > 0 && (
              <div className="font-semibold capitalize text-xs">
                🎁 Có Quà tặng{" "}
              </div>
            )}
          </div>

          {/* Hover border effect */}
          <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-gradient-to-r group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all duration-500 pointer-events-none"></div>
        </div>
      </div>
    );
  },
};

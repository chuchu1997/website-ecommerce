/** @format */

"use client";

import { PromotionAPI } from "@/api/promotion/promotion.api";
import { DiscountComponent } from "@/components/ui/Discount/discount";
import { FlashSaleCountDown } from "@/components/ui/Flashsale/flashsale-countdown";
import { ImageLoader } from "@/components/ui/image-loader";
import { ProductCard } from "@/components/ui/product/product-card";
import { SectionHeader } from "@/components/ui/section/section-header";
import {
  discountTypeEnum,
  ProductPromotion,
  PromotionInterface,
  PromotionTypeEnum,
} from "@/types/promotion";
import { FormatUtils } from "@/utils/format";
import { useEffect, useState } from "react";

export const FlashSaleComponentView = () => {
  const [flashSale, setFlashSale] = useState<PromotionInterface>();
  const [promotionProducts, setPromotionProducts] = useState<
    ProductPromotion[]
  >([]);

  // Fetch flash sale
  const fetchFlashSale = async () => {
    const res = await PromotionAPI.getAllPromotionsFromStore({
      limit: 1,
      promotionType: PromotionTypeEnum.FLASHSALE,
    });
    if (res.status === 200 && res.data.length > 0) {
      const promotion = res.data[0] as PromotionInterface;

      setFlashSale(promotion);
      setPromotionProducts(promotion.promotionProducts);
    }
  };

  useEffect(() => {
    fetchFlashSale();
  }, []);

  // Định dạng thời gian countdown

  if (!flashSale || !flashSale.isActive) return null;
  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <SectionHeader
          showViewAll={false}
          title={
            <div className="flex items-center gap-x-2">
              <div className="relative h-[25px] w-[100px] sm:w-[130px]">
                <ImageLoader
                  src={"/images/flashsale/flashsale.png"}
                  alt={"flash-sale"}
                  fill
                  quality={100}
                  priority
                  className="object-contain"
                />
              </div>
              <FlashSaleCountDown
                promotion={flashSale}
                className="scale-80 sm:scale-100 text-lg px-2 rounded-sm bg-gray-900 text-white font-mono font-bold tracking-wider"
              />
            </div>
          }
        />

        <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2">
          {promotionProducts.map((productPromotion) => (
            <ProductCard
              key={productPromotion.productId}
              product={productPromotion.product}
              promotion={flashSale}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

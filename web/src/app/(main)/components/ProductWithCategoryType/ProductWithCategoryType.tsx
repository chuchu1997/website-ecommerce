/** @format */

import { CategoryAPI } from "@/api/categories/category.api";
import { CategoryInterface } from "@/types/category";
import { ProductInterface } from "@/types/product";
import { ProductPromotion, PromotionInterface } from "@/types/promotion";
import { ProductWithCategoryClient } from "./ProductWithCategoryClient";

interface Props {
  industry: string;
  slug: string;
  isGrayBg?: boolean;
}

// Server-side data fetching component
export const ProductWithCategoryType = async ({
  industry,
  slug,
  isGrayBg = false,
}: Props) => {
  let products: ProductInterface[] = [];
  let promotions: PromotionInterface[] = [];
  let category: CategoryInterface | undefined;

  try {
    category = (await CategoryAPI.getCategoryWithSlug(slug, 1, 12)).data;
    if (category && category.products && category.products.length > 0) {
      products = category.products;

      const allProductPromotions: ProductPromotion[] =
        category.products.flatMap((product) => product.promotionProducts);

      const uniquePromotionsMap = new Map<number, PromotionInterface>();

      for (const promo of allProductPromotions) {
        if (promo.promotion && !uniquePromotionsMap.has(promo.promotionId)) {
          uniquePromotionsMap.set(promo.promotionId, promo.promotion);
        }
      }
      promotions = Array.from(uniquePromotionsMap.values());
    }
  } catch (error) {
    console.error("Failed to fetch featured products:", error);
  }

  if (!category) return null;

  // Pass data to client component
  return (
    <ProductWithCategoryClient
      category={category}
      products={products}
      promotions={promotions}
      slug={slug}
      industry={industry}
      isGrayBg={isGrayBg}
    />
  );
};

/** @format */
import { CategoryAPI } from "@/api/categories/category.api";
import { CategoryInterface } from "@/types/category";
import { ProductInterface } from "@/types/product";
import { ProductPromotion, PromotionInterface } from "@/types/promotion";
import { ProductWithCategoryClient } from "./ProductWithCategoryClient";
import { fetchSafe } from "@/utils/fetchSafe";

interface Props {
  industry: string;
  slug: string;
  isGrayBg?: boolean;
}

export const ProductWithCategoryType = async ({
  industry,
  slug,
  isGrayBg = false,
}: Props) => {
  const data = await fetchSafe(
    () => CategoryAPI.getCategoryWithSlug(slug, 1, 12),
    { data: { category: null } } // fallback rõ ràng
  );

  const category = data.category as CategoryInterface;
  console.log("CATEGORY IN PRODUCT TYPE", category);
  if (!category || !category.products) return null;

  const products = category.products;
  const allProductPromotions: ProductPromotion[] = products.flatMap(
    (product) => product.promotionProducts
  );

  // gom promotion duy nhất
  const uniquePromotionsMap = new Map<number, PromotionInterface>();
  for (const promo of allProductPromotions) {
    if (promo.promotion && !uniquePromotionsMap.has(promo.promotionId)) {
      uniquePromotionsMap.set(promo.promotionId, promo.promotion);
    }
  }
  const promotions = Array.from(uniquePromotionsMap.values());

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

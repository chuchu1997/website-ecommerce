/** @format */
import { CategoryAPI } from "@/api/categories/category.api";
import { CategoryInterface } from "@/types/category";
import { ProductPromotion, PromotionInterface } from "@/types/promotion";
import { ProductWithCategoryClient } from "./ProductWithCategoryClient";
import { fetchSafe } from "@/utils/fetchSafe";

interface Props {
  industry: string;
  slug: string;
  isGrayBg?: boolean;
}

// Hàm lấy category với fallback rõ ràng
const getCacheCategoryWithSlug = async (
  slug: string
): Promise<CategoryInterface | null> => {
  const res = await fetchSafe(
    () => CategoryAPI.getCategoryWithSlug(slug, 1, 12),
    {
      category: null,
    }
  );
  return res.category ?? null;
};

export const ProductWithCategoryType = async ({
  industry,
  slug,
  isGrayBg = false,
}: Props) => {
  const category = await getCacheCategoryWithSlug(slug);

  console.log("🔍 ProductWithCategoryType - slug:", slug);
  console.log("🔍 Category data:", category);

  // Trường hợp không có category
  if (!category) {
    return (
      <div className="text-center py-10 text-gray-500">
        Không tìm thấy danh mục <strong>{slug}</strong>
      </div>
    );
  }

  // Trường hợp không có products
  if (!category.products || category.products.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        Danh mục <strong>{category.name ?? slug}</strong> chưa có sản phẩm nào
      </div>
    );
  }

  const products = category.products;

  // Gom promotion duy nhất
  const allProductPromotions: ProductPromotion[] = products.flatMap(
    (product) => product.promotionProducts ?? []
  );

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

/** @format */

import { ProductAPI } from "@/api/products/product.api";
import ProductWrapperCard from "@/components/ui/product/product-wrapper-card";
import { ProductCard } from "@/components/ui/product/product-card";
import { SectionHeader } from "@/components/ui/section/section-header";
import { ProductInterface } from "@/types/product";
import { ProductPromotion, PromotionInterface } from "@/types/promotion";
import { Star } from "lucide-react";

const FeatureProducts = async () => {
  let featureProducts: ProductInterface[] = [];
  let promotions: PromotionInterface[] = [];

  try {
    const response = await ProductAPI.getFeatureProducts({
      limit: 5,
    });

    featureProducts = response.data.products as ProductInterface[];

    const allProductPromotions: ProductPromotion[] = featureProducts.flatMap(
      (product) => product.promotionProducts
    );

    const uniquePromotionsMap = new Map<number, PromotionInterface>();

    for (const promo of allProductPromotions) {
      if (promo.promotion && !uniquePromotionsMap.has(promo.promotionId)) {
        uniquePromotionsMap.set(promo.promotionId, promo.promotion);
      }
    }

    promotions = Array.from(uniquePromotionsMap.values());
  } catch (error) {
    console.error("Failed to fetch featured products:", error);
  }

  return (
    <section className="py-10">
      <div className="container mx-auto px-4 ">
        <SectionHeader
          linkViewAll={`/danh-muc/san-pham`}
          title="Sản phẩm nổi bật"
          icon={<Star className="text-black" size={24} />}
        />
        <div className="">
          <ProductWrapperCard
            products={featureProducts}
            hiddenGridButton={true}
          />

          {/* {featureProducts.map((product) => {
            const matchedPromotion = product.promotionProducts.find((pp) =>
              promotions.find((p) => p.id === pp.promotionId)
            )?.promotion;

        
          })} */}
        </div>
      </div>
    </section>
  );
};

export default FeatureProducts;

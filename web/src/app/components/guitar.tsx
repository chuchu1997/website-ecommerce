/** @format */

import { ProductAPI } from "@/api/products/product.api";
import ProductWrapperCard from "@/components/ui/product/product-wrapper-card";
import { ProductCard } from "@/components/ui/product/product-card";
import { SectionHeader } from "@/components/ui/section/section-header";
import { ProductInterface } from "@/types/product";
import { ProductPromotion, PromotionInterface } from "@/types/promotion";
import { Star } from "lucide-react";
import { CategoryAPI } from "@/api/categories/category.api";
import { CategoryInterface } from "@/types/category";
import { ImageLoader } from "@/components/ui/image-loader";

const GuitarAcoustic = async () => {
  let guitarProducts: ProductInterface[] = [];
  let category: CategoryInterface = {
    id: 0,
    subCategories: [],
    name: "",
    slug: "",
    storeId: 0,
    imageUrl: "",
    description: "",
  };

  try {
    const res = await CategoryAPI.getCategoryWithSlug("guitar-acoustic", 1, 5);
    guitarProducts = res.data.products as ProductInterface[];
    category = res.data as CategoryInterface;

    // phukienProducts = response.data.products as ProductInterface[];

    // const allProductPromotions: ProductPromotion[] = featureProducts.flatMap(
    //   (product) => product.promotionProducts
    // );
  } catch (error) {
    console.error("Failed to fetch featured products:", error);
  }

  if (!category) return null;

  return (
    <section className="py-6">
      <div className="container mx-auto px-6">
        <div className="h-50 sm:h-100 w-full relative my-4 rounded-md overflow-hidden">
          <ImageLoader src={category.imageUrl} fill alt={category.name} />
        </div>
        <SectionHeader
          linkViewAll={`/danh-muc/${category.slug}`}
          title={category.name}
          icon={<Star className="text-black" size={24} />}
        />
        <div className="">
          <ProductWrapperCard
            products={guitarProducts}
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

export default GuitarAcoustic;

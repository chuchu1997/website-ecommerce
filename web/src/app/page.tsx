/** @format */

import React from "react";

import { InteriorContent } from "./(main)/components/InteriorContent";
import { FeatureProducts } from "./(main)/components/FeatureProduct/FeatureProduct";
import { ProductCategories } from "./(main)/components/ProductCategories/ProductCategories";
import { HighlightedProjects } from "./(main)/components/HighlightProject/HighlightProject";
import { PartnerBrands } from "./(main)/components/PartnerBrands/PartnerBrands";
import { NewsMasterPage } from "./(main)/components/News/News";
import { ProductWithCategoryType } from "./(main)/components/ProductWithCategoryType/ProductWithCategoryType";
import { CategoriesListSSR } from "./(main)/components/CategoriesList/categories-list-ssr";
import { HeroSSR } from "./(main)/components/Hero/HeroSSR";
import { getCachedStoreInfo } from "./layout";
export const revalidate = 360; // 5 phút

const MusicStoreLanding: React.FC = async () => {
  const storeInfo = await getCachedStoreInfo();

  return (
    <div className=" min-h-screen bg-gray-50 w-full">
      <HeroSSR />
      <CategoriesListSSR />
      <FeatureProducts industry={storeInfo.industry ?? "Xây dựng"} />
      <ProductWithCategoryType
        industry={storeInfo.industry ?? ""}
        slug="ban-cat-gach"
        isGrayBg={true}
      />
      <ProductWithCategoryType
        industry={storeInfo.industry ?? ""}
        slug="thiet-bi-xay-dung"
      />
      <ProductWithCategoryType
        industry={storeInfo.industry ?? ""}
        slug="may-han-dien-tu"
        isGrayBg={true}
      />
      <ProductWithCategoryType
        industry={storeInfo.industry ?? ""}
        slug="dung-cu-dien-va-pin"
      />
      <ProductWithCategoryType
        industry={storeInfo.industry ?? ""}
        slug="dong-co-no"
        isGrayBg={true}
      />
      <ProductWithCategoryType
        industry={storeInfo.industry ?? ""}
        slug="may-bom-nuoc"
      />
      <ProductWithCategoryType
        industry={storeInfo.industry ?? ""}
        slug="vat-tu-co-khi"
        isGrayBg={true}
      />
      <ProductWithCategoryType
        industry={storeInfo.industry ?? ""}
        slug="may-nong-nghiep"
      />
      {/* <ProductCategories /> */}
      <HighlightedProjects industry={storeInfo.industry ?? ""} />

      <PartnerBrands industry={storeInfo.industry ?? ""} />
      <NewsMasterPage industry={storeInfo.industry ?? ""} />
      <InteriorContent industry={storeInfo.industry ?? ""} />
    </div>
  );
};

export default MusicStoreLanding;

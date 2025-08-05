/** @format */

import React from "react";

// import Banner from "./components/banner";
// import { FlashSaleComponentView } from "./components/flash-sale";

// import FeatureProducts from "./components/feature-products";

import { StoreAPI } from "@/api/stores/store.api";
import { StoreInterface } from "@/types/store";

import { InteriorContent } from "./(main)/components/InteriorContent";
import { FeatureProducts } from "./(main)/components/FeatureProduct/FeatureProduct";
import { ProductCategories } from "./(main)/components/ProductCategories/ProductCategories";
import { HighlightedProjects } from "./(main)/components/HighlightProject/HighlightProject";
import { PartnerBrands } from "./(main)/components/PartnerBrands/PartnerBrands";
import { NewsMasterPage } from "./(main)/components/News/News";
import { ProductWithCategoryType } from "./(main)/components/ProductWithCategoryType/ProductWithCategoryType";
import { FlashSaleComponentView } from "./(main)/components/flash-sale";
import { HeroSSR } from "./(main)/components/Hero/HeroSSR";
import { getCachedStoreInfo } from "./layout";

export const revalidate = 30;

const MusicStoreLanding: React.FC = async () => {
  const storeInfo = await getCachedStoreInfo();

  return (
    <div className=" min-h-screen bg-white w-full">
      {/* Banner Section */}
      {/* <Banner /> */}
      <HeroSSR />
      <FlashSaleComponentView />

      <FeatureProducts industry={storeInfo.industry ?? ""} />

      <ProductWithCategoryType
        isGrayBg
        industry={storeInfo.industry ?? ""}
        slug="guitar"
      />
      <ProductWithCategoryType
        industry={storeInfo.industry ?? ""}
        slug="phu-kien"
      />
      <ProductWithCategoryType
        isGrayBg
        industry={storeInfo.industry ?? ""}
        slug="trong-ken-sao"
      />

      <ProductCategories />
      <HighlightedProjects industry={storeInfo.industry ?? ""} />
      <PartnerBrands industry={storeInfo.industry ?? ""} />
      <NewsMasterPage industry={storeInfo.industry ?? ""} />

      <InteriorContent industry={storeInfo.industry ?? ""} />
    </div>
  );
};

export default MusicStoreLanding;

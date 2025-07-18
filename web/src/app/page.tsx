/** @format */

import React from "react";

// import Banner from "./components/banner";
// import { FlashSaleComponentView } from "./components/flash-sale";

// import FeatureProducts from "./components/feature-products";
import { Metadata } from "next";
import { StoreAPI } from "@/api/stores/store.api";
import { StoreInterface } from "@/types/store";
import { generateSeoForPage } from "@/seo-ssr/seo-ssr";
import { SeoInterface } from "@/types/seo";
// import PhuKien from "./components/phu-kien";
// import GuitarAcoustic from "./components/guitar";
// import TrongKen from "./components/trong-ken";
// import SuggessProductHome from "./components/suggesstHome";
// import { Hero } from "./components/hero";
// import { InteriorContent } from "./components/InteriorContent";
// import { FeaturedProductVer2 } from "./components/FeatureProduct";
// import { ProductCategoriesMotion } from "./components/ProductCategories";
// import { HighlightedProjects } from "./components/HighlightProject/HighlightProject";
// import { PartnerBrands } from "./components/PartnerBrands/PartnerBrands";
// import { NewsMasterPage } from "./components/News/News";
import Navbar from "@/components/ui/Navbar/components/NavbarClientVer2";
import { Hero } from "./(main)/components/Hero/Hero";
import { InteriorContent } from "./(main)/components/InteriorContent";
import { FeatureProducts } from "./(main)/components/FeatureProduct/FeatureProduct";
import { ProductCategories } from "./(main)/components/ProductCategories/ProductCategories";
import { HighlightedProjects } from "./(main)/components/HighlightProject/HighlightProject";
import { PartnerBrands } from "./(main)/components/PartnerBrands/PartnerBrands";
import { NewsMasterPage } from "./(main)/components/News/News";
import { ProductWithCategoryType } from "./(main)/components/ProductWithCategoryType/ProductWithCategoryType";
import { FlashSaleComponentView } from "./(main)/components/flash-sale";

export const dynamic = "force-dynamic";
export const revalidate = 60;

const MusicStoreLanding: React.FC = async () => {
  const storeInfo: StoreInterface = (await StoreAPI.getStoreInfo()).data.store;

  return (
    <div className=" min-h-screen bg-white w-full">
      {/* Banner Section */}
      {/* <Banner /> */}
      <Navbar />
      <Hero />
      <FlashSaleComponentView />
      <InteriorContent industry={storeInfo.industry ?? ""} />
      <FeatureProducts industry={storeInfo.industry ?? ""} />
      {/* <ProductWithCategoryType
        industry={storeInfo.industry ?? ""}
        slug="guitar"
      />
      */}
      <ProductCategories />
      <HighlightedProjects industry={storeInfo.industry ?? ""} />
      <PartnerBrands industry={storeInfo.industry ?? ""} />
      <NewsMasterPage industry={storeInfo.industry ?? ""} />

      {/* <Hero />

      <InteriorContent />

      <FeaturedProductVer2 />

      <ProductCategoriesMotion />

      <HighlightedProjects />

      <PartnerBrands />

      <NewsMasterPage /> */}
    </div>
  );
};

export default MusicStoreLanding;

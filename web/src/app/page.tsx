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
import NavbarComponent from "@/components/ui/Navbar";
import { HeroClient } from "./(main)/components/Hero/Hero";
import { InteriorContent } from "./(main)/components/InteriorContent";
import { FeatureProducts } from "./(main)/components/FeatureProduct/FeatureProduct";
import { ProductCategories } from "./(main)/components/ProductCategories/ProductCategories";
import { HighlightedProjects } from "./(main)/components/HighlightProject/HighlightProject";
import { PartnerBrands } from "./(main)/components/PartnerBrands/PartnerBrands";
import { NewsMasterPage } from "./(main)/components/News/News";
import { ProductWithCategoryType } from "./(main)/components/ProductWithCategoryType/ProductWithCategoryType";
import { FlashSaleComponentView } from "./(main)/components/flash-sale";
import CategoriesList from "./(main)/components/CategoriesList/categories-list";
import { CategoryInterface } from "@/types/category";
import { CategoryAPI } from "@/api/categories/category.api";
import { CategoriesListSSR } from "./(main)/components/CategoriesList/categories-list-ssr";
import { HeroSSR } from "./(main)/components/Hero/HeroSSR";
import { fetchSafe } from "@/utils/fetchSafe";
import { getCachedStoreInfo } from "./layout";
export const revalidate = 360; // 5 phút

const MusicStoreLanding: React.FC = async () => {
  const storeInfo = await getCachedStoreInfo();

  return (
    <div className=" min-h-screen bg-gray-50 w-full">
      <HeroSSR />
      <CategoriesListSSR />
      <FeatureProducts storeInfo={storeInfo} />
      <ProductWithCategoryType
        industry={storeInfo.industry ?? ""}
        slug="giuong-ngu"
        isGrayBg={true}
      />

      <HighlightedProjects industry={storeInfo.industry ?? ""} />

      <PartnerBrands industry={storeInfo.industry ?? ""} />
      <NewsMasterPage industry={storeInfo.industry ?? ""} />
      <InteriorContent industry={storeInfo.industry ?? ""} />
    </div>
  );
};

export default MusicStoreLanding;

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

export const dynamic = "force-dynamic";
export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const store = (await StoreAPI.getStoreInfo()).data.store as StoreInterface;

  if (!store) return {};

  if (store.seo && typeof store.seo === "object") {
    return generateSeoForPage(store.seo as SeoInterface);
  }

  return {};
}

const MusicStoreLanding: React.FC = () => {
  return (
    <div className=" min-h-screen bg-white w-full">
      {/* Banner Section */}
      {/* <Banner /> */}
      <Navbar />
      <Hero />
      <InteriorContent />

      <FeatureProducts />

      <ProductCategories />
      <HighlightedProjects />

      <PartnerBrands />
      <NewsMasterPage />

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

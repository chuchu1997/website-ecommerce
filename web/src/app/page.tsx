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
import { Hero } from "./(main)/components/Hero/Hero";
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
import { fetchSafe } from "@/utils/fetchSafe";
// export const dynamic = "force-dynamic";
const getStoreInfo = async (): Promise<StoreInterface> => {
  const data = await fetchSafe(
    () => StoreAPI.getStoreInfo(),
    { store: { industry: "" } } // Fallback trả về đầy đủ key
  );

  return data.store;
};
const MusicStoreLanding: React.FC = async () => {
  const storeInfo = await getStoreInfo();
  console.log("STORE INFO LOG", storeInfo);

  console.log(
    "🔥 Fetch storeInfo (TTL 300s) at:",
    new Date().toLocaleTimeString("vi-VN", { hour12: false })
  );

  return (
    <div className=" min-h-screen bg-gray-50 w-full">
      {/* Banner Section */}
      {/* <Banner /> */}
      {/* <NavbarComponent storeInfo={storeInfo} categories={categories} /> */}

      <Hero />
      <CategoriesList />

      <FlashSaleComponentView />

      <FeatureProducts industry={storeInfo.industry ?? ""} />
      {/* <ProductWithCategoryType
        industry={storeInfo.industry ?? ""}
        slug="guitar"
      />
      */}

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
        slug="dung-cu-dien-cam-tay"
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
      <ProductCategories />
      <HighlightedProjects industry={storeInfo.industry ?? ""} />

      <PartnerBrands industry={storeInfo.industry ?? ""} />
      <NewsMasterPage industry={storeInfo.industry ?? ""} />
      <InteriorContent industry={storeInfo.industry ?? ""} />

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

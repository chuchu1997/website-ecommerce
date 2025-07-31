/** @format */
import React from "react";
import { StoreAPI } from "@/api/stores/store.api";
import { StoreInterface } from "@/types/store";
import { fetchSafe } from "@/utils/fetchSafe";

// Components
import { Hero } from "./(main)/components/Hero/Hero";
import CategoriesListClient from "./(main)/components/CategoriesList/categories-list";
import { FlashSaleComponentView } from "./(main)/components/flash-sale";
import { FeatureProducts } from "./(main)/components/FeatureProduct/FeatureProduct";
import { ProductWithCategoryType } from "./(main)/components/ProductWithCategoryType/ProductWithCategoryType";
import { ProductCategories } from "./(main)/components/ProductCategories/ProductCategories";
import { HighlightedProjects } from "./(main)/components/HighlightProject/HighlightProject";
import { PartnerBrands } from "./(main)/components/PartnerBrands/PartnerBrands";
import { NewsMasterPage } from "./(main)/components/News/News";
import { InteriorContent } from "./(main)/components/InteriorContent";
import { CategoriesListSSR } from "./(main)/components/CategoriesList/categories-list-ssr";

export const dynamic = "force-dynamic";

// Helper lấy store info với fallback
const getStoreInfo = async (): Promise<StoreInterface> => {
  const res = await fetchSafe(
    () => StoreAPI.getStoreInfo(),
    // fallback để tránh lỗi khi build
    {
      data: {
        store: {
          industry: "Thiết bị xây dựng",
        } as StoreInterface,
      },
    }
  );

  return res.data.store;
};

const MusicStoreLanding: React.FC = async () => {
  const storeInfo = await getStoreInfo();

  console.log(
    "🔥 Home page fetched storeInfo (TTL 300s) at:",
    new Date().toLocaleTimeString("vi-VN", { hour12: false })
  );

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      <Hero />
      <CategoriesListSSR />
      <FlashSaleComponentView />

      <FeatureProducts industry={storeInfo.industry ?? ""} />

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
    </div>
  );
};

export default MusicStoreLanding;

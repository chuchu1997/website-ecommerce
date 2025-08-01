/** @format */
import { CategoryAPI } from "@/api/categories/category.api";
import { CategoryInterface } from "@/types/category";
import { fetchSafe } from "@/utils/fetchSafe";
import CategoriesListClient from "./categories-list";
// import { unstable_cache } from "next/cache";

export const revalidate = 100; // ISR 5 phút

const getCachedCategories = async (): Promise<CategoryInterface[]> => {
  const res = await fetchSafe(
    () =>
      CategoryAPI.getAllCategoriesOfStore({
        currentPage: 1,
        limit: 999,
        justGetParent: false,
      }),
    {
      categories: [],
    }
  );
  const categories = res?.categories ?? [];
  console.log("✅ Categories(1) found:", categories.length);
  return categories;
};

export const CategoriesListSSR = async () => {
  const categories = await getCachedCategories();
  console.log("✅ Final categories count:", categories.length);

  return <CategoriesListClient categoriesProps={categories} />;
};

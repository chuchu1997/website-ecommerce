/** @format */

import { CategoryAPI } from "@/api/categories/category.api";
import { CategoryInterface } from "@/types/category";
import { fetchSafe } from "@/utils/fetchSafe";
import CategoriesListClient from "./categories-list";
import { unstable_cache } from "next/cache";

const getCachedCategories = unstable_cache(
  async (): Promise<CategoryInterface[]> => {
    const res = await fetchSafe(
      () =>
        CategoryAPI.getAllCategoriesOfStore({
          currentPage: 1,
          limit: 999,
          justGetParent: false,
        }),
      {
        data: {
          categories: [],
        },
      }
    );
    return res?.data?.categories ?? [];
  },
  ["categories-list"], // cache key
  {
    revalidate: 60, // 1 minute
    tags: ["categories"],
  }
);

export const CategoriesListSSR = async () => {
  const categories = await getCachedCategories();
  return <CategoriesListClient categoriesProps={categories} />;
};

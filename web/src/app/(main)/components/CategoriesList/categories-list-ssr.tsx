/** @format */
import { CategoryAPI } from "@/api/categories/category.api";
import { CategoryInterface } from "@/types/category";
import { fetchSafe } from "@/utils/fetchSafe";
import CategoriesListClient from "./categories-list";
import { unstable_cache } from "next/cache";

const getCachedCategories = unstable_cache(
  async (): Promise<CategoryInterface[]> => {
    console.log("🔍 Starting getCachedCategories...");

    const res = await fetchSafe(
      () =>
        CategoryAPI.getAllCategoriesOfStore({
          currentPage: 1,
          limit: 2,
          justGetParent: false,
        }),
      {
        data: {
          categories: [],
        },
      }
    );

    // Enhanced debugging
    console.log("🔍 Full response object:", JSON.stringify(res, null, 2));
    console.log("🔍 res.data:", res?.data);
    console.log("🔍 res.data.categories:", res?.data?.categories);
    console.log(
      "🔍 Categories array length:",
      res?.data?.categories?.length || 0
    );
    console.log(
      "🔍 Type of res.data.categories:",
      typeof res?.data?.categories
    );
    console.log(
      "🔍 Is res.data.categories an array?",
      Array.isArray(res?.data?.categories)
    );

    // Check if categories exist at different paths
    console.log("🔍 Checking alternative paths:");
    if (res.categories) {
      console.log("🔍 res.categories (LENGHTH):", res?.categories.length);
    }
    console.log("🔍 res.data?.data?.categories:", res?.data?.data?.categories);
    console.log(
      "🔍 res.data?.result?.categories:",
      res?.data?.result?.categories
    );

    const categories = res?.data?.categories ?? [];
    console.log("🔍 Final categories being returned:", categories);
    console.log("🔍 Final categories length:", categories.length);

    return categories;
  },
  ["categories-list"], // cache key
  {
    revalidate: 60, // 1 minute
    tags: ["categories"],
  }
);

export const CategoriesListSSR = async () => {
  console.log("🔍 CategoriesListSSR component started");
  const categories = await getCachedCategories();
  console.log("🔍 Categories received in component:", categories.length);

  return <CategoriesListClient categoriesProps={categories} />;
};

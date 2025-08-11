/** @format */
import { CategoryAPI } from "@/api/categories/category.api";
import { CategoryInterface } from "@/types/category";
import { fetchSafe } from "@/utils/fetchSafe";
import CategoriesListClient from "./categories-list";
import { getCachedCategories } from "@/app/layout";
// import { unstable_cache } from "next/cache";

export const CategoriesListSSR = async () => {
  const categories = await getCachedCategories(8);

  return <CategoriesListClient categoriesProps={categories} />;
};

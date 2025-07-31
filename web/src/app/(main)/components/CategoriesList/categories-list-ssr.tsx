/** @format */

import { CategoryAPI } from "@/api/categories/category.api";
import { CategoryInterface } from "@/types/category";
import { fetchSafe } from "@/utils/fetchSafe";
import CategoriesListClient from "./categories-list";

export const CategoriesListSSR = async () => {
  let categories: CategoryInterface[] = [];

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
  categories = res?.data?.categories ?? [];
  console.log("CATEGORY LENGTH", categories.length);

  return <CategoriesListClient categoriesProps={categories} />;
};

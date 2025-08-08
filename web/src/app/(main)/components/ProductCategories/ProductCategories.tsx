/** @format */

import { FC } from "react";
import { ProductCategoriesMotion } from "./ProductCategoriesMotion";
import { CategoryInterface } from "@/types/category";
import { CategoryAPI } from "@/api/categories/category.api";
import { fetchSafe } from "@/utils/fetchSafe";

const getCachedCategories = async (): Promise<CategoryInterface[]> => {
  const res = await fetchSafe(
    () =>
      CategoryAPI.getAllCategoriesOfStore({
        currentPage: 1,
        limit: 6,
        justGetParent: false,
      }),
    {
      categories: [],
    }
  );
  const categories = res?.categories ?? [];
  return categories;
};

export const ProductCategories: FC = async () => {
  // const ss = CategoryAPI.getAllCategoriesOfStore()

  let categories: CategoryInterface[] = [];

  categories = await getCachedCategories();

  // categories = res.data.categories.filter(
  //   (category: CategoryInterface) => category.slug !== "san-pham"
  // );

  return (
    <ProductCategoriesMotion
      categories={categories}
      title="Các danh mục nổi bật  "
      description="Tìm các sản phẩm phục vụ cho nhu cầu của bạn "
    />
  );
};

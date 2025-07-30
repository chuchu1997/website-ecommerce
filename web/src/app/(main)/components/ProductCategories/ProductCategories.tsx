/** @format */

import { FC } from "react";
import { ProductCategoriesMotion } from "./ProductCategoriesMotion";
import { CategoryInterface } from "@/types/category";
import { CategoryAPI } from "@/api/categories/category.api";

export const ProductCategories: FC = async () => {
  // const ss = CategoryAPI.getAllCategoriesOfStore()

  let categories: CategoryInterface[] = [];
  const res = await CategoryAPI.getAllCategoriesOfStore({
    justGetParent: false,
    currentPage: 1,
    limit: 6,
  });

  categories = res.data.categories;

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

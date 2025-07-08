/** @format */

import { FC } from "react";
import { ProductCategoriesMotion } from "./ProductCategoriesMotion";
import { CategoryInterface } from "@/types/category";
import { CategoryAPI } from "@/api/categories/category.api";

export const ProductCategories: FC = async () => {
  // const ss = CategoryAPI.getAllCategoriesOfStore()

  const mockCategories: CategoryInterface[] = [
    {
      id: 1,
      name: "Phòng khách",
      slug: "phong-khach",
      storeId: 1,
      imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      description: "Nội thất hiện đại cho phòng khách ấm cúng và tiện nghi.",
      parentId: null,
      createdAt: new Date("2025-01-01"),
      updatedAt: new Date("2025-06-01"),
      // seo: {
      //   title: "Nội thất phòng khách đẹp",
      //   description:
      //     "Khám phá các mẫu nội thất phòng khách hiện đại, sang trọng.",
      //   keywords: "sofa, bàn trà, tủ tivi, nội thất phòng khách",
      // },
      subCategories: [],
      products: [],
    },

    {
      id: 2,
      name: "Sofa",
      slug: "sofa",
      storeId: 1,
      imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7",
      description: "Các mẫu sofa cao cấp cho phòng khách.",
      parentId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),

      subCategories: [],
      products: [],
    },
  ];
  let categories: CategoryInterface[] = mockCategories;
  const res = await CategoryAPI.getAllCategoriesOfStore({
    justGetParent: false,
    currentPage: 1,
    limit: 8,
  });

  categories = res.data.categories;

  // categories = res.data.categories.filter(
  //   (category: CategoryInterface) => category.slug !== "san-pham"
  // );

  return (
    <ProductCategoriesMotion
      categories={categories}
      title="Các danh mục nội thất "
      description="Tìm nội thất đẹp cho ngôi nhà của bạn "
    />
  );
};

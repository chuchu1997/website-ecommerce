/** @format */

"use client";
import { ProductInterface } from "@/types/product";
import {
  ApiResponseProductScroll,
  ScrollToLoadProductsWithCategory,
} from "./scrollToLoadProductWithCategoryComponent";
import { CategoryAPI } from "@/api/categories/category.api";
import { CategoryInterface } from "@/types/category";

export const ExampleUsage: React.FC = () => {
  // Mock API function
  const mockFetchProducts = async (
    page: number,
    limit: number
  ): Promise<ApiResponseProductScroll> => {
    // Simulate API delay

    const response = await CategoryAPI.getCategoryWithSlug("san-pham", page, 2);

    const categoryData = response.data;

    let products = categoryData.products || [];
    let total = categoryData.totalProducts;
    // const products: ProductInterface[] = Array.from({ length: limit }, (_, i) => ({
    //   id: startId + i,
    //   name: `Product ${startId + i}`,
    //   price: Math.floor(Math.random() * 100) + 10,
    //   description: `This is a great product with amazing features. Product ${startId + i} description.`,
    //   image: `https://picsum.photos/300/300?random=${startId + i}`,
    // }));

    // Simulate end of data after 5 pages
    const hasMore = page < 5;

    return {
      products,
      hasMore,
      nextPage: hasMore ? page + 1 : undefined,
      total: hasMore ? undefined : total,
    };
  };

  const handleProductsLoaded = (
    newProducts: ProductInterface[],
    totalLoaded: number
  ) => {
    console.log(
      `Loaded ${newProducts.length} new products. Total: ${totalLoaded}`
    );
  };

  const handleError = (error: string) => {
    console.error("Products loading error:", error);
  };

  return (
    <ScrollToLoadProductsWithCategory
      fetchProducts={mockFetchProducts}
      itemsPerPage={8}
      containerClassName="mb-8"
      loadOffset={150}
      onProductsLoaded={handleProductsLoaded}
      onError={handleError}
    />
  );
};

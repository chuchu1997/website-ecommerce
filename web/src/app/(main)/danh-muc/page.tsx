/** @format */

import type { Metadata } from "next";
import { CategoryAPI } from "@/api/categories/category.api";
import { CategoryInterface } from "@/types/category";
import CategoryCard from "@/components/ui/CategoryCard";
import { fetchSafe } from "@/utils/fetchSafe";

// export const revalidate = 300; // cache fallback 5 phút

const getCategories = async (): Promise<CategoryInterface[]> => {
  // fetchSafe
  const data = await fetchSafe(() =>
    CategoryAPI.getAllCategoriesOfStore({
      justGetParent: false,
    })
  );
  return data.categories ?? [];
};

const DanhMucPage = async () => {
  const categories = await getCategories();

  return (
    <div className="mt-[150px]">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
        {categories.length > 0 ? (
          categories.map((category) => (
            <CategoryCard category={category} key={category.id} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            Không có danh mục nào
          </p>
        )}
      </div>
    </div>
  );
};

export default DanhMucPage;

/** @format */

import type { Metadata } from "next";

import TileComponent from "@/components/layouts/TileComponent";
// import ProductList from "@/components/product/product-list";
import BillboardLayout from "@/components/ui/billboard";
import CircleLoading from "@/components/ui/circle-loading";
import { Suspense } from "react";
import { CategoryAPI } from "@/api/categories/category.api";
import { CategoryInterface } from "@/types/category";
import CategoryCard from "@/components/ui/CategoryCard";

const DanhMucPage = async () => {
  let categories: CategoryInterface[] = [];
  const res = await CategoryAPI.getAllCategoriesOfStore({
    justGetParent: false,
  });
  categories = res.data.categories;

  return (
    <div className=" mt-[150px]">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
        {categories.map((category) => (
          <CategoryCard category={category} key={category.id} />
        ))}
      </div>

      {/* <Suspense fallback={<CircleLoading />}>
        <BillboardLayout data={category.billboard} />
        <section className="list-products">
          <TileComponent
            title={`Các sản phẩm thuộc danh mục: ${category.name}`}
          />
          <ProductList title={category.name} products={products} />
        </section>
      </Suspense> */}
    </div>
  );
};

export default DanhMucPage;

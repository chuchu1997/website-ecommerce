/** @format */
"use client";

import { CategoryAPI } from "@/api/categories/category.api";
import { Slider } from "@/common/SlideCustom";
import { useBreakpoint } from "@/hooks/use-breakpoint";
import { CategoryInterface } from "@/types/category";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ImageLoader } from "@/components/ui/image-loader";

const CategoriesList = () => {
  const [categories, setCategories] = useState<CategoryInterface[]>([]);

  const fetchCategories = async () => {
    const res = await CategoryAPI.getAllCategoriesOfStore({
      justGetParent: false,
    });

    const data = res.data.categories as CategoryInterface[];

    setCategories(data.filter((item) => item.parentId !== null).slice(0, 16));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const breakpoint = useBreakpoint();

  const getItemsPerView = () => {
    switch (breakpoint) {
      case "sm":
        return 2;
      case "md":
        return 3;
      case "lg":
        return 4;
      case "xl":
        return 6;
      case "2xl":
        return 8;
      default:
        return 3;
    }
  };

  const renderCategory = (category: CategoryInterface) => (
    <Link
      href={`/danh-muc/${category.slug}`}
      key={category.id}
      className="border min-h-[170px] group flex flex-col items-center justify-start p-3 rounded-lg hover:shadow-lg transition duration-300 bg-white">
      <div className="w-24 h-24  relative mb-2 rounded-full overflow-hidden border">
        {category.imageUrl && (
          <ImageLoader
            priority={true}
            src={category.imageUrl}
            alt={category.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        )}
      </div>
      <div className="text-center">
        <h4 className="text-sm font-medium text-gray-800 group-hover:text-black transition">
          {category.name}
        </h4>
      </div>
    </Link>
  );

  return (
    <div className="my-6 max-w-7xl mx-auto px-4 mt-10">
      <Slider
        items={categories}
        renderItem={renderCategory}
        onItemClick={() => {}}
        itemsPerView={getItemsPerView()}
        gap={20}
        showArrows={true}
        showDots={false}
        autoPlay={true}
        autoPlayInterval={5000}
      />
    </div>
  );
};

export default CategoriesList;

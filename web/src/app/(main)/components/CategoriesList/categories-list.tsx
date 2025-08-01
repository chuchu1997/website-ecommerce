/** @format */
"use client";

import { CategoryInterface } from "@/types/category";
import { Slider } from "@/common/SlideCustom";
import { useBreakpoint } from "@/hooks/use-breakpoint";
import Image from "next/image";
import Link from "next/link";
import { ImageLoader } from "@/components/ui/image-loader";

interface Props {
  categoriesProps: CategoryInterface[];
}

const CategoriesListClient = ({ categoriesProps }: Props) => {
  const categories = categoriesProps || [];
  const breakpoint = useBreakpoint();

  // Debug logs
  console.log("🔍 CategoriesListClient received:", {
    categoriesProps,
    categories,
    categoriesLength: categories.length,
    firstCategory: categories[0],
    breakpoint,
  });

  // Xác định số items hiển thị theo breakpoint
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

  // Render từng category
  const renderCategory = (category: CategoryInterface) => {
    console.log("🔍 Rendering category:", category);
    return (
      <Link
        key={category.id}
        href={`/danh-muc/${category.slug}`}
        className="border min-h-[170px] group flex flex-col items-center justify-start p-3 rounded-lg hover:shadow-lg transition duration-300 bg-white">
        <div className="w-24 h-24 relative mb-2 rounded-full overflow-hidden border">
          {category.imageUrl ? (
            // <ImageLoader
            //   priority
            //   src={category.imageUrl}
            //   alt={category.name}
            //   fill
            //   className="object-cover group-hover:scale-105 transition-transform duration-300"
            // />

            <Image
              src={category.imageUrl}
              alt={category.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
              No image
            </div>
          )}
        </div>
        <div className="text-center">
          <h4 className="text-sm font-medium text-gray-800 group-hover:text-black transition">
            {category.name}
          </h4>
        </div>
      </Link>
    );
  };

  // Trường hợp không có category
  if (!categories.length) {
    console.log("🔍 No categories to display");
    return (
      <div className="my-6 max-w-7xl mx-auto px-4 mt-10 text-center text-gray-500">
        Không có danh mục nào để hiển thị
      </div>
    );
  }

  console.log("🔍 About to render Slider with:", {
    itemsCount: categories.length,
    itemsPerView: getItemsPerView(),
    firstItem: categories[0],
  });

  // Temporary fallback without Slider for testing
  const renderWithoutSlider = () => (
    <div className="my-6 max-w-7xl mx-auto px-4 mt-10">
      <div className="mb-4 text-green-600">
        DEBUG: Found {categories.length} categories - rendering without Slider
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {categories.slice(0, 12).map(renderCategory)}
      </div>
    </div>
  );

  // Try with Slider first, fallback to grid if Slider fails
  try {
    return (
      <div className="my-6 max-w-7xl mx-auto px-4 mt-10">
        <div className="mb-4 text-blue-600">
          DEBUG: Rendering {categories.length} categories with Slider
        </div>
        <Slider
          items={categories}
          renderItem={renderCategory}
          onItemClick={() => {}}
          itemsPerView={getItemsPerView()}
          gap={20}
          showArrows
          showDots={false}
          autoPlay
          autoPlayInterval={5000}
        />
      </div>
    );
  } catch (error) {
    console.error("🔍 Slider error:", error);
    return renderWithoutSlider();
  }
};

export default CategoriesListClient;

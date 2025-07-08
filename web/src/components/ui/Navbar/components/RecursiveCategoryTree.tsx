"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // <-- import router
import { CategoryInterface } from "@/types/category";
import { ChevronDown, ChevronRight } from "lucide-react";
import { ImageLoader } from "../../image-loader";

interface CategoryTreeProps {
  categories: CategoryInterface[];
}

export const RecursiveCategoryTree: React.FC<CategoryTreeProps> = ({ categories }) => {
  return (
    <div className="space-y-2">
      <h2 className="text-base font-semibold mb-2">Danh mục sản phẩm</h2>
      {categories.map((category) => (
        <CategoryNode key={category.id} category={category} />
      ))}
    </div>
  );
};

const CategoryNode: React.FC<{ category: CategoryInterface }> = ({ category }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter(); // <-- dùng router
  const hasChildren = category.subCategories && category.subCategories.length > 0;

  const handleClick = () => {
    if (hasChildren) {
      setOpen((prev) => !prev);
    } else {
      router.push(`/danh-muc/${category.slug}`); // <-- chuyển trang
    }
  };

  return (
    <div className="ml-2">
      <div
        className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded"
        onClick={handleClick}
      >
        {hasChildren ? (
          open ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />
        ) : (
          <span className="w-4 h-4" />
        )}

        {category.imageUrl && (
          <ImageLoader
            src={category.imageUrl}
            alt={category.name}
            width={20}
            height={20}
            className="rounded object-cover"
          />
        )}

        <span className="font-medium">{category.name}</span>
      </div>

      {hasChildren && open && (
        <div className="ml-6 border-l border-gray-200 pl-2">
          {category.subCategories.map((sub) => (
            <CategoryNode key={sub.id} category={sub} />
          ))}
        </div>
      )}
    </div>
  );
};

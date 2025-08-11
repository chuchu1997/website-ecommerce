/** @format */

import React from "react";
import { Sofa } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CategoryInterface } from "@/types/category";
import { ImageLoader } from "../../../image-loader";

interface MegaMenuProps {
  category: CategoryInterface;
  hoveredParentCategory: number | null;
  onParentCategoryHover: (categoryId: number) => void;
  onMenuEnter: () => void;
  onMenuLeave: () => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({
  category,
  hoveredParentCategory,
  onParentCategoryHover,
  onMenuEnter,
  onMenuLeave,
}) => {
  const router = useRouter();

  const getCategoryDisplayName = (cat: CategoryInterface) => cat.name;

  const getActiveParentCategory = () => {
    return category.subCategories.find(
      (cat) => cat.id === hoveredParentCategory
    );
  };

  return (
    <div
      className="absolute left-0 top-full w-[1000px] h-[500px] bg-white rounded-2xl shadow-2xl border border-amber-200/50 z-50 flex overflow-hidden backdrop-blur-sm"
      onMouseEnter={onMenuEnter}
      onMouseLeave={onMenuLeave}>
      {/* Left Column - Parent Categories */}
      <div className="w-1/4 bg-gradient-to-br from-amber-50/90 to-rose-50/90 border-r border-amber-200/50 flex flex-col">
        <div className="p-4 border-b border-amber-300/50 flex-shrink-0 bg-white/80">
          <h3 className="text-base font-bold text-amber-900 truncate">
            {getCategoryDisplayName(category)}
          </h3>
        </div>
        <div className="flex-1 p-3 overflow-y-auto scrollbar-thin scrollbar-thumb-amber-300 scrollbar-track-transparent hover:scrollbar-thumb-amber-400">
          <div className="space-y-1">
            {category.subCategories.map((subcategory) => (
              <div
                key={subcategory.id}
                onClick={() => router.push(`/danh-muc/${subcategory.slug}`)}
                onMouseEnter={() => onParentCategoryHover(subcategory.id)}
                className={`p-3 rounded-xl cursor-pointer transition-all duration-200 ${
                  hoveredParentCategory === subcategory.id
                    ? "bg-white text-amber-800 shadow-lg border border-amber-300"
                    : "hover:bg-white/80 text-amber-700 hover:shadow-md"
                }`}>
                <div className="font-semibold text-sm line-clamp-2">
                  {subcategory.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column - Child Categories */}
      <div className="w-3/4 bg-gradient-to-br from-white to-amber-50/30 flex flex-col">
        {getActiveParentCategory() ? (
          <>
            <div className="p-4 border-b border-amber-200/50 flex-shrink-0 bg-white/90">
              <h3 className="text-base font-bold text-amber-900 truncate">
                {getActiveParentCategory()?.name}
              </h3>
            </div>
            <div className="flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-amber-300 scrollbar-track-transparent hover:scrollbar-thumb-amber-400">
              <div className="grid grid-cols-5 gap-4">
                {getActiveParentCategory()?.subCategories?.map(
                  (childCategory) => (
                    <Link
                      key={childCategory.id}
                      href={`/danh-muc/${childCategory.slug}`}
                      className="group p-4 rounded-xl hover:bg-gradient-to-br hover:from-amber-50 hover:to-rose-50 transition-all duration-300 border border-transparent hover:border-amber-300 hover:shadow-lg transform hover:scale-105">
                      <div className="flex flex-col items-center space-y-3">
                        <div className="relative w-12 h-12 flex-shrink-0">
                          <ImageLoader
                            fill
                            className="rounded-xl object-cover shadow-md group-hover:shadow-lg transition-all duration-300"
                            src={childCategory.imageUrl}
                            alt={childCategory.name}
                          />
                        </div>
                        <h4 className="text-center font-semibold text-sm text-amber-900 group-hover:text-amber-800 transition-colors duration-200 line-clamp-2">
                          {childCategory.name}
                        </h4>
                      </div>
                    </Link>
                  )
                ) || (
                  <div className="col-span-5 text-center py-8">
                    <div className="relative w-16 h-16 bg-gradient-to-br from-amber-100 to-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <ImageLoader
                        fill
                        className="rounded-full flex-shrink-0"
                        src={getActiveParentCategory()?.imageUrl ?? ""}
                        alt={getActiveParentCategory()?.name ?? ""}
                      />
                    </div>
                    <h4 className="font-bold text-amber-900 mb-3">
                      {getActiveParentCategory()?.name}
                    </h4>
                    <p className="text-sm text-amber-700 line-clamp-3 mb-4 px-4">
                      {getActiveParentCategory()?.description}
                    </p>
                    <Link
                      href={`/danh-muc/${getActiveParentCategory()?.slug}`}
                      className="inline-block px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl hover:from-amber-700 hover:to-amber-800 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl">
                      Xem bộ sưu tập
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sofa className="h-8 w-8 text-amber-600" />
              </div>
              <p className="text-amber-700 text-sm font-medium">
                Di chuyển chuột để khám phá bộ sưu tập
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

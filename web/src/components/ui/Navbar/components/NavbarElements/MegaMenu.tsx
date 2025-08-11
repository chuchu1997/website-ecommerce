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
  const getActiveParentCategory = () =>
    category.subCategories.find((cat) => cat.id === hoveredParentCategory);

  return (
    <div
      className="absolute left-0 top-full w-[1000px] h-[500px] 
      bg-[var(--color-bg)] rounded-2xl shadow-lg border border-[var(--color-border-light)] 
      z-50 flex overflow-hidden backdrop-blur-sm transition-all duration-300"
      onMouseEnter={onMenuEnter}
      onMouseLeave={onMenuLeave}>
      {/* Left Column */}
      <div className="w-1/4 bg-[var(--color-bg-secondary)] border-r border-[var(--color-border-light)] flex flex-col">
        <div className="p-4 border-b border-[var(--color-border-light)] bg-[var(--color-bg)]">
          <h3 className="text-base font-bold text-[var(--color-text-primary)] truncate">
            {getCategoryDisplayName(category)}
          </h3>
        </div>
        <div className="flex-1 p-3 overflow-y-auto scrollbar-thin scrollbar-thumb-[var(--color-border-accent)] scrollbar-track-transparent hover:scrollbar-thumb-[var(--color-primary-hover)]">
          <div className="space-y-1">
            {category.subCategories.map((subcategory) => (
              <div
                key={subcategory.id}
                onClick={() => router.push(`/danh-muc/${subcategory.slug}`)}
                onMouseEnter={() => onParentCategoryHover(subcategory.id)}
                className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                  hoveredParentCategory === subcategory.id
                    ? "bg-[var(--color-bg)] text-[var(--color-primary)] shadow-md border border-[var(--color-border-accent)]"
                    : "hover:bg-[var(--color-bg-hover)] text-[var(--color-text-secondary)]"
                }`}>
                <div className="font-semibold text-sm line-clamp-2">
                  {subcategory.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="w-3/4 bg-[var(--color-bg)] flex flex-col">
        {getActiveParentCategory() ? (
          <>
            <div className="p-4 border-b border-[var(--color-border-light)] bg-[var(--color-bg-secondary)]">
              <h3 className="text-base font-bold text-[var(--color-text-primary)] truncate">
                {getActiveParentCategory()?.name}
              </h3>
            </div>
            <div className="flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-[var(--color-border-accent)] scrollbar-track-transparent hover:scrollbar-thumb-[var(--color-primary-hover)]">
              <div className="grid grid-cols-5 gap-4">
                {getActiveParentCategory()?.subCategories?.map(
                  (childCategory) => (
                    <Link
                      key={childCategory.id}
                      href={`/danh-muc/${childCategory.slug}`}
                      className="group p-4 rounded-lg hover:bg-[var(--color-bg-hover)] transition-all duration-300 border border-transparent hover:border-[var(--color-border-accent)] hover:shadow-lg transform hover:scale-[1.03]">
                      <div className="flex flex-col items-center space-y-3">
                        <div className="relative w-12 h-12 flex-shrink-0">
                          <ImageLoader
                            fill
                            className="rounded-lg object-cover shadow-md group-hover:shadow-lg transition-all duration-300"
                            src={childCategory.imageUrl}
                            alt={childCategory.name}
                          />
                        </div>
                        <h4 className="text-center font-semibold text-sm text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] transition-colors duration-200 line-clamp-2">
                          {childCategory.name}
                        </h4>
                      </div>
                    </Link>
                  )
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--color-bg-hover)] rounded-full flex items-center justify-center mx-auto mb-4">
                <Sofa className="h-8 w-8 text-[var(--color-primary)]" />
              </div>
              <p className="text-[var(--color-text-secondary)] text-sm font-medium">
                Di chuyển chuột để khám phá bộ sưu tập
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

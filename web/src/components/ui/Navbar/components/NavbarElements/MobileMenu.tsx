/** @format */

import React from "react";
import { ChevronDown, Phone, Home, Palette, Sofa } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ImageLoader } from "../../../image-loader";
import { CategoryInterface } from "@/types/category";
import { StoreInterface } from "@/types/store";

interface MobileMenuProps {
  categories: CategoryInterface[];
  storeInfo: StoreInterface;
  isOpen: boolean;
  expandedMobileCategory: number | null;
  hoveredParentCategory: number | null;
  onCategoryToggle: (categoryId: number) => void;
  onParentCategoryHover: (categoryId: number) => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  categories,
  storeInfo,
  isOpen,
  expandedMobileCategory,
  hoveredParentCategory,
  onCategoryToggle,
  onParentCategoryHover,
}) => {
  const router = useRouter();

  const getCategoryDisplayName = (category: CategoryInterface) => category.name;
  const hasMegaMenu = (category: CategoryInterface) =>
    category.subCategories && category.subCategories.length > 0;

  if (!isOpen) return null;

  return (
    <div className="lg:hidden bg-white border-t border-amber-100 shadow-xl">
      <div className="px-4 py-4 space-y-2 max-h-[80vh] overflow-y-auto">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3 mb-4 p-3 bg-gradient-to-r from-amber-50 to-rose-50 rounded-xl border border-amber-200">
          <Link
            href="/tu-van-thiet-ke"
            className="flex items-center justify-center space-x-2 p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-amber-200">
            <Palette className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-semibold text-emerald-700">
              Tư vấn
            </span>
          </Link>
          <div className="flex items-center justify-center space-x-2 p-3 bg-white rounded-lg shadow-sm border border-amber-200">
            <Home className="w-4 h-4 text-amber-600" />
            <span className="text-xs font-semibold text-amber-700">8h-22h</span>
          </div>
        </div>

        {/* Categories */}
        {categories.map((category) => (
          <div key={category.id} className="space-y-1">
            {hasMegaMenu(category) ? (
              <div className="space-y-1">
                <button
                  onClick={() => onCategoryToggle(category.id)}
                  className="w-full flex items-center justify-between px-4 py-3 text-sm text-amber-900 hover:text-amber-800 hover:bg-amber-50 rounded-xl transition-all duration-200 font-semibold border border-transparent hover:border-amber-200">
                  <span className="truncate pr-2">
                    {getCategoryDisplayName(category)}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 transform transition-transform duration-200 flex-shrink-0 ${
                      expandedMobileCategory === category.id ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {expandedMobileCategory === category.id && (
                  <div className="bg-gradient-to-r from-amber-50/80 to-rose-50/80 rounded-xl p-3 mt-2 border border-amber-200">
                    <div className="flex gap-2 h-100">
                      {/* Left Column - Parent Categories */}
                      <div className="w-2/5 bg-white rounded-lg p-3 border border-amber-200 overflow-y-auto">
                        <h4 className="text-xs font-bold text-amber-900 mb-2 border-b border-amber-200 pb-2 truncate">
                          {getCategoryDisplayName(category)}
                        </h4>
                        <div className="space-y-1">
                          {category.subCategories.map((subcategory) => (
                            <div
                              key={subcategory.id}
                              onClick={() => {
                                if (subcategory.subCategories?.length > 0) {
                                  onParentCategoryHover(subcategory.id);
                                } else {
                                  router.push(`/danh-muc/${subcategory.slug}`);
                                }
                              }}
                              className={`p-2 rounded-lg cursor-pointer transition-all duration-200 ${
                                hoveredParentCategory === subcategory.id
                                  ? "bg-amber-100 text-amber-800 border border-amber-300"
                                  : "hover:bg-amber-50 text-amber-700"
                              }`}>
                              <div className="text-xs font-semibold truncate">
                                {subcategory.name}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Right Column - Child Categories */}
                      <div className="w-3/5 bg-white rounded-lg p-3 border border-amber-200 overflow-y-auto">
                        {hoveredParentCategory &&
                        category.subCategories.find(
                          (cat) => cat.id === hoveredParentCategory
                        ) ? (
                          <>
                            <h4 className="text-xs font-bold text-amber-900 mb-2 border-b border-amber-200 pb-2 truncate">
                              {
                                category.subCategories.find(
                                  (cat) => cat.id === hoveredParentCategory
                                )?.name
                              }
                            </h4>
                            <div className="space-y-2 grid grid-cols-2">
                              {category.subCategories
                                .find((cat) => cat.id === hoveredParentCategory)
                                ?.subCategories?.map((childCategory) => (
                                  <Link
                                    key={childCategory.id}
                                    href={`/danh-muc/${childCategory.slug}`}
                                    className="group flex flex-col items-center p-3 rounded-xl hover:bg-amber-50 transition-all duration-200 hover:shadow-sm border border-transparent hover:border-amber-200">
                                    <div className="relative h-12 w-12 mb-2 flex-shrink-0">
                                      <ImageLoader
                                        fill
                                        className="rounded-lg object-cover shadow-sm group-hover:shadow-md transition-all duration-200"
                                        src={childCategory.imageUrl}
                                        alt={childCategory.name}
                                      />
                                    </div>
                                    <h5 className="text-xs font-semibold text-amber-900 group-hover:text-amber-800 transition-colors duration-200 leading-tight px-1 text-center line-clamp-2 break-words">
                                      {childCategory.name}
                                    </h5>
                                  </Link>
                                )) || (
                                <div className="col-span-2 text-center py-4">
                                  <div className="relative w-14 h-14 bg-gradient-to-br from-amber-100 to-rose-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <ImageLoader
                                      fill
                                      className="rounded-lg"
                                      src={
                                        category.subCategories.find(
                                          (cat) =>
                                            cat.id === hoveredParentCategory
                                        )?.imageUrl ?? ""
                                      }
                                      alt={
                                        category.subCategories.find(
                                          (cat) =>
                                            cat.id === hoveredParentCategory
                                        )?.name ?? ""
                                      }
                                    />
                                  </div>
                                  <h5 className="text-xs font-semibold text-amber-900 mb-2 truncate">
                                    {
                                      category.subCategories.find(
                                        (cat) =>
                                          cat.id === hoveredParentCategory
                                      )?.name
                                    }
                                  </h5>
                                  <p className="text-xs text-amber-700 mb-3 line-clamp-2">
                                    {
                                      category.subCategories.find(
                                        (cat) =>
                                          cat.id ===
                                          hoveredParentCategory
                                      )?.description
                                    }
                                  </p>
                                  <Link
                                    href={`/danh-muc/${
                                      category.subCategories.find(
                                        (cat) =>
                                          cat.id ===
                                          hoveredParentCategory
                                      )?.slug
                                    }`}
                                    className="inline-block px-3 py-1.5 bg-gradient-to-r from-amber-600 to-amber-700 text-white text-xs rounded-lg hover:from-amber-700 hover:to-amber-800 transition-all duration-200 font-semibold shadow-md">
                                    Xem tất cả
                                  </Link>
                                </div>
                              )}
                            </div>
                          </>
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <div className="text-center">
                              <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-rose-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                <Sofa className="h-5 w-5 text-amber-600" />
                              </div>
                              <p className="text-xs text-amber-700 font-medium">
                                Chọn danh mục để xem chi tiết
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href={`/danh-muc/${category.slug}`}
                className="block px-4 py-3 text-sm text-amber-900 hover:text-amber-800 hover:bg-amber-50 rounded-xl transition-all duration-200 font-semibold border border-transparent hover:border-amber-200">
                {getCategoryDisplayName(category)}
              </Link>
            )}
          </div>
        ))}

        {/* Contact Info */}
        <div className="border-t border-amber-200 pt-4 mt-4">
          <div className="flex items-center justify-center space-x-6 p-4 bg-gradient-to-r from-amber-50 to-rose-50 rounded-xl border border-amber-200">
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-amber-600" />
              <span className="text-sm font-semibold text-amber-800">
                {storeInfo?.phone}
              </span>
            </div>
            <div className="w-px h-4 bg-amber-300"></div>
            <div className="flex items-center space-x-2">
              <Home className="w-4 h-4 text-amber-600" />
              <span className="text-sm font-semibold text-amber-800">
                8:00-22:00
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

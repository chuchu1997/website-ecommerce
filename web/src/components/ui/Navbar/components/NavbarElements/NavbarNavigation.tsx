/** @format */

import React, { useRef } from "react";
import {
  ChevronDown,
  Phone,
  PhoneCall,
  ShoppingCart,
  Sofa,
} from "lucide-react";
import Link from "next/link";
import { CategoryInterface } from "@/types/category";
import { MegaMenu } from "./MegaMenu";
import { StoreInterface } from "@/types/store";

interface NavbarNavigationProps {
  categories: CategoryInterface[];
  activeMegaMenu: number | null;
  setActiveMegaMenu: (id: number | null) => void;
  hoveredParentCategory: number | null;
  setHoveredParentCategory: (id: number | null) => void;
  cartQuantity: number;
  storeInfo: StoreInterface;
}

export const NavbarNavigation: React.FC<NavbarNavigationProps> = ({
  categories,
  activeMegaMenu,
  setActiveMegaMenu,
  hoveredParentCategory,
  cartQuantity,
  storeInfo,
  setHoveredParentCategory,
}) => {
  const categoryTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const getCategoryDisplayName = (category: CategoryInterface) => {
    return category.name;
  };

  const hasMegaMenu = (category: CategoryInterface) => {
    return category.subCategories && category.subCategories.length > 0;
  };

  const handleMegaMenuHover = (categoryId: number) => {
    if (categoryTimeoutRef.current) {
      clearTimeout(categoryTimeoutRef.current);
    }
    setActiveMegaMenu(categoryId);
    const category = categories.find((cat) => cat.id === categoryId);
    if (category && category.subCategories.length > 0) {
      setHoveredParentCategory(category.subCategories[0].id);
    }
  };

  const handleMegaMenuLeave = () => {
    categoryTimeoutRef.current = setTimeout(() => {
      setActiveMegaMenu(null);
      setHoveredParentCategory(null);
    }, 150);
  };

  const handleMenuEnter = () => {
    if (categoryTimeoutRef.current) {
      clearTimeout(categoryTimeoutRef.current);
    }
  };

  const handleMenuLeave = () => {
    setActiveMegaMenu(null);
    setHoveredParentCategory(null);
  };

  return (
    <div className="hidden sm:block bg-white border-b border-amber-100/50">
      <div className="container mx-auto py-1">
        <div className="flex items-center justify-between">
          <nav className="hidden lg:flex items-center text-sm space-x-1 flex-1">
            {categories.map((category) => (
              <div
                key={category.id}
                className="relative"
                onMouseEnter={() =>
                  hasMegaMenu(category) && handleMegaMenuHover(category.id)
                }
                onMouseLeave={handleMegaMenuLeave}>
                {hasMegaMenu(category) ? (
                  <button className="flex items-center space-x-1 px-5 py-3 text-amber-800 hover:text-amber-900 hover:bg-amber-50 rounded-xl transition-all duration-200 font-semibold group border border-transparent hover:border-amber-200 shadow-sm hover:shadow-md">
                    <div className="flex items-center gap-2">
                      {category.slug === "danh-muc-san-pham" && (
                        <Sofa
                          size={18}
                          className="group-hover:text-amber-900 text-amber-700"
                        />
                      )}
                      <span>{getCategoryDisplayName(category)}</span>
                      <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
                    </div>
                  </button>
                ) : (
                  <Link
                    prefetch={true}
                    href={`/danh-muc/${category.slug}`}
                    className="px-5 py-3 text-amber-800 hover:text-amber-900 hover:bg-amber-50 rounded-xl transition-all duration-200 font-semibold block border border-transparent hover:border-amber-200 shadow-sm hover:shadow-md">
                    {getCategoryDisplayName(category)}
                  </Link>
                )}

                {hasMegaMenu(category) && activeMegaMenu === category.id && (
                  <MegaMenu
                    category={category}
                    hoveredParentCategory={hoveredParentCategory}
                    onParentCategoryHover={setHoveredParentCategory}
                    onMenuEnter={handleMenuEnter}
                    onMenuLeave={handleMenuLeave}
                  />
                )}
              </div>
            ))}

            <Link
              prefetch={true}
              href="/gioi-thieu"
              className="px-5 py-3 text-amber-800 hover:text-amber-900 hover:bg-amber-50 rounded-xl transition-all duration-200 font-semibold border border-transparent hover:border-amber-200 shadow-sm hover:shadow-md">
              Về chúng tôi
            </Link>
            <Link
              prefetch={true}
              href="/lien-he"
              className="px-5 py-3 text-amber-800 hover:text-amber-900 hover:bg-amber-50 rounded-xl transition-all duration-200 font-semibold border border-transparent hover:border-amber-200 shadow-sm hover:shadow-md">
              Liên hệ
            </Link>
          </nav>

          <div className="flex gap-x-2">
            <Link
              href="/gio-hang"
              prefetch={true}
              className="relative p-3 text-amber-800 hover:text-amber-900 hover:bg-amber-50 rounded-xl transition-all duration-200 inline-flex items-center group border border-transparent hover:border-amber-200 shadow-sm hover:shadow-md">
              <PhoneCall className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
              {/* {cartQuantity > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-rose-500 to-rose-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg animate-pulse">
                  {cartQuantity}
                </span>
              )} */}
              <span className="ml-2 font-semibold">
                Liên hệ {storeInfo.phone ?? ""}{" "}
              </span>
            </Link>

            <Link
              href="/gio-hang"
              prefetch={true}
              className="relative p-3 text-amber-800 hover:text-amber-900 hover:bg-amber-50 rounded-xl transition-all duration-200 inline-flex items-center group border border-transparent hover:border-amber-200 shadow-sm hover:shadow-md">
              <ShoppingCart className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
              {cartQuantity > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-rose-500 to-rose-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg animate-pulse">
                  {cartQuantity}
                </span>
              )}
              <span className="ml-2 font-semibold">Giỏ hàng</span>
            </Link>
          </div>

          <div className="lg:hidden flex-1 text-center">
            <span className="text-lg font-bold text-amber-900">
              Nội thất & Thiết kế
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

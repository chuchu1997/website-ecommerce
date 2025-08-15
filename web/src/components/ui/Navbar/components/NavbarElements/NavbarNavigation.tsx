/** @format */

import React, { useRef } from "react";
import {
  ChevronDown,
  Phone,
  PhoneCall,
  ShoppingCart,
  Home,
  Palette,
  Sparkles,
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

  const getCategoryIcon = (slug: string) => {
    switch (slug) {
      case "danh-muc-san-pham":
        return Home;
      case "thiet-ke":
        return Palette;
      default:
        return Sparkles;
    }
  };

  return (
    <div
      className="hidden sm:block border-b backdrop-blur-sm"
      style={{
        background: "var(--color-bg)",
        borderColor: "var(--color-border-light)",
      }}>
      <div className="container mx-auto py-2">
        <div className="flex items-center justify-between">
          {/* Main Navigation */}
          <nav className="hidden lg:flex items-center space-x-2 flex-1">
            {categories.map((category) => {
              const IconComponent = getCategoryIcon(category.slug);
              return (
                <div
                  key={category.id}
                  className="relative"
                  onMouseEnter={() =>
                    hasMegaMenu(category) && handleMegaMenuHover(category.id)
                  }
                  onMouseLeave={handleMegaMenuLeave}>
                  {hasMegaMenu(category) ? (
                    <button
                      className="group flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 font-medium border relative overflow-hidden"
                      style={{
                        color: "var(--color-text-primary)",
                        borderColor: "transparent",
                        background: "transparent",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background =
                          "var(--color-bg-secondary)";
                        e.currentTarget.style.borderColor =
                          "var(--color-border)";
                        e.currentTarget.style.color = "var(--color-primary)";
                        e.currentTarget.style.boxShadow =
                          "var(--shadow-default)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.borderColor = "transparent";
                        e.currentTarget.style.color =
                          "var(--color-text-primary)";
                        e.currentTarget.style.boxShadow = "none";
                      }}>
                      {/* Subtle gradient overlay on hover */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ background: "var(--gradient-accent)" }}
                      />

                      <div className="relative flex items-center gap-2">
                        <IconComponent
                          size={18}
                          className="transition-all duration-300 group-hover:scale-110"
                        />
                        <span className="text-sm lg:text-base">
                          {getCategoryDisplayName(category)}
                        </span>
                        <ChevronDown className="w-4 h-4 transition-all duration-300 group-hover:rotate-180 group-hover:scale-110" />
                      </div>
                    </button>
                  ) : (
                    <Link
                      prefetch={true}
                      href={`/danh-muc/${category.slug}`}
                      className="group flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 font-medium border relative overflow-hidden"
                      style={{
                        color: "var(--color-text-primary)",
                        borderColor: "transparent",
                        background: "transparent",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background =
                          "var(--color-bg-secondary)";
                        e.currentTarget.style.borderColor =
                          "var(--color-border)";
                        e.currentTarget.style.color = "var(--color-primary)";
                        e.currentTarget.style.boxShadow =
                          "var(--shadow-default)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.borderColor = "transparent";
                        e.currentTarget.style.color =
                          "var(--color-text-primary)";
                        e.currentTarget.style.boxShadow = "none";
                      }}>
                      {/* Subtle gradient overlay on hover */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ background: "var(--gradient-accent)" }}
                      />

                      <div className="relative flex items-center gap-2">
                        <IconComponent
                          size={18}
                          className="transition-all duration-300 group-hover:scale-110"
                        />
                        <span className="text-sm lg:text-base">
                          {getCategoryDisplayName(category)}
                        </span>
                      </div>
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
              );
            })}

            {/* Additional Navigation Links */}
            <Link
              prefetch={true}
              href="/gioi-thieu"
              className="group flex items-center space-x-2 px-4 py-3 rounded-lg transition-all duration-300 font-medium border relative overflow-hidden"
              style={{
                color: "var(--color-text-primary)",
                borderColor: "transparent",
                background: "transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--color-bg-secondary)";
                e.currentTarget.style.borderColor = "var(--color-border)";
                e.currentTarget.style.color = "var(--color-primary)";
                e.currentTarget.style.boxShadow = "var(--shadow-default)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.borderColor = "transparent";
                e.currentTarget.style.color = "var(--color-text-primary)";
                e.currentTarget.style.boxShadow = "none";
              }}>
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "var(--gradient-accent)" }}
              />
              <span className="relative text-sm lg:text-base">
                Về chúng tôi
              </span>
            </Link>

            <Link
              prefetch={true}
              href="/lien-he"
              className="group flex items-center space-x-2 px-4 py-3 rounded-lg transition-all duration-300 font-medium border relative overflow-hidden"
              style={{
                color: "var(--color-text-primary)",
                borderColor: "transparent",
                background: "transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--color-bg-secondary)";
                e.currentTarget.style.borderColor = "var(--color-border)";
                e.currentTarget.style.color = "var(--color-primary)";
                e.currentTarget.style.boxShadow = "var(--shadow-default)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.borderColor = "transparent";
                e.currentTarget.style.color = "var(--color-text-primary)";
                e.currentTarget.style.boxShadow = "none";
              }}>
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "var(--gradient-accent)" }}
              />
              <span className="relative text-sm lg:text-base">Liên hệ</span>
            </Link>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Contact Button */}
            <Link
              href={`tel:${storeInfo.phone}`}
              prefetch={true}
              className="group relative flex items-center gap-3 px-5 py-3 rounded-xl transition-all duration-300 font-medium border overflow-hidden"
              style={{
                background: "var(--color-bg)",
                borderColor: "var(--color-border)",
                color: "var(--color-text-primary)",
                boxShadow: "var(--shadow-default)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background =
                  "var(--color-accent-green-light)";
                e.currentTarget.style.borderColor = "var(--color-accent-green)";
                e.currentTarget.style.color = "var(--color-accent-green)";
                e.currentTarget.style.boxShadow = "var(--shadow-hover)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--color-bg)";
                e.currentTarget.style.borderColor = "var(--color-border)";
                e.currentTarget.style.color = "var(--color-text-primary)";
                e.currentTarget.style.boxShadow = "var(--shadow-default)";
                e.currentTarget.style.transform = "translateY(0px)";
              }}>
              {/* Premium shimmer effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

              <PhoneCall className="w-5 h-5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
              <div className="hidden xl:flex flex-col">
                <span className="text-xs opacity-75 leading-none">Hotline</span>
                <span className="text-sm font-semibold leading-tight">
                  {storeInfo.phone ?? ""}
                </span>
              </div>
              <span className="xl:hidden text-sm">Gọi ngay</span>
            </Link>

            {/* Shopping Cart Button */}
            {/* <Link
              href="/gio-hang"
              prefetch={true}
              className="group relative flex items-center gap-3 px-5 py-2 rounded-xl transition-all duration-300 font-medium border overflow-hidden"
              style={{
                background: "var(--gradient-primary)",
                borderColor: "var(--color-primary)",
                color: "var(--color-text-white)",
                boxShadow: "var(--shadow-default)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "var(--shadow-hover)";
                e.currentTarget.style.transform =
                  "translateY(-2px) scale(1.02)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "var(--shadow-default)";
                e.currentTarget.style.transform = "translateY(0px) scale(1)";
              }}>
          
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent" />

              <div className="relative">
                <ShoppingCart className="w-5 h-5 transition-all duration-300 group-hover:scale-105" />
             
              </div>

              <div className="hidden lg:flex flex-col items-center">
                <span className="text-xs opacity-90 leading-none">
                  Giỏ hàng
                </span>
                <span className="text-sm font-semibold leading-tight">
                  {cartQuantity > 0 ? `(${cartQuantity})` : "(0)"}
                </span>
              </div>
              <span className="lg:hidden text-sm font-semibold">Giỏ hàng</span>
            </Link> */}
          </div>

          {/* Mobile Brand Name */}
          <div className="lg:hidden flex-1 text-center">
            <div className="flex items-center justify-center gap-2">
              <Palette
                className="w-5 h-5"
                style={{ color: "var(--color-primary)" }}
              />
              <span
                className="text-lg font-bold"
                style={{ color: "var(--color-text-primary)" }}>
                Nội thất & Thiết kế
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/** @format */

import React from "react";
import { Search, ShoppingCart, Menu, X, Home, Palette } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { StoreInterface } from "@/types/store";

interface NavbarHeaderProps {
  storeInfo: StoreInterface;
  cartQuantity: number;
  isMobileMenuOpen: boolean;
  onMobileMenuToggle: () => void;
  onSearchOpen: () => void;
}

export const NavbarHeader: React.FC<NavbarHeaderProps> = ({
  storeInfo,
  cartQuantity,
  isMobileMenuOpen,
  onMobileMenuToggle,
  onSearchOpen,
}) => {
  return (
    <div className="border border-[var(--color-border)] bg-[var(--color-bg)] shadow-[var(--shadow-default)]">
      <div className="container mx-auto py-4">
        <div className="flex items-center justify-between">
          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={onMobileMenuToggle}
              className="p-2 rounded-xl border border-transparent hover:border-[var(--color-border-accent)] hover:bg-[var(--color-bg-hover)] transition-all duration-200"
              aria-label="Menu">
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-[var(--color-primary)]" />
              ) : (
                <Menu className="h-6 w-6 text-[var(--color-primary)]" />
              )}
            </button>
          </div>

          {/* Logo */}
          <Link href="/" prefetch={true} className="flex-shrink-0">
            <Image
              priority
              alt="Interior Design & Furniture Logo"
              src="/logo.png"
              width={70}
              height={70}
              className="w-[45px] h-[45px] sm:w-[60px] sm:h-[60px] object-contain hover:scale-105 transition-transform duration-300 filter drop-shadow-md"
            />
          </Link>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Tìm kiếm nội thất, sofa, bàn ghế..."
                className="
                  w-full
                  px-6 py-3.5 pl-12
                  bg-[var(--color-bg)]
                  border-2 border-[var(--color-border-light)]
                  rounded-full
                  focus:outline-none
                  focus:ring-2 focus:ring-[var(--color-primary-light)]
                  focus:border-[var(--color-primary)]
                  transition-all duration-300
                  shadow-[var(--shadow-default)]
                  hover:shadow-[var(--shadow-hover)]
                  text-[var(--color-text-primary)]
                  placeholder-[var(--color-text-muted)]
                "
                onClick={onSearchOpen}
                readOnly
              />
              <Search
                className="absolute left-4 top-1/2 transform -translate-y-1/2
                  text-[var(--color-primary)] w-5 h-5"
              />
              <button
                className="
                  absolute right-2 top-1/2 transform -translate-y-1/2
                  bg-[var(--color-primary)]
                  text-[var(--color-text-white)]
                  px-5 py-2 rounded-full
                  text-sm font-semibold
                  hover:bg-[var(--color-primary-hover)]
                  transition-all duration-200
                  shadow-[var(--shadow-default)]
                  hover:shadow-[var(--shadow-hover)]
                ">
                Tìm
              </button>
            </div>
          </div>

          {/* Mobile Search Button */}
          <button
            onClick={onSearchOpen}
            className="
              md:hidden flex-1 mx-4 p-3
              bg-[var(--color-bg-secondary)]
              border-2 border-[var(--color-primary)]
              rounded-full
              text-[var(--color-primary)]
              hover:bg-[var(--color-bg-hover)]
              transition-all duration-200
            "
            aria-label="Search">
            <div className="flex items-center gap-x-2">
              <Search className="h-5 w-5" />
              <span className="text-sm font-medium">Tìm nội thất...</span>
            </div>
          </button>

          {/* Mobile Cart Button */}
          <Link
            href="/gio-hang"
            prefetch={true}
            className="
              inline-flex relative p-3 text-[var(--color-primary)]
              hover:text-[var(--color-primary-hover)] hover:bg-[var(--color-bg-hover)]
              rounded-xl transition-all duration-200 sm:hidden items-center group
              border border-transparent hover:border-[var(--color-border-accent)]
            ">
            <ShoppingCart className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
            {cartQuantity > 0 && (
              <span
                className="
                absolute -top-1 -right-1
                bg-gradient-to-r from-rose-500 to-rose-600
                text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg animate-pulse
              ">
                {cartQuantity}
              </span>
            )}
          </Link>

          {/* Desktop Right Section */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Design Consultation */}
            <Link
              href="/tu-van-thiet-ke"
              className="
                flex items-center gap-2 px-5 py-2.5
                bg-[var(--color-accent-green-light)]
                hover:bg-[var(--color-primary-light)]
                rounded-full border border-[var(--color-accent-green)]
                shadow-sm hover:shadow-md
                transition-all duration-300 group
              ">
              <Palette
                className="
                  w-5 h-5 text-[var(--color-accent-green)]
                  group-hover:rotate-6 group-hover:scale-110
                  transition-transform duration-300
                "
              />
              <span className="text-sm font-semibold text-[var(--color-text-primary)]">
                Tư vấn thiết kế
              </span>
            </Link>

            {/* Showroom Hours */}
            <div
              className="
                flex items-center gap-2 px-5 py-2.5
                bg-[var(--color-bg-secondary)]
                hover:bg-[var(--color-bg-hover)]
                rounded-full border border-[var(--color-border-accent)]
                shadow-sm hover:shadow-md
                transition-all duration-300
              ">
              <Home
                className="
                  w-5 h-5 text-[var(--color-primary)]
                  transition-transform duration-300 hover:scale-110
                "
              />
              <span className="text-sm font-medium text-[var(--color-text-secondary)]">
                Showroom: 8:00 - 22:00
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

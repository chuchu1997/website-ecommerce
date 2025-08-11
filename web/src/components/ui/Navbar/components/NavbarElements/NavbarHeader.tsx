/** @format */

import React from "react";
import {
  Search,
  ShoppingCart,
  Menu,
  X,
  Phone,
  Home,
  Palette,
} from "lucide-react";
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
    <div className="border-amber-100/60">
      <div className="container mx-auto py-0">
        <div className="flex items-center justify-between">
          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={onMobileMenuToggle}
              className="p-2 hover:bg-amber-50 rounded-xl transition-all duration-200 border border-transparent hover:border-amber-200"
              aria-label="Menu">
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-amber-800" />
              ) : (
                <Menu className="h-6 w-6 text-amber-800" />
              )}
            </button>
          </div>

          {/* Logo */}
          <Link href="/" prefetch={true} className="flex-shrink-0">
            <Image
              priority
              alt="Interior Design & Furniture Logo"
              src="/logo.png"
              width={100}
              height={100}
              className="w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] object-contain hover:scale-105 transition-transform duration-300 filter drop-shadow-md"
            />
          </Link>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Tìm kiếm nội thất, sofa, bàn ghế..."
                className="w-full px-6 py-3.5 pl-12 bg-white border-2 border-amber-200 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all duration-300 shadow-lg hover:shadow-xl text-amber-900 placeholder-amber-600"
                onClick={onSearchOpen}
                readOnly
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-600 w-5 h-5" />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-amber-600 to-amber-700 text-white px-5 py-2 rounded-full text-sm font-semibold hover:from-amber-700 hover:to-amber-800 transition-all duration-200 shadow-md hover:shadow-lg">
                Tìm
              </button>
            </div>
          </div>

          {/* Mobile Search Button */}
          <button
            onClick={onSearchOpen}
            className="md:hidden flex-1 mx-4 p-3 bg-amber-50 border-2 border-amber-600 rounded-full text-amber-700 hover:bg-amber-100 transition-all duration-200"
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
            className="inline-flex relative p-3 text-amber-800 hover:text-amber-900 hover:bg-amber-50 rounded-xl transition-all duration-200 sm:hidden items-center group border border-transparent hover:border-amber-200">
            <ShoppingCart className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
            {cartQuantity > 0 && (
              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-rose-500 to-rose-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg animate-pulse">
                {cartQuantity}
              </span>
            )}
          </Link>

          {/* Desktop Right Section */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              href="/tu-van-thiet-ke"
              className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100 rounded-full transition-all duration-200 group border border-emerald-200 shadow-sm hover:shadow-md">
              <Palette className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform duration-200" />
              <span className="text-sm font-semibold text-emerald-700">
                Tư vấn thiết kế
              </span>
            </Link>

            <div className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-amber-50 to-orange-50 rounded-full border border-amber-200 shadow-sm">
              <Home className="w-4 h-4 text-amber-600" />
              <span className="text-sm font-semibold text-amber-700">
                Showroom: 8:00 - 22:00
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

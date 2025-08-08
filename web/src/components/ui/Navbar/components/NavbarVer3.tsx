/** @format */

"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  ShoppingCart,
  Menu,
  X,
  ChevronDown,
  MapPin,
  User,
  Heart,
  Bell,
  Phone,
  Mail,
  Gift,
  MenuIcon,
  Clock,
  CreditCard,
  HelpCircle,
  Sofa,
  Home,
  Palette,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { ProductAPI } from "@/api/products/product.api";
import { CategoryInterface } from "@/types/category";
import { CategoryAPI } from "@/api/categories/category.api";
import { useCartContext } from "@/context/cart-context";
import { FormatUtils } from "@/utils/format";
import { ImageLoader } from "../../image-loader";
import { cn } from "@/lib/utils";
import { StoreInterface } from "@/types/store";
import { StoreAPI } from "@/api/stores/store.api";
import { useBreakpoint } from "@/hooks/use-breakpoint";

const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

interface NavbarProps {
  categoriesProps: CategoryInterface[];
  storeInfoProps: StoreInterface;
}

const InteriorDesignNavbar: React.FC<NavbarProps> = ({
  categoriesProps,
  storeInfoProps,
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const [hoveredParentCategory, setHoveredParentCategory] = useState<
    string | null
  >(null);
  const [expandedMobileCategory, setExpandedMobileCategory] = useState<
    string | null
  >(null);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const categoryTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const pathname = usePathname();
  const router = useRouter();
  const { cartQuantity } = useCartContext();

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Search API function
  const searchAPI = async (query: string): Promise<any[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (!query.trim()) return [];
    let res = await ProductAPI.getProductByName(query);
    return res.data.products;
  };

  // Effect for debounced search
  useEffect(() => {
    if (debouncedSearchQuery) {
      setIsSearching(true);
      searchAPI(debouncedSearchQuery)
        .then((results) => {
          setSearchResults(results);
          setIsSearching(false);
        })
        .catch(() => {
          setIsSearching(false);
        });
    } else {
      setSearchResults([]);
    }
  }, [debouncedSearchQuery]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [pathname]);

  // Focus search input when dialog opens
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  if (!categoriesProps || categoriesProps.length === 0 || !storeInfoProps) {
    return null;
  }

  const storeInfo = storeInfoProps;
  const categories = categoriesProps.filter((item) => item.parentId === null);
  const subCate = categoriesProps.filter((item) => item.parentId !== null);

  // Handler functions
  const handleSearchOpen = () => setIsSearchOpen(true);

  const handleSearchClose = () => {
    setIsSearchOpen(false);
    setSearchQuery("");
    setSearchResults([]);
  };

  const handleMobileMenuToggle = () => {
    if (isMobileMenuOpen) {
      setExpandedMobileCategory(null);
      setIsMobileMenuOpen(false);
      return;
    }

    const categorySelect = categories?.find(
      (item) => item.slug === "danh-muc-san-pham"
    );
    const subCateSelect = subCate.find(
      (item) => item.slug === "noi-that-phong-khach" || item.slug === "sofa-ghe"
    );

    if (subCateSelect) {
      setHoveredParentCategory(subCateSelect.id.toString());
    }

    if (categorySelect) {
      setExpandedMobileCategory(categorySelect.id.toString());
    } else {
      setExpandedMobileCategory(null);
    }

    setIsMobileMenuOpen(true);
  };

  const handleMegaMenuHover = (categoryId: string) => {
    if (categoryTimeoutRef.current) {
      clearTimeout(categoryTimeoutRef.current);
    }
    setActiveMegaMenu(categoryId);
    const category = categories.find((cat) => cat.id.toString() === categoryId);
    if (category && category.subCategories.length > 0) {
      setHoveredParentCategory(category.subCategories[0].id.toString());
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

  const handleParentCategoryHover = (categoryId: string) => {
    setHoveredParentCategory(categoryId);
  };

  const handleMobileCategoryToggle = (categoryId: string) => {
    setExpandedMobileCategory(
      expandedMobileCategory === categoryId ? null : categoryId
    );
  };

  const getActiveMegaMenuCategory = () => {
    return categories.find((cat) => cat.id.toString() === activeMegaMenu);
  };

  const getActiveParentCategory = () => {
    const megaMenuCategory = getActiveMegaMenuCategory();
    if (!megaMenuCategory) return null;

    return megaMenuCategory.subCategories.find(
      (cat) => cat.id.toString() === hoveredParentCategory
    );
  };

  const hasMegaMenu = (category: CategoryInterface) => {
    return category.subCategories && category.subCategories.length > 0;
  };

  // Get category display name based on variant
  const getCategoryDisplayName = (category: CategoryInterface) => {
    switch (category.variant) {
      // case "SERVICES":
      //   return "Dịch vụ thiết kế";
      // case "PROJECTS":
      //   return "Dự án hoàn thành";
      default:
        return category.name;
    }
  };

  return (
    <>
      {/* Main Header - Fixed positioning with elegant furniture theme */}
      <header
        className={`bg-white fixed top-0 left-0 right-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? " backdrop-blur-xl shadow-2xl border-b border-[#d6c8b4]/50"
            : " shadow-md"
        }`}>
        {/* TOP SECTION - Logo, Search, Services Info */}
        <div className=" border-amber-100/60">
          <div className="container mx-auto py-0">
            <div className="flex items-center justify-between">
              {/* Mobile Menu Button */}
              <div className="lg:hidden">
                <button
                  onClick={handleMobileMenuToggle}
                  className="p-2 hover:bg-amber-50 rounded-xl transition-all duration-200 border border-transparent hover:border-amber-200"
                  aria-label="Menu">
                  {isMobileMenuOpen ? (
                    <X className="h-6 w-6 text-amber-800" />
                  ) : (
                    <Menu className="h-6 w-6 text-amber-800" />
                  )}
                </button>
              </div>

              {/* Logo with furniture theme */}
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

              {/* Search Bar - Desktop with furniture styling */}
              <div className="hidden md:flex flex-1 max-w-2xl mx-8">
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="Tìm kiếm nội thất, sofa, bàn ghế..."
                    className="w-full px-6 py-3.5 pl-12 bg-white border-2 border-amber-200 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all duration-300 shadow-lg hover:shadow-xl text-amber-900 placeholder-amber-600"
                    onClick={handleSearchOpen}
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
                onClick={handleSearchOpen}
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
                passHref
                prefetch={true}
                className="inline-flex relative p-3 text-amber-800 hover:text-amber-900 hover:bg-amber-50 rounded-xl transition-all duration-200 sm:hidden items-center group border border-transparent hover:border-amber-200">
                <ShoppingCart className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
                {cartQuantity > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-rose-500 to-rose-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg animate-pulse">
                    {cartQuantity}
                  </span>
                )}
              </Link>

              {/* Right Section - Services & Consultation */}
              <div className="hidden lg:flex items-center space-x-4">
                {/* Design Consultation */}
                <Link
                  href="/tu-van-thiet-ke"
                  className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100 rounded-full transition-all duration-200 group border border-emerald-200 shadow-sm hover:shadow-md">
                  <Palette className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform duration-200" />
                  <span className="text-sm font-semibold text-emerald-700">
                    Tư vấn thiết kế
                  </span>
                </Link>

                {/* Showroom Hours */}
                <div className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-amber-50 to-orange-50 rounded-full border border-amber-200 shadow-sm">
                  <Home className="w-4 h-4 text-amber-600" />
                  <div className="text-sm">
                    <span className="font-semibold text-amber-700">
                      Showroom: 8:00 - 22:00
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MIDDLE SECTION - Main Categories & Cart */}
        <div className="hidden sm:block bg-white border-b border-amber-100/50">
          <div className="container mx-auto py-1">
            <div className="flex items-center justify-between">
              {/* Desktop Navigation with furniture theme */}
              <nav className="hidden lg:flex items-center text-sm space-x-1 flex-1">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="relative"
                    onMouseEnter={() =>
                      hasMegaMenu(category) &&
                      handleMegaMenuHover(category.id.toString())
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

                    {/* Mega Menu - Elegant furniture theme */}
                    {hasMegaMenu(category) &&
                      activeMegaMenu === category.id.toString() && (
                        <div
                          className="absolute left-0 top-full w-[1000px] h-[500px] bg-white rounded-2xl shadow-2xl border border-amber-200/50 z-50 flex overflow-hidden backdrop-blur-sm"
                          onMouseEnter={handleMenuEnter}
                          onMouseLeave={handleMenuLeave}>
                          {/* Left Column - Furniture categories */}
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
                                    onClick={() => {
                                      router.push(
                                        `/danh-muc/${subcategory.slug}`
                                      );
                                    }}
                                    onMouseEnter={() =>
                                      handleParentCategoryHover(
                                        subcategory.id.toString()
                                      )
                                    }
                                    className={`p-3 rounded-xl cursor-pointer transition-all duration-200 ${
                                      hoveredParentCategory ===
                                      subcategory.id.toString()
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

                          {/* Right Column - Product showcase */}
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
                                      (childCategory) => {
                                        return (
                                          <Link
                                            prefetch={true}
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
                                              <div className="flex-1 min-w-0">
                                                <h4 className="text-center font-semibold text-sm text-amber-900 group-hover:text-amber-800 transition-colors duration-200 line-clamp-2">
                                                  {childCategory.name}
                                                </h4>
                                              </div>
                                            </div>
                                          </Link>
                                        );
                                      }
                                    ) || (
                                      <div className="col-span-5 text-center py-8">
                                        <div className="relative w-16 h-16 bg-gradient-to-br from-amber-100 to-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                          <ImageLoader
                                            fill
                                            className="rounded-full flex-shrink-0"
                                            src={
                                              getActiveParentCategory()
                                                ?.imageUrl ?? ""
                                            }
                                            alt={
                                              getActiveParentCategory()?.name ??
                                              ""
                                            }
                                          />
                                        </div>
                                        <h4 className="font-bold text-amber-900 mb-3">
                                          {getActiveParentCategory()?.name}
                                        </h4>
                                        <p className="text-sm text-amber-700 line-clamp-3 mb-4 px-4">
                                          {
                                            getActiveParentCategory()
                                              ?.description
                                          }
                                        </p>
                                        <Link
                                          href={`/danh-muc/${
                                            getActiveParentCategory()?.slug
                                          }`}
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
                      )}
                  </div>
                ))}

                {/* Static Navigation Links */}
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

              {/* Mobile Menu Toggle Text */}
              <div className="lg:hidden flex-1 text-center">
                <span className="text-lg font-bold text-amber-900">
                  Nội thất & Thiết kế
                </span>
              </div>

              {/* Shopping Cart & Contact */}
              <div className="flex items-center space-x-4">
                {/* Desktop Additional Info */}
                <div className="hidden lg:flex items-center space-x-4">
                  <div className="flex items-center space-x-2 text-sm text-amber-700">
                    <Phone className="w-4 h-4" />
                    <span className="font-semibold">
                      Hotline: {storeInfo?.phone}
                    </span>
                  </div>
                </div>

                {/* Cart with furniture theme */}
                <Link
                  href="/gio-hang"
                  passHref
                  prefetch={true}
                  className="relative p-3 text-amber-800 hover:text-amber-900 hover:bg-amber-50 rounded-xl transition-all duration-200 inline-flex items-center group border border-transparent hover:border-amber-200 shadow-sm hover:shadow-md">
                  <ShoppingCart className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
                  {cartQuantity > 0 && (
                    <span className="absolute -top-1 -right-1 bg-gradient-to-r from-rose-500 to-rose-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg animate-pulse">
                      {cartQuantity}
                    </span>
                  )}
                  <span className="hidden lg:block ml-2 font-semibold">
                    Giỏ hàng
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu with furniture theme */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-amber-100 shadow-xl">
            <div className="px-4 py-4 space-y-2 max-h-[80vh] overflow-y-auto">
              {/* Mobile Quick Actions */}
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
                  <span className="text-xs font-semibold text-amber-700">
                    8h-22h
                  </span>
                </div>
              </div>

              {/* Dynamic Categories for Mobile */}
              {categories.map((category) => (
                <div key={category.id} className="space-y-1">
                  {hasMegaMenu(category) ? (
                    <div className="space-y-1">
                      <button
                        onClick={() =>
                          handleMobileCategoryToggle(category.id.toString())
                        }
                        className="w-full flex items-center justify-between px-4 py-3 text-sm text-amber-900 hover:text-amber-800 hover:bg-amber-50 rounded-xl transition-all duration-200 font-semibold border border-transparent hover:border-amber-200">
                        <span className="truncate pr-2">
                          {getCategoryDisplayName(category)}
                        </span>
                        <ChevronDown
                          className={`h-4 w-4 transform transition-transform duration-200 flex-shrink-0 ${
                            expandedMobileCategory === category.id.toString()
                              ? "rotate-180"
                              : ""
                          }`}
                        />
                      </button>

                      {/* Mobile category content */}
                      {expandedMobileCategory === category.id.toString() && (
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
                                      if (
                                        subcategory.subCategories &&
                                        subcategory.subCategories.length > 0
                                      ) {
                                        setHoveredParentCategory(
                                          subcategory.id.toString()
                                        );
                                      } else {
                                        router.push(
                                          `/danh-muc/${subcategory.slug}`
                                        );
                                      }
                                    }}
                                    className={`p-2 rounded-lg cursor-pointer transition-all duration-200 ${
                                      hoveredParentCategory ===
                                      subcategory.id.toString()
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
                                (cat) =>
                                  cat.id.toString() === hoveredParentCategory
                              ) ? (
                                <>
                                  <h4 className="text-xs font-bold text-amber-900 mb-2 border-b border-amber-200 pb-2 truncate">
                                    {
                                      category.subCategories.find(
                                        (cat) =>
                                          cat.id.toString() ===
                                          hoveredParentCategory
                                      )?.name
                                    }
                                  </h4>
                                  <div className="space-y-2 grid grid-cols-2">
                                    {category.subCategories
                                      .find(
                                        (cat) =>
                                          cat.id.toString() ===
                                          hoveredParentCategory
                                      )
                                      ?.subCategories?.map((childCategory) => (
                                        <Link
                                          key={childCategory.id}
                                          href={`/danh-muc/${childCategory.slug}`}
                                          className="group flex flex-col items-center p-3 rounded-xl hover:bg-amber-50 transition-all duration-200 hover:shadow-sm border border-transparent hover:border-amber-200">
                                          {/* Image Section */}
                                          <div className="relative h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 mb-2 flex-shrink-0">
                                            <ImageLoader
                                              fill
                                              className="rounded-lg object-cover shadow-sm group-hover:shadow-md transition-all duration-200"
                                              src={childCategory.imageUrl}
                                              alt={childCategory.name}
                                            />
                                          </div>

                                          {/* Name Section */}
                                          <div className="w-full text-center">
                                            <h5
                                              className="text-xs sm:text-sm font-semibold text-amber-900 group-hover:text-amber-800 transition-colors duration-200 leading-tight px-1"
                                              title={childCategory.name}>
                                              <span className="line-clamp-2 break-words">
                                                {childCategory.name}
                                              </span>
                                            </h5>
                                          </div>
                                        </Link>
                                      )) || (
                                      <div className="text-center py-4">
                                        <div className="relative w-14 h-14 bg-gradient-to-br from-amber-100 to-rose-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                          <ImageLoader
                                            fill
                                            className="rounded-lg"
                                            src={
                                              category.subCategories.find(
                                                (cat) =>
                                                  cat.id.toString() ===
                                                  hoveredParentCategory
                                              )?.imageUrl ?? ""
                                            }
                                            alt={
                                              category.subCategories.find(
                                                (cat) =>
                                                  cat.id.toString() ===
                                                  hoveredParentCategory
                                              )?.name ?? ""
                                            }
                                          />
                                        </div>
                                        <h5 className="text-xs font-semibold text-amber-900 mb-2 truncate">
                                          {
                                            category.subCategories.find(
                                              (cat) =>
                                                cat.id.toString() ===
                                                hoveredParentCategory
                                            )?.name
                                          }
                                        </h5>
                                        <p className="text-xs text-amber-700 mb-3 line-clamp-2">
                                          {
                                            category.subCategories.find(
                                              (cat) =>
                                                cat.id.toString() ===
                                                hoveredParentCategory
                                            )?.description
                                          }
                                        </p>
                                        <Link
                                          href={`/danh-muc/${
                                            category.subCategories.find(
                                              (cat) =>
                                                cat.id.toString() ===
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
                    <></>
                  )}
                </div>
              ))}

              {/* Mobile Contact Info */}
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
        )}
      </header>

      {/* Search Modal - Elegant furniture theme */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center pt-20 px-4">
          <div
            className="absolute inset-0 bg-amber-900/20 backdrop-blur-md"
            onClick={handleSearchClose}
          />

          <div className="relative bg-white rounded-2xl shadow-2xl border-2 border-amber-200 w-full max-w-2xl max-h-[70vh] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-amber-200 bg-gradient-to-r from-amber-50/90 to-rose-50/90">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-br from-amber-100 to-rose-100 rounded-xl border border-amber-300">
                  <Search className="h-6 w-6 text-amber-700" />
                </div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-amber-700 to-amber-900 bg-clip-text text-transparent">
                  Tìm kiếm nội thất
                </h3>
              </div>
              <button
                onClick={handleSearchClose}
                className="p-2 hover:bg-white/80 rounded-xl transition-all duration-200 border border-transparent hover:border-amber-200">
                <X className="h-5 w-5 text-amber-700" />
              </button>
            </div>

            {/* Search Input */}
            <div className="p-6 border-b border-amber-100">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-600 w-6 h-6" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Tìm sofa, bàn ăn, tủ quần áo, đèn trang trí..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-14 pr-4 py-4 text-lg border-2 border-amber-200 rounded-xl focus:outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-100 transition-all duration-200 text-amber-900 placeholder-amber-600"
                />
              </div>
            </div>

            {/* Search Results */}
            <div className="max-h-80 overflow-y-auto">
              {isSearching && (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-10 w-10 border-3 border-amber-600 border-t-transparent mb-4"></div>
                  <p className="text-amber-700 font-medium">
                    Đang tìm kiếm nội thất...
                  </p>
                </div>
              )}

              {!isSearching && searchResults.length > 0 && (
                <div className="p-6 space-y-4">
                  <p className="text-sm font-semibold text-amber-700 bg-amber-50 px-3 py-2 rounded-lg border border-amber-200">
                    Tìm thấy {searchResults.length} sản phẩm nội thất
                  </p>
                  {searchResults.map((result) => (
                    <Link
                      key={result.id}
                      href={`/san-pham/${result.slug}`}
                      className="group flex items-center space-x-4 p-4 hover:bg-gradient-to-r hover:from-amber-50 hover:to-rose-50 rounded-xl transition-all duration-200 border border-transparent hover:border-amber-300 hover:shadow-lg transform hover:scale-[1.02]">
                      <ImageLoader
                        src={result.images[0].url}
                        alt={result.name}
                        width={64}
                        height={64}
                        className="w-16 h-16 rounded-xl object-cover shadow-md group-hover:shadow-lg transition-all duration-200 flex-shrink-0 border border-amber-200"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-amber-900 group-hover:text-amber-800 transition-colors duration-200 truncate text-lg">
                          {result.name}
                        </h4>
                        <p className="text-amber-700 mt-1 text-sm line-clamp-1">
                          {result.shortDescription}
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="text-lg font-bold bg-gradient-to-r from-rose-600 to-rose-700 bg-clip-text text-transparent">
                          {FormatUtils.formatPriceVND(result.price)}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {!isSearching && searchQuery && searchResults.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="w-20 h-20 bg-gradient-to-br from-amber-100 to-rose-100 rounded-full flex items-center justify-center mb-4 border-2 border-amber-200">
                    <Sofa className="h-10 w-10 text-amber-600" />
                  </div>
                  <p className="text-amber-900 font-bold mb-2 text-lg">
                    Không tìm thấy sản phẩm
                  </p>
                  <p className="text-amber-700 text-center px-4">
                    Không có nội thất nào phù hợp với từ khóa "{searchQuery}"
                  </p>
                </div>
              )}

              {!searchQuery && (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="w-20 h-20 bg-gradient-to-br from-amber-100 to-rose-100 rounded-full flex items-center justify-center mb-4 border-2 border-amber-200">
                    <Search className="h-10 w-10 text-amber-600" />
                  </div>
                  <p className="text-amber-900 font-bold mb-2 text-lg">
                    Khám phá nội thất
                  </p>
                  <p className="text-amber-700 text-center px-4">
                    Nhập tên sản phẩm để tìm kiếm nội thất yêu thích
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InteriorDesignNavbar;

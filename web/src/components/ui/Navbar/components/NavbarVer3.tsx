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

const ProfessionalNavbar: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [storeInfo, setStoreInfo] = useState<StoreInterface>();
  const [hoveredParentCategory, setHoveredParentCategory] = useState<
    string | null
  >(null);
  const [expandedMobileCategory, setExpandedMobileCategory] = useState<
    string | null
  >(null);
  const [categories, setCategories] = useState<CategoryInterface[]>([]);
  const [subCate, setSubCate] = useState<CategoryInterface[]>([]);

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

  // Fetch categories
  const fetchCategories = async () => {
    try {
      let res = await CategoryAPI.getAllCategoriesOfStore({
        justGetParent: true,
      });
      let resSub = await CategoryAPI.getAllCategoriesOfStore({
        justGetParent: false,
      });
      let storeRes = await (await StoreAPI.getStoreInfo()).data;

      setStoreInfo(storeRes.store);

      const sub = resSub.data.categories as CategoryInterface[];

      setSubCate(sub.filter((item) => item.parentId !== null));

      const cate = res.data.categories as CategoryInterface[];
      setCategories(cate || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Handler functions
  const handleSearchOpen = () => setIsSearchOpen(true);

  const handleSearchClose = () => {
    setIsSearchOpen(false);
    setSearchQuery("");
    setSearchResults([]);
  };

  const handleMobileMenuToggle = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleMegaMenuHover = (categoryId: string) => {
    if (categoryTimeoutRef.current) {
      clearTimeout(categoryTimeoutRef.current);
    }
    setActiveMegaMenu(categoryId);
    // Set the first subcategory as default hovered category
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
      case "SERVICES":
        return "Dịch vụ";
      case "PROJECTS":
        return "Dự án";
      default:
        return category.name;
    }
  };

  return (
    <>
      {/* Main Header - Fixed positioning */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-white/98 backdrop-blur-lg shadow-xl border-b border-gray-100"
            : "bg-white shadow-lg"
        }`}>
        {/* TOP SECTION - Logo, Search, Payment Guide, Business Hours */}
        <div className="bg-gradient-to-r from-blue-50 via-white to-purple-50 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 py-0">
            <div className="flex items-center justify-between">
              {/* Mobile Menu Button */}
              <div className="lg:hidden">
                <button
                  onClick={handleMobileMenuToggle}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                  aria-label="Menu">
                  {isMobileMenuOpen ? (
                    <X className="h-6 w-6 text-gray-700" />
                  ) : (
                    <Menu className="h-6 w-6 text-gray-700" />
                  )}
                </button>
              </div>

              {/* Logo */}
              <Link href="/" prefetch={true} className="flex-shrink-0">
                <Image
                  priority
                  alt="logo"
                  src="/logo.png"
                  width={100}
                  height={100}
                  className="w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] object-contain hover:scale-105 transition-transform duration-200"
                />
              </Link>

              {/* Search Bar - Desktop */}
              <div className="hidden md:flex flex-1 max-w-2xl mx-8">
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="Tìm kiếm sản phẩm, dịch vụ..."
                    className="w-full px-6 py-3 pl-12 bg-white border-2 border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md"
                    onClick={handleSearchOpen}
                    readOnly
                  />
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors duration-200">
                    Tìm
                  </button>
                </div>
              </div>

              {/* Mobile Search Button */}
              <button
                onClick={handleSearchOpen}
                className="md:hidden flex-1 mx-4 p-3 bg-gray-50 border border-gray-200 rounded-full text-gray-600 hover:bg-gray-100 transition-colors duration-200"
                aria-label="Search">
                <div className="flex items-center gap-x-2">
                  <Search className="h-5 w-5" />
                  <span className="text-sm">Tìm kiếm...</span>
                </div>
              </button>
              <Link
                href="/gio-hang"
                passHref
                prefetch={true}
                className="inline-flex relative p-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 sm:hidden items-center group">
                <ShoppingCart className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
                {cartQuantity > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg animate-pulse">
                    {cartQuantity}
                  </span>
                )}
                <span className="hidden lg:block ml-2 font-medium">
                  Giỏ hàng
                </span>
              </Link>
              {/* Right Section - Payment Guide & Business Hours */}
              <div className="hidden lg:flex items-center space-x-6">
                {/* Payment Guide */}

                <Link
                  href="/huong-dan-thanh-toan"
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 rounded-full transition-all duration-200 group border border-green-200">
                  <CreditCard className="w-4 h-4 text-green-600 group-hover:scale-110 transition-transform duration-200" />
                  <span className="text-sm font-medium text-green-700">
                    Hướng dẫn thanh toán
                  </span>
                </Link>

                {/* Business Hours */}
                <div className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-orange-50 to-amber-50 rounded-full border border-orange-200">
                  <Clock className="w-4 h-4 text-orange-600" />
                  <div className="text-sm">
                    <span className="font-medium text-orange-700">
                      8:00 - 22:00
                    </span>
                    <span className="text-orange-600 ml-1">hàng ngày</span>
                  </div>
                </div>

                {/* Support */}
              </div>
            </div>
          </div>
        </div>

        {/* MIDDLE SECTION - Main Categories & Cart */}
        <div className="hidden sm:block bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 py-1">
            <div className="flex items-center justify-between">
              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center space-x-1 flex-1">
                {/* Dynamic Categories with Megamenus */}
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
                      <button className="flex items-center space-x-1 px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium group">
                        <div className="flex items-center gap-2">
                          {category.slug === "san-pham" && (
                            <MenuIcon
                              size={18}
                              className="group-hover:text-blue-600"
                            />
                          )}
                          <span>{getCategoryDisplayName(category)}</span>
                          <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-200" />
                        </div>
                      </button>
                    ) : (
                      <Link
                        prefetch={true}
                        href={`/danh-muc/${category.slug}`}
                        className="px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium block">
                        {getCategoryDisplayName(category)}
                      </Link>
                    )}

                    {/* Mega Menu */}
                    {hasMegaMenu(category) &&
                      activeMegaMenu === category.id.toString() && (
                        <div
                          className="absolute left-0 top-full  w-[800px] h-[750px] bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 flex "
                          onMouseEnter={handleMenuEnter}
                          onMouseLeave={handleMenuLeave}>
                          {/* Left Column */}
                          <div className="w-1/3 bg-gradient-to-br from-gray-50 to-blue-50 p-6 border-r border-gray-200">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-300">
                              {getCategoryDisplayName(category)}
                            </h3>
                            <div className="space-y-2 max-h-[750px] overflow-y-auto">
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
                                      ? "bg-white text-blue-700 shadow-md border border-blue-200"
                                      : "hover:bg-white/70 text-gray-700"
                                  }`}>
                                  <div className="font-medium">
                                    {subcategory.name}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Right Column */}
                          <div className="w-2/3 p-6 bg-white">
                            {getActiveParentCategory() ? (
                              <>
                                <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                                  {getActiveParentCategory()?.name}
                                </h3>
                                <div className="grid grid-cols-2 gap-4 max-h-[400px] overflow-y-auto">
                                  {getActiveParentCategory()?.subCategories?.map(
                                    (childCategory) => (
                                      <Link
                                        prefetch={true}
                                        key={childCategory.id}
                                        href={`/danh-muc/${childCategory.slug}`}
                                        className="group p-4 rounded-xl hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50 transition-all duration-200 border border-transparent hover:border-blue-200 hover:shadow-lg">
                                        <div className="flex items-center space-x-3">
                                          <Image
                                            className="w-12 h-12 rounded-lg object-cover shadow-sm flex-shrink-0"
                                            src={childCategory.imageUrl}
                                            alt={childCategory.name}
                                            width={48}
                                            height={48}
                                          />
                                          <div className="flex-1 min-w-0">
                                            <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                                              {childCategory.name}
                                            </h4>
                                            {childCategory.description && (
                                              <p className="text-sm text-gray-500 group-hover:text-blue-500 transition-colors duration-200 line-clamp-2">
                                                {childCategory.description}
                                              </p>
                                            )}
                                          </div>
                                        </div>
                                      </Link>
                                    )
                                  ) || (
                                    // If no child categories, show parent category info
                                    <div className="col-span-2 text-center py-8">
                                      <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Image
                                          className="rounded-lg flex-shrink-0"
                                          src={
                                            getActiveParentCategory()
                                              ?.imageUrl ?? ""
                                          }
                                          alt={
                                            getActiveParentCategory()?.name ??
                                            ""
                                          }
                                          width={32}
                                          height={32}
                                        />
                                      </div>
                                      <h4 className="font-medium text-gray-900 mb-2">
                                        {getActiveParentCategory()?.name}
                                      </h4>
                                      <p className="text-sm text-gray-500">
                                        {getActiveParentCategory()?.description}
                                      </p>
                                      <Link
                                        href={`/danh-muc/${
                                          getActiveParentCategory()?.slug
                                        }`}
                                        className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                                        Xem tất cả
                                      </Link>
                                    </div>
                                  )}
                                </div>
                              </>
                            ) : (
                              <div className="flex items-center justify-center h-64">
                                <div className="text-center">
                                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <ChevronDown className="h-6 w-6 text-blue-500 rotate-90" />
                                  </div>
                                  <p className="text-gray-500">
                                    Hover để xem danh mục con
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
                  className="px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium">
                  Giới thiệu
                </Link>
                <Link
                  prefetch={true}
                  href="/lien-he"
                  className="px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium">
                  Liên hệ
                </Link>
              </nav>

              {/* Mobile Menu Toggle Text */}
              <div className="lg:hidden flex-1 text-center">
                <span className="text-lg font-semibold text-gray-800">
                  Danh mục sản phẩm
                </span>
              </div>

              {/* Shopping Cart */}
              <div className="flex items-center space-x-4">
                {/* Desktop Additional Links */}
                <div className="hidden lg:flex items-center space-x-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span className="font-medium">
                      Hotline: {storeInfo?.phone}
                    </span>
                  </div>
                </div>

                {/* Cart */}
                <Link
                  href="/gio-hang"
                  passHref
                  prefetch={true}
                  className="relative p-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 inline-flex items-center group">
                  <ShoppingCart className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
                  {cartQuantity > 0 && (
                    <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg animate-pulse">
                      {cartQuantity}
                    </span>
                  )}
                  <span className="hidden lg:block ml-2 font-medium">
                    Giỏ hàng
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION - Subcategories */}
        <div
          className={`hidden ${
            isScrolled ? "hidden" : "md:block"
          } bg-gradient-to-r from-gray-50 via-blue-50 to-purple-50 border-b border-gray-200`}>
          <div className="max-w-7xl mx-auto px-4 py-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1 space-y-1 flex-wrap">
                {subCate.slice(0, 7).map((category, index) => (
                  <Link
                    href={`/danh-muc/${category.slug}`}
                    key={category.id}
                    className={`px-3 py-1.5 text-sm font-medium rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 transition-all hover:scale-105`}>
                    {category.name}
                  </Link>
                ))}
              </div>

              {/* View All Categories */}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
            <div className="px-3 py-3 space-y-1 max-h-[80vh] overflow-y-auto">
              {/* Mobile Quick Actions */}
              <div className="grid grid-cols-2 gap-2 mb-4 p-2 bg-gray-50 rounded-lg">
                <Link
                  href="/huong-dan-thanh-toan"
                  className="flex items-center justify-center space-x-2 p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
                  <CreditCard className="w-4 h-4 text-green-600" />
                  <span className="text-xs font-medium text-green-700">
                    Thanh toán
                  </span>
                </Link>
                <div className="flex items-center justify-center space-x-2 p-2 bg-white rounded-lg shadow-sm">
                  <Clock className="w-4 h-4 text-orange-600" />
                  <span className="text-xs font-medium text-orange-700">
                    8h-22h
                  </span>
                </div>
              </div>

              {/* Dynamic Categories for Mobile */}
              {categories.map((category) => (
                <div key={category.id} className="space-y-1">
                  {hasMegaMenu(category) ? (
                    // Categories with subcategories - expandable
                    <div className="space-y-1">
                      <button
                        onClick={() =>
                          handleMobileCategoryToggle(category.id.toString())
                        }
                        className="w-full flex items-center justify-between px-3 py-2.5 text-sm text-gray-900 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 font-medium">
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

                      {/* Two-column layout for subcategories */}
                      {expandedMobileCategory === category.id.toString() && (
                        <div className="bg-gray-50 rounded-xl p-2 mt-2">
                          <div className="flex gap-1 h-72">
                            {/* Left Column - Parent Categories */}
                            <div className="w-2/5 bg-white rounded-lg p-2 border-r border-gray-200 overflow-y-auto">
                              <h4 className="text-xs font-semibold text-gray-900 mb-2 border-b border-gray-200 pb-2 truncate">
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
                                    className={`p-1.5 rounded-lg cursor-pointer transition-all duration-200 ${
                                      hoveredParentCategory ===
                                      subcategory.id.toString()
                                        ? "bg-blue-100 text-blue-700"
                                        : "hover:bg-gray-100 text-gray-700"
                                    }`}>
                                    <div className="text-xs font-medium truncate">
                                      {subcategory.name}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Right Column - Child Categories */}
                            <div className="w-3/5 bg-white rounded-lg p-2 overflow-y-auto">
                              {hoveredParentCategory &&
                              category.subCategories.find(
                                (cat) =>
                                  cat.id.toString() === hoveredParentCategory
                              ) ? (
                                <>
                                  <h4 className="text-xs font-semibold text-gray-900 mb-2 border-b border-gray-200 pb-2 truncate">
                                    {
                                      category.subCategories.find(
                                        (cat) =>
                                          cat.id.toString() ===
                                          hoveredParentCategory
                                      )?.name
                                    }
                                  </h4>
                                  <div className="space-y-1.5">
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
                                          className="group flex items-start gap-2 p-1.5 rounded-lg hover:bg-blue-50 transition-all duration-200 hover:shadow-sm border border-transparent hover:border-blue-200">
                                          <Image
                                            className="rounded-md flex-shrink-0"
                                            src={childCategory.imageUrl}
                                            alt={childCategory.name}
                                            width={24}
                                            height={24}
                                          />
                                          <div className="flex-1 min-w-0">
                                            <h5 className="text-xs font-medium text-gray-900 mb-1 group-hover:text-blue-600 transition-colors duration-200 truncate">
                                              {childCategory.name}
                                            </h5>
                                            {childCategory.description && (
                                              <p className="text-xs text-gray-500 group-hover:text-blue-500 transition-colors duration-200 line-clamp-2 leading-tight">
                                                {childCategory.description}
                                              </p>
                                            )}
                                          </div>
                                        </Link>
                                      )) || (
                                      // If no child categories, show the parent category info
                                      <div className="text-center py-3">
                                        <div className="w-10 h-10 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full flex items-center justify-center mx-auto mb-2">
                                          <ImageLoader
                                            className="rounded-md"
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
                                            width={20}
                                            height={20}
                                          />
                                        </div>
                                        <h5 className="text-xs font-medium text-gray-900 mb-2 truncate">
                                          {
                                            category.subCategories.find(
                                              (cat) =>
                                                cat.id.toString() ===
                                                hoveredParentCategory
                                            )?.name
                                          }
                                        </h5>
                                        <p className="text-xs text-gray-500 mb-2 line-clamp-2">
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
                                          className="inline-block px-2.5 py-1 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 transition-colors duration-200">
                                          Xem tất cả
                                        </Link>
                                      </div>
                                    )}
                                  </div>
                                </>
                              ) : (
                                <div className="flex items-center justify-center h-full">
                                  <div className="text-center">
                                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                                      <ChevronDown className="h-4 w-4 text-gray-400 rotate-90" />
                                    </div>
                                    <p className="text-xs text-gray-500">
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
                    // Categories without subcategories - direct link
                    <Link
                      href={`/danh-muc/${category.slug}`}
                      className="flex items-center px-3 py-2.5 text-sm text-gray-900 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 font-medium">
                      <span className="truncate">
                        {getCategoryDisplayName(category)}
                      </span>
                    </Link>
                  )}
                </div>
              ))}

              {/* Static Navigation Links */}
              <div className="border-t border-gray-200 pt-3 mt-3 space-y-1">
                <Link
                  prefetch={true}
                  href="/gioi-thieu"
                  className="flex items-center px-3 py-2.5 text-sm text-gray-900 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 font-medium">
                  Giới thiệu
                </Link>

                <Link
                  prefetch={true}
                  href="/lien-he"
                  className="flex items-center px-3 py-2.5 text-sm text-gray-900 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 font-medium">
                  Liên hệ
                </Link>
              </div>

              {/* Mobile Contact Info */}
              <div className="border-t border-gray-200 pt-3 mt-3">
                <div className="flex items-center justify-center space-x-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-700">
                      {storeInfo?.phone}
                    </span>
                  </div>
                  <div className="w-px h-4 bg-gray-300"></div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-orange-600" />
                    <span className="text-sm font-medium text-orange-700">
                      8:00-22:00
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Spacer for fixed header - Adjusted for three sections */}
      {/* <div className="h-[180px] lg:h-[160px]"></div> */}

      {/* Search Modal - Enhanced with beautiful design */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center pt-20 px-4">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={handleSearchClose}
          />

          <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-100 w-full max-w-2xl max-h-[70vh] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg">
                  <Search className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Tìm kiếm sản phẩm
                </h3>
              </div>
              <button
                onClick={handleSearchClose}
                className="p-2 hover:bg-white/70 rounded-lg transition-colors duration-200">
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            {/* Search Input */}
            <div className="p-6 border-b border-gray-100">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Nhập tên sản phẩm bạn muốn tìm..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all duration-200"
                />
              </div>
            </div>

            {/* Search Results */}
            <div className="max-h-80 overflow-y-auto">
              {isSearching && (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent mb-4"></div>
                  <p className="text-gray-500">Đang tìm kiếm...</p>
                </div>
              )}

              {!isSearching && searchResults.length > 0 && (
                <div className="p-6 space-y-4">
                  <p className="text-sm font-medium text-gray-500">
                    Tìm thấy {searchResults.length} sản phẩm
                  </p>
                  {searchResults.map((result) => (
                    <Link
                      key={result.id}
                      href={`/san-pham/${result.slug}`}
                      className="group flex items-center space-x-4 p-4 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-xl transition-all duration-200 border border-transparent hover:border-blue-200 hover:shadow-lg">
                      <ImageLoader
                        src={result.images[0].url}
                        alt={result.name}
                        width={64}
                        height={64}
                        className="w-16 h-16 rounded-lg object-cover shadow-sm flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 truncate">
                          {result.name}
                        </h4>
                        <p className="text-gray-600 mt-1 text-sm line-clamp-1">
                          {result.shortDescription}
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="text-lg font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                          {FormatUtils.formatPriceVND(result.price)}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {!isSearching && searchQuery && searchResults.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-4">
                    <Search className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="text-gray-900 font-semibold mb-2">
                    Không tìm thấy sản phẩm
                  </p>
                  <p className="text-gray-500 text-center">
                    Không có sản phẩm nào phù hợp với từ khóa "{searchQuery}"
                  </p>
                </div>
              )}

              {!searchQuery && (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mb-4">
                    <Search className="h-8 w-8 text-blue-500" />
                  </div>
                  <p className="text-gray-900 font-semibold mb-2">
                    Tìm kiếm sản phẩm
                  </p>
                  <p className="text-gray-500 text-center">
                    Nhập tên sản phẩm để bắt đầu tìm kiếm
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

export default ProfessionalNavbar;
